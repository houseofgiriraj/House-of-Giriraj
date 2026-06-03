import "../../css/style.css";
import houseCollection from "../data/house-collection.js";

const collectionNames = {
  crown: "Crown Collection",
  "emerald-court": "Emerald Court",
  "house-of-diamonds": "House of Diamonds",
  "ruby-salon": "Ruby Salon",
  "heritage-atelier": "Heritage Atelier",
  "jasmine-atelier": "Jasmine Atelier"
};

const collectionFiles = {
  crown: "crown-collection.html",
  "emerald-court": "emerald-court.html",
  "house-of-diamonds": "house-of-diamonds.html",
  "ruby-salon": "ruby-salon.html",
  "heritage-atelier": "heritage-atelier.html",
  "jasmine-atelier": "jasmine-atelier.html"
};

const collectionColors = {
  crown: "#1c1814",
  "emerald-court": "#0f1512",
  "house-of-diamonds": "#111316",
  "ruby-salon": "#1b1012",
  "heritage-atelier": "#17140e",
  "jasmine-atelier": "#141016"
};

const collectionInfoColors = {
  crown: "#28221c",
  "emerald-court": "#1a241e",
  "house-of-diamonds": "#1c2026",
  "ruby-salon": "#281a1c",
  "heritage-atelier": "#242016",
  "jasmine-atelier": "#221c28"
};

const collectionOrder = ["crown", "emerald-court", "house-of-diamonds", "ruby-salon", "heritage-atelier", "jasmine-atelier"];

function esc(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function getExcerpt(text, maxLen) {
  if (!text) return "";
  const cleaned = text.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLen) return cleaned;
  return cleaned.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
}

document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.getElementById("hero-gallery");
  if (!gallery) return;

  const pieces = collectionOrder.map(col => {
    const items = houseCollection.filter(p => p.collection === col && p.status === "active");
    const hero = items.find(p => p.isHero);
    return hero || items[0];
  }).filter(Boolean);

  if (pieces.length === 0) return;

  gallery.innerHTML = pieces.map(piece => {
    const col = piece.collection;
    const colPage = collectionFiles[col] || "crown-collection.html";
    const colName = collectionNames[col] || col;
    const bgColor = collectionColors[col] || "#15130f";
    const infoBg = collectionInfoColors[col] || "#1e1b17";
    const excerpt = getExcerpt(piece.description, 150);
    return `
      <section class="worlds-slide" style="--worlds-bg: ${bgColor}">
        <div class="worlds-media">
          <div class="worlds-gradient"></div>
          ${piece.trailer ? `
          <video class="worlds-video" autoplay muted loop playsinline poster="${esc(piece.images?.[0] || "")}">
            <source src="${esc(piece.trailer)}" type="video/mp4" />
          </video>
          ` : `
          <img class="worlds-image" src="${esc(piece.images?.[0] || "")}" alt="${esc(piece.title)}" />
          `}
        </div>
        <div class="worlds-info" style="background: ${infoBg}">
          <span class="worlds-eyebrow">${esc(colName)}</span>
          <h2 class="worlds-title">${esc(piece.title)}</h2>
          ${excerpt ? `<p class="worlds-desc">${esc(excerpt)}</p>` : ""}
          <a href="${esc(colPage)}" class="worlds-btn">Explore Collection</a>
        </div>
      </section>
    `;
  }).join("");

  gallery.querySelectorAll("video").forEach(v => {
    const fallback = () => {
      const poster = v.poster || v.getAttribute("poster");
      if (poster && v.parentNode) {
        const img = document.createElement("img");
        img.src = poster;
        img.className = v.className;
        img.alt = "";
        v.parentNode.replaceChild(img, v);
      }
    };
    v.addEventListener("error", fallback);
    v.addEventListener("stalled", fallback);
    v.play().catch(fallback);
  });
});
