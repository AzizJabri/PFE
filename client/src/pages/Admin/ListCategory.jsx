import React, { useState, useEffect } from 'react';
import api from '@/utils/axios';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';

const ListCategory = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(`/categories/?_page=${currentPage}&_limit=${categoriesPerPage}`);
        setCategories(response.data);   
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [currentPage, categoriesPerPage]);

  const deleteCategory = async (categoryId) => {
    try {
      await api.delete(`/categories/${categoryId}`);
      setCategories(categories.filter(category => category.id !== categoryId));
      console.log('Category deleted successfully.');
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Pagination Logic
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Nav />
      <br />
      <h4 className="text-4xl md:text-6xl font-semibold flex justify-center">
        List of Categories
      </h4>
      <br />
      <br />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.map((category, index) => (
              <tr key={index}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <button onClick={() => deleteCategory(category.id)} className="btn  mr-2">Delete</button>
                  <button className="btn  ml-2">Update</button>
                </td>
              </tr>
            ))}
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
          <form method="dialog">
        
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_3').close()}>✕</button>
          </form>
        </div>
      </dialog>
      <br />
      <Footer />
    </div>
  );
};

export default ListCategory;
