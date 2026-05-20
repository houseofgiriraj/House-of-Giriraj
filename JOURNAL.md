# Production Journal

## 2026-05-21

### Re-anchored Project State

- Confirmed the workspace has both `production/` and `production-luxury/`.
- Treated `production-luxury/` as the preferred luxury visual direction.
- Treated `production/` as the deployable production folder because it already
  had the multi-page funnel, package lock, Vite config, and installed
  dependencies.

### Luxury Homepage Port

- Copied the luxury homepage into `production/index.html`.
- Copied `production-luxury/src/main.js` into `production/src/main.js`.
- Copied `production-luxury/src/styles.css` into `production/src/styles.css`.
- Copied `production-luxury/public/assets/` into `production/public/assets/`.
- Generated responsive AVIF/WebP variants with `npm run optimize:images`.

### Preserved Production Funnel

- Kept these pages in place:
  - `collections.html`
  - `product.html`
  - `bespoke.html`
  - `heritage.html`
  - `contact.html`
- Kept existing funnel scripts:
  - `js/data.js`
  - `js/ui.js`
  - `js/whatsapp.js`
  - `js/analytics.js`
- Added a Vite build hook to copy legacy `js/`, `images/`, and `videos/` folders
  into `dist/`.

### Homepage Integration Fixes

- Replaced stale `/product-detail.html` links with production product routes.
- Added the floating WhatsApp CTA to the luxury homepage.
- Loaded `js/analytics.js` and `js/whatsapp.js` on the homepage.
- Added WhatsApp button and modal styles to `src/styles.css`.
- Fixed the CTA image source set to use the generated `diamond-macro-1080`
  variant instead of a missing `diamond-macro-1280` variant.
- Added static hero fallback sizing so the hero image fills the viewport when
  the video is disabled for mobile, reduced-data, or reduced-motion users.

### Broken Path Cleanup

- Replaced fragile parent-directory media paths in `bespoke.html` and
  `heritage.html`.
- `bespoke.html` now references `/assets/videos/atelier.mp4` for the hero video.
- `bespoke.html` and `heritage.html` now use `/assets/images/diamond-macro.jpeg`
  instead of `../website/images/product_image1.jpeg`.

### Size Pass

- Initial luxury merge build was about 107 MB.
- After legacy path cleanup it was about 97 MB.
- Temporarily removed `hero2.mp4` and `atelier.mp4`, reducing the build to about
  18.7 MB.
- User requested the hero and atelier videos back.
- Restored:
  - `public/assets/videos/hero2.mp4`
  - `public/assets/videos/atelier.mp4`
- Restored homepage hero video and atelier video references.
- Restored `public/assets/asset-manifest.json` video entries.

### Verification

- `cmd /c npm run build` completed successfully.
- Local dev server was started at `http://localhost:5173/`.
- Confirmed route health for:
  - `/`
  - `/collections.html`
  - `/product.html?id=maharani-viraasat`
  - `/product.html?id=raj-tilak-emerald`
  - `/bespoke.html`
  - `/heritage.html`
  - `/contact.html`
- Confirmed local `href` and `src` references were reachable after cleanup.
- Confirmed core scripts and assets returned `200`.

### Current Caveats

- `hero2.mp4` is about 61 MB and `atelier.mp4` is about 21 MB. Final deployment
  should compress these videos if performance is a priority.
- Vite warnings about non-module legacy scripts are expected because those files
  are copied as static compatibility assets instead of bundled.
- Browser automation was not available in this environment, so checks were done
  through build, route, asset, and markup inspection.

### Header Check Against Approved `website/`

- Compared `production/index.html` header against approved `website/index.html`.
- Confirmed the production header preserves the approved essentials:
  - logo link
  - Collections, Bespoke, Heritage, Contact links
  - Search Archive control
  - language selector
  - theme toggle
  - The Inquiry CTA
  - mobile menu with Home and page links
- Added approved compatibility details to the production luxury header:
  - `data-i18n` keys on header links and CTA text
  - `id="lang-selector"` and `id="lang-selector-mobile"`
  - `id="theme-icon"` and `id="theme-icon-mobile"`
  - styled `archive-search-text` to match the approved search control intent
- Updated `src/main.js` so theme icons sync between light and dark modes and
  header text updates through the same `data-i18n` mechanism.
