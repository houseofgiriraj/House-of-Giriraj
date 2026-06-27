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

### Product Management System

- Created a CSV-driven product management workflow.
- **Folder structure:** `products/{category}/{product-id}/` — 7 categories,
  21 products, each with a dedicated folder for images and videos.
- **Master catalog:** `product-inventory.csv` — single source of truth with
  columns: id, category, subcategory, name, shortDesc, description, priceRange,
  stone, metal, weight, cert, featured, imagePath, videoPath.
- **Sync script:** `scripts/sync-products.cjs` — reads the CSV and regenerates
  `src/data.js` automatically.
- **Workflow:** Edit CSV in Excel → drop real product images into product
  folders → run `node scripts/sync-products.cjs` → `npm run build`.
- Verified build passes after CSV-to-JS sync.

### Decap CMS — Client Product Management UI

- Installed Decap CMS at `/admin` for client-facing product editing.
- **`public/admin/index.html`** — CMS entry point (loads decap-cms-app).
- **`public/admin/config.yml`** — Product model with all fields (id, name, category,
  subcategory, price, specs, featured, images, description via markdown editor).
  Includes category filters, editorial workflow, and sort options.
- **`api/oauth.js`** — Vercel serverless function for GitHub OAuth authentication.
- Products are now stored as individual markdown files in `products/{category}/{id}.md`
  with YAML frontmatter. The CMS reads/writes these files directly on GitHub.
- **`scripts/csv-to-md.cjs`** — One-time migration script (CSV → markdown files).
- **Updated `scripts/sync-products.cjs`** — Now reads from `products/*.md` files
  instead of CSV, generates `src/data.js` for the Vite build.
- CSV is preserved as a human-readable reference / bulk-import format.
- Updated `vercel.json` with `api/oauth.js` function config.

**Setup required for production (manual, one-time):**
1. Go to GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
2. Set Homepage URL to `https://houseofgiriraj.vercel.app`
3. Set Callback URL to `https://houseofgiriraj.vercel.app/api/oauth?provider=github`
4. Copy Client ID and generate Client Secret
5. Add to Vercel env vars: `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`
6. Redeploy

## 2026-05-21 (later)

### CMS "No Entry" Bug — Depth Fix

- Products were stored in `products/{category}/{id}.md` (2 levels deep).
- The CMS backend proxy (`entriesByFolder`) sent `depth: 1`, which only returned
  category directories, not the .md files inside them.
- **Fix:** Flattened files to `products/{id}.md` and removed `{{category}}/` from
  the CMS slug config. This let the CMS find all files at depth 1.

### Image Management in CMS

- Added `image` widget (widget: `image`) to the CMS config for uploading product images.
- `media_folder: public/assets/images/products` — CMS saves uploads here.
- `public_folder: /assets/images/products` — public URL path for images.
- **Issue:** The CMS stores image paths as absolute URLs (`/assets/images/products/...`)
  rather than relative paths. Fixed `sync-products.cjs` to handle both formats.
- **Fallback order:** `image` (CMS Main Image) > first gallery image > legacy `imagePath`.

### Gallery and Video Support

- Added **Image Gallery** (list of image+caption) and **Videos** (list of video+poster)
  to the CMS config.
- Updated `product.html` with a thumbnail strip below the main image. Clicking a
  thumbnail swaps the main display (image or video).
- Gallery uses `js-yaml` for proper YAML frontmatter parsing (supports lists/objects).

### File Watcher for Auto-Sync

- Added `npm run dev:sync` — uses nodemon to watch `products/*.md` and auto-run
  `sync-products.cjs` on every CMS save.
- Keeps `src/data.js` in sync without manual script runs.

### Per-Category CMS Collections

- Restructured from a single flat "Products" collection into 7 category-specific
  collections: Chokers, Necklaces, Chandeliers, Bracelets, Bangles, Rings, Studs.
- Each collection appears as its own section in the CMS sidebar.
- Files moved back to `products/{category}/{id}.md` (subdirectories).
- Category is now inferred from the directory path in `sync-products.cjs`, not
  from the frontmatter field.
- The CMS editor no longer shows a category selector — it's implicit from which
  collection the product lives in.

### Current Terminal Workflow

| Terminal | Command |
|---|---|
| 1 | `npx decap-server` |
| 2 | `npm run dev` |
| 3 | `npm run dev:sync` |

### Cleanup: Remove Legacy imagePath/videoPath

- Removed `imagePath` and `videoPath` columns from CSV (all image management is
  now CMS-based).
- Removed `imagePath`/`videoPath` from `csv-to-md.cjs` fields.
- Removed `imagePath` fallback from `sync-products.cjs` (relying only on `image`
  and gallery fields).
- **Important caveat:** Running `csv-to-md.cjs` after CMS edits will overwrite
  CMS-managed data (images, gallery, videos). The CSV is now a seed/reference
  file only.

### SEO: JSON-LD + Sitemap

- Added `Organization` schema JSON-LD in `<head>` of `product.html`.
- Added dynamic `Product` schema JSON-LD (name, description, images, category,
  offers/price) to each product page.
- Integrated sitemap generation into `sync-products.cjs` — produces
  `public/sitemap.xml` with 34 URLs (6 static pages, 7 category filters,
  21 product pages). Auto-updated on every sync.

### Known Caveats

- `main` variable name conflicted with page-scoped `main` in product.html gallery
  JS — renamed to `galleryMain`.
- CSV re-import overwrites CMS data — only use `csv-to-md.cjs` for initial bulk import.

### Product Image Folders — Category-Nested Structure

- **Created** 21 product image folders at `public/assets/images/products/{category}/{product-id}/`
  (7 categories × 3 products each).
- **Restructured** 3 existing image sets into the nested convention:
  - `ekta-lineage/` → `bracelets/ekta-lineage/`
  - `maharani-viraasat/` → `necklaces/maharani-viraasat/`
  - `raj-tilak/` → `necklaces/raj-tilak-emerald/` (also renamed to match product ID)
- **Added** `image: "{category}/{product-id}/hero.jpg"` field to all 21 product `.md` frontmatter files.
- **Regenerated** `src/data.js` via `sync-products.cjs` — all 21 products now have populated image paths.
- **Git note**: git auto-detected the moves as renames (100% similarity), preserving history.

### Master Inventory Excel

- Created `product details/master-inventory.xlsx` with 3 sheets:
  - **Sheet 1 — All Inventory**: 119 consolidated items from 5 supplier XLS files with Status/Mapped Product columns.
  - **Sheet 2 — Product Mapping**: 9 website products mapped to inventory tags, showing found/missing status and specs.
  - **Sheet 3 — Missing Tags**: 5 unmatched tags needing sourcing (12725, 12325, 12536, 12316, 12294).
- Extracted real specs for 3 matched pieces from inventory (dynasty-bloom/12695, royal-lace/12509, ruby-aurora/12479).

### House Collection Copy — Inventory-Populated Descriptions

- **Dynasty Bloom**: Updated category to "Emerald, Pearl & Diamond"; description now reads *"33 carats of brilliant diamonds, 44 carats of vivid emeralds, and 26 carats of lustrous pearls converge in an opulent floral garland..."*
- **Royal Lace**: Description now reads *"65 carats of precisely calibrated diamonds set in an intricate openwork lattice..."*
- **Ruby Aurora**: Description now reads *"49 carats of diamonds frame 79 carats of vivid rubies in a composition of ceremonial grandeur..."*
- **Regenerated** `src/data/house-collection.js` via `npm run sync:house`.

### Hero Visual Refinement

- **Reduced title font-size**: `clamp(3.6rem, 9vw, 10.5rem)` → `clamp(2.8rem, 6.5vw, 7.5rem)` (~28% smaller max).
- **Pushed text to bottom**: Changed `.hero` from `place-items: center` → `place-items: end center`;
  `.hero-copy` padding reduced from `7rem 0 5rem` → `0 0 2.5rem`.
- **Merged headline**: "Where Value / Takes Form." → single-line "Where Value Takes Form." (merged two `.split-line` spans).

## 2026-05-29

### CTA Label Consolidation Fixes

- **Home page house collection**: Changed from "WhatsApp Consultation" (button with `data-wa-btn`) to
  `View Full Collection` (`<a>` linking to `/collections.html`).
- **Product page secondary CTA**: Label changed from "WhatsApp Consultation" to "Enquire on WhatsApp",
  keeps the `data-wa-btn` WhatsApp funnel trigger.

### Maharani Cascade Necklace — Hero Product

- Added as a **full-width hero row** at the top of The House Collection on the homepage.
- 3 images at `public/assets/images/collection/celestial-cascade/` (celestial-cascade-1.png, -2.jpg, -3.png).
- **Data source**: Created `src/data/house-collection-entries/celestial-cascade.md` with YAML frontmatter
  (multi-line description using `|` literal block, `isHero: true`).
- **Rendering**: `src/main.js` — extracted `createHouseCard()` from `renderHouseCollection()`;
  hero piece (`isHero: true`) rendered first as `.row-hero` before the regular grid.
- **CSS**: Added `.row-hero` (full-width via `grid-template-columns: 1fr`, 3/2 aspect ratio image,
  larger title, full description with `white-space: pre-line` for paragraph breaks).
- **Build pipeline fix**: `sync-house-collection.cjs` now includes `isHero` field in output.
- **Bug fix**: Sync script treated `data.row = 0` and `data.homepageOrder = 0` as falsy,
  producing `null` and `1` instead. Changed `||` to `!= null` checks.
- **Count updated**: "Eight curated high jewellery masterpieces" → "Nine" in `index.html`.
- **Image fix**: Second image changed from `.png` to `.jpg` — updated markdown entry to match.
- **ID rename**: Directory renamed from `celestial-cascade` to `maharani-cascade` — updated markdown id and image paths to match; renamed markdown file to `maharani-cascade.md`.

### House Collection Layout Rebalance

- **Row layout**: Changed from 1+3+3+2 to **1+2+2+2+2** (hero row + 4 rows of 2 pieces each).
- **Reassigned rows** across 5 markdown files:
  - `imperial-cascade.md`: row 1→2, order 3→1
  - `dynasty-bloom.md`: order 1→2
  - `ruby-aurora.md`: row 2→3, order 2→1
  - `celestial-rain.md`: row 2→3, order 3→2
  - `emerald-reverie.md`: row 3→4, order 2→2
  - `royal-lace.md`: row 3→4, order 1→1

### Card Aspect Ratio

- **Changed** `.house-card-image` from `aspect-ratio: 4/5` to `3/4` (taller display).
- **Max-height** bumped from `600px` to `700px` to avoid cropping on the taller ratio.

### Hero Subtitle Redesign

- **Translucent background**: Added `background: rgba(0,0,0,0.35)` + `backdrop-filter: blur(2px)` on `.hero-subtitle`.
- **Font**: Switched from Manrope 300 → **Italianno** (flowing cursive script) for decorative elegance.
- **Styling**: `letter-spacing: 0.04em` for elongated appearance, white text at 0.88 opacity, inline-block display so the background wraps only the text content.
- **Intermediate font tried**: Alex Brush (too uniformly thick for the "thin and long" request), Italianno selected as thinner naturally.
- **Google Fonts**: Added `Italianno` to the `index.html` font import.

### Hero Title Font-Size Reduction

- **Reduced desktop font-size**: `clamp(3.6rem, 9vw, 10.5rem)` → `clamp(2.8rem, 6.5vw, 7.5rem)`.
- **Pushed text to bottom**: `.hero` from `place-items: center` → `place-items: end center`;
  `.hero-copy` padding `7rem 0 5rem` → `0 0 2.5rem`.
- **Merged headline**: Two `.split-line` spans combined into one —
  "Where Value Takes Form." single line.

### Mobile Button Overlap Fix

- Hero button on mobile overlapped with WhatsApp FAB due to full-width sizing.
- **Fix**: `.hero-actions .button` on ≤640px: `min-height: 2.5rem; padding: 0.5rem 1.25rem;
  width: auto; align-self: flex-start`.

### Hero Title Mobile 3-Line Break Fix

- At smaller widths the title wrapped to 3 lines.
- **Fix**: Mobile font-size reduced from `clamp(3.15rem, 16vw, 4.9rem)` →
  `clamp(2.4rem, 12vw, 3.8rem)`; `max-width: none` on mobile override.

### Desktop Hero Title Max-Width Removal

- `max-width: 12ch` removed from `.hero-title` so desktop displays on one line
  without forced wrapping.

### Video Playback Fallback

- Non-Chrome mobile browsers (Firefox, Samsung Internet) failed to play H.264
  videos due to `moov` atom at end of file (requires full download before playback).
- **JS poster fallback**: `initVideoFallbacks()` in `src/main.js` catches `play()`
  promise rejection and swaps `<video>` to `<img>` with the poster image.
- Also adds a `stalled` event listener as additional trigger.

## 2026-06-01

### Worlds of Giriraj — Full-Screen Scroll-Snap Layout

- **Rewired** `src/pages/collections.js` to render 6 full-screen scroll-snap sections,
  one per collection (Crown → Imperial Cascade, Emerald Court → Emerald Canopy,
  House of Diamonds → Maharani Cascade, Ruby Salon → Ruby Aurora,
  Heritage Atelier → Ceremonial Bloom, Jasmine Atelier → Champagne Bloom).
- **New layout**: Each `.worlds-slide` is a flex column with:
  - `.worlds-media` at 70vh (video/image with gradient overlay)
  - `.worlds-info` panel below (collection name, title, 150-char description excerpt,
    "Explore Collection" button)
- **Per-collection background colors**: Each slide gets a distinct dark tone from
  the brand palette (crown `#1c1814`, emerald-court `#0f1512`,
  house-of-diamonds `#111316`, ruby-salon `#1b1012`, heritage-atelier `#17140e`,
  jasmine-atelier `#141016`). Info panels use slightly lighter variants.
- **"Browse All Collections" button** on homepage (`index.html:315`): changed link
  from `/crown-collection.html` to `worlds-of-giriraj.html`.
- **CSS**: Worlds gallery styles moved to dedicated section in `css/style.css`
  (scroll-snap removed from gallery container; each slide is `min-height: 100vh`).
  Responsive breakpoint at 768px reduces media to 55vh.

### Slideshow Black Frame Fix

- **Root cause**: 8 hero products on the homepage have `trailer` paths but no actual
  video files. The slideshow created a video slide as the first active slide →
  black frame. On every loop wrap-around the dead video slide reactivated briefly.
- **Fix** (`src/main.js:initHouseSlideshow`):
  - On `video.onerror`: marks the slide as `.slide-dead`, hides its dot
  - `goTo()` skips all `.slide-dead` slides via a guard loop before activation
  - `.slide-dead { display: none }` added to both `src/styles.css` and `css/style.css`

### FFmpeg Faststart — All Videos Optimized

- `ffmpeg` installed via `winget install Gyan.FFmpeg` (found at
  `%LOCALAPPDATA%\Microsoft\WinGet\Packages\...\ffmpeg.exe`).
- All 6 site videos processed with `-movflags +faststart -codec copy`:
  - `collections-hero.mp4` (20.5s, 17.7 Mb/s) — hero background
  - `stone-dictates-form.mp4` (6s, 17.1 Mb/s) — editorial section
  - `atelier.mp4` (9.6s, 17.6 Mb/s) — atelier section
  - `Maharani_Cascade-film.mp4` (10s, 17.6 Mb/s) — hero product trailer
  - `hero2.mp4` — already had faststart (secondary hero)
  - `curation.mp4` — already had faststart (curation section)
- **Result**: All 6 verified moov-at-start via binary scan. Firefox, Safari, and
  Samsung Internet can now stream without full download.

## 2026-06-02

### Ambient Music Fix

- **Root cause 1 (404)**: Audio file `Rondo_in_A_Minor.mp3` (4MB) existed in `public/` and `dist/` but site needed redeploy.
- **Root cause 2 (negative volume)**: `fadeVolume` used `requestAnimationFrame` but `stop()` never cancelled it. Stale animation frames continued writing volume after `stop()` ran, causing out-of-range values (-0.0038).
- **Fix**: Added `fadeRafId` tracking + `cancelAnimationFrame` in `stop()`. Added `Math.max(0, Math.min(1, ...))` clamp to volume setter in `fadeVolume`.

### Video Object-Fit Fix

- Homepage slideshow videos used `object-fit: contain` (letterboxed inside card).
- Changed to `object-fit: cover` in both `src/main.js:464` (inline class `object-contain` → `object-cover`) and `src/styles.css:1651` (`.slide video` rule).
- Videos now fill card completely, matching image behavior.

### Sanctum Emerald Images Added

- User added 3 images (`1.png`, `2.png`, `3.jpg`) to `emerald-court/sanctum-emerald/`.
- Renamed to new convention: `sanctum_emerald_NK-10361_hero.png`, `_model.png`, `_atmosphere.jpg`.
- Updated `sanctum-emerald.md` with explicit `images` list.

### Image Naming Convention Rollout (6 products)

- Renamed images for **Royal Edict**, **Regalia Canopy**, **Throne of Light**, **Sanctum Emerald**, **Moonlit Emerald**, and **Verdant Halo** to `{product}_{ref}_{role}.{ext}`.
- Updated all 6 markdown frontmatter files with explicit `images` arrays pointing to new filenames.
- 10 legacy products still use `hero.jpg`/`model.jpg`/`atmosphere.jpg` fallback.
- 23 products remain with empty folders (awaiting user images).

### Image Inventory

| Status | Count |
|--------|-------|
## 2026-06-03

### Mobile Menu Unification

- **Problem**: Homepage used `mobile-menu` + `is-open` class system; collection pages used `mobile-menu-overlay` + `active`. Breakpoint mismatch (1180px vs 1024px).
- **Fix**: Homepage converted to `mobile-menu-overlay` + `active` to match collection pages.
- `index.html`: `class="mobile-menu"` → `class="mobile-menu-overlay"`
- `src/main.js:initMenu()`: all `is-open` → `active` (4 occurrences)
- `src/styles.css`: replaced `.mobile-menu` block with `.mobile-menu-overlay` CSS
- Breakpoint unified to `@media (max-width: 1024px)`
- **Result**: One consistent menu system across all pages.

### Video Error Fallback on Collection Pages

- Added `attachVideoFallback()` to `src/pages/collection-page.js` and `src/pages/collections.js`.
- On video error/stalled/play rejection, the failed `<video>` element is replaced with its poster `<img>`.
- Covers hero row videos + card videos in the hero gallery slideshow.

### Product Image Processing (Jasmine Atelier)

- **Silken Light (T-898)**: 1.png→hero.jpg, 2.png→model.png, 3.jpg→atmosphere.jpg. Added trailer field (`Silken_Light-film.mp4`).
- **Whisper Diamond (T-11011)**: Same 3-image processing + markdown update.
- **Petal Halo (T-1026)**: Same 3-image processing + markdown update.
- **First Light (T-10642)**: Ref corrected from T-10692 to 10642.
- **Ivory Sonata (T-10588)**: 3 images processed + markdown update.

### Row-Single Layout Fix

- Homepage house collection: single-item rows used `row-asymmetric` (2-col grid) → item filled only 1 column.
- Added `row-single` class (`grid-template-columns: 1fr`) for rows with 1 product (`src/main.js:604`, `src/styles.css:1409`).
- Fixes ceremonial-bloom (row 26) and morning-dew (row 30) spanning full width.

### Imperial Dominion Trailer Wired

- Orphaned video `Imperial_Dominion-film.mp4` (26 MB) found at `public/assets/videos/products/`.
- Added `trailer:` field to `src/data/house-collection-entries/imperial-dominion.md`.
- Product has no images folder (empty `images: []` in markdown).

### Worlds of Giriraj Hero Video

- User provided `WORLD-OF-GIRIRAJ-HERO-VIDEO.mp4` (from `generated videos/`).
- Copied to `public/assets/videos/collections/world-of-giriraj-hero.mp4`.
- Replaced static `<img>` with `<video autoplay muted loop playsinline>` in `worlds-of-giriraj.html` hero section.
- Original image retained as fallback poster.

### Hero Gradient Overlays Removed

- Removed all dark gradient/overlay divs from hero sections across 8 pages:
  - `worlds-of-giriraj.html`: `bg-gradient-to-b from-black/60 to-black/80`
  - `crown-collection.html`, `emerald-court.html`, `house-of-diamonds.html`,
    `ruby-salon.html`, `heritage-atelier.html`, `jasmine-atelier.html`, `heritage.html`:
    `bg-black/50`
- Hero videos now display without tint/overlay.

| Products with images (path OK) | 16 |
| Products with images (needs attention) | 0 |
| Products with empty folders | 23 |
| Products with trailer video wired | 12 |
| **Total active products** | **39** |

## 2026-06-26

### SEO Quick Wins — Canonical, Geo, OG:url, Brand Consistency

- **Canonical tags**: Added `<link rel="canonical">` to 8 pages that were missing it (index, worlds-of-giriraj, all 6 collection pages).
- **OG:url fix**: All 6 collection pages had `og:url` pointing to `collections.html?category=...` — corrected to their actual page URLs.
- **Brand suffix**: Standardized title tags from "Giriraj Jewellery" → "House of Giriraj" on bespoke, heritage, contact pages (OG and Twitter tags too).
- **Geo meta**: Added `geo.region=IN-TG`, `geo.placename=Hyderabad, Telangana`, `geo.position`, `ICBM` to all pages (were only on 3).
- **robots.txt sitemap**: Fixed from Vercel staging domain to production (`www.houseofgiriraj.com`).
- **Server redirects**: Added 301 redirects for `signature-collection.html`, `collections.html` → `crown-collection.html` (vercel.json + netlify.toml).
- **Generator**: Updated `generate-collection-pages.mjs` to include canonical, OG:url, geo, OG image, Twitter tags.

### Shimmer Skeleton Loader for Product Cards

- **Problem**: Product cards showed white flash before images loaded (especially on collection pages where cards had no video).
- **CSS**: Added `@keyframes shimmer` animation, `.image-wrapper::after` and `.card-images::after` pseudo-elements with dark gradient sweep.
- **Dark background**: Added `background: #000` to `.card-images` and `video.card-img` to eliminate white flash.
- **JS**: `createHouseCard()` (main.js) and `connectAutoPlay()` (collection-page.js) add `.loaded` class on first image `load`/`error` to remove skeleton.
- **Hero poster**: Extracted exact first video frame via ffmpeg-static as `hero-first-frame.jpg` (1920×1080, 75KB). Replaced Instagram screenshot poster.

### Security Hardening — Full Audit & Fix

- **OAuth (api/oauth.js)**:
  - Fixed `postMessage` wildcard origin `"*"` → restricted to site origin
  - Added CSRF `state` parameter (`crypto.randomUUID()`) to GitHub OAuth flow
  - Fixed Host header injection: uses `VERCEL_URL` env var, not `req.headers.host`
  - Added origin whitelist validation
- **Security headers (vercel.json + netlify.toml)**:
  - Added `Content-Security-Policy` (restricts scripts, styles, fonts, media, connections)
  - Added `Strict-Transport-Security` (HSTS, 1 year, includeSubDomains, preload)
  - Added `Permissions-Policy` (blocks camera, mic, geolocation, FLoC)
  - Added `Cross-Origin-Resource-Policy: same-origin`
  - Added `Cross-Origin-Opener-Policy: same-origin`
  - Added `X-XSS-Protection: 1; mode=block`
- **Analytics (js/analytics.js)**:
  - Removed all PII tracking: no more `name`, `email`, `phone` captured
  - Removed localStorage PII storage (`saveToLocal`, `getLocalLeads`, `clearLocalLeads`)
  - Fixed GA measurement ID placeholder (was hardcoded `"GA_MEASUREMENT_ID"`, now reads from HTML snippet)
  - Removed dead webhook code and silent fetch errors
- **WhatsApp (js/whatsapp.js)**: Removed `userName` from `trackLead()` call — anonymized
- **XSS prevention**: Extended `esc()` sanitization to cover `` ` `` (backtick) and `$` (dollar sign) characters in all 3 files (collection-page.js, house-piece.js, collections.js)
- **Dev server**: Removed `--host 0.0.0.0` from `vite dev` and `vite preview` commands
- **Sitemap**: Removed `/admin/index.html` and legacy `collections.html?category=` URLs from sitemap generation
- **.gitignore**: Added `.env`, `*.log`, `.DS_Store`, `Thumbs.db`
- **robots.txt**: Added `Disallow: /admin/` and `Disallow: /api/`
- **Audit script**: Added `npm run security:audit` to package.json

## 2026-06-26

### Performance Fixes — Video Playback & Poster Images

**Issues reported**: Homepage hero video intermittently goes black; Imperial Cascade video fails to play on worlds-of-giriraj.

**Root causes found & fixed**:

1. **Hero fallback bug** (`src/main.js:initVideoFallbacks()`):
   - The hero-video code path removed the `<video>` element from the DOM *before* inserting the poster image. Since `video.parentNode` became null, the poster `img` was never created — leaving the hero section empty (black).
   - **Fix**: Removed the destructive `.remove()` path. The fallback now directly replaces the video with the poster image in a single step. Reduced-motion/data-saver path now also uses the poster fallback instead of removing the element.

2. **Missing faststart on product trailers** (`public/assets/videos/products/*.mp4`):
   - All 9 product trailer videos (Imperial Cascade, Imperial Dominion, Maharani Cascade, etc.) lacked the `moov` atom at the file beginning. Firefox/Safari require faststart to begin playback before downloading the entire file — without it, these browsers show a black frame until the full 10–27 MB file downloads.
   - **Fix**: Processed all 9 `.mp4` files with `ffmpeg -c copy -movflags +faststart` (stream copy, no quality loss).

3. **Oversized poster images** (`public/assets/images/products/**/hero.jpg`):
   - Several `hero.jpg` poster images were 2.0–2.4 MB despite being only ~1085px wide. These were actually PNG-format files with `.jpg` extension. Slow poster load meant fallback images appeared late.
   - **Fix**: Compressed 6 largest poster images with ffmpeg (resize to 1200px max, JPEG quality 5). Results: 2.3→0.19 MB (imperial-cascade), 2.4→0.35 MB (maharani-veil), 2.0→0.15 MB (dynasty-bloom), 2.5→0.27 MB (forest-reverie), 2.3→0.18 MB (emerald-canopy), 0.5→0.20 MB (imperial-dominion). Average 87% reduction.

4. **Simultaneous autoplay of 6 gallery videos** (`src/pages/collections.js`):
   - All 6 `.worlds-video` elements attempted `play()` simultaneously on page load. Browsers throttle autoplay to 1–2 muted videos; the rest would reject, triggering the fallback unnecessarily.
   - **Fix**: Replaced `autoplay` attribute + `forEach play()` with an IntersectionObserver (threshold 0.4). Videos only attempt playback when their scroll-snap slide enters viewport. Already-played videos are unobserved. Added `preload="metadata"` to page hero background video.

**Files changed**:
- `src/main.js` — Rewrote `initVideoFallbacks()` (fixed hero poster insertion)
- `src/pages/collections.js` — Removed `autoplay` from template, added IntersectionObserver for staggered playback
- `worlds-of-giriraj.html` — Added `preload="metadata"` to hero background video
- `public/assets/videos/products/*.mp4` (9 files) — Faststart flag added
- `public/assets/images/products/*/hero.jpg` (6 files) — Resized and compressed
