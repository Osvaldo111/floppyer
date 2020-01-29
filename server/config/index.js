var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "techshore_jobs",
  charset: "utf8mb4" /* This is important to insert emojis*/,
  dateStrings: "true" /*Return the date as string */
});

module.exports = connection;
