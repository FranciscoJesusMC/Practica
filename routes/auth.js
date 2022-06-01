const express = require("express");
const  router = express.Router();
const {validateUser,validateLogin} = require("../validators/userValidation");
const {registerUser,loginUser,getUser} = require("../controllers/auth");
const {verifyToken} = require("../middleware/auth");


router.get("/",verifyToken,getUser);
router.post("/register",validateUser,registerUser);
router.post("/login",validateLogin,loginUser);



module.exports = router;