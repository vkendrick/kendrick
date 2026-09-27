import fs from 'fs';
import path from 'path';

const htmlPath = path.join('dist', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf-8');

const analyticsToken = process.env.CLOUDFLARE_ANALYTICS_TOKEN || 'CLOUDFLARE_ANALYTICS_TOKEN';
html = html.replace('CLOUDFLARE_ANALYTICS_TOKEN', analyticsToken);

fs.writeFileSync(htmlPath, html);
console.log(`✅ Cloudflare Analytics token injected: ${analyticsToken === 'CLOUDFLARE_ANALYTICS_TOKEN' ? 'PLACEHOLDER (set CLOUDFLARE_ANALYTICS_TOKEN env var)' : 'SET'}`);