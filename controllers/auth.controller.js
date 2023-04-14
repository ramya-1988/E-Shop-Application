const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const secretConfig = require('../configs/auth.config');
const User = require('../models/user.model');
const Address = require('../models/address.model');


/* USER - SIGNUP */

exports.signup = async (req, res) => {

    try {
        //Verify the req.body cannot be empty

        if (!req.body || Object.keys(req.body) === 0) {
            return res.status(400).send({
                message: "Content cannot be empty"
            });

        }

        const { email, phone_number } = req.body;
        //const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,6}$/; // declare a variable for Email validation using Regex
        const phoneRegex = /^[0-9]{10}$/; ////declare a variable for phone number validation 

        // Validator is used for validating the given email
        if (!validator.isEmail(email)) {
            return res.status(400).send({
                message: "Invalid email-id format!"
            });
        }

        // Validating the phone number using regex function
        if (!phoneRegex.test(phone_number)) {
            return res.status(400).send({
                message: "Invalid contact number format!"
            });
        }

        // Verifying the given user E-Mail exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send({
                message: "Try any other email, this email is already registered!"
            });
        }

        // Creating the object to request values for all given fields and respond to the user
        const newUser = await User.create({
            password: bcrypt.hashSync(req.body.password, 8),
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            role: req.body.role
        });
        res.status(201).send({
            _id: newUser._id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email
        });

    }

    catch (err) {
        console.log("Error creating User", err);
        res.status(500).send({
            message: "Some error occured while creating User"
        });
    }

}

/* USER - SIGNIN */

exports.signin = async (req, res) => {

    try {

        const { email, password } = req.body;

        //Check whether the mail id and password entered
        if (!email && !password) {
            return res.status(400).send({
                message: "Please enter your valid mail-id and password"
            });
        }

        const signinUser = await User.findOne({ email: req.body.email });

        // Verifying the given email is already registered or not
        if (!signinUser) {
            return res.status(400).send({
                message: "This email has not been registered!"
            });
        }

        // Password Validation
        if (!bcrypt.compareSync(req.body.password, signinUser.password)) {
            return res.status(400).send({
                message: "Invalid Credentials!"
            });
        }

        /* Create Token and send to user */

        var token = jwt.sign({ id: signinUser._id, someData: "Important" }, secretConfig.secret, { expiresIn: 5000 });

        res.header("x-auth-token", token).status(200).send({
            message: "Successfully signed in your account",
            user: {
                email: signinUser.email,
                name: signinUser.first_name,
                isAuthenticated: true,
                accesstoken: token
            }
        });
    }
    catch (err) {
        console.log("Error signed in by User", err);
        res.status(500).send({
            message: "Some error occured while signed in by User"
        });
    }
}
