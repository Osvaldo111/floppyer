var request = require("request");
const DB_TABLE = "stackodaily";
var sqlConnection = require("./index.js");
var xml2js = require("xml2js");
const SESSION_NAME = "sid";

/** */
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
var sessionStore = new MySQLStore(
  {} /* session store options */,
  sqlConnection
);

//Model methods
const mGetJobs = require("../../model/mGetJobs");
const mGetJobDesc = require("../../model/mGetJobDescription.js");
const mDeleteTable = require("../../model/mDeleteTableDB");
const mResetAutoIncrement = require("../../model/mResetAutoIncrementDB");
const mInsertDataStackOverflow = require("../../model/mInsertJobsStackOverflow");
const mGetAdministradorCredentials = require("../../model/mGetAdminCredentials");

module.exports = {
  /**
   * This function sends the data retrieve from
   * the Database to the client which consits of the
   * jobs available.
   * @param {Object} req
   * @param {Object} res
   * @param {Object} sqlConnection
   */
  getJobs(req, res) {
    var offsetIndex = req.body.offsetIndex;
    var limitJobs = req.body.numJobs;
    var searchJobKeyWord = "%" + req.body.keyword + "%";
    mGetJobs.queryGetJobs(searchJobKeyWord, limitJobs, offsetIndex, function(
      error,
      results
    ) {
      if (error) res.status(500).json({ error: error });

      res.status(200).json(results);
    });
  },

  /**
   * This function sends the description of the job
   * the user selected according to the "id" of the job.
   * @param {Object} req
   * @param {Object} res
   */
  getJobDesc(req, res) {
    var jobId = req.body.example;

    mGetJobDesc.queryGetJobDescription(jobId, function(error, results) {
      if (error) res.status(500).json({ error: error });
      res.status(200).json(results);
    });
  },

  /**
   * This function is designed to store the jobs
   * from the StackOverflow RSS feed.
   * @param {Object} req
   * @param {Object} res
   */
  storeJobsFromStackOverflow(req, res) {
    var link = req.body.stackOverflowURL;

    /**
     * Request the data from the stackOverflow
     * RSS URL.
     */
    request(link, function(error, response, body) {
      if (error) {
        console.log("error:", error); // Print the error if one occurred
        console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
        var errors = {
          status: false,
          error: "Invalid URL"
        };
        res.json(errors);
      } else {
        /**
         * Use the Promise for async execution
         */
        Promise.resolve(true)
          .then(() => {
            /**
             * DELETE the past data from the server
             * Wrap the function in a Promise to make
             * the functionality sync.
             */
            return new Promise((resolve, reject) => {
              mDeleteTable.queryDeleteTable(DB_TABLE, function(error, results) {
                if (error) {
                  res.status(500).json({ error: error });
                }
                resolve(results);
              });
            });
          })
          .then(() => {
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
                  res.status(500).json({ error: error });
                }
                resolve(results);
              });
            });
          })
          .then(() => {
            /**
             * Use the model "xml2js" to parse the XML document
             * into a JSON file.
             */
            xml2js
              .parseStringPromise(body)
              /* The use of async in the callback is to execute the promise
                  in the loop */
              .then(async function(result) {
                /*Get the main content of the file which contain all the jobs info */
                var stackOverflowJobs = result.rss.channel[0].item;

                //Format the inputs and store the result in the database
                for (let index = 0; index < stackOverflowJobs.length; index++) {
                  var mydate = new Date(stackOverflowJobs[index].pubDate);
                  var newDate =
                    mydate.getFullYear() +
                    "-" +
                    (mydate.getMonth() + 1) +
                    "-" +
                    mydate.getDate();
                  // Remove the extra text "()" and "(allows remote)"
                  var job_position = stackOverflowJobs[index].title
                    .toString()
                    .replace("()", "")
                    .replace("(allows remote)", "");
                  var jobs = {
                    id: 0,
                    job_position: job_position,
                    company_name:
                      stackOverflowJobs[index]["a10:author"][0]["a10:name"],
                    date_posted: newDate,
                    job_hours: "Full-Time",
                    job_location: "Remote",
                    job_description: stackOverflowJobs[index].description,
                    job_link: stackOverflowJobs[index].link
                  };

                  /**
                   * Insert the data into the database
                   * Use async to loop the Promise correctly.
                   */
                  await new Promise((resolve, reject) => {
                    mInsertDataStackOverflow.queryInsertJobsStackOverflow(
                      DB_TABLE,
                      jobs,
                      function(error, results) {
                        if (error) {
                          res.status(500).json({ error: error });
                        }
                        resolve(results);
                      }
                    );
                  });
                }
              })
              .then(() => {
                var errors = {
                  status: true
                };
                console.log("The jobs are store in the DB");
                res.json(errors);
              })
              .catch(function(err) {
                console.log(err);
              });
          });
      }
    });
  },

  /**
   * This function is designed to log in the
   * administrador.
   * @param {Object} req
   * @param {Object} res
   */
  getCredentialsLogIn(req, res) {
    var userName = req.body.credentials.username;
    var password = req.body.credentials.password;

    mGetAdministradorCredentials.queryGetAdminCredentials(
      userName,
      password,
      function(error, results) {
        if (error) res.status(500).json({ error: error });

        if (results.length > 0) {
          req.session.user = results[0].user;
          res.json(true);
        } else {
          res.json(false);
        }
      }
    );
  },

  /**
   * @author Osvaldo Carrillo
   * Date: 12/26/19
   * This function is designed to destroy the user
   * administrador credentials. And remove the session
   * from the database
   * @param {Object} req
   * @param {Object} res
   */
  logoutUser(req, res) {
    var getSessionId = req.sessionID;
    sessionStore.destroy(getSessionId, function(error) {
      if (error) {
        throw error;
      } else {
        req.session.destroy();
        res.clearCookie(SESSION_NAME, { path: "/" });
        res.json(true);
      }
    });
  }
};
