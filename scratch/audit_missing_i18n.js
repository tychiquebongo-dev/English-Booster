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

pages.forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  // Strip comments, scripts, styles
  let clean = content
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  // Find tags with text content directly inside that DO NOT have data-i18n
  // Let's match all opening tag + text + closing tag
  const matches = [];
  const tagRegex = /<([a-z0-9]+)([^>]*)>([^<]+)<\/\1>/gi;
  let m;
  while ((m = tagRegex.exec(clean)) !== null) {
    const tag = m[1].toLowerCase();
    const attrs = m[2];
    const text = m[3].trim();
    if (['script', 'style', 'svg', 'path', 'code', 'pre'].includes(tag)) continue;
    if (text.length < 2) continue;
    if (/^[\d\s:\-+.,%/(#@)]+$/.test(text)) continue;
    
    // Check if tag itself or parent has data-i18n
    if (!attrs.includes('data-i18n')) {
      matches.push({ tag, text, attrs });
    }
  }

  // Also check placeholders
  const phRegex = /<input[^>]+placeholder=["']([^"']+)["'][^>]*>/gi;
  const missingPlaceholders = [];
  while ((m = phRegex.exec(clean)) !== null) {
    if (!m[0].includes('data-i18n-placeholder')) {
      missingPlaceholders.push(m[1]);
    }
  }

  console.log(`=== ${p} ===`);
  console.log(`Tags without data-i18n: ${matches.length}`);
  // Show non-French text candidates (contains typical English words: the, and, with, your, you, to, of, for, in, on, at, by, from, or, is, are, have, has, find, start, learn, now, free, etc.)
  const englishWords = /\b(the|and|with|your|you|to|of|for|in|on|at|by|from|or|is|are|have|has|find|start|learn|now|free|how|works|about|partners|community|challenges|watch|videos|log|sign|get|started|speak|step|share|live|room|voice|call|ready|instant|online|search|filter|rank|streak|points|view|all|more|back|next|pass|claim|finish)\b/i;
  const englishMatches = matches.filter(x => englishWords.test(x.text));
  console.log(`Likely English text (${englishMatches.length}):`);
  englishMatches.slice(0, 15).forEach(m => {
    console.log(`  <${m.tag}>: "${m.text.slice(0, 70)}"`);
  });
  if (missingPlaceholders.length > 0) {
    console.log(`  Missing placeholders: ${missingPlaceholders.slice(0, 5).join(' | ')}`);
  }
});
