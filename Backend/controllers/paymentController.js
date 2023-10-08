const Razorpay = require('razorpay');
const asyncHandler = require("express-async-handler");

var instance = new Razorpay({
  key_id: 'rzp_test_m4NW0heBziEXDz',
  key_secret: 'OoAyec7j43ZfttjYklg1cLUO',
});

const checkout = asyncHandler(async(req, res) => {
    const{ amount } = req.body;
    const option = {
        amount: amount * 100,
        currency: "INR",
    }
    const order = await instance.orders.create(option)
    res.json({
        success: true,
        order,
    })
})

const paymentVerification = asyncHandler(async(req, res) => {
    const{ razorpayOrderId, razorpayPaymentId } = req.body
    res.json({
        razorpayOrderId,
        razorpayPaymentId,
    })
})

module.exports = {
    checkout,
    paymentVerification,
}