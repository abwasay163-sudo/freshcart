// ── Cart Sidebar Component ──

const CartComponent = {
  render(cart) {
    const itemsEl = document.getElementById('cart-items');
    const emptyEl = document.getElementById('cart-empty');
    const footerEl = document.getElementById('cart-footer');
    const badgeEl = document.getElementById('cart-badge');
    const subtotalEl = document.getElementById('cart-subtotal');
    const deliveryEl = document.getElementById('cart-delivery');
    const totalEl = document.getElementById('cart-total');
    const freeMsgEl = document.getElementById('cart-free-msg');

    // Update badge
    if (cart.itemCount > 0) {
      badgeEl.textContent = cart.itemCount;
      badgeEl.classList.remove('hidden');
    } else {
      badgeEl.classList.add('hidden');
    }

    // Show/hide empty state
    if (cart.items.length === 0) {
      itemsEl.style.display = 'none';
      emptyEl.style.display = 'flex';
      footerEl.style.display = 'none';
      return;
    }

    emptyEl.style.display = 'none';
    itemsEl.style.display = 'block';
    footerEl.style.display = 'block';

    // Render items
    itemsEl.innerHTML = cart.items.map(item => {
      const isLocalPath = item.image && (item.image.startsWith('images/') || item.image.startsWith('/images/'));
      const isUrl = (item.image && item.image.startsWith('http')) || isLocalPath;
      const imageHTML = isUrl
        ? `<img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: contain;" />`
        : item.image;

      return `
        <div class="cart-item" data-product-id="${item.productId}">
          <div class="cart-item-image">${imageHTML}</div>
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${Utils.formatCurrency(item.price)} / ${item.unit}</div>
          </div>
          <div class="cart-item-actions">
            <div class="cart-item-qty">
              <button onclick="app.updateCart(${item.productId}, ${item.quantity - 1})">−</button>
              <span>${item.quantity}</span>
              <button onclick="app.updateCart(${item.productId}, ${item.quantity + 1})">+</button>
            </div>
            <div class="cart-item-total">${Utils.formatCurrency(item.price * item.quantity)}</div>
            <button class="cart-item-remove" onclick="app.removeFromCart(${item.productId})" title="Remove">✕</button>
          </div>
        </div>
      `;
    }).join('');

    // Update totals
    subtotalEl.textContent = Utils.formatCurrency(cart.subtotal);
    deliveryEl.textContent = cart.deliveryFee === 0 ? 'FREE' : Utils.formatCurrency(cart.deliveryFee);
    deliveryEl.style.color = cart.deliveryFee === 0 ? 'var(--primary-600)' : '';
    deliveryEl.style.fontWeight = cart.deliveryFee === 0 ? '700' : '';
    totalEl.textContent = Utils.formatCurrency(cart.total);
    freeMsgEl.style.display = cart.deliveryFee === 0 ? 'flex' : 'none';

    // Update product cards' qty controls
    cart.items.forEach(item => {
      ProductCard.updateAction(item.productId, item.quantity);
    });
  },

  bumpBadge() {
    const badge = document.getElementById('cart-badge');
    Utils.animateElement(badge, 'bump');
  }
};
