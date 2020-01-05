const mGetJobs = require("../model/mGetJobs");
const DB_TABLE = "stackoverflowjobs";

/**
 * This function sends the data retrieve from
 * the Database to the client which consits of the
 * jobs available.
 * @param {Object} req
 * @param {Object} res
 * @param {Object} sqlConnection
 */
getJobs = (req, res) => {
  var offsetIndex = req.body.offsetIndex;
  var limitJobs = req.body.numJobs;
  var searchJobKeyWord = "%" + req.body.keyword + "%";
  mGetJobs.queryGetJobs(
    DB_TABLE,
    searchJobKeyWord,
    limitJobs,
    offsetIndex,
    function(error, results) {
      if (error) {
        console.log("getJobs()", error);
        res.status(500).json({ error: error });
      } else {
        res.status(200).json(results);
      }
    }
  );
};

module.exports = {
  getJobs: getJobs
};
