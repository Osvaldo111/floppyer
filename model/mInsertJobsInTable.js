var sqlConnection = require("../server/DB/index.js");

/**
 * This function is designed to store the jobs
 * from stackoverflow.
 * @param {String} TABLE_NAME
 * @param {Object} jobs
 * @param {Callback} callback
 */
const queryInsertJobsInTable = (TABLE_NAME, jobs, callback) => {
  sqlConnection.query(
    "INSERT INTO ?? SET ?",
    [TABLE_NAME, jobs],
    (error, results) => {
      if (error) callback(error, null);
      callback(null, results);
    }
  );
};

module.exports = {
  queryInsertJobsInTable: queryInsertJobsInTable
};
