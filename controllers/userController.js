var User = require('../models/user.js');


module.exports.saveOne = function (req, res) {
  var userData = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    facebookId: req.body.facebookId,
  };
  User
    .findOrCreate({ where: userData })
    .spread(function (user) {
      res.status(201).json(user.dataValues);
    });
};

module.exports.fetchOne = function (req, res) {
  res.status(200).end();
};

module.exports.fetchAll = function (req, res) {
  res.status(200).end();
};

// If a refresh token is saved to the database the user is authorized
module.exports.isAuthed = function (req, res) {
  var facebookId = req.body.facebookId;
  User.findOne({ where: { facebookId: facebookId } })
    .then(function (user) {
      if (user && user.get('fitbitToken')) {
        res.status(201).json(true);
      } else {
        res.status(201).json(false);
      }
    });
};



