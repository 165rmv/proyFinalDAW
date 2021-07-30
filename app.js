const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser")
const session = require('express-session');

const dotenv = require("dotenv");
dotenv.config();

const app = express();

// connection to Mongo db
mongoose.connect(process.env.MONGODB_HOST,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(db => console.log('db connected'))
    .catch(err => console.log(err));

// importing routes
const indexRoutes = require('./routes/routeindex');


// settings
app.set('views','views');
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
    secret: 'myscret',
    resave: false,
    saveUninitialized:false
}));

// routes
app.use('/', indexRoutes);

app.listen(process.env.PORT, () =>{
    console.log(`server on port ${process.env.PORT}`);
})