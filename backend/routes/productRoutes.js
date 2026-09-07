const express = require("express");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add a new product
router.post("/", authMiddleware, async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            image,
            category,
            stock
        } = req.body;

        // Check required fields
        if (
            !name ||
            !description ||
            !price ||
            !image ||
            !category ||
            stock === undefined
        ) {
            return res.status(400).json({
                message: "Please fill all product fields"
            });
        }

        // Create product
        const product = await Product.create({
            name,
            description,
            price,
            image,
            category,
            stock
        });

        res.status(201).json({
            message: "Product created successfully",
            product
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            products
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});
// Update a product
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { name, description, price, image, category, stock } = req.body;

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                price,
                image,
                category,
                stock
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});
// Delete a product
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;