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
    await api.post('/cart/', {productId: item.id, quantity: quantity}).then(() => {
      fetchCartItems();
      toast.success(`Item added to cart`);
    }).catch((error) => {
      toast.error('Error adding item to cart');
    });
  };

  const getCartItems = () => {
    return cart.cartItems;
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    api.delete(`/cart/${itemId}`).then(() => {
      fetchCartItems();
      toast.success(`Item removed from cart`);
    }).catch((error) => {
      toast.error('Error removing item from cart');
    });
  };


  // Function to clear the cart
  const clearCart = async () => {
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
  };

  const updateItemQuantity = async (item, quantity) => {
    console.log(item, quantity)
    await api.patch(`/cart/${item.id}`, quantity,{"headers":{
      "Content-Type": "application/json"
    
    }}).then(() => {
      fetchCartItems();
      toast.success(`Item quantity updated`);
    }).catch((error) => {
      toast.error('Error updating item quantity');
    });
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
    updateItemQuantity
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
