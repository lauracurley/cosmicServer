// test stuff
require('./database/index.js')(); //require and invoke immediately to connect DB

var express = require('express');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 8000;

require('./utilities/middleware.js')(app, express); //config app with required middleware
require('./router.js')(app, express); //define routes for app
// app.use('/static', express.static(__dirname));
app.use('/public', express.static( __dirname + '/public'));



// Socket logic begins here:
var connected = {};

io.on('connection', (socket) => {

  socket.on('connectedFacebookId', function(facebookId) {
    // socket.join(facebookId);

    connected[facebookId] = socket.id;
    console.log('Connected: ', connected);
    console.log('Connected Rooms: ', socket.rooms);
  });
 
  socket.on('notifyOtherUserToFetchLast', function(ids) {
    console.log('Connected on fetch: ', connected);
    console.log('Connected Rooms on fetch: ', socket.rooms);
    console.log('Tell this person to fetch: ', ids.toUserFacebookId, ' ', connected[ids.toUserFacebookId]);
    
    // var socketToFetch = connected[ids.toUserFacebookId];
    var socketToFetch = connected['10206426211234693'];

    // If the other person is connected...
    if (socketToFetch !== undefined) {
      io.to(socketToFetch).emit('fetchLast', ids.lastSentMessageId);
    }

  }); 

  socket.on('disconnect', function() {
    // Implement this if have time...
  });
});

server.listen(port, (err) => {
  if (err) {
    return console.error('Error listening on port ' + port, err);
  }
  console.log('App is listening on port ' + port); // start listening for requests on port 8000
});

module.exports = app; // export app for testing and flexibility

