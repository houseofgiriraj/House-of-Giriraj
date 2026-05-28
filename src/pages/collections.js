import "../../css/style.css";
import { products } from "../data.js";
import houseCollection from "../data/house-collection.js";

function esc(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

const houseItems = houseCollection
  .filter(p => p.images && p.images.length > 0)
  .map(p => {
    let subcategory = "necklaces";
    const prefix = (p.ref || "").split("-")[0];
    if (prefix === "CH") subcategory = "chokers";
    return {
      id: p.id,
      name: p.title,
      subcategory,
      image: `/assets/images/collection/${p.id}/${encodeURIComponent(p.images[0])}`,
      shortDesc: p.ref,
      type: "house"
    };
  });

const productItems = products.map(p => ({
  id: p.id,
  name: p.name,
  subcategory: p.subcategory,
  image: p.image || "/assets/images/collection/placeholder.jpg",
  shortDesc: p.shortDesc,
  type: "product"
}));

const allItems = [...houseItems, ...productItems];
const categories = ["all", ...new Set(allItems.map(i => i.subcategory))];

document.addEventListener("DOMContentLoaded", function () {
  const filterContainer = document.getElementById("filter-buttons");
  const grid = document.getElementById("products-grid");
  const emptyState = document.getElementById("empty-state");
  if (!filterContainer || !grid) return;

  filterContainer.innerHTML = categories.map((cat, i) => `
    <button class="filter-btn px-6 md:px-8 py-3 border border-surface-variant text-[10px] tracking-[0.2em] uppercase hover:border-primary transition-all ${i === 0 ? "active" : ""}" data-filter="${cat}">
      ${esc(cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1))}
    </button>
  `).join("");

  function render(filter = "all") {
    const filtered = filter === "all" ? allItems : allItems.filter(i => i.subcategory === filter);
    if (filtered.length === 0) {
      grid.innerHTML = "";
      if (emptyState) emptyState.classList.remove("hidden");
      return;
    }
    if (emptyState) emptyState.classList.add("hidden");
    grid.innerHTML = filtered.map(item => {
      const href = item.type === "house"
        ? `house-piece.html?id=${encodeURIComponent(item.id)}`
        : `product.html?id=${encodeURIComponent(item.id)}`;
      return `
        <a href="${href}" class="product-card group bg-surface-container block" data-type="${item.type}">
          <div class="aspect-[4/5] overflow-hidden">
            <img class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="${esc(item.image)}" alt="${esc(item.name)}" loading="lazy" />
          </div>
          <div class="p-5 text-center border-t border-surface-variant/30 group-hover:border-primary/30 transition-colors min-h-[120px] flex flex-col justify-center">
            <span class="text-[9px] tracking-[0.3em] uppercase text-primary mb-2">${esc(item.subcategory)}</span>
            <h4 class="font-serif text-lg text-on-surface mb-1 group-hover:text-primary transition-colors">${esc(item.name)}</h4>
            <p class="text-xs text-on-surface-variant leading-relaxed line-clamp-2">${esc(item.shortDesc)}</p>
            <span class="mt-3 text-[10px] tracking-[0.2em] uppercase text-primary inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              View ${item.type === "house" ? "Collection" : "Masterpiece"}
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </span>
          </div>
        </a>
      `;
    }).join("");
  }

  render("all");

  filterContainer.addEventListener("click", function (e) {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filterContainer.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.filter);
  });

  if (typeof WhatsAppFunnel !== "undefined") {
    WhatsAppFunnel.init();
  }
});
