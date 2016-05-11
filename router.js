const fitnessController = require('./controllers/fitnessController.js');
const matchController = require('./controllers/matchController.js');
const messageController = require('./controllers/messageController.js');
const profileController = require('./controllers/profileController.js');
const userController = require('./controllers/userController.js');
const walletController = require('./controllers/walletController.js');
const fitbitController = require('./controllers/fitbitController.js');

const express = require('express');
const path = require('path');


module.exports = (app, express) => {

  // EXAMPLE CODE:
  app.get('/api/match', matchController.serveMatches);
  app.post('/api/fitbit', fitbitController.authorize);
  app.post('/auth', userController.isAuthed);
  app.post('/api/user', userController.saveOne);
  app.post('/api/user', userController.fetchOne);
  app.get('/api/user', userController.fetchAll);

  app.post('/api/message', messageController.saveOne);
  app.get('/api/message', messageController.fetchAll);

  app.post('/api/profile', profileController.saveOne);
  app.post('/api/profile', profileController.fetchOne);


};

