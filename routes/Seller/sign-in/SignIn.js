const express = require('express');
const router = express.Router();
const Seller = require('../../../models/Seller/Seller');
const regSeller = require('../../../models/Seller/SellerRegistration');

router.post('/signin',async (req,res) => {
    try{
        const seller = await Seller.findOne({'phoneNumber':req.body.phoneNumber}).exec();
        const regseller = await  regSeller.findOne({'phoneNumber':req.body.phoneNumber}).exec();
        
        if(seller&&regSeller){
           
           
            if(seller.password===req.body.password ){
                res.json({...seller._doc,isValidCredentials:true,sellerRegistered:true});
            }else{
                    res.json({sellerRegistered:false,isValidCredentials:false});
            }
        }else{
            res.json({sellerRegistered:false,isValidCredentials:false});
    
        }
    }catch(err){
        console.log(err);
        res.json({message:err})
    }
});

module.exports = router;