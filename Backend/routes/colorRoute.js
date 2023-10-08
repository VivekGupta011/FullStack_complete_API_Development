const express = require('express')
const { authMiddleWare, isAdmin } = require('../middlewares/authMiddleWare')
const { createColor, updateColor, deleteColor, getColor, getAllColor } = require('../controllers/colorController')
const colorRouter = express.Router()


colorRouter.post('/', authMiddleWare, isAdmin, createColor)
colorRouter.put('/update/:id', authMiddleWare, isAdmin, updateColor)
colorRouter.delete('/delete/:id', authMiddleWare, isAdmin, deleteColor)
colorRouter.get('/getcolor/:id', authMiddleWare, isAdmin, getColor)
colorRouter.get('/getallcolor', getAllColor)
module.exports = colorRouter;