var express = require("express");
var router = express.Router();
var cGetJobDesc = require("../controller/cGetJobDesc");

router.post("/", cGetJobDesc.getJobDesc);

module.exports = router;
