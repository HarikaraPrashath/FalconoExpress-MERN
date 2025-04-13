const express = require('express');
const router = express.Router();
const {
  assignDelivery,
  cancelOrder,
  getAllOrders,
  UpdateDelivery
} = require('../../controller/OrcderController/orderController');

router.post('/assign', assignDelivery);
router.put('/update/:orderNo', UpdateDelivery);
router.post('/cancel', cancelOrder);
router.get('/orders', getAllOrders); 


module.exports = router;
