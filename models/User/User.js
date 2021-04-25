const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    cartItems:{
        type:Array,
        required:false
    }
});


module.exports = mongoose.model('Users',userSchema);