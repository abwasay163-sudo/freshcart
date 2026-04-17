// ── Product Card Component ──

const ProductCard = {
  render(product, cartQuantity = 0) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);
    card.setAttribute('data-product-id', product.id);
    card.style.animationDelay = `${Math.random() * 0.3}s`;

    const isLocalPath = product.image && (product.image.startsWith('images/') || product.image.startsWith('/images/'));
    const isUrl = (product.image && product.image.startsWith('http')) || isLocalPath;
    const imageHTML = isUrl
      ? `<img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" /><span style="display:none">🖼️</span>`
      : `<span>${product.image}</span>`;

    card.innerHTML = `
      <div class="product-card-image">
        ${imageHTML}
      </div>
      <div class="product-card-body">
        <div class="product-category-tag">${product.category}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-description">${product.description}</div>
        <div class="product-footer">
          <div class="product-price">
            <span class="amount">${Utils.formatCurrency(product.price)}</span>
            <span class="unit">/ ${product.unit}</span>
          </div>
          <div class="product-action" id="product-action-${product.id}">
            ${cartQuantity > 0 ? this.qtyControlHTML(product.id, cartQuantity) : this.addBtnHTML(product.id)}
          </div>
        </div>
      </div>
    `;

    return card;
  },

  addBtnHTML(productId) {
    return `
      <button class="add-to-cart-btn" onclick="app.addToCart(${productId})" id="add-btn-${productId}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add
      </button>
    `;
  },

  qtyControlHTML(productId, quantity) {
    return `
      <div class="qty-control">
        <button class="qty-btn" onclick="app.updateCartFromCard(${productId}, ${quantity - 1})">−</button>
        <span class="qty-value">${quantity}</span>
        <button class="qty-btn" onclick="app.updateCartFromCard(${productId}, ${quantity + 1})">+</button>
      </div>
    `;
  },

  updateAction(productId, quantity) {
    const actionEl = document.getElementById(`product-action-${productId}`);
    if (!actionEl) return;
    actionEl.innerHTML = quantity > 0
      ? this.qtyControlHTML(productId, quantity)
      : this.addBtnHTML(productId);
  }
};
