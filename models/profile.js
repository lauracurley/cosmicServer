const Sequelize = require('sequelize');
const db = require('../database/db.js');

const Profile = db.define('profile',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    age: {
      type: Sequelize.INTEGER,
      field: 'age',
    },
    gender: {
      type: Sequelize.STRING,
      field: 'gender',
    },
    zipCode: {
      type: Sequelize.INTEGER,
      field: 'zip_code',
    },
    picturePath: {
      type: Sequelize.STRING,
      field: 'picture_path',
    },
    steps: {
      type: Sequelize.INTEGER,
      field: 'steps',
    },
    text: {
      type: Sequelize.STRING,
      field: 'text',
    },
  },
  {
    freezeTableName: true, // Model tableName will be the same as the model name
  }
);

module.exports = Profile;
