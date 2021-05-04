const express = require('express');
const router = express.Router();
const Orders=require('../../models/Order/orders');
const path = require("path");
const OrderSeller = require('../../models/OrderSeller/OrderSeller');
const Product = require('../../models/Product/Product');

router.get('/getorders',(req,res)=>{
    res.send('hello');
});
router.post('/postorders', async (req,res) => {
    console.log(req.body);
        const orders_info = new Orders({
            Products: req.body.Products,
            Date : req.body.Date,
            isOrderProcessed : req.body.isOrderProcessed,
            isOrderShipped : req.body.isOrderShipped,
            isOrderDelivered : req.body.isOrderDelivered,
            userId: req.body.UserId
        });
        try{
            const savedorders = await orders_info.save();
            req.body.Products.map(async product => {
                try {
                    const ProductId = product.ProductId;
                    const MatchedProduct = await Product.findById(ProductId);
                    const SellerId = MatchedProduct.seller_id;
                    const UserId = req.body.UserId;
                    const SellerOrder = new OrderSeller({
                        ProductId,
                        SellerId,
                        UserId
                    });
                    SellerOrder.save();
                } catch (error) {
                    console.log(error);
                    res.json({ message: err});
                }
            })
            res.json(savedorders);
        }catch(err){
            console.log(err);
            res.json({message:err})
        }
});
module.exports = router;