const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user",
    },
    isBlocked:{
        type:Boolean,
        default:false,
    },
    cart:{
        type:Array,
        default:[]
    },
    address:{
        type:String
    },
    wishlist:[{type: mongoose.Schema.Types.ObjectId, ref:"Product"}],
    refreshToken:{
        type:String,
    },
    passwordChangeAt: {
        type: Date,
    },
    passwordResetToken: {
        type:String,
    },
    passwordResetExpires:{
        type:Date,
    }
}, {
    timestamps: true,
});

//Export the model
module.exports = mongoose.model('User', userSchema);