var express = require('express');
var app = express();
require(__dirname + '/config/index.js')(); //require and invoke immediately to connect DB

var port = process.env.PORT || 8000;

//config app with required middleware
require('./config/middleware.js')(app, express);
//define routes for app
require('./routes/routes.js')(app, express);

// start listening to requests on port 8000
app.listen(port, (err) => {
  if(err) {
    return console.log('error listening on port'+ port, err);
  }
  console.log('App is listening on port '+ port);
});

// export our app for testing and flexibility
module.exports = app;