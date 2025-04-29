const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  adminEmail: { type: String, required: true },
  purpose: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  discount: { type: String, required: true }, // e.g. "10%"
}, { timestamps: true });

module.exports = mongoose.model('PromoCode', tokenSchema);
