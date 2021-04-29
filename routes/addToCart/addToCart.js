const express = require('express');
const router = express.Router();
const userObject = require('../../models/User/User');

router.patch('/addToCart/:userId', async (req, res) => {
    try{
        
        const user = await userObject.findById(req.params.userId);
        const cartItems = user.cartItems;
        cartItems.push(req.body);
        
        const updatedCart = await userObject.updateOne(
            { _id : req.params.userId},
            {
                $set: {
                    cartItems: cartItems
                }
            }
        );
        res.json(updatedCart);
    } catch(err) {
        console.log(err);
        res.json({ message: err});
    }

});

module.exports = router;