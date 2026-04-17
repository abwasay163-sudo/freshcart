// ── Checkout & Order Confirmation Components ──

const CheckoutComponent = {
  render(cart) {
    const page = document.getElementById('checkout-page');
    page.innerHTML = `
      <div class="back-link" onclick="app.navigate('home')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Shopping
      </div>
      <h1 style="font-family:var(--font-heading);font-size:2rem;font-weight:700;margin-bottom:var(--space-xl);">Checkout</h1>
      <div class="checkout-grid">
        <div class="checkout-form-card">
          <div class="checkout-card-header">
            <h2>📦 Delivery Information</h2>
          </div>
          <div class="checkout-card-body">
            <div class="form-row">
              <div class="form-group">
                <label>Full Name <span class="required">*</span></label>
                <input type="text" class="form-input" id="checkout-name" placeholder="John Doe" required>
              </div>
              <div class="form-group">
                <label>Phone <span class="required">*</span></label>
                <input type="tel" class="form-input" id="checkout-phone" placeholder="(555) 123-4567" required>
              </div>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-input" id="checkout-email" placeholder="john@example.com">
            </div>
            <div class="form-group">
              <label>Delivery Address <span class="required">*</span></label>
              <textarea class="form-input" id="checkout-address" placeholder="123 Main St, Apt 4B&#10;New York, NY 10001" required></textarea>
            </div>
            <div class="form-group">
              <label>Delivery Notes</label>
              <input type="text" class="form-input" id="checkout-notes" placeholder="Leave at door, ring bell, etc.">
            </div>
          </div>
        </div>
        <div class="checkout-summary-card">
          <div class="checkout-card-header">
            <h2>🧾 Order Summary</h2>
          </div>
          <div class="checkout-card-body">
            <div class="checkout-items">
              ${cart.items.map(item => `
                <div class="checkout-item">
                  <div class="checkout-item-left">
                    <span class="checkout-item-emoji">${item.image}</span>
                    <span>${item.name}</span>
                    <span class="checkout-item-qty">×${item.quantity}</span>
                  </div>
                  <span class="checkout-item-price">${Utils.formatCurrency(item.price * item.quantity)}</span>
                </div>
              `).join('')}
            </div>
            <div class="checkout-divider"></div>
            <div class="cart-row">
              <span>Subtotal</span>
              <span>${Utils.formatCurrency(cart.subtotal)}</span>
            </div>
            <div class="cart-row">
              <span>Delivery</span>
              <span style="color:${cart.deliveryFee === 0 ? 'var(--primary-600)' : ''};font-weight:${cart.deliveryFee === 0 ? '700' : ''}">${cart.deliveryFee === 0 ? 'FREE' : Utils.formatCurrency(cart.deliveryFee)}</span>
            </div>
            ${cart.deliveryFee === 0 ? '<div class="cart-row cart-free-delivery"><span>🎉 Free delivery applied!</span></div>' : ''}
            <div class="cart-row cart-total">
              <span>Total</span>
              <span>${Utils.formatCurrency(cart.total)}</span>
            </div>
            <div style="margin-top:var(--space-lg)">
              <button class="place-order-btn" id="place-order-btn" onclick="app.placeOrder()">
                🛒 Place Order — ${Utils.formatCurrency(cart.total)}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

const ConfirmationComponent = {
  render(order) {
    const page = document.getElementById('confirmation-page');
    page.innerHTML = `
      <div class="confirmation-card">
        <div class="confirmation-icon">✅</div>
        <h1>Order Placed!</h1>
        <p class="order-number">Order <span>#${order.id}</span></p>
        <div class="confirmation-details">
          <h3>Order Details</h3>
          ${order.items.map(item => `
            <div class="confirmation-item">
              <span>${item.image} ${item.name} × ${item.quantity}</span>
              <span>${Utils.formatCurrency(item.price * item.quantity)}</span>
            </div>
          `).join('')}
          <div class="confirmation-total-row">
            <span>Total</span>
            <span>${Utils.formatCurrency(order.total)}</span>
          </div>
        </div>
        <p style="color:var(--gray-500);font-size:0.9rem;margin-bottom:var(--space-xl)">
          Delivering to <strong>${order.customerInfo.name}</strong><br>
          ${order.customerInfo.address}
        </p>
        <button class="continue-shopping-btn" onclick="app.navigate('home')">
          Continue Shopping
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    `;
  }
};
