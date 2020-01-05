var request = require("request");
const DB_TABLE = "stackoverflowjobs";
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
const mInsertDataInTable = require("../../model/mInsertJobsInTable");
const mGetAdministradorCredentials = require("../../model/mGetAdminCredentials");

module.exports = {
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
