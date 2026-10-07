const fs = require('fs');
const path = require('path');

const pwaHeadSnippet = `  <!-- PWA & MULTI-DEVICE SUPPORT (MOBILE, TABLETTE, ORDINATEUR) -->
  <link rel="manifest" href="../manifest.json">
  <meta name="theme-color" content="#030712">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="English Booster">
  <link rel="apple-touch-icon" href="../assets/images/logo.svg">`;

const pwaScriptTag = `  <script src="../js/pwa.js"></script>`;

const pages = fs.readdirSync('pages').filter(f => f.endsWith('.html'));

pages.forEach(file => {
  const filePath = path.join('pages', file);
  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  if (!html.includes('manifest.json')) {
    html = html.replace('</head>', `${pwaHeadSnippet}\n</head>`);
    modified = true;
    console.log(`[PWA HEAD ADDED] ${file}`);
  }

  if (!html.includes('pwa.js')) {
    html = html.replace('</body>', `${pwaScriptTag}\n</body>`);
    modified = true;
    console.log(`[PWA SCRIPT ADDED] ${file}`);
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
  }
});

console.log('PWA synchronization completed.');
