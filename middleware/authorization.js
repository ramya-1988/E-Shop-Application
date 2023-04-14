const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secretConfig = require('../configs/auth.config');
const User = require('../models/user.model');

// CheckAdmin process
exports.checkAdmin = (req, res, next) => {

    let token = req.headers["x-auth-token"];
    if (!token) {
        return res.status(401).send({
            message: "Please login first to access this endpoint!"
        });
    }

    jwt.verify(token, secretConfig.secret, (err) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized"
            });
        }
    });

    const decodedToken = jwt.decode(token, { complete: true });
    const userId = decodedToken.payload.id;

    User.findOne({ _id: userId })
        .then((user) => {
            if (!user) {
                throw new Error("User not found");
            }

            const userRole = user.role;

            if (userRole !== "admin") {
                return res.status(401).send({
                    message: "You are not authorised to access this endpoint!"
                });
            }
            next();
        })
        .catch((err) => {
            console.log("Error is occuring", err);
            res.status(500).send({
                message: "Some error occured while doing this process"
            });
        });
}

// CheckUser process
exports.checkUser = (req, res, next) => {

    let token = req.headers["x-auth-token"];
    if (!token) {
        return res.status(401).send({
            message: "Please login first to access this endpoint!"
        });
    }

    jwt.verify(token, secretConfig.secret, (err) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized"
            });
        }
    });

    const decodedToken = jwt.decode(token, { complete: true });
    const userId = decodedToken.payload.id;

    User.findOne({ _id: userId })
        .then((user) => {
            if (!user) {
                throw new Error("User not found");
            }

            const userRole = user.role;

            if (userRole !== "user") {
                return res.status(401).send({
                    message: "You are not authorised to access this endpoint!"
                });
            }
            next();
        })
        .catch((err) => {
            console.log("Error is occuring", err);
            res.status(500).send({
                message: "Some error occured while doing this process"
            });
        });
}