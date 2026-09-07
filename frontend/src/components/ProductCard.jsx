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


function ProductCard({ product, onProductClick }) {

    const { addToCart } = useCart();

    const [added, setAdded] = useState(false);


    const handleAddToCart = (event) => {

        event.stopPropagation();

        addToCart(product);

        setAdded(true);

        setTimeout(() => {
            setAdded(false);
        }, 1500);
    };


    return (

        <div
            className="product-card"
            onClick={() => onProductClick(product)}
        >

            <div className="product-image">

                <img
                    src={getProductImage(product.name)}
                    alt={product.name}
                />

            </div>


            <div className="product-info">

                <h2>{product.name}</h2>

                <p className="description">
                    {product.description}
                </p>

                <p className="category">
                    {product.category}
                </p>


                <div className="product-bottom">

                    <div>

                        <h3>
                            ₹{product.price}
                        </h3>

                        <p>
                            Stock: {product.stock}
                        </p>

                    </div>


                    <button
                        onClick={handleAddToCart}
                    >
                        {added
                            ? "✓ Added"
                            : "🛒 Add to Cart"}
                    </button>

                </div>

            </div>

        </div>
    );
}


export default ProductCard;