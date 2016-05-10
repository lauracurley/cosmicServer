var Message = require('../models/message.js');
var User = require('../models/user.js');

module.exports.saveOne = function (req, res) {
  var messageData = {
    fromUserFacebookId: req.body.fromUserFacebookId, 
    toUserId: req.body.toUserId,
    text: req.body.text,
    timestamp: req.body.timestamp,
  };

  User.findOne({ where: { facebookId: messageData.fromUserFacebookId } }).then(function (fromUser) {
    var _fromUserId = fromUser.get('id');
    var _updatedMessageData = {
      fromUserId: _fromUserId,
      toUserId: req.body.toUserId,
      text: req.body.text,
      timestamp: req.body.timestamp,
    };

    Message.create(_updatedMessageData).then(function(message) {
      res.status(201).json(message.dataValues);
    }) 
  });
};

module.exports.fetchAll = function (req, res) {
  var _idArray = req.query.users.split(' ');
  var _users = {
    fromUserFacebookId: _idArray[0],
    toUserId: Number(_idArray[1]),
  };

  User.findOne({ where: { facebookId: _users.fromUserFacebookId } }).then(function (fromUser) {
    var _fromUserId = fromUser.get('id');
    var _updatedUsers = {
      fromUserId: _fromUserId,
      toUserId: Number(_idArray[1]),
    };
    Message.findAll({ where: { $and: [ { from_user_id: _updatedUsers.fromUserId }, { to_user_id: _updatedUsers.toUserId } ] } }).then(function (messages) {
      var messagesArray = [];
      for (var i = 0; i < messages.length; i++) {
        messagesArray.push(messages[i].dataValues);
      }
      // console.log('MESSAGES: ', messagesArray);
      res.status(200).json(messagesArray);
    });
    
  });

};


