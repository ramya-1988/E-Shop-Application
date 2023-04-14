const mongoose = require('mongoose');
//const { double } = require('webidl-conversions');

const orderSchema = new mongoose.Schema({

    accesstoken: {
        type: String
    },
    productId: {
        type: String,
        required: true
    },
    addressId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: false
    },
    OrderDate: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now();
        }
    }
});

module.exports = mongoose.model("order", orderSchema);