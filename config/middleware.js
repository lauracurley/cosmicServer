var bodyParser = require('body-parser');



module.exports = (app, express) => {
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

};
