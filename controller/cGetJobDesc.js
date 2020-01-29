const mGetJobDesc = require("../model/mGetJobDescription.js");
const DB_TABLE = "generaljobs";

/**
 * This function sends the description of the job
 * the user selected according to the "id" of the job.
 * @param {Object} req
 * @param {Object} res
 */
getJobDesc = (req, res) => {
  var jobId = req.body.example;

  mGetJobDesc.queryGetJobDescription(DB_TABLE, jobId, function(error, results) {
    if (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
    res.status(200).json(results);
  });
};

module.exports = {
  getJobDesc: getJobDesc
};
