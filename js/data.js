// Giriraj Jewellery — Product Catalog
// Single source of truth for all products

const products = [
  // CHOKERS
  {
    id: "royal-choker",
    name: "The Royal Choker",
    category: "chokers",
    subcategory: "chokers",
    priceRange: "₹2L - ₹4L",
    shortDesc: "Heritage & Classic",
    description: "A regal choker crafted with exceptional diamonds, designed for the modern queen who honors tradition.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
    specs: { stone: "Diamond", metal: "18k Gold", weight: "2.5ct total", cert: "BIS Hallmarked" },
    featured: false,
    collectionId: ""
  },
  {
    id: "pearl-choker",
    name: "The Pearl Choker",
    category: "chokers",
    subcategory: "chokers",
    priceRange: "₹1.5L - ₹3L",
    shortDesc: "Heritage & Classic",
    description: "Timeless pearls woven with delicate gold, creating a piece that bridges generations.",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800",
    specs: { stone: "South Sea Pearl", metal: "22k Gold", weight: "35ct total", cert: "BIS Hallmarked" },
    featured: false,
    collectionId: ""
  },
  {
    id: "diamond-collar",
    name: "The Diamond Collar",
    category: "chokers",
    subcategory: "chokers",
    priceRange: "₹5L - ₹8L",
    shortDesc: "High Jewelry • 3ct",
    description: "A bold statement piece featuring 3 carats of carefully selected diamonds in a contemporary collar design.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800",
    specs: { stone: "Diamond", metal: "Platinum", weight: "3ct total", cert: "GIA Certified" },
    featured: false,
    collectionId: ""
  },

  // NECKLACES
  {
    id: "maharani-viraasat",
    name: "The Maharani Viraasat",
    category: "necklaces",
    subcategory: "necklaces",
    priceRange: "₹15L - ₹25L",
    shortDesc: "Masterpiece • Rubies",
    description: "A profound exploration of deep reds and structural platinum, echoing the intensity of a blood moon.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
    specs: { stone: "Burmese Rubies", metal: "Platinum", weight: "45ct total", cert: "GIA Certified" },
    featured: true,
    collectionId: ""
  },
  {
    id: "raj-tilak-emerald",
    name: "The Raj Tilak Emerald",
    category: "necklaces",
    subcategory: "necklaces",
    priceRange: "₹12L - ₹20L",
    shortDesc: "Masterpiece • Emerald",
    description: "Regal emeralds set in 18k gold, inspired by the grandeur of Indian royalty.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
    specs: { stone: "Zambian Emerald", metal: "18k Gold", weight: "38ct total", cert: "GIA Certified" },
    featured: true,
    collectionId: ""
  },
  {
    id: "solitaire-strand",
    name: "The Solitaire Strand",
    category: "necklaces",
    subcategory: "necklaces",
    priceRange: "₹8L - ₹15L",
    shortDesc: "Classic • Diamonds",
    description: "A stunning strand of solitaire diamonds, each individually set for maximum brilliance.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
    specs: { stone: "Diamond", metal: "18k White Gold", weight: "8ct total", cert: "GIA Certified" },
    featured: false,
    collectionId: ""
  },

  // CHANDELIERS
  {
    id: "celestial-chandelier",
    name: "The Celestial Chandelier",
    category: "chandeliers",
    subcategory: "earrings",
    priceRange: "₹3L - ₹6L",
    shortDesc: "Statement • 5ct",
    description: "Dramatic chandelier earrings that cascade with 5 carats of brilliant diamonds.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800",
    specs: { stone: "Diamond", metal: "Platinum", weight: "5ct total", cert: "GIA Certified" },
    featured: false,
    collectionId: ""
  },
  {
    id: "royal-drops",
    name: "The Royal Drops",
    category: "chandeliers",
    subcategory: "earrings",
    priceRange: "₹2.5L - ₹5L",
    shortDesc: "Statement • Ruby",
    description: "Elegant drop earrings featuring vivid rubies surrounded by a halo of diamonds.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
    specs: { stone: "Ruby + Diamond", metal: "18k Gold", weight: "4ct total", cert: "GIA Certified" },
    featured: false,
    collectionId: ""
  },
  {
    id: "emerald-cascade",
    name: "The Emerald Cascade",
    category: "chandeliers",
    subcategory: "earrings",
    priceRange: "₹4L - ₹7L",
    shortDesc: "Statement • Emerald",
    description: "Cascading emeralds create a waterfall of green, framed by delicate diamond settings.",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800",
    specs: { stone: "Emerald + Diamond", metal: "Platinum", weight: "6ct total", cert: "GIA Certified" },
    featured: false,
    collectionId: ""
  },

  // BRACELETS
  {
    id: "eternal-cascade",
    name: "The Eternal Cascade",
    category: "bracelets",
    subcategory: "bracelets",
    priceRange: "₹5L - ₹8L",
    shortDesc: "High Jewelry • 5ct",
    description: "A breathtaking bracelet featuring a cascade of 5 carats of diamonds in a flowing design.",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800",
    specs: { stone: "Diamond", metal: "Platinum", weight: "5ct total", cert: "GIA Certified" },
    featured: true,
    collectionId: ""
  },
  {
    id: "diamond-tennis",
    name: "The Diamond Tennis",
    category: "bracelets",
    subcategory: "bracelets",
    priceRange: "₹3L - ₹5L",
    shortDesc: "Classic • 3ct",
    description: "The timeless tennis bracelet reimagined with 3 carats of perfectly matched diamonds.",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800",
    specs: { stone: "Diamond", metal: "18k White Gold", weight: "3ct total", cert: "GIA Certified" },
    featured: false,
    collectionId: ""
  },
  {
    id: "vintage-bangle",
    name: "The Vintage Bangle",
    category: "bracelets",
    subcategory: "bracelets",
    priceRange: "₹2L - ₹4L",
    shortDesc: "Heritage • Gold",
    description: "A vintage-inspired bangle with intricate gold work and subtle diamond accents.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800",
    specs: { stone: "Diamond Accent", metal: "22k Gold", weight: "28g", cert: "BIS Hallmarked" },
    featured: false,
    collectionId: ""
  },

  // BANGLES
  {
    id: "raj-bangles",
    name: "The Raj Bangles",
    category: "bangles",
    subcategory: "bangles",
    priceRange: "₹4L - ₹7L",
    shortDesc: "Bridal • Gold",
    description: "A pair of ornate bangles inspired by royal Indian craftsmanship, perfect for bridal occasions.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
    specs: { stone: "Ruby + Diamond", metal: "22k Gold", weight: "65g pair", cert: "BIS Hallmarked" },
    featured: false,
    collectionId: ""
  },
  {
    id: "kangan-set",
    name: "The Kangan Set",
    category: "bangles",
    subcategory: "bangles",
    priceRange: "₹6L - ₹10L",
    shortDesc: "Bridal • Diamond",
    description: "An exquisite set of diamond kangan bangles, each handcrafted with meticulous attention to detail.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
    specs: { stone: "Diamond", metal: "18k Gold", weight: "4.5ct total", cert: "GIA Certified" },
    featured: true,
    collectionId: ""
  },
  {
    id: "bridal-chooda",
    name: "The Bridal Chooda",
    category: "bangles",
    subcategory: "bangles",
    priceRange: "₹2L - ₹4L",
    shortDesc: "Bridal • Gold",
    description: "Traditional bridal chooda bangles reimagined with modern elegance and diamond embellishments.",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800",
    specs: { stone: "Diamond + Enamel", metal: "22k Gold", weight: "55g set", cert: "BIS Hallmarked" },
    featured: false,
    collectionId: ""
  },

  // RINGS
  {
    id: "celestial-solitaire",
    name: "The Celestial Solitaire",
    category: "rings",
    subcategory: "rings",
    priceRange: "₹3L - ₹6L",
    shortDesc: "Solitaire • 2.5ct",
    description: "A magnificent 2.5 carat solitaire set in platinum, designed to capture light from every angle.",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800",
    specs: { stone: "Diamond 2.5ct", metal: "Platinum", weight: "2.5ct", cert: "GIA Certified" },
    featured: true,
    collectionId: ""
  },
  {
    id: "halo-ring",
    name: "The Halo Ring",
    category: "rings",
    subcategory: "rings",
    priceRange: "₹1.5L - ₹3L",
    shortDesc: "Fashion • 1.5ct",
    description: "A delicate halo ring with a 1.5 carat center stone surrounded by a ring of brilliant diamonds.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800",
    specs: { stone: "Diamond 1.5ct", metal: "18k White Gold", weight: "1.5ct + 0.5ct halo", cert: "GIA Certified" },
    featured: false,
    collectionId: ""
  },
  {
    id: "three-stone-ring",
    name: "The Three-Stone Ring",
    category: "rings",
    subcategory: "rings",
    priceRange: "₹4L - ₹8L",
    shortDesc: "Statement • 3ct",
    description: "A powerful three-stone design representing past, present, and future — 3 carats of pure brilliance.",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800",
    specs: { stone: "Diamond 3ct total", metal: "Platinum", weight: "3ct total", cert: "GIA Certified" },
    featured: false,
    collectionId: ""
  },

  // STUDS
  {
    id: "stardust-studs",
    name: "The Stardust Studs",
    category: "studs",
    subcategory: "earrings",
    priceRange: "₹1L - ₹2.5L",
    shortDesc: "Daily Wear • 1.8ct",
    description: "Everyday elegance with 1.8 carats of brilliant diamond studs, perfect for any occasion.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800",
    specs: { stone: "Diamond", metal: "18k White Gold", weight: "1.8ct pair", cert: "GIA Certified" },
    featured: false,
    collectionId: ""
  },
  {
    id: "princess-studs",
    name: "The Princess Studs",
    category: "studs",
    subcategory: "earrings",
    priceRange: "₹80K - ₹1.5L",
    shortDesc: "Daily Wear • 1ct",
    description: "Classic princess-cut diamond studs that pair effortlessly with any look.",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800",
    specs: { stone: "Diamond (Princess Cut)", metal: "18k White Gold", weight: "1ct pair", cert: "GIA Certified" },
    featured: false,
    collectionId: ""
  },
  {
    id: "diamond-drops",
    name: "The Diamond Drops",
    category: "studs",
    subcategory: "earrings",
    priceRange: "₹1.5L - ₹3L",
    shortDesc: "Fashion • 2ct",
    description: "Elegant drop studs with 2 carats of diamonds, designed for the woman who appreciates understated luxury.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
    specs: { stone: "Diamond", metal: "Platinum", weight: "2ct pair", cert: "GIA Certified" },
    featured: false,
    collectionId: ""
  }
];

// Helper functions
function getProductById(id) {
  return products.find(p => p.id === id);
}

function getProductsByCategory(category) {
  if (category === "all") return products;
  return products.filter(p => p.category === category);
}

function getProductsBySubcategory(subcategory) {
  return products.filter(p => p.subcategory === subcategory);
}

function getFeaturedProducts() {
  return products.filter(p => p.featured);
}

function getRelatedProducts(productId, limit = 4) {
  const product = getProductById(productId);
  if (!product) return [];
  return products
    .filter(p => p.id !== productId && p.category === product.category)
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
}

function getAllCategories() {
  const categories = [...new Set(products.map(p => p.category))];
  return categories.map(cat => ({
    id: cat,
    name: cat.charAt(0).toUpperCase() + cat.slice(1),
    count: products.filter(p => p.category === cat).length
  }));
}
