const express = require('express');
const router = express.Router();
const Orders=require('../../models/Order/orders');
const path = require("path");
const OrderSeller = require('../../models/OrderSeller/OrderSeller');
const Product = require('../../models/Product/Product');

router.get('/getOrders/:userId',async (req,res) => {
    try{
        const userId = req.params.userId;
        const resArray = []; 
        const userOrders = await Orders.find({userId:userId});
        userOrders.map(async order => {
           try{
                order.Products.map(async product => {
                    const matchedProduct = await Product.findById(product.ProductId);
                    const orderObj = {
                        ...matchedProduct,
                        orderDate: order.Date,
                        isOrderProcessed: order.isOrderProcessed,
                        isOrderShipped: order.isOrderShipped,
                        isOrderDelivered: order.isOrderDelivered   
                    }
                    resArray.push(orderObj);
                    res.status(200).send(resArray);
                })
           }catch(err){
                console.log(err);
                res.send({message: err});
           } 
        });

    }catch(err){
        console.log(err);
                res.send({message: err});
    }
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