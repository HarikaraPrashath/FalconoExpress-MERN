const Order = require('../../models/Ordermodel/Order.js');

exports.assignDelivery = async (req, res) => {
  const { orderNo, deliveryPerson, adminNotes } = req.body;

  try {
    let order = await Order.findOne({ orderNo });

    if (order) {
      return res.status(409).json({ error: 'Order already exists' });
    }

    order = new Order({
      orderNo,
      deliveryPerson,
      adminNotes,
      status: 'not assigned'
    });

    await order.save();
    return res.status(201).json({ message: 'Order assigned successfully' });

  } catch (error) {
    console.error('Assign Error:', error);
    res.status(500).json({ error: 'Failed to assign delivery' });
  }
};


exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  };



  exports.assignUpdateDelivery = async (req, res) => {
    const { orderNo, deliveryPerson, adminNotes } = req.body;
  
    if (!orderNo || !deliveryPerson) {
      return res.status(400).json({ error: 'orderNo and deliveryPerson are required' });
    }
  
    try {
      const order = await Order.findOne({ orderNo });
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      order.deliveryPerson = deliveryPerson;
      order.adminNotes = adminNotes;
      order.status = 'assigned'; // Optional: depends on your workflow
  
      await order.save();
  
      return res.json({ message: 'Order reassigned successfully' });
  
    } catch (error) {
      console.error('Error reassigning delivery:', error);
      res.status(500).json({ error: 'Failed to assign delivery' });
    }
  };
  
  

// Cancel Order
exports.cancelOrder = async (req, res) => {
  const { orderNo } = req.body;
  try {
    const order = await Order.findOne({ orderNo });
    if (order) {
      order.status = 'cancelled';
      await order.save();
      return res.json({ message: 'Order cancelled' });
    } else {
      return res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Cancellation failed' });
  }
};

// PUT /api/orders/update/:orderNo
exports.UpdateDelivery = async (req, res) => {
  try {
    const { orderNo } = req.params;
    const { deliveryPerson, adminNotes, status } = req.body;

    const updatedOrder = await Order.findOneAndUpdate(
      { orderNo },
      { deliveryPerson, adminNotes, status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: 'Error updating order', error: err });
  }
};


