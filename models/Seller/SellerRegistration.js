const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const sellerRegSchema = new mongoose.Schema({
    sellerId: ObjectId,
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
    // panPhoto:{
    //     type:String,
    //     required:true
    // },
    aadharNumber:{
        type:Number,
        required:true
    },
    aadharPhoto:{
        type:String,
        required:false
    },
    // shopAddress:{
    //     type:String,
    //     required:true
    // },
    // shopPhoto:{
    //     type:String,
    //     required:true
    // },
    gstNo:{
        type:Number,
        required:true
    }
});


module.exports = mongoose.model('SellerReg',sellerRegSchema);