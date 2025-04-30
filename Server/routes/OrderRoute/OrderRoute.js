const express = require('express');
const router = express.Router();
const { createOrder } = require('../../controller/MakeOrderController/OrderController');

// POST /api/orders
router.post('/create', createOrder);

module.exports = router;
