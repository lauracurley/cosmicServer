'use strict'; // eslint-disable-line
const pg = require('pg');
const Sequelize = require('sequelize');
let db;

if (process.env.NODE_ENV === 'production') {
  db = new Sequelize('cosmictornado', process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    define: {
      underscored: true,
    },
    logging: false, //prevent sequelize from outputting SQL to the console on execution of a query
  });
} else {
  db = new Sequelize('cosmictornado', null, null, {
    dialect: 'postgres',
    define: {
      underscored: true,
    },
    logging: false, //prevent sequelize from outputting SQL to the console on execution of a query
  });
}

module.exports = db;