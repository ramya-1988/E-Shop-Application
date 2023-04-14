const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        lowercase: true
    },
    user_name: {
        type: String,
        required: false
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

module.exports = mongoose.model("user", userSchema);