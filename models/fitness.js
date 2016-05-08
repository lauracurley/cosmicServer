var Sequelize = require('sequelize');
var db = require('../database/db.js');

var Fitness = db.define('fitness',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    steps: {
      type: Sequelize.INTEGER,
      field: 'steps'
    },
    restingHeartRate: {
      type: Sequelize.INTEGER,
      field: 'resting_heart_rate'
    },
    sedentaryMinutes: {
      type: Sequelize.INTEGER,
      field: 'sedentary_minutes'
    },
    lightlyActiveMinutes: {
      type: Sequelize.INTEGER,
      field: 'lightly_active_minutes'
    },
    fairlyActiveMinutes: {
      type: Sequelize.INTEGER,
      field: 'fairly_active_minutes'
    },
    veryActiveMinutes: {
      type: Sequelize.INTEGER,
      field: 'very_active_minutes'
    },

  }, 
  {
    freezeTableName: true // Model tableName will be the same as the model name
  }
);

module.exports = Fitness;