const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
const url = require('url');
const queryString = require('querystring');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const bcrypt = require('bcrypt');


const serverConfig = require('./configs/server.config');

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/EShop-App")
    .then(() => {
        console.log("Successfully connected to E-Shop DB");
    })
    .catch((err) => {
        console.log("Error connecting to E-Shop DB", err);
        process.exit();
    });

require('./routes/auth.route')(app);
require('./routes/address.route')(app);
require('./routes/product.route')(app);
require('./routes/order.route')(app);

app.listen(serverConfig.PORT, () => {
    console.log(`Server is running on the PORT ${serverConfig.PORT}`);
});