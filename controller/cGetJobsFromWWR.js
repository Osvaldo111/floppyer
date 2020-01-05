var rp = require("request-promise-native");
var xml2js = require("xml2js");
const mInsertDataInTable = require("../model/mInsertJobsInTable");

/**
 * This function is designed to fetch and save the RSS feed
 * from the website "weworkremotely.com/"
 */
storeJobsFromWWR = (req, res, callback) => {
  const DB_TABLE = "WWR";
  /**Reques the data from the RSS feed */
  const linkToRSS =
    "https://weworkremotely.com/categories/remote-sales-and-marketing-jobs.rss";
  rp(linkToRSS).then(results => {
    //Parse the XML into JSON
    xml2js
      .parseStringPromise(results)
      .then(async results => {
        var WWR = results.rss.channel[0].item;

        var arrayJobs = [];
        for (let index = 0; index < WWR.length; index++) {
          // Parsing the date
          var newDate = new Date(WWR[index].pubDate);
          // Generate a new data to match the DB
          var jobs = {
            id: 0,
            job_position: WWR[index].title,
            company_name: "tom",
            date_posted: newDate,
            job_hours: "Full-Time",
            job_location: "Remote",
            job_description: WWR[index].description,
            job_link: WWR[index].link
          };

          /**
           * Insert the data into the database
           * Use async to loop the Promise correctly.
           */
          await new Promise((resolve, reject) => {
            mInsertDataInTable.queryInsertJobsInTable(DB_TABLE, jobs, function(
              error,
              results
            ) {
              if (error) {
                res.status(500).json({
                  error: error
                });
                reject(error);
              }
              resolve(results);
            });
          });

          arrayJobs.push(jobs);
        }

        return arrayJobs;
      })
      .then(arrayJobs => {
        callback(null, arrayJobs);
      });
  });
};

module.exports = {
  storeJobsFromWWR: storeJobsFromWWR
};
