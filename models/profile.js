var Sequelize = require('sequelize');
var db = require('../database/db.js');

var Profile = db.define('profile',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    userId: {
      type: Sequelize.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
      name: 'userId',
      field: 'user_id',
    },
    age: {
      type: Sequelize.INTEGER,
      field: 'age'
    },
    gender: {
      type: Sequelize.STRING,
      field: 'gender'
    }, 
    zipCode: {
      type: Sequelize.INTEGER,
      field: 'zip_code'
    },
    picturePath: {
      type: Sequelize.STRING,
      field: 'picture_path'
    }
  }, 
  {
    freezeTableName: true // Model tableName will be the same as the model name
  }
);


module.exports = Profile;