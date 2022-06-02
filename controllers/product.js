const Product = require("../models/product");
const formidable = require("formidable");
const fs = require("fs");
const _= require("lodash");

const createProduct = (req,res)=>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;

    form.parse(req,async(error,fields,files)=>{
        if(error){
           return res.status(500).json({msg:"IMAGE_COULD_NOT_UPLOADED"})
        };

        if(files.photo.type !== "image/jpeg" && files.photo.type !== "image/jpg" && files.photo.type !== "image/png"){
            return res.status(500).json({msg:"FORMAT_NOT_VALID"})
        };

        if(files.photo.size > 1000000){
            return res.status(400).json({msg:"IMAGE_SHOULD_BE_LESS_1MB_IN_SIZE"})
        };


        const {name,description,price,category,quantity,shipping} = fields;
        
        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error:"All fields are required"
            })
        };

        let product =  new Product(fields);

        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;

        try {
            await product.save();
            res.json({msg:"PRODUCT_CREATED_SUCCESSFULLY"})
    
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:"ERROR_CREATED_PRODUCT"})
        }

    })};



const getProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const data =await Product.findById(id).populate('category').select("-photo");
        return res.json(data);


    } catch (error) {
         console.log(error);
            res.status(500).json({msg:"ERROR_FIND_PRODUCT"})
    }
};

const getPhoto = async(req,res)=>{
    try {
        const {id} = req.params;
        const data = await Product.findById(id);
        req.product = data;

        if(req.product.photo.data){
            res.set('Content-type',req.product.photo.contentType)
        }

        return res.send(req.product.photo.data)

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"FALIED_TO_LOAD_IMAGE"});
    }
};


const getAll = async(req,res)=>{
    try {
        const data = await Product.find({}).populate('category').select("-photo");
        res.send(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"ERROR_GET_ALL_PRODUCTS"})
    }
}


const updateCategory = (req,res)=>{
    let form = formidable.IncomingForm()
    form.keepExtensions = true;

    form.parse(req,async(error,fields,files)=>{
        if(error){
            res.status(500).json({msg:"IMAGE_NOT_UPLOADED"})
        };

        const {id} = req.params;
        let data = await Product.findById(id);
        req.product = data;

       
        data = _.extend(data,fields);

        if(files.photo){
            if(files.photo.size > 1000000){
                res.status(400).json({msg:"IMAGE_MAX_1MB"})
            };

            data.photo.data = fs.readFileSync(files.photo.path);
            data.photo.contentType = files.photo.type;


            try {
                let productDetails = await data.save();
                data.photo= undefined;
                res.json(productDetails);
            } catch (error) {
                console.log(error)
                res.status(500).json({msg:"ERROR_UPDATE_PRODUCT"})
            }
        }

    })

};


const deleteCategory = async(req,res)=>{
    try {
        const {id} = req.params;
        await Product.delete({_id:id});
        res.json({msg:"DELETE_SUCCESSFULLY"})

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"ERROR_DELETE_PRODUCT"})
        
    }
}


module.exports ={createProduct,getProduct,getPhoto,getAll,updateCategory,deleteCategory};