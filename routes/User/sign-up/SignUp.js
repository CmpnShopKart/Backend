const express = require('express');
const router = express.Router();
const User = require('../../../models/User/User');

router.post('/signup',async(req,res) => {
    console.log(req.body)
    const user = new User({
        userName:req.body.userName,
        password:req.body.password,
        email:req.body.email,
        shippingAddress: req.body.shippingAddress
    });
    try{
        const savedUser = await user.save();
        res.json(savedUser);
    }catch(err){
        res.json({message:err})
    }
})


module.exports = router;