import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast'; // Import the toast function
import { useParams } from 'react-router-dom';
import { getOrderByID, updateOrder } from '@/providers/Orders';


const UpdateOrder = ({ closeModal }) => {
  const { orderId } = useParams(); 
  const [status, setStatus] = useState('');
  const [orderItems, setOrderItems] = useState([]);
  const [formFilled, setFormFilled] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrderByID(orderId);
        const { status, orderItems } = response.data;
        setStatus(status);
        setOrderItems(orderItems);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setOrderItems(prevOrderItems => {
      const updatedOrderItems = [...prevOrderItems];
      updatedOrderItems[index] = {
        ...updatedOrderItems[index],
        [name]: name === "product_id" ? parseInt(value) : value
      };
      return updatedOrderItems;
    });
  };
  
  
  const updateExistingOrder = async () => {
    if (status.trim() === '' || orderItems.some(item => Object.values(item).some(val => typeof val === 'string' && val.trim() === ''))) {
      setFormFilled(false);
      return;
    }
    try {
      const orderRequestDTO = {
        status,
        orderItems: orderItems.map(item => ({
          id: item.id, // Make sure to include the ID of each order item
          quantity: item.quantity,
          price: item.price,
          product_id: item.product_id // If product_id is needed, include it here
        }))
      };
      await updateOrder(orderId, orderRequestDTO); // Update the order with the new data
      console.log('Order updated successfully');
  
      // Show success toast
      toast.success('Order updated successfully!', { autoClose: 2000 });
  
    } catch (error) {
      console.error('Error updating order:', error);
  
      // Show error toast
      toast.error('Failed to update order. Please try again.', { autoClose: 2000 });
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h3 className="text-4xl md:text-6xl ">
        Update Order
      </h3>
      {!formFilled && (
        <p className="text-red-500">Please fill all fields before updating the order.</p>
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
            <br />
          </div>
        ))}
      </div>
      <br />
      <div className="flex space-x-2">
        <button onClick={updateExistingOrder} className="btn">Update Order</button>
      </div>
    </div>
  );
};

export default UpdateOrder;
