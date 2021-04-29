const express = require('express');
const router = express.Router();
const Orders=require('../../models/Order/orders');
const path = require("path");

router.get('/getorders',(req,res)=>{
    res.send('hello');
});
router.post('/postorders', async (req,res) => {
    console.log(req.body);
        const orders_info = new Orders({
            Productid : req.body.Productid,
            Product_Name : req.body.Product_Name,
            Product_Price : req.body.Product_Price,
            Date : req.body.Date,
            isOrderProcessed : req.body.isOrderProcessed,
            isOrderShipped : req.body.isOrderShipped,
            isOrderDelivered : req.body.isOrderDelivered,
            Product_Quantity : req.body.Product_Quantity,
            Shop_Id : req.body.Shop_Id
        });
        try{
            const savedorders = await orders_info.save();
            res.json(savedorders);
        }catch(err){
            res.json({message:err})
        }
});
module.exports = router;