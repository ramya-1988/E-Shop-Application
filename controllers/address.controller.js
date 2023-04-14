const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const secretConfig = require('../configs/auth.config');
const User = require('../models/user.model');
const Address = require('../models/address.model');

exports.addAddress = async (req, res) => {

    try {

        //Verify the req.body cannot be empty

        if (!req.body || Object.keys(req.body) === 0) {
            return res.status(400).send({
                message: "Content cannot be empty"
            });
        }

        // Verification of logged in access
        let token = req.headers["x-auth-token"];
        if (!token) {
            return res.status(401).send({
                message: "Please login first to access this endpoint!"
            });
        }

        // Validating the Zipcode and Phone number
        const { zipcode, phone } = req.body;
        const zipcodeRegex = /^[0-9]{6}$/; // declare a "zipcodeRegex" varaible using regex
        const phoneRegex = /^[0-9]{10}$/;  // declare a "phoneRegex" varaible using regex

        if (!zipcodeRegex.test(zipcode)) {
            return res.status(400).send({
                message: "Invalid zip code!"
            });
        }

        if (!phoneRegex.test(phone)) {
            return res.status(400).send({
                message: "Invalid contact number!"
            });
        }

        // Decoding the token
        const decodedToken = jwt.decode(token, { complete: true });
        const userId = decodedToken.payload.id;
        const obj = {};

        User.findOne({ _id: userId })
            .then((user) => {
                if (!user) {
                    throw new Error("User not found");
                }
                obj.user = user;
            })
            .catch((err) => {
                console.log(err);
            });

        const now = new Date();

        //Create address for the logged in user
        const loggedinAddress = await Address.create({

            name: req.body.name,
            phone: req.body.phone,
            street: req.body.street,
            landmark: req.body.landmark,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            createdAt: now.toISOString(),
            updatedAt: now.toISOString()
        });
        res.status(200).send({
            message: "Success",
            address: {
                _id: loggedinAddress._id,
                name: loggedinAddress.name,
                phone: loggedinAddress.phone,
                street: loggedinAddress.street,
                landmark: loggedinAddress.landmark,
                city: loggedinAddress.city,
                state: loggedinAddress.state,
                zipcode: loggedinAddress.zipcode,
                createdAt: now.toISOString(),
                updatedAt: now.toISOString(),
                user: obj.user
            }
        });


    }
    catch (err) {
        console.log("Error creating address", err);
        res.status(500).send({
            message: "Some error occured while creating address"
        });
    }

}