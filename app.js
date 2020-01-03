var createError = require("http-errors");
var express = require("express");
var path = require("path");
var app = express();
var controllerMethods = require("./server/DB/controller.js");
var sqlConnection = require("./server/DB/index.js");
var session = require("express-session");
const secretKey = require("./secretKey.js");
var nodemailer = require("nodemailer");

const COOKIE_LIFETIME = 1000 * 60 * 60 * 24 * 3;
var MySQLStore = require("express-mysql-session")(session);
var sessionStore = new MySQLStore(
  {
    // Whether or not to automatically check for and clear expired sessions:
    clearExpired: true,
    // How frequently expired sessions will be cleared; milliseconds:
    checkExpirationInterval: 86400000 /* 1 Day */,
    // The maximum age of a valid session; milliseconds:
    expiration: COOKIE_LIFETIME
  } /* session store options */,
  sqlConnection
);
var middleware = require("./server/DB/Middleware/authorization.js");

const SESSION_NAME = "sid";
app.use(
  session({
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: secretKey.secret_key,
    store: sessionStore,
    cookie: {
      maxAge: COOKIE_LIFETIME
    }
  })
);

/**This is for production */
var sess = {
  secret: secretKey.secret_key,
  cookie: {
    maxAge: COOKIE_LIFETIME
  }
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); //for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "client/build")));

/**
 * Private Route serving job continer form
 * @name post/api/getJobs
 */
app.post("/api/getJobs", controllerMethods.getJobs);

/**
 * Private Route serving job description form
 * @name post/api/getJobDescription
 */
app.post("/api/getJobDescription", controllerMethods.getJobDesc);

/**
 * Private Route serving store jobs form
 * @name post/api/storeJobs
 */
app.post("/api/storeJobs", controllerMethods.storeJobsFromStackOverflow);

/**
 * Private Route serving job adminstrador login form
 * @name post/api/login
 */
app.post(
  "/api/login",
  middleware.authorization,
  controllerMethods.getCredentialsLogIn
);

/**
 * Private Route to authenticate users.
 * @name post/api/auth
 */
app.post("/api/auth", middleware.singleAuthorization);

/**
 * Private Route serving job continer
 * @name post/api/getJobs
 */

app.post("/api/logoutAdmin", controllerMethods.logoutUser);
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port);
