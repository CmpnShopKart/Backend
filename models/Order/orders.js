const mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;


const ordersinfo = new mongoose.Schema({
    Products: {
        type: Array,
        required: true
    }, 
    Date:{
        type:Date,
        default: Date.now()
    },
    isOrderProcessed:{
        type:String,
        default: false
    },
    isOrderShipped:{
        type:String,
        default: false
    },
    isOrderDelivered:{
        type:String,
        default: false
    },
    userId: {
        type: ObjectId,
        required: true
    }

});


module.exports = mongoose.model('Orders',ordersinfo);