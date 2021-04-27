const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userSignUpRoutes = require('./routes/User/sign-up/SignUp');
const userSignInRoutes = require('./routes/User/sign-in/SignIn');
const sellerSignUpRoutes = require('./routes/Seller/sign-up/SignUp');
const sellerSignInRoutes = require('./routes/Seller/sign-in/SignIn');
const sellerRegistrationRoutes = require('./routes/Seller/registration/Registration');
const shopRoutes = require('./routes/Shop/shop');
const productRoutes = require('./routes/Product/ProductRoutes');
const getShopsRoutes = require('./routes/User/get-shops/GetShops');
require('dotenv/config');

const app = express();

app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'));
app.get('/',(req,res) => {
    res.send("We are on Home Page");
});
 
//Connect to Database
mongoose.connect(process.env.DB_CONNECTION
    ,{useNewUrlParser:true,useUnifiedTopology:true}
    ,() => {
        console.log("Connected to DB!");
    }
)

//Routes
app.use('/user',userSignUpRoutes);
app.use('/user',userSignInRoutes);
app.use('/user',getShopsRoutes);
app.use('/seller',sellerSignUpRoutes);
app.use('/seller',sellerSignInRoutes);
app.use('/seller',sellerRegistrationRoutes);
app.use('/shop',shopRoutes);
app.use('/product',productRoutes);
app.listen(5000);
