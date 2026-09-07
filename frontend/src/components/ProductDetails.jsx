import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";

import nikeImage from "../assets/nike-air-max.jpg";
import adidasImage from "../assets/Adidas Ultraboost photo.jpg";
import pumaImage from "../assets/Puma hoodie photo.jpg";
import nikeTshirtImage from "../assets/nike-t-shirt.jpg";
import adidasJacketImage from "../assets/adidas-jacket.jpg";
import pumaRunningImage from "../assets/puma-running-shoes.jpg";
import jblImage from "../assets/jbl-headphones.jpg";
import boatImage from "../assets/boat-earbuds.jpg";
import smartWatchImage from "../assets/smart-watch.jpg";
import nikeBackpackImage from "../assets/nike-backpack.jpg";
import adidasCapImage from "../assets/adidas-cap.jpg";
import walletImage from "../assets/casual-wallet.jpg";


const getProductImage = (productName) => {

    const images = {
        "Nike Air Max": nikeImage,
        "Adidas Ultraboost": adidasImage,
        "Puma Hoodie": pumaImage,
        "Nike T-Shirt": nikeTshirtImage,
        "Adidas Jacket": adidasJacketImage,
        "Puma Running Shoes": pumaRunningImage,
        "JBL Headphones": jblImage,
        "boAt Earbuds": boatImage,
        "Smart Watch": smartWatchImage,
        "Nike Backpack": nikeBackpackImage,
        "Adidas Cap": adidasCapImage,
        "Casual Wallet": walletImage
    };

    return images[productName];
};


function ProductDetails({ product, onBack }) {

    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);

    const [added, setAdded] = useState(false);


    const increaseQuantity = () => {

        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }

    };


    const decreaseQuantity = () => {

        if (quantity > 1) {
            setQuantity(quantity - 1);
        }

    };


    const handleAddToCart = () => {

        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }

        setAdded(true);

        setTimeout(() => {
            setAdded(false);
        }, 1500);

    };


    return (

        <div className="product-details-page">

            <button
                className="back-button"
                onClick={onBack}
            >
                ← Back to Products
            </button>


            <div className="product-details">


                {/* IMAGE */}

                <div className="product-details-image">

                    <img
                        src={getProductImage(product.name)}
                        alt={product.name}
                    />

                </div>


                {/* INFORMATION */}

                <div className="product-details-info">

                    <p className="details-category">
                        {product.category}
                    </p>

                    <h1>
                        {product.name}
                    </h1>

                    <p className="details-description">
                        {product.description}
                    </p>

                    <div className="details-price">
                        ₹{product.price}
                    </div>

                    <p className="details-stock">
                        {product.stock > 0
                            ? `In Stock: ${product.stock}`
                            : "Out of Stock"}
                    </p>


                    {product.stock > 0 && (

                        <>

                            <div className="details-quantity">

                                <span>
                                    Quantity
                                </span>


                                <div className="quantity-selector">

                                    <button
                                        onClick={decreaseQuantity}
                                    >
                                        −
                                    </button>

                                    <span>
                                        {quantity}
                                    </span>

                                    <button
                                        onClick={increaseQuantity}
                                    >
                                        +
                                    </button>

                                </div>

                            </div>


                            <button
                                className="details-add-button"
                                onClick={handleAddToCart}
                            >
                                {added
                                    ? "✓ Added to Cart"
                                    : "🛒 Add to Cart"}
                            </button>

                        </>

                    )}

                </div>

            </div>

        </div>
    );
}


export default ProductDetails;