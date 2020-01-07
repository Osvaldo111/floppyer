var sqlConnection = require("../server/DB/index");
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
var sessionStore = new MySQLStore(
  {} /* session store options */,
  sqlConnection
);
const SESSION_NAME = "sid";

/**
 * @author Osvaldo Carrillo
 * Date: 12/26/19
 * This function is designed to destroy the user
 * administrador credentials. And remove the session
 * from the database
 * @param {Object} req
 * @param {Object} res
 */
logoutUser = (req, res) => {
  var getSessionId = req.sessionID;
  sessionStore.destroy(getSessionId, function(error) {
    if (error) {
      console.log("Logout Somethign Wrong: ", error);
      res.status(500).json(false);
    } else {
      req.session.destroy();
      res.clearCookie(SESSION_NAME, { path: "/" });
      res.status(200).json(true);
    }
  });
};

module.exports = {
  logoutUser: logoutUser
};
