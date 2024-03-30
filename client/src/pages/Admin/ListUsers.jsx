import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { getUsers, DeleteUsers } from '@/providers/Users';
import AddUser from './AddUser';


const ListUsers = () => {
  const [Users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [UsersPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers(currentPage, UsersPerPage); 
        setUsers(response.data); 
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching Users:', error);
      }
    };

    fetchUsers();
  }, [currentPage, UsersPerPage]);

  const deleteUsers = async (email) => { 
    try {
        await DeleteUsers(email); 
        setUsers(Users.filter(user => user.email !== email)); 
        console.log('User deleted successfully.');
    } catch (error) {
        console.error('Error deleting User:', error);
    }
};


  const currentUsers = Users.slice((currentPage - 1) * UsersPerPage, currentPage * UsersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
     
      <br />
      <h4 className="text-4xl md:text-6xl font-semibold flex justify-center">
        List of Users
      </h4>
      <br />
      <br />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>email</th>
              <th>Role</th>
             
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {currentUsers.map((User, index) => (
  <tr key={index}>
    <td>{User.id}</td>
    <td>{User.profile.firstName}</td>
    <td>{User.profile.lastName}</td>
    <td>{User.email}</td>
    <td>
      {User.roles.map((role, index) => (
        <span key={index} className={`badge ${role.name === 'ROLE_ADMIN' ? "badge-secondary" : "badge-neutral"}`}>{role.name === 'ROLE_USER' ? 'User' : 'Admin'}</span>
      ))}
      </td>
   
                <td>
                  <button onClick={() => deleteUsers(User.email)} className="btn  mr-2">Delete</button>
                  <button className="btn  ml-2">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="btn btn-neutral mr-2">Previous</button>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentUsers.length < UsersPerPage} className="btn btn-neutral">Next</button>
      </div>

      <div className="flex justify-center mt-4">
        <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>Add User</button>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
         
           <AddUser></AddUser>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_3').close()}>✕</button>
    
        </div>
      </dialog>
      <br></br>

    </div>
  );
};

export default ListUsers;
