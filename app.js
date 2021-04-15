const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userSignUpRoutes = require('./routes/User/sign-up/SignUp');
const userSignInRoutes = require('./routes/User/sign-in/SignIn');
require('dotenv/config');

const app = express();

app.use(bodyParser.json());

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
app.listen(3000);