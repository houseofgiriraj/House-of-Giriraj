const fs = require("fs");
const path = require("path");

const CSV_PATH = path.join(__dirname, "..", "product-inventory.csv");
const OUTPUT_PATH = path.join(__dirname, "..", "src", "data.js");

function parseCSV(csv) {
  const lines = csv.trim().split("\n");
  const headers = lines[0].split(",").map(h => h.trim());

  const result = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = [];
    let current = "";
    let insideQuotes = false;

    for (const ch of lines[i]) {
      if (ch === '"') { insideQuotes = !insideQuotes; continue; }
      if (ch === "," && !insideQuotes) { values.push(current.trim()); current = ""; continue; }
      current += ch;
    }
    values.push(current.trim());

    const obj = {};
    headers.forEach((h, idx) => { obj[h] = values[idx] || ""; });
    result.push(obj);
  }
  return result;
}

function toPascalCase(str) {
  return str.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

const rows = parseCSV(fs.readFileSync(CSV_PATH, "utf-8"));

const products = rows.map(r => ({
  id: r.id,
  name: r.name,
  category: r.category,
  subcategory: r.subcategory,
  priceRange: r.priceRange,
  shortDesc: r.shortDesc,
  description: r.description,
  image: `/assets/images/${r.imagePath}`,
  specs: {
    stone: r.stone,
    metal: r.metal,
    weight: r.weight,
    cert: r.cert
  },
  featured: r.featured === "TRUE"
})).sort((a, b) => {
  const catOrder = ["chokers", "necklaces", "chandeliers", "bracelets", "bangles", "rings", "studs"];
  const ci = catOrder.indexOf(a.category) - catOrder.indexOf(b.category);
  if (ci !== 0) return ci;
  return a.id.localeCompare(b.id);
});

const code = `// Auto-generated from product-inventory.csv — do not edit directly
// Run: node scripts/sync-products.cjs

export const products = ${JSON.stringify(products, null, 2)};

export function getProductById(id) {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category) {
  if (category === "all") return products;
  return products.filter(p => p.category === category);
}

export function getProductsBySubcategory(subcategory) {
  return products.filter(p => p.subcategory === subcategory);
}

export function getFeaturedProducts() {
  return products.filter(p => p.featured);
}

export function getRelatedProducts(productId, limit = 4) {
  const product = getProductById(productId);
  if (!product) return [];
  return products
    .filter(p => p.id !== productId && p.category === product.category)
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
}

export function getAllCategories() {
  const categories = [...new Set(products.map(p => p.category))];
  return categories.map(cat => ({
    id: cat,
    name: cat.charAt(0).toUpperCase() + cat.slice(1),
    count: products.filter(p => p.category === cat).length
  }));
}
`;

fs.writeFileSync(OUTPUT_PATH, code, "utf-8");
console.log(`✓ Generated ${OUTPUT_PATH} (${products.length} products from CSV)`);
