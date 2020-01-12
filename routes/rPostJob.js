var express = require("express");
var router = express.Router();
const cPostJob = require("../controller/cGetPostJobData");

router.post("/", cPostJob.getPostJobData);

module.exports = router;
