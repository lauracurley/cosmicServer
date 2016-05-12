const Sequelize = require('sequelize');
const db = require('../database/db.js');

const NoInterest = db.define('no_interest',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    fromUserId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      name: 'fromUserId',
      field: 'from_user_id',
    },
    toUserId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      name: 'toUserId',
      field: 'to_user_id',
    },
  },
  {
    freezeTableName: true, // Model tableName will be the same as the model name
  }
);

module.exports = NoInterest;
