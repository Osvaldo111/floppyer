var connection = require("../config/index.js");

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;
