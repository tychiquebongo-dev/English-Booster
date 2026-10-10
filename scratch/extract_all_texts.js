const fs = require('fs');

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

const allUntranslated = {};

pages.forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  // Simple extraction of tags containing English text without data-i18n
  const regex = /<([a-z0-9]+)([^>]*)>([^<]+)<\/\1>/gi;
  let m;
  allUntranslated[p] = [];
  while ((m = regex.exec(content)) !== null) {
    const tag = m[1].toLowerCase();
    const attrs = m[2];
    const text = m[3].trim();
    if (['script', 'style', 'svg', 'path', 'code', 'pre'].includes(tag)) continue;
    if (attrs.includes('data-i18n')) continue;
    if (text.length < 3) continue;
    if (/^[\d\s:\-+.,%/(#@)]+$/.test(text)) continue;

    // Filter out brand names
    if (text === 'ENGLISH BOOSTER' || text === 'BOOSTER') continue;

    allUntranslated[p].push({ tag, text, attrs });
  }
});

for (const [p, items] of Object.entries(allUntranslated)) {
  console.log(`=== ${p}: ${items.length} untranslated tags ===`);
  items.slice(0, 10).forEach(it => {
    console.log(`  [${it.tag}] ${it.text.slice(0, 60)}`);
  });
}
