import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    // Add product to cart
    const addToCart = (product) => {

        setCart((previousCart) => {

            const existingProduct = previousCart.find(
                (item) => item._id === product._id
            );

            if (existingProduct) {
                return previousCart.map((item) =>
                    item._id === product._id
                        ? {
                              ...item,
                              quantity: item.quantity + 1
                          }
                        : item
                );
            }

            return [
                ...previousCart,
                {
                    ...product,
                    quantity: 1
                }
            ];
        });
    };

    // Decrease product quantity
    const decreaseQuantity = (productId) => {

        setCart((previousCart) =>
            previousCart
                .map((item) =>
                    item._id === productId
                        ? {
                              ...item,
                              quantity: item.quantity - 1
                          }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    // Remove product completely from cart
    const removeFromCart = (productId) => {

        setCart((previousCart) =>
            previousCart.filter(
                (item) => item._id !== productId
            )
        );
    };

    // Clear entire cart
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                decreaseQuantity,
                removeFromCart,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};