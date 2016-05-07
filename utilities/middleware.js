var bodyParser = require('body-parser');
var morgan = require('morgan'); 
var helpers = require('./helpers.js'); //custom helper middleware

module.exports = (app, express) => {
  app.use(morgan('dev')); //Optional automatic HTTP request/response logger 
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};
