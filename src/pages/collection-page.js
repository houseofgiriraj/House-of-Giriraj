import "../../css/style.css";
import houseCollection from "../data/house-collection.js";

function esc(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

document.addEventListener("DOMContentLoaded", function () {
  const collection = document.body.dataset.collection;
  if (!collection) return;

  const allItems = houseCollection.filter(p => p.collection === collection && p.status === "active");
  if (allItems.length === 0) return;

  const heroIndex = allItems.findIndex(p => p.isHero);
  const hero = heroIndex !== -1 ? allItems[heroIndex] : null;
  const items = hero ? [...allItems.slice(0, heroIndex), ...allItems.slice(heroIndex + 1)] : allItems;

  const heroRow = document.getElementById("hero-row");
  function tryInitVideo(video) {
    if (!video || video.dataset.videoInit) return;
    video.dataset.videoInit = "true";
    const card = video.closest(".product-card");
    const onFail = () => { video.remove(); };
    const onCanPlay = () => {
      const firstImg = card?.querySelector(".card-img[data-index='0']");
      if (firstImg) firstImg.classList.add("hidden");
      video.classList.remove("hidden");
      video.play();
      if (card) stopAutoPlay(card);
    };
    video.addEventListener("error", onFail, { once: true });
    video.addEventListener("stalled", onFail, { once: true });
    video.addEventListener("canplay", onCanPlay, { once: true });
    video.load();
  }
  function attachVideoFallback(video) {
    if (!video || video.dataset.fallbackAttached) return;
    video.dataset.fallbackAttached = "true";
    const fallback = () => {
      const poster = video.poster || video.getAttribute("poster");
      if (poster && video.parentNode) {
        const img = document.createElement("img");
        img.src = poster;
        img.className = video.className;
        img.alt = "";
        video.parentNode.replaceChild(img, video);
      }
    };
    video.addEventListener("error", fallback);
    video.addEventListener("stalled", fallback);
    video.play().catch(fallback);
  }

  if (hero && heroRow) {
    const trail = hero.trailer;
    heroRow.innerHTML = `
      <a href="house-piece.html?id=${encodeURIComponent(hero.id)}" class="group block w-full">
        <div class="relative overflow-hidden bg-stone-900 w-full aspect-[16/9]">
          <img class="hero-img absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" src="${esc(hero.images[0] || "")}" alt="${esc(hero.title)}" loading="eager" />
          ${trail ? `
          <video class="hero-video absolute inset-0 w-full h-full object-cover hidden" muted playsinline poster="${esc(hero.images[0] || "")}">
            <source src="${esc(trail)}" type="video/mp4" />
          </video>
          ` : ""}
        </div>
        <div class="p-6 md:p-8 text-left bg-white border-t border-surface-variant/30">
          <span class="text-[10px] tracking-[0.12em] uppercase text-stone-400 mb-1 block">Featured</span>
          <h2 class="font-serif font-[400] text-lg md:text-xl text-stone-800 leading-snug mb-1">${esc(hero.title)}</h2>
          <p class="text-[11px] text-stone-400 leading-relaxed line-clamp-2 mb-2">${hero.description ? esc(hero.description.split("\n\n")[0]) : ""}</p>
          <span class="text-[0.7rem] tracking-[0.18em] font-light uppercase text-stone-400">View Masterpiece</span>
        </div>
      </a>
    `;
    const heroVid = heroRow.querySelector("video.hero-video");
    if (heroVid) {
      const card = { querySelector: () => heroRow.querySelector("img.hero-img") };
      const onFail = () => { heroVid.remove(); };
      const onCanPlay = () => {
        const heroImg = heroRow.querySelector("img.hero-img");
        if (heroImg) heroImg.classList.add("hidden");
        heroVid.classList.remove("hidden");
        heroVid.play();
      };
      heroVid.addEventListener("error", onFail, { once: true });
      heroVid.addEventListener("stalled", onFail, { once: true });
      heroVid.addEventListener("canplay", onCanPlay, { once: true });
      heroVid.load();
    }
  }

  if (items.length === 0) {
    const filterSection = document.getElementById("filter-section");
    if (filterSection) filterSection.style.display = "none";
    return;
  }

  const types = ["all", ...new Set(items.map(i => i.type))];
  const filterContainer = document.getElementById("filter-buttons");
  const grid = document.getElementById("products-grid");
  const emptyState = document.getElementById("empty-state");
  if (!filterContainer || !grid) return;

  filterContainer.innerHTML = types.map((t, i) => `
    <button class="filter-btn px-6 md:px-8 py-3 border border-surface-variant text-[10px] tracking-[0.2em] uppercase hover:border-primary transition-all ${i === 0 ? "active" : ""}" data-filter="${t}">
      ${esc(t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1))}
    </button>
  `).join("");

  function cycleImage(card, dir) {
    const imgs = card.querySelectorAll(".card-img");
    if (imgs.length < 2) return;
    const cur = card.querySelector(".card-img:not(.hidden)");
    if (!cur) return;
    let idx = parseInt(cur.dataset.index, 10);
    const indexes = Array.from(imgs).map(el => parseInt(el.dataset.index, 10));
    const minIdx = Math.min(...indexes);
    const maxIdx = Math.max(...indexes);
    if (dir === "prev") {
      idx = idx > minIdx ? idx - 1 : maxIdx;
    } else {
      idx = idx < maxIdx ? idx + 1 : minIdx;
    }
    imgs.forEach(img => img.classList.add("hidden"));
    const video = card.querySelector(".card-img[data-index='-1']");
    if (video) { video.pause(); video.currentTime = 0; }
    const target = card.querySelector(`.card-img[data-index='${idx}']`);
    if (target) {
      target.classList.remove("hidden");
      if (target.tagName === "VIDEO") target.play();
    }
  }

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  function startAutoPlay(card) {
    if (card.dataset.autoTimer) return;
    const active = card.querySelector(".card-img:not(.hidden)");
    if (active && active.tagName === "VIDEO") return;
    card.dataset.autoTimer = setInterval(() => cycleImage(card, "next"), 4000);
  }

  function stopAutoPlay(card) {
    if (card.dataset.autoTimer) {
      clearInterval(parseInt(card.dataset.autoTimer));
      delete card.dataset.autoTimer;
    }
  }

  function resetAutoPlay(card) {
    stopAutoPlay(card);
    if (isInViewport(card)) startAutoPlay(card);
  }

  function isVideo(el) {
    return el && el.tagName === "VIDEO";
  }

  function connectAutoPlay() {
    document.querySelectorAll(".product-card").forEach(card => {
      const imgs = card.querySelectorAll(".card-img");
      const nonVideo = card.querySelectorAll(".card-img:not([data-index='-1'])");
      if (nonVideo.length < 2 && !(imgs.length >= 2)) return;
      autoObserver.observe(card);
      card.addEventListener("mouseenter", () => stopAutoPlay(card));
      card.addEventListener("mouseleave", () => {
        if (isInViewport(card)) startAutoPlay(card);
      });
    });
    document.querySelectorAll("video.card-img").forEach(v => tryInitVideo(v));
  }

  const autoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const card = entry.target;
      if (entry.isIntersecting) startAutoPlay(card);
      else stopAutoPlay(card);
    });
  }, { threshold: 0.5 });

  function render(filter = "all") {
    const filtered = filter === "all" ? items : items.filter(i => i.type === filter);
    if (filtered.length === 0) {
      grid.innerHTML = "";
      if (emptyState) emptyState.classList.remove("hidden");
      return;
    }
    if (emptyState) emptyState.classList.add("hidden");
    grid.innerHTML = filtered.map(item => {
      const href = `house-piece.html?id=${encodeURIComponent(item.id)}`;
      const multi = item.images.length > 1;
      const desc = item.description ? esc(item.description) : "";
      return `
        <a href="${href}" class="product-card group bg-white block">
          <div class="aspect-[4/5] overflow-hidden relative">
            <div class="card-images w-full h-full">
              ${item.trailer ? `
              <video class="card-img w-full h-full object-cover hidden" muted loop playsinline poster="${esc(item.images[0] || "")}" data-index="-1">
                <source src="${esc(item.trailer)}" type="video/mp4" />
              </video>
              ` : ""}
              ${item.images.map((img, i) => `
                <img class="card-img w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${i === 0 ? "" : "hidden"}" src="${esc(img)}" alt="${esc(item.title)}" loading="lazy" data-index="${i}" />
              `).join("")}
            </div>
            ${multi || item.trailer ? `
            <button class="card-nav absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white text-stone-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-md" type="button" data-dir="prev">
              <span class="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button class="card-nav absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white text-stone-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-md" type="button" data-dir="next">
              <span class="material-symbols-outlined text-sm">chevron_right</span>
            </button>
            ` : ""}
          </div>
          <div class="p-6 text-left flex flex-col min-h-[130px] border-t border-surface-variant/30">
            <span class="text-[10px] tracking-[0.12em] uppercase text-stone-400 mb-1">${esc(item.type)}</span>
            <h4 class="font-serif font-[400] text-lg text-stone-800 leading-snug mb-1 group-hover:text-primary transition-colors">${esc(item.title)}</h4>
            ${desc ? `<p class="text-[11px] text-stone-400 leading-relaxed line-clamp-2 mb-2">${desc}</p>` : ""}
            <p class="text-[0.7rem] tracking-[0.18em] font-light uppercase text-stone-400 mt-auto">${esc(item.ref || "")}</p>
          </div>
        </a>
      `;
    }).join("");
    connectAutoPlay();
  }

  render("all");

  grid.addEventListener("click", function (e) {
    const btn = e.target.closest(".card-nav");
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const card = btn.closest(".product-card");
    if (!card) return;
    cycleImage(card, btn.dataset.dir);
    resetAutoPlay(card);
  });

  let touchCard = null, touchStartX = 0, touchStartY = 0, touchSwiped = false;

  grid.addEventListener("touchstart", function (e) {
    const card = e.target.closest(".product-card");
    if (!card || card.querySelectorAll(".card-img").length < 2) { touchCard = null; return; }
    touchCard = card;
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    touchSwiped = false;
  }, { passive: true });

  grid.addEventListener("touchmove", function (e) {
    if (!touchCard) return;
    const dx = e.changedTouches[0].screenX - touchStartX;
    const dy = e.changedTouches[0].screenY - touchStartY;
    if (Math.abs(dx) > 20 && Math.abs(dx) > Math.abs(dy)) touchSwiped = true;
  }, { passive: true });

  grid.addEventListener("touchend", function (e) {
    if (!touchCard) return;
    const dx = e.changedTouches[0].screenX - touchStartX;
    const dy = e.changedTouches[0].screenY - touchStartY;
    if (touchSwiped && Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy)) {
      e.preventDefault();
      cycleImage(touchCard, dx < 0 ? "next" : "prev");
      resetAutoPlay(touchCard);
    }
    touchCard = null;
  }, { passive: false });

  filterContainer.addEventListener("click", function (e) {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filterContainer.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    autoObserver.disconnect();
    render(btn.dataset.filter);
  });

  if (typeof WhatsAppFunnel !== "undefined") {
    WhatsAppFunnel.init();
  }
});