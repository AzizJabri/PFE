import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, deleteProduct } from '@/services/products';
import AddProduct from './AddProduct';
import { useSearchParams, useNavigate, Outlet, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
const ListProducts = () => {
  const [products, setProducts] = useState({
      content: [],
      pageable: {
          pageNumber: 0,
          pageSize: 9
      },
      totalPages: 0
  });

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const page = parseInt(searchParams.get('page')) || 0;
  const size = parseInt(searchParams.get('size')) || 5;
  const category = searchParams.get('category') || '';

  const search = searchParams.get('search') || '';
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
      const fetchData = async () => {
          setLoading(true);
          const products = await getProducts(page, size, search, category)
          setProducts(products.data)
          setLoading(false);
      }
      fetchData();
  }, [page, size, search, category])


  const handleDelete = async (ProductId) => {
    try {
      await deleteProduct(ProductId); 
      toast.success(`Product ${products.content.find(product => product.id === ProductId).name} deleted successfully`);
      setProducts({
        ...products,
        content: products.content.filter(product => product.id !== ProductId)
      });
    } catch (error) {
      console.error('Error deleting Product:', error);
    }
  };

  const handlePreviousClick = () => {
      const prevPage = Math.max(page - 1, 0);
      searchParams.set('page', prevPage.toString());
      navigate({ search: searchParams.toString() });
  };

  const handleNextClick = () => {
      const nextPage = Math.min(page + 1, products.totalPages - 1);
      searchParams.set('page', nextPage.toString());
      navigate({ search: searchParams.toString() });
  };

  return (
    <div>
     
      <br />
      <h4 className="text-4xl md:text-6xl font-semibold flex justify-center">
        List of Products
      </h4>
      <br />
      <br />
      <div className="overflow-x-auto px-4">
      <table className="table border border-base-300">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            // Rendering skeleton placeholders while loading
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td><div className="skeleton h-6 w-16"></div></td>
                <td><div className="skeleton h-6 w-24"></div></td>
                <td><div className="skeleton h-6 w-48"></div></td>
                <td><div className="skeleton h-6 w-16"></div></td>
                <td><div className="skeleton h-6 w-24"></div></td>
                <td>
                  <button className="btn mr-2"><div className="skeleton h-6 w-16"></div></button>
                  <button className="btn ml-2"><div className="skeleton h-6 w-16"></div></button>
                </td>
              </tr>
            ))
          ) : (
            // Rendering actual products data
            products.content.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={product.images[0].url} alt={product?.name} />
                      </div>
                    </div>
                      <div className="font-bold">{product.name}</div>
                  </div>
                </td>
                <td>{product.description}</td>
                <td>{product.price}$</td>
                <td>{product.category.name}</td>
                <td>
                  <button onClick={() => handleDelete(product.id)} className="btn mr-2">Delete</button>
                  <button className="btn ml-2">Update</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      </div>

      {products.totalPages > 1 && (
          <div class="flex justify-center py-2 mt-4">
            <div class={`join grid ${products.pageable.pageNumber > 0 & products.pageable.pageNumber < products.totalPages - 1 ? "grid-cols-3" : "grid-cols-2"}`}>
              {products.pageable.pageNumber > 0 && (
                <button class='join-item btn btn-outline' onClick={handlePreviousClick}>Previous</button>
              )}
              <div class="join-item btn btn-outline">{products.pageable.pageNumber + 1}</div>
              {products.pageable.pageNumber < products.totalPages - 1 && (
                <button class='join-item btn btn-outline' onClick={handleNextClick}>Next</button>
              )}
            </div>
          </div>
        )}

      <div className="flex justify-center mt-4">
        <Link className="btn" to={"add"} onClick={() => document.getElementById('my_modal_3').showModal()}>Add Product</Link>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <Outlet />
          {/* Render the AddProduct component directly */}
          <Link to={""} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_3').close()}>✕</Link>
        </div>
      </dialog>
      <br></br>
    
    </div>
  );
};

export default ListProducts;
