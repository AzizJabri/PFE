import React, { useState } from 'react';
import toast from 'react-hot-toast' // Import the toast function
import api from '@/utils/axios';

const AddOrder = ({ closeModal }) => {
  const [status, setStatus] = useState('');
  const [orderItems, setOrderItems] = useState([{ product_id: '', quantity: '', price: '' }]);
  const [formFilled, setFormFilled] = useState(true);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedOrderItems = [...orderItems];
    updatedOrderItems[index][name] = value;
    setOrderItems(updatedOrderItems);
  };

  const addOrderItem = () => {
    setOrderItems([...orderItems, { product_id: '', quantity: '', price: '' }]);
  };

  const removeOrderItem = (index) => {
    const updatedOrderItems = [...orderItems];
    updatedOrderItems.splice(index, 1);
    setOrderItems(updatedOrderItems);
  };

  const createOrder = async () => {
    if (status.trim() === '' || orderItems.some(item => Object.values(item).some(val => val.trim() === ''))) {
      setFormFilled(false);
      return;
    }
    try {
      const orderRequestDTO = { status, orderItems };
      const response = await api.post('/orders/', orderRequestDTO);
      console.log('Order created:', response.data);
      
      // Show success toast
      toast.success('Order created successfully!', { autoClose: 2000 });

      setStatus('');
      setOrderItems([{ product_id: '', quantity: '', price: '' }]);
    } catch (error) {
      console.error('Error creating order:', error);

      // Show error toast
      toast.error('Failed to create order. Please try again.', { autoClose: 2000 });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h3 className="text-4xl md:text-6xl ">
        Fill the Form and Create Order
      </h3>
      {!formFilled && (
        <p className="text-red-500">Please fill all fields before creating the order.</p>
      )}
      <br />
      <br />
      <label className="input input-bordered flex items-center gap-2">
        Status
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Status"
        />
      </label>
      <br />
      <div className="space-x-2">
        {orderItems.map((item, index) => (
          <div key={index} className="space-y-2">
            <label className="input input-bordered flex items-center gap-2">
              Product ID
              <input
                type="text"
                name="product_id"
                value={item.product_id}
                onChange={(e) => handleChange(index, e)}
                placeholder="Product ID"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Quantity
              <input
                type="text"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleChange(index, e)}
                placeholder="Quantity"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Price
              <input
                type="text"
                name="price"
                value={item.price}
                onChange={(e) => handleChange(index, e)}
                placeholder="Price"
              />
            </label>
            <button onClick={() => removeOrderItem(index)} className="btn btn-neutral">Remove</button>
            <br />
          </div>
        ))}
      </div>
      <br />
      <div className="flex space-x-2">
        <button onClick={addOrderItem} className="btn">Add Item</button>
        <button onClick={createOrder} className="btn">Create Order</button>
      </div>
    </div>
  );
};

export default AddOrder;
