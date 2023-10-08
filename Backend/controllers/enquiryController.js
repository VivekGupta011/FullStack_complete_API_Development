const asyncHandler = require('express-async-handler')
const Enquiry = require("../models/enqModel")
const validateMongoDbId = require("../utils/validateMongodbId")



const createEnquiry = asyncHandler(async(req,res) => {
    try {
        const enquiry = await Enquiry.create(req.body)
        res.json(enquiry)
    } catch (error) {
        throw new Error(error)
    }
})

const updateEnquiry = asyncHandler(async(req,res) => {
    const{ id } = req.params
    validateMongoDbId(id)
    try {
        const updateEnquiry = await Enquiry.findByIdAndUpdate(id, req.body,  { new: true })
        res.json(updateEnquiry)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteEnquiry = asyncHandler(async(req,res) => {
    const{ id } = req.params
    validateMongoDbId(id)
    try {
        const deletedEnquiry = await Enquiry.findByIdAndDelete(id)
        res.json(deletedEnquiry)
    } catch (error) {
        throw new Error(error)
    }
})

const getEnquiry = asyncHandler(async(req,res) => {
    const{ id } = req.params
    validateMongoDbId(id)
    try {
        const getEnquiry = await Enquiry.findById(id)
        res.json(getEnquiry)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllEnquiry = asyncHandler(async(req,res) => {
    try {
        const getAllEnquiry = await Enquiry.find({ })
        res.json(getAllEnquiry)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    createEnquiry,
    updateEnquiry,
    deleteEnquiry,
    getEnquiry,
    getAllEnquiry,
}