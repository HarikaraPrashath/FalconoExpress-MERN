import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/products';

// Get all products
export const getProducts = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

// Add a new product
export const addProduct = async (productData) => {
  const response = await axios.post(`${API_BASE_URL}/add`, productData); // Use the correct endpoint here
  return response.data;
};


// Update a product by ID
export const updateProduct = async (id, updatedData) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, updatedData); // This was correct
  return response.data;
};

// Delete a product by ID
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`); // This was correct
  return response.data;
};