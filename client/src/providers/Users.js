import api from '../utils/axios';

export const getUsers = async (currentPage, UsersPerPage) => { 
    return await api.get(`users/?_page=${currentPage}&_limit=${UsersPerPage}`);
};
// Update the front end code
export const DeleteUsers = async (email) => {   
     return   await api.delete(`users/delete?email=${email}`);
    
  
};

export const CreateUser = async (data) => {   
    return   await api.post(`auth/register`,data);
   
 
};
export const getUserByID = async (id) => { 
    return await api.get(`users/${id}`);
};
