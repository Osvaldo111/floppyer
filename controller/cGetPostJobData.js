const mPostJob = require("../model/mPostJob");
var sendEmailJob = require("./cSendEmail");
/**
 * This function gets the data from the Post Job
 * Form and send an email to the administrador. Also,
 * this stores the data on the DB with the model.
 * @param {Object} req
 * @param {Object} res
 */

const TABLE_NAME = "postjobs";
getPostJobData = (req, res) => {
  const data = req.body.data;

  mPostJob.queryInsertPostJobs(TABLE_NAME, data, function(error, results) {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "error" });
    } else {
      sendEmailJob.sendEmail(data);
      res.status(200).json(results);
    }
  });
};

module.exports = {
  getPostJobData: getPostJobData
};
