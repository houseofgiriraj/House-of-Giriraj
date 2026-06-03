import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const entriesDir = join(__dirname, "..", "src", "data", "house-collection-entries");

if (!existsSync(entriesDir)) mkdirSync(entriesDir, { recursive: true });

function md(id, title, ref, description, row, order, isHero, trailer, collection, type, onHomepage, category) {
  return `---
id: ${id}
title: ${title}
ref: ${ref || ""}
category: ${category || "High Jewellery"}
description: ${description}
images: []
onHomepage: ${onHomepage !== false}
row: ${row}
homepageOrder: ${order}
${isHero ? "isHero: true" : ""}${trailer ? `\ntrailer: ${trailer}` : ""}
collection: ${collection}
type: ${type}
---
`;
}

// ===== CROWN COLLECTION (Power) =====
const crown = [
  { id: "imperial-dominion", title: "Imperial Dominion", ref: "NK-12384", desc: "Sculpted through grandeur and balance, Imperial Dominion carries the language of ceremonial power and enduring prestige." },
  { id: "royal-edict", title: "Royal Edict", ref: "NK-12383", desc: "A composition of authority and grace, Royal Edict frames brilliance through ceremonial symmetry and royal proportion." },
  { id: "throne-of-light", title: "Throne of Light", ref: "NK-1691", desc: "Created for ceremonial presence and visual authority, Throne of Light transforms ornament into legacy." },
  { id: "regalia-canopy", title: "Regalia Canopy", ref: "NK-12692", desc: "Architectural and ceremonially bold, Regalia Canopy evokes the grandeur of royal halls translated into gemstone form." },
  { id: "imperial-cascade", title: "Imperial Cascade", ref: "CH-12316", desc: "Power and architecture — an elaborate emerald diamond necklace with cascading sculptural form." },
  { id: "dynasty-bloom", title: "Dynasty Bloom", ref: "H-12695", desc: "Floral emerald — a graceful emerald floral necklace with botanical elegance and dynastic beauty." },
  { id: "maharani-veil", title: "Maharani Veil", ref: "H-12294", desc: "Maharani inspired — a layered diamond necklace with emerald centrepiece, royal and ceremonial." },
];

// ===== EMERALD COURT (Mystery) =====
const emerald = [
  { id: "emerald-reverie", title: "Emerald Reverie", ref: "NK-12503", desc: "A composition of luminous emerald drops and diamond brilliance, crafted for moments where elegance feels instinctive rather than performed." },
  { id: "verdant-halo", title: "Verdant Halo", ref: "NK-12493", desc: "An architectural emerald masterpiece shaped through symmetry and light, carrying the quiet grandeur of royal inheritance." },
  { id: "moonlit-emerald", title: "Moonlit Emerald", ref: "NK-12530", desc: "Where moonlight meets gemstone fire, this creation balances delicacy and command in a singular luminous form." },
  { id: "sanctum-emerald", title: "Sanctum Emerald", ref: "NK-10361", desc: "An heirloom of ceremonial beauty, shaped through reverence, balance, and enduring brilliance." },
  { id: "emerald-chamber", title: "Emerald Chamber", ref: "ER-12496", desc: "A study in depth and brilliance, Emerald Chamber frames the emerald as both jewel and emotion." },
  { id: "emerald-canopy", title: "Emerald Canopy", ref: "CH-12325", desc: "Imperial emerald queen — a massive emerald and diamond statement necklace with regal presence." },
  { id: "forest-reverie", title: "Forest Reverie", ref: "NK-12536", desc: "Bridal emotion — an emerald diamond necklace with soft, romantic presence and graceful elegance." },
];

// ===== HOUSE OF DIAMONDS (Light) =====
const diamonds = [
  { id: "celestial-rain", title: "Celestial Rain", ref: "NK-12725", desc: "A cascade of diamond light suspended in motion, Celestial Rain transforms brilliance into atmosphere." },
  { id: "diamond-tempest", title: "Diamond Tempest", ref: "NK-12585", desc: "Layered in brilliance and movement, Diamond Tempest evokes the force and elegance of light in motion." },
  { id: "winter-halo", title: "Winter Halo", ref: "NK-12415", desc: "A restrained expression of brilliance, Winter Halo carries the stillness and precision of sculpted frost." },
  { id: "symphony-of-light", title: "Symphony of Light", ref: "NK-12528", desc: "Balanced through rhythm and symmetry, this creation celebrates the quiet power of perfect proportion." },
  { id: "quiet-majesty", title: "Quiet Majesty", ref: "NK-12505", desc: "Minimal in gesture yet powerful in presence, Quiet Majesty reflects the language of modern luxury." },
  { id: "opera-nocturne", title: "Opera Nocturne", ref: "NK-12100", desc: "Composed for evenings of ceremony and spectacle, Opera Nocturne carries the drama of diamond theatre." },
  { id: "starlit-reverence", title: "Starlit Reverence", ref: "ER-12508", desc: "Designed as an echo of celestial light, Starlit Reverence frames the face through brilliance and movement." },
];

// ===== RUBY SALON (Desire) =====
const ruby = [
  { id: "ruby-aurora", title: "Ruby Aurora", ref: "NK-12479", desc: "Radiant and emotionally magnetic, Ruby Aurora carries the fire of rare gemstones shaped through elegance and restraint." },
  { id: "crimson-dynasty", title: "Crimson Dynasty", ref: "NK-12755", desc: "A ceremonial expression of ruby brilliance, Crimson Dynasty evokes royal celebration and enduring grandeur." },
  { id: "velvet-ember", title: "Velvet Ember", ref: "NK-12373", desc: "Soft in movement yet intense in presence, Velvet Ember transforms ruby light into an intimate statement of luxury." },
  { id: "rose-sovereign", title: "Rose Sovereign", ref: "ER-12431", desc: "Framing the face through ruby brilliance and delicate motion, Rose Sovereign balances romance with authority." },
  { id: "royal-lace", title: "Royal Lace", ref: "CH-12509", desc: "Intricacy — an intricate diamond necklace with lace-inspired detailing, delicate and commanding." },
];

// ===== HERITAGE ATELIER (Memory) =====
const heritage = [
  { id: "sanctum-arch", title: "Sanctum Arch", ref: "NK-10212", desc: "Inspired by ceremonial architecture and sacred ornament traditions, Sanctum Arch carries devotion through refined craftsmanship and enduring form." },
  { id: "sacred-geometry", title: "Sacred Geometry", ref: "NK-2263", desc: "A study in symmetry and symbolism, Sacred Geometry transforms traditional ornament into living heritage." },
  { id: "ceremonial-bloom", title: "Ceremonial Bloom", ref: "NK-11853", desc: "Crafted with the language of celebration and memory, Ceremonial Bloom honours ritual through beauty and permanence." },
  { id: "guardian-pendant", title: "Guardian Pendant", ref: "P-590", desc: "Compact yet powerful, Guardian Pendant carries the intimacy of protection and the dignity of inherited form." },
  { id: "divine-veil", title: "Divine Veil", ref: "P-11449", desc: "Delicate yet spiritually resonant, Divine Veil reflects the grace of sacred ornament carried close to the heart." },
  { id: "eternal-lotus", title: "Eternal Lotus", ref: "NK-291", desc: "Rooted in floral symbolism and ceremonial memory, Eternal Lotus celebrates continuity through sculpted elegance." },
];

// ===== JASMINE ATELIER (Quiet Luxury) =====
const jasmine = [
  { id: "morning-dew", title: "Morning Dew", ref: "T-389", desc: "Delicate and luminous, Morning Dew captures the softness of first light through refined diamond brilliance." },
  { id: "silken-light", title: "Silken Light", ref: "T-898", desc: "A refined expression of modern elegance, Silken Light frames brilliance through restraint and grace." },
  { id: "petal-halo", title: "Petal Halo", ref: "T-1026", desc: "Graceful and intimate, Petal Halo reflects softness shaped through precision and light." },
  { id: "whisper-diamond", title: "Whisper Diamond", ref: "T-11011", desc: "Minimal yet expressive, Whisper Diamond celebrates elegance that speaks softly and remains unforgettable." },
  { id: "champagne-bloom", title: "Champagne Bloom", ref: "T-10862", desc: "Radiant yet effortless, Champagne Bloom brings warmth and delicacy into refined diamond form." },
  { id: "ivory-sonata", title: "Ivory Sonata", ref: "T-10588", desc: "Balanced through softness and precision, Ivory Sonata transforms everyday luxury into wearable poetry." },
  { id: "first-light", title: "First Light", ref: "T-10692", desc: "Airy, luminous, and quietly refined, First Light celebrates beauty carried with ease." },
];

const heroes = ["imperial-cascade","dynasty-bloom","maharani-veil","emerald-canopy","forest-reverie","celestial-rain","ruby-aurora","royal-lace"];

let count = 0;

function writeEntry(e, collection, type, row, order, isHero, cat) {
  const f = md(e.id, e.title, e.ref, e.desc, row, order, isHero, null, collection, type, true, cat);
  writeFileSync(join(entriesDir, `${e.id}.md`), f);
  count++;
}

// Crown — on homepage rows 1-4
writeEntry(crown[0], "crown", "necklace", 1, 0, false);   // Imperial Dominion
writeEntry(crown[1], "crown", "necklace", 1, 1, false);   // Royal Edict
writeEntry(crown[2], "crown", "necklace", 2, 0, false);   // Throne of Light
writeEntry(crown[3], "crown", "necklace", 2, 1, false);   // Regalia Canopy
writeEntry(crown[4], "crown", "necklace", 3, 0, true);    // Imperial Cascade — hero
writeEntry(crown[5], "crown", "necklace", 3, 1, true);    // Dynasty Bloom — hero
writeEntry(crown[6], "crown", "necklace", 4, 0, true);    // Maharani Veil — hero

// Emerald Court — not on homepage (rendered on its collection page)
for (let i = 0; i < emerald.length; i++) {
  const isHero = heroes.includes(emerald[i].id);
  const eType = emerald[i].id === "emerald-chamber" ? "earrings" : emerald[i].id === "sanctum-emerald" ? "pendant" : "necklace";
  const f = md(emerald[i].id, emerald[i].title, emerald[i].ref, emerald[i].desc, 5+i, 0, isHero, null, "emerald-court", eType, false);
  writeFileSync(join(entriesDir, `${emerald[i].id}.md`), f);
  count++;
}

// House of Diamonds — not on homepage
for (let i = 0; i < diamonds.length; i++) {
  const isHero = heroes.includes(diamonds[i].id);
  const eType = diamonds[i].id === "starlit-reverence" ? "earrings" : "necklace";
  const f = md(diamonds[i].id, diamonds[i].title, diamonds[i].ref, diamonds[i].desc, 12+i, 0, isHero, null, "house-of-diamonds", eType, false);
  writeFileSync(join(entriesDir, `${diamonds[i].id}.md`), f);
  count++;
}

// Ruby Salon — not on homepage
for (let i = 0; i < ruby.length; i++) {
  const isHero = heroes.includes(ruby[i].id);
  const eType = ruby[i].id === "rose-sovereign" ? "earrings" : "necklace";
  const f = md(ruby[i].id, ruby[i].title, ruby[i].ref, ruby[i].desc, 19+i, 0, isHero, null, "ruby-salon", eType, false);
  writeFileSync(join(entriesDir, `${ruby[i].id}.md`), f);
  count++;
}

// Heritage Atelier — not on homepage
for (let i = 0; i < heritage.length; i++) {
  const eType = ["guardian-pendant","divine-veil"].includes(heritage[i].id) ? "pendant" : "necklace";
  const f = md(heritage[i].id, heritage[i].title, heritage[i].ref, heritage[i].desc, 24+i, 0, false, null, "heritage-atelier", eType, false);
  writeFileSync(join(entriesDir, `${heritage[i].id}.md`), f);
  count++;
}

// Jasmine Atelier — not on homepage
for (let i = 0; i < jasmine.length; i++) {
  const f = md(jasmine[i].id, jasmine[i].title, jasmine[i].ref, jasmine[i].desc, 30+i, 0, false, null, "jasmine-atelier", "earrings", false);
  writeFileSync(join(entriesDir, `${jasmine[i].id}.md`), f);
  count++;
}

// Write Maharani Cascade (hero, stays on homepage)
const heroMd = `---
id: maharani-cascade
title: Maharani Cascade Necklace
category: High Jewellery · Diamond
description: |
  A statement of regal craftsmanship and architectural brilliance, the Maharani Cascade Necklace is designed for moments that demand presence. Handcrafted with layered diamond formations, cascading pear drops, and intricate symmetry, this masterpiece draws inspiration from royal ceremonial jewellery while embracing contemporary luxury.

  Its dramatic silhouette frames the neckline with extraordinary brilliance, transforming light into movement and elegance into authority.

  Crafted for weddings, couture occasions, and collectors of exceptional jewellery.
hero: Full-width hero piece on homepage
images: []
onHomepage: true
row: 0
homepageOrder: 0
isHero: true
trailer: /assets/videos/products/Maharani_Cascade-film.mp4
collection: crown
type: necklace
---
`;
writeFileSync(join(entriesDir, `maharani-cascade.md`), heroMd);
count++;

console.log(`✅ Wrote ${count} markdown entries to ${entriesDir}`);
