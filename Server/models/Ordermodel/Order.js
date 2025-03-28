const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNo: { type: String, required: true, unique: true },
  sender: {
    name: String,
    phone: String,
    address: String,
  },
  deliveryPerson: String,
  adminNotes: String,
  status: {
    type: String,
    enum: ['Not assigned', 'assigned', 'rejected', 'pending', 'finished', 'cancelled'],
    default: 'Not assigned',
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
