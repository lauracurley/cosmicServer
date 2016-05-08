var User = require('../models/user.js');


module.exports.saveOne = function(req, res) {
  console.log('REQ: ', req.body);
  var userData = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    facebook_id: req.body.facebookID
  };

  User
    .findOrCreate({where: userData})
    .spread(function(user, wasCreated) {
      res.status(201).json(user.dataValues);
    });
};

module.exports.fetchOne = function(req, res) {
  res.status(200).end();
};

module.exports.fetchAll = function(req, res) {
  res.status(200).end();
};



