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
export const fetchCategoryNamesByIds = async (ids) => {
    try {
        const promises = ids.map(async (id) => {
            const response = await api.get(`categories/name/${id}`);
            return response.data;
        });
        
        const categoryNames = await Promise.all(promises);
        return categoryNames;
    } catch (error) {
        console.error('Error fetching category names by IDs:', error);
        return null;
    }
};