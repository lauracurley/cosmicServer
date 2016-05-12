const Match = require('../models/match.js');
const User = require('../models/user.js');

module.exports.fetchAll = (req, res) => {

  var fromUserFacebookId = req.query.fromUserFacebookId;

  // First, find the user id that corresponds to the given facebook id
  User.findOne({ where: { facebookId: fromUserFacebookId } }).then(function (fromUser) {
    var fromUserId = fromUser.get('id');

    // Then, find an array of matches of the "other" users ids 
    Match
      .findAll({
        where: {
          $or: [{from_user_id: fromUserId}, {to_user_id: fromUserId}]
        }
      })
      .then(function(matches) {
        var matchesArray = [];
        for (var i = 0; i < matches.length; i++) {
          var otherUserId = 
            matches[i].dataValues.fromUserId === fromUserId ? matches[i].dataValues.toUserId : fromUserId;

          matchesArray.push(otherUserId);
        }

        // Then, find an array contain the firstName, lastName, etc of the other users
        User.findAll({ where: { id: matchesArray } }).then(function(matches) {
          var matchesArray = [];
          for (var i = 0; i < matches.length; i++) {
            matchesArray.push(matches[i].dataValues);
          }
          // console.log('MATCHES ARRAY: ', matchesArray);
          res.status(200).json(matchesArray);
        });
      });

  });

};
