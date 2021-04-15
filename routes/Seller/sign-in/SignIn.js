const express = require('express');
const router = express.Router();
const Seller = require('../../../models/Seller/Seller');

router.post('/signin',async (req,res) => {
    try{
        const seller = await Seller.findOne({'phoneNumber':req.body.phoneNumber}).exec();
        if(seller){
            if(seller.password===req.body.password){
                res.json({...seller._doc,isValidCredentials:true})
            }else{
                res.json({isValidCredentials:false})
            }
        }else{
            res.json({isValidCredentials:false})
        }
    }catch(err){
        res.json({message:err})
    }
});

module.exports = router;