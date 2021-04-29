const express = require('express');
const router = express.Router();
const cloudinary = require("../../utils/cloudinary");
const Shop = require('../../models/Shop/Shop');
const multer = require('multer');
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

router.get('/', async (req, res) => {
    try{
        const shop = await Shop.find();
        res.json(shop);

    } catch(err){
        res.json({ message : err});
        
    }
});




router.post('/register', upload1.single('shop_image'),async (req, res) => {
    console.log(req.body)
    try{
        const result = await cloudinary.uploader.upload(req.file.path);
    const shop = new Shop({
        seller_id: req.body.seller_id,
        shop_name: req.body.shop_name,
        shop_address: req.body.shop_address,
        seller_gstin: req.body.seller_gstin,
        shop_latitude: req.body.shop_latitude,
        shop_longitude: req.body.shop_longitude,
        shop_image: result.secure_url
    });

    try{
        const savedShop = await shop.save();
        res.json(savedShop);
    } catch(err) {
        res.json({ message: err});
    }
}catch(err){
    console.log(err)
}
});

router.get('/:seller_id', async (req, res) => {
    try{
        const shop = await Shop.findOne({seller_id:req.params.seller_id}).exec();
        if(shop){
            res.json(shop);
        }else{
            res.status(204).json({message:"Shop not found!"});
        }
    } catch(err) {
        res.json({ message: err});
    }
});


router.delete('/:shop_id', async (req, res) => {
    try{
        const removedShop = await Shop.remove({ _id : req.params.shop_id });
        res.json(removedShop);
    } catch(err) {
        res.json({ message: "cannot find shop"});
    }
});

router.patch('/:shop_id', async (req, res) => {
    try{
        const updatedShop = await Shop.updateOne(
        { _id : req.params.shop_id },
        { 
            $set: {
                    shop_name: req.body.shop_name,
                    shop_address: req.body.shop_address,
                    shop_langitude: req.body.shop_langitude,
                    shop_longitude: req.body.shop_longitude
                 } 
        }
        );
        res.json(updatedShop);
    } catch(err) {
        res.json({ message: "cannot find shop"});
    }
});


router.get('/products/:shopId',async (req,res) => {
    try{
        const products = await Product.find({shop_id:req.params.shopId})
        res.status(200).json(products);
    }catch(err){
        console.log(err);
        res.status(400).json({message:err});
    }
});

module.exports = router;