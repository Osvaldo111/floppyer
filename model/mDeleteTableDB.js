var sqlConnection = require("../server/DB/index.js");

/**
 * @author: Osvaldo Carrillo
 * Date: 01/03/2020
 * This funciton is designed to delete a table from
 * the Database.
 */
const queryDeleteTable = (TABLE_NAME, callback) => {
  sqlConnection.query(
    "DELETE FROM ??",
    TABLE_NAME,
    (error, results, fields) => {
      if (error) callback(error, null);
      callback(null, results);
    }
  );
};

module.exports = {
  queryDeleteTable: queryDeleteTable
};
