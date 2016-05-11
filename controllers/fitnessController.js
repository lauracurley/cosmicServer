const Fitness = require('../models/fitness.js');
const User = require('../models/user.js');

module.exports.saveFitbit = (fitnessData, facebookId) => {
  User.findOne({ where: { facebookId: facebookId } }).then((user) => {
    Fitness.findOrCreate({ where: { userId: user.get('id') } })
      .then((fitness) => {
        fitness[0].update({
          steps: fitnessData.steps,
          restingHeartRate: fitnessData.restingHeartRate,
          sedentaryMinutes: fitnessData.sedentaryMinutes,
          lightlyActiveMinutes: fitnessData.lightlyActiveMinutes,
          fairlyActiveMinutes: fitnessData.fairlyActiveMinutes,
          veryActiveMinutes: fitnessData.veryActiveMinutes,
        });
      });
  });
};
//  Logic to refresh fitness data
//  fitbitController.refreshToken(token, id, function(error, access){
//     fitbitController.fetchFitbitData(access, function(error, data){
//      fitnessController.saveFitbit(data, id);
//     });
//  });
