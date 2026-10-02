import fs from 'fs';
import path from 'path';

// Copia o template da proposta para dist/proposta/index.html
// (fonte única: prospeccao/proposta-modelo.html)
const destDir = path.join('dist', 'proposta');
fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(
  path.join('prospeccao', 'proposta-modelo.html'),
  path.join(destDir, 'index.html')
);
console.log('✅ Proposta copiada para dist/proposta/index.html');