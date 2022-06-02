const express = require("express");
const router = express.Router()
const {createProduct,getProduct,getPhoto,getAll,updateCategory,deleteCategory} = require("../controllers/product");
const {validateProduct} = require("../validators/productValidation");
const {verifyToken} = require("../middleware/auth");
const {verifyAdmi} = require("../middleware/admiAuth")

router.post("/register",verifyToken,verifyAdmi,createProduct);
router.get("/:id",validateProduct,getProduct);
router.get("/photo/:id",validateProduct,getPhoto);
router.get("/list/all",getAll);
router.put("/:id",verifyToken,verifyAdmi,updateCategory);
router.delete("/:id",validateProduct,deleteCategory);


module.exports = router
