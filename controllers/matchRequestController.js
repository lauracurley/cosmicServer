const MatchRequest = require('../models/matchRequest.js');
const User = require('../models/user.js');
const Match = require('../models/match.js');
const walletController = require('./walletController.js');


module.exports.saveOne = (req, res) => {
  const facebookId = req.body.facebookId;
  const likedUserId = req.body.likedUserId;
    // find match price
      // subtract match price from wallet
  walletController.spendSteps(facebookId, likedUserId, (wallet => {
    // add match request to match request table
    User.findOne({ where: { facebookId } }).then((user) => {
      const userId = user.get('id');
      MatchRequest.create({
        fromUserId: userId,
        toUserId: likedUserId,
      }).then(() => {
        MatchRequest.findOne({
          where: {
            fromUserId: likedUserId,
            toUserId: userId,
          },
        }).then(likedMatchRequest => {
          if (likedMatchRequest) {
            Match.create({
              fromUserId: likedUserId,
              toUserId: userId,
            }).then(() => {
              Match.create({
                fromUserId: userId,
                toUserId: likedUserId,
              }).then(() => {
                res.status(201).json({ steps: wallet.steps, newMatch: true });
              });
            });
            // let the client know they have a new a match
          } else {
            res.status(201).json({ steps: wallet.steps, newMatch: false });
          }
        });
      });
    });
  }));
};
