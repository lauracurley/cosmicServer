'use strict';
const User = require('../models/user.js');
const Match = require('../models/match.js');
const Profile = require('../models/profile.js');
const Fitness = require('../models/fitness.js');
const MatchRequest = require('../models/matchRequest.js');
const MatchDelete = require('../models/matchDelete.js');

module.exports.saveOne = (req, res) => {
  const userData = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    facebookId: req.body.facebookId,
  };
  User
    .findOrCreate({ where: userData })
    .spread((user) => {
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
  const facebookId = req.query.facebookId;
  User.findOne({ where: { facebookId } })
    .then((user) => {
      if (user && user.get('fitbitToken')) {
        res.status(201).json({ isAuthed: true });
      } else {
        res.status(201).json({ isAuthed: false });
      }
    });
};

module.exports.serveUsers = (req, res) => {
  const facebookId = req.query.facebookId;
  const gender = req.query.gender;
  let targetGender;
  if (gender === 'female') {
    targetGender = 'male';
  } else if (gender === 'male') {
    targetGender = 'female';
  }
  User.findOne({ where: { facebookId } }).then(user => {
    const userId = user.get('id');
    Match.findAll({
      where: {
        $or: [{ from_user_id: userId }, { to_user_id: userId }],
      },
    }).then(matches => {
      const matchIds = matches.map(match => {
        return match.get('toUserId') === userId ? match.get('fromUserId') : match.get('toUserId');
      });
      matchIds.push(userId);
      MatchRequest.findAll({
        where: {
          fromUserId: userId },
      }).then(matchRequests => {
        matchRequests.forEach(matchRequest => {
          matchIds.push(matchRequest.get('toUserId'));
        });
        MatchDelete.findAll({
          where: {
            $or: [{ from_user_id: userId }, { to_user_id: userId }],
          },
        }).then(matchDeletes => {
          matchDeletes.forEach(matchDelete => {
            matchIds.push(matchDelete.get('fromUserId') === userId ? matchDelete.get('toUserId') : match.get('fromUserId'));
          });
          User.findAll({
            where: {
              id: {
                 $notIn: matchIds,
              },
            },
            include: [
              {
                model: Profile,
                where: {},
                // where: { gender: targetGender },
              },
              {
                model: Fitness,
                where: {},
              },
            ],
          }).then(usersData => {
            if (usersData.length) {
              const userQueue = usersData.map(userData => {
                return ({
                  id: userData.get('id'),
                  firstName: userData.get('firstName'),
                  picturePath: userData.profile.get('picturePath'),
                  age: userData.profile.get('age'),
                  steps: userData.profile.get('steps'),
                  restingHeartRate: userData.fitness.get('restingHeartRate'),
                });
              });
              res.status(200).json({ userQueue });
            } else {
              const userQueue = [{
                id: null,
                firstName: 'Blake Lively',
                picturePath: 'http://localhost:8000/public/img/blake-lively.jpg',
                age: 25,
                steps: 9000,
                restingHeartRate: 68,
              }];
              res.status(200).json({ userQueue });
            }
          });
        });
      });
    });
  });
};
