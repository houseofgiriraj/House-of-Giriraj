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
npm run dev
npm run build
npm run preview
npm run optimize:images
```

PowerShell may block `npm.ps1`; use `cmd /c npm run build` or
`cmd /c npm run dev` when that happens.

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
