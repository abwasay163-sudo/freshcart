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
const apiRouter = express.Router();
apiRouter.use('/products', require('./routes/products'));
apiRouter.use('/categories', (req, res) => {
  const ProductModel = require('./models/product');
  const categories = ProductModel.getCategories();
  res.json({ success: true, data: categories });
});
apiRouter.use('/cart', require('./routes/cart'));
apiRouter.use('/orders', require('./routes/orders'));

// Mount the router
app.use('/api', apiRouter);
app.use('/.netlify/functions/api', apiRouter);

// Static files and SPA fallback (only for local development)
if (!process.env.NETLIFY) {
  // Serve static files from public directory
  app.use(express.static(path.join(__dirname, 'public')));

  // SPA fallback - serve index.html for all non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

// Start server if not running in a serverless environment
if (process.env.NODE_ENV !== 'production' && !process.env.NETLIFY) {
  app.listen(PORT, () => {
    console.log(`
    🛒 ═══════════════════════════════════════════
       FreshCart Grocery App is running!
       
       Local:   http://localhost:${PORT}
       API:     http://localhost:${PORT}/api/products
    ═══════════════════════════════════════════════
    `);
  });
}

module.exports = app;
