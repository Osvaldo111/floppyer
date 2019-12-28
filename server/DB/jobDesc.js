var request = require("request");
var parseString = require("xml2js").parseString;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const DB_TABLE = "stackodaily";
module.exports = {
  /**
   * This function sends the data retrieve from
   * the Database to the client
   * @param {Object} req
   * @param {Object} res
   * @param {Object} sqlConnection
   */
  getJobs(req, res, sqlConnection) {
    var offsetIndex = req.body.offsetIndex;
    var limitjobs = req.body.numJobs;
    console.log(
      "offset: ",
      req.body.offsetIndex,
      " Num Jobs: ",
      req.body.numJobs,
      "The Keyword",
      req.body.keyword
    );
    var searchJobKeyWord = "%" + req.body.keyword + "%";
    sqlConnection.query(
      "SELECT * FROM `stackODaily` WHERE job_position LIKE ? LIMIT ? OFFSET ?",
      [searchJobKeyWord, limitjobs, offsetIndex],
      function(error, results) {
        if (error) throw error;
        res.json(results);
      }
    );
  },

  /*Send the description of a specific job */
  getJobDesc(req, res, sqlConnection) {
    var job_id = req.body.example;
    sqlConnection.query(
      "SELECT * FROM stackoDaily WHERE id = ?",
      [job_id],
      function(error, results) {
        if (error) throw error;
        res.json(results);
        // console.log("This is the results: ", results);
      }
    );
  },

  storejobsDB(req, res, sqlConnection) {
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
         * DELETE the past data from the server
         */
        sqlConnection.query("DELETE FROM ??", DB_TABLE, function(
          error,
          results,
          fields
        ) {
          if (error) console.log(error);
          console.log("DELETE DB Completed.");
        });

        /**
         * RESET the AUTO_INCEMENT to 1
         */
        sqlConnection.query(
          "ALTER TABLE ?? AUTO_INCREMENT = 1",
          DB_TABLE,
          function(error, results, fields) {
            if (error) console.log(error);

            console.log("The AUTO_INCEMENT = 1, is completed.");
          }
        );

        parseString(body, function(err, result) {
          var stackOverflowJobs = result.rss.channel[0].item;
          var jobsToStoreDB = [];
          for (let index = 0; index < stackOverflowJobs.length; index++) {
            // Remove all the entities and HTML tags from the data
            const copyofDescrStackOv = new JSDOM(
              stackOverflowJobs[index].description
            );
            stackOverflowJobs[
              index
            ].description = copyofDescrStackOv.window.document.querySelector(
              "body"
            ).textContent;
            // Parse the Date according to the DB Format.
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
             */
            sqlConnection.query(
              "INSERT INTO ?? SET ?",
              [DB_TABLE, jobs],
              function(error, results) {
                if (error) {
                  console.log(error);
                }
              }
            );

            /**
             * INSERT the data into the array for the next row.
             */
            jobsToStoreDB.push(stackOverflowJobs[index].link);
          }
          /**
           * Variable to be sent
           */
          var errors = {
            status: true
          };
          res.json(errors);
        });
      }
    });
  },

  getCredentialsLogIn(req, res, sqlConnection, sessionStore) {
    var credentials = req.body.credentials;

    sqlConnection.query(
      "SELECT user FROM users WHERE user = ? AND user_password = ?",
      [credentials.username, credentials.password],
      function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          req.session.user = results[0].user;
          // console.log(results[0].user);
          res.json(true);
        } else {
          res.json(false);
          // console.log("invalid Credentials");
        }
      }
    );
  }
};
