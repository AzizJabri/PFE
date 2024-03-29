import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { getProducts, DeleteProducts } from '@/providers/Products';
import AddProduct from './AddProduct';
const ListProducts = () => {
  const [Products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(currentPage, ProductsPerPage); 
        setProducts(response.data.content); // Set only the content array to Products
        console.log(response.data.content);
      } catch (error) {
        console.error('Error fetching Products:', error);
      }
    };

    fetchProducts();
  }, [currentPage, ProductsPerPage]);

  const deleteProducts = async (ProductId) => {
    try {
      await DeleteProducts(ProductId); // Assuming DeleteProducts is an asynchronous function
      setProducts(Products.filter(Product => Product.id !== ProductId));
      console.log('Product deleted successfully.');
    } catch (error) {
      console.error('Error deleting Product:', error);
    }
  };

  const currentProducts = Products.slice((currentPage - 1) * ProductsPerPage, currentPage * ProductsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
     
      <br />
      <h4 className="text-4xl md:text-6xl font-semibold flex justify-center">
        List of Products
      </h4>
      <br />
      <br />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>name</th>
              <th>description</th>
              <th>price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((Product, index) => (
              <tr key={index}>
                <td>{Product.id}</td>
                <td>{Product.name}</td>
                <td>{Product.description}</td>
                <td>{Product.price}</td>
             <td>{Product.category.name}</td>
           
                <td>
                  <button onClick={() => deleteProducts(Product.id)} className="btn  mr-2">Delete</button>
                  <button className="btn  ml-2">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="btn btn-neutral mr-2">Previous</button>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentProducts.length < ProductsPerPage} className="btn btn-neutral">Next</button>
      </div>

      <div className="flex justify-center mt-4">
        <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>Add Product</button>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
      
    {/* Render the AddProduct component directly */}
    <AddProduct />
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_3').close()}>✕</button>
        </div>
      </dialog>
      <br></br>
    
    </div>
  );
};

export default ListProducts;
