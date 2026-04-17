const CartModel = require('./cart');

// In-memory orders store
let orders = [];
let nextOrderId = 1001;

const OrderModel = {
  createOrder(customerInfo) {
    const cart = CartModel.getCart();
    
    if (cart.items.length === 0) {
      return { error: 'Cart is empty' };
    }

    if (!customerInfo || !customerInfo.name || !customerInfo.address || !customerInfo.phone) {
      return { error: 'Missing required customer information (name, address, phone)' };
    }

    const order = {
      id: nextOrderId++,
      items: [...cart.items],
      subtotal: cart.subtotal,
      deliveryFee: cart.deliveryFee,
      total: cart.total,
      customerInfo: {
        name: customerInfo.name,
        email: customerInfo.email || '',
        phone: customerInfo.phone,
        address: customerInfo.address,
        notes: customerInfo.notes || ''
      },
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    orders.push(order);
    CartModel.clear();

    return order;
  },

  getAll() {
    return [...orders].reverse();
  },

  getById(id) {
    return orders.find(o => o.id === parseInt(id)) || null;
  }
};

module.exports = OrderModel;
