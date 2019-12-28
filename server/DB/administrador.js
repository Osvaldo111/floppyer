var sqlConnection = require("../config/index");
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
var sessionStore = new MySQLStore(
  {} /* session store options */,
  sqlConnection
);

module.exports = {
  /**
   * @author Osvaldo Carrillo
   * Date: 12/26/19
   * This function is designed to destroy the user
   * administrador credentials. And remove the session
   * from the database
   * @param {Object} req
   * @param {Object} res
   * @param {string} cookieName
   */
  logoutUser(req, res, cookieName) {
    console.log(req.session);
    var getSessionId = req.sessionID;
    sessionStore.destroy(getSessionId, function(error) {
      if (error) throw error;
    });
    req.session.destroy();
    res.clearCookie(cookieName, { path: "/" });
    res.json(true);
  }
};
