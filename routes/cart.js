const express = require('express');
const router = express.Router();
const CartModel = require('../models/cart');

// GET /api/cart - Get current cart
router.get('/', (req, res) => {
  const cart = CartModel.getCart();
  res.json({ success: true, data: cart });
});

// POST /api/cart - Add item to cart
router.post('/', (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId) {
    return res.status(400).json({ success: false, error: 'productId is required' });
  }
  const result = CartModel.addItem(parseInt(productId), parseInt(quantity) || 1);
  if (result.error) {
    return res.status(400).json({ success: false, error: result.error });
  }
  res.json({ success: true, data: result });
});

// PUT /api/cart/:productId - Update item quantity
router.put('/:productId', (req, res) => {
  const { quantity } = req.body;
  if (quantity === undefined) {
    return res.status(400).json({ success: false, error: 'quantity is required' });
  }
  const result = CartModel.updateQuantity(req.params.productId, parseInt(quantity));
  if (result.error) {
    return res.status(404).json({ success: false, error: result.error });
  }
  res.json({ success: true, data: result });
});

// DELETE /api/cart/:productId - Remove item from cart
router.delete('/:productId', (req, res) => {
  const result = CartModel.removeItem(req.params.productId);
  if (result.error) {
    return res.status(404).json({ success: false, error: result.error });
  }
  res.json({ success: true, data: result });
});

// DELETE /api/cart - Clear entire cart
router.delete('/', (req, res) => {
  const result = CartModel.clear();
  res.json({ success: true, data: result });
});

module.exports = router;
