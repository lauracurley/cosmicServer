var Wallet = require('../models/wallet.js');
var Profile = require('../models/profile.js');
var User = require('../models/user.js');

module.exports.spendSteps = (req, res) => {

  var facebookId = req.body.facebookId;
  var likedId = req.body.likedId;
  User.findOne({ where: { facebookId: facebookId } }).then((user) => {
    Wallet.findOne({ where: { userId: user.get('id') } }).then((wallet) => {
      Profile.findOne({ where: { userId: likedId } }).then((likedProfile) => {
        // Handle cases where wallet is less than likedUser steps
        var newSteps = wallet.get('steps') - likedProfile.get('steps');
        wallet.update({ steps: newSteps });
        res.status(201).send(newSteps);
      });
    });
  });
};
