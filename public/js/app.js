// ── Main Application Controller ──

const app = {
  state: {
    currentView: 'home',
    products: [],
    categories: [],
    cart: null,
    activeCategory: null,
    searchQuery: '',
    isLoading: false
  },

  async init() {
    console.log('🛒 FreshCart initializing...');
    
    // Initial fetch
    await this.fetchInitialData();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Initial render
    this.render();
  },

  async fetchInitialData() {
    this.state.isLoading = true;
    try {
      const [productsRes, categoriesRes, cartRes] = await Promise.all([
        API.products.getAll(),
        API.products.getCategories(),
        API.cart.get()
      ]);

      this.state.products = productsRes.data;
      this.state.categories = categoriesRes.data;
      this.state.cart = cartRes.data;
    } catch (err) {
      console.error('Failed to fetch initial data:', err);
      Utils.showToast('Failed to load store data', '❌');
    } finally {
      this.state.isLoading = false;
    }
  },

  setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('search-input');
    const searchClear = document.getElementById('search-clear');

    searchInput.addEventListener('input', Utils.debounce(async (e) => {
      this.state.searchQuery = e.target.value.trim();
      searchClear.style.display = this.state.searchQuery ? 'flex' : 'none';
      await this.filterProducts();
    }, 300));

    searchClear.addEventListener('click', async () => {
      searchInput.value = '';
      this.state.searchQuery = '';
      searchClear.style.display = 'none';
      await this.filterProducts();
    });

    // Handle back/forward buttons
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.view) {
        this.navigate(e.state.view, false);
      }
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
      const header = document.getElementById('main-header');
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  },

  async filterProducts() {
    this.state.isLoading = true;
    try {
      const params = {};
      if (this.state.activeCategory) params.category = this.state.activeCategory;
      if (this.state.searchQuery) params.search = this.state.searchQuery;

      const res = await API.products.getAll(params);
      this.state.products = res.data;
      this.renderProducts();
    } catch (err) {
      console.error('Filter failed:', err);
    } finally {
      this.state.isLoading = false;
    }
  },

  async setCategory(category) {
    if (this.state.activeCategory === category) {
      this.state.activeCategory = null; // Toggle off
    } else {
      this.state.activeCategory = category;
    }
    
    this.renderCategories();
    await this.filterProducts();
    
    // Update section title
    const titleEl = document.getElementById('section-title');
    titleEl.textContent = this.state.activeCategory || 'All Products';
  },

  async addToCart(productId) {
    try {
      const res = await API.cart.add(productId);
      this.state.cart = res.data;
      
      this.renderCart();
      CartComponent.bumpBadge();
      Utils.showToast('Item added to cart', '✨');
    } catch (err) {
      Utils.showToast('Failed to add item', '❌');
    }
  },

  async updateCart(productId, quantity) {
    try {
      const res = await API.cart.update(productId, quantity);
      this.state.cart = res.data;
      this.renderCart();
    } catch (err) {
      Utils.showToast('Failed to update cart', '❌');
    }
  },

  async updateCartFromCard(productId, quantity) {
    await this.updateCart(productId, quantity);
    // Card will be updated via CartComponent.render sync
  },

  async removeFromCart(productId) {
    try {
      const res = await API.cart.remove(productId);
      this.state.cart = res.data;
      this.renderCart();
      
      // Reset card action button if removed
      ProductCard.updateAction(productId, 0);
      Utils.showToast('Item removed', '🗑️');
    } catch (err) {
      Utils.showToast('Failed to remove item', '❌');
    }
  },

  toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('visible');
    document.body.classList.toggle('cart-open');
  },

  navigate(view, pushState = true) {
    this.state.currentView = view;
    
    // Hide all main sections
    document.getElementById('hero-section').style.display = 'none';
    document.getElementById('categories-section').style.display = 'none';
    document.getElementById('products-section').style.display = 'none';
    document.getElementById('checkout-page').style.display = 'none';
    document.getElementById('confirmation-page').style.display = 'none';

    // Show selected view
    if (view === 'home') {
      document.getElementById('hero-section').style.display = 'flex';
      document.getElementById('categories-section').style.display = 'block';
      document.getElementById('products-section').style.display = 'block';
      this.renderProducts();
    } else if (view === 'checkout') {
      document.getElementById('checkout-page').style.display = 'block';
      CheckoutComponent.render(this.state.cart);
      window.scrollTo(0, 0);
    }

    if (pushState) {
      window.history.pushState({ view }, '', view === 'home' ? '/' : `/${view}`);
    }

    // Close cart if navigating
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar.classList.contains('open')) this.toggleCart();
  },

  async placeOrder() {
    const name = document.getElementById('checkout-name').value;
    const phone = document.getElementById('checkout-phone').value;
    const address = document.getElementById('checkout-address').value;
    const email = document.getElementById('checkout-email').value;
    const notes = document.getElementById('checkout-notes').value;

    if (!name || !phone || !address) {
      Utils.showToast('Please fill required fields', '⚠️');
      return;
    }

    const btn = document.getElementById('place-order-btn');
    btn.disabled = true;
    btn.textContent = 'Processing...';

    try {
      const res = await API.orders.place({ name, phone, address, email, notes });
      if (res.success) {
        // Clear local cart state
        this.state.cart = { items: [], subtotal: 0, itemCount: 0, deliveryFee: 4.99, total: 4.99 };
        this.renderCart();
        
        // Show confirmation
        this.state.currentView = 'confirmation';
        document.getElementById('checkout-page').style.display = 'none';
        document.getElementById('confirmation-page').style.display = 'block';
        ConfirmationComponent.render(res.data);
        window.scrollTo(0, 0);
        
        Utils.showToast('Order placed successfully!', '🎉');
      } else {
        Utils.showToast(res.error || 'Failed to place order', '❌');
      }
    } catch (err) {
      Utils.showToast('Network error, try again', '❌');
    } finally {
      btn.disabled = false;
      btn.textContent = `Place Order — ${Utils.formatCurrency(this.state.cart.total)}`;
    }
  },

  render() {
    this.renderCategories();
    this.renderProducts();
    this.renderCart();
  },

  renderCategories() {
    const container = document.getElementById('categories-container');
    container.innerHTML = `
      <div class="category-pill ${!this.state.activeCategory ? 'active' : ''}" onclick="app.setCategory(null)">
        All Products
      </div>
    ` + this.state.categories.map(cat => {
      const isImage = cat.emoji && (cat.emoji.startsWith('http') || cat.emoji.startsWith('images/') || cat.emoji.startsWith('/images/'));
      const emojiHTML = isImage 
        ? `<img src="${cat.emoji}" class="cat-icon-img" style="width: 18px; height: 18px; object-fit: contain; margin-right: 6px; vertical-align: middle;" />`
        : `<span class="cat-emoji">${cat.emoji}</span>`;
        
      return `
        <div class="category-pill ${this.state.activeCategory === cat.name ? 'active' : ''}" onclick="app.setCategory('${cat.name}')">
          ${emojiHTML}
          ${cat.name}
          <span class="cat-count">${cat.count}</span>
        </div>
      `;
    }).join('');
  },

  renderProducts() {
    const grid = document.getElementById('products-grid');
    const empty = document.getElementById('empty-state');
    const count = document.getElementById('product-count');

    if (this.state.products.length === 0) {
      grid.style.display = 'none';
      empty.style.display = 'block';
      count.textContent = '0 items';
      return;
    }

    grid.style.display = 'grid';
    empty.style.display = 'none';
    count.textContent = `${this.state.products.length} items`;

    grid.innerHTML = '';
    this.state.products.forEach(product => {
      const cartItem = this.state.cart.items.find(item => item.productId === product.id);
      grid.appendChild(ProductCard.render(product, cartItem ? cartItem.quantity : 0));
    });
  },

  renderCart() {
    CartComponent.render(this.state.cart);
  }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => app.init());
