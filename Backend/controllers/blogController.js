const fs = require('fs')
const asyncHandler = require('express-async-handler')
const Blog = require("../models/blogModel")
const User = require("../models/userModel")
const validateMongoDbId = require("../utils/validateMongodbId")
const cloudinaryUploadImg = require('../utils/cloudinary')

const createBlog = asyncHandler(async(req, res) => {
    const blog = req.body
    try {
        const newBlog = await Blog.create(blog)
        res.json(newBlog)
    } catch (error) {
        throw new Error(error)
    }
  
})

const updateBlog = asyncHandler(async(req, res) => {
    const { id } = req.params
    try {
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
            new: true,
        })
        res.json(updateBlog)
    } catch (error) {
        throw new Error(error)
    }
})

const getBlog = asyncHandler(async(req, res) => {
    const { id } = req.params
    try {
        const getBlog = await Blog.findById(id).populate('likes').populate('disLikes')
        await Blog.findByIdAndUpdate(id, {
            $inc: { numViews: 1 }
    }, {
        new: true
    })
        res.json(getBlog)
    } catch (error) {
        throw new Error(error)
    }
})


const getAllBlogs = asyncHandler(async(req, res) => {
    try {
        const getAllBlogs = await Blog.find({ })
        res.json(getAllBlogs)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteBlog = asyncHandler(async(req, res) => {
    const { id } = req.params
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id)
        return res.json(deletedBlog)
    } catch (error) {
        throw new Error(error)
    }
})

const likeBlog = asyncHandler(async(req, res) => {
    const{ blogId } = req.body
    console.log(blogId)
    const{ id } = req.user
    validateMongoDbId(blogId)
    const blog = await Blog.findById(blogId)
    const loginUserId = id
    const isLiked = blog?.isLiked
    const alreadyDisliked = blog?.disLikes.find((userId => userId?.toString() ===loginUserId?.toString()))
    if(alreadyDisliked){
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { disLikes: loginUserId },
            isDisliked: false,
        }, { new: true })
        res.json(blog)
    }
    if(isLiked){
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: loginUserId },
            isLiked: false,
        }, { new: true })
        res.json(blog)
    }else{
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { likes: loginUserId },
            isLiked: true,
        }, { new: true })
        res.json(blog)
    }
})

const disLikeBlog = asyncHandler(async(req, res) => {
    const{ blogId } = req.body
    console.log(blogId)
    const{ id } = req.user
    validateMongoDbId(blogId)
    const blog = await Blog.findById(blogId)
    const loginUserId = id
    const isDisliked = blog?.isDisliked
    const alreadyliked = blog?.likes.find((userId => userId?.toString() ===loginUserId?.toString()))
    if(alreadyliked){
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: loginUserId },
            isLiked: false,
        }, { new: true })
        res.json(blog)
    }
    if(isDisliked){
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { disLikes: loginUserId },
            isDisliked: false,
        }, { new: true })
        res.json(blog)
    }else{
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { disLikes: loginUserId },
            isDisliked: true,
        }, { new: true })
        res.json(blog)
    }
})

const uploadImages = asyncHandler( async(req, res) => {
    const{ id } = req.params
    validateMongoDbId(id)
    try {
        const uploader =  async (path) => await cloudinaryUploadImg(path, "images")
        const urls = []
        const files = req.files
        for(const file of files){
            const{ path } = file
            const newPath = await uploader(path)
            urls.push(newPath)
            fs.unlinkSync(path)
        }
        const findBlog = await Blog.findByIdAndUpdate(id, {
            image: urls.map((file) => {
                return file
            })
        }, {
            new: true,
        })
        res.json(findBlog)
    } catch (error) {
        throw new Error(error)
    }
})


module.exports = {
    createBlog,
    updateBlog,
    getBlog,
    getAllBlogs,
    deleteBlog,
    likeBlog,
    disLikeBlog,
    uploadImages,
}