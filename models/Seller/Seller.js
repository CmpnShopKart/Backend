const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    phoneNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
});


module.exports = mongoose.model('Sellers',sellerSchema);