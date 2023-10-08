const mongoose = require('mongoose')

// Declare the Schema of the Mongo model
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  }, 
  shippingInfo: {
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true,
    },
    apartment:{
        type: String,
        required: true,
    },
    pincode:{
        type: Number,
        required: true,
    }
  },
  paymentInfo: {
    razorpayOrderId: {
        type: String,
        required: true,
    },
    razorpayPaymentId: {
        type: String,
        required: true,
    }
  },
  orderItems: [
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required: true,
        },
        color: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Color",
            required: true,
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }
  ],
  payAt: {
    type: Date,
    default: Date.now()
  },
  month: {
    type: String,
    default: new Date().getMonth()
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  totalPriceAfterDiscount: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    default:"ordered"
  }
}, {
    timestamps: true,
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);