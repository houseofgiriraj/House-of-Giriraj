import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imageDir = path.resolve("public/assets/images");
const widths = [640, 960, 1280, 1920];
const sourceExtensions = new Set([".jpg", ".jpeg", ".png"]);

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function optimizeImage(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  if (!sourceExtensions.has(ext)) return;

  const source = path.join(imageDir, fileName);
  const base = path.basename(fileName, ext);
  const image = sharp(source);
  const metadata = await image.metadata();
  const maxSourceWidth = metadata.width || Math.max(...widths);
  const targetWidths = widths.filter((width) => width <= maxSourceWidth);
  if (!targetWidths.includes(maxSourceWidth)) targetWidths.push(maxSourceWidth);

  await Promise.all(
    [...new Set(targetWidths)].map(async (width) => {
      const webp = path.join(imageDir, `${base}-${width}.webp`);
      const avif = path.join(imageDir, `${base}-${width}.avif`);

      if (!(await exists(webp))) {
        await sharp(source)
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: 82 })
          .toFile(webp);
      }

      if (!(await exists(avif))) {
        await sharp(source)
          .resize({ width, withoutEnlargement: true })
          .avif({ quality: 58 })
          .toFile(avif);
      }
    })
  );
}

try {
  const files = await fs.readdir(imageDir);
  await Promise.all(files.map(optimizeImage));
  console.log("Optimized responsive AVIF/WebP image variants.");
} catch (err) {
  console.warn("Could not read image directory or optimize images:", err.message);
}
