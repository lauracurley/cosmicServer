const User = require('../models/user.js');
const Match = require('../models/match.js');
const Profile = require('../models/profile.js');
const Sequelize = require('sequelize');

module.exports.saveOne = (req, res) => {
  var userData = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    facebookId: req.body.facebookId,
  };
  User
    // this should be facebookId, right? otherwise we get dupes if any other field isn't identical
    .findOrCreate({ where: userData })
    .spread( (user) => {
      res.status(201).json(user.dataValues);
    });
};

module.exports.fetchOne = (req, res) => {
  res.status(200).end();
};

module.exports.fetchAll = (req, res) => {
  res.status(200).end();
};

// If a refresh token is saved to the database the user is authorized
module.exports.isAuthed = (req, res) => {
  var facebookId = req.body.facebookId;
  User.findOne({ where: { facebookId: facebookId } })
    .then((user) => {
      if (user && user.get('fitbitToken')) {
        res.status(201).json(true);
      } else {
        res.status(201).json(false);
      }
    });
};

module.exports.serveUsers = (req, res) => {
  var facebookId = req.body.facebookId;
  var gender = req.body.gender;
  var targetGender;
  if (gender === 'female') {
    targetGender = 'male';
  } else if (gender === 'male') {
    targetGender = 'female';
  }
  User.findOne({ where: { facebookId: facebookId } }).then((user) => {
    var userId = user.get('id');
      Match.findAll({
        where: Sequelize.or(
          { likedUserId: userId },
          { likerUserId: userId }),
        attributes: ['likedUserId', 'likerUserId'],
      }).then((matches) => {
          // var matchedIds = [1, 2, 3, 4, 5];
        var matchedIds = matches.map((match) => {
          if (match.get('likedUserId') === userId) {
            return match.get('likerUserId');
          } else if (match.get('likerUserId') === userId) {
            return match.get('likedUserId');
          }
        });
        User.findAll({
          where: { id: { $notIn: matchedIds } },
          include: [
            {
              model: Profile,
              where: { gender: targetGender },
            },
          ],
        }).then((userData) => {
          const userQueue = userData.map((user) => {
            return ([
              user.get('firstName'),
              user.profile.get('picturePath'),
              user.profile.get('age'),
              user.profile.get('steps'),
            ]);
          });
          res.status(200).json(userQueue);
        });
      });
  });
};

