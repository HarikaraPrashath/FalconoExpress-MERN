const express = require('express');
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../../controller/DeliveryPerson/productController');

const router = express.Router();

router.get('/products', getProducts);
router.post('/products/add', addProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;