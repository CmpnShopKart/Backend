const mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
//product_id is implicit as _id
const ProductSchema = mongoose.Schema({
    seller_id: {
        type: ObjectId,
        required: true
    },
    shop_id : {
        type : ObjectId,
        required: true
    },
    product_image:{
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    product_price : {
        type : Number,
        required: true
    },
    product_category: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    product_quantity : {
        type: Number,
        required: true
    }
    
});

module.exports = mongoose.model('Product',ProductSchema);