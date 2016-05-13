const Match = require('../models/match.js');
const MatchDelete = require('../models/matchDelete.js');
const User = require('../models/user.js');
const Profile = require('../models/profile.js');
const walletController = require('../controllers/walletController.js');
const MatchRequest = require('../models/matchRequest.js');

module.exports.fetchAll = (req, res) => {

  var fromUserFacebookId = req.query.fromUserFacebookId;

  // First, find the user id that corresponds to the given facebook id
  User.findOne({ where: { facebookId: fromUserFacebookId } }).then((fromUser) => {
    var fromUserId = fromUser.get('id');

    // Then, find an array of matches of the "other" users ids 
    Match
      .findAll({
        where: {
          $or: [{from_user_id: fromUserId}, {to_user_id: fromUserId}]
        }
      })
      .then((matches) => {
        var matchesArray = [];
        for (var i = 0; i < matches.length; i++) {
          var otherUserId;
          if (matches[i].dataValues.fromUserId === fromUserId) {
            matchesArray.push(matches[i].dataValues.toUserId)
          } else {
            matchesArray.push(matches[i].dataValues.fromUserId)
          }

        }

        // Then, find an array contain the firstName, lastName, etc of the other users
        User.findAll({ where: { id: matchesArray } }).then((matches) => {
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

module.exports.deleteOne = (req, res) => {
  
  var fromUserFacebookId = req.query.fromUserFacebookId;
  var toUserId = req.query.toUserId;

  // First, find the user id that corresponds to the given facebook id
  User.findOne({ where: { facebookId: fromUserFacebookId } }).then((fromUser) => {
    var fromUserId = fromUser.get('id');

    Match
      .destroy({
        where: {
          $or: [ { $and: [ { from_user_id: fromUserId }, { to_user_id: toUserId } ] }, { $and: [ { from_user_id: toUserId }, { to_user_id: fromUserId } ] } ]
        }
      })
      .then((deleted) => {
        MatchDelete.create({
          fromUserId: fromUserId,
          toUserId: toUserId,
        }).then((user) => {
          res.status(200).json(user.dataValues);
        })
      })
  });
};

module.exports.saveOne = (req, res) => {
  const facebookId = req.body.facebookId;
  const likedUserId = req.body.likedUserId;
    // find match price
      // subtract match price from wallet
  walletController.spendSteps(facebookId, likedUserId, (wallet => {
    // add match request to match request table
    User.findOne({ where: { facebookId } }).then((user) => {
      const userId = user.get('id');
      Match.create({
        fromUserId: userId,
        toUserId: likedUserId,
      }).then(() => {
        Match.findOne({
          where: {
            fromUserId: likedUserId,
            toUserId: userId,
          },
        }).then(likedMatchRequest => {
          if (likedMatchRequest) {
            // let the client know they have a new a match
            res.status(201).json({ steps: wallet.steps, newMatch: true });
          } else {
            Match.create({
              fromUserId: likedUserId,
              toUserId: userId,
            }).then(() => {
              res.status(201).json({ steps: wallet.steps, newMatch: false });
            });
          }
        });
      });
    });
  }));
};
