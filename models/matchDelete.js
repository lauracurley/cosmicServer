const Sequelize = require('sequelize');
const db = require('../database/db.js');

const MatchDelete = db.define('match_delete',
  {
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

module.exports = MatchDelete;
