var sqlConnection = require("../server/DB/index.js");

/**
 * This function is designed to get the job
 * description of a selected job according to the
 * Id provided.
 * @param {Integer} JobId
 * @param {Callback} callback
 */
const queryGetJobDescription = (TABLE_NAME, JobId, callback) => {
  sqlConnection.query(
    "SELECT * FROM ?? WHERE id = ?",
    [TABLE_NAME, JobId],
    function(error, results) {
      if (error) callback(error, results);
      callback(null, results);
    }
  );
};

module.exports = {
  queryGetJobDescription: queryGetJobDescription
};
