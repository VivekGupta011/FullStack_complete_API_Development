const express = require("express")
const { createProduct, getProduct, getAllProduct, updateProduct, deleteProduct, AddToWishList, rating} = require("../controllers/productController")
const { isAdmin, authMiddleWare } = require("../middlewares/authMiddleWare")
const productRouter = express.Router()

productRouter.post('/', authMiddleWare, isAdmin, createProduct)
productRouter.get('/allproduct', getAllProduct)
productRouter.get('/:id', getProduct)
productRouter.put('/update/:id', authMiddleWare, isAdmin, updateProduct)
productRouter.put('/wishlist', authMiddleWare, AddToWishList)
productRouter.put('/rating', authMiddleWare, rating)
productRouter.delete('/delete/:id', authMiddleWare, isAdmin, deleteProduct)
// productRouter.delete('/delete-img/:public_id', authMiddleWare, isAdmin, deleteImages)
// productRouter.put('/upload', authMiddleWare, isAdmin, uploadPhoto.array('images'), productImgResize, uploadImages)



module.exports = productRouter;