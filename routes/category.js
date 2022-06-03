const express = require("express");
const router =express.Router();
const {createCategory,getCategory,getCategoryById,updateCategory,deleteCategory} = require("../controllers/category");
const {validateCreateCategory,validateCategory} =require("../validators/categoryValidation")
const {verifyToken} = require("../middleware/auth");
const {verifyAdmi} = require("../middleware/admiAuth");

//Quitamos las validaciones en registrar del token y admi
router.post("/register",verifyToken,verifyAdmi,validateCreateCategory,createCategory);
router.get("/all",getCategory);
router.get("/:id",validateCategory,getCategoryById);
//quitamos las validaciones en actualizar del token y admi
router.put("/:id",validateCategory,validateCreateCategory,updateCategory);
//Quitamos las validaciones de eliminar de token y admi
router.delete("/:id",validateCategory,deleteCategory);


module.exports = router;

