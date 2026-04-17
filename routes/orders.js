const express = require('express');
const router = express.Router();
const OrderModel = require('../models/order');

// POST /api/orders - Place an order
router.post('/', (req, res) => {
  const { customerInfo } = req.body;
  const result = OrderModel.createOrder(customerInfo);
  if (result.error) {
    return res.status(400).json({ success: false, error: result.error });
  }
  res.status(201).json({ success: true, data: result });
});

// GET /api/orders - List all orders
router.get('/', (req, res) => {
  const orders = OrderModel.getAll();
  res.json({ success: true, data: orders });
});

// GET /api/orders/:id - Get single order
router.get('/:id', (req, res) => {
  const order = OrderModel.getById(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, error: 'Order not found' });
  }
  res.json({ success: true, data: order });
});

module.exports = router;
