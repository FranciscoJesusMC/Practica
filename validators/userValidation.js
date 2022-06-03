const {check} = require("express-validator");
const validacion = require("../utils/handleValidation");


const validateUser =[
    check("name")
    .exists()
    .notEmpty(),
    check("email")
    .exists()
    .notEmpty()
    .isEmail(),
    check("password")
    .exists()
    .notEmpty()
    .isLength({min:6}),
    (req,res,next)=>{
        validacion(req,res,next)
    }
];

const validateLogin=[
    check("email")
    .exists()
    .notEmpty()
    .isEmail(),
    check("password")
    .exists()
    .notEmpty(),
    (req,res,next)=>{
        validacion(req,res,next)
    }
];




module.exports = {validateUser,validateLogin};