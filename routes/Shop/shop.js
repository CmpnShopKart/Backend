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

router.post('/', async (req, res) => {
    const shop = new Shop({
        seller_id: req.body.seller_id,
        seller_name: req.body.seller_name,
        seller_phone: req.body.seller_phone,
        seller_email: req.body.seller_email,
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

router.get('/:shop_id', async (req, res) => {
    try{
        const shop = await Shop.find(req.params.shop_id);
        res.json(shop);
    } catch(err) {
        res.json({ message: "cannot find shop"});
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