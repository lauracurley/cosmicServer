var Message = require('../models/message.js');
var User = require('../models/user.js');
var Profile = require('../models/profile.js');

module.exports.saveOne = function (req, res) {

  // res.send(200);
  var messageData = {
    fromUserFacebookId: req.body.fromUserFacebookId, 
    toUserId: req.body.toUserId,
    text: req.body.text,
    timestamp: req.body.timestamp,
  };

  // First, find the user id that corresponds to the "from" user's facebook id
  User.findOne({ where: { facebookId: messageData.fromUserFacebookId } })
    .then(function (fromUser) {
      var _fromUserId = fromUser.get('id');
      var _updatedMessageData = {
        fromUserId: _fromUserId,
        toUserId: req.body.toUserId,
        text: req.body.text,
        timestamp: req.body.timestamp,
      };

    var profileData = {
      text: _updatedMessageData.text,
    };

    Profile.findOne({ where: { userId: _updatedMessageData.fromUserId } })
      .then(function(profile) {
        profile.update(profileData);
      });

    Profile.findOne({ where: { userId: _updatedMessageData.toUserId } })
      .then(function(profile) {
        profile.update(profileData);
      });

    // Then, save the message
    Message.create(_updatedMessageData).then(function(message) {
      res.status(201).json(message.dataValues);
    })
  });
};

module.exports.fetchAll = function (req, res) {

  var _users = {
    fromUserFacebookId: req.query.fromUserFacebookId,
    toUserId: req.query.toUserId,
  };

  // First, find the user id that corresponds to the "from" user's facebook id
  User.findOne({ where: { facebookId: _users.fromUserFacebookId } }).then(function (fromUser) {
    var _fromUserId = fromUser.get('id');
    var _updatedUsers = {
      fromUserId: _fromUserId,
      toUserId: Number(_users.toUserId),
    };

    // Then, fetch all the messages that are shared between the 2 users
    Message
      .findAll({
        where: {
          $or: [ { $and: [ { from_user_id: _updatedUsers.fromUserId }, { to_user_id: _updatedUsers.toUserId } ] }, { $and: [ { from_user_id: _updatedUsers.toUserId }, { to_user_id: _updatedUsers.fromUserId } ] } ]
        }
      })
      .then(function (messages) {
        var messagesArray = [];
        for (var i = 0; i < messages.length; i++) {
          // Attach facebook id to the "from" user so that the client side can access it. The client side only has access to the facebook id and not the user ids
          if (messages[i].dataValues.fromUserId === _updatedUsers.fromUserId) {
            messages[i].dataValues.fromUserFacebookId = _users.fromUserFacebookId;
          }
          messagesArray.push(messages[i].dataValues);
        }
        res.status(200).json(messagesArray);
      }); 
  });

};

module.exports.fetchLast = function (req, res) {

  Message.find({ where: { id: req.query.incomingMessageId } }).then(function(message) {
    res.status(200).json(message.dataValues);
    
  });

};

