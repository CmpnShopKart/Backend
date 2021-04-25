const express = require('express');
const router = express.Router();
const Seller = require('../../../models/Seller/Seller');
const registeredSeller = require('../../../models/Seller/SellerRegistration');

router.post('/signin',async (req,res) => {
    try{
        const seller = await Seller.findOne({'phoneNumber':req.body.phoneNumber}).exec();
        const regSeller = await  registeredSeller.findOne({'phoneNumber':req.body.phoneNumber}).exec();
        
        if(seller&&regSeller){
            if(seller.password===req.body.password ){
                res.json({...seller._doc,sellerRegistationData:{...regSeller._doc},isValidCredentials:true,sellerRegistered:true});
            }else{
                    res.json({sellerRegistered:true,isValidCredentials:false});
            }
        }else{
            if(seller){
                if(seller.password===req.body.password){
                    res.json({...seller._doc,sellerRegistered:false,isValidCredentials:true});        
                }else{
                    res.json({sellerRegistered:false,isValidCredentials:false});    
                }
            }else{
                res.json({sellerRegistered:false,isValidCredentials:false});
            }
        }
    }catch(err){
        console.log(err);
        res.json({message:err})
    }
});

module.exports = router;