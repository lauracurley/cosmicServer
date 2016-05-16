const fitnessController = require('./controllers/fitnessController.js');
const messageController = require('./controllers/messageController.js');
const profileController = require('./controllers/profileController.js');
const userController = require('./controllers/userController.js');
const walletController = require('./controllers/walletController.js');
const fitbitController = require('./controllers/fitbitController.js');
const noInterestController = require('./controllers/noInterestController.js');
const matchRequestController = require('./controllers/matchRequestController.js');
const matchDeleteController = require('./controllers/matchDeleteController.js');
const matchController = require('./controllers/matchController.js');

const express = require('express');
const path = require('path');


module.exports = (app, express) => {
  // EXAMPLE CODE:

  app.get('/', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
  });

  app.get('/api/wallet', walletController.update);

  app.post('/api/match', matchRequestController.saveOne);

  app.post('/api/fitbit', fitbitController.authorize);
  app.get('/api/users', userController.serveUsers);
  app.get('/auth', userController.isAuthed);

  app.post('/api/user', userController.saveOne);
  app.post('/api/user', userController.fetchOne);
  app.get('/api/user', userController.fetchAll);

  app.post('/api/message', messageController.saveOne);
  app.get('/api/message', messageController.fetchAll);
  app.get('/api/message/last', messageController.fetchLast);

  app.post('/api/profile', profileController.saveOne);
  app.post('/api/profile', profileController.fetchOne);

  app.get('/api/match', matchController.fetchAll);
  app.delete('/api/match', matchController.deleteOne);

};

