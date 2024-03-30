
import api from '../utils/axios';

export const getOrders = async (currentPage, ordersPerPage) => { 
    return await api.get(`orders/?_page=${currentPage}&_limit=${ordersPerPage}`);
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