var Fitness = require('../models/fitness.js');
var user =  require('../models/user.js');

module.exports.saveFitbit = function(fitnessData, facebookID){
  User.findOne({where: {facebookID: facebookID}}).then(function(user){
    Fitness.update({steps: fitnessData.steps,
                    restingHeartRate: fitnessData.restingHeartRate,
                    sedentaryMinutes: fitnessData.sedentaryMinutes,
                    lightlyActiveMinutes: fitnessData.lightlyActiveMinutes,
                    fairlyActiveMinutes: fitnessData.fairlyActiveMinutes,
                    veryActiveMinutes: fitnessData.veryActiveMinutes
                    }, {where: {userId: user.id}});
  });
};

}