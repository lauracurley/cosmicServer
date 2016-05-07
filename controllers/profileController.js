var Profile = require('../models/profile.js');

module.exports.saveOne = function(req, res) {
  var profileData = {
    age: req.body.age,
    gender: req.body.gender,
    zip_code: req.body.zipCode,
    picture_path: req.body.picturePath
  };

  Profile
    .findOrCreate({where: profileData})
    .spread(function(profile, created) {
      // console.log(profile.get({
      //   plain: true
      // }))
    // console.log('Created: ', created);
    res
      .status(200)
      .json(profile.dataValues);
    });
};

module.exports.fetchOne = function(req, res) {
  res.status(200).end();
};

