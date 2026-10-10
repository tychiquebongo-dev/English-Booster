const fs = require('fs');

// Load translations from js/i18n.js
const i18nContent = fs.readFileSync('js/i18n.js', 'utf8');
const match = i18nContent.match(/const translations = (\{[\s\S]*?\n  \};\n\n  \/\/ 2\.)/);
const code = 'return ' + match[1].replace(/;\n\n  \/\/ 2\.$/, '');
const translations = new Function(code)();

const pages = [
  'index.html',
  'pages/about.html',
  'pages/call.html',
  'pages/challenges.html',
  'pages/chat.html',
  'pages/community.html',
  'pages/dashboard.html',
  'pages/inscrits.html',
  'pages/leaderboard.html',
  'pages/login.html',
  'pages/partners.html',
  'pages/pricing.html',
  'pages/profile.html',
  'pages/register.html',
  'pages/watch.html'
];

console.log('====================================================');
console.log('COMPREHENSIVE FRENCH MODE AUDIT ACROSS ALL 15 PAGES');
console.log('====================================================\n');

let totalKeysChecked = 0;
let totalMissing = 0;
let results = [];

pages.forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  const regex = /data-i18n(?:-placeholder|-title)?=["']([^"']+)["']/g;
  let m;
  let pageKeys = [];
  let pageMissing = [];

  while ((m = regex.exec(content)) !== null) {
    const key = m[1];
    pageKeys.push(key);
    totalKeysChecked++;
    if (translations.fr[key] === undefined) {
      pageMissing.push(key);
      totalMissing++;
    }
  }

  results.push({
    page: p,
    totalKeys: pageKeys.length,
    missing: pageMissing.length,
    missingKeys: pageMissing
  });
});

console.table(results.map(r => ({
  Page: r.page,
  'Keys Count': r.totalKeys,
  'FR Missing': r.missing,
  'Status': r.missing === 0 ? '✓ 100% Translated' : '❌ Incomplete'
})));

console.log(`\nTotal data-i18n elements verified: ${totalKeysChecked}`);
console.log(`Total missing French translations: ${totalMissing}`);

if (totalMissing === 0) {
  console.log('\n SUCCESS: 100% of all UI elements across all 15 pages have valid French translations!');
} else {
  console.log('\n❌ FAILURE: Missing keys detected.');
}
