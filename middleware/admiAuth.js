const User = require("../models/user");

const verifyAdmi = async(req,res,next)=>{
    try {
        const user = await User.findOne({_id:req.user.id});

        if(user.role === 0){
            res.status(400).json({msg:"ACCESS_DENIED"})
        };

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json("ERROR SERVER")
    }
}

module.exports = {verifyAdmi};