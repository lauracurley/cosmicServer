var Sequelize = require('sequelize');
var db = require('../database/db.js');

var Wallet = db.define('wallet',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      name: 'userId',
      field: 'user_id',
    },
    steps: {
      type: Sequelize.INTEGER,
      field: 'steps'
    },
  }, 
  {
    freezeTableName: true // Model tableName will be the same as the model name
  }
);


module.exports = Wallet;


