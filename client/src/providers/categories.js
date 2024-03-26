import api from '../utils/axios';

export const getCategories = async () => {
    return await api.get('categories/');
};

export const getCategory = async (id) => {
    return await api.get(`categories/${id}`);
};

export const createCategory = async (data) => {
    return await api.post('categories/', data);
};

export const updateCategory = async (id, data) => {
    return await api.put(`categories/${id}`, data);
};

export const deleteCategory = async (id) => {
    return await api.delete(`categories/${id}`);
};

