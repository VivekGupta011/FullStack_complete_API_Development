const mongoose = require('mongoose')

// Declare the Schema of the Mongo model
const enquirySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"Submitted",
        enum:["Submitted", "Contacted", "In Progress,", "Resolved"]
    }
}, 
{
    timestamps: true,
}
);

//Export the model
module.exports = mongoose.model('Enquiry', enquirySchema);