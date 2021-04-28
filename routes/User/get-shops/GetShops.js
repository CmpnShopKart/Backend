const geolib = require('geolib');
const express = require('express');
const router = express.Router();
const shop = require('../../../models/Shop/Shop');


router.get('/getshops/:latitude/:longitude',async(req,res) => {
    try{
        const shops = await shop.find();
        const returnArr = [];
        const location = {latitude:req.params.latitude,longitude:req.params.longitude}
        shops.map(shop => {
            const res = geolib.isPointWithinRadius(location,{latitude:shop.shop_latitude,longitude:shop.shop_longitude},5000)
            if(res){
                returnArr.push(shop);
            }
        })
        res.status(200).json(returnArr);
    } catch(err) {
        console.log(err)
        res.json({ message: err});
    }
})

module.exports = router;