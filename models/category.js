const mongoose = require("mongoose");
const mongooseDelete= require("mongoose-delete");


const categorySchema =  new mongoose.Schema(
    {
        name:{
            type:String
        }
    },
    {
        timestamps:true,
        versionKey:false
    }
)

categorySchema.plugin(mongooseDelete,{overrideMethdos:"all"});
const Category = mongoose.model("category",categorySchema);

module.exports = Category;