var express = require("express");
var router = express.Router();
var cGetCredentials = require("../controller/cGetCredentials");

router.post("/", cGetCredentials.getCredentialsLogIn);
module.exports = router;
