const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const geo = [
  `<meta name="geo.region" content="IN-TG" />`,
  `<meta name="geo.placename" content="Hyderabad, Telangana" />`,
  `<meta name="geo.position" content="17.3850;78.4867" />`,
  `<meta name="ICBM" content="17.3850, 78.4867" />`,
].join("  ");

const fixes = [
  // ---------- index.html ----------
  {
    file: "index.html",
    fn: (html) => {
      // Add canonical after og:url line
      html = html.replace(
        `<meta property="og:url" content="https://www.houseofgiriraj.com/" />`,
        `<link rel="canonical" href="https://www.houseofgiriraj.com/" />  <meta property="og:url" content="https://www.houseofgiriraj.com/" />`
      );
      // Add geo after og:site_name
      html = html.replace(
        `<meta property="og:site_name" content="House of Giriraj" />`,
        `<meta property="og:site_name" content="House of Giriraj" />  ${geo}`
      );
      return html;
    },
  },

  // ---------- worlds-of-giriraj.html ----------
  {
    file: "worlds-of-giriraj.html",
    fn: (html) => {
      // Add canonical + geo after og:url
      html = html.replace(
        `<meta property="og:url" content="https://www.houseofgiriraj.com/worlds-of-giriraj.html" />`,
        `<link rel="canonical" href="https://www.houseofgiriraj.com/worlds-of-giriraj.html" />  <meta property="og:url" content="https://www.houseofgiriraj.com/worlds-of-giriraj.html" />  ${geo}`
      );
      return html;
    },
  },

  // ---------- Collection pages ----------
  {
    file: "crown-collection.html",
    wrongUrl: "collections.html?category=chokers",
    rightUrl: "crown-collection.html",
  },
  {
    file: "emerald-court.html",
    wrongUrl: "collections.html?category=necklaces",
    rightUrl: "emerald-court.html",
  },
  {
    file: "house-of-diamonds.html",
    wrongUrl: "collections.html?category=chandeliers",
    rightUrl: "house-of-diamonds.html",
  },
  {
    file: "ruby-salon.html",
    wrongUrl: "collections.html?category=bracelets",
    rightUrl: "ruby-salon.html",
  },
  {
    file: "heritage-atelier.html",
    wrongUrl: "collections.html?category=bangles",
    rightUrl: "heritage-atelier.html",
  },
  {
    file: "jasmine-atelier.html",
    wrongUrl: "collections.html?category=studs",
    rightUrl: "jasmine-atelier.html",
  },

  // ---------- bespoke.html ----------
  {
    file: "bespoke.html",
    fn: (html) => {
      // Fix title brand
      html = html.replace(
        `<title>Bespoke | Giriraj Jewellery</title>`,
        `<title>Bespoke | House of Giriraj</title>`
      );
      html = html.replace(
        `<meta property="og:title" content="Bespoke | Giriraj Jewellery" />`,
        `<meta property="og:title" content="Bespoke | House of Giriraj" />`
      );
      html = html.replace(
        `<meta name="twitter:title" content="Bespoke | Giriraj Jewellery" />`,
        `<meta name="twitter:title" content="Bespoke | House of Giriraj" />`
      );
      // Add canonical after og:url
      html = html.replace(
        `<meta property="og:url" content="https://www.houseofgiriraj.com/bespoke.html" />`,
        `<link rel="canonical" href="https://www.houseofgiriraj.com/bespoke.html" />  <meta property="og:url" content="https://www.houseofgiriraj.com/bespoke.html" />`
      );
      // Add geo after og:site_name
      html = html.replace(
        `<meta property="og:site_name" content="House of Giriraj" />`,
        `<meta property="og:site_name" content="House of Giriraj" />  ${geo}`
      );
      return html;
    },
  },

  // ---------- heritage.html ----------
  {
    file: "heritage.html",
    fn: (html) => {
      // Fix title brand
      html = html.replace(
        `<title>Heritage | Giriraj Jewellery</title>`,
        `<title>Heritage | House of Giriraj</title>`
      );
      html = html.replace(
        `<meta property="og:title" content="Heritage | Giriraj Jewellery" />`,
        `<meta property="og:title" content="Heritage | House of Giriraj" />`
      );
      html = html.replace(
        `<meta name="twitter:title" content="Heritage | Giriraj Jewellery" />`,
        `<meta name="twitter:title" content="Heritage | House of Giriraj" />`
      );
      // Add geo after og:site_name
      html = html.replace(
        `<meta property="og:site_name" content="House of Giriraj" />`,
        `<meta property="og:site_name" content="House of Giriraj" />  ${geo}`
      );
      return html;
    },
  },

  // ---------- contact.html ----------
  {
    file: "contact.html",
    fn: (html) => {
      // Fix title brand
      html = html.replace(
        `<title>Contact | Giriraj Jewellery</title>`,
        `<title>Contact | House of Giriraj</title>`
      );
      html = html.replace(
        `<meta property="og:title" content="Contact | Giriraj Jewellery" />`,
        `<meta property="og:title" content="Contact | House of Giriraj" />`
      );
      html = html.replace(
        `<meta name="twitter:title" content="Contact | Giriraj Jewellery" />`,
        `<meta name="twitter:title" content="Contact | House of Giriraj" />`
      );
      // Add geo after og:site_name
      html = html.replace(
        `<meta property="og:site_name" content="House of Giriraj" />`,
        `<meta property="og:site_name" content="House of Giriraj" />  ${geo}`
      );
      return html;
    },
  },

  // ---------- signature-collection.html ----------
  {
    file: "signature-collection.html",
    fn: (html) => {
      // Add noindex
      if (!html.includes(`<meta name="robots"`)) {
        html = html.replace(
          `<meta name="ICBM" content="17.3850, 78.4867" />`,
          `<meta name="ICBM" content="17.3850, 78.4867" />  <meta name="robots" content="noindex, follow" />`
        );
      }
      return html;
    },
  },
];

// Process collection pages (those with simple wrongUrl/rightUrl pattern)
for (const fix of fixes) {
  if (!fix.fn) {
    const html = readFileSync(path.join(root, fix.file), "utf-8");
    const oldUrl = `https://www.houseofgiriraj.com/${fix.wrongUrl}`;
    const newUrl = `https://www.houseofgiriraj.com/${fix.rightUrl}`;
    const newHtml = html
      .replace(
        `<meta property="og:url" content="${oldUrl}" />`,
        `<link rel="canonical" href="${newUrl}" />  <meta property="og:url" content="${newUrl}" />`
      )
      .replace(
        `<meta property="og:site_name" content="House of Giriraj" />`,
        `<meta property="og:site_name" content="House of Giriraj" />  ${geo}`
      );
    writeFileSync(path.join(root, fix.file), newHtml);
    console.log(`✓ ${fix.file}`);
  } else {
    const html = readFileSync(path.join(root, fix.file), "utf-8");
    const newHtml = fix.fn(html);
    writeFileSync(path.join(root, fix.file), newHtml);
    console.log(`✓ ${fix.file}`);
  }
}

console.log("\nDone — SEO tags updated on all pages.");
