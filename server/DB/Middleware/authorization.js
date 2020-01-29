var sqlConnection = require("../index.js");
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
var sessionStore = new MySQLStore(
  {} /* session store options */,
  sqlConnection
);

module.exports = {
  authorization(req, res, next) {
    // console.log("The session on Request (Middleware): ", req.sessionID);
    var getSessionId = req.sessionID;
    sessionStore.get(getSessionId, (error, session) => {
      if (session) {
        res.json(true);
      } else {
        next();
      }
    });
  },

  singleAuthorization(req, res) {
    // console.log("The session on Request (Middleware): ", req.sessionID);

    var getSessionId = req.sessionID;
    sessionStore.get(getSessionId, (error, session) => {
      if (session) {
        res.json(true);
      } else {
        res.json(false);
      }
    });
  }
};
