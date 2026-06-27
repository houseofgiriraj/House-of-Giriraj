# House of Giriraj — SEO Content & Technical Implementation Plan

**Period:** June 26 – July 24, 2026 (Month 1)  
**Owner:** Product Team  
**Status:** Living Document (update weekly)

---

## 1. Strategic Overview

| Pillar | Goal | Primary KPI |
|--------|------|-------------|
| **Content** | Publish 5 pillar pages + 10 cluster blog posts to fill the zero-educational-content gap | Organic clicks from non-branded queries |
| **Technical** | Add all 39 high jewellery products to sitemap; fix dynamic meta; deploy FAQ/HowTo schema | Index coverage in GSC |
| **Local** | Dominate "Hyderabad" + jewellery queries via GBP + location content | Local pack impressions |
| **Conversion** | Overhaul bespoke page with process, pricing anchor, portfolio | Custom inquiry form submissions |

---

## 2. Keyword Master List (Curated for House of Giriraj)

### 2A. Bridal — Transactional

Target: Collection Pages + New Bridal Hub (`/bridal-collection.html`)

| Keyword | Est. Vol (IN) | Difficulty | Target Page |
|---------|:-:|:-:|-----------|
| bridal jewellery Hyderabad | 8K–12K/mo | Medium | `/bridal-collection.html` (new) |
| bridal diamond necklace sets Hyderabad | 2K–5K/mo | Low–Med | `/bridal-collection.html` |
| engagement ring Hyderabad | 5K–10K/mo | High | `/engagement-rings.html` (new) |
| South Indian bridal jewellery online | 3K–6K/mo | Medium | `/bridal-collection.html` |
| diamond haram designs with price | 2K–5K/mo | Low | `/bridal-collection.html` |
| polki diamond necklace Hyderabad | 1K–3K/mo | Low | `/crown-collection.html` |
| Telugu bride jewellery collection | 1K–2K/mo | Low | `/bridal-collection.html` |
| bridal choker set Hyderabad | 1K–3K/mo | Low–Med | `/crown-collection.html` |
| diamond necklace for wedding | 5K–10K/mo | High | Bridal Hub + `/house-of-diamonds.html` |
| gold diamond wedding set Hyderabad | 2K–4K/mo | Medium | Bridal Hub |

### 2B. Custom & Bespoke — High Intent

Target: bespoke.html + Blog

| Keyword | Est. Vol | Difficulty | Target Page |
|---------|:-:|:-:|-----------|
| custom engagement ring Hyderabad | 1K–3K/mo | Low | `/bespoke.html` + `/engagement-rings.html` |
| custom real diamond jewelry near me | 500–2K/mo | Low | `/bespoke.html` |
| bespoke jewellery designer Hyderabad | 500–1K/mo | Low | `/bespoke.html` |
| custom made diamond ring Hyderabad | 1K–2K/mo | Low | `/bespoke.html` |
| heirloom jewellery redesign Hyderabad | 200–500/mo | Very Low | `/bespoke.html` + blog |
| custom jewellery from old gold | 1K–2K/mo | Low | Blog cluster |
| personalized engagement ring design | 1K–3K/mo | Medium | `/engagement-rings.html` |
| design your own diamond ring Hyderabad | 300–500/mo | Very Low | `/bespoke.html` |

### 2C. Handmade & Rare — Differentiator

Target: Blog + Product Pages

| Keyword | Est. Vol | Difficulty | Target Page |
|---------|:-:|:-:|-----------|
| handmade diamond jewellery Hyderabad | 1K–2K/mo | Low | Blog + `/heritage-atelier.html` |
| handcrafted bridal jewellery | 2K–4K/mo | Medium | Blog pillar |
| rare gemstone jewellery India | 500–1K/mo | Low | Blog cluster |
| unique diamond engagement rings | 3K–6K/mo | High | `/engagement-rings.html` |
| exclusive jewellery design India | 500–1K/mo | Very Low | `/heritage.html` |
| heritage jewellery collection India | 1K–2K/mo | Low | `/heritage.html` + `/heritage-atelier.html` |
| artisan jewellery Hyderabad | 300–500/mo | Very Low | Blog |

### 2D. Educational — Top of Funnel

Target: Blog

| Keyword | Est. Vol | Difficulty | Target |
|---------|:-:|:-:|-------|
| how to choose bridal jewellery | 5K–10K/mo | Medium | Pillar post |
| diamond buying guide India | 3K–5K/mo | Medium | Pillar post |
| diamond certification GIA IGI India | 1K–3K/mo | Low | Cluster post |
| gold purity guide 22k vs 24k | 2K–4K/mo | Low | Cluster post |
| engagement ring buying guide | 5K–15K/mo | Medium | Pillar post |
| how to clean diamond at home | 3K–10K/mo | Low | Cluster post |
| lab grown vs natural diamond India | 3K–8K/mo | Medium | Cluster post |
| cost of custom engagement ring India | 500–1K/mo | Low | Cluster post |
| how to check diamond quality | 2K–5K/mo | Low | Cluster post |
| bridal jewellery styles explained | 1K–2K/mo | Low | Cluster post |

### 2E. Local — Everywhere

| Keyword | Vol | Target |
|---------|:-:|------|
| jewellery shop in Jubilee Hills | 1K–3K/mo | `/contact.html` + GBP |
| diamond jewellery Banjara Hills | 1K–2K/mo | Collection pages + GBP |
| best jewellers Hyderabad | 3K–5K/mo | `/heritage.html` |
| jewellery store near me Hyderabad | 10K–20K/mo | GBP (not on-page) |
| diamond showroom Hyderabad | 3K–6K/mo | `/contact.html` |

---

## 3. Week-by-Week Implementation

### Week 1 (June 26 – July 2): Foundation & Technical Fixes

| Day | Task | Deliverable | Owner |
|-----|------|-------------|-------|
| D1 | Add all 39 house-collection product URLs to sitemap generation script | Updated `public/sitemap.xml` with 39 missing entries | Dev |
| D1 | Add all `house-piece.html` URLs to sitemap | Sitemap entries for slug-based product pages | Dev |
| D2 | Fix `product.html` dynamic `<title>` to include product name + " — [Category] \| House of Giriraj" | Proper `document.title` + initial meta override | Dev |
| D2 | Fix `house-piece.html` dynamic `<title>` similarly | House piece titles match product naming | Dev |
| D3 | Rewrite all 6 collection page meta descriptions to include "Hyderabad" + "bridal" + category keyword | 6 new meta descriptions deployed | Content |
| D3 | Rewrite bespoke, heritage, contact meta descriptions with local intent keywords | 3 new meta descriptions deployed | Content |
| D4 | Create `/faq.html` page with FAQ schema (12–15 common Q&As) | Published `/faq.html` in sitemap | Content + Dev |
| D4 | Add FAQ schema JSON-LD to `bespoke.html` (custom process questions) | Bespoke with FAQ rich results | Dev |
| D5 | Add HowTo schema to `bespoke.html` (step-by-step design process) | HowTo rich result for custom workflow | Dev |
| D5 | Add FAQ schema to `product.html` (dynamic, per-product) | Each product can surface FAQ in SERP | Dev |

**Week 1 Verification:**
- [ ] GSC shows all 66+ product URLs indexed (27 legacy + 39 high jewellery)
- [ ] Dynamic title renders correctly on sample product pages
- [ ] FAQ schema validates in Rich Results Test
- [ ] Sitemap passes W3C XML validation

### Week 2 (July 3 – July 9): Content Infrastructure Launch

| Day | Task | Deliverable |
|-----|------|-------------|
| D6 | Set up `/journal/` directory structure and routing in `vercel.json` / `netlify.toml` | `/journal/` path resolves |
| D6 | Create `scripts/generate-journal-index.cjs` — auto-generates `/journal/index.html` from markdown posts | Build pipeline ready |
| D7–8 | **Publish Pillar 1:** *"The Complete Bridal Jewellery Guide for Telugu Weddings"* (3K+ words) | `/journal/bridal-jewellery-guide.html` |
| D7–8 | Include 2 comparison tables (Choker vs Haaram, Traditional vs Modern), FAQ at bottom, CTAs → Collection pages | — |
| D9–10 | **Publish Pillar 2:** *"The Ultimate Diamond Buying Guide for Hyderabad Brides"* (3K+ words) | `/journal/diamond-buying-guide.html` |
| D9–10 | Include diamond shape comparison table, 4Cs breakdown, certification guide, pricing anchors | — |
| D10 | Add internal links from relevant collection pages → both pillar posts | All collection pages link to journal |
| D11 | **Publish Cluster 1:** "Natural Diamonds vs Lab-Grown: What Hyderabad Brides Need to Know" | `/journal/natural-vs-lab-grown-diamonds.html` |
| D12 | **Publish Cluster 2:** "Bridal Choker vs Haaram: Choosing for Your Wedding Ceremony" | `/journal/choker-vs-haaram.html` |
| D12 | Update sitemap generation to include all `/journal/*` URLs | Journal pages in sitemap |

**Week 2 Verification:**
- [ ] Journal section live with 2 pillar posts + 2 cluster posts
- [ ] All journal posts linked from relevant collection pages
- [ ] Blog sitemap entries indexed in GSC within 48h
- [ ] Internal link graph established (collection → journal → CTA)

### Week 3 (July 10 – July 16): Custom & Bespoke Transformation

| Day | Task | Deliverable |
|-----|------|-------------|
| D13–14 | **Publish Pillar 3:** *"The Complete Guide to Custom Engagement Rings in Hyderabad"* (2.5K+ words) | `/journal/custom-engagement-rings-guide.html` |
| D13–14 | Include: design process step-by-step, timeline (4–8 weeks), pricing ranges (₹X–₹Y), material options, stone selection | — |
| D15 | **Publish Cluster 3:** "How Custom Jewellery Design Works: From Sketch to Finished Piece" | `/journal/custom-jewellery-process.html` |
| D15 | Embed process photos or CAD render timeline | — |
| D16 | **Overhaul bespoke.html:** Add ₹XX,XXX starting price anchor, 6-piece portfolio gallery, step-by-step wireframe, testimonial carousel, intake form | `/bespoke.html` redesigned |
| D16 | Add Product + FAQ + HowTo schema to `/bespoke.html` | Rich result eligibility |
| D17 | **Publish Cluster 4:** "Heirloom Jewellery: Redesigning Family Diamonds for a New Generation" | `/journal/heirloom-redesign.html` |
| D18 | **Publish Cluster 5:** "NRI Bridal Jewellery Shopping: Complete Guide from Hyderabad" | `/journal/nri-bridal-shopping.html` |
| D19 | Add internal links: bespoke page → all custom journal posts + vice versa | Bi-directional link cluster |
| D19 | Create Google Business Profile posts linking to bespoke page + custom guide | 3 GBP posts published |

**Week 3 Verification:**
- [ ] Bespoke page conversion elements live (price anchor, portfolio, intake form)
- [ ] 5 custom-related journal posts live with bi-directional links
- [ ] GBP posts published with CTAs
- [ ] Rich result validation for bespoke page

### Week 4 (July 17 – July 24): Authority, Local & Handmade

| Day | Task | Deliverable |
|------|------|-------------|
| D20–21 | **Publish Pillar 4:** *"The Art of Handmade Diamond Jewellery: A Hyderabad Tradition"* (2.5K+ words) | `/journal/handmade-jewellery-guide.html` |
| D20–21 | Include: artisan process, heritage of Hyderabad jewellery, what distinguishes handmade from machine-made | — |
| D22 | **Publish Cluster 6:** "What Makes Handmade Jewellery Different from Machine-Made" | `/journal/handmade-vs-machine-jewellery.html` |
| D22 | **Publish Cluster 7:** "Gold Purity Guide: 22K vs 24K vs 18K for Bridal Jewellery" | `/journal/gold-purity-guide.html` |
| D23 | **Publish Cluster 8:** "Rare Gemstones of India: A Collector's Guide to Unique Pieces" | `/journal/rare-gemstones-india.html` |
| D23 | **Publish Cluster 9:** "How to Clean Diamond Jewellery at Home (South Indian Jewellery Care)" | `/journal/diamond-jewellery-care.html` |
| D24 | **Publish Cluster 10:** "Engagement Ring Budgeting: What You Get for ₹50K, ₹1L, ₹2L, ₹5L" | `/journal/engagement-ring-budgeting.html` |
| D24 | **Create Local SEO pages:** Audit GBP, update GBP categories (add "Custom Jeweler", "Diamond Dealer"), add location-specific GBP posts | GBP fully optimized |
| D25 | **Publish Pillar 5:** *"The Complete Engagement Ring Buying Guide"* (targeting `/engagement-rings.html` as standalone page) | `/engagement-rings.html` live |
| D25 | Add BreadcrumbList + Product schema to engagement-rings.html | Rich result eligibility |
| D26 | **Final internal link pass:** Every collection page links to relevant journal posts, every journal post links back to 1–2 collection + bespoke pages | Full internal link mesh |
| D26 | Add `Last-Modified` headers to sitemap entries for journal posts | Freshness signal |
| D27 | **Month 1 Review:** GSC performance check, ranking movement, impressions growth | Written summary |

**Week 4 Verification:**
- [ ] 5 pillar pages + 10 cluster posts published (15 total content pieces)
- [ ] Bespoke page fully overhauled with schema + conversion elements
- [ ] Engagement-rings.html standalone page live
- [ ] GBP categories/services fully matching custom + bridal queries
- [ ] Full internal link matrix operational

---

## 4. Schema & Structured Data Rollout

| Schema Type | Pages | When | Effect |
|-------------|-------|------|--------|
| FAQPage | `/faq.html` | W1 | AI Overview eligible for Q&A |
| FAQPage | `bespoke.html` | W1 | FAQ rich result in SERP |
| HowTo | `bespoke.html` | W1 | Step-by-step result for "how to design custom ring" |
| FAQPage | `product.html` (dynamic) | W1 | Per-product FAQs surface in search |
| Article | All `/journal/*` posts | W2–4 | Rich result eligibility, AI Overview citation |
| BreadcrumbList | `/engagement-rings.html` | W4 | Breadcrumb in SERP |
| Product + Offer | `/engagement-rings.html` | W4 | Price + availability in SERP |
| LocalBusiness | All pages (audit existing) | W1 | Ensure geo + hours + category accuracy |

---

## 5. Sitemap Renovation

**Current:** ~27 URLs, only legacy products  
**Target:** 60+ URLs

| URL Group | Count | Priority | Frequency |
|-----------|:-:|:-:|:-:|
| Static pages (index, worlds, collections, etc.) | 13 | 1.0–0.7 | weekly |
| Legacy product.html?id= (16 products) | 16 | 0.8 | weekly |
| **High jewellery product.html?id= (39 pieces)** | **39** | **0.8** | **weekly** |
| house-piece.html?id= (39 pieces) | 39 | 0.7 | weekly |
| journal/ posts (ramp up) | 5–15 | 0.6 | monthly |
| faq.html | 1 | 0.4 | monthly |
| engagement-rings.html | 1 | 0.8 | weekly |

**Implementation:** Update `scripts/sync-products.cjs` (or create `scripts/generate-sitemap.cjs`) to:
1. Read `src/data/house-collection.js` product slugs
2. Append `product.html?id={slug}` and `house-piece.html?id={slug}` for each
3. Append `/journal/{slug}.html` entries (read from journal content directory)
4. Set correct `<lastmod>` based on file mtime
5. Output to `public/sitemap.xml`

---

## 6. Blog Infrastructure

### Directory Structure
```
production/
├── journal/
│   ├── index.html              # Auto-generated from scripts/generate-journal-index.cjs
│   ├── bridal-jewellery-guide.html
│   ├── diamond-buying-guide.html
│   ├── custom-engagement-rings-guide.html
│   ├── handmade-jewellery-guide.html
│   ├── natural-vs-lab-grown-diamonds.html
│   └── ... (10+ cluster posts)
└── scripts/
    ├── generate-journal-index.cjs   # Reads journal/*.html frontmatter → generates index
    └── generate-sitemap.cjs         # Updated to include journal + all products
```

### Each Journal Post Template
```html
<!DOCTYPE html>
<html>
<head>
  <title>[Post Title] | House of Giriraj</title>
  <meta name="description" content="[150-160 char with keyword]">
  <link rel="canonical" href="https://www.houseofgiriraj.com/journal/[slug].html">
  <meta property="og:title" content="...">
  <meta property="og:description" content="...">
  <meta property="og:url" content="...">
  <meta property="article:published_time" content="2026-07-04">
  <meta property="article:author" content="House of Giriraj">
  <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"Article","headline":"...","datePublished":"...","author":{"@type":"Organization","name":"House of Giriraj"}}
  </script>
  <!-- Global CSS link -->
</head>
<body>
  <!-- Site nav + breadcrumb: Home > Journal > Post Title -->
  <!-- Content sections with H2/H3 containing target keywords -->
  <!-- Comparison tables where relevant -->
  <!-- FAQ section at bottom with schema -->
  <!-- Author bio + CTA footer (book consultation / view collection) -->
</body>
</html>
```

### Navigation Update
- Add "Journal" link to site nav (after Worlds of Giriraj)
- Footer: "Resources" section with links to Diamond Guide, Care Guide, FAQ

---

## 7. Performance Benchmarks (Month 1 Targets)

| Metric | Current | Month 1 Target |
|--------|:-:|:-:|
| Indexed pages | ~27 | 60+ |
| Non-branded organic clicks (monthly) | *(baseline)* | +40% |
| Journal posts published | 0 | 15 |
| Sitemap URLs | 27 | 60+ |
| Pages with FAQ/HowTo schema | 0 | 5+ |
| GBP posts published (30-day) | 0 | 6 |
| Custom form submissions | *(baseline)* | +20% |
| Keywords ranking in top 30 | *(baseline)* | +50 new |

---

## 8. Dependencies & Risks

| Risk | Likelihood | Mitigation |
|------|:--:|-----------|
| Video-heavy pages slow Core Web Vitals | Medium | Lazy-load below-fold, preload hero poster, consider video compression |
| CMS (Decap) doesn't support journal posts | Medium | Generate journal posts as static HTML files, not through CMS |
| Product.js data changes need sitemap rebuild | Low | Automate sitemap generation in build pipeline (`npm run build` triggers it) |
| Blog content quality inconsistent | Low | Use templates, SEO checklist per post, review before publish |
| Competitor response (Tanishq, Tyaani) | High | Focus on long-tail + custom + local where national brands can't compete |

---

## 9. Weekly Review Checklist

Copy and update this section each week.

### Week 1 — Due July 2
- [ ] Sitemap updated with all 39 product URLs
- [ ] `product.html` dynamic title fixed
- [ ] 6 collection page meta descriptions rewritten
- [ ] `/faq.html` created with FAQ schema
- [ ] FAQ + HowTo schema added to `bespoke.html`
- [ ] GSC indexed URL count baseline recorded: _____
- [ ] Non-branded clicks baseline: _____

### Week 2 — Due July 9
- [ ] `/journal/` directory live
- [ ] Pillar 1 (Bridal Guide) published
- [ ] Pillar 2 (Diamond Buying Guide) published
- [ ] Cluster 1 (Natural vs Lab) published
- [ ] Cluster 2 (Choker vs Haaram) published
- [ ] Internal links added from collection pages
- [ ] Journal URLs added to sitemap

### Week 3 — Due July 16
- [ ] Pillar 3 (Custom Engagement Rings Guide) published
- [ ] Cluster 3 (Custom Jewellery Process) published
- [ ] `bespoke.html` overhauled
- [ ] Cluster 4 (Heirloom Redesign) published
- [ ] Cluster 5 (NRI Shopping Guide) published
- [ ] 3 GBP posts published

### Week 4 — Due July 24
- [ ] Pillar 4 (Handmade Guide) published
- [ ] Pillar 5 (Engagement Ring Buying Guide + page) published
- [ ] Clusters 6–10 published
- [ ] `/engagement-rings.html` live with schema
- [ ] GBP fully optimized
- [ ] Full internal link mesh operational
- [ ] Month 1 review summary written

---

**Living Document** — Update this file every Friday with progress, blockers, and adjusted targets.
