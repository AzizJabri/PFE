import React from 'react';
import { Link } from 'react-router-dom';

const HomeAdmin = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="carousel carousel-center max-w-4xl p-4 space-x-4 bg-neutral rounded-box relative">
        <div className="carousel-item relative">
          <Link to="/addProduct" className="btn absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Manage Products</Link>
          <img src="/products.jpg" className="rounded-box h-80" alt="Carousel Image" />
        </div> 
        <div className="carousel-item relative">
          <Link to="/ListCategory" className="btn absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Manage Categories</Link>
          <img src="/categories.png" className="rounded-box h-80" alt="Carousel Image" />
        </div> 
        <div className="carousel-item relative">
          <Link to="/ListOrders" className="btn absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Manage Orders</Link>
          <img src="/orders.png" className="rounded-box h-80" alt="Carousel Image" />
        </div> 
        <div className="carousel-item relative">
          <Link to="/addUser" className="btn absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Manage Users</Link>
          <img src="/user.jpg" className="rounded-box h-80" alt="Carousel Image" />
        </div> 
      </div>
    </div>
  );
};

export default HomeAdmin;
