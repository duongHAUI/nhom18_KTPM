const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB= require('./configs/database')
const router= require('./routers')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
router(app);

app.listen(process.env.PORT || 3000, () => {
  console.log("server run at port:: ", process.env.PORT  ||3000);
});
