import React, { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '@/auth/auth';
import api from '@/utils/axios';
// Create the cart context
const CartContext = createContext();

// Create the cart provider component
export const CartProvider = ({ children }) => {
  // State to store the cart items
  const [cart, setCart] = useState({
    "cartItems": [],
    "total": 0.0
});
  const {user , isLoading} = useAuth()

  // Load the cart items from local storage
  useEffect(() => {
    if (user) {
      fetchCartItems();
    }else{
      const cartItems = localStorage.getItem('cart');
      if (cartItems) {
        setCart(JSON.parse(cartItems));
      }
    }
  }, [user]);

  const fetchCartItems = async () => {
    try {
      const response = await api.get('/cart/');
      setCart(response.data);
      localStorage.setItem('cart', JSON.stringify(response.data));
    } catch (error) {
      toast.error('Error fetching cart items');
    }
  }

  // Function to add an item to the cart
  const addToCart = async (item, quantity=1) => {
    if(user){
      await api.post('/cart/', {productId: item.id, quantity: quantity}).then(() => {
        fetchCartItems();
        toast.success(`Item added to cart`);
      }).catch((error) => {
        toast.error(error.response.data.message);
      });
    }else{
      const cartItems = cart.cartItems;
      const existingItem = cartItems.find((cartItem) => cartItem.product.id === item.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cartItems.push({
          product: item,
          quantity: quantity
        });
      }
      const newCart = {
        "cartItems": cartItems,
        "total": cart.total + item.price * quantity
      };
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
      toast.success(`Item added to cart`);
    }
  };

  const getCartItems = () => {
    return cart.cartItems;
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    if(user){
      api.delete(`/cart/${itemId}`).then(() => {
        fetchCartItems();
        toast.success(`Item removed from cart`);
      }).catch((error) => {
        toast.error('Error removing item from cart');
      });
    }else{
      const updatedCartItems = cart.cartItems.filter((item) => item.product.id !== itemId);
      const removedItem = cart.cartItems.find((item) => item.product.id === itemId);
      const newCart = {
        "cartItems": updatedCartItems,
        "total": cart.total - removedItem.product.price * removedItem.quantity
      };
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
      toast.success(`Item removed from cart`);
    }
    
  };


  // Function to clear the cart
  const clearCart = async () => {
    if(user){
      await api.delete('/cart/').then((response) => {
        setCart({
          "cartItems": [],
          "total": 0.0
      });
        localStorage.removeItem('cart');
        toast.success(`Cart cleared`);
      }).catch((error) => {
        toast.error('Error clearing cart');
      });
    }else{
      setCart({
        "cartItems": [],
        "total": 0.0
    });
      localStorage.removeItem('cart');
      toast.success(`Cart cleared`);
    }
    
  };

  const updateItemQuantity = async (item, quantity) => {
    if(user){
      await api.patch(`/cart/${item.id}`, quantity,{"headers":{
        "Content-Type": "application/json"
      
      }}).then(() => {
        fetchCartItems();
        toast.success(`Item quantity updated`);
      }).catch((error) => {
        toast.error(error.response.data.message);
      });
    }else{
      const updatedCartItems = cart.cartItems.map((cartItem) => {
        if (cartItem.product.id === item.product.id) {
          cartItem.quantity = quantity;
        }
        return cartItem;
      });
      const newCart = {
        "cartItems": updatedCartItems,
        "total": getSubTotal()
      };
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
      toast.success(`Item quantity updated`);
    }
  }



  const getSubTotal = () => {
    return cart.cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  };

  const getLength = () => {
    return cart.cartItems.length;
  };

  // Value object to be passed to the context provider
  const cartContextValue = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getSubTotal,
    getLength,
    getCartItems,
    updateItemQuantity,
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
