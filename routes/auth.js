const express = require("express");
const  router = express.Router();
const {validateUser} = require("../validators/userValidation");
const {registerUser} = require("../controllers/auth");


router.post("/register",validateUser,registerUser);


module.exports = router;