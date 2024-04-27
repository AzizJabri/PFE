
import api from '../utils/axios';

export const getOrders = async (currentPage, ordersPerPage) => { 
    return await api.get(`orders/all?_page=${currentPage}&_limit=${ordersPerPage}`);
};
export const DeleteOrders = async (orderId)=>{
    return await api.delete(`orders/${orderId}`);
};
export const CreateOrder = async (orderRequestDTO)=>{
    return await api.post(`/orders/${orderRequestDTO}`);
};
export const getOrderByID = async (id) => {
    return await api.get(`orders/${id}`);
};
export const updateOrder = async (id, data) => {
    return await api.put(`orders/${id}`, data);
};
export const fetchProductByOrder = async () => {
    try {
        const response = await api.get('orders/top5products');
        return response.data;
    } catch (error) {
        console.error('Error fetching chart data:', error);
        throw error;
    }
  };
  export const 
    sumAllPrices = async () => {
      try {
        const response = await api.get(`orders/sumprices`);
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch sum of all prices');
      }
    };
    export const fetchMostRepetitiveUserId = async () => {
        try {
          const response = await api.get(`orders/mostActiveUsers`);
          if (response.status === 200) {
            return response.data; // Assuming the user ID is returned in the response data
          } else {
            throw new Error('Failed to fetch most repetitive user ID');
          }
        } catch (error) {
          console.error('Error fetching most repetitive user ID:', error);
          throw error; // Rethrow the error for the caller to handle
        }
      };
      