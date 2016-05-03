var express = require('express');
var path = require('path');
//routing utilities
// custom helper middleware 
var helpers = require('../config/helpers.js');

module.exports =  (app, express) => {
  // app.get('/example', examplecontroller);
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};

