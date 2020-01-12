var sqlConnection = require("../server/DB/index.js");

const queryInsertPostJobs = (TABLE_NAME, data, callback) => {
  sqlConnection.query(
    "INSERT INTO ?? VALUES(0, ?, ?, ?, ?, ?)",
    [
      TABLE_NAME,
      data.companyName,
      data.jobPosition,
      data.schedule,
      data.contact,
      data.comments
    ],
    (error, results) => {
      if (error) callback(error, null);
      callback(null, results);
    }
  );
};

module.exports = {
  queryInsertPostJobs: queryInsertPostJobs
};
