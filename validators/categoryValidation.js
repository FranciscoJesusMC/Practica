const {check} = require("express-validator");
const validacion = require("../utils/handleValidation");

const validateCreateCategory = [
    check("name")
    .exists()
    .notEmpty()
    .trim(),
    (req,res,next)=>{
        validacion(req,res,next)
    }
];


const validateCategory=[
    check("id")
    .exists()
    .notEmpty()
    .isMongoId(),
    (req,res,next)=>{
        validacion(req,res,next)
    }
];


module.exports = {validateCreateCategory,validateCategory};