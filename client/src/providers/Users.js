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

export const changeUserEmail = async (oldEmail, newEmail) => {
    try {
      const formData = new FormData();
      formData.append('oldEmail', oldEmail);
      formData.append('newEmail', newEmail);
  
      const response = await api.post('users/changeUserEmail', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      return response.data;
    } catch (error) {
      throw new Error(error.response.data || 'Failed to update user email');
    }
  };
  export const promoteUser = async (email) => {
    try {
      const formData = new FormData();
      formData.append('email', email);
  
      const response = await api.post(`users/promote`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to promote user');
    }
  };
  
  
  export const demoteUser = async (email) => {
    try {
      const formData = new FormData();
      formData.append('email', email);
  
      const response = await api.post(`users/demote`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to demote user');
    }
  };
  export const changeUserPassword = async (email, newPassword) => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('newPassword', newPassword);
  
      const response = await api.post(`users/changeUserPassword`, formData);
      return response.data;
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Failed to change user password:', error);
      throw new Error('Failed to change user password');
    }
  };