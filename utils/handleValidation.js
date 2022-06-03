const {validationResult} = require("express-validator");

const validacion = (req,res,next)=>{
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        res.status(400);
        res.send({error:error.array()})
    }
}



module.exports = validacion;