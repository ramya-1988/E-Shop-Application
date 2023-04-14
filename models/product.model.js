const mongoose = require('mongoose');
//const { double } = require('webidl-conversions');

const productSchema = new mongoose.Schema({

    product_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    available_items: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0.0
    },
    direction: {
        type: String,
        required: false
    },
    sortBy: {
        type: String,
        required: false
    },
    image_url: {
        type: String,
        required: false
    },
    accesstoken: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("product", productSchema);