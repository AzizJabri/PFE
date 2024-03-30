import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';

import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

const ProductInfo = ({ product, addToCart }) => {
    const [openLightbox, setOpenLightbox] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(product.images[0].url);
  
    const handleThumbnailClick = (imageUrl) => {
      setSelectedImage(imageUrl);
    };
  
    return (
      <div className="container mx-auto px-4">
        <div className="text-sm breadcrumbs pb-8 pt-5 px-4">
            <ul>
                <li><Link to={"/products/"}>Products</Link></li> 
                <li><Link to={`/products?category=${product.category.id}`}>{product.category.name}</Link></li> 
                <li>{product.name}</li>
            </ul>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6"> 
          <div className="flex flex-col items-center">
            <img
              src={selectedImage}
              alt={product.name}
              className="rounded-lg cursor-pointer w-96"
              onClick={() => setOpenLightbox(true)}
            />
            {/* Lightbox for image */}
            <Lightbox
              plugins={[Thumbnails]}
              open={openLightbox}
              close={() => setOpenLightbox(false)}
              slides={product.images.map((image) => ({ src: image.url }))}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)', // Background color with opacity
              }}
            />
            {product.images.length > 1 && (
              <div className="avatar flex gap-x-6 py-2">
                {product.images.map((productImage, index) => (
                  <div className="w-54 overflow-hidden" key={index}>
                    <img
                      src={productImage.url}
                      alt=""
                      role="button"
                      className={`cursor-pointer ${
                        selectedImage === productImage.url ? 'border-2 border-neutral-500' : ''
                      }`}
                      onClick={() => handleThumbnailClick(productImage.url)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
  
          <div className="flex flex-col md:items-start md:space-y-4 md:px-8">
            <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
            <p className="text-lg text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-bold mb-4">Price: ${product.price}</p>
            <div className="flex items-center mb-4">
              <label htmlFor="quantity" className="mr-2">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 border border-gray-400 rounded-md py-1 px-2"
              />
            </div>
            <div className="mb-4">
              <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {product.category.name}
              </span>
            </div>
            <button className="btn btn-primary" onClick={() => addToCart(product, quantity)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductInfo;
  
