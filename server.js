
require('./database/index.js')(); //require and invoke immediately to connect DB

var express = require('express');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 8000;

require('./utilities/middleware.js')(app, express); //config app with required middleware
require('./router.js')(app, express); //define routes for app

io.on('connection', (socket) => {
  socket.on('testing', function(a) {
    console.log('MADE ITTTTTTTTT',a);
  });
  socket.emit('asd');

  socket.on('notifyOtherUserToFetchLast', function() {

  }); 
});

server.listen(port, (err) => {
  if (err) {
    return console.error('Error listening on port ' + port, err);
  }
  console.log('App is listening on port '+ port); //start listening for requests on port 8000
});

module.exports = app; //export app for testing and flexibility

