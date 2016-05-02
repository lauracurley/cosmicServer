var express = require('express');
var path = require('path');
//routing utilities
var userUtil = require('../utils/userUtils.js')
// custom helper middleware 
var helpers = require('../config/helpers.js');

module.exports =  (app, express) => {
  // app.get('/example', examplecontroller);
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};

