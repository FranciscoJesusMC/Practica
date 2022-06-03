const User = require("../models/user");

const verifyAdmi = async(req,res,next)=>{
    try {

        const user = await User.findOne({_id: req.user.id});

  
        if(user.role === 0){
            return res.status(403).json({
                error:"Admin resosurces, access denied"
            })
        }
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json("SERVER_ERROR")
    }
}

module.exports = {verifyAdmi};