import React, { useEffect, useState } from "react";

function OrderDetails({ orderId, onBack }) {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    `http://localhost:5000/api/orders/${orderId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch order"
                    );
                }

                // Backend returns { message, order }
                setOrder(data.order);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) {
        return (
            <div className="order-details">
                <h2>Loading Order...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="order-details">
                <h2>Unable to load order</h2>
                <p>{error}</p>

                <button onClick={onBack}>
                    ← Back to My Orders
                </button>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="order-details">
                <h2>Order not found</h2>

                <button onClick={onBack}>
                    ← Back to My Orders
                </button>
            </div>
        );
    }

    return (
        <div className="order-details">

            <button onClick={onBack}>
                ← Back to My Orders
            </button>

            <h1>Order Details</h1>

            {/* ORDER INFORMATION */}
            <div className="order-info">

                <p>
                    <strong>Order ID:</strong> #{order._id}
                </p>

                <p>
                    <strong>Status:</strong> {order.status}
                </p>

                <p>
                    <strong>Order Total:</strong> ₹{order.grandTotal}
                </p>

                <p>
                    <strong>Order Date:</strong>{" "}
                    {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : "N/A"}
                </p>

            </div>

            {/* ORDER ITEMS */}
            <h2>Items</h2>

            {order.items && order.items.length > 0 ? (
                <div className="order-items">

                    {order.items.map((item, index) => (
                        <div
                            className="order-item"
                            key={item._id || index}
                        >

                            <h3>
                                {item.product?.name ||
                                    item.name ||
                                    "Product"}
                            </h3>

                            <p>
                                <strong>Quantity:</strong>{" "}
                                {item.quantity}
                            </p>

                            <p>
                                <strong>Price:</strong> ₹{item.price}
                            </p>

                            <p>
                                <strong>Subtotal:</strong>{" "}
                                ₹{item.price * item.quantity}
                            </p>

                        </div>
                    ))}

                </div>
            ) : (
                <p>No items found.</p>
            )}

            {/* PRICE DETAILS */}
            <h2>Price Details</h2>

            <div className="price-details">

                <p>
                    <strong>Subtotal:</strong>{" "}
                    ₹{order.subtotal}
                </p>

                <p>
                    <strong>Delivery Charge:</strong>{" "}
                    ₹{order.deliveryCharge}
                </p>

                <p>
                    <strong>Grand Total:</strong>{" "}
                    ₹{order.grandTotal}
                </p>

            </div>

            {/* CUSTOMER DETAILS */}
            <h2>Delivery Details</h2>

            <div className="customer-details">

                <p>
                    <strong>Name:</strong>{" "}
                    {order.customer?.name || "N/A"}
                </p>

                <p>
                    <strong>Phone:</strong>{" "}
                    {order.customer?.phone || "N/A"}
                </p>

                <p>
                    <strong>Address:</strong>{" "}
                    {order.customer?.address || "N/A"}
                </p>

                <p>
                    <strong>City:</strong>{" "}
                    {order.customer?.city || "N/A"}
                </p>

                <p>
                    <strong>Pincode:</strong>{" "}
                    {order.customer?.pincode || "N/A"}
                </p>

            </div>

        </div>
    );
}

export default OrderDetails;
