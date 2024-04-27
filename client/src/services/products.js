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
        
        const response = await api.post('products/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
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

export const addImageToProduct = async (id, formData) => {
    console.log(formData)
    try {
        const response = await api.post(`products/${id}/images`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding image to product:', error);
        throw new Error('Failed to add image to product. Please try again.');
    }
}

export const deleteImageFromProduct = async (productId, imageId) => {
    try {
        const response = await api.delete(`products/${productId}/images/${imageId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting image from product:', error);
        throw new Error('Failed to delete image from product. Please try again.');
    }
}

export async function fetchProductCountsByCategory() {
    try {
      const response = await api.get("products/countByCategory");
      console.log(response);
      if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
  
  export const fetchProductNamesByIds = async (ids) => {
    try {
        const promises = ids.map(async (id) => {
            const response = await api.get(`products/name/${id}`);
            return response.data;
        });
        
        const productNames = await Promise.all(promises);
        return productNames;
    } catch (error) {
        console.error('Error fetching product names by IDs:', error);
        return null;
    }
};
export const  getCountOfAllProducts=async () => {
      try {
        const response = await api.get(`products/count`);
        console.log(response.data);
        return response.data;
        
      } catch (error) {
        throw new Error('Failed to fetch count of all products');
      }
    };
  
