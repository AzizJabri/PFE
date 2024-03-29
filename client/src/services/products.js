import api from '../utils/axios';

export const getProducts = async (page, size, name, category) => {
    return await api.get('products/', {
        params: {
            page,
            size,
            name,
            category
        }
    });
};

export const getProduct = async (id) => {
    return await api.get(`products/${id}`);
};

export const createProduct = async (formData) => {
    try {
        const response = await api.post('products/', formData);
        return response.data; 
    } catch (error) {
        console.error('Error creating product:', error);
        throw new Error('Failed to create product. Please try again.'); // Rethrow the error for the caller to handle
    }
};


export const updateProduct = async (id, data) => {
    return await api.put(`products/${id}`, data);
};

export const deleteProduct = async (id) => {
    return await api.delete(`products/${id}`);
};

