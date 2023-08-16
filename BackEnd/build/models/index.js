'use strict';

require('dotenv').config();
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var process = require('process');
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
var mysql2 = require('mysql2');
// const config = require(__dirname + '/../config/config.json')[env];
var db = {};
var sequelize;
var configCustomize = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialectModule: mysql2,
  dialect: process.env.DB_DIALECT,
  logging: false,
  query: {
    "raw": true
  },
  timezone: "+07:00",
  define: {
    underscored: false // Sử dụng tên bảng và tên cột chữ thường
  }
};

sequelize = new Sequelize(process.env.DB_DATABASE_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, configCustomize);

// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

fs.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js' && file.indexOf('.test.js') === -1;
}).forEach(function (file) {
  var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;