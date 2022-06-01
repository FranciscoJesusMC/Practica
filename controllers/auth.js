const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const JWT_SECRET = process.env.JWT_SECRET;

const registerUser= async(req,res)=>{
    try {
        const {name,email,password} = req.body;

        let user = await User.findOne({email});

        if(user){
            res.status(400).json({
                msg:"USER ALREADT EXISTS"
            })
        };

        const avatar = gravatar.url(email,{
            s:"200",
            r:"pg",
            d:'mm'
        });

        user = new User({name,email,avatar,password});

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save()

        const payload={
            user:{
                id:user.id
            }
        }

        jwt.sign(payload,JWT_SECRET,{expiresIn:"2h"},(error,token)=>{
            if(error) throw error
            res.json({token})
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).send("SERVER ERROR");
        
    }
}


module.exports = {registerUser};