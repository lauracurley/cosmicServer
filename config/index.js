module.exports = function() {
  var db = require(__dirname + '/db.js');
  var User = require(__dirname + '/../models/user.js');
  var Like = require(__dirname + '/../models/like.js');
  var Message = require(__dirname + '/../models/message.js');
  var Profile = require(__dirname + '/../models/profile.js');
  var User = require(__dirname + '/../models/user.js');
  var Wallet = require(__dirname + '/../models/wallet.js');


  // Place.belongsToMany(User, {through: 'UserPlace'});
  // User.belongsToMany(Place, {through: 'UserPlace'});

  // Place.sync(); //use {force: true} option to drop existing tables
  // User.sync();
  db.sync(); //Using this instead of syncing place and user separately creates the joint table UserPlace in the database.
};
