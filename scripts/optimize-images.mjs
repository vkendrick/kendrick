import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const INPUT_DIR = 'public/portfolio';
const OUTPUT_DIR = 'public/portfolio';
const QUALITY = 80;
const MAX_WIDTH = 1200;

const files = fs.readdirSync(INPUT_DIR).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));

console.log(`Optimizing ${files.length} images...\n`);

for (const file of files) {
  const inputPath = path.join(INPUT_DIR, file);
  const baseName = path.parse(file).name;
  const outputPath = path.join(OUTPUT_DIR, `${baseName}.webp`);

  try {
    const metadata = await sharp(inputPath).metadata();
    console.log(`📸 ${file}: ${metadata.width}x${metadata.height} → `);

    await sharp(inputPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    console.log(`   ${(stats.size / 1024).toFixed(1)} KB WebP`);
  } catch (err) {
    console.error(`   ❌ Error: ${err.message}`);
  }
}

console.log('\n✅ Done! Update PortfolioCarousel.tsx to use .webp extensions');