const express = require('express');
const router = express.Router();
const Seller = require('../../../models/Seller/Seller');

router.post('/signup',async(req,res) => {
    const seller = new Seller({
        phoneNumber:req.body.phoneNumber,
        password:req.body.password
    });
    try{
        const savedseller = await seller.save();
        res.json(savedseller);
    }catch(err){
        res.json({message:err})
    }
})


module.exports = router;