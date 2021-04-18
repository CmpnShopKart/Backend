const express = require('express');
const router = express.Router();
const Seller = require('../../../models/Seller/SellerRegistration');
const multer = require('multer');

const storage = multer.diskStorage({
destination: function(req,file,cb){
    cb(null,'./uploads/');
},
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
const upload = multer({storage: storage,limits:{fileSize: 1024*1024*5},filefilter: fileFilter}); 

router.get('/registration',(req,res)=>{
    res.send('hello');
});


 router.post('/registration',upload.single('panImage'),(req,res) => {
    console.log(req.file);
});
 router.post('/registration',upload.single('shopImage'),(req,res) => {
     console.log(req.file);
 });
  router.post('/registration',upload.single('aadharImage'),(req,res) => {
     console.log(req.file);
 });

module.exports = router; 