const express = require('express');
const router = express.Router();
const Orders=require('../../models/Order/orders');
const path = require("path");
const OrderSeller = require('../../models/OrderSeller/OrderSeller');
const Product = require('../../models/Product/Product');

const getProductDetails = async(productId) => {
        try{
            const matchedProduct = await Product.findById(productId);
            return matchedProduct._doc;
        }catch(err){
            return {message:err};
        }
}


const getUserOrders = async (userId) => {
    const resArray = [];
    try{
        const userOrders = await Orders.find({userId:userId});
        userOrders.map(order => {
            order.Products.map(async product => {
                const productDetails = await getProductDetails(product.ProductId)
                const productObj = {
                    ...productDetails,
                    Date:order.Date,
                    isOrderProcessed:order.isOrderProcessed,
                    isOrderShipped:order.isOrderShipped,
                    isOrderDelivered:order.isOrderDelivered
                }
                resArray.push(productObj);
            }) 
        })
        console.log(resArray);
        return resArray;
    }catch(err){
        console.log(err);
        return {message:err}
    }
}

router.get('/getOrders/:userId',async(req,res) => {
    try{
        const userOrders = await getUserOrders(req.params.userId);
        res.status(200).send(userOrders);
    }catch(err){
        res.status(400).send({message:err});
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