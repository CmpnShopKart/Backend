const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../../utils/cloudinary');

const Product = require('../../models/Product/Product');

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
const upload = multer({storage: storage,limits:{fileSize: 1024*1024*5},filefilter: fileFilter});



router.get('/', async (req, res) => {
    try{
        const product = await Product.find();
        res.json(product);

    } catch(err){
        res.json({ message : err});
    }
});

router.post('/', upload.single('product_image'), async (req, res) => {
    
    const result = await cloudinary.uploader.upload(req.file.path);
    
    const product = new Product({
        seller_id: req.body.seller_id,
        shop_id: req.body.shop_id,
        product_image: result.secure_url,
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_category: req.body.product_category,
        product_description: req.body.product_description,
        product_quantity: req.body.product_quantity
        
    });

    try{
        const savedProduct = await product.save();
        res.json(savedProduct);
    } catch(err) {
        res.json({ message: err});
    }
});

router.get('/:product_id', async (req, res) => {
    try{
        const product = await Product.find({ _id : req.params.product_id});
        res.json(product);
    } catch(err) {
        res.json({ message: "cannot find product"});
    }
});


router.delete('/:product_id', async (req, res) => {
    try{
        const removedProduct = await Product.remove({ _id : req.params.product_id });
        res.json(removedProduct);
    } catch(err) {
        res.json({ message: "cannot find product"});
    }
});

router.patch('/:product_id',upload.single('product_image'), async (req, res) => {
    try{
        const result = await cloudinary.uploader.upload(req.file.path);

        const updatedProduct = await Product.updateOne(
        { _id : req.params.product_id },
        { 
            $set: {
                    product_image: result.secure_url,
                    product_name: req.body.product_name,
                    product_price: req.body.product_price,
                    product_category: req.body.product_category,
                    product_description: req.body.product_description,
                    product_quantity: req.body.product_quantity
                 } 
        }
        );
        res.json(updatedProduct);
    } catch(err) {
        console.log(err);
        res.json({ message: err});
    }
});

module.exports = router;