var User = require('../models/user.js');


module.exports.saveOne = function(req, res) {
  console.log('Saved one user!');
  res.json(1);
  // EXAMPLE CODE:
  // var user = req.body;
  // User.findOrCreate({where: user})
  //   .then(function(createdUser) {
  //     res.json(createdUser);
  //   });
  // };
};

module.exports.fetchAll = function(req, res) {
  res.status(200).end();
};



