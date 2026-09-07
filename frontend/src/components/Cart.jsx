import { useCart } from "../context/CartContext.jsx";

function Cart({ onCheckout }) {
    const {
        cart,
        addToCart,
        decreaseQuantity,
        removeFromCart
    } = useCart();

    const subtotal = cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const deliveryCharge =
        subtotal >= 1000 ? 0 : 50;

    const grandTotal =
        subtotal + deliveryCharge;

    if (cart.length === 0) {
        return (
            <div className="cart" id="cart">

                <h1>
                    Your Cart 🛒
                </h1>

                <div className="empty-cart">

                    <div className="empty-cart-icon">
                        🛒
                    </div>

                    <h2>
                        Your cart is empty
                    </h2>

                    <p>
                        Add some products to your
                        cart and they will appear here.
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="cart" id="cart">

            <h1>
                Your Cart 🛒
            </h1>

            <div className="cart-items">

                {cart.map((item) => (

                    <div
                        className="cart-item"
                        key={item._id}
                    >

                        <div className="cart-item-info">

                            <h2>
                                {item.name}
                            </h2>

                            <p>
                                ₹{item.price} × {item.quantity}
                            </p>

                            <div className="quantity-controls">

                                <button
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
                                    onClick={() =>
                                        addToCart(item)
                                    }
                                >
                                    +
                                </button>

                            </div>

                            <button
                                className="remove-button"
                                onClick={() =>
                                    removeFromCart(
                                        item._id
                                    )
                                }
                            >
                                🗑️ Remove
                            </button>

                        </div>

                        <div className="cart-item-price">

                            <strong>
                                ₹
                                {item.price *
                                    item.quantity}
                            </strong>

                        </div>

                    </div>

                ))}

            </div>

            <div className="cart-summary">

                <div className="summary-row">

                    <span>
                        Subtotal
                    </span>

                    <strong>
                        ₹{subtotal}
                    </strong>

                </div>

                <div className="summary-row">

                    <span>
                        Delivery
                    </span>

                    <strong>
                        {deliveryCharge === 0
                            ? "FREE"
                            : `₹${deliveryCharge}`}
                    </strong>

                </div>

                <div className="summary-divider"></div>

                <div className="summary-row grand-total">

                    <span>
                        Grand Total
                    </span>

                    <strong>
                        ₹{grandTotal}
                    </strong>

                </div>

                <button
                    className="checkout-button"
                    onClick={onCheckout}
                >
                    Proceed to Checkout →
                </button>

            </div>

        </div>
    );
}

export default Cart;