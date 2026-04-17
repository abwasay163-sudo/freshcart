const express = require('express');
const router = express.Router();
const ProductModel = require('../models/product');

// GET /api/products - List all products (with optional filters)
router.get('/', (req, res) => {
  const { category, search, inStock } = req.query;
  const products = ProductModel.getAll({ category, search, inStock });
  res.json({ success: true, data: products, count: products.length });
});

// GET /api/categories - List all categories
router.get('/categories', (req, res) => {
  const categories = ProductModel.getCategories();
  res.json({ success: true, data: categories });
});

// GET /api/products/:id - Get single product
router.get('/:id', (req, res) => {
  const product = ProductModel.getById(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

module.exports = router;
