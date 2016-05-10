var Sequelize = require('sequelize');
var db = require('../database/db.js');

var User = db.define('users',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      field: 'email',
    },
    firstName: {
      type: Sequelize.STRING,
      field: 'first_name',
    },
    lastName: {
      type: Sequelize.STRING,
      field: 'last_name',
    },
    facebookId: {
      type: Sequelize.STRING,
      field: 'facebook_id',
    },
    fitbitToken: {
      type: Sequelize.STRING,
      field: 'fitbit_token',
    },
  },
  {
    freezeTableName: true, // Model tableName will be the same as the model name
  }
);


module.exports = User;
