import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://kendrick.com';
const PAGES = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/quiz', changefreq: 'monthly', priority: 0.8 },
  { url: '/casos', changefreq: 'weekly', priority: 0.9 },
  { url: '/privacidad', changefreq: 'yearly', priority: 0.3 },
  { url: '/terminos', changefreq: 'yearly', priority: 0.3 },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

const outputPath = path.join('dist', 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap);
console.log(`✅ Sitemap generated at ${outputPath}`);