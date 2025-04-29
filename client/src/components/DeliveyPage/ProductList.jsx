import React, { useEffect, useState } from 'react';
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../../pages/DeliverySection/api/deliveryProductAPI';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    description: '',
    image: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } 
    };

    fetchProducts();
  }, []);

  const validateForm = (product) => {
    const errors = {};
    if (!product || typeof product !== 'object') return { general: 'Invalid product data' };
  
    if (!product.name?.trim()) errors.name = 'Product name is required';
    if (!product.email?.trim()) errors.email = 'Email is required';
    
    if (!product.phone?.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+94\d{9}$/.test(product.phone)) {
      errors.phone = 'Phone number must start with +94 and be followed by exactly 9 digits';
    }
  
    if (!product.category?.trim()) errors.category = 'Category is required';
    if (!product.description?.trim()) errors.description = 'Description is required';
    if (!product.image?.trim()) errors.image = 'Image URL is required';
    return errors;
  };
  

  const handleAddProduct = async () => {
    if (!validateForm()) return;

    try {
      const createdProduct = await addProduct(newProduct);
      setProducts([...products, createdProduct]);
      setNewProduct({
        name: '',
        email: '',
        phone: '',
        category: '',
        description: '',
        image: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateProduct = async (id, updatedData) => {
    try {
      const updatedProduct = await updateProduct(id, updatedData);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id ? { ...product, ...updatedProduct } : product
        )
      );
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <h2>All Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {product.name} - ${product.price}
              <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              {/* You could also add a button for editing here */}
            </li>
          ))}
        </ul>
      )}

      {/* Add Product Form */}
      <div>
        <h3>Add New Product</h3>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          type="text"
          placeholder="Email"
          value={newProduct.email}
          onChange={(e) => setNewProduct({ ...newProduct, email: e.target.value })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          type="text"
          placeholder="Phone"
          value={newProduct.phone}
          onChange={(e) => setNewProduct({ ...newProduct, phone: e.target.value })}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        ></textarea>
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default ProductList;

