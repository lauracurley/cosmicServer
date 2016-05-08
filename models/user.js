var Sequelize = require('sequelize');
var db = require('../database/db.js');

var User = db.define('users',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      field: 'email'
    },
    firstName: {
      type: Sequelize.STRING,
      field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    lastName: {
      type: Sequelize.STRING,
      field: 'last_name'
    },
    facebookID: {
      type: Sequelize.STRING,
      field: 'facebook_id'
    },
    fitbitToken: {
      type: Sequelize.STRING,
      field: 'fitbit_token'
    }
  }, 
  {
    freezeTableName: true // Model tableName will be the same as the model name
  }
);


module.exports = User;