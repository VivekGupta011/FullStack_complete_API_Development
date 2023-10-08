const asyncHandler = require('express-async-handler')
const Productcategory = require("../models/productCategoryModel")
const validateMongoDbId = require("../utils/validateMongodbId")

const createProductcategory = asyncHandler(async(req,res) => {
    try {
        const productcategory = await Productcategory.create(req.body)
        res.json(productcategory)
    } catch (error) {
        throw new Error(error)
    }
})

const updateProductcategory = asyncHandler(async(req,res) => {
    const{ id } = req.params
    validateMongoDbId(id)
    try {
        const updateproductcategory = await Productcategory.findByIdAndUpdate(id, req.body, { new: true })
        res.json(updateproductcategory)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteProductcategory = asyncHandler(async(req,res) => {
    const{ id } = req.params
    validateMongoDbId(id)
    try {
        const deletedproductcategory = await Productcategory.findByIdAndDelete(id)
        res.json(deletedproductcategory)
    } catch (error) {
        throw new Error(error)
    }
})

const getProductcategory = asyncHandler(async(req,res) => {
    const{ id } = req.params
    validateMongoDbId(id)
    try {
        const getproductcategory = await Productcategory.findById(id)
        res.json(getproductcategory)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllProductcategory = asyncHandler(async(req,res) => {
    try {
        const getAllproductcategory = await Productcategory.find({ })
        res.json(getAllproductcategory)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    createProductcategory,
    updateProductcategory,
    deleteProductcategory,
    getProductcategory,
    getAllProductcategory,
}