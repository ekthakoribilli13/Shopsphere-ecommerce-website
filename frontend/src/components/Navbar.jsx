import { useCart } from "../context/CartContext.jsx";

function Navbar({
    user,
    onLogin,
    onLogout,
    onProfile,
    onMyOrders
}) {
    const { cart } = useCart();

    const cartCount = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

    return (
        <nav className="navbar">

            <div className="logo">
                ShopSphere
            </div>

            <div className="nav-links">

                <a href="#">
                    Home
                </a>

                <a href="#products">
                    Products
                </a>

                <a href="#cart">
                    Cart
                </a>

            </div>

            <div className="nav-actions">

                {user ? (
                    <>
                        <button
                            className="profile-button"
                            onClick={onProfile}
                        >
                            👤 Profile
                        </button>
                        <button
    className="profile-button"
    onClick={onMyOrders}
>
    📦 My Orders
</button>

                        <span className="welcome-user">
                            Hi, {user.name} 👋
                        </span>

                        <button
                            className="login-button"
                            onClick={onLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        className="login-button"
                        onClick={onLogin}
                    >
                        Login
                    </button>
                )}

                <button
                    className="cart-button"
                    onClick={() => {
                        document
                            .getElementById("cart")
                            ?.scrollIntoView({
                                behavior: "smooth"
                            });
                    }}
                >
                    🛒 Cart

                    {cartCount > 0 && (
                        <span className="cart-count">
                            {cartCount}
                        </span>
                    )}
                </button>

            </div>

        </nav>
    );
}

export default Navbar;