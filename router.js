var fitnessController = require('./controllers/fitnessController.js');
var matchController = require('./controllers/matchController.js');
var messageController = require('./controllers/messageController.js');
var profileController = require('./controllers/profileController.js');
var userController = require('./controllers/userController.js');
var walletController = require('./controllers/walletController.js');

var express = require('express');
var path = require('path');

var helpers = require('./utilities/helpers.js'); //custom helper middleware

module.exports = (app, express) => {
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // EXAMPLE CODE:
  app.post('/api/user', userController.saveOne);
  app.get('/api/user', userController.fetchAll);

};

