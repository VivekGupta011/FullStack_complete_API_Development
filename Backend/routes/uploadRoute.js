const express = require("express")
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages")
const { isAdmin, authMiddleWare } = require("../middlewares/authMiddleWare")
const { uploadImages, deleteImages } = require('../controllers/uploadController')
const uploadRouter = express.Router()


uploadRouter.post('/', authMiddleWare, isAdmin, uploadPhoto.array('images'), productImgResize, uploadImages)
uploadRouter.delete('/delete-img/:public_id', authMiddleWare, isAdmin, deleteImages)
module.exports = uploadRouter;