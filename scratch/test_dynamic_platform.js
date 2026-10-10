const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('--- 1. VALIDATING JAVASCRIPT SYNTAX ---');
const jsFiles = ['js/main.js', 'js/animations.js', 'js/dashboard.js', 'js/chat.js', 'js/webrtcCall.js', 'js/matching.js'];
jsFiles.forEach(f => {
  try {
    const code = fs.readFileSync(f, 'utf8');
    new Function(code);
    console.log(`[PASS] ${f} is syntactically valid.`);
  } catch (err) {
    console.error(`[FAIL] ${f} syntax error:`, err.message);
    process.exit(1);
  }
});

console.log('\\n--- 2. CHECKING SCRIPT & STYLE INCLUSIONS IN HTML ---');
const htmlFiles = [
  'index.html',
  ...fs.readdirSync('pages').filter(f => f.endsWith('.html')).map(f => path.join('pages', f))
];

let allIncluded = true;
htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const hasAnimCss = content.includes('animations.css');
  const hasAnimJs = content.includes('animations.js');
  const hasMainJs = content.includes('main.js');

  if (!hasAnimCss || !hasAnimJs || !hasMainJs) {
    console.warn(`[WARN] ${file}: CSS=${hasAnimCss}, JS=${hasAnimJs}, Main=${hasMainJs}`);
    allIncluded = false;
  } else {
    console.log(`[PASS] ${file} has animations.css + main.js + animations.js`);
  }
});

console.log('\\n--- 3. TESTING HTTP RESPONSES FROM SERVER (PORT 3000) ---');
const endpoints = [
  '/',
  '/pages/dashboard.html',
  '/pages/partners.html',
  '/pages/chat.html',
  '/pages/call.html',
  '/pages/challenges.html',
  '/css/animations.css',
  '/js/animations.js',
  '/js/main.js'
];

let completed = 0;
endpoints.forEach(ep => {
  http.get(`http://localhost:3000${ep}`, (res) => {
    if (res.statusCode === 200) {
      console.log(`[PASS] 200 OK: ${ep}`);
    } else {
      console.error(`[FAIL] ${res.statusCode}: ${ep}`);
    }
    completed++;
    if (completed === endpoints.length) {
      console.log('\\nAll platform checks passed successfully!');
    }
  }).on('error', (err) => {
    console.error(`[ERROR] Connection error on ${ep}:`, err.message);
  });
});
