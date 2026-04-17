const ProductModel = require('./product');

// In-memory cart store (single user for demo)
let cartItems = [];

const CartModel = {
  getCart() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return {
      items: cartItems,
      subtotal: Math.round(subtotal * 100) / 100,
      itemCount,
      deliveryFee: subtotal > 35 ? 0 : 4.99,
      total: Math.round((subtotal + (subtotal > 35 ? 0 : 4.99)) * 100) / 100
    };
  },

  addItem(productId, quantity = 1) {
    const product = ProductModel.getById(productId);
    if (!product) return { error: 'Product not found' };
    if (!product.inStock) return { error: 'Product is out of stock' };

    const existing = cartItems.find(item => item.productId === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cartItems.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        unit: product.unit,
        quantity
      });
    }

    return this.getCart();
  },

  updateQuantity(productId, quantity) {
    const index = cartItems.findIndex(item => item.productId === parseInt(productId));
    if (index === -1) return { error: 'Item not in cart' };

    if (quantity <= 0) {
      cartItems.splice(index, 1);
    } else {
      cartItems[index].quantity = quantity;
    }

    return this.getCart();
  },

  removeItem(productId) {
    const index = cartItems.findIndex(item => item.productId === parseInt(productId));
    if (index === -1) return { error: 'Item not in cart' };
    cartItems.splice(index, 1);
    return this.getCart();
  },

  clear() {
    cartItems = [];
    return this.getCart();
  },

  getItems() {
    return [...cartItems];
  }
};

module.exports = CartModel;
