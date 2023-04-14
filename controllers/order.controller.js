const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Address = require('../models/address.model');
const Product = require('../models/product.model');
const Order = require('../models/order.model');

/* Order creation by user */
exports.createOrder = async (req, res) => {

    try {
        const { productId, addressId } = req.body;

        let token = req.headers["x-auth-token"];

        const decodedToken = jwt.decode(token, { complete: true });
        const userId = decodedToken.payload.id;

        // UserId verification
        const userInfo = await User.findOne({ _id: userId });
        if (!userInfo) {
            return res.status(404).send({
                message: "User not found"
            });
        }

        // ProductId verification
        const productInfo = await Product.findOne({ _id: productId });
        if (!productId) {
            return res.status(404).send({
                message: `No Product found for ID - ${productId}!`
            });
        }

        if (productInfo.available_items <= 0) {
            return res.status(400).send({
                message: `Product with ID - ${productId} is currently out of stock!`
            })
        }

        // AddressId verification
        const addressInfo = await Address.findOne({ _id: addressId });
        if (!addressId) {
            return res.status(404).send({
                message: `No Address found for ID - ${addressId}!`
            });
        }

        //After getting the productId and addressId, create an order
        const orderCreation = await Order.create({
            productId: productInfo._id,
            addressId: addressInfo._id,
            quantity: req.body.quantity
        });
        res.status(200).send({
            id: orderCreation._id,
            user: { userInfo },
            product: { productInfo },
            address: { addressInfo },
            amount: productInfo.price,
            orderDate: new Date(Date.now())
        });
    }
    catch (err) {
        console.log("Error is occuring", err);
        res.status(500).send({
            message: "Some error occured while creating an order"
        });
    }
}