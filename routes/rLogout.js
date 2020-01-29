var express = require("express");
var router = express.Router();
var cLogout = require("../controller/cLogout");

router.post("/", cLogout.logoutUser);
module.exports = router;
