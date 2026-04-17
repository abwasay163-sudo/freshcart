// ── API Client ──

const API = {
  BASE: '/api',

  async get(endpoint) {
    const res = await fetch(this.BASE + endpoint);
    return res.json();
  },

  async post(endpoint, data) {
    const res = await fetch(this.BASE + endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async put(endpoint, data) {
    const res = await fetch(this.BASE + endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async del(endpoint) {
    const res = await fetch(this.BASE + endpoint, { method: 'DELETE' });
    return res.json();
  },

  // Product endpoints
  products: {
    getAll(params = {}) {
      const query = new URLSearchParams(params).toString();
      return API.get('/products' + (query ? '?' + query : ''));
    },
    getById(id) { return API.get(`/products/${id}`); },
    getCategories() { return API.get('/categories'); }
  },

  // Cart endpoints
  cart: {
    get() { return API.get('/cart'); },
    add(productId, quantity = 1) { return API.post('/cart', { productId, quantity }); },
    update(productId, quantity) { return API.put(`/cart/${productId}`, { quantity }); },
    remove(productId) { return API.del(`/cart/${productId}`); },
    clear() { return API.del('/cart'); }
  },

  // Order endpoints
  orders: {
    place(customerInfo) { return API.post('/orders', { customerInfo }); },
    getAll() { return API.get('/orders'); },
    getById(id) { return API.get(`/orders/${id}`); }
  }
};
