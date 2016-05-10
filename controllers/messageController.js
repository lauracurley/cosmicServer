var Message = require('../models/message.js');

module.exports.saveOne = function (req, res) {
  var messageData = {
    fromUserId: req.body.fromUserId,
    toUserId: req.body.toUserId,
    text: req.body.text,
    timestamp: req.body.timestamp,
  };
  Message
    .findOrCreate({ where: messageData })
    .spread(function (message) {
      res.status(201).json(message.dataValues);
    });
};

module.exports.fetchAll = function (req, res) {
  res.status(200).end();
};

