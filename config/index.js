module.exports = function() {
  var db = require('./db.js');
  var Fitness = require('../models/fitness.js');
  var Match = require('../models/match.js');
  var Message = require('../models/message.js');
  var Profile = require('../models/profile.js');
  var User = require('../models/user.js');
  var Wallet = require('../models/wallet.js');

  // Not sure if this block is right...
  Match.belongsToMany(User, {through: 'Match'});
  User.belongsToMany(Match, {through: 'User'});

  Message.belongsToMany(User, {through: 'Message'});
  User.belongsToMany(Message, {through: 'User'});


  // Place.belongsToMany(User, {through: 'UserPlace'});
  // User.belongsToMany(Place, {through: 'UserPlace'});

  // Place.sync(); //use {force: true} option to drop existing tables
  // User.sync();
  db.sync(); //Using this instead of syncing place and user separately creates the joint table UserPlace in the database.
};
