import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../../pages/DeliverySection/api/deliveryProductAPI';


const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState({});
  const [editErrors, setEditErrors] = useState({});

  const [newProduct, setNewProduct] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    description: '',
    image: '', // New field for image URL or path
  });

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const validateForm = (product) => {
    const errors = {};
    if (!product || typeof product !== 'object') return { general: 'Invalid product data' };
  
    if (!product.name?.trim()) errors.name = 'Product name is required';
    
    // Email Validation
    if (!product.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[\w.-]+@gmail\.com$/.test(product.email)) {
      errors.email = 'Email must be a valid Gmail address (e.g., example@gmail.com)';
    }
    
    // Phone Number Validation
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
  

  const handleChangeNewProduct = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

   // Handle Image Upload
   const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProduct((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleAddProduct = async () => {
    const formErrors = validateForm(newProduct);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const created = await addProduct(newProduct);
      setProducts([...products, created]);
      setNewProduct({ name: '', email: '', phone: '', category: '', description: '', image: '' });
      setErrors({});
      setShowModal(false);
    } catch (err) {
      console.error('Add error:', err);
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setEditId(product._id);
    setEditErrors({});
  };

  const handleUpdate = async () => {
    if (!editProduct) {
      console.error("Edit product data is missing!");
      return;
    }
  
    const formErrors = validateForm(editProduct);
    if (Object.keys(formErrors).length > 0) {
      setEditErrors(formErrors);
      return;
    }
  
    try {
      const updated = await updateProduct(editId, editProduct);
      setProducts((prev) => prev.map((p) => (p._id === editId ? updated : p)));
      closeEditModal();
    } catch (err) {
      console.error('Update error:', err);
    }
  };
  
  

  const handleDelete = async () => {
    try {
      await deleteProduct(editId);
      setProducts((prev) => prev.filter((p) => p._id !== editId));
      closeEditModal();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const closeEditModal = () => {
    setEditProduct(null);
    setEditId(null);
    setEditErrors({});
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = filter === 'All' || product.category === filter;
    const matchesSearch =
      searchTerm === '' ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search........"
          className="border px-4 py-2 rounded w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            + Add Details
          </button>
          <Link to="/history">
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              History
            </button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-left border-t">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Phone No</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{p.name}</td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3">{p.email}</td>
                <td className="px-4 py-3 truncate max-w-xs">{p.description}</td>
                <td className="px-4 py-3">{p.phone}</td>
                <td className="px-4 py-3">
                  <img src={p.image}  className="w-20 h-20 rounded-full object-cover" /> {/* Image Display */}
                </td>
                <td className="px-4 py-3 ">
                  <button
                    onClick={() => handleEditClick(p)}
                    className="text-red-600 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
            <div className="grid grid-cols-1 gap-3 mb-4">
              {['name', 'email', 'phone', 'category', 'description', 'image'].map((field) => (
                <div key={field}>
                  {field !== 'description' ? (
                    <input
                      type="text"
                      name={field}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={newProduct[field]}
                      onChange={handleChangeNewProduct}
                      className="border p-2 rounded w-full"
                    />
                  ) : (
                    <textarea
                      name="description"
                      placeholder="Description"
                      value={newProduct.description}
                      onChange={handleChangeNewProduct}
                      className="border p-2 rounded w-full h-20"
                    />
                  )}
                  {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                </div>
              ))}
              <div>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="border p-2 rounded w-full"
                />
                {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={handleAddProduct} className="bg-red-600 text-white px-4 py-2 rounded">
                Add
              </button>
            </div>
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-500 text-2xl">
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {['name', 'email', 'phone', 'category'].map((field) => (
                <div key={field}>
                  <input
                    type="text"
                    value={editProduct[field]}
                    onChange={(e) => setEditProduct({ ...editProduct, [field]: e.target.value })}
                    className="border p-2 rounded w-full"
                  />
                  {editErrors[field] && <p className="text-red-500 text-sm">{editErrors[field]}</p>}
                </div>
              ))}
            </div>
            <textarea
              value={editProduct.description}
              onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
              className="border p-2 w-full h-24 mb-2 rounded"
            />
            {editErrors.description && <p className="text-red-500 text-sm">{editErrors.description}</p>}
            <div className="flex justify-between">
              <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">
                Update
              </button>
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>
            <button onClick={closeEditModal} className="absolute top-2 right-2 text-gray-500 text-2xl">
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
