var Sequelize = require('sequelize');
var db = require('../database/db.js');

var Match = db.define('match',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    cost: {
      type: Sequelize.INTEGER,
      field: 'cost'
    }
  }, 
  {
    freezeTableName: true // Model tableName will be the same as the model name
  }
);


module.exports = Match;