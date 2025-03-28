const mongoose = require("mongoose");

const UserPayment = new mongoose.Schema(
  {
    bank: { type: String },
    branch: { type: String },
    cNumber: { type: String },
    cardType: { type: String },
    owner: { type: String },
    expiryDate: { type: String },
    user_id: {type: String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserPayment", UserPayment);
