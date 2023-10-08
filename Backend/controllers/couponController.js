const asyncHandler = require('express-async-handler')
const Coupon = require("../models/couponModel")
const validateMongoDbId = require("../utils/validateMongodbId")

const createCoupon = asyncHandler(async(req, res) => {
    try {
        const newCoupon = await Coupon.create(req.body)
        return  res.json(newCoupon)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllCoupon = asyncHandler(async(req, res) => {
    try {
        const allCoupon = await Coupon.find({ })
        return  res.json(allCoupon)
    } catch (error) {
        throw new Error(error)
    }
})

const getCoupon = asyncHandler(async(req, res) => {
    const{id} = req.params;
    try {
        const coupon = await Coupon.findById(id)
        res.json(coupon)
    } catch (error) {
        throw new Error(error)
    }
})

const updateCoupon = asyncHandler(async(req, res) => {
    const{ id } = req.params
    validateMongoDbId(id)
    try {
        const updatecoupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true })
        return  res.json(updatecoupon)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteCoupon = asyncHandler(async(req, res) => {
    const{ id } = req.params
    validateMongoDbId(id)
    try {
        const deletedcoupon = await Coupon.findByIdAndDelete(id)
        return  res.json(deletedcoupon)
    } catch (error) {
        throw new Error(error)
    }
})


module.exports = {
    createCoupon,
    getAllCoupon,
    getCoupon,
    updateCoupon,
    deleteCoupon,
}