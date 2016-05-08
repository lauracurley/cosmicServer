var fitnessController = require('./controllers/fitnessController.js');
var matchController = require('./controllers/matchController.js');
var messageController = require('./controllers/messageController.js');
var profileController = require('./controllers/profileController.js');
var userController = require('./controllers/userController.js');
var walletController = require('./controllers/walletController.js');

var express = require('express');
var path = require('path');


module.exports = (app, express) => {


  // EXAMPLE CODE:
  app.post('/api/user', userController.saveOne);
  app.post('/api/user', userController.fetchOne);
  app.get('/api/user', userController.fetchAll);

  app.post('/api/profile', profileController.saveOne);
  app.post('/api/profile', profileController.fetchOne);


};

