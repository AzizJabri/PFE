import React from 'react';
import { Link } from 'react-router-dom';

const HomeAdmin = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="carousel carousel-center max-w-4xl p-4 space-x-4 bg-neutral rounded-box relative">
        <div className="carousel-item relative">
          <img src="/products.jpg" className="rounded-box h-80" alt="Carousel Image" />
          <Link to="/admin/products" className="btn absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Manage Products</Link>
        </div> 
        <div className="carousel-item relative">
          <img src="/categories.png" className="rounded-box h-80" alt="Carousel Image" />
          <Link to="/admin/list-category" className="btn absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Manage Categories</Link>
        </div> 
        <div className="carousel-item relative">
          <img src="/orders.png" className="rounded-box h-80" alt="Carousel Image" />
          <Link to="/admin/list-orders" className="btn absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Manage Orders</Link>
        </div> 
        <div className="carousel-item relative">
          <img src="/user.jpg" className="rounded-box h-80" alt="Carousel Image" />
          <Link to="/admin/list-users" className="btn absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Manage Users</Link>
        </div> 
      </div>
    </div>
  );
};

export default HomeAdmin;
