const mongoose = require("mongoose");
const mongooseDelete= require("mongoose-delete")

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String
        },
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String
        },
        avatar:{
            type:String
        },
        role:{
            type:Number,
            default:0
        },
        history:{
            type:Array,
            default:[]
        }

    },
    {
        timestamps:true,
        versionKey:false
    }
)

UserSchema.plugin(mongooseDelete,{overrideMethods:"all"});
module.exports = mongoose.model("user",UserSchema);