const mongoose = require('mongoose'); 


const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    numViews:{
        type:Number,
        default: 0,
    },
    isLiked:{
        type:Boolean,
        default: false,
    },
    isDisliked:{
        type:Boolean,
        default: false,
    },
    likes:[{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    disLikes:[{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    image:{
        type:[],
        default: "https://www.shutterstock.com/image-photo/blogging-blog-word-coder-coding-260nw-520314613.jpg"
    },
    author:{
        type:String,
        default: "admin"
    }
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);