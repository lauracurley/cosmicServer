var User = require('../models/user.js');


module.exports.saveOne = function(req, res) {
  // res.status(201).end();
  // EXAMPLE CODE:
  // var user = req.body;
  // User.findOrCreate({where: user})
  //   .then(function(createdUser) {
  //     res.json(createdUser);
  //   });
  // };

  console.log('Req.body: ', req.body);
  var user = req.body; 

  // User
  //   .findOrCreate({where: {email: user.email}, defaults: {first_name: user.firstName, last_name: 'h', facebook_id: user.facebookID, fitbit_token: '123'}})
  //   .spread(function(user, created) {
  //     console.log(user.get({
  //       plain: true
  //     }))
  //   console.log('Created: ', created);
  //   });
  User.findOrCreate({where: user})
    .then(function(createdUser) {
      res.json(createdUser);
    });
};

module.exports.fetchOne = function(req, res) {
  res.status(200).end();
};

module.exports.fetchAll = function(req, res) {
  res.status(200).end();
};



