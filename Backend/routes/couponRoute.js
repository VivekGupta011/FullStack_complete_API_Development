const express = require('express')
const { authMiddleWare, isAdmin } = require('../middlewares/authMiddleWare')
const { createCoupon, getAllCoupon, updateCoupon, deleteCoupon, getCoupon } = require('../controllers/couponController')
const couponRouter = express.Router()

couponRouter.post('/', authMiddleWare, isAdmin, createCoupon)
couponRouter.get('/allcoupon', authMiddleWare, isAdmin, getAllCoupon)
couponRouter.get('/getcoupon/:id', authMiddleWare, isAdmin, getCoupon)
couponRouter.put('/updatecoupon/:id', authMiddleWare, isAdmin, updateCoupon)
couponRouter.delete('/deletecoupon/:id', authMiddleWare, isAdmin, deleteCoupon)

module.exports = couponRouter