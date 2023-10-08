const mongoose = require('mongoose')

// Declare the Schema of the Mongo model
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Color"
    }
    
 
}, {
    timestamps: true,
});

//Export the model
module.exports = mongoose.model('Cart', cartSchema);