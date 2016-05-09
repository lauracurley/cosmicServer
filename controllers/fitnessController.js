var Fitness = require('../models/fitness.js');
var User = require('../models/user.js');

module.exports.saveFitbit = function (fitnessData, facebookId) {
  User.findOne({ where: { facebookId: facebookId } }).then(function (user) {
    console.log(user);
    Fitness.findOrCreate({ where: { userId: user.get('id') } })
      .then(function (fitness) {
        console.log(fitness);
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
