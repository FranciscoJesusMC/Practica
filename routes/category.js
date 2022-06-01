const express = require("express");
const router =express.Router();
const {createCategory,getCategory,getCategoryById,updateCategory,deleteCategory} = require("../controllers/category");
const {validateCreateCategory,validateCategory} =require("../validators/categoryValidation")
const {verifyToken} = require("../middleware/auth");
const {verifyAdmi} = require("../middleware/admiAuth");


router.post("/register",verifyToken,verifyAdmi,validateCreateCategory,createCategory);
router.get("/all",getCategory);
router.get("/:id",validateCategory,getCategoryById);
router.put("/:id",verifyToken,verifyAdmi,validateCategory,validateCreateCategory,updateCategory);
router.delete("/:id",verifyToken,verifyAdmi,validateCategory,deleteCategory);


module.exports = router;

