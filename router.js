var fitnessController = require('./controllers/fitnessController.js');
var matchController = require('./controllers/matchController.js');
var messageController = require('./controllers/messageController.js');
var profileController = require('./controllers/profileController.js');
var personController = require('./controllers/personController.js');
var walletController = require('./controllers/walletController.js');

var express = require('express');
var path = require('path');


module.exports = (app, express) => {


  // EXAMPLE CODE:
  app.post('/api/person', personController.saveOne);
  app.post('/api/person', personController.fetchOne);
  app.get('/api/person', personController.fetchAll);

  app.post('/api/profile', profileController.saveOne);
  app.post('/api/profile', profileController.fetchOne);


};

