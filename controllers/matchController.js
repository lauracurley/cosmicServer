const Match = require('../models/match.js');
const User = require('../models/user.js');

module.exports.serveMatches = (req, res) => {
  const facebookId = req.params.facebookId;
  User.findOne({
    where: { facebookId: facebookId },
  }).then((user) => {
    const userId = user.get('id');
    Match.findAll({
      where: { userId: userId },
      order: '"updatedAt" DESC',
      attributes: ['likerUserId', 'likedUserId'],
    }).then((matches) => {
      const matchIds = matches.map((Ids) => {
        if (Ids[0] === userId) {
          return Ids[1];
        } else if (Ids[1] === userId) {
          return Ids[2];
        }
        return null;
      });
      res.json(200).send(matchIds);
    });
  });
};
