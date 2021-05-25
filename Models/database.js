const mysql = require("mysql");
const databaseConfig = require("../Config/database.config.js");

var connection = mysql.createPool({
  host: databaseConfig.HOST,
  user: databaseConfig.USER,
  password: databaseConfig.PASSWORD,
  database: databaseConfig.DATABASE
});

module.exports = connection;