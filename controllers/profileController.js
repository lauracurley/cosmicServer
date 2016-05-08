var Profile = require('../models/profile.js');

module.exports.saveOne = function(req, res) {
  var profileData = {
    age: req.body.age,
    gender: req.body.gender,
    zipCode: req.body.zipCode,
    picturePath: req.body.picturePath
  };

  Profile
    .findOrCreate({where: profileData})
    .spread(function(profile, created) {
      // console.log(profile.get({
      //   plain: true
      // }))
    // console.log('Created: ', created);
      res.status(201).json(profile.dataValues);
    });
};

module.exports.fetchOne = function(req, res) {
  
  res.status(200).end();
};

