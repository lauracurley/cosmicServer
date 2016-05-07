var Profile = require('../models/profile.js');

module.exports.saveOne = function(req, res) {
  res.status(201).end();
  // EXAMPLE CODE:
  // var user = req.body;
  // User.findOrCreate({where: user})
  //   .then(function(createdUser) {
  //     res.json(createdUser);
  //   });
  // };

  // var user = req.body.user;
  // var place = req.body.place;

  // User.findOne({
  //   where: user
  // })
  // .then(function(foundUser) {
  //   Place.findOrCreate({where: place})
  //     .spread(function(foundOrCreatedPlace) {
  //        foundUser.addPlace(foundOrCreatedPlace)
  //         .then(function(){
  //           return foundUser.getPlaces();
  //         })
  //         .then(function(foundPlace){
  //           console.log('foundplace', foundPlace);
  //           res.json(foundPlace);
  //         })

  //    });
  // });
};

module.exports.fetchOne = function(req, res) {
  res.status(200).end();
};

