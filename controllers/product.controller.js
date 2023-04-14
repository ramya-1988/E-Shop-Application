const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const querystring = require('querystring');
const secretConfig = require('../configs/auth.config');
const User = require('../models/user.model');
const Address = require('../models/address.model');
const Product = require('../models/product.model');

/* Save Products */
exports.saveProduct = async (req, res) => {

    try {
        //Verify the req.body cannot be empty

        if (!req.body || Object.keys(req.body) === 0) {
            return res.status(400).send({
                message: "Content cannot be empty"
            });

        }

        // Add the product
        const addProduct = await Product.create({
            product_name: req.body.product_name,
            description: req.body.description,
            available_items: req.body.available_items,
            category: req.body.category,
            manufacturer: req.body.manufacturer,
            price: req.body.price,
            image_url: req.body.image_url,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        res.status(201).send({
            _id: addProduct._id,
            product_name: addProduct.product_name,
            description: addProduct.description,
            available_items: addProduct.available_items,
            category: addProduct.category,
            manufacturer: addProduct.manufacturer,
            price: addProduct.price,
            image_url: addProduct.image_url,
            createdAt: addProduct.createdAt,
            updatedAt: addProduct.updatedAt
        });
    }
    catch (err) {
        console.log("Error creating on product", err);
        res.status(500).send({
            message: "Some error occured while creating Product"
        });
    }

}


/* Searching the product */
exports.searchProduct = async (req, res) => {

    try {

        const queryobj = { ...req.query };
        const excludefields = ["sortBy", "direction"];
        excludefields.forEach((element) => delete queryobj[element]);

        let query = Product.find(queryobj);

        if (req.query.sortBy) {
            if (req.query.direction === 'ASC') {
                query = query.sort(req.query.sortBy);
            }
            else if (req.query.direction === 'DESC') {
                query = query.sort("-" + req.query.sortBy);
            }
        }

        const products = await query;

        res.status(200).send({
            message: "Success",
            products
        });
    }

    catch (err) {
        console.log("Error searching on product", err);
        res.status(500).send({
            message: "Some error occured while searching the Product"
        });
    }
}

/* Get the categories as a list */

exports.getProduct = async (req, res) => {

    try {
        const retrieveCategory = await Product.distinct('category');

        if (!retrieveCategory || retrieveCategory.length === 0) {
            return res.status(200).send([]);
        }
        res.status(200).send({
            message: "Categories retrieved successfully",
            retrieveCategory
        });

    }
    catch (err) {
        console.log("Error is occuring", err);
        res.status(500).send({
            message: "Some error occured while fetching categories"
        });
    }
}

/* Fetching the product details by using ID */

exports.fetchById = async (req, res) => {

    try {
        const productById = await Product.findById(req.query.id);

        if (!productById || productById.length === 0) {
            return res.status(404).send({
                message: `No Product found for ID - ${req.query.id}!`
            });
        }
        res.status(200).send({
            message: `Successfully fetched details for ID - ${req.query.id}`,
            productById
        });

    }
    catch (err) {
        console.log("Error is occuring", err);
        res.status(500).send({
            message: "Some error occured while fetching details for ID"
        });
    }
}

/* Update the product details by using ID */

exports.updateProduct = async (req, res) => {

    const { id } = req.query;
    const { product_name, description, available_items, category, manufacturer, price, image_url } = req.body;
    try {
        const updateDetails = await Product.findByIdAndUpdate(id, { product_name, description, available_items, category, manufacturer, price, image_url });

        if (!updateDetails || updateDetails.length === 0) {
            return res.status(400).send({
                message: `No Product found for ID - ${req.query.id}!`
            });
        }
        res.status(200).send({
            message: `Successfully updated the product details for ID - ${req.query.id}`,
            updateDetails
        });
    }
    catch (err) {
        console.log("Error is occuring", err);
        res.status(500).send({
            message: "Some error occured while updating the product details"
        });
    }
}

/* Deleting the product details by ID */

exports.deleteProduct = async (req, res) => {

    try {
        const deleteProductById = await Product.findByIdAndDelete(req.query.id);

        if (!deleteProductById || deleteProductById.length === 0) {
            return res.status(404).send({
                message: `No Product found for ID - ${req.query.id}!`
            });
        }
        res.status(200).send({
            message: `Product with ID - ${req.query.id} deleted successfully!`,
            deleteProductById
        })
    }
    catch (err) {
        console.log("Error is occuring", err);
        res.status(500).send({
            message: "Some error occured while deleting product"
        });
    }
}