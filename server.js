const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', (req, res) => {
  const ProductModel = require('./models/product');
  const categories = ProductModel.getCategories();
  res.json({ success: true, data: categories });
});
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`
  🛒 ═══════════════════════════════════════════
     FreshCart Grocery App is running!
     
     Local:   http://localhost:${PORT}
     API:     http://localhost:${PORT}/api/products
  ═══════════════════════════════════════════════
  `);
});
