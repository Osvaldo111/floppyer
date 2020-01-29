var express = require("express");
var router = express.Router();
var cGetJobs = require("../controller/cGetJobs");

router.post("/", cGetJobs.getJobs);

module.exports = router;
