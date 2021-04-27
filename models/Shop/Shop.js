const mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
const ShopSchema = mongoose.Schema({
    seller_id: {
        type: ObjectId,
        required: true
    },
    shop_name: {
        type: String,
        required: true
    },
    shop_address: {
        type: String,
        required: true
    },
    seller_gstin : {
        type: String,
        required: true
    },
    shop_latitude : {
        type: Number,
        required: true
    },
    shop_longitude : {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Shop',ShopSchema);