var Sequelize = require('sequelize');
var db = require(__dirname + '/../config/db.js');

var Wallet = db.define('Wallet',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
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


module.exports = Wallet;