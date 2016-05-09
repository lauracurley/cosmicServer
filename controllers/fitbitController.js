var request = require('request');
var secret = require('../apiKeys/keys.js');  // client api key
var fitnessController = require('./fitnessController.js');
var clientId = '227LH8'; // Your client id
var User = require('../models/user.js');
var moment = require('moment');

// Authorizes a user to fitbit.
module.exports.authorize = function (req, res) {
  // parse the access code from fitbit callbackURL
  var code = req.body.query.url.split('=')[1].slice(0, -2);
  var facebookId = req.body.query.facebookId;
  // set options for token retrieval
  var options = {
    url: 'https://api.fitbit.com/oauth2/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(clientId + ':' + secret).toString('base64')),
    },
    form: {
      code: code,
      grant_type: 'authorization_code',
    },
  };
  // Post to fitbit api to retrieve refresh token and access token .
  request.post(options, function (error, response, body) {
    if (error) {
      return console.log('Error in token request', error);
    }
    var access = JSON.parse(body);
    module.exports.saveToken(access.refresh_token, facebookId);
    module.exports.fetchFitbitData(access.access_token, function (error, fitnessData) {
      if (error) {
        return console.log(error);
      }
      fitnessController.saveFitbit(fitnessData, facebookId);
      res.status(201).json(true);
    });
  });
};

// Refresh user's Fitbit refresh token, and callbacks with fitbit access token.
module.exports.refreshToken = function (facebookId, cb) {
  User.findOne({ where: { facebookId: facebookId } }).then(function (user) {
    var token = user.get('facebookId');
    // Define options for fitbit refresh token
    var options = {
      url: 'https://api.fitbit.com/oauth2/token',
      headers: {
        Authorization: 'Basic ' + (new Buffer(clientId + ':' + secret).toString('base64')),
      },
      form: {
        refresh_token: token,
        grant_type: 'refresh_token',
      },
    };
    // Post to fitbit api to retrieve refresh token and access token.
    request.post(options, function (error, response, body) {
     var access = JSON.parse(body);
      if (error) {
        return cb(error);
      }
      cb(null, access.access_token);
      module.exports.saveToken(access.refresh_token, facebookId);
    });
  });
};

module.exports.fetchFitbitData = function (accessToken, cb) {
  var today = moment().format('YYYY-MM-DD');
  // Set options to retrieve todays fitbit Data.
  var options = {
    url: 'https://api.fitbit.com/1/user/-/activities/date/' + today + '.json',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
    json: true,
  };
  // Get today's fitbit data
  request.get(options, function (error, response, body) {
    if (error) {
      return cb(error);
    }
    cb(null, body.summary);
  });
};

module.exports.saveToken = function (token, facebookId) {
  User.update({ fitbitToken: token }, { where: { facebookId: facebookId } });
};


