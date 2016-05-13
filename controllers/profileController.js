var Profile = require('../models/profile.js');
var User = require('../models/user.js');

module.exports.saveOne = function (req, res) {
  var facebookId = req.body.facebookId;
  var profileData = {
    age: req.body.age,
    gender: req.body.gender,
    zipCode: req.body.zipCode,
    picturePath: req.body.picturePath,
    steps: 500,
  };
  User.findOne({ where: { facebookId: facebookId } }).then(function (user) {
    Profile.findOrCreate({ where: { userId: user.get('id') } })
      .then(function (profile) {
        profile[0].update(profileData);
      }).then(function (profile) {
        res.status(201).json(profile);
      });
  });
};

module.exports.fetchOne = function (req, res) {
  res.status(200).end();
};
