const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Create a new product
router.post('/', async (req, res) => {
  try {
    const {
      image,
      name,
      description,
      price,
      mrp,
      collection,
      isBestseller,
      rating,
      reviewsCount
    } = req.body;

    const calculatedDiscount = mrp && price ? Math.round(((mrp - price) / mrp) * 100) : 0;

    const newProduct = new Product({
      image,
      name,
      description,
      price,
      mrp,
      collection,
      isBestseller: isBestseller || false,
      discount: calculatedDiscount,
      rating: rating || 4.5,
      reviewsCount: reviewsCount || 0
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Error creating product:', err.message);
    res.status(400).json({ message: err.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ error: err.message });
  }
});
// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/// GET /api/products/name/:name
router.get('/api/products/name/:name', async (req, res) => {
  const productName = req.params.name;
  try {
    const product = await Product.findOne({ name: productName });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
