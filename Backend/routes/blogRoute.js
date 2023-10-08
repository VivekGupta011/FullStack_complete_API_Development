const express = require("express")
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddleWare")
const { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog, likeBlog, disLikeBlog, uploadImages } = require("../controllers/blogController")
const { uploadPhoto, blogImgResize } = require("../middlewares/uploadImages")
const blogRouter = express.Router()

blogRouter.post("/", authMiddleWare, isAdmin, createBlog)
blogRouter.put("/updateblog/:id", authMiddleWare, isAdmin, updateBlog)
blogRouter.get("/getblog/:id", getBlog)
blogRouter.get("/allblogs", getAllBlogs)
blogRouter.delete("/deleteblog/:id", authMiddleWare, isAdmin, deleteBlog)
blogRouter.put("/like", authMiddleWare, likeBlog)
blogRouter.put("/dislike", authMiddleWare, disLikeBlog)
blogRouter.put('/upload/:id', authMiddleWare, isAdmin, uploadPhoto.array('images'), blogImgResize, uploadImages)


module.exports = blogRouter