"use strict";

const dotenv = require("dotenv")
const express = require("express");
const cors = require("cors");
const connectdb = require("../config/config_db")

var corsOptions = {
    origin: process.env.CORSURL || "http://localhost:4200"
};

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
connectdb();
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/categories', require('../routes/categoryRoutes'))
app.use('/api/products', require('../routes/productRouter'))
app.use('/api/carousel', require('../routes/carouselRouter'))
app.use('/api', require('../routes/userRouter'))

app.listen(PORT, () => {
    console.log(`The app is in 127.0.0.1:${PORT}`);
})//listen