import api from '../utils/axios';

export const getCategory = async (currentPage, categoriesPerPage) => { 
    return await api.get(`categories/?_page=${currentPage}&_limit=${categoriesPerPage}`);
};

export const getCategoryByID = async (id) => {
    return await api.get(`categories/${id}`);
};

export const createCategory = async (data) => {
    return await api.post('categories/', data);
};

export const updateCategory = async (id, data) => {
    return await api.put(`categories/${id}`, data);
};

export const deleteCategory = async (categoryId) => {
    return await api.delete(`categories/${categoryId}`);
};

export const getCategories = async () => { 
    return await api.get(`categories/`);
};

export const getTopCategories = async () => { 
    return await api.get(`categories/top`);
};