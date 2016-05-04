var bodyParser = require('body-parser');
var morgan = require('morgan'); 

module.exports = (app, express) => {
  app.use(morgan('dev')); //Optional automatic HTTP request/response logger 
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
};
