var request = require('request');
var secret = require('../apiKeys/keys.js');  // client api key
var fitnessController = require('./fitnessController.js');
var userController = require('./userController.js');

var clientId = '227LH8'; // Your client id
var redirectUri = 'icymicy://foo'; // Your redirect uri
var authUri = 'https://www.fitbit.com/oauth2/authorize';
var tokenRefreshUri = 'https://api.fitbit.com/oauth2/token';
var access;
var User = require('../models/user.js');
var moment = require('moment');

module.exports.authorize = function (req, res) {

  //Returns the access code from fitbit callbackURL
  var code = req.body.query.url.split('=')[1].slice(0,-2);
  var facebookId = req.body.query.userId;
  //define Options for http request
  var options = {
    url: 'https://api.fitbit.com/oauth2/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(clientId + ':' + secret).toString('base64')) 
    },
    form: {
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:8000/callback'
    }
  };
  // GET refresh token and access token 
  request.post(options, function(error, response, body) {
    if (error) {
      console.log('Error in token request', error);
    }
    access = JSON.parse(body);
    module.exports.saveToken(access.refresh_token,facebookId);
    module.exports.fetchFitbitData(access.access_token, function(fitnessData){
      fitnessController.saveFitbit(fitnessData, facebookId);
    }
  });
};

module.exports.fetchFitbitData = function(accessToken, cb) {
  var today = moment().format('YYYY-MM-DD');
  var options = {
    url: 'https://api.fitbit.com/1/user/-/activities/date/'+today+'.json',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    },
    json: true
  };

  request.get(options, function(error, response, body) {
    if(error) {
      cb(error);
    }
    console.log('activities data', body);
    cb(body);
  });

}

module.exports.saveToken = function(token, facebookId) {
  User.update({fitbitRefreshToken: token}, {where: {'facebookId' = facebookId}});
}