const Sequelize = require('sequelize');
const db = require('../database/db.js');

const Match = db.define('match',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
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

module.exports = Match;
