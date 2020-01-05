var express = require("express");
var router = express.Router();
var cStoreJobsStackOvf = require("../controller/cStoreJobsStackOvf");

router.post("/", cStoreJobsStackOvf.storeJobsFromStackOverflow);

module.exports = router;
