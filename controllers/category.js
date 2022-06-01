const { default: mongoose } = require("mongoose");
const Category = require("../models/category");

const parseId = (id)=>{
    return mongoose.Types.ObjectId(id)
};

const createCategory = async(req,res)=>{
    try {
        const {name} = req.body;

        let category = await Category.findOne({name});

        if(category){
            res.status(400).json({msg:"CATEGORY_ALREADY_EXISTS"})
        };

        category = new Category({name});
        await category.save();
        res.json(category);
        
    } catch (error) {
        console.log(error);
        res.status(500).json("SERVER ERROR");
        
    }
};


const getCategory = async(req,res)=>{
    try {
        const deleted = false;
        const data = await Category.find({deleted}).select("-deleted");
        res.send(data);

    } catch (error) {
        console.log(error);
        res.status(500).json("SERVER ERROR")
    }
};


const getCategoryById = async(req,res)=>{
    try {
        const {id} = req.params;
        let category = await Category.findById(id);   
        res.json(category);

    } catch (error) {
        console.log(error);
        res.status(500).json("SERVER ERROR")
    }
};

const updateCategory = async(req,res)=>{
    try {
        const {id} = req.params 
        const body = req.body;
        await Category.updateOne({_id:parseId(id)},body);
        res.json({msg:"category updated successfully"});
        

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"ERROR_UPDATE_CATEGORY"})
    }
};


const deleteCategory = async(req,res)=>{
    try {
        const {id} = req.params;
        await Category.delete({_id:id});
        res.json({msg:"deleted successfully"});

 

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"ERROR_DELETE_CATEGORY"})
    }
}

module.exports = {createCategory,getCategory,getCategoryById,updateCategory,deleteCategory};