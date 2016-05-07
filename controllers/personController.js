var Person = require('../models/person.js');


module.exports.saveOne = function(req, res) {
  var personData = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    facebook_id: req.body.facebookID
  };

  Person
    .findOrCreate({where: personData})
    .spread(function(person, created) {
      res.status(201).json(person.dataValues);
    });
};

module.exports.fetchOne = function(req, res) {
  res.status(200).end();
};

module.exports.fetchAll = function(req, res) {
  res.status(200).end();
};



