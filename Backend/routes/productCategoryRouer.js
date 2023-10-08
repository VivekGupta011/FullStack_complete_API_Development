const express = require("express");
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddleWare");
const { createProductcategory, updateProductcategory, deleteProductcategory, getAllProductcategory, getProductcategory } = require("../controllers/productCategoryController");
const productCategoryRouter = express.Router()


productCategoryRouter.post('/', authMiddleWare, isAdmin, createProductcategory)
productCategoryRouter.put('/update/:id', authMiddleWare, isAdmin, updateProductcategory)
productCategoryRouter.delete('/delete/:id', authMiddleWare, isAdmin, deleteProductcategory)
productCategoryRouter.get('/getproductcategory/:id', getProductcategory)
productCategoryRouter.get('/getallproductcategory', getAllProductcategory)
module.exports = productCategoryRouter;