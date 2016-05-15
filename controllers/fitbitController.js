const request = require('request');
const secret = require('../apiKeys/keys.js');  // client api key
const fitnessController = require('./fitnessController.js');
const clientId = '227LH8'; // Your client id
const User = require('../models/user.js');
const moment = require('moment');

// Authorizes a user to fitbit.
module.exports.authorize = (req, res) => {
  // parse the access code from fitbit callbackURL
  const code = req.body.query.url.split('=')[1].slice(0, -2);
  const facebookId = req.body.query.facebookId;
  // set options for token retrieval
  const options = {
    url: 'https://api.fitbit.com/oauth2/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(clientId + ':' + secret).toString('base64')),
    },
    form: {
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: 'icymicy://foo',
    },
  };
  // Post to fitbit api to retrieve refresh token and access token .
  request.post(options, (error, response, body) => {
    if (error) {
      res.status(406).send('Error in authorization token request');
      return console.log('Error in authorization token request', error);
    }
    const access = JSON.parse(body);
    module.exports.saveToken(access.refresh_token, facebookId);
    // saves todays fitbit information
    module.exports.fetchFitbitData(access.access_token, (error, fitnessData) => {
      if (error) {
        res.status(406).json(false);
        return console.log('Error in accessing fitbitData');
      }
      fitnessController.saveDailyFitbit(fitnessData, facebookId);
      module.exports.fetchLifetimefitbitData(access.access_token, (error, fitnessData) => {
        if (error) {
          res.status(406).json(false);
          return console.log('Error in accessing fitbitData');
        }
        fitnessController.saveLifetimeFitbit(fitnessData, facebookId);
        res.status(201).json(true);
      });
    });
  });
};

// Refresh user's Fitbit refresh token, and callbacks with fitbit access token.
module.exports.refreshToken = (facebookId, cb) => {
  User.findOne({ where: { facebookId } }).then(user => {
    const token = user.get('fitbitToken');
    // Define options for fitbit refresh token
    const options = {
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
    request.post(options, (error, response, body) => {
      const access = JSON.parse(body);
      if (error) {
        return cb(error);
      }
      cb(null, access.access_token);
      console.log(access);
      module.exports.saveToken(access.refresh_token, facebookId);
    });
  });
};

module.exports.fetchFitbitData = (accessToken, cb) => {
  const today = moment().format('YYYY-MM-DD');
  // Set options to retrieve todays fitbit Data.
  const options = {
    url: 'https://api.fitbit.com/1/user/-/activities/date/' + today + '.json',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
    json: true,
  };
  // Get today's fitbit data
  request.get(options, (error, response, body) => {
    if (error) {
      return cb(error);
    }
    cb(null, body.summary);
  });
};

module.exports.fetchLifetimefitbitData = (accessToken, cb) => {
  const today = moment().format('YYYY-MM-DD');
  // Set options to retrieve todays fitbit Data.
  const options = {
    url: 'https://api.fitbit.com/1/user/-/activities.json',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
    json: true,
  };
  // Get today's fitbit data
  request.get(options, (error, response, body) => {
    if (error) {
      return cb(error);
    }
    cb(null, body.lifetime.tracker.steps);
  });
};

module.exports.saveToken = (token, facebookId) => {
  User.update({ fitbitToken: token }, { where: { facebookId } });
};


