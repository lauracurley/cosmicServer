var User = require('../models/user.js');


module.exports.saveOne = function(req, res) {
  console.log('Saved one!');
  console.log(req.body);
  res.json({
    hello: 1
  });
};

module.exports.fetchAll = function(req, res) {

};



