var Wallet = require('../models/wallet.js');
var Profile = require('../models/profile.js');
var User = require('../models/user.js');

module.exports.spendSteps = function (req, res) {
  var facebookId = req.body.facebookId;
  var likedId = req.body.likedId;
  User.findOne({ where: { facebookId: facebookId } }).then(function (user) {
    Wallet.findOne({ where: { userId: user.get('id') } }).then(function (wallet) {
      Profile.findOne({ where: { id: likedId } }).then(function (likedProfile) {
        // Handle cases where wallet is less than likedUser steps
        var newSteps = wallet.get('steps') - likedProfile.get('steps');
        Wallet.update({ steps: newSteps });
        res.status(201).send(newSteps);
      });
    });
  });
};
