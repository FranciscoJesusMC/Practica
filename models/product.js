const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete")
const {ObjectId} = mongoose.Schema;

const produdctSchema = new mongoose.Schema(
    {
        name:{
            type:String
        },
        description:{
            type:String
        },
        price:{
            type:Number
        },
        category:{
            type:ObjectId,
            ref:'category'
        },
        quantity:{
            type:Number
        },
        sold:{
            type:Number,
            default:0
        },
        photo:{
            data:Buffer,
            contentType:String
        },
        shipping:{
            type:Boolean
        }

    },
    {
        timestamps:true,
        versionKey:false
    }
);

produdctSchema.plugin(mongooseDelete,{overrideMethods:"all"});
module.exports = mongoose.model("product",produdctSchema)