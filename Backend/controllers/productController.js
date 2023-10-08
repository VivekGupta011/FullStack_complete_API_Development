const Product = require("../models/productModel")
const User = require("../models/userModel")
const validateMongoDbId = require('../utils/validateMongodbId')
const asyncHandler = require("express-async-handler")
const slugify = require("slugify")


//Create product
const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const product = await Product.create(req.body)
        res.json(product)
    } catch (error) {
        throw new Error(error)
    }
})

//Update Product
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const updateProduct = await Product.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
        })
        return res.json(updateProduct)
    } catch (error) {
        throw new Error(error)
    }
})

//Delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const deletedProduct = await Product.findByIdAndDelete(id)
        return res.json(deletedProduct)
    } catch (error) {
        throw new Error(error)
    }
})

//Get a single product
const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id).populate("color");
        return res.json(product)
    } catch (error) {
        throw new Error(error)
    }
})

//Get all product
const getAllProduct = asyncHandler(async (req, res) => {
    try {
        //Filtering
        const queryObject = { ...req.query }
        const excludeFields = ["page", "sort", "limit", "fields"]
        excludeFields.forEach((el) => delete queryObject[el])
        let queryStr = JSON.stringify(queryObject)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
        let query = Product.find(JSON.parse(queryStr))
        //Sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
        }else{
            query = query.sort('-createdAt')
        }

        //Limiting fields
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ')
            query = query.select(fields)
        }else{
            query = query.select('-__v')
        }

        //Pagination
        const page = Math.abs(req.query.page) || 1
        const limit = Math.abs(req.query.limit) || 0
        const skip = (page - 1) * limit
        query = query.skip(skip).limit(limit)
        if(req.query.page){
            const productCount = await Product.countDocuments()
            if(skip >= productCount) throw new Error('This page does not exists')
        }
        
        const products = await query
        return res.json(products)
    } catch (error) {
        throw new Error(error)
    }
})

//Add To Wishlist
const AddToWishList = asyncHandler(async(req, res) => {
    const{ id } = req.user
    const{ prodId } = req.body
    try {
        const user = await User.findById(id)
        const alreadyadded = user.wishlist.find((productId) => productId.toString() === prodId.toString())
        if(alreadyadded){
            let user = await User.findByIdAndUpdate(id, {
                $pull: {wishlist: prodId},
            }, {
                new: true,
            })
            res.json(user)
        }else{
            let user = await User.findByIdAndUpdate(id, {
                $push: {wishlist: prodId},
            }, {
                new: true,
            })
            res.json(user)
        }
    } catch (error) {
        throw new Error(error)
    }
})

const rating = asyncHandler(async(req, res) => {
    const{ id } = req.user
    const{ star, comment, prodId } = req.body
    console.log(comment)
    try {
        const product = await Product.findById(prodId)
        const alreadyadded = product.ratings.find((userId) => userId.postedby.toString() === id.toString())
        if(alreadyadded){
             await Product.updateOne({
                ratings: { $elemMatch: alreadyadded }
            }, {
                $set: {"ratings.$.star": star, "ratings.$.comment": comment }
            }, {
                new: true
            })
        }else{
            await Product.findByIdAndUpdate(prodId, {
                $push: {
                    ratings: {
                        star: star,
                        comment: comment,
                        postedby: id,
                        
                    }
                }
            }, {
                new: true,
            })
        }

        const getAllRatings = await Product.findById(prodId)
        let totalrating = getAllRatings.ratings.length
        let ratingSum = getAllRatings.ratings.reduce((currentVal, prevVal) => currentVal + prevVal.star, 0)
        let actualRating = Math.round(ratingSum / totalrating)
        let finalProduct = await Product.findByIdAndUpdate(prodId, {
            totalRating: actualRating,
        }, {
            new: true
        })
        res.json(finalProduct)
    } catch (error) {
        throw new Error(error)
    }
})



module.exports = {
    createProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    AddToWishList,
    rating,
}