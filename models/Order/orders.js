const mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
const ordersinfo = new mongoose.Schema({
    Productid:{
        type:ObjectId,
        required:true
    },
    Product_Name:{
        type:String,
        required:true
    },
    Product_Price:{
        type:Number,
        required:true
    },
    Date:{
        type:Date,
        required:true
    },
    isOrderProcessed:{
        type:String,
        required:true
    },
    isOrderShipped:{
        type:String,
        required:true
    },
    isOrderDelivered:{
        type:String,
        required:true
    },
    Product_Quantity:{
        type:Number,
        required:true
    },
    Shop_Id:{
        type:ObjectId,
        required:true
    }

});


module.exports = mongoose.model('Orders',ordersinfo);