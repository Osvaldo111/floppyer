var createError = require("http-errors");
var express = require("express");
var path = require("path");
var app = express();
var DBMethods = require("./server/DB/jobDesc.js");
var sqlConnection = require("./server/DB/index.js");
var session = require("express-session");
var AdminMethods = require("./server/DB/administrador.js");
const secretKey = require("./secretKey.js");
var nodemailer = require("nodemailer");
// 3 Days of the cookie lifetime
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

// This is use for production
var sess = {
  secret: "keyboard cat",
  cookie: {}
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
app.post("/api/getJobs", function(req, res) {
  // var transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: "",
  //     pass: ""
  //   }
  // });

  // var mailOptions = {
  //   from: "",
  //   to: "",
  //   subject: "Sending Email using Node.js",
  //   text: "That was easy!"
  // };

  // transporter.sendMail(mailOptions, function(error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });
  DBMethods.getJobs(req, res, sqlConnection);
});

/**
 * Private Route serving job description form
 * @name post/api/getJobDescription
 */
app.post("/api/getJobDescription", function(req, res) {
  DBMethods.getJobDesc(req, res, sqlConnection);
});

/**
 * Private Route serving store jobs form
 * @name post/api/storeJobs
 */
app.post("/api/storeJobs", function(req, res) {
  DBMethods.storejobsDB(req, res, sqlConnection);
});

/**
 * Private Route serving job adminstrador login form
 * @name post/api/login
 */
app.post("/api/login", middleware.authorization, function(req, res) {
  DBMethods.getCredentialsLogIn(req, res, sqlConnection, sessionStore);
});

/**
 * Private Route to authenticate users.
 * @name post/api/auth
 */
app.post("/api/auth", middleware.singleAuthorization);

/**
 * Private Route serving job continer
 * @name post/api/getJobs
 */

app.post("/api/logoutAdmin", function(req, res) {
  AdminMethods.logoutUser(req, res, SESSION_NAME);
});
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
