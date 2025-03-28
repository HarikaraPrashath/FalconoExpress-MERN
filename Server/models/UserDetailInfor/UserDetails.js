const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    uploadedImageUrl:{type:String},
    username: { type: String, required: true },
    mobile: { type: String, required: true },

    street: { type: String },
    area: { type: String },
    number: { type: String },
    postalCode: { type: String },
    landMark: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserDetails", UserDetailsSchema);
