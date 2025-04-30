const mongoose = require('mongoose');
const path = require('path');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true } // Save image path as a string
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
