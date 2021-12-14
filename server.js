require("dotenv").config();
const express = require("express");
const app = express();
const path = require('path')
const cors = require("cors");
const ejs = require('ejs');
const ejsLayouts = require('express-ejs-layouts')
const connectDB= require('./configs/database')
const router= require('./routers')
const cookieParser= require('cookie-parser')

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());


// set template engine
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'resources/views'));
app.use(ejsLayouts)
app.set('layouts', path.join(__dirname, 'resources/views'));

app.use(cors());

app.use(express.urlencoded({ extended: true }));

connectDB();
router(app);

app.listen(process.env.PORT || 3000, () => {
  console.log("server run at port:: ", process.env.PORT  ||3000);
});
