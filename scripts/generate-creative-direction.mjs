import XLSX from "xlsx";

// ──────────────────────────────────────────────
// HELPER: prompt map keyed by tag
// ──────────────────────────────────────────────
// For each product: { archive, model, atmosphere }
const promptMap = {};

function set(tag, archive, model, atmosphere) {
  promptMap[tag] = { archive, model, atmosphere };
}

// ===== CROWN COLLECTION =====
set("NK-12384", "Cleaned original — black background, serial removed, consistent grading.",
  "Ultra-luxury editorial portrait of elegant South Asian female model wearing attached NK-12384 Imperial Dominion necklace as dominant focal point, regal posture, couture black velvet or deep sapphire gown with clean neckline, dramatic palace lighting inspired by royal portraiture, poised commanding expression, museum-grade jewellery realism, Cartier and high jewellery editorial aesthetic, photorealistic skin and gemstone detailing, 85mm lens, shallow depth of field, 8k",
  "Luxury atmospheric photography of attached NK-12384 high jewellery necklace displayed within grand palace-inspired environment, black velvet and carved royal stone textures, dramatic chandelier and candle-inspired lighting, premium diamond and gemstone brilliance, cinematic shadows, museum-grade presentation, rich black and antique gold palette, royal architectural mood, photorealistic jewellery detailing, fullscreen 16:9 luxury campaign image, 8k");

set("NK-12383", "Cleaned original — black background, serial removed, consistent grading.",
  "Luxury fashion editorial portrait of sophisticated South Asian female model wearing attached NK-12383 Royal Edict necklace, regal posture and direct elegant gaze, couture black or sapphire silk styling, dramatic Rembrandt palace lighting, necklace dominating composition, museum-grade jewellery realism, Vogue jewellery campaign aesthetic, photorealistic luxury beauty, 8k",
  "Luxury atmospheric jewellery photography of attached NK-12383 necklace displayed within royal court environment, black velvet and dark carved textures, candlelit palace reflections, premium gemstone and diamond brilliance, dramatic cinematic shadows, restrained luxury composition, museum exhibition atmosphere, royal mood, photorealistic craftsmanship, 16:9, 8k");

set("NK-1691", "Cleaned original — black background, serial removed, consistent grading.",
  "Ultra-luxury editorial portrait of elegant South Asian female model wearing attached NK-1691 Throne of Light necklace, couture black or deep sapphire velvet gown, cinematic royal portrait lighting, poised dignified expression, jewellery commanding visual dominance, inspired by royal Indian portraiture and Cartier high jewellery campaigns, photorealistic luxury realism, 8k",
  "Luxury atmospheric product photography of attached NK-1691 heritage-inspired crown necklace displayed within palace throne environment, black velvet pedestal, antique gold and carved royal textures, cinematic chandelier lighting, museum-quality jewellery presentation, dramatic shadows and rich atmosphere, premium gemstone realism and craftsmanship detailing, fullscreen 16:9, 8k");

set("NK-12692", "Cleaned original — black background, serial removed, consistent grading.",
  "Luxury editorial portrait of elegant South Asian female model wearing attached NK-12692 Regalia Canopy necklace, couture black or sapphire silk gown, royal posture and dignified gaze, cinematic palace lighting, necklace fully visible and dominant, photorealistic jewellery craftsmanship and luxury beauty, Cartier campaign aesthetic, 8k",
  "Luxury atmospheric jewellery photography of attached NK-12692 necklace displayed in royal ceremonial environment, black velvet and carved palace textures, dramatic chandelier-inspired lighting, cinematic gemstone reflections and premium diamond sparkle, museum exhibition atmosphere, rich black and antique gold palette, 16:9, 8k");

set("CH-12316", "Cleaned original — black background, serial removed, consistent grading.",
  "High fashion luxury jewellery campaign, Indian model wearing elaborate emerald diamond necklace with cascading architecture, sculptural styling, dark background, couture black silk outfit, dramatic side lighting, luxury magazine editorial, powerful posture, realistic diamonds, Cartier high jewellery aesthetic, cinematic luxury photography, ultra realistic, 8k",
  "Architectural emerald and diamond necklace placed over black lacquer and dark stone surfaces, cinematic reflections, luxury still life photography, emerald gemstone highlights, museum grade jewellery presentation, premium editorial atmosphere, ultra realistic, 8k");

set("H-12695", "Cleaned original — black background, serial removed, consistent grading.",
  "Luxury jewellery campaign featuring emerald floral necklace on elegant Indian couture model, graceful posture, premium fashion editorial, black silk styling, sophisticated beauty photography, cinematic luxury lighting, ultra realistic gemstones and diamonds, magazine cover quality, 8k",
  "Emerald floral high jewellery necklace on black marble with soft botanical shadows, luxury jewellery still life, cinematic emerald reflections, premium editorial composition, ultra realistic, 8k");

set("H-12294", "Cleaned original — black background, serial removed, consistent grading.",
  "Maharani inspired luxury jewellery editorial, Indian royal model wearing layered diamond necklace with emerald centerpiece, vintage palace mood, subtle regal styling, dark velvet background, couture elegance, cinematic luxury lighting, high jewellery campaign, ultra realistic, Vogue Arabia style, 8k",
  "Historic royal jewellery presentation, emerald diamond necklace over dark velvet and antique carved surface, palace inspired atmosphere, candle inspired highlights, museum luxury photography, rich shadows, ultra realistic diamonds, 8k");

// ===== EMERALD COURT =====
set("NK-12503", "Cleaned original — black background, serial removed, consistent grading.",
  "Ultra-luxury editorial portrait of elegant South Asian female model wearing attached NK-12503 Emerald Reverie necklace as dominant focal point, regal posture, deep confident gaze, couture black or emerald velvet gown with refined neckline, cinematic Rembrandt lighting, emerald stones glowing richly against warm skin tones, luxury palace atmosphere, inspired by Cartier and Graff high jewellery campaigns, dramatic yet restrained styling, ultra detailed skin, soft premium shadows, museum-grade gemstone detailing, photorealistic, Vogue jewellery campaign quality, 85mm lens, shallow depth of field, necklace perfectly visible and centered, 8k, vertical composition",
  "Luxury atmospheric product photography of the attached NK-12503 emerald and diamond necklace displayed within a dark royal environment, black velvet surface with subtle folds, emerald gemstones glowing with rich saturated green luminosity, dramatic museum spotlighting, soft palace shadows, premium diamond sparkle and realistic gemstone refraction, cinematic haze, refined black and charcoal palette with subtle antique gold accents, inspired by Cartier high jewellery and royal Indian interiors, centered composition, minimal but emotionally rich luxury environment, photorealistic, ultra detailed gemstones, macro-level texture, 8k, fullscreen 16:9 luxury website hero image");

set("NK-12493", "Cleaned original — black background, serial removed, consistent grading.",
  "High jewellery editorial portrait of sophisticated South Asian female model wearing attached NK-12493 Verdant Halo necklace, emerald gemstones and diamonds as dominant visual focus, couture styling inspired by royal Indian eveningwear, poised expression, palace lighting, subtle cinematic shadows, luxurious black and emerald palette, museum-grade jewellery realism, Vogue luxury campaign aesthetic, ultra refined beauty styling, photorealistic, 85mm lens, shallow depth of field, necklace fully visible, 8k",
  "Luxury atmospheric product photography of attached NK-12493 emerald necklace displayed within temple-inspired royal environment, black velvet pedestal, carved stone and subtle architectural backdrop, rich emerald center stones illuminated by dramatic cinematic lighting, soft incense-like haze, premium diamond reflections, dark emerald and charcoal atmosphere, restrained luxury composition, museum exhibition mood, photorealistic gemstone refraction, ultra detailed craftsmanship, centered composition, 16:9, luxury maison campaign, 8k");

set("NK-12530", "Cleaned original — black background, serial removed, consistent grading.",
  "Ultra-luxury editorial portrait of South Asian female model wearing attached NK-12530 Moonlit Emerald necklace, emerald gemstones glowing under cinematic moonlit lighting, sophisticated black couture gown, graceful posture, romantic yet powerful expression, high jewellery campaign inspired by Cartier and Graff editorials, ultra detailed gemstone realism, premium beauty photography, shallow depth of field, necklace dominant and perfectly visible, 8k",
  "Luxury atmospheric photography of attached NK-12530 emerald and diamond necklace placed within moonlit royal setting, black velvet and subtle reflective stone textures, cool cinematic moonlight mixed with soft warm highlights, premium emerald glow and diamond brilliance, elegant minimal luxury composition, refined palace darkness, photorealistic gemstone detailing, atmospheric haze, luxury jewellery editorial style, centered composition, 16:9, 8k");

set("NK-10361", "Cleaned original — black background, serial removed, consistent grading.",
  "Luxury campaign portrait of elegant South Asian female model wearing attached NK-10361 Sanctum Emerald necklace, emerald pendant illuminated dramatically against couture black gown, poised regal expression, cinematic palace mood, premium gemstone realism, Vogue jewellery editorial quality, ultra detailed skin and jewellery, shallow depth of field, necklace perfectly visible and centered, 8k",
  "Luxury atmospheric jewellery photography of attached NK-10361 emerald pendant necklace displayed in sacred royal setting, black velvet with soft folds, subtle incense haze, emerald centerpiece glowing richly, cinematic spotlighting, dark palace background with restrained gold accents, photorealistic gemstone realism, museum-grade detailing, premium luxury composition, 16:9, 8k");

set("ER-12496", "Cleaned original — black background, serial removed, consistent grading.",
  "Ultra-luxury jewellery campaign portrait of South Asian female model wearing attached ER-12496 Emerald Chamber earrings, earrings dominant focal point with hair elegantly styled back, emerald gemstones illuminated dramatically, couture black or emerald styling, cinematic palace lighting, sophisticated gaze, Cartier and Graff editorial inspiration, photorealistic gemstone detailing, Vogue campaign quality, 8k",
  "Luxury atmospheric product photography of attached ER-12496 emerald earrings displayed within dark royal chamber environment, black velvet pedestal, dramatic spotlighting, emerald stones glowing vividly with premium gemstone realism, subtle carved palace backdrop, cinematic haze, refined luxury composition, museum exhibition mood, photorealistic diamonds and emerald refraction, 16:9, 8k");

set("CH-12325", "Cleaned original — black background, serial removed, consistent grading.",
  "Ultra luxury high jewellery editorial campaign, Indian couture model wearing a massive emerald and diamond statement necklace, emerald green gemstone high jewellery, regal expression, subtle makeup, black couture gown, dark studio background, Cartier and Bvlgari campaign level photography, cinematic lighting, shallow depth of field, diamonds sparkling naturally, luxury fashion magazine aesthetic, ultra realistic, 8k, no extra jewellery, focus on necklace, premium editorial styling",
  "Emerald and diamond high jewellery necklace displayed inside a luxury museum vault environment, black marble pedestal, soft spotlight, subtle emerald reflections, cinematic shadows, ultra premium jewellery still life, Sotheby's auction aesthetic, dark luxury atmosphere, realistic diamonds and emerald glow, macro luxury photography, 8k");

set("NK-12536", "Cleaned original — black background, serial removed, consistent grading.",
  "Bridal luxury high jewellery campaign, elegant Indian model wearing emerald diamond necklace, emotional and graceful expression, couture bridal styling, cinematic soft lighting, premium editorial photography, realistic gemstones and diamonds, luxury fashion campaign, ultra realistic, 8k",
  "Emerald bridal necklace displayed over black velvet and soft emerald reflections, luxury bridal jewellery still life, cinematic premium atmosphere, museum level jewellery photography, ultra realistic, 8k");

// ===== HOUSE OF DIAMONDS =====
set("NK-12725", "Cleaned original — black background, serial removed, consistent grading.",
  "Ultra-luxury editorial portrait of elegant South Asian female model wearing attached NK-12725 Celestial Rain diamond necklace as dominant focal point, couture black velvet gown with clean neckline, cinematic opera lighting, diamonds glowing like constellations, poised regal expression, Vogue jewellery campaign aesthetic, museum-grade diamond realism, photorealistic skin and lighting, 85mm lens, shallow depth of field, necklace perfectly visible, 8k",
  "Luxury atmospheric photography of attached NK-12725 Celestial Rain diamond necklace displayed within dark museum-inspired environment, black velvet pedestal with subtle reflective surfaces, diamonds illuminated like suspended starlight, cinematic spotlighting and refined shadows, premium diamond refraction and brilliance, black and silver palette, elegant minimal luxury composition, inspired by Graff and Cartier high jewellery campaigns, atmospheric haze, photorealistic macro detailing, fullscreen 16:9, 8k");

set("NK-12585", "Cleaned original — black background, serial removed, consistent grading.",
  "Ultra-luxury fashion campaign portrait of South Asian female model wearing attached NK-12585 Diamond Tempest necklace, diamonds cascading across neckline with dramatic sparkle, couture black evening gown, cinematic lighting inspired by opera interiors, confident poised gaze, Vogue and Graff jewellery campaign quality, photorealistic luxury beauty, 8k",
  "Luxury atmospheric product photography of attached NK-12585 diamond necklace displayed in dark royal gallery environment, black velvet and polished obsidian textures, dramatic spotlighting creating waterfall-like diamond reflections, rich silver highlights, cinematic shadows and museum atmosphere, photorealistic diamond sparkle and macro detailing, Graff high jewellery campaign aesthetic, centered composition, fullscreen 16:9, 8k");

set("NK-12415", "Cleaned original — black background, serial removed, consistent grading.",
  "Luxury editorial portrait of sophisticated South Asian female model wearing attached NK-12415 Winter Halo necklace, diamonds glowing under cool cinematic lighting, refined couture styling, serene elegant expression, luxury campaign inspired by Cartier and Harry Winston editorials, ultra detailed jewellery realism, shallow depth of field, 8k",
  "Luxury atmospheric photography of attached NK-12415 diamond necklace displayed within icy black environment, black velvet pedestal with subtle crystal reflections, cool silver lighting mixed with dramatic shadows, diamonds sparkling like frozen light, minimalist luxury composition, photorealistic gemstone realism, museum exhibition mood, 16:9, 8k");

set("NK-12528", "Cleaned original — black background, serial removed, consistent grading.",
  "High jewellery editorial portrait of South Asian female model wearing attached NK-12528 Symphony of Light necklace, perfectly balanced diamond geometry dominating composition, couture black gown, calm confident posture, cinematic luxury lighting, photorealistic jewellery realism, Vogue jewellery campaign quality, 8k",
  "Luxury atmospheric product photography of attached NK-12528 diamond necklace displayed in elegant black gallery environment, geometric lighting and soft reflections emphasizing symmetry, premium diamond sparkle and realistic light refraction, restrained luxury palette of black, silver and charcoal, cinematic luxury atmosphere, photorealistic detailing, fullscreen 16:9, 8k");

set("NK-12505", "Cleaned original — black background, serial removed, consistent grading.",
  "Luxury editorial portrait of refined South Asian female model wearing attached NK-12505 Quiet Majesty necklace, clean black couture styling, understated beauty, diamonds as elegant focal point, cinematic soft lighting, premium luxury campaign aesthetic, photorealistic jewellery realism, Vogue quality, 8k",
  "Luxury atmospheric photography of attached NK-12505 diamond necklace displayed within minimalist palace-inspired environment, black velvet and dark reflective stone textures, restrained spotlighting emphasizing clean brilliance, premium diamond sparkle, modern luxury mood inspired by Cartier and contemporary jewellery maisons, photorealistic macro detailing, 16:9, 8k");

set("NK-12100", "Cleaned original — black background, serial removed, consistent grading.",
  "Ultra-luxury editorial portrait of South Asian female model wearing attached NK-12100 Opera Nocturne necklace, dramatic opera-house lighting, couture black eveningwear, confident and elegant expression, diamonds dominating visual composition, photorealistic luxury campaign, Vogue jewellery editorial quality, 8k",
  "Luxury atmospheric product photography of attached NK-12100 diamond necklace displayed in opera-inspired royal interior, black velvet and subtle gilded detailing, dramatic spotlighting, premium diamond reflections and cinematic shadows, elegant theatre mood, Graff and high jewellery campaign inspiration, museum-quality gemstone realism, fullscreen 16:9, 8k");

set("ER-12508", "Cleaned original — black background, serial removed, consistent grading.",
  "Ultra-luxury jewellery campaign portrait of elegant South Asian female model wearing attached ER-12508 Starlit Reverence earrings, hair styled back, diamonds glowing under cinematic palace lighting, refined couture styling, confident sophisticated gaze, Vogue jewellery campaign quality, photorealistic beauty and gemstone realism, 8k",
  "Luxury atmospheric photography of attached ER-12508 diamond earrings displayed within dark celestial environment, black velvet pedestal and subtle reflective surfaces, diamonds illuminated like stars, cinematic luxury lighting, museum exhibition mood, premium sparkle and realistic diamond refraction, minimal luxury composition, 16:9, 8k");

// ===== RUBY SALON =====
set("NK-12479", "Cleaned original — black background, serial removed, consistent grading.",
  "Ultra-luxury editorial portrait of elegant South Asian female model wearing attached NK-12479 Ruby Aurora necklace as dominant focal point, deep burgundy or black couture silk gown, cinematic Rembrandt lighting, ruby gemstones glowing richly against warm luminous skin, poised regal expression, luxury palace atmosphere, inspired by Bvlgari and Cartier high jewellery campaigns, photorealistic jewellery realism, Vogue campaign quality, 85mm lens, shallow depth of field, necklace fully visible, 8k",
  "Luxury atmospheric photography of attached NK-12479 ruby and diamond necklace displayed within dark royal salon environment, deep burgundy velvet and black lacquer surfaces, cinematic candle-inspired spotlighting, premium ruby glow with realistic gemstone depth, diamonds sparkling subtly, rich wine and charcoal palette, museum-grade luxury atmosphere, inspired by Bvlgari and high jewellery editorial campaigns, photorealistic gemstone refraction, elegant centered composition, fullscreen 16:9, 8k");

set("NK-12755", "Cleaned original — black background, serial removed, consistent grading.",
  "Luxury fashion editorial portrait of South Asian female model wearing attached NK-12755 Crimson Dynasty necklace, rich burgundy couture gown with elegant neckline, dramatic palace lighting, confident regal posture, ruby gemstones dominating composition with premium brilliance, Vogue Arabia luxury jewellery campaign aesthetic, photorealistic beauty and gemstone realism, 8k",
  "Luxury atmospheric product photography of attached NK-12755 ruby and diamond necklace displayed in grand royal salon setting, deep crimson velvet, candlelit reflections, antique gold accents and dramatic palace shadows, premium ruby glow and realistic gemstone sparkle, cinematic luxury atmosphere, museum exhibition quality, photorealistic macro detailing, fullscreen 16:9, 8k");

set("NK-12373", "Cleaned original — black background, serial removed, consistent grading.",
  "Ultra-luxury jewellery campaign portrait of elegant South Asian female model wearing attached NK-12373 Velvet Ember necklace, burgundy or black couture silk styling, soft dramatic lighting, emotionally magnetic expression, ruby gemstones glowing richly, luxury editorial atmosphere, photorealistic jewellery detailing, Vogue jewellery campaign quality, shallow depth of field, 8k",
  "Luxury atmospheric jewellery photography of attached NK-12373 ruby and diamond necklace displayed over dark velvet and reflective burgundy surfaces, candle-inspired cinematic lighting, premium ruby gemstone glow, subtle haze and dramatic shadows, intimate luxury mood, inspired by Bvlgari and royal jewellery editorials, photorealistic gemstone realism, elegant 16:9 composition, 8k");

set("ER-12431", "Cleaned original — black background, serial removed, consistent grading.",
  "Ultra-luxury jewellery campaign portrait of sophisticated South Asian female model wearing attached ER-12431 Rose Sovereign earrings, hair styled elegantly away from face, burgundy couture styling, dramatic cinematic lighting, ruby gemstones illuminated richly, poised romantic expression, Vogue jewellery editorial aesthetic, photorealistic gemstone and beauty realism, 8k",
  "Luxury atmospheric photography of attached ER-12431 ruby and diamond earrings displayed within vintage royal environment, dark burgundy velvet and antique reflective textures, cinematic candle lighting, premium ruby sparkle and realistic gemstone depth, museum-style jewellery presentation, elegant luxury composition, Bvlgari and high jewellery editorial inspiration, fullscreen 16:9, 8k");

set("CH-12509", "Cleaned original — black background, serial removed, consistent grading.",
  "Luxury couture jewellery campaign, intricate diamond necklace worn by elegant Indian model, lace inspired styling, dramatic couture mood, premium editorial photography, dark background, ultra realistic diamonds, cinematic luxury fashion image, 8k",
  "Intricate diamond necklace presented over black velvet and lace shadow textures, museum luxury photography, premium jewellery atmosphere, macro details, cinematic lighting, ultra realistic, 8k");

// ===== HERITAGE ATELIER =====
set("NK-10212", "Cleaned original — black background, serial removed, consistent grading.",
  "Ultra-luxury editorial portrait of elegant South Asian female model wearing attached NK-10212 Sanctum Arch heritage necklace, antique gold and temple-inspired jewellery dominating composition, refined traditional couture styling with deep maroon or black silk, poised serene expression, cinematic oil-lamp lighting, museum-grade jewellery realism, inspired by royal Indian portraiture and Vogue jewellery editorials, photorealistic beauty and craftsmanship, 8k",
  "Luxury atmospheric photography of attached NK-10212 heritage necklace displayed within temple-inspired environment, dark carved stone textures and antique gold surfaces, subtle incense haze, oil-lamp inspired cinematic lighting, rich heritage atmosphere, museum-grade jewellery presentation, premium gemstone and gold detailing, sacred architectural mood, photorealistic craftsmanship, restrained royal composition, fullscreen 16:9, 8k");

set("NK-2263", "Cleaned original — black background, serial removed, consistent grading.",
  "Luxury jewellery editorial portrait of South Asian female model wearing attached NK-2263 Sacred Geometry necklace, temple-inspired jewellery dominating neckline, rich silk couture styling in black or deep maroon, cinematic heritage lighting, calm dignified gaze, museum-quality jewellery realism, inspired by royal Indian portrait photography, Vogue luxury editorial aesthetic, 8k",
  "Luxury atmospheric product photography of attached NK-2263 heritage necklace displayed in sacred architectural environment, carved temple stone and antique bronze textures, subtle incense haze, dramatic oil-lamp spotlighting, rich ceremonial mood, premium heritage detailing, museum exhibition atmosphere, photorealistic craftsmanship and gemstone realism, elegant 16:9 luxury composition, 8k");

set("NK-11853", "Cleaned original — black background, serial removed, consistent grading.",
  "Ultra-luxury heritage jewellery portrait of elegant South Asian female model wearing attached NK-11853 Ceremonial Bloom necklace, temple-inspired styling, black or deep maroon silk couture with minimal embroidery, cinematic heritage lighting, poised devotional elegance, museum-quality craftsmanship realism, Vogue jewellery editorial quality, photorealistic skin and jewellery, 8k",
  "Luxury atmospheric photography of attached NK-11853 heritage necklace displayed over antique textile and carved stone surfaces, temple corridor atmosphere, cinematic oil-lamp illumination, subtle floral shadow textures, museum-grade presentation, premium gold craftsmanship and gemstone realism, heritage luxury mood, photorealistic, 16:9, 8k");

set("P-590", "Cleaned original — black background, serial removed, consistent grading.",
  "Luxury editorial portrait of South Asian female model wearing attached P-590 Guardian Pendant, pendant clearly visible against elegant silk styling, cinematic oil-lamp lighting, serene expression, temple luxury atmosphere, photorealistic heritage jewellery detailing, inspired by royal Indian portraiture and luxury editorials, 8k",
  "Luxury atmospheric product photography of attached P-590 pendant displayed within sacred museum environment, antique bronze and carved stone textures, subtle incense haze and candle-inspired lighting, intimate luxury composition, heritage atmosphere, photorealistic craftsmanship and premium detailing, artifact presentation mood, fullscreen 16:9, 8k");

set("P-11449", "Cleaned original — black background, serial removed, consistent grading.",
  "Luxury jewellery editorial portrait of elegant South Asian female model wearing attached P-11449 Divine Veil pendant, temple-inspired atmosphere, graceful silk couture styling, soft cinematic lighting inspired by oil lamps, serene devotional expression, photorealistic heritage craftsmanship and beauty, Vogue jewellery editorial quality, 8k",
  "Luxury atmospheric jewellery photography of attached P-11449 pendant displayed within sanctum-inspired environment, dark stone and antique gold textures, candle and oil-lamp lighting, soft incense haze, sacred luxury mood, museum-style product presentation, photorealistic craftsmanship and gemstone realism, refined minimal composition, 16:9, 8k");

set("NK-291", "Cleaned original — black background, serial removed, consistent grading.",
  "Ultra-luxury editorial portrait of sophisticated South Asian female model wearing attached NK-291 Eternal Lotus heritage necklace, graceful traditional couture styling in black or deep maroon silk, cinematic temple lighting, poised regal expression, museum-grade jewellery realism, inspired by royal Indian portraiture and Vogue jewellery editorials, photorealistic craftsmanship and beauty, 8k",
  "Luxury atmospheric photography of attached NK-291 heritage necklace displayed within ancient royal environment, carved floral stone and antique gold textures, cinematic oil-lamp illumination, subtle lotus-inspired shadows, heritage luxury mood, museum exhibition atmosphere, photorealistic jewellery craftsmanship, premium gemstone and gold realism, elegant 16:9 composition, 8k");

// ===== JASMINE ATELIER =====
set("T-389", "Cleaned original — black background, serial removed, consistent grading.",
  "Ultra-luxury editorial portrait of elegant South Asian female model wearing attached T-389 Morning Dew diamond studs, hair softly styled back, ivory silk couture styling, soft morning-inspired cinematic lighting, luminous skin and subtle luxury makeup, diamonds delicately sparkling, quiet wealth atmosphere, Vogue jewellery editorial quality, photorealistic beauty and jewellery realism, 8k",
  "Luxury atmospheric photography of attached T-389 diamond stud earrings displayed within elegant morning-inspired environment, ivory silk and soft reflective surfaces, champagne lighting, delicate crystal reflections, premium diamond sparkle and realistic brilliance, minimalist luxury composition, soft shadows and airy atmosphere, inspired by Tiffany and Van Cleef jewellery campaigns, photorealistic macro detailing, refined 16:9 composition, 8k");

set("T-898", "Cleaned original — black background, serial removed, consistent grading.",
  "Luxury editorial portrait of South Asian female model wearing attached T-898 Silken Light earrings, elegant ivory couture styling, hair tucked softly behind ears, natural confident expression, morning cinematic lighting, quiet luxury mood, photorealistic jewellery and skin realism, Vogue jewellery campaign quality, 8k",
  "Luxury atmospheric product photography of attached T-898 diamond studs displayed over ivory silk and champagne reflective surfaces, soft luxury lighting, premium diamond brilliance, elegant minimalist composition, morning luxury atmosphere, photorealistic macro jewellery detailing, inspired by quiet luxury jewellery editorials, 16:9, 8k");

set("T-1026", "Cleaned original — black background, serial removed, consistent grading.",
  "Ultra-luxury portrait of elegant South Asian female model wearing attached T-1026 Petal Halo earrings, soft ivory couture styling, luminous natural skin, relaxed graceful expression, morning-inspired cinematic lighting, refined beauty editorial mood, photorealistic jewellery detailing, 8k",
  "Luxury atmospheric jewellery photography of attached T-1026 diamond earrings displayed on ivory silk and crystal reflections, soft floral shadow textures, delicate champagne lighting, premium diamond sparkle, minimalist luxury atmosphere, photorealistic jewellery realism, elegant quiet luxury composition, 16:9, 8k");

set("T-11011", "Cleaned original — black background, serial removed, consistent grading.",
  "Luxury editorial portrait of sophisticated South Asian female model wearing attached T-11011 Whisper Diamond earrings, ivory silk styling, natural beauty makeup, quiet confident expression, morning luxury lighting, photorealistic jewellery and skin realism, Vogue editorial quality, 8k",
  "Luxury atmospheric product photography of attached T-11011 diamond earrings displayed within minimalist champagne and ivory environment, silk textures and crystal reflections, soft premium lighting, understated luxury atmosphere, realistic diamond brilliance, photorealistic macro detailing, 16:9, 8k");

set("T-10862", "Cleaned original — black background, serial removed, consistent grading.",
  "Luxury campaign portrait of elegant South Asian female model wearing attached T-10862 Champagne Bloom earrings, ivory couture styling, soft romantic lighting, graceful confident expression, photorealistic beauty and jewellery detailing, quiet luxury jewellery campaign mood, 8k",
  "Luxury atmospheric photography of attached T-10862 earrings displayed within champagne-toned luxury environment, ivory silk and crystal textures, delicate lighting and soft reflections, premium diamond sparkle, elegant minimalist jewellery composition, photorealistic macro realism, 16:9, 8k");

set("T-10588", "Cleaned original — black background, serial removed, consistent grading.",
  "Ultra-luxury portrait of South Asian female model wearing attached T-10588 Ivory Sonata earrings, ivory silk couture, luminous skin and subtle editorial makeup, soft cinematic morning lighting, elegant relaxed expression, photorealistic jewellery realism, Vogue campaign quality, 8k",
  "Luxury atmospheric jewellery photography of attached T-10588 earrings displayed over ivory silk and champagne reflective textures, soft cinematic lighting, premium diamond sparkle, airy luxury atmosphere, minimalist editorial composition, photorealistic jewellery detailing, 16:9, 8k");

set("T-10692", "Cleaned original — black background, serial removed, consistent grading.",
  "Luxury editorial portrait of elegant South Asian female model wearing attached T-10692 First Light earrings, soft ivory couture styling, graceful natural expression, morning-inspired luxury lighting, luminous skin and subtle makeup, photorealistic jewellery and beauty realism, Vogue jewellery editorial quality, 8k",
  "Luxury atmospheric product photography of attached T-10692 earrings displayed in airy morning luxury environment, ivory silk, crystal and champagne reflections, delicate cinematic lighting, premium diamond brilliance, soft shadows and minimalist elegance, photorealistic jewellery realism, quiet luxury composition, 16:9, 8k");

// ===== END PROMPT MAP =====


// ──────────────────────────────────────────────
// SHEET 1: MASTER REGISTRY — all 39 products
// ──────────────────────────────────────────────
const products = [
  // ===== CROWN COLLECTION (Power) =====
  {
    collection: "Crown Collection",
    tag: "NK-12384",
    name: "Imperial Dominion",
    shortDesc: "Sculpted through grandeur and balance, Imperial Dominion carries the language of ceremonial power and enduring prestige.",
    mood: "Imperial architecture",
    emotion: "Command",
    form: "Structured majesty",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 7,
    hero: false,
  },
  {
    collection: "Crown Collection",
    tag: "NK-12383",
    name: "Royal Edict",
    shortDesc: "A composition of authority and grace, Royal Edict frames brilliance through ceremonial symmetry and royal proportion.",
    mood: "Court ceremonial",
    emotion: "Presence",
    form: "Regal symmetry",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 8,
    hero: false,
  },
  {
    collection: "Crown Collection",
    tag: "NK-1691",
    name: "Throne of Light",
    shortDesc: "Created for ceremonial presence and visual authority, Throne of Light transforms ornament into legacy.",
    mood: "Throne ornament",
    emotion: "Regal gravity",
    form: "Monumental brilliance",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 9,
    hero: false,
  },
  {
    collection: "Crown Collection",
    tag: "NK-12692",
    name: "Regalia Canopy",
    shortDesc: "Architectural and ceremonially bold, Regalia Canopy evokes the grandeur of royal halls translated into gemstone form.",
    mood: "Ceremony",
    emotion: "Prestige",
    form: "Architectural canopy",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 10,
    hero: false,
  },
  {
    collection: "Crown Collection",
    tag: "CH-12316",
    name: "Imperial Cascade",
    shortDesc: "Power and architecture — an elaborate emerald diamond necklace with cascading sculptural form.",
    mood: "Power + architecture",
    emotion: "Command",
    form: "Cascading architecture",
    websiteSlug: "imperial-cascade",
    phase: "Phase 1 — Hero",
    priority: 3,
    hero: true,
  },
  {
    collection: "Crown Collection",
    tag: "H-12695",
    name: "Dynasty Bloom",
    shortDesc: "Floral emerald — a graceful emerald floral necklace with botanical elegance and dynastic beauty.",
    mood: "Floral emerald",
    emotion: "Grace",
    form: "Floral symmetry",
    websiteSlug: "dynasty-bloom",
    phase: "Phase 1 — Hero",
    priority: 4,
    hero: true,
  },
  {
    collection: "Crown Collection",
    tag: "H-12294",
    name: "Maharani Veil",
    shortDesc: "Maharani inspired — a layered diamond necklace with emerald centrepiece, royal and ceremonial.",
    mood: "Royal veil",
    emotion: "Majesty",
    form: "Layered royalty",
    websiteSlug: "maharani-veil",
    phase: "Phase 1 — Hero",
    priority: 5,
    hero: true,
  },

  // ===== EMERALD COURT (Mystery) =====
  {
    collection: "Emerald Court",
    tag: "NK-12503",
    name: "Emerald Reverie",
    shortDesc: "A composition of luminous emerald drops and diamond brilliance, crafted for moments where elegance feels instinctive rather than performed.",
    mood: "Forest royalty",
    emotion: "Magnetism",
    form: "Cascading emerald rhythm",
    websiteSlug: "emerald-reverie",
    phase: "Phase 2",
    priority: 12,
    hero: false,
  },
  {
    collection: "Emerald Court",
    tag: "NK-12493",
    name: "Verdant Halo",
    shortDesc: "An architectural emerald masterpiece shaped through symmetry and light, carrying the quiet grandeur of royal inheritance.",
    mood: "Temple emerald",
    emotion: "Sacred beauty",
    form: "Protective geometry",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 13,
    hero: false,
  },
  {
    collection: "Emerald Court",
    tag: "NK-12530",
    name: "Moonlit Emerald",
    shortDesc: "Where moonlight meets gemstone fire, this creation balances delicacy and command in a singular luminous form.",
    mood: "Moonlit elegance",
    emotion: "Desire",
    form: "Droplet radiance",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 14,
    hero: false,
  },
  {
    collection: "Emerald Court",
    tag: "NK-10361",
    name: "Sanctum Emerald",
    shortDesc: "An heirloom of ceremonial beauty, shaped through reverence, balance, and enduring brilliance.",
    mood: "Royal heirloom",
    emotion: "Protection",
    form: "Sacred pendant language",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 15,
    hero: false,
  },
  {
    collection: "Emerald Court",
    tag: "ER-12496",
    name: "Emerald Chamber",
    shortDesc: "A study in depth and brilliance, Emerald Chamber frames the emerald as both jewel and emotion.",
    mood: "Emerald chamber",
    emotion: "Sophisticated mystery",
    form: "Framed brilliance",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 16,
    hero: false,
  },
  {
    collection: "Emerald Court",
    tag: "CH-12325",
    name: "Emerald Canopy",
    shortDesc: "Imperial emerald queen — a massive emerald and diamond statement necklace with regal presence.",
    mood: "Imperial emerald",
    emotion: "Royalty",
    form: "Statement canopy",
    websiteSlug: "emerald-canopy",
    phase: "Phase 1 — Hero",
    priority: 1,
    hero: true,
  },
  {
    collection: "Emerald Court",
    tag: "NK-12536",
    name: "Forest Reverie",
    shortDesc: "Bridal emotion — an emerald diamond necklace with soft, romantic presence and graceful elegance.",
    mood: "Forest reverie",
    emotion: "Romance",
    form: "Bridal cascade",
    websiteSlug: "",
    phase: "Phase 1 — Hero",
    priority: 6,
    hero: true,
  },

  // ===== HOUSE OF DIAMONDS (Light) =====
  {
    collection: "House of Diamonds",
    tag: "NK-12725",
    name: "Celestial Rain",
    shortDesc: "A cascade of diamond light suspended in motion, Celestial Rain transforms brilliance into atmosphere.",
    mood: "Night sky",
    emotion: "Wonder",
    form: "Falling constellation",
    websiteSlug: "celestial-rain",
    phase: "Phase 1 — Hero",
    priority: 2,
    hero: true,
  },
  {
    collection: "House of Diamonds",
    tag: "NK-12585",
    name: "Diamond Tempest",
    shortDesc: "Layered in brilliance and movement, Diamond Tempest evokes the force and elegance of light in motion.",
    mood: "Diamond waterfall",
    emotion: "Luxury abundance",
    form: "Layered radiance",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 17,
    hero: false,
  },
  {
    collection: "House of Diamonds",
    tag: "NK-12415",
    name: "Winter Halo",
    shortDesc: "A restrained expression of brilliance, Winter Halo carries the stillness and precision of sculpted frost.",
    mood: "Frost",
    emotion: "Refinement",
    form: "Diamond lace",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 18,
    hero: false,
  },
  {
    collection: "House of Diamonds",
    tag: "NK-12528",
    name: "Symphony of Light",
    shortDesc: "Balanced through rhythm and symmetry, this creation celebrates the quiet power of perfect proportion.",
    mood: "Symmetry",
    emotion: "Balance",
    form: "Ordered brilliance",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 19,
    hero: false,
  },
  {
    collection: "House of Diamonds",
    tag: "NK-12505",
    name: "Quiet Majesty",
    shortDesc: "Minimal in gesture yet powerful in presence, Quiet Majesty reflects the language of modern luxury.",
    mood: "Modern elegance",
    emotion: "Quiet power",
    form: "Refined restraint",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 20,
    hero: false,
  },
  {
    collection: "House of Diamonds",
    tag: "NK-12100",
    name: "Opera Nocturne",
    shortDesc: "Composed for evenings of ceremony and spectacle, Opera Nocturne carries the drama of diamond theatre.",
    mood: "Opera evening",
    emotion: "Sophisticated glamour",
    form: "Grand cascade",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 21,
    hero: false,
  },
  {
    collection: "House of Diamonds",
    tag: "ER-12508",
    name: "Starlit Reverence",
    shortDesc: "Designed as an echo of celestial light, Starlit Reverence frames the face through brilliance and movement.",
    mood: "Starlight",
    emotion: "Celebration",
    form: "Celestial drop",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 22,
    hero: false,
  },

  // ===== RUBY SALON (Desire) =====
  {
    collection: "Ruby Salon",
    tag: "NK-12479",
    name: "Ruby Aurora",
    shortDesc: "Radiant and emotionally magnetic, Ruby Aurora carries the fire of rare gemstones shaped through elegance and restraint.",
    mood: "Fire",
    emotion: "Passion",
    form: "Radiant symmetry",
    websiteSlug: "ruby-aurora",
    phase: "Phase 1 — Hero",
    priority: 11,
    hero: true,
  },
  {
    collection: "Ruby Salon",
    tag: "NK-12755",
    name: "Crimson Dynasty",
    shortDesc: "A ceremonial expression of ruby brilliance, Crimson Dynasty evokes royal celebration and enduring grandeur.",
    mood: "Royal banquet",
    emotion: "Drama",
    form: "Layered majesty",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 23,
    hero: false,
  },
  {
    collection: "Ruby Salon",
    tag: "NK-12373",
    name: "Velvet Ember",
    shortDesc: "Soft in movement yet intense in presence, Velvet Ember transforms ruby light into an intimate statement of luxury.",
    mood: "Velvet evening",
    emotion: "Seduction",
    form: "Fluid brilliance",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 24,
    hero: false,
  },
  {
    collection: "Ruby Salon",
    tag: "ER-12431",
    name: "Rose Sovereign",
    shortDesc: "Framing the face through ruby brilliance and delicate motion, Rose Sovereign balances romance with authority.",
    mood: "Vintage glamour",
    emotion: "Romance",
    form: "Floral ruby symmetry",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 25,
    hero: false,
  },
  {
    collection: "Ruby Salon",
    tag: "CH-12509",
    name: "Royal Lace",
    shortDesc: "Intricacy — an intricate diamond necklace with lace-inspired detailing, delicate and commanding.",
    mood: "Lace intricacy",
    emotion: "Elegance",
    form: "Intricate lace",
    websiteSlug: "royal-lace",
    phase: "Phase 1 — Hero",
    priority: 26,
    hero: true,
  },

  // ===== HERITAGE ATELIER (Memory) =====
  {
    collection: "Heritage Atelier",
    tag: "NK-10212",
    name: "Sanctum Arch",
    shortDesc: "Inspired by ceremonial architecture and sacred ornament traditions, Sanctum Arch carries devotion through refined craftsmanship and enduring form.",
    mood: "Temple arch",
    emotion: "Devotion",
    form: "Architectural symmetry",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 27,
    hero: false,
  },
  {
    collection: "Heritage Atelier",
    tag: "NK-2263",
    name: "Sacred Geometry",
    shortDesc: "A study in symmetry and symbolism, Sacred Geometry transforms traditional ornament into living heritage.",
    mood: "Sacred geometry",
    emotion: "Belonging",
    form: "Ritual balance",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 28,
    hero: false,
  },
  {
    collection: "Heritage Atelier",
    tag: "NK-11853",
    name: "Ceremonial Bloom",
    shortDesc: "Crafted with the language of celebration and memory, Ceremonial Bloom honours ritual through beauty and permanence.",
    mood: "Ceremony",
    emotion: "Memory",
    form: "Floral sanctity",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 29,
    hero: false,
  },
  {
    collection: "Heritage Atelier",
    tag: "P-590",
    name: "Guardian Pendant",
    shortDesc: "Compact yet powerful, Guardian Pendant carries the intimacy of protection and the dignity of inherited form.",
    mood: "Artifact",
    emotion: "Protection",
    form: "Sacred talisman",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 30,
    hero: false,
  },
  {
    collection: "Heritage Atelier",
    tag: "P-11449",
    name: "Divine Veil",
    shortDesc: "Delicate yet spiritually resonant, Divine Veil reflects the grace of sacred ornament carried close to the heart.",
    mood: "Divine ornament",
    emotion: "Blessing",
    form: "Sacred softness",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 31,
    hero: false,
  },
  {
    collection: "Heritage Atelier",
    tag: "NK-291",
    name: "Eternal Lotus",
    shortDesc: "Rooted in floral symbolism and ceremonial memory, Eternal Lotus celebrates continuity through sculpted elegance.",
    mood: "Ancient floral",
    emotion: "Continuity",
    form: "Lotus symmetry",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 32,
    hero: false,
  },

  // ===== JASMINE ATELIER (Quiet Luxury) =====
  {
    collection: "Jasmine Atelier",
    tag: "T-389",
    name: "Morning Dew",
    shortDesc: "Delicate and luminous, Morning Dew captures the softness of first light through refined diamond brilliance.",
    mood: "Morning light",
    emotion: "Fresh elegance",
    form: "Dewdrop symmetry",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 33,
    hero: false,
  },
  {
    collection: "Jasmine Atelier",
    tag: "T-898",
    name: "Silken Light",
    shortDesc: "A refined expression of modern elegance, Silken Light frames brilliance through restraint and grace.",
    mood: "Silk",
    emotion: "Ease",
    form: "Soft geometry",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 34,
    hero: false,
  },
  {
    collection: "Jasmine Atelier",
    tag: "T-1026",
    name: "Petal Halo",
    shortDesc: "Graceful and intimate, Petal Halo reflects softness shaped through precision and light.",
    mood: "Floral light",
    emotion: "Tenderness",
    form: "Petal symmetry",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 35,
    hero: false,
  },
  {
    collection: "Jasmine Atelier",
    tag: "T-11011",
    name: "Whisper Diamond",
    shortDesc: "Minimal yet expressive, Whisper Diamond celebrates elegance that speaks softly and remains unforgettable.",
    mood: "Quiet luxury",
    emotion: "Intimacy",
    form: "Minimal brilliance",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 36,
    hero: false,
  },
  {
    collection: "Jasmine Atelier",
    tag: "T-10862",
    name: "Champagne Bloom",
    shortDesc: "Radiant yet effortless, Champagne Bloom brings warmth and delicacy into refined diamond form.",
    mood: "Champagne glow",
    emotion: "Warmth",
    form: "Bloom geometry",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 37,
    hero: false,
  },
  {
    collection: "Jasmine Atelier",
    tag: "T-10588",
    name: "Ivory Sonata",
    shortDesc: "Balanced through softness and precision, Ivory Sonata transforms everyday luxury into wearable poetry.",
    mood: "Ivory elegance",
    emotion: "Comfort",
    form: "Gentle symmetry",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 38,
    hero: false,
  },
  {
    collection: "Jasmine Atelier",
    tag: "T-10692",
    name: "First Light",
    shortDesc: "Airy, luminous, and quietly refined, First Light celebrates beauty carried with ease.",
    mood: "Dawn",
    emotion: "Optimism",
    form: "Light geometry",
    websiteSlug: "",
    phase: "Phase 2",
    priority: 39,
    hero: false,
  },
];

// ──────────────────────────────────────────────
// SHEET 2: IMAGE PIPELINE — ALL 39 products × 3
// ──────────────────────────────────────────────
const imagePrompts = [];
let idx = 0;
for (const p of products) {
  const pm = promptMap[p.tag];
  if (!pm) { console.error("Missing prompt for", p.tag); continue; }
  imagePrompts.push({
    n: ++idx, product: `${p.name} (${p.tag})`, collection: p.collection,
    imgType: "Image 1 — Archive (Real Product)", prompt: pm.archive, status: ""
  });
  imagePrompts.push({
    n: ++idx, product: `${p.name} (${p.tag})`, collection: p.collection,
    imgType: "Image 2 — Editorial Model", prompt: pm.model, status: ""
  });
  imagePrompts.push({
    n: ++idx, product: `${p.name} (${p.tag})`, collection: p.collection,
    imgType: "Image 3 — Atmosphere Still Life", prompt: pm.atmosphere, status: ""
  });
}

// ──────────────────────────────────────────────
// SHEET 3: VIDEO PIPELINE — 8 heroes × 2
// ──────────────────────────────────────────────
const videoBase = {
  cinematic: "Slow cinematic camera movement over luxury high jewellery necklace, subtle gemstone sparkle, premium dark luxury atmosphere, shallow depth of field, editorial jewellery film, realistic motion, luxury campaign quality, 4k",
  couture: "Luxury fashion editorial video of couture model wearing high jewellery, slow movement, elegant posture, cinematic lighting, subtle fabric motion, premium jewellery campaign, realistic luxury film aesthetic, Vogue and Cartier campaign style, 4k",
};

const videoPrompts = [];
let vidx = 0;
for (const p of products) {
  if (!p.hero) continue;
  videoPrompts.push({
    n: ++vidx, product: `${p.name} (${p.tag})`, collection: p.collection,
    vidType: "Video 1 — Cinematic Motion (6-10s)", usage: "Homepage hero + ads",
    prompt: videoBase.cinematic, status: ""
  });
  videoPrompts.push({
    n: ++vidx, product: `${p.name} (${p.tag})`, collection: p.collection,
    vidType: "Video 2 — Couture Editorial (8-12s)", usage: "Instagram + landing page",
    prompt: videoBase.couture, status: ""
  });
}

// ──────────────────────────────────────────────
// SHEET 4: WEBSITE DISPLAY MAP
// ──────────────────────────────────────────────
const displayMap = products.map(p => ({
  collection: p.collection,
  name: p.name,
  tag: p.tag,
  phase: p.phase,
  hero: p.hero ? "Yes" : "",
  cardImage: "Image 1 — Archive (trust/builds trust)",
  hoverSwipe: p.hero ? "Image 2 — Model (builds aspiration)" : "Image 2 — Model",
  pdpHero: p.hero ? "Image 3 — Atmosphere (builds emotion/storytelling)" : "Image 3 — Atmosphere",
  homepageHero: p.hero ? (["Imperial Cascade","Dynasty Bloom","Maharani Veil","Celestial Rain","Ruby Aurora"].includes(p.name) ? "Possible — Crown/Ruby/Diamond heroes" : "") : "",
  notes: p.hero ? "Full 3-image + 2-video pipeline. Hover→swipe→PDP flow." : "Standard 3-image display. Hover→swipe→PDP.",
}));

// ──────────────────────────────────────────────
// SHEET 5: HOUSE COLLECTION RENAME MAP
// ──────────────────────────────────────────────
const houseRenameMap = [
  { currentName: "Maharani Cascade", currentSlug: "maharani-cascade", newName: "Maharani Cascade (stays as hero)", newTag: "", newCollection: "Crown Collection (existing)", notes: "Already fullscreen hero on homepage. No rename needed." },
  { currentName: "Emerald Canopy", currentSlug: "emerald-canopy", newName: "Emerald Canopy", newTag: "CH-12325", newCollection: "Emerald Court", notes: "Renamed collection assignment. Was Heritage, now Emerald Court." },
  { currentName: "Emerald Reverie", currentSlug: "emerald-reverie", newName: "Emerald Reverie", newTag: "NK-12503", newCollection: "Emerald Court", notes: "Tag updated to NK-12503 (was NK-12536, which is now Forest Reverie)." },
  { currentName: "Emerald Sonata", currentSlug: "emerald-sonata", newName: "", newTag: "", newCollection: "", notes: "No matching product in new document. User to assign or archive." },
  { currentName: "Verdant Constellation", currentSlug: "verdant-constellation", newName: "Verdant Halo?", newTag: "NK-12493?", newCollection: "Emerald Court?", notes: "'Verdant' naming matches Verdant Halo (NK-12493). User to confirm." },
  { currentName: "Celestial Rain", currentSlug: "celestial-rain", newName: "Celestial Rain", newTag: "NK-12725", newCollection: "House of Diamonds", notes: "Renamed collection assignment. Tagged to inventory." },
  { currentName: "The Sovereign Emerald", currentSlug: "the-sovereign-emerald", newName: "", newTag: "", newCollection: "", notes: "No direct match. Possibly maps to NK-12493 (Verdant Halo) in Emerald Court." },
  { currentName: "The Emerald Pavilion", currentSlug: "the-emerald-pavilion", newName: "Emerald Chamber?", newTag: "ER-12496?", newCollection: "Emerald Court?", notes: "'Pavilion'/'Chamber' both architectural. User to confirm." },
  { currentName: "Royal Lace", currentSlug: "royal-lace", newName: "Royal Lace", newTag: "CH-12509", newCollection: "Ruby Salon", notes: "Renamed collection from Heritage→Ruby Salon." },
  { currentName: "Ruby Aurora", currentSlug: "ruby-aurora", newName: "Ruby Aurora", newTag: "NK-12479", newCollection: "Ruby Salon", notes: "Tagged to inventory. Hero product." },
  { currentName: "Dynasty Bloom", currentSlug: "dynasty-bloom", newName: "Dynasty Bloom", newTag: "H-12695", newCollection: "Crown Collection", notes: "Tagged to inventory. Hero product." },
  { currentName: "Maharani Veil", currentSlug: "maharani-veil", newName: "Maharani Veil", newTag: "H-12294", newCollection: "Crown Collection", notes: "Tagged to inventory. Hero product." },
  { currentName: "Moonlit Cascade", currentSlug: "moonlit-cascade", newName: "Moonlit Emerald?", newTag: "NK-12530?", newCollection: "Emerald Court?", notes: "'Moonlit' naming matches Moonlit Emerald (NK-12530). User to confirm." },
  { currentName: "Imperial Cascade", currentSlug: "imperial-cascade", newName: "Imperial Cascade", newTag: "CH-12316", newCollection: "Crown Collection", notes: "Hero product. Tagged to inventory." },
  { currentName: "Garden of Noor", currentSlug: "garden-of-noor", newName: "", newTag: "", newCollection: "", notes: "No matching product in new document. Possibly Jasmine Atelier. User to assign or archive." },
];

// ──────────────────────────────────────────────
// SHEET 6: PRODUCTION TRACKER
// ──────────────────────────────────────────────
const productionTracker = products.map(p => ({
  collection: p.collection,
  name: p.name,
  tag: p.tag,
  phase: p.phase,
  image1Archive: "",
  image2Model: "",
  image3Atmosphere: "",
  video1Cinematic: p.hero ? "" : "—",
  video2Couture: p.hero ? "" : "—",
  assignedTo: "",
  deliveryDate: "",
  notes: p.hero ? "Full 3-image + 2-video pipeline" : "3 images only (no video)",
}));

// ──────────────────────────────────────────────
// Build workbook
// ──────────────────────────────────────────────
const wb = XLSX.utils.book_new();

function addSheet(data, name, headers) {
  const ws = XLSX.utils.json_to_sheet(data, { header: headers });
  // Column widths
  const ref = ws["!ref"];
  if (ref) {
    const range = XLSX.utils.decode_range(ref);
    ws["!cols"] = [];
    for (let c = range.s.c; c <= range.e.c; c++) {
      let maxLen = (headers[c] || "").length;
      for (let r = 1; r <= Math.min(range.e.r, 60); r++) {
        const cell = ws[XLSX.utils.encode_cell({ r, c })];
        if (cell) maxLen = Math.max(maxLen, Math.min(String(cell.v).length, 65));
      }
      ws["!cols"].push({ wch: Math.min(Math.max(maxLen + 3, 14), 68) });
    }
  }
  XLSX.utils.book_append_sheet(wb, ws, name);
}

// Sheet 1: Master Registry
addSheet(products.map(p => ({
  "#": p.priority,
  Collection: p.collection,
  "Inventory Tag": p.tag,
  "Product Name": p.name,
  "Short Description": p.shortDesc,
  Mood: p.mood,
  Emotion: p.emotion,
  Form: p.form,
  "Current Website Slug": p.websiteSlug || "TBD",
  Phase: p.phase,
  Priority: p.priority,
  "Hero": p.hero ? "YES" : "",
})), "Master Registry", ["#","Collection","Inventory Tag","Product Name","Short Description","Mood","Emotion","Form","Current Website Slug","Phase","Priority","Hero"]);

// Sheet 2: Image Pipeline
addSheet(imagePrompts.map(r => ({
  "#": r.n, "Product": r.product, "Collection": r.collection,
  "Image Type": r.imgType, "AI Prompt": r.prompt, "Status": r.status
})), "Image Pipeline", ["#","Product","Collection","Image Type","AI Prompt","Status"]);

// Sheet 3: Video Pipeline
addSheet(videoPrompts.map(r => ({
  "#": r.n, "Product": r.product, "Collection": r.collection,
  "Video Type": r.vidType, "Website Usage": r.usage, "AI Prompt": r.prompt, "Status": r.status
})), "Video Pipeline", ["#","Product","Collection","Video Type","Website Usage","AI Prompt","Status"]);

// Sheet 4: Website Display Map
addSheet(displayMap.map((r, i) => ({
  "#": i + 1, "Collection": r.collection, "Product Name": r.name,
  "Tag": r.tag, "Phase": r.phase, "Hero": r.hero,
  "Card →": r.cardImage, "Hover/Swipe →": r.hoverSwipe,
  "PDP →": r.pdpHero, "Homepage": r.homepageHero, "Notes": r.notes
})), "Website Display Map", ["#","Collection","Product Name","Tag","Phase","Hero","Card →","Hover/Swipe →","PDP →","Homepage","Notes"]);

// Sheet 5: House Collection Rename
addSheet(houseRenameMap.map((r, i) => ({
  "#": i + 1, "Current Name": r.currentName, "Current Slug": r.currentSlug,
  "New Name": r.newName, "New Tag": r.newTag, "New Collection": r.newCollection, "Notes": r.notes
})), "House Rename", ["#","Current Name","Current Slug","New Name","New Tag","New Collection","Notes"]);

// Sheet 6: Production Tracker
addSheet(productionTracker.map((r, i) => ({
  "#": i + 1, "Collection": r.collection, "Product": r.name, "Tag": r.tag,
  "Phase": r.phase, "Img 1": r.image1Archive, "Img 2": r.image2Model,
  "Img 3": r.image3Atmosphere, "Vid 1": r.video1Cinematic, "Vid 2": r.video2Couture,
  "Assigned": r.assignedTo, "Delivery": r.deliveryDate, "Notes": r.notes
})), "Production Tracker", ["#","Collection","Product","Tag","Phase","Img 1","Img 2","Img 3","Vid 1","Vid 2","Assigned","Delivery","Notes"]);

// Write
const outPath = "../product details/master-creative-direction.xlsx";
XLSX.writeFile(wb, outPath);
console.log("✅ Created:", outPath);
console.log("   Sheets:", wb.SheetNames.join(", "));
console.log("   Master Registry:", products.length, "products");
console.log("   Image Pipeline:", imagePrompts.length, "entries (" + (imagePrompts.length/3) + " products × 3)");
console.log("   Video Pipeline:", videoPrompts.length, "entries (8 heroes × 2)");
console.log("   House Rename:", houseRenameMap.length, "entries");
