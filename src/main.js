import "./styles.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const translations = {
  en: {
    nav_collections: "Collections",
    nav_bespoke: "Bespoke",
    nav_heritage: "Heritage",
    nav_contact: "Contact",
    search_placeholder: "Search Archive",
    the_inquiry: "The Inquiry"
  },
  hi: {
    nav_collections: "Collections",
    nav_bespoke: "Bespoke",
    nav_heritage: "Heritage",
    nav_contact: "Contact",
    search_placeholder: "Search Archive",
    the_inquiry: "The Inquiry"
  }
};

const searchItems = [
  {
    title: "The Ekta Lineage Bracelet",
    meta: "High Jewelry / 12ct D-Flawless",
    href: "/product.html?id=diamond-tennis"
  },
  {
    title: "The Maharani Viraasat Necklace",
    meta: "Masterpiece / Burmese Rubies",
    href: "/product.html?id=maharani-viraasat"
  },
  {
    title: "The Raj Tilak Emerald Parure",
    meta: "Bespoke / Kashmir Blue",
    href: "/product.html?id=raj-tilak-emerald"
  },
  {
    title: "Private Viewing",
    meta: "Appointment / Diamond Specialist",
    href: "/bespoke.html"
  }
];

function splitWords(root) {
  if (!root || root.dataset.splitReady === "true") return;

  const splitTargets = root.querySelectorAll(".split-line");
  const targets = splitTargets.length ? splitTargets : [root];

  targets.forEach((target) => {
    const words = target.textContent.trim().split(/\s+/);
    target.innerHTML = words
      .map((word) => `<span class="split-word"><span>${word}</span></span>`)
      .join(" ");
  });

  root.dataset.splitReady = "true";
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.documentElement.classList.add("light");
    updateThemeIcons();
  }

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      document.documentElement.classList.toggle("light");
      const isLight = document.documentElement.classList.contains("light");
      localStorage.setItem("theme", isLight ? "light" : "dark");
      updateThemeIcons();
    });
  });
}

function updateThemeIcons() {
  const isLight = document.documentElement.classList.contains("light");
  document.querySelectorAll("#theme-icon, #theme-icon-mobile").forEach((icon) => {
    icon.textContent = isLight ? "dark_mode" : "light_mode";
  });
}

function initLanguageSelectors() {
  const savedLanguage = localStorage.getItem("language") || "en";
  document.documentElement.lang = savedLanguage;
  updateTranslations(savedLanguage);

  document.querySelectorAll("[data-language-select]").forEach((select) => {
    select.value = savedLanguage;
    select.addEventListener("change", () => {
      localStorage.setItem("language", select.value);
      document.documentElement.lang = select.value;
      updateTranslations(select.value);
      document.querySelectorAll("[data-language-select]").forEach((peer) => {
        peer.value = select.value;
      });
    });
  });
}

function updateTranslations(language) {
  const copy = translations[language] || translations.en;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (copy[key]) {
      element.textContent = copy[key];
    }
  });
}

function initMenu() {
  const menu = document.querySelector("[data-menu]");
  const openers = document.querySelectorAll("[data-menu-open]");
  const closers = document.querySelectorAll("[data-menu-close]");
  if (!menu) return;

  function openMenu() {
    menu.classList.add("is-open");
    document.body.classList.add("menu-open");
    openers.forEach((button) => button.setAttribute("aria-expanded", "true"));
  }

  function closeMenu() {
    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    openers.forEach((button) => button.setAttribute("aria-expanded", "false"));
  }

  openers.forEach((button) => button.addEventListener("click", openMenu));
  closers.forEach((button) => button.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      closeMenu();
    }
  });
}

function initSearch() {
  const modal = document.querySelector("[data-search-modal]");
  const input = document.querySelector("[data-search-input]");
  const results = document.querySelector("[data-search-results]");
  if (!modal || !input || !results) return;

  const openers = document.querySelectorAll("[data-search-open]");
  const closers = document.querySelectorAll("[data-search-close]");

  function renderResults(query = "") {
    const normalized = query.trim().toLowerCase();
    const matches = normalized
      ? searchItems.filter((item) =>
          `${item.title} ${item.meta}`.toLowerCase().includes(normalized)
        )
      : searchItems;

    results.innerHTML = matches
      .map(
        (item) => `
          <a class="search-result" href="${item.href}">
            <strong>${item.title}</strong>
            <span class="metadata block mt-1">${item.meta}</span>
          </a>
        `
      )
      .join("");
  }

  function openSearch() {
    renderResults();
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => input.focus());
  }

  function closeSearch() {
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    input.value = "";
  }

  openers.forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector("[data-menu]")?.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      openSearch();
    });
  });

  closers.forEach((button) => button.addEventListener("click", closeSearch));
  input.addEventListener("input", () => renderResults(input.value));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeSearch();
    }
  });
}

function initMotion() {
  document.querySelectorAll("[data-split]").forEach(splitWords);

  if (reducedMotion) {
    gsap.set("[data-reveal], .promise-card, .portfolio-card", {
      clearProps: "all",
      opacity: 1
    });
    return;
  }

  gsap.set(".split-word > span", { yPercent: 110 });
  gsap.set("[data-reveal]", { y: 42, opacity: 0 });

  const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTimeline
    .from(".nav-shell", { y: -18, opacity: 0, duration: 1.1 })
    .to(".hero-title .split-word > span", {
      yPercent: 0,
      duration: 1.25,
      stagger: 0.055
    }, 0.25)
    .from(".hero-kicker", { y: 16, opacity: 0, duration: 0.95 }, 0.38)
    .from(".hero-subtitle", { y: 18, opacity: 0, duration: 1 }, 0.74)
    .from(".hero-actions .button", {
      y: 16,
      opacity: 0,
      duration: 0.95,
      stagger: 0.12
    }, 0.92);

  document.querySelectorAll("[data-reveal]").forEach((element) => {
    gsap.to(element, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 82%",
        once: true
      }
    });
  });

  document.querySelectorAll(".promise-card").forEach((card, index) => {
    gsap.from(card, {
      y: 34,
      opacity: 0,
      duration: 0.9,
      delay: index * 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".promise-grid",
        start: "top 78%",
        once: true
      }
    });
  });

  document.querySelectorAll(".portfolio-card").forEach((card) => {
    gsap.from(card, {
      y: 52,
      opacity: 0,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 84%",
        once: true
      }
    });

    const media = card.querySelector(".portfolio-media video, .portfolio-media img");
    if (media) {
      gsap.fromTo(
        media,
        { scale: 1 },
        {
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        }
      );
    }
  });

  document.querySelectorAll("[data-split-scroll]").forEach((element) => {
    gsap.to(element.querySelectorAll(".split-word > span"), {
      yPercent: 0,
      duration: 1,
      stagger: 0.04,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 82%",
        once: true
      }
    });
  });
}

function initVideoFallbacks() {
  const shouldUseStaticHero =
    window.matchMedia("(max-width: 760px)").matches ||
    window.matchMedia("(prefers-reduced-data: reduce)").matches ||
    reducedMotion;

  if (shouldUseStaticHero) {
    document.querySelector("[data-hero-video]")?.remove();
  }

  document.querySelectorAll("video").forEach((video) => {
    video.addEventListener("error", () => {
      video.closest(".media-frame, .portfolio-media, .hero-media")?.classList.add("media-error");
    });
  });
}

function init() {
  initTheme();
  initLanguageSelectors();
  initMenu();
  initSearch();
  initMotion();
  initVideoFallbacks();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
