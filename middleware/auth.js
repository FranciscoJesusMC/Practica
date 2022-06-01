const jwt= require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;


const verifyToken = (req,res,next)=>{
    const token = req.header("token");

    if(!token){
        res.status(400).json({
            msg:"NOT TOKEN"
        })
    };

    try {
        let decoded = jwt.verify(token,JWT_SECRET);
        req.user= decoded.user;
        next();
    } catch (error) {
        res.status(500).json("SEVER ERROR")
    }
};

module.exports = {verifyToken};