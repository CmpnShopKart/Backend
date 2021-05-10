const express = require('express');
const router = express.Router();
const Orders =require('../../models/Order/orders');
const User=require('../../models/User/User');
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

const getUserDetails = async(UserId) => {
    try{
        const matchedUser = await User.findById(UserId);
        const userDetails = matchedUser._doc;
        const returnObj = {
            UserId : userDetails._id,
            UserName: userDetails.userName,
            ShippingAdress: userDetails.shippingAddress
        }
        return returnObj;
    }catch(err){
        return {message:err};
    }
}

const getSellerOrders = async (SellerId) => {
    try{
        const resArray = [];
        const sellerOrders = await OrderSeller.find({SellerId:SellerId});
        for(sellerOrder of sellerOrders){
            const productDetails = await getProductDetails(sellerOrder.ProductId);
            const userDetails = await getUserDetails(sellerOrder.UserId);
            const matchedOrder = await Orders.findById(sellerOrder.OrderId);
            console.log(matchedOrder);
            console.log(sellerOrder.ProductId);
            const matchedProduct = matchedOrder.Products.find(product => product.ProductId === sellerOrder.ProductId.toString());
                const productObj = {
                    ...productDetails,
                    ...userDetails,
                    Date:sellerOrder.Date,
                    OrderId: sellerOrder.OrderId,
                    isProductProcessed:matchedProduct.isProductProcessed,
                    isProductShipped:matchedProduct.isProductShipped,
                    isProductDelivered:matchedProduct.isProductDelivered
                }
                resArray.push(productObj);
        }
        return resArray;
    }catch(err){
        console.log(err);
        return {message:err}
    }
}


router.get('/getOrders/:sellerId',async(req,res) => {
    try{
        const sellerOrders = await getSellerOrders(req.params.sellerId);
        console.log(sellerOrders);
        res.status(200).send(sellerOrders);
    }catch(err){
        res.status(400).send({message:err});
    }
});

router.patch('/order/updateStatus', async (req, res) => {

    try {

        const productId = req.body.ProductId;
        const matchedOrder = await Orders.findOne({
            _id: req.body.OrderId
        });
        const matchedProduct = matchedOrder.Products.find(product => product.ProductId === productId);
        console.log(matchedProduct);
        if(matchedProduct.isProductProcessed){
            if(matchedProduct.isProductShipped) {
                matchedProduct.isProductDelivered = true;
            }
            else{
                matchedProduct.isProductShipped = true;
            }
        }else{
            matchedProduct.isProductProcessed = true;
        }

        const matchedIndex =  matchedOrder.Products.findIndex(product => {
            product.ProductId === productId
        });

        const newProducts = matchedOrder.Products;
        newProducts[matchedIndex] = matchedProduct;

        
        const updatedOrderStatus = await Orders.updateOne(
            { _id : req.body.OrderId},
            { 
                $set: {
                        Products: newProducts
                     } 
            }
            );
        res.status(200).json(updatedOrderStatus);

    } catch (err) {
        console.log(err);
        res.json({ message: err});
    }

});

module.exports = router;