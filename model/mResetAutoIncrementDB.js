var sqlConnection = require("../server/DB/index.js");

/**
 * This function is designed to reset the
 * AUTO_INCREMENT in the database.
 * @param {String} TABLE_NAME
 * @param {Callback} callback
 */
const queryResetAutoIncrement = (TABLE_NAME, callback) => {
  sqlConnection.query(
    "ALTER TABLE ?? AUTO_INCREMENT = 1",
    TABLE_NAME,
    (error, results, fields) => {
      if (error) callback(error, null);
      callback(null, results);
    }
  );
};

module.exports = {
  queryResetAutoIncrement: queryResetAutoIncrement
};
