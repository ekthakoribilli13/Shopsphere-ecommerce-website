const express = require("express");

const Order = require("../models/Order");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// =========================
// PLACE NEW ORDER
// =========================

router.post("/", authMiddleware, async (req, res) => {
    try {
        const {
            customer,
            items,
            subtotal,
            deliveryCharge,
            grandTotal
        } = req.body;

        if (
            !customer ||
            !customer.name ||
            !customer.phone ||
            !customer.address ||
            !customer.city ||
            !customer.pincode
        ) {
            return res.status(400).json({
                message: "Complete delivery details are required"
            });
        }

        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "Your cart is empty"
            });
        }

        // Check stock before creating order
        for (const item of items) {
            const product = await Product.findById(
                item.product
            );

            if (!product) {
                return res.status(404).json({
                    message: `Product not found: ${item.name}`
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `${product.name} does not have enough stock`
                });
            }
        }

        // Reduce product stock
        for (const item of items) {
            await Product.findByIdAndUpdate(
                item.product,
                {
                    $inc: {
                        stock: -item.quantity
                    }
                }
            );
        }

        const order = await Order.create({
            user: req.user.userId,

            customer,

            items,

            subtotal,

            deliveryCharge,

            grandTotal,

            status: "Placed"
        });

        res.status(201).json({
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        console.error(
            "Place Order Error:",
            error
        );

        res.status(500).json({
            message: "Server error while placing order"
        });
    }
});


// =========================
// GET MY ORDERS
// =========================

router.get(
    "/my-orders",
    authMiddleware,
    async (req, res) => {
        try {
            const orders = await Order.find({
                user: req.user.userId
            })
                .populate(
                    "items.product",
                    "name category"
                )
                .sort({
                    createdAt: -1
                });

            res.json({
                message: "Orders fetched successfully",
                orders
            });

        } catch (error) {
            console.error(
                "Fetch Orders Error:",
                error
            );

            res.status(500).json({
                message:
                    "Server error while fetching orders"
            });
        }
    }
);


// =========================
// GET SINGLE ORDER
// =========================

router.get(
    "/:id",
    authMiddleware,
    async (req, res) => {
        try {
            const order = await Order.findOne({
                _id: req.params.id,
                user: req.user.userId
            }).populate(
                "items.product",
                "name category"
            );

            if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                });
            }

            res.json({
                message: "Order fetched successfully",
                order
            });

        } catch (error) {
            console.error(
                "Fetch Order Error:",
                error
            );

            res.status(500).json({
                message:
                    "Server error while fetching order"
            });
        }
    }
);


module.exports = router;