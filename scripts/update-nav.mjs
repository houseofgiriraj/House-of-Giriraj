import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const collectionLinks = [
  { file: "crown-collection.html", label: "Crown Collection" },
  { file: "emerald-court.html", label: "Emerald Court" },
  { file: "house-of-diamonds.html", label: "House of Diamonds" },
  { file: "ruby-salon.html", label: "Ruby Salon" },
  { file: "heritage-atelier.html", label: "Heritage Atelier" },
  { file: "jasmine-atelier.html", label: "Jasmine Atelier" },
];

function desktopDropdown() {
  return collectionLinks.map(c =>
    `<a href="${c.file}" class="block px-6 py-3 text-[11px] tracking-wider uppercase text-[#7b7670] hover:text-[#8d743b] hover:bg-stone-900/50 transition-colors">${c.label}</a>`
  ).join("\n            ");
}

function mobileSubsection(currentActive) {
  return collectionLinks.map(c =>
    `<a class="menu-link${c.file === currentActive ? ' text-[#8d743b]' : ''}" href="${c.file}">${c.label}</a>`
  ).join("\n        ");
}

function footerCollectionLinks() {
  return collectionLinks.map(c =>
    `<a class="text-[#7b7670] hover:text-[#8d743b] transition-colors duration-400 font-label text-[10px] uppercase tracking-[0.1em] link-reveal" href="${c.file}">${c.label}</a>`
  ).join("\n          ");
}

// Standard old pattern: desktop nav link with class pattern
// Pattern: <a class="text-[#X] hover:text-[#8d743b] transition-colors duration-400 font-label text-xs uppercase tracking-widest nav-link link-reveal" href="collections.html" data-i18n="nav_collections_page">Collections</a>
const navLinkPattern = /<a\s+class="(text-\[#[^\]]+\])\s+hover:text-\[\#8d743b\]\s+transition-colors\s+duration-400\s+font-label\s+text-xs\s+uppercase\s+tracking-widest\s+nav-link\s+link-reveal"\s+href="collections\.html"\s+data-i18n="nav_collections_page">Collections<\/a>/;

function replaceDesktopNav(html, color) {
  const dropdown = `<div class="nav-dropdown relative group">
          <button class="${color} hover:text-[#8d743b] transition-colors duration-400 font-label text-xs uppercase tracking-widest nav-link flex items-center gap-1 cursor-pointer">
            Collections
            <span class="material-symbols-outlined text-sm">expand_more</span>
          </button>
          <div class="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-stone-950 border border-surface-variant/30 min-w-[220px] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl">
            ${desktopDropdown()}
          </div>
        </div>`;
  return html.replace(navLinkPattern, dropdown);
}

// Mobile menu: <a class="menu-link" href="collections.html" data-i18n="nav_collections_page">Collections</a>
// (may have style="color: var(--accent-gold)" or not)
const mobileLinkPattern = /<a\s+class="menu-link(?:\s+text-\[\#[^\]]+\])?"\s+href="collections\.html"\s+data-i18n="nav_collections_page"(?:\s+style="[^"]*")?>Collections<\/a>/;

function replaceMobileNav(html) {
  const subsection = `<div class="menu-subsection">
          <span class="menu-subsection-label">Collections</span>
        ${mobileSubsection()}
        </div>`;
  return html.replace(mobileLinkPattern, subsection);
}

// Footer: <a class="text-[#7b7670] ..." href="collections.html" data-i18n="nav_collections_page">Collections</a>
const footerLinkPattern = /<a\s+class="text-\[\#7b7670\]\s+hover:text-\[\#8d743b\]\s+transition-colors\s+duration-400\s+font-label\s+text-\[10px\]\s+uppercase\s+tracking-\[0\.1em\]\s+link-reveal"\s+href="collections\.html"\s+data-i18n="nav_collections_page">Collections<\/a>/;

function replaceFooterLink(html) {
  return html.replace(footerLinkPattern, footerCollectionLinks());
}

// Search stub in standard pages
// openSearchModal: function () { window.location.href = "collections.html"; },
function replaceSearchStub(html) {
  return html.replace(
    /openSearchModal:\s*function\s*\(\)\s*\{\s*window\.location\.href\s*=\s*"collections\.html";\s*\},/,
    `openSearchModal: function () { window.location.href = "crown-collection.html"; },`
  );
}

// Product page specific: Browse Masterpieces link
// <a href="collections.html" class="inline-block px-8 py-3 border border-primary ...">Browse Masterpieces</a>
function replaceBrowseMasterpieces(html) {
  return html.replace(
    /<a\s+href="collections\.html"\s+class="inline-block\s+px-8\s+py-3\s+border\s+border-primary[^"]*"[^>]*>Browse Masterpieces<\/a>/,
    `<div class="flex flex-wrap gap-2 justify-center">${collectionLinks.map(c =>
      `<a href="${c.file}" class="px-6 py-3 border border-primary text-primary text-[11px] tracking-[0.2em] uppercase hover:bg-primary hover:text-on-primary transition-all">${c.label}</a>`
    ).join("\n            ")}</div>`
  );
}

// Product page: MASTERPIECES breadcrumb link
// <a href="collections.html" class="hover:text-primary">MASTERPIECES</a>
function replaceMasterpiecesBreadcrumb(html) {
  return html.replace(
    /<a\s+href="collections\.html"\s+class="hover:text-primary">MASTERPIECES<\/a>/,
    `<a href="crown-collection.html" class="hover:text-primary">MASTERPIECES</a>`
  );
}

// Index.html specific: desktop nav
function replaceIndexDesktopNav(html) {
  // <a class="nav-link" href="/collections.html" data-i18n="nav_collections_page">Collections</a>
  const pattern = /<a\s+class="nav-link"\s+href="\/collections\.html"\s+data-i18n="nav_collections_page">Collections<\/a>/;
  const dropdown = `<div class="nav-dropdown-wrap">
          <button class="nav-link flex items-center gap-1 cursor-pointer">
            Collections
            <span class="material-symbols-outlined text-sm">expand_more</span>
          </button>
          <div class="nav-dropdown-menu">
            ${collectionLinks.map(c =>
              `<a class="nav-dropdown-link" href="/${c.file}">${c.label}</a>`
            ).join("\n            ")}
          </div>
        </div>`;
  return html.replace(pattern, dropdown);
}

// Index.html: mobile menu
function replaceIndexMobileNav(html) {
  const pattern = /<a\s+class="menu-link"\s+href="\/collections\.html"\s+data-i18n="nav_collections_page">Collections<\/a>/;
  const subsection = `<div class="menu-subsection">
            <span class="menu-subsection-label">Collections</span>
            ${collectionLinks.map(c =>
              `<a class="menu-link" href="/${c.file}">${c.label}</a>`
            ).join("\n            ")}
          </div>`;
  return html.replace(pattern, subsection);
}

// Index.html: footer
function replaceIndexFooter(html) {
  const pattern = /<a\s+class="nav-link"\s+href="\/collections\.html"\s+data-i18n="nav_collections_page">Collections<\/a>/;
  return html.replace(pattern,
    collectionLinks.map(c =>
      `<a class="nav-link" href="/${c.file}">${c.label}</a>`
    ).join("\n        ")
  );
}

// Index.html: "View Full Collection" CTA
function replaceIndexCta(html) {
  return html.replace(
    /<a\s+class="button button-secondary"\s+href="\/collections\.html"\s+data-i18n="collections_cta">\s*View Full Collection\s*<\/a>/,
    `<a class="button button-secondary" href="/crown-collection.html" data-i18n="collections_cta">View Crown Collection</a>`
  );
}

// ----- Process all files -----

const standardFiles = ["bespoke.html", "contact.html", "heritage.html", "house-piece.html", "product.html"];
const colorMapping = {
  "bespoke.html": 'text-[#7b7670]',
  "contact.html": 'text-[#7b7670]',
  "heritage.html": 'text-[#7b7670]',
  "house-piece.html": 'text-[#7b7670]',
  "product.html": 'text-[#7b7670]',
};

// Standard pages
for (const file of standardFiles) {
  let html = readFileSync(join(root, file), "utf-8");
  const color = colorMapping[file];
  
  html = replaceDesktopNav(html, color);
  html = replaceMobileNav(html);
  html = replaceFooterLink(html);
  html = replaceSearchStub(html);
  
  if (file === "product.html") {
    html = replaceBrowseMasterpieces(html);
    html = replaceMasterpiecesBreadcrumb(html);
  }
  
  writeFileSync(join(root, file), html, "utf-8");
  console.log(`✅ Updated ${file}`);
}

// Index.html
let indexHtml = readFileSync(join(root, "index.html"), "utf-8");
indexHtml = replaceIndexDesktopNav(indexHtml);
indexHtml = replaceIndexMobileNav(indexHtml);
indexHtml = replaceIndexFooter(indexHtml);
indexHtml = replaceIndexCta(indexHtml);
writeFileSync(join(root, "index.html"), indexHtml, "utf-8");
console.log("✅ Updated index.html");

// ----- Verification -----
console.log("\nVerification - checking for remaining collections.html references...\n");
for (const file of ["index.html", ...standardFiles]) {
  const content = readFileSync(join(root, file), "utf-8");
  // Count occurrences (should only be in renamed CTA text or irrelevant places)
  const matches = content.match(/collections\.html/g);
  if (matches) {
    console.log(`  ${file}: ${matches.length} remaining reference(s) to collections.html`);
  } else {
    console.log(`  ${file}: ✅ No remaining references`);
  }
}

console.log("\nDone!");
