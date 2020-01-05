var rp = require("request-promise-native");
var xml2js = require("xml2js");
const mInsertDataInTable = require("../model/mInsertJobsInTable");
const mDeleteTable = require("../model/mDeleteTableDB");
const mResetAutoIncrement = require("../model/mResetAutoIncrementDB");
const DB_TABLE = "stackoverflowjobs";
// stackoverflowjobs;
/**
 * This function is designed to fetch and save the RSS feed
 * from the website "weworkremotely.com/"
 */
storeJobsFromStackOverflow = (req, res) => {
  /**Reques the data from the RSS feed */
  const linkToRSS = req.body.stackOverflowURL;

  Promise.resolve(true)
    .then(() => {
      //Get the data from the RSS Feed
      return rp(linkToRSS)
        .then(results => {
          return results;
        })
        .catch(error => {
          res.status(200).json({ error: "Invalid URL" });
          // Stop the execution
          throw new Error("The Request RSS Feed: " + error);
        });
    })
    .then(data => {
      /**
       * DELETE the past data from the server
       * Wrap the function in a Promise to make
       * the functionality sync.
       */
      return new Promise((resolve, reject) => {
        mDeleteTable.queryDeleteTable(DB_TABLE, function(error, results) {
          if (error) {
            res.status(500).json({ error: "Error" });
            reject(error);
          }
          resolve(data);
        });
      }).catch(error => {
        throw new Error("Deleting table: " + error);
      });
    })
    .then(data => {
      /**
       * RESET the AUTO_INCEMENT to 1
       * Wrap the function in a Promise to make
       * the functionality sync.
       */
      return new Promise((resolve, reject) => {
        mResetAutoIncrement.queryResetAutoIncrement(DB_TABLE, function(
          error,
          results
        ) {
          if (error) {
            res.status(500).json({ error: "Error" });
            reject(error);
          }
          resolve(data);
        });
      }).catch(error => {
        throw new Error("AUTO INCREMENT: " + error);
      });
    })
    .then(results => {
      //Parse the XML into JSON
      return xml2js.parseStringPromise(results).then(results => {
        var data = results.rss.channel[0].item;
        var arrayJobs = [];
        for (let index = 0; index < data.length; index++) {
          // Parsing the date
          var newDate = new Date(data[index].pubDate);

          // Remove the "(allow remote)"
          var job_position = data[index].title
            .toString()
            .replace("()", "")
            .replace("(allows remote)", "");
          // Generate a new data to match the DB
          var job = {
            id: 0,
            job_position: job_position,
            company_name: data[index]["a10:author"][0]["a10:name"],
            date_posted: newDate,
            job_hours: "Full-Time",
            job_location: "Remote",
            job_description: data[index].description,
            job_link: data[index].link
          };
          arrayJobs.push(job);
        }

        return arrayJobs;
      });
    })
    .then(async data => {
      //Inserting the jobs in the database
      for (let index = 0; index < data.length; index++) {
        /**
         * Insert the data into the database
         * Use async to loop the Promise correctly.
         */
        await new Promise((resolve, reject) => {
          mInsertDataInTable.queryInsertJobsInTable(
            DB_TABLE,
            data[index],
            function(error, results) {
              if (error) {
                res.status(500).json({
                  error: "error"
                });
                reject(error);
              }
              resolve(results);
            }
          );
        }).catch(error => {
          throw new Error("INSERT JOB: " + error);
        });
      }
    })
    .then(() => {
      console.log("completed");
      res.json({ success: true });
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = {
  storeJobsFromStackOverflow: storeJobsFromStackOverflow
};
