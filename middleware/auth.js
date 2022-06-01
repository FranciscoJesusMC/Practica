const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;


const getToken = (req,res,next)=>{
    const token = req.header("token");

    if(!token){
        res.status(403).json({
            msg:"NOT TOKEN"
        })
    };

    try {
        const decoded = jwt.verify(token,JWT_SECRET)

        req.user = decoded.user
        next();
    } catch (error) {
        res.status(500).send("SERVER ERROR")
    }
}


module.exports = getToken;