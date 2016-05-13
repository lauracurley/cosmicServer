const Wallet = require('../models/wallet.js');
const Profile = require('../models/profile.js');
const User = require('../models/user.js');
const Fitness = require('../models/fitness.js');

module.exports.fetchSteps = (req, res) => {
  const facebookId = req.query.facebookId;
  module.exports.updateWallet(facebookId, () => {
    User.findOne({
      where: { facebookId },
      include: [
        {
          model: Wallet,
        },
      ] }).then(user => {
        if (user) {
          res.json(user.wallet.get('steps'));
        } else {
          res.status(504).send();
        }
      });
  });
};

module.exports.spendSteps = (facebookId, likedId, callback) => {
  User.findOne({ where: { facebookId } }).then((user) => {
    Wallet.findOne({ where: { userId: user.get('id') } }).then((wallet) => {
      Profile.findOne({ where: { userId: likedId } }).then((likedProfile) => {
        // Handle cases where wallet is less than likedUser steps
        const newSteps = wallet.get('steps') - likedProfile.get('steps');
        wallet.update({ steps: newSteps }).then(steps => {
          callback(steps);
        });
      });
    });
  });
};

module.exports.updateWallet = (facebookId, callback) => {
  User.findOne({
    where: { facebookId },
    include: [
      {
        model: Wallet,
      },
      {
        model: Fitness,
      },
    ] }).then(user => {
      const steps = user.fitness.get('steps');
      user.wallet.get('steps');
      user.wallet.set('steps', steps);
      callback(user.wallet.get('steps'));
    });
};
