const express = require('express')
const { authMiddleWare, isAdmin } = require('../middlewares/authMiddleWare')
const { createBrand, updateBrand, deleteBrand, getBrand, getAllBrand } = require('../controllers/brandController')
const brandRouter = express.Router()


brandRouter.post('/', authMiddleWare, isAdmin, createBrand)
brandRouter.put('/update/:id', authMiddleWare, isAdmin, updateBrand)
brandRouter.delete('/delete/:id', authMiddleWare, isAdmin, deleteBrand)
brandRouter.get('/getbrand/:id', authMiddleWare, isAdmin, getBrand)
brandRouter.get('/getallbrand', getAllBrand)
module.exports = brandRouter;