var Sequelize = require('sequelize');
var db = require(__dirname + '/../config/db.js');

var Profile = db.define('Profile',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
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