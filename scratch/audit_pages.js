const fs = require('fs');
const path = require('path');

const pages = fs.readdirSync('pages').filter(f => f.endsWith('.html')).map(f => 'pages/' + f);
pages.push('index.html');

console.log('--- AUDIT DES PAGES WEB (PWA + RESPONSIVE) ---');
pages.forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  const hasManifest = content.includes('manifest.json');
  const hasPwaJs = content.includes('pwa.js');
  const hasResponsive = content.includes('responsive.css');
  const hasViewport = content.includes('viewport');
  const hasDock = content.includes('mobile-bottom-dock');
  console.log(
    p.padEnd(24) +
    ' | Manifest: ' + (hasManifest ? 'OK' : 'MISSING') +
    ' | PWA.js: ' + (hasPwaJs ? 'OK' : 'MISSING') +
    ' | Responsive.css: ' + (hasResponsive ? 'OK' : 'MISSING') +
    ' | Mobile Dock: ' + (hasDock ? 'OK' : 'NO')
  );
});
