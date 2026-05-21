# Giriraj Production Luxury Site

This folder is the deployable production site for Shree Giriraj Gems and Jewels.
It now uses the `production-luxury` homepage direction while preserving the
existing multi-page production funnel.

## Current State

- `index.html` is the luxury Vite homepage ported from `production-luxury/`.
- `collections.html`, `product.html`, `bespoke.html`, `heritage.html`, and
  `contact.html` remain the production funnel pages.
- `src/main.js` and `src/styles.css` power the luxury homepage experience.
- `js/data.js`, `js/ui.js`, `js/whatsapp.js`, and `js/analytics.js` power the
  older production pages and the WhatsApp/analytics funnel.
- `public/assets/` contains the luxury homepage media and responsive image
  variants used by Vite.
- `images/`, `videos/`, and `js/` are copied into `dist/` during build for
  legacy page compatibility.

## Commands

```bash
npm run dev               # Vite dev server (localhost:5173)
npm run dev:sync          # Watches products/*.md → regenerates src/data.js
npm run build
npm run preview
npm run optimize:images   # Generate responsive AVIF/WebP variants
```

PowerShell may block `npm.ps1`; use `cmd /c npm run build` or
`cmd /c npm run dev` when that happens.

## Decap CMS (Admin UI)

The site has Decap CMS at `/admin` for client-friendly product editing.

### Local Development

Run three terminals:

| Terminal | Command |
|---|---|
| 1 | `npx decap-server` |
| 2 | `npm run dev` |
| 3 | `npm run dev:sync` |

Then open `http://localhost:5173/admin/`.

### Collections

Products are organized into 7 category-specific collections in the CMS sidebar:
**Chokers**, **Necklaces**, **Chandeliers**, **Bracelets**, **Bangles**, **Rings**, **Studs**.

Each product has these fields in the editor:
- Product ID, Name, Subcategory, Short Description, Price Range
- Stone, Metal, Weight, Certification
- Featured toggle
- Description (markdown editor)
- Main Image (upload)
- Image Gallery (add multiple images with captions)
- Videos (add multiple videos with poster images)

Images are stored in `public/assets/images/products/`. The path is auto-managed.

### Data Flow

```
CMS edits → products/{category}/{id}.md  (written by Decap CMS)
                              ↓
              sync-products.cjs  (triggered by dev:sync watcher)
                              ↓
                       src/data.js  (read by website pages)
```

### Production Deployment

1. Create a GitHub OAuth App:
   - Homepage URL: `https://houseofgiriraj.vercel.app`
   - Callback URL: `https://houseofgiriraj.vercel.app/api/oauth?provider=github`
2. Set Vercel env vars: `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`
3. Redeploy

### CSV Import

The master catalog is at `product-inventory.csv`. To regenerate all .md files from CSV:

```bash
node scripts/csv-to-md.cjs
node scripts/sync-products.cjs
```

## Routing

The preserved public routes are:

- `/index.html`
- `/collections.html`
- `/product.html?id=<product-id>`
- `/bespoke.html`
- `/heritage.html`
- `/contact.html`

Homepage product links currently point to:

- `/product.html?id=diamond-tennis`
- `/product.html?id=maharani-viraasat`
- `/product.html?id=raj-tilak-emerald`

## Media Notes

The hero and atelier videos have intentionally been restored:

- `public/assets/videos/hero2.mp4` is about 61 MB.
- `public/assets/videos/atelier.mp4` is about 21 MB.

This returns the full luxury motion direction but makes the production bundle
much larger. The homepage still includes optimized image fallbacks and removes
the hero video on mobile, reduced-data, or reduced-motion environments through
`src/main.js`.

## Build Behavior

`vite.config.js` has a small build plugin that copies legacy static folders into
`dist/`:

- `js/`
- `images/`
- `videos/`

Vite warns that non-module scripts are not bundled. That is expected for the
legacy pages; the files are copied as static assets and continue to load by
their existing paths.

## Verification Performed

- `npm run optimize:images`
- `npm run build`
- Route checks for homepage, collections, product, bespoke, heritage, and contact
- Static asset checks for JS, images, and video files
- Local `href`/`src` reachability scan across all public pages

## Known Follow-Ups

- Compress `hero2.mp4` and `atelier.mp4` with FFmpeg or a video tool before final
  deployment if mobile performance becomes a priority.
- Run a browser-based QA pass on desktop and mobile once Chrome, Edge, or
  Playwright is available.
- Run Lighthouse after video compression and deployment.
