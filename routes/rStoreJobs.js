var express = require("express");
var router = express.Router();
var cStoreJobs = require("../controller/cStoreJobs");

router.post("/", cStoreJobs.storeJobs);

module.exports = router;
