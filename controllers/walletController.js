const Wallet = require('../models/wallet.js');
const Profile = require('../models/profile.js');
const User = require('../models/user.js');
const Fitness = require('../models/fitness.js');
const fitbitController = require('../controllers/fitbitController.js');

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

module.exports.update = (req, res) => {
  const facebookId = req.query.facebookId;
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
      fitbitController.refreshToken(facebookId, (error, accessToken) => {
        if (error) {
          return res.status(406).send('Error gaining fitbit authorization reauthorization required');
        }
        fitbitController.fetchLifetimefitbitData(accessToken, (error, lifetimeSteps) => {
          if (error) {
            return res.status(406).send('Error accesing lifetimeSteps from fitbit reauthorization required');
          }
          const currentSteps = user.wallet.get('steps');
          const walletIncrease = lifetimeSteps - user.fitness.get('lifetimeSteps');
          user.wallet.set('steps', currentSteps + walletIncrease);
          console.log(user.wallet.get('steps'));
          res.json(user.wallet.get('steps'));
        });
      });
    });
};
