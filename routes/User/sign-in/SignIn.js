const express = require('express');
const router = express.Router();
const User = require('../../../models/User/User');

router.post('/signin',async (req,res) => {
    try{
        const user = await User.findOne({'email':req.body.email}).exec();
        if(user){
            if(user.password===req.body.password){
                res.json({...user._doc,isValidCredentials:true})
            }else{
                res.json({isValidCredentials:false})
            }
        }else{
            res.json({isValidCredentials:false})
        }
    }catch(err){
        res.json({message:err})
    }
});

module.exports = router;