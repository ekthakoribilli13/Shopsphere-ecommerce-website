import { useEffect, useState } from "react";

import { getProducts } from "./api/products.js";

import ProductCard from "./components/ProductCard.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import Cart from "./components/Cart.jsx";
import Navbar from "./components/Navbar.jsx";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import Checkout from "./pages/Checkout.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import OrderDetails from "./pages/OrderDetails";

import "./App.css";

function App() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [authPage, setAuthPage] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [showMyOrders, setShowMyOrders] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });


    // =========================
    // FETCH PRODUCTS
    // =========================

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();

                setProducts(data);
            } catch (error) {
                setError("Failed to load products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);


    // =========================
    // FILTER PRODUCTS
    // =========================

    const filteredProducts = products.filter((product) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(search) ||
            product.category
                .toLowerCase()
                .includes(search);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });


    // =========================
    // LOGIN
    // =========================

    const handleLogin = (data) => {
        setUser(data.user);

        setAuthPage(null);

        setShowProfile(false);

        setShowCheckout(false);

        setShowMyOrders(false);
    };


    // =========================
    // LOGOUT
    // =========================

    const handleLogout = () => {
        setShowMyOrders(false);

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setUser(null);

        setSelectedProduct(null);

        setShowProfile(false);

        setShowCheckout(false);

        setAuthPage(null);
    };


    // =========================
    // LOADING
    // =========================

    if (loading) {
        return (
            <div className="app">
                <h2>Loading products...</h2>
            </div>
        );
    }


    // =========================
    // ERROR
    // =========================

    if (error) {
        return (
            <div className="app">
                <h2>{error}</h2>
            </div>
        );
    }


    // =========================
    // LOGIN PAGE
    // =========================

    if (authPage === "login") {
        return (
            <Login
                onLogin={handleLogin}
                onGoToSignup={() =>
                    setAuthPage("signup")
                }
            />
        );
    }


    // =========================
    // SIGNUP PAGE
    // =========================

    if (authPage === "signup") {
        return (
            <Signup
                onSignup={() =>
                    setAuthPage("login")
                }
                onGoToLogin={() =>
                    setAuthPage("login")
                }
            />
        );
    }


    // =========================
    // CHECKOUT PAGE
    // =========================

    if (showCheckout) {
        return (
            <div className="app">

                <Navbar
                    user={user}
                    onLogin={() =>
                        setAuthPage("login")
                    }
                    onLogout={handleLogout}
                    onProfile={() =>
                        setShowProfile(true)
                    }
                    onMyOrders={() =>
                        setShowMyOrders(true)
                    }
                />

                <Checkout
                    onBack={() =>
                        setShowCheckout(false)
                    }
                    onOrderPlaced={() => {}}
                />

            </div>
        );
    }


    // =========================
    // MY ORDERS PAGE
    // =========================
    if (selectedOrderId) {
    return (
        <div className="app">
            <Navbar
                user={user}
                onLogin={() => setAuthPage("login")}
                onLogout={handleLogout}
                onProfile={() => setShowProfile(true)}
                onMyOrders={() => {
                    setSelectedOrderId(null);
                    setShowMyOrders(true);
                }}
            />

            <OrderDetails
                orderId={selectedOrderId}
                onBack={() => {
                    setSelectedOrderId(null);
                    setShowMyOrders(true);
                }}
            />
        </div>
    );
}
    if (showMyOrders) {
        return (
            <div className="app">

                <Navbar
                    user={user}
                    onLogin={() =>
                        setAuthPage("login")
                    }
                    onLogout={handleLogout}
                    onProfile={() =>
                        setShowProfile(true)
                    }
                    onMyOrders={() =>
                        setShowMyOrders(true)
                    }
                />

                <MyOrders
                    onBack={() =>
                        setShowMyOrders(false)
                    }
                    onOrderClick={(orderId) => {
    setSelectedOrderId(orderId);
    setShowMyOrders(false);
}}
                   
                />

            </div>
        );
    }


    // =========================
    // PROFILE PAGE
    // =========================

    if (showProfile) {
        return (
            <div className="app">

                <Navbar
                    user={user}
                    onLogin={() =>
                        setAuthPage("login")
                    }
                    onLogout={handleLogout}
                    onProfile={() =>
                        setShowProfile(true)
                    }
                    onMyOrders={() =>
                        setShowMyOrders(true)
                    }
                />

                <Profile
                    onBack={() =>
                        setShowProfile(false)
                    }
                    onLogout={handleLogout}
                />

            </div>
        );
    }


    // =========================
    // PRODUCT DETAILS PAGE
    // =========================

    if (selectedProduct) {
        return (
            <div className="app">

                <Navbar
                    user={user}
                    onLogin={() =>
                        setAuthPage("login")
                    }
                    onLogout={handleLogout}
                    onProfile={() =>
                        setShowProfile(true)
                    }
                    onMyOrders={() =>
                        setShowMyOrders(true)
                    }
                />

                <ProductDetails
                    product={selectedProduct}
                    onBack={() =>
                        setSelectedProduct(null)
                    }
                />

            </div>
        );
    }


    // =========================
    // MAIN SHOP PAGE
    // =========================

    return (
        <div className="app">

            {/* =========================
                NAVBAR
            ========================= */}

            <Navbar
                user={user}
                onLogin={() =>
                    setAuthPage("login")
                }
                onLogout={handleLogout}
                onProfile={() =>
                    setShowProfile(true)
                }
                onMyOrders={() =>
                    setShowMyOrders(true)
                }
            />


            {/* =========================
                HERO
            ========================= */}

            <section className="hero">

                <div className="hero-content">

                    <p className="hero-tag">
                        WELCOME TO SHOPSPHERE
                    </p>

                    <h1>
                        Everything you need,
                        all in one place.
                    </h1>

                    <p className="hero-description">
                        Discover quality products,
                        great deals, and everyday
                        essentials made for you.
                    </p>

                    <button
                        className="shop-now-button"
                        onClick={() =>
                            document
                                .getElementById("products")
                                ?.scrollIntoView({
                                    behavior: "smooth"
                                })
                        }
                    >
                        Shop Now →
                    </button>

                </div>

            </section>


            {/* =========================
                PRODUCTS
            ========================= */}

            <section
                className="products-section"
                id="products"
            >

                <div className="products-header">

                    <div>

                        <p className="products-tag">
                            OUR COLLECTION
                        </p>

                        <h2>
                            Featured Products
                        </h2>

                        <p className="product-count">
                            {filteredProducts.length}{" "}
                            products available
                        </p>

                    </div>


                    {/* SEARCH */}

                    <div className="search-container">

                        <span>
                            🔍
                        </span>

                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(
                                    event.target.value
                                )
                            }
                        />

                    </div>

                </div>


                {/* =========================
                    CATEGORY FILTERS
                ========================= */}

                <div className="category-filters">

                    {[
                        "All",
                        "Shoes",
                        "Clothing",
                        "Electronics",
                        "Accessories"
                    ].map((category) => (

                        <button
                            key={category}
                            className={
                                selectedCategory === category
                                    ? "category-button active"
                                    : "category-button"
                            }
                            onClick={() =>
                                setSelectedCategory(
                                    category
                                )
                            }
                        >
                            {category}
                        </button>

                    ))}

                </div>


                {/* =========================
                    PRODUCT RESULTS
                ========================= */}

                {filteredProducts.length === 0 ? (

                    <div className="no-products">

                        <h2>
                            No products found 😕
                        </h2>

                        <p>
                            Try searching for something else.
                        </p>

                    </div>

                ) : (

                    <div className="product-grid">

                        {filteredProducts.map(
                            (product) => (

                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    onProductClick={
                                        setSelectedProduct
                                    }
                                />

                            )
                        )}

                    </div>

                )}

            </section>


            {/* =========================
                CART
            ========================= */}

            <Cart
                onCheckout={() => {
                    if (!user) {
                        setAuthPage("login");
                        return;
                    }

                    setShowCheckout(true);
                }}
            />

        </div>
    );
}

export default App;

