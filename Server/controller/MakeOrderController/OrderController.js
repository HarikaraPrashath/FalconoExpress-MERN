const Order = require('../../models/makeOrder/Orders.js');

const createOrder = async (req, res) => {
  try {
    const {
      receiverName,
      senderMobile,
      receiverMobile,
      pickupPoint,
      deliveryPoint,
      courierType,
      deliveryCost
    } = req.body;

    // Basic validation (optional)
    if (!receiverName || !senderMobile || !receiverMobile || !pickupPoint || !deliveryPoint || !deliveryCost) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrder = new Order({
      receiverName,
      senderMobile,
      receiverMobile,
      pickupPoint,
      deliveryPoint,
      courierType,
      deliveryCost
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

module.exports = { createOrder };
