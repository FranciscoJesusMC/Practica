const {check} = require("express-validator");
const validacion = require("../utils/handleValidation");


const validateCreateProduct = [
    check("name")
    .exists()
    .notEmpty(),
    check("description")
    .exists()
    .notEmpty(),
    check("price")
    .exists()
    .notEmpty()
    .isNumeric(),
    check("category")
    .exists()
    .notEmpty()
    .isMongoId(),
    check("quantity")
    .exists()
    .notEmpty()
    .isNumeric(),
    check("photo")
    .exists()
    .notEmpty(),
    (req,res,next)=>{
        validacion(req,res,next)
    }

];


const validateProduct = [
    check("id")
    .exists()
    .notEmpty()
    .isMongoId(),
    (req,res,next)=>{
        validacion(req,res,next)
    }
];




module.exports = {validateCreateProduct,validateProduct};