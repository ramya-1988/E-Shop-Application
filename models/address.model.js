const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({

    accesstoken: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: false
    }

});

module.exports = mongoose.model("address", addressSchema);