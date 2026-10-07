const http = require('http');

const endpoints = [
  '/',
  '/index.html',
  '/manifest.json',
  '/sw.js',
  '/js/pwa.js',
  '/js/watchShorts.js',
  '/js/main.js',
  '/css/style.css',
  '/css/responsive.css',
  '/pages/about.html',
  '/pages/watch.html',
  '/pages/partners.html',
  '/pages/inscrits.html',
  '/pages/challenges.html',
  '/pages/chat.html',
  '/pages/call.html',
  '/pages/community.html',
  '/pages/dashboard.html',
  '/pages/leaderboard.html',
  '/pages/pricing.html',
  '/pages/profile.html',
  '/pages/login.html',
  '/pages/register.html'
];

async function testEndpoint(path) {
  return new Promise((resolve) => {
    http.get({
      hostname: 'localhost',
      port: 3000,
      path: path,
      timeout: 3000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ path, statusCode: res.statusCode, length: data.length });
      });
    }).on('error', (err) => {
      resolve({ path, error: err.message });
    });
  });
}

async function run() {
  console.log('Testing all endpoints on http://localhost:3000 ...');
  let passed = 0;
  for (const ep of endpoints) {
    const res = await testEndpoint(ep);
    if (res.statusCode === 200) {
      console.log(`[PASS 200] ${ep.padEnd(25)} (${res.length} bytes)`);
      passed++;
    } else {
      console.error(`[FAIL] ${ep.padEnd(25)} - Status: ${res.statusCode} Error: ${res.error || ''}`);
    }
  }
  console.log(`\nResults: ${passed}/${endpoints.length} endpoints passed successfully.`);
}

run();
