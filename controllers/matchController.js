const Match = require('../models/match.js');
const User = require('../models/user.js');

module.exports.fetchAll = (req, res) => {

  var fromUserFacebookId = req.query.fromUserFacebookId;

  User.findOne({ where: { facebookId: fromUserFacebookId } }).then(function (fromUser) {
    var fromUserId = fromUser.get('id');

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

        User.findAll({ where: { id: matchesArray } }).then(function(matches) {
          var matchesArray = [];
          for (var i = 0; i < matches.length; i++) {
            matchesArray.push(matches[i].dataValues);
          }
          console.log('MATCHES ARRAY: ', matchesArray);
          res.status(200).json(matchesArray);
        });
      });

  });

};

// module.exports.serveMatches = (req, res) => {
//   const facebookId = req.params.facebookId;
//   User.findOne({
//     where: { facebookId: facebookId },
//   }).then((user) => {
//     const userId = user.get('id');
//     Match.findAll({
//       where: { userId: userId },
//       order: '"updatedAt" DESC',
//       attributes: ['likerUserId', 'likedUserId'],
//     }).then((matches) => {
//       const matchIds = matches.map((Ids) => {
//         if (Ids[0] === userId) {
//           return Ids[1];
//         } else if (Ids[1] === userId) {
//           return Ids[2];
//         }
//         return null;
//       });
//       res.json(200).send(matchIds);
//     });
//   });
// };
