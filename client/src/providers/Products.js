import api from '../utils/axios';

export const getProducts = async (currentPage, ordersPerPage) => { 
    return await api.get(`products/?_page=${currentPage}&_limit=${ordersPerPage}`);
};
export const DeleteProducts = async (ProductId)=>{
    return await api.delete(`products/${ProductId}`);
};
