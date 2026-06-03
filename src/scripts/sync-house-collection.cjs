const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const ENTRIES_DIR = path.resolve(__dirname, "../data/house-collection-entries");
const OUTPUT = path.resolve(__dirname, "../data/house-collection.js");
const SPECS_PATH = path.resolve(__dirname, "../data/house-collection-specs.json");

function extractFilenames(images) {
  if (!images || !Array.isArray(images)) return [];
  return images.map((item) => {
    const src = typeof item === "string" ? item : item.image;
    if (!src) return null;
    return path.basename(src.replace(/\\/g, "/"));
  }).filter(Boolean);
}

function build() {
  // Load specs if available
  let specsMap = {};
  if (fs.existsSync(SPECS_PATH)) {
    try { specsMap = JSON.parse(fs.readFileSync(SPECS_PATH, "utf-8")); } catch {}
    console.log(`Loaded specs for ${Object.keys(specsMap).length} products`);
  }

  const files = fs.readdirSync(ENTRIES_DIR).filter((f) => f.endsWith(".md"));
  const pieces = files.map((file) => {
    const raw = fs.readFileSync(path.join(ENTRIES_DIR, file), "utf-8");
    const { data } = matter(raw);

    const collection = data.collection || "";
    const type = data.type || "necklace";
    const status = data.status || "active";
    const isHero = data.isHero ?? false;

    // Convention-based images: if no explicit images, use the standard 3-image pipeline
    const explicitImages = extractFilenames(data.images);
    const images = explicitImages.length > 0
      ? explicitImages.map(f => `/assets/images/products/${collection}/${data.id}/${f}`)
      : [
          `/assets/images/products/${collection}/${data.id}/hero.jpg`,
          `/assets/images/products/${collection}/${data.id}/model.jpg`,
          `/assets/images/products/${collection}/${data.id}/atmosphere.jpg`,
        ];

    return {
      id: data.id,
      slug: data.id,
      title: data.title,
      ref: data.ref,
      category: data.category,
      description: data.description,
      hero: data.hero,
      images,
      onHomepage: data.onHomepage ?? true,
      row: data.onHomepage ? (data.row != null ? data.row : null) : undefined,
      homepageOrder: data.onHomepage ? (data.homepageOrder != null ? data.homepageOrder : 1) : undefined,
      isHero,
      trailer: data.trailer || null,
      mood: data.mood || null,
      emotion: data.emotion || null,
      form: data.form || null,
      collection,
      type,
      status,
      specs: specsMap[data.id] || null,
    };
  });

  const activePieces = pieces.filter(p => p.status !== "archived");

  activePieces.sort((a, b) => {
    if (a.onHomepage !== b.onHomepage) return a.onHomepage ? -1 : 1;
    const rowDiff = (a.row || 0) - (b.row || 0);
    if (rowDiff !== 0) return rowDiff;
    return (a.homepageOrder || 1) - (b.homepageOrder || 1);
  });

  const code = `const houseCollection = ${JSON.stringify(activePieces, null, 2)};\n\nexport default houseCollection;\n`;
  fs.writeFileSync(OUTPUT, code, "utf-8");
  console.log(`Generated ${OUTPUT} — ${activePieces.length} active pieces (${pieces.length - activePieces.length} archived)`);
}

build();
