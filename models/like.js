var Sequelize = require('sequelize');
var db = require(__dirname + '/../config/db.js');

var Like = db.define('Like',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    cost: {
      type: Sequelize.INTEGER,
      field: 'cost'
    },
    points: {
      type: Sequelize.INTEGER,
      field: 'points'
    }
  }, 
  {
    freezeTableName: true // Model tableName will be the same as the model name
  }
);


module.exports = Like;