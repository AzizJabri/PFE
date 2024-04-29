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
    <div className='min-h-screen'>
      
      <br />
      <h4 className="text-4xl md:text-6xl font-semibold flex justify-center">
        List of Orders
      </h4>
      <br />
      <br />
      <div className="overflow-x-auto px-5">
        <table className="table border border-base-300">
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>User</th>
              <th>Shipping Address</th>
              <th>Products</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>
                  {(() => {
                    switch (order.status) {
                      case 'PENDING':
                        return <span className="badge badge-warning">Pending</span>;
                      case 'SHIPPED':
                        return <span className="badge badge-primary">Shipped</span>;
                      case 'DELIVERED':
                        return <span className="badge badge-success">Delivered</span>;
                      case 'CANCELED':
                        return <span className="badge badge-error">Canceled</span>;
                      default:
                        return <span className="badge badge-neutral">Unknown</span>;
                    }
                  })()}
                </td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={order.user.profile.image} alt={order.user.profile.firstName} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{order.user.profile.firstName} {order.user.profile.lastName}</div>
                      <div className="text-sm opacity-50 space-x-1">
                        {order.user.roles.map((role, index) => (
                          <span key={index} className={`badge ${role.name === 'ROLE_ADMIN' ? "badge-secondary" : "badge-neutral"}`}>{role.name === 'ROLE_USER' ? 'User' : 'Admin'}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold">{order.user.profile.addresses[0].street} {order.user.profile.addresses[0].city}</div>
                    <div className="text-sm opacity-50">{order.user.profile.addresses[0].state}, {order.user.profile.addresses[0].postalCode}</div>
                  </div>
                </td>
                <td>
                  <ul className='menu bg-base-100 rounded-box'>
                    {order.orderItems.map((item, index) => (
                      <li key={index}>
                        <div className="flex justify-between bg-base-200">
                            <div className="avatar">
                                <div className="w-12 rounded-xl">
                                <img src={item.product?.images[0].url} />
                                </div>
                            </div>
                            <span>{item.product.name}</span>
                            <span>{item.product.price} TND</span>
                            <span>x{item.quantity}</span>
                        </div>
                      </li>
                    ))}

                  </ul>
                </td>
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