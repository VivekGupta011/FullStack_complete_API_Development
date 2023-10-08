const asyncHandler = require('express-async-handler')
const Brand = require("../models/brandModel")
const validateMongoDbId = require("../utils/validateMongodbId")



const createBrand = asyncHandler(async(req,res) => {
    try {
        const brand = await Brand.create(req.body)
        res.json(brand)
    } catch (error) {
        throw new Error(error)
    }
})

const updateBrand = asyncHandler(async(req,res) => {
    const{ id } = req.params
    validateMongoDbId(id)
    try {
        const updateBrand = await Brand.findByIdAndUpdate(id, req.body, { new: true })
        res.json(updateBrand)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteBrand = asyncHandler(async(req,res) => {
    const{ id } = req.params
    validateMongoDbId(id)
    try {
        const deletedBrand = await Brand.findByIdAndDelete(id)
        res.json(deletedBrand)
    } catch (error) {
        throw new Error(error)
    }
})

const getBrand = asyncHandler(async(req,res) => {
    const{ id } = req.params
    validateMongoDbId(id)
    try {
        const getbrand = await Brand.findById(id)
        res.json(getbrand)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllBrand = asyncHandler(async(req,res) => {
    try {
        const getAllbrand = await Brand.find({ })
        res.json(getAllbrand)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    createBrand,
    updateBrand,
    deleteBrand,
    getBrand,
    getAllBrand,
}