var sqlConnection = require("../server/DB/index.js");

const queryGetAdminCredentials = (userName, password, callback) => {
  sqlConnection.query(
    "SELECT user FROM users WHERE user = ? AND user_password = ?",
    [userName, password],
    function(error, results, fields) {
      if (error) callback(error, null);
      if (results.length > 0) {
        callback(null, results);
      } else {
        callback(null, false);
      }
    }
  );
};

module.exports = {
  queryGetAdminCredentials: queryGetAdminCredentials
};
