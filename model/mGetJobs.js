var sqlConnection = require("../server/DB/index.js");

/**
 * This function is designed to get the jobs from
 * the database. According to the limit set on the
 * limitJobs. And the jobs are taken according to the
 * offsetIndex
 * @param {String} searchKeyWord
 * @param {Integer} limitJobs
 * @param {Integer} offsetIndex
 * @param {callback} callback
 */
const queryGetJobs = (
  TABLE_NAME,
  searchKeyWord,
  limitJobs,
  offsetIndex,
  callback
) => {
  sqlConnection.query(
    "SELECT * FROM ?? WHERE job_position LIKE ? LIMIT ? OFFSET ?",
    [TABLE_NAME, searchKeyWord, limitJobs, offsetIndex],
    function(error, results) {
      if (error) {
        callback(error, null);
      }
      callback(null, results);
    }
  );
};

module.exports = {
  queryGetJobs: queryGetJobs
};
