var cStoreJobsStackOvf = require("../controller/cStoreJobsStackOvf");
var cGetJobsWWR = require("../controller/cGetJobsFromWWR");

/**
 * Store jobs in General Jobs
 */
storeJobs = (req, res) => {
  var siteUrl = req.body.siteUrl;
  console.log("SITE URL***********************", siteUrl);
  if (siteUrl.includes("stackoverflow.com")) {
    console.log("*************************STACK OVERFLOW");
    cStoreJobsStackOvf.storeJobsFromStackOverflow(req, res);
  } else {
    console.log("we work remotely****************************");
    cGetJobsWWR.storeJobsFromWWR(req, res);
  }
};

module.exports = {
  storeJobs: storeJobs
};
