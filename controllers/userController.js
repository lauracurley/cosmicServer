"use strict";
const User = require('../models/user.js');
const Match = require('../models/match.js');
const Profile = require('../models/profile.js');
const Fitness = require('../models/fitness.js');

module.exports.saveOne = (req, res) => {
  const userData = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    facebookId: req.body.facebookId,
  };
  User
    // this should be facebookId, right? otherwise we get dupes if any other field isn't identical
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
  User.findOne({ where: { facebookId: facebookId } })
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
  User.findOne({ where: { facebookId: facebookId } }).then((user) => {
    const userId = user.get('id');
    Match.findAll({
      where: {
        $or: [{ from_user_id: userId }, { to_user_id: userId }],
      },
    }).then((matches) => {
      const matchIds = matches.map((match) =>  {
        return match.get('fromUserId') === userId ? match.get('toUserId') : userId;
      });
      User.findAll({
        where: { id: { $notIn: matchIds } },
        include: [
          {
            model: Profile,
            where: { gender: targetGender },
          },
          {
            model: Fitness,
          },
        ],
      }).then((usersData) => {
        const userQueue = usersData.map((userData) => {
          return ({
            firstName: userData.get('firstName'),
            picturePath: userData.profile.get('picturePath'),
            age: userData.profile.get('age'),
            steps: userData.profile.get('steps'),
            restingHeartRate: userData.fitness.get('restingHeartRate'),
          });
        });
        res.status(200).json({ userQueue: userQueue });
      });
    });
  });
};

