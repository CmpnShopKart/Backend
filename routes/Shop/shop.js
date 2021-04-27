const express = require('express');
const router = express.Router();
const Shop = require('../../models/Shop/Shop');

router.get('/', async (req, res) => {
    try{
        const shop = await Shop.find();
        res.json(shop);

    } catch(err){
        res.json({ message : err});
        
    }
});

router.post('/register', async (req, res) => {
    console.log(req.body)
    const shop = new Shop({
        seller_id: req.body.seller_id,
        shop_name: req.body.shop_name,
        shop_address: req.body.shop_address,
        seller_gstin: req.body.seller_gstin,
        shop_latitude: req.body.shop_latitude,
        shop_longitude: req.body.shop_longitude
    });

    try{
        const savedShop = await shop.save();
        res.json(savedShop);
    } catch(err) {
        res.json({ message: err});
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

module.exports = router;