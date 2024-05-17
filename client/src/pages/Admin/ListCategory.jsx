import React, { useState, useEffect } from 'react';
import api from '@/utils/axios';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { getCategory, deleteCategory } from '@/providers/categories';
import AddCategory from './AddCategory';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const ListCategory = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategory(currentPage, categoriesPerPage); 
        setCategories(response.data);   
        setLoading(false);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [currentPage, categoriesPerPage]);

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId).then(() => {
      setCategories(categories.filter(category => category.id !== categoryId));
      toast.success('Category deleted successfully');
      });
    } catch (error) {
      toast.error(`Error deleting category: ${error.response.data.message}`);
    }
  };

  // Pagination Logic
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      
      <br />
      <h4 className="text-4xl md:text-6xl font-semibold flex justify-center">
        List of Categories
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
            currentCategories.map((category, index) => (
              <tr key={index}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <button onClick={() => handleDelete(category.id)} className="btn  mr-2">Delete</button>
                  <Link to={`/admin/update-categories/${category.id}`} className="btn ml-2">Update</Link>

                </td>
              </tr>
            ))
          )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="btn btn-neutral mr-2">Previous</button>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentCategories.length < categoriesPerPage} className="btn btn-neutral">Next</button>
      </div>

      <div className="flex justify-center mt-4">
        <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>Add Category</button>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
       
        <AddCategory></AddCategory>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_3').close()}>✕</button>
       
        </div>
      </dialog>
      <br />
     
    </div>
  );
};

export default ListCategory;
