// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  image: String,
  name: String,
  description: String,
  price: Number,
  mrp: Number,
  collection: String,
  isBestseller: Boolean,
  discount: Number, // calculated based on price & mrp
  rating: Number,
  reviewsCount: Number
});

module.exports = mongoose.model('Product', productSchema);
