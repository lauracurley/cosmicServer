const Sequelize = require('sequelize');
const db = require('../database/db.js');

const Wallet = db.define('wallet',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    steps: {
      type: Sequelize.INTEGER,
      field: 'steps',
    },
  },
  {
    freezeTableName: true, // Model tableName will be the same as the model name
  }
);

module.exports = Wallet;
