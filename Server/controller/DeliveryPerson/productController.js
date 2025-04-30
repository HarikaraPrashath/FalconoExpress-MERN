const Product = require('../../models/DeliveryPerson/Product');

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  console.log("Request Body:", req.body); // To check if data is being received correctly
  
  const { name, email, phone, category, description, image } = req.body;

  // The correct check for required fields
  if (!name || !email || !phone || !category || !description || !image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newProduct = new Product({ name, email, phone, category, description, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(400).json({ message: 'Error adding product' });
  }
};


// Update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, category, description,image } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, email, phone, category, description,image },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting product' });
  }
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};