const mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;


const ordersinfo = new mongoose.Schema({
    ProductId: {
        type: ObjectId,
        required: true
    }, 
    SellerId:{
        type: ObjectId,
        required: true
    },
    UserId: {
        type: ObjectId,
        required: true
    }

});


module.exports = mongoose.model('OrderSeller',ordersinfo);