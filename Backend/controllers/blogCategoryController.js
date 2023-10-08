const asyncHandler = require('express-async-handler')
const Blogcategory = require("../models/blogCategoryModel")
const validateMongoDbId = require("../utils/validateMongodbId")

const createBlogcategory = asyncHandler(async(req,res) => {
    try {
        const blogcategory = await Blogcategory.create(req.body)
        res.json(blogcategory)
    } catch (error) {
        throw new Error(error)
    }
})

const updateBlogcategory = asyncHandler(async(req,res) => {
    const{ id } = req.params
    validateMongoDbId(id)
    try {
        const updateblogcategory = await Blogcategory.findByIdAndUpdate(id, req.body, { new: true })
        res.json(updateblogcategory)
    } catch (error) {
        throw new Error(error)
    }
})



const getBlogcategory = asyncHandler(async(req,res) => {
    const{ id } = req.params
    validateMongoDbId(id)
    try {
        const getblogcategory = await Blogcategory.findById(id)
      return  res.json(getblogcategory)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllBlogcategory = asyncHandler(async(req,res) => {
    try {
        const getAllBlogcategory = await Blogcategory.find({ })
        res.json(getAllBlogcategory)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteBlogcategory = asyncHandler(async(req,res) => {
    const{ id } = req.params
    validateMongoDbId(id)
    try {
        const deletedblogcategory = await Blogcategory.findByIdAndDelete(id)
        res.json(deletedblogcategory)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    createBlogcategory,
    updateBlogcategory,
    getBlogcategory,
    getAllBlogcategory,
    deleteBlogcategory,
}