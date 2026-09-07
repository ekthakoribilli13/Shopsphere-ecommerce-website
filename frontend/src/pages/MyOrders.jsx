import { useEffect, useState } from "react";

function MyOrders({ onBack, onOrderClick }) {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                if (!token) {
                    setError(
                        "Please login to view your orders."
                    );
                    setLoading(false);
                    return;
                }

                const response = await fetch(
                    "http://localhost:5000/api/orders/my-orders",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Failed to fetch orders"
                    );
                }

                setOrders(data.orders);

            } catch (error) {

                console.error(
                    "Fetch My Orders Error:",
                    error
                );

                setError(error.message);

            } finally {

                setLoading(false);

            }
        };

        fetchOrders();

    }, []);

    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="my-orders-page">

                <div className="my-orders-container">

                    <h1>
                        My Orders
                    </h1>

                    <p>
                        Loading your orders...
                    </p>

                </div>

            </div>
        );
    }

    // =========================
    // ERROR
    // =========================

    if (error) {

        return (
            <div className="my-orders-page">

                <div className="my-orders-container">

                    <button
                        className="checkout-back-link"
                        onClick={onBack}
                    >
                        ← Back to Shop
                    </button>

                    <h1>
                        My Orders
                    </h1>

                    <div className="checkout-error">
                        {error}
                    </div>

                </div>

            </div>
        );
    }

    // =========================
    // EMPTY ORDERS
    // =========================

    if (orders.length === 0) {

        return (
            <div className="my-orders-page">

                <div className="my-orders-container">

                    <button
                        className="checkout-back-link"
                        onClick={onBack}
                    >
                        ← Back to Shop
                    </button>

                    <div className="checkout-empty">

                        <div className="checkout-empty-icon">
                            📦
                        </div>

                        <h1>
                            No Orders Yet
                        </h1>

                        <p>
                            You haven't placed any orders yet.
                        </p>

                        <button
                            onClick={onBack}
                            className="checkout-back-button"
                        >
                            Start Shopping →
                        </button>

                    </div>

                </div>

            </div>
        );
    }

    // =========================
    // ORDERS LIST
    // =========================

    return (
        <div className="my-orders-page">

            <div className="my-orders-container">

                <button
                    className="checkout-back-link"
                    onClick={onBack}
                >
                    ← Back to Shop
                </button>

                <div className="my-orders-header">

                    <p className="checkout-tag">
                        YOUR ORDERS
                    </p>

                    <h1>
                        My Orders
                    </h1>

                    <p>
                        View and track all your orders.
                    </p>

                </div>

                <div className="orders-list">

                    {orders.map((order) => (

                        <div
                            className="order-card"
                            key={order._id}
                        >

                            <div className="order-card-header">

                                <div>

                                    <span className="order-label">
                                        Order ID
                                    </span>

                                    <strong>
                                        #{order._id}
                                    </strong>

                                </div>

                                <span className="order-status">
                                    {order.status}
                                </span>

                            </div>

                            <div className="order-card-details">

                                <div>

                                    <span>
                                        Order Total
                                    </span>

                                    <strong>
                                        ₹{order.grandTotal}
                                    </strong>

                                </div>

                                <div>

                                    <span>
                                        Items
                                    </span>

                                    <strong>
                                        {order.items.length}
                                    </strong>

                                </div>

                                <div>

                                    <span>
                                        Customer
                                    </span>

                                    <strong>
                                        {order.customer.name}
                                    </strong>

                                </div>

                            </div>

                            <button
                                className="view-order-button"
                                onClick={() =>
                                    onOrderClick(order._id)
                                }
                            >
                                View Order →
                            </button>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default MyOrders;