module.exports = function() {
  var db = require('./db.js');
  var User = require('../models/user.js');
  var Interest = require('../models/interest.js');
  var Message = require('../models/message.js');
  var Profile = require('../models/profile.js');
  var User = require('../models/user.js');
  var Wallet = require('../models/wallet.js');


  // Place.belongsToMany(User, {through: 'UserPlace'});
  // User.belongsToMany(Place, {through: 'UserPlace'});

  // Place.sync(); //use {force: true} option to drop existing tables
  // User.sync();
  db.sync(); //Using this instead of syncing place and user separately creates the joint table UserPlace in the database.
};
