import api from '../utils/axios';

export const getProducts = async (page, size) => {
    return await api.get('products/', {
        params: {
            page,
            size
        }
    });
};

export const getProduct = async (id) => {
    return await api.get(`products/${id}`);
};

export const createProduct = async (data) => {
    return await api.post('products/', data);
};

export const updateProduct = async (id, data) => {
    return await api.put(`products/${id}`, data);
};

export const deleteProduct = async (id) => {
    return await api.delete(`products/${id}`);
};

