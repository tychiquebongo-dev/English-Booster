const fs = require('fs');
const http = require('http');

console.log('--- TESTING PRICING IMPLEMENTATION & i18n COMPLETENESS ---');

// 1. Read files
const pricingHtml = fs.readFileSync('pages/pricing.html', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');
const i18nJs = fs.readFileSync('js/i18n.js', 'utf8');

// Extract translations from i18n.js
// We can extract keys simply by evaluating or regex
const enKeys = new Set();
const frKeys = new Set();

const enBlockMatch = i18nJs.match(/en:\s*\{([\s\S]*?)\},\s*fr:\s*\{/);
const frBlockMatch = i18nJs.match(/fr:\s*\{([\s\S]*?)\}\s*\};/);

if (enBlockMatch) {
  const lines = enBlockMatch[1].split('\n');
  lines.forEach(line => {
    const m = line.match(/^\s*([a-zA-Z0-9_]+):/);
    if (m) enKeys.add(m[1]);
  });
}

if (frBlockMatch) {
  const lines = frBlockMatch[1].split('\n');
  lines.forEach(line => {
    const m = line.match(/^\s*([a-zA-Z0-9_]+):/);
    if (m) frKeys.add(m[1]);
  });
}

console.log(`Found ${enKeys.size} EN translation keys and ${frKeys.size} FR translation keys.`);

// 2. Extract data-i18n from pricing.html
function checkI18nAttributes(html, filename) {
  const regex = /data-i18n="([^"]+)"/g;
  let match;
  let missingEn = [];
  let missingFr = [];
  let total = 0;

  while ((match = regex.exec(html)) !== null) {
    total++;
    const key = match[1];
    if (!enKeys.has(key)) missingEn.push(key);
    if (!frKeys.has(key)) missingFr.push(key);
  }

  console.log(`File [${filename}]: ${total} data-i18n attributes found.`);
  if (missingEn.length > 0) {
    console.error(`Missing in EN:`, missingEn);
  } else {
    console.log(`✓ All keys present in EN!`);
  }

  if (missingFr.length > 0) {
    console.error(`Missing in FR:`, missingFr);
  } else {
    console.log(`✓ All keys present in FR!`);
  }

  return missingEn.length === 0 && missingFr.length === 0;
}

const pricingOk = checkI18nAttributes(pricingHtml, 'pages/pricing.html');
const indexOk = checkI18nAttributes(indexHtml, 'index.html');

// 3. Test HTTP status for /pages/pricing.html
http.get('http://localhost:3000/pages/pricing.html', (res) => {
  console.log(`HTTP GET /pages/pricing.html -> Status: ${res.statusCode}`);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(`Response length: ${data.length} bytes`);
    if (res.statusCode === 200 && data.includes('Detailed Plan Comparison') && pricingOk) {
      console.log('✅ ALL PRICING VERIFICATION CHECKS PASSED SUCCESSFULLY!');
      process.exit(0);
    } else {
      console.error('❌ SOME CHECKS FAILED');
      process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error('HTTP Request failed:', err.message);
  process.exit(1);
});
