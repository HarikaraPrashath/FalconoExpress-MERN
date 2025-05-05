const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  receiverName: { type: String, required: true },
  senderMobile: { type: String, required: true },
  receiverMobile: { type: String, required: true },
  pickupPoint: { type: String, required: true },
  deliveryPoint: { type: String, required: true },
  courierType: {
    type: String,
    enum: ['brakable', 'wood', 'iron'],
    default: 'brakable'
  },
  deliveryCost: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('OrderUser', orderSchema);
