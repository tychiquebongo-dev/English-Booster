const fs = require('fs');
const path = require('path');

// 1. Root index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('js/i18n.js')) {
  indexHtml = indexHtml.replace('<script src="js/main.js"></script>', '<script src="js/i18n.js"></script>\n  <script src="js/main.js"></script>');
  fs.writeFileSync('index.html', indexHtml, 'utf8');
  console.log('[INDEX.HTML] Added js/i18n.js');
}

// 2. All pages in /pages
const pages = fs.readdirSync('pages').filter(f => f.endsWith('.html'));
pages.forEach(file => {
  const filePath = path.join('pages', file);
  let html = fs.readFileSync(filePath, 'utf8');
  if (!html.includes('js/i18n.js')) {
    if (html.includes('<script src="../js/main.js"></script>')) {
      html = html.replace('<script src="../js/main.js"></script>', '<script src="../js/i18n.js"></script>\n  <script src="../js/main.js"></script>');
    } else {
      html = html.replace('</body>', '  <script src="../js/i18n.js"></script>\n</body>');
    }
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`[PAGES/${file}] Added ../js/i18n.js`);
  }
});

console.log('All pages linked with js/i18n.js successfully.');
