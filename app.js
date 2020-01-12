var createError = require("http-errors");
var express = require("express");
var path = require("path");
var app = express();
var morgan = require("morgan");

//Import Routes
var getJobs = require("./routes/rGetJobs");
var jobDescription = require("./routes/rGetJobDesc");
var storeJobs = require("./routes/rStoreJobs");
var login = require("./routes/rLogin");
var logout = require("./routes/rLogout");
// SQL
var sqlConnection = require("./server/DB/index.js");
var session = require("express-session");
const secretKey = require("./secretKey.js");
//Middlawares
var middleware = require("./server/DB/Middleware/authorization.js");

/**
 * Cookies.
 */
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

/**
 * Cookies for production
 */
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
app.use(morgan("tiny")); //Log all the HTTP requests and responses

/**
 * Private Route serving job continer form
 * @name post/api/getJobs
 */
app.use("/api/getJobs", getJobs);

/**
 * Private Route serving job description form
 * @name post/api/getJobDescription
 */
app.use("/api/getJobDescription", jobDescription);

/**
 * Private Route serving store jobs form
 * @name post/api/storeJobs
 */
app.use("/api/storeJobs", storeJobs);

/**
 * Private Route serving job adminstrador login form
 * @name post/api/login
 */
app.use("/api/login", login);

/**
 * Private Route to authenticate users.
 * @name post/api/auth
 */
app.post("/api/auth", middleware.singleAuthorization);

/**
 * Private Route serving job continer
 * @name post/api/getJobs
 */
app.use("/api/logoutAdmin", logout);

const postJob = require("./routes/rPostJob");
app.use("/postJob", postJob);
/**
 * @name /testing
 */
// const cGetPostData = require("./controller/cGetPostJobData");
// app.use("/testing", cGetPostData.getPostJobData);

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
