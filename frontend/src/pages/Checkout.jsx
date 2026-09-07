import { useState } from "react";

import { useCart } from "../context/CartContext.jsx";

function Checkout({ onBack, onOrderPlaced }) {

    const {
        cart,
        decreaseQuantity,
        addToCart,
        removeFromCart,
        clearCart
    } = useCart();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(null);

    const subtotal = cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const deliveryCharge =
        subtotal >= 1000 ? 0 : 50;

    const grandTotal =
        subtotal + deliveryCharge;

    const handlePlaceOrder = async (event) => {

        event.preventDefault();

        setError("");

        if (
            !name.trim() ||
            !phone ||
            !address.trim() ||
            !city.trim() ||
            !pincode
        ) {
            setError(
                "Please fill in all delivery details."
            );
            return;
        }

        if (phone.length !== 10) {
            setError(
                "Please enter a valid 10-digit phone number."
            );
            return;
        }

        if (pincode.length !== 6) {
            setError(
                "Please enter a valid 6-digit pincode."
            );
            return;
        }

        const token =
            localStorage.getItem("token");

        if (!token) {
            setError(
                "Please login before placing an order."
            );
            return;
        }

        const orderItems = cart.map((item) => ({
            product: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        }));

        const orderDetails = {
            customer: {
                name: name.trim(),
                phone,
                address: address.trim(),
                city,
                pincode
            },
            items: orderItems,
            subtotal,
            deliveryCharge,
            grandTotal
        };

        try {

            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/api/orders",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(orderDetails)
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to place order"
                );
            }

            // Clear cart ONLY after successful order
            clearCart();

            // Show order success screen
            setOrderPlaced(data.order);

            // Notify parent
            onOrderPlaced(data.order);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    };

    // =========================
    // ORDER SUCCESS
    // =========================

    if (orderPlaced) {

        return (
            <div className="checkout-page">

                <div className="checkout-container">

                    <div className="checkout-empty">

                        <div className="checkout-empty-icon">
                            🎉
                        </div>

                        <h1>
                            Order Placed Successfully!
                        </h1>

                        <p>
                            Thank you for your order.
                            Your order has been successfully placed.
                        </p>

                        <div className="order-success-details">

                            <div>
                                <strong>
                                    Order ID
                                </strong>

                                <p>
                                    {orderPlaced._id}
                                </p>
                            </div>

                            <div>
                                <strong>
                                    Order Total
                                </strong>

                                <p>
                                    ₹{orderPlaced.grandTotal}
                                </p>
                            </div>

                            <div>
                                <strong>
                                    Order Status
                                </strong>

                                <p>
                                    {orderPlaced.status}
                                </p>
                            </div>

                        </div>

                        <button
                            onClick={onBack}
                            className="checkout-back-button"
                        >
                            Continue Shopping
                        </button>

                    </div>

                </div>

            </div>
        );
    }

    // =========================
    // EMPTY CART
    // =========================

    if (cart.length === 0) {

        return (
            <div className="checkout-page">

                <div className="checkout-empty">

                    <div className="checkout-empty-icon">
                        🛒
                    </div>

                    <h1>
                        Your cart is empty
                    </h1>

                    <p>
                        Add some products before
                        proceeding to checkout.
                    </p>

                    <button
                        onClick={onBack}
                        className="checkout-back-button"
                    >
                        ← Back to Shop
                    </button>

                </div>

            </div>
        );
    }

    return (

        <div className="checkout-page">

            <div className="checkout-container">

                <button
                    className="checkout-back-link"
                    onClick={onBack}
                >
                    ← Back to Cart
                </button>

                <div className="checkout-header">

                    <p className="checkout-tag">
                        SECURE CHECKOUT
                    </p>

                    <h1>
                        Complete Your Order
                    </h1>

                    <p>
                        Enter your delivery details
                        and review your order.
                    </p>

                </div>

                <div className="checkout-layout">

                    {/* DELIVERY FORM */}

                    <div className="checkout-form-card">

                        <h2>
                            Delivery Details
                        </h2>

                        <p className="checkout-section-description">
                            Where should we deliver
                            your order?
                        </p>

                        {error && (
                            <div className="checkout-error">
                                {error}
                            </div>
                        )}

                        <form
                            onSubmit={handlePlaceOrder}
                        >

                            <div className="checkout-form-row">

                                <div className="checkout-form-group">

                                    <label>
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={(event) =>
                                            setName(
                                                event.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="checkout-form-group">

                                    <label>
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        placeholder="10-digit mobile number"
                                        value={phone}
                                        maxLength="10"
                                        onChange={(event) =>
                                            setPhone(
                                                event.target.value.replace(
                                                    /\D/g,
                                                    ""
                                                )
                                            )
                                        }
                                    />

                                </div>

                            </div>

                            <div className="checkout-form-group">

                                <label>
                                    Address
                                </label>

                                <textarea
                                    placeholder="House number, street, area..."
                                    value={address}
                                    onChange={(event) =>
                                        setAddress(
                                            event.target.value
                                        )
                                    }
                                    rows="4"
                                />

                            </div>

                            <div className="checkout-form-row">

                                <div className="checkout-form-group">

                                    <label>
                                        City
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter city"
                                        value={city}
                                        onChange={(event) =>
                                            setCity(
                                                event.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="checkout-form-group">

                                    <label>
                                        Pincode
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="6-digit pincode"
                                        value={pincode}
                                        maxLength="6"
                                        onChange={(event) =>
                                            setPincode(
                                                event.target.value.replace(
                                                    /\D/g,
                                                    ""
                                                )
                                            )
                                        }
                                    />

                                </div>

                            </div>

                            <button
                                type="submit"
                                className="place-order-button"
                                disabled={loading}
                            >
                                {loading
                                    ? "Placing Order..."
                                    : "Place Order →"}
                            </button>

                        </form>

                    </div>

                    {/* ORDER SUMMARY */}

                    <div className="checkout-summary-card">

                        <h2>
                            Order Summary
                        </h2>

                        <div className="checkout-items">

                            {cart.map((item) => (

                                <div
                                    className="checkout-item"
                                    key={item._id}
                                >

                                    <div className="checkout-item-info">

                                        <strong>
                                            {item.name}
                                        </strong>

                                        <span>
                                            ₹{item.price}
                                        </span>

                                        <div className="checkout-quantity">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    decreaseQuantity(
                                                        item._id
                                                    )
                                                }
                                            >
                                                −
                                            </button>

                                            <span>
                                                {item.quantity}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    addToCart(
                                                        item
                                                    )
                                                }
                                            >
                                                +
                                            </button>

                                        </div>

                                    </div>

                                    <div className="checkout-item-right">

                                        <strong>
                                            ₹
                                            {item.price *
                                                item.quantity}
                                        </strong>

                                        <button
                                            type="button"
                                            className="checkout-remove"
                                            onClick={() =>
                                                removeFromCart(
                                                    item._id
                                                )
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                        <div className="checkout-divider"></div>

                        <div className="checkout-total-row">

                            <span>
                                Subtotal
                            </span>

                            <strong>
                                ₹{subtotal}
                            </strong>

                        </div>

                        <div className="checkout-total-row">

                            <span>
                                Delivery
                            </span>

                            <strong>
                                {deliveryCharge === 0
                                    ? "FREE"
                                    : `₹${deliveryCharge}`}
                            </strong>

                        </div>

                        <div className="checkout-divider"></div>

                        <div className="checkout-grand-total">

                            <span>
                                Total
                            </span>

                            <strong>
                                ₹{grandTotal}
                            </strong>

                        </div>

                        <div className="secure-message">
                            🔒 Secure checkout
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Checkout;