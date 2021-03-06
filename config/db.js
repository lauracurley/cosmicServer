'use strict'; // eslint-disable-line
const pg = require('pg');
const Sequelize = require('sequelize');
let db;

if (process.env.NODE_ENV === 'production') {
  db = new Sequelize('bits', process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    define: {
      underscored: false,
    },
  });
} else {
  db = new Sequelize('bits', null, null, {
    dialect: 'postgres',
    define: {
      underscored: false,
    },
  });
}

module.exports = db;