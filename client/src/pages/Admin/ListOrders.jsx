import React, { useState, useEffect } from 'react';
import api from '@/utils/axios';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import AddOrder from './AddOrder';
import { DeleteOrders, getOrders } from '@/providers/Orders';
import { Link } from 'react-router-dom';
  const ListOrders = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await getOrders(currentPage, ordersPerPage); 
          setOrders(response.data);   
          console.log(response.data)
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
  
      fetchOrders();
    }, [currentPage, ordersPerPage]);

  const deleteOrder = async (orderId) => {
    try {
      DeleteOrders(orderId);
      setOrders(orders.filter(order => order.id !== orderId));
      console.log('Order deleted successfully.');
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  return (
    <div>
      
      <br />
      <h4 className="text-4xl md:text-6xl font-semibold flex justify-center">
        List of Orders
      </h4>
      <br />
      <br />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.status}</td>
                <td>
                  <button onClick={() => deleteOrder(order.id)} className="btn  mr-2">Delete</button>
                  <Link to={`/admin/update-order/${order.id}`} className="btn ml-2">Update</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="btn btn-neutral mr-2">Previous</button>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentOrders.length < ordersPerPage} className="btn btn-neutral">Next</button>
      </div>

      <div className="flex justify-center mt-4">
      <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>Add Order</button>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
    <AddOrder/>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_3').close()}>✕</button>
          </form>
  
         
        </div>
      </dialog>
<br></br>

    </div>
  );
};

export default ListOrders;