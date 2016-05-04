var userController = require('./controllers/userController');



var express = require('express');
var path = require('path');

var helpers = require('./config/helpers.js'); //custom helper middleware

module.exports = (app, express) => {
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  app.post('/api/user', userController.saveOne);
  app.get('/api/user', userController.fetchAll);

};

