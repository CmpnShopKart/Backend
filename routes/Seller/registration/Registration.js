const express = require('express');
const router = express.Router();
const cloudinary = require("../../../utils/cloudinary");
const SellerReg = require('../../../models/Seller/SellerRegistration');
const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
filename: function(req,file,cb){
    cb(null, new Date().toDateString() + file.originalname);
}
});

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg'  || file.mimetype === 'image/png'){
        cb(null,true);
    } else {
        cb(null,false);
    }
};
const upload1 = multer({storage: storage,limits:{fileSize: 1024*1024*5},filefilter: fileFilter}); 

router.get('/registration',(req,res)=>{
    res.send('hello');
});


router.post('/registration',upload1.single('aadharPhoto'), async (req,res) => {
    try{
        const result = await cloudinary.uploader.upload(req.file.path)
        const seller = new SellerReg({
            sellerId : req.body.sellerId,
            sellerName : req.body.sellerName,
            phoneNumber : req.body.phoneNumber,
            email : req.body.email,
            panNumber : req.body.panNumber,
            aadharNumber : req.body.aadharNumber,
            aadharPhoto : result.secure_url,
            gstNo : req.body.gstNo
        });
        try{
            const savedseller = await seller.save();
            res.json(savedseller);
        }catch(err){
            res.json({message:err})
        }
    } catch(err){
        console.log(err)
    }
});




module.exports = router; 