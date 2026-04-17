const seedProducts = require('../data/products');

// In-memory product store
let products = [...seedProducts];

const ProductModel = {
  getAll(query = {}) {
    let result = [...products];

    // Filter by category
    if (query.category) {
      result = result.filter(p => 
        p.category.toLowerCase() === query.category.toLowerCase()
      );
    }

    // Search by name or description
    if (query.search) {
      const search = query.search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    }

    // Only in-stock
    if (query.inStock) {
      result = result.filter(p => p.inStock);
    }

    return result;
  },

  getById(id) {
    return products.find(p => p.id === parseInt(id)) || null;
  },

  getCategories() {
    const categories = [...new Set(products.map(p => p.category))];
    return categories.map(cat => ({
      name: cat,
      count: products.filter(p => p.category === cat).length,
      emoji: products.find(p => p.category === cat).image
    }));
  }
};

module.exports = ProductModel;
