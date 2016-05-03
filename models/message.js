var Sequelize = require('sequelize');
var db = require('../config/db.js');

var Message = db.define('Message',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    text: {
      type: Sequelize.STRING,
      field: 'text'
    },
    timestamp: {
      type: Sequelize.STRING,
      field: 'timestamp'
    }
  }, 
  {
    freezeTableName: true // Model tableName will be the same as the model name
  }
);


module.exports = Message;