const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        customer: {
            name: {
                type: String,
                required: true
            },

            phone: {
                type: String,
                required: true
            },

            address: {
                type: String,
                required: true
            },

            city: {
                type: String,
                required: true
            },

            pincode: {
                type: String,
                required: true
            }
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },

                name: {
                    type: String,
                    required: true
                },

                price: {
                    type: Number,
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],

        subtotal: {
            type: Number,
            required: true
        },

        deliveryCharge: {
            type: Number,
            required: true
        },

        grandTotal: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: [
                "Placed",
                "Confirmed",
                "Shipped",
                "Out for Delivery",
                "Delivered",
                "Cancelled"
            ],
            default: "Placed"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Order",
    orderSchema
);