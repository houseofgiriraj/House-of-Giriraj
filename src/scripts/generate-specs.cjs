const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const SUPPLIER_DIR = path.resolve(__dirname, "../../../product details");
const ENTRIES_DIR = path.resolve(__dirname, "../data/house-collection-entries");
const OUTPUT = path.resolve(__dirname, "../data/house-collection-specs.js");

function readSupplier(file) {
  const p = path.join(SUPPLIER_DIR, file);
  if (!fs.existsSync(p)) { console.warn("  NOT FOUND:", file); return []; }
  const wb = XLSX.readFile(p);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });
  return rows;
}

function parseRef(ref) {
  // e.g. NK-12585 → { itemno: "NK", tag: "12585" }
  const m = String(ref).match(/^([A-Za-z]+)-(\d+)$/);
  if (!m) return null;
  return { itemno: m[1], tag: m[2] };
}

function numVal(v) {
  const n = parseFloat(String(v).replace(/[^0-9.]/g, ""));
  return isNaN(n) ? null : n;
}

function findSpec(itemno, tag, allRows) {
  const candidates = [];
  for (const row of allRows) {
    const rItem = String(row.Itemno || "").trim().toUpperCase();
    const rTag = String(row.Tag || "").trim();
    if (rItem === "TOTAL" || !rTag || !rItem) continue;
    if (rItem.length > 3) continue;
    if (rItem === itemno.toUpperCase() && rTag === tag) {
      candidates.push(row);
    }
  }
  if (candidates.length === 0) return null;

  candidates.sort((a, b) => {
    const scoreA = Object.values(a).filter(v => String(v).trim() !== "").length;
    const scoreB = Object.values(b).filter(v => String(v).trim() !== "").length;
    return scoreB - scoreA;
  });
  const row = candidates[0];

  let diaCts = numVal(row["DIA CTS"] || row["dia cts"] || row["Dia Cts"] || 0);
  let csCts = numVal(row["C/S CTS"] || row["C/S cts"] || row["colour stn"] || 0);
  let grWt = numVal(row["Gr Wt"] || row["GR WT"] || 0);
  let stWt = numVal(row["St Wt"] || row["ST WT"] || 0);
  let netWt = numVal(row["Net Wt"] || row["NET WT"] || 0);
  let appNo = String(row["App No"] || "").trim();
  let design = String(row["D.No"] || "").trim();

  if ((!csCts || csCts === 0) && row["RUB"]) csCts = numVal(row["RUB"]);
  if ((!csCts || csCts === 0) && row["EME"]) csCts = numVal(row["EME"]);

  return { diamondCts: diaCts, colorStoneCts: csCts, grossWeight: grWt, stoneWeight: stWt, netWeight: netWt, appNo, design };
}

function build() {
  console.log("Reading supplier files...");
  const supplierFiles = [
    "as-28-5-26.xls",
    "hitech-28-5-26.xls",
    "manoj bhai-28-5-26.xls",
    "mkj-28-5-26.xls",
    "pr-28-5-26.xls",
    "47 items.xls",
  ];

  const allRows = [];
  for (const f of supplierFiles) {
    const rows = readSupplier(f);
    console.log(`  ${f}: ${rows.length} rows`);
    allRows.push(...rows);
  }
  console.log(`  Total: ${allRows.length} rows`);

  // Read KT LIST for karat data
  let ktMap = {};
  const ktPath = path.join(SUPPLIER_DIR, "KT LIST.xlsx");
  if (fs.existsSync(ktPath)) {
    const ktWb = XLSX.readFile(ktPath);
    const ktWs = ktWb.Sheets[ktWb.SheetNames[0]];
    const ktRows = XLSX.utils.sheet_to_json(ktWs, { defval: "", header: 1 });
    for (const row of ktRows) {
      if (row.length >= 3) {
        const t1 = String(row[1]).trim();
        const k1 = String(row[2]).trim();
        if (t1 && k1 && /^\d+$/.test(t1)) ktMap[t1] = k1;
      }
      if (row.length >= 6) {
        const t2 = String(row[4]).trim();
        const k2 = String(row[5]).trim();
        if (t2 && k2 && /^\d+$/.test(t2)) ktMap[t2] = k2;
      }
    }
    console.log(`  KT LIST: ${Object.keys(ktMap).length} mappings`);
  }

  // Read markdown files and auto-map
  const entries = fs.readdirSync(ENTRIES_DIR).filter(f => f.endsWith(".md"));
  const specsMap = {};
  let matched = 0;
  let unmatched = [];

  for (const file of entries) {
    const id = path.basename(file, ".md");
    const raw = fs.readFileSync(path.join(ENTRIES_DIR, file), "utf-8");
    const refMatch = raw.match(/^ref:\s*(.+)$/m);

    if (!refMatch) {
      unmatched.push({ id, reason: "no ref field" });
      continue;
    }

    const ref = refMatch[1].trim();
    const parsed = parseRef(ref);
    if (!parsed) {
      unmatched.push({ id, ref, reason: "unparseable ref format" });
      continue;
    }

    const spec = findSpec(parsed.itemno, parsed.tag, allRows);
    if (spec) {
      // Look up karat
      const karat = ktMap[parsed.tag] || null;
      spec.karat = karat ? karat + "K" : null;
      specsMap[id] = spec;
      matched++;
    } else {
      unmatched.push({ id, ref, reason: `no match for ${parsed.itemno}-${parsed.tag} in supplier data` });
    }
  }

  console.log(`\nMatched: ${matched}`);
  console.log(`Unmatched: ${unmatched.length}`);
  for (const u of unmatched) {
    console.log(`  ${u.id} (${u.ref || "no ref"}) — ${u.reason}`);
  }

  const code = `const houseCollectionSpecs = ${JSON.stringify(specsMap, null, 2)};\n\nexport default houseCollectionSpecs;\n`;
  fs.writeFileSync(OUTPUT, code, "utf-8");

  // Also write JSON for sync script to consume
  const jsonPath = path.resolve(__dirname, "../data/house-collection-specs.json");
  fs.writeFileSync(jsonPath, JSON.stringify(specsMap, null, 2), "utf-8");
  console.log(`\nGenerated ${OUTPUT}`);
  console.log(`Generated ${jsonPath}`);
}

build();
