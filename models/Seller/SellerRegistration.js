const mongoose = require('mongoose');

const sellerRegSchema = new mongoose.Schema({
    SellerId: Number,
    sellerName:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    panNumber:{
        type:Number,
        required:true
    },
    panPhoto:{
        type:String,
        required:true
    },
    aadharNumber:{
        type:Number,
        required:true
    },
    aadharPhoto:{
        type:String,
        required:true
    },
    shopAddress:{
        type:String,
        required:true
    },
    shopPhoto:{
        type:String,
        required:true
    },
    gstNo:{
        type:Number,
        required:true
    }
});


module.exports = mongoose.model('SellerReg',sellerRegSchema);