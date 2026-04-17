const products = [
  // 🍎 Fruits & Vegetables
  {
    id: 1,
    name: "Organic Bananas",
    category: "Fruits & Vegetables",
    price: 1.29,
    unit: "bunch",
    image: "🍌",
    description: "Sweet, ripe organic bananas. Perfect for smoothies and snacking.",
    inStock: true
  },
  {
    id: 2,
    name: "Fresh Strawberries",
    category: "Fruits & Vegetables",
    price: 3.99,
    unit: "lb",
    image: "🍓",
    description: "Juicy, hand-picked strawberries from local farms.",
    inStock: true
  },
  {
    id: 3,
    name: "Avocados",
    category: "Fruits & Vegetables",
    price: 1.49,
    unit: "each",
    image: "🥑",
    description: "Perfectly ripe Hass avocados. Great for guacamole and toast.",
    inStock: true
  },
  {
    id: 4,
    name: "Baby Spinach",
    category: "Fruits & Vegetables",
    price: 2.99,
    unit: "bag",
    image: "🥬",
    description: "Tender baby spinach leaves, pre-washed and ready to eat.",
    inStock: true
  },
  {
    id: 5,
    name: "Red Bell Peppers",
    category: "Fruits & Vegetables",
    price: 1.79,
    unit: "each",
    image: "images/red-bell-pepper.png",
    description: "Crisp, sweet red bell peppers. Great for salads and stir-fry.",
    inStock: true
  },
  {
    id: 6,
    name: "Fresh Blueberries",
    category: "Fruits & Vegetables",
    price: 4.49,
    unit: "pint",
    image: "images/blueberries.png",
    description: "Plump, antioxidant-rich blueberries. Perfect for breakfast.",
    inStock: true
  },
  {
    id: 7,
    name: "Fuji Apples",
    category: "Fruits & Vegetables",
    price: 2.49,
    unit: "lb",
    image: "🍎",
    description: "Crisp and sweet Fuji apples. A family favorite.",
    inStock: true
  },
  // 🥛 Dairy & Eggs
  {
    id: 8,
    name: "Whole Milk",
    category: "Dairy & Eggs",
    price: 3.49,
    unit: "gallon",
    image: "🥛",
    description: "Fresh whole milk from grass-fed cows. Rich and creamy.",
    inStock: true
  },
  {
    id: 9,
    name: "Free-Range Eggs",
    category: "Dairy & Eggs",
    price: 4.99,
    unit: "dozen",
    image: "🥚",
    description: "Farm-fresh free-range eggs. Rich golden yolks.",
    inStock: true
  },
  {
    id: 10,
    name: "Greek Yogurt",
    category: "Dairy & Eggs",
    price: 5.49,
    unit: "32oz",
    image: "🍶",
    description: "Thick, creamy Greek yogurt. High in protein.",
    inStock: true
  },
  {
    id: 11,
    name: "Cheddar Cheese",
    category: "Dairy & Eggs",
    price: 4.29,
    unit: "8oz",
    image: "🧀",
    description: "Sharp cheddar cheese block. Aged for bold flavor.",
    inStock: true
  },
  {
    id: 12,
    name: "Butter",
    category: "Dairy & Eggs",
    price: 3.99,
    unit: "lb",
    image: "🧈",
    description: "European-style unsalted butter. Perfect for baking.",
    inStock: true
  },
  // 🥖 Bakery
  {
    id: 13,
    name: "Sourdough Bread",
    category: "Bakery",
    price: 4.99,
    unit: "loaf",
    image: "🍞",
    description: "Artisan sourdough bread with a crispy crust and tangy flavor.",
    inStock: true
  },
  {
    id: 14,
    name: "Croissants",
    category: "Bakery",
    price: 5.99,
    unit: "4-pack",
    image: "🥐",
    description: "Buttery, flaky French croissants. Baked fresh daily.",
    inStock: true
  },
  {
    id: 15,
    name: "Bagels",
    category: "Bakery",
    price: 3.99,
    unit: "6-pack",
    image: "🥯",
    description: "New York style bagels. Chewy inside, crispy outside.",
    inStock: true
  },
  {
    id: 16,
    name: "Chocolate Muffins",
    category: "Bakery",
    price: 4.49,
    unit: "4-pack",
    image: "🧁",
    description: "Double chocolate muffins with rich chocolate chips.",
    inStock: true
  },
  {
    id: 17,
    name: "Baguette",
    category: "Bakery",
    price: 2.99,
    unit: "each",
    image: "🥖",
    description: "Classic French baguette with a golden, crusty exterior.",
    inStock: true
  },
  // 🥩 Meat & Seafood
  {
    id: 18,
    name: "Chicken Breast",
    category: "Meat & Seafood",
    price: 7.99,
    unit: "lb",
    image: "🍗",
    description: "Boneless, skinless chicken breast. Hormone-free.",
    inStock: true
  },
  {
    id: 19,
    name: "Atlantic Salmon",
    category: "Meat & Seafood",
    price: 12.99,
    unit: "lb",
    image: "🐟",
    description: "Fresh Atlantic salmon fillet. Rich in omega-3.",
    inStock: true
  },
  {
    id: 20,
    name: "Ground Beef",
    category: "Meat & Seafood",
    price: 6.99,
    unit: "lb",
    image: "🥩",
    description: "Lean ground beef (90/10). Perfect for burgers and meatballs.",
    inStock: true
  },
  {
    id: 21,
    name: "Jumbo Shrimp",
    category: "Meat & Seafood",
    price: 11.99,
    unit: "lb",
    image: "🦐",
    description: "Wild-caught jumbo shrimp. Peeled and deveined.",
    inStock: true
  },
  {
    id: 22,
    name: "Turkey Bacon",
    category: "Meat & Seafood",
    price: 5.49,
    unit: "12oz",
    image: "🥓",
    description: "Lean turkey bacon. A healthier breakfast option.",
    inStock: true
  },
  // 🥫 Pantry Staples
  {
    id: 23,
    name: "Extra Virgin Olive Oil",
    category: "Pantry Staples",
    price: 8.99,
    unit: "16oz",
    image: "images/olive-oil.png",
    description: "Cold-pressed extra virgin olive oil from Italy.",
    inStock: true
  },
  {
    id: 24,
    name: "Jasmine Rice",
    category: "Pantry Staples",
    price: 4.99,
    unit: "2lb",
    image: "🍚",
    description: "Fragrant long-grain jasmine rice. Light and fluffy.",
    inStock: true
  },
  {
    id: 25,
    name: "Penne Pasta",
    category: "Pantry Staples",
    price: 1.99,
    unit: "16oz",
    image: "🍝",
    description: "Premium Italian penne pasta made from durum wheat.",
    inStock: true
  },
  {
    id: 26,
    name: "Organic Honey",
    category: "Pantry Staples",
    price: 7.49,
    unit: "12oz",
    image: "🍯",
    description: "Raw, unfiltered organic wildflower honey.",
    inStock: true
  },
  {
    id: 27,
    name: "Canned Tomatoes",
    category: "Pantry Staples",
    price: 2.29,
    unit: "28oz",
    image: "🥫",
    description: "San Marzano whole peeled tomatoes. Perfect for sauces.",
    inStock: true
  },
  // 🧃 Beverages
  {
    id: 28,
    name: "Orange Juice",
    category: "Beverages",
    price: 4.99,
    unit: "64oz",
    image: "🍊",
    description: "Freshly squeezed orange juice. No added sugar.",
    inStock: true
  },
  {
    id: 29,
    name: "Green Tea",
    category: "Beverages",
    price: 3.99,
    unit: "20-pack",
    image: "🍵",
    description: "Organic Japanese green tea bags. Smooth and calming.",
    inStock: true
  },
  {
    id: 30,
    name: "Sparkling Water",
    category: "Beverages",
    price: 5.49,
    unit: "12-pack",
    image: "💧",
    description: "Naturally carbonated mineral water. Zero calories.",
    inStock: true
  },
  {
    id: 31,
    name: "Cold Brew Coffee",
    category: "Beverages",
    price: 6.99,
    unit: "32oz",
    image: "☕",
    description: "Smooth, bold cold brew coffee concentrate. Low acidity.",
    inStock: true
  },
  {
    id: 32,
    name: "Coconut Water",
    category: "Beverages",
    price: 3.49,
    unit: "16oz",
    image: "🥥",
    description: "Pure coconut water. Natural electrolytes and hydration.",
    inStock: true
  }
];

module.exports = products;
