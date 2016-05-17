 module.exports = function() {
  var db = require('./db.js');
  var Fitness = require('../models/fitness.js');
  var NoInterest = require('../models/noInterest.js');
  var MatchRequest = require('../models/matchRequest.js');
  var MatchDelete = require('../models/matchDelete.js');
  var Match = require('../models/match.js');
  var Message = require('../models/message.js');
  var Profile = require('../models/profile.js');
  var Wallet = require('../models/wallet.js');
  var User = require('../models/user.js');
  var fitnessController = require('../controllers/fitnessController.js');
  var userController = require('../controllers/userController.js');
  var fitbitController = require('../controllers/fitbitController.js');
  var noInterestController = require('../controllers/noInterestController.js');
  var matchRequestController = require('../controllers/matchRequestController.js');
  var matchDeleteController = require('../controllers/matchDeleteController.js');
  var matchController = require('../controllers/matchController.js');
  var messageController = require('../controllers/messageController.js');
  var profileController = require('../controllers/profileController.js');
  var walletController = require('../controllers/walletController.js');

  // Not sure if this block is right...

  // Place.sync(); //use {force: true} option to drop existing tables
  // User.sync();

  User.hasOne(Wallet, { foreignKey: {
    name: 'userId',
    field: 'user_id',
  } });
  User.hasOne(Profile, { foreignKey: {
    name: 'userId',
    field: 'user_id',
  } });
  User.hasOne(Fitness, { foreignKey: {
    name: 'userId',
    field: 'user_id',
  } });

  db.sync(); //Using this instead of syncing place and user separately creates the joint table UserPlace in the database.
  // userController.serveUsers("allenanderson",'male');
  // walletController.spendSteps("allenanderson","3");
};

