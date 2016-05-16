const Fitness = require('../models/fitness.js');
const User = require('../models/user.js');
const Wallet = require('../models/wallet.js');

module.exports.saveDailyFitbit = (fitnessData, facebookId) => {
  User.findOne({ where: { facebookId } }).then(user => {
    Fitness.findOrCreate({ where: { userId: user.get('id') } })
      .then(fitness => {
        fitness[0].update({
          steps: fitnessData.steps,
          restingHeartRate: fitnessData.restingHeartRate,
          sedentaryMinutes: fitnessData.sedentaryMinutes,
          lightlyActiveMinutes: fitnessData.lightlyActiveMinutes,
          fairlyActiveMinutes: fitnessData.fairlyActiveMinutes,
          veryActiveMinutes: fitnessData.veryActiveMinutes,
        });
        Wallet.findOrCreate({ where: { userId: user.get('id') } })
          .then(wallet => {
            wallet[0].update({
              steps: 5000,
            });
          });
      });
  });
};

module.exports.saveLifetimeFitbit = (fitnessData, facebookId) => {
  User.findOne({ where: { facebookId } }).then(user => {
    Fitness.findOrCreate({ where: { userId: user.get('id') } })
      .then(fitness => {
        fitness[0].update({
          lifetimeSteps: fitnessData,
        });
      });
  });
};

