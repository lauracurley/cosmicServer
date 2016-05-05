var fitnessController = require('./controllers/fitnessController');
var matchController = require('./controllers/matchController');
var messageController = require('./controllers/messageController');
var profileController = require('./controllers/profileController');
var userController = require('./controllers/userController');
var walletController = require('./controllers/walletController');

var express = require('express');
var path = require('path');

var helpers = require('./config/helpers.js'); //custom helper middleware

module.exports = (app, express) => {
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // EXAMPLE CODE:
  app.post('/api/user', userController.saveOne);
  app.get('/api/user', userController.fetchAll);

};

