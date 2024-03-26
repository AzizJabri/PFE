import React, { useState } from 'react';
import api from '@/utils/axios';

const Update = () => {


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h3 className="text-4xl md:text-6xl font-semibold">Fill the Form and Update an Order</h3>

      
      <br></br>
      <br></br>
      <label className="input input-bordered flex items-center gap-2">
        Status
        <input type="text" name="status" placeholder="Status" />
      </label>
      <br></br>
      <div className="space-x-2">
        <div className="space-y-2">
          <label className="input input-bordered flex items-center gap-2">
            Product ID
            <input type="text" name="product_id" placeholder="Product ID" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Quantity
            <input type="text" name="quantity" placeholder="Quantity" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Price
            <input type="text" name="price" placeholder="Price" />
          </label>
          <button className="btn btn-neutral">Remove</button>
          <br></br>
        </div>
      </div>
      <br></br>
      <div className="flex space-x-2">
        <button  className="btn">Add Item</button>
        <button className="btn">Create Order</button>
      </div>
    </div>
  );
};

export default Update;
