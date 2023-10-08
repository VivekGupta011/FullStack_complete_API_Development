const express = require("express");
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddleWare");
const { createBlogcategory, updateBlogcategory, deleteBlogcategory, getAllBlogcategory, getBlogcategory } = require("../controllers/blogCategoryController");
const blogCategoryRouter = express.Router()


blogCategoryRouter.post('/', authMiddleWare, isAdmin, createBlogcategory)
blogCategoryRouter.put('/update/:id', authMiddleWare, isAdmin, updateBlogcategory)
blogCategoryRouter.get('/getblogcategory/:id', getBlogcategory)
blogCategoryRouter.get('/getallblogcategory', getAllBlogcategory)
blogCategoryRouter.delete('/delete/:id', authMiddleWare, isAdmin, deleteBlogcategory)
module.exports = blogCategoryRouter;