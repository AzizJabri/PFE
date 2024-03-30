import React from 'react';
import { useCart } from '@/providers/cart';
import {checkout} from '@/services/payment';
import toast from 'react-hot-toast';

function CartPage() {
  const { cart, getSubTotal, clearCart, getLength, removeFromCart, updateItemQuantity } = useCart();

  const getStripeCheckout = async () => {
    try {
      const response = await checkout();
      window.location.href = response.data.message
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container mx-auto p-4 px-10">
      <h1 className="text-2xl font-semibold mb-4">Cart</h1>
      {getLength() === 0 ? (
        <div className="text-xl h-screen">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Render cart items */}
            {cart?.cartItems.map(item => (
              <div key={item.id} className="border border-base-300 p-4 rounded-md">
                <div className="flex items-center justify-between mb-2 space-x-1">
                  <div className="flex items-center">
                    <img src={item.product.images[0].url} alt={item.product.name} className="w-12 h-12 object-cover mr-2" />
                    <div>
                      <h2 className="text-lg font-semibold">{item.product.name}</h2>
                      <p className="">{item.product.description}</p>
                      <p className=" font-semibold">${item.product.price}</p>
                    </div>
                  </div>
                  <div>
                    <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</label>
                    <input
                      type="number"
                      id={`quantity-${item.id}`}
                      className="form-input w-16 input input-bordered max-w-xs text-center"
                      value={item.quantity}
                      onChange={e => updateItemQuantity(item, parseInt(e.target.value))}
                    />
                  </div>
                  <button className="btn btn-ghost" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
                <p className="">Subtotal: ${(item.quantity * item.product.price).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-lg font-semibold">${getSubTotal().toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <button className="btn btn-primary rounded-md transition" onClick={clearCart}>Clear Cart</button>
            <button className="btn btn-secondary rounded-md transition" onClick={getStripeCheckout}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
