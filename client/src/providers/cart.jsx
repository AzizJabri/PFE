import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the cart context
const CartContext = createContext();

// Create the cart provider component
export const CartProvider = ({ children }) => {
  // State to store the cart items
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  const getSubTotal = () => {
    let subTotal = 0;
    cartItems.forEach((item) => {
      subTotal += item.price;
    });
    return subTotal;
  };

  // Value object to be passed to the context provider
  const cartContextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getSubTotal,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
    return useContext(CartContext);
    };
