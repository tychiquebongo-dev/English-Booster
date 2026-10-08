const http = require('http');

function testUrl(url, label, expectedStrings) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`[TEST] ${label}: HTTP ${res.statusCode}`);
        if (res.statusCode !== 200) {
          console.error(`FAIL: Expected status 200, got ${res.statusCode}`);
          return resolve(false);
        }
        for (const exp of expectedStrings) {
          if (!data.includes(exp)) {
            console.error(`FAIL ${label}: Missing expected string: ${exp}`);
            return resolve(false);
          }
        }
        console.log(`PASS ${label}: All ${expectedStrings.length} assertions passed.`);
        resolve(true);
      });
    }).on('error', err => {
      console.error(`ERROR ${label}: ${err.message}`);
      resolve(false);
    });
  });
}

async function run() {
  const p1 = await testUrl('http://localhost:3000/pages/watch.html', 'watch.html', [
    'btn-open-publish-short',
    'btn-open-live-studio',
    'live-broadcasts-section',
    'live-streams-grid',
    'data-filter="live"'
  ]);

  const p2 = await testUrl('http://localhost:3000/', 'index.html', [
    'btn-open-publish-short',
    'btn-open-live-studio',
    'home-shorts-carousel'
  ]);

  const p3 = await testUrl('http://localhost:3000/js/watchShorts.js', 'watchShorts.js', [
    'checkEnglishCompliance',
    'openPublishModal',
    'openLiveStudio',
    'renderLiveStreams',
    'short-video-dropzone',
    'short-camera-preview',
    'upload-method-tabs',
    'short-english-certify'
  ]);

  const p4 = await testUrl('http://localhost:3000/css/style.css', 'style.css', [
    'video-dropzone',
    'live-broadcasts-section',
    'live-studio-modal-overlay',
    'english-compliance-status'
  ]);

  if (p1 && p2 && p3 && p4) {
    console.log('\n=== ALL SYSTEM TESTS PASSED PERFECTLY ===');
    process.exit(0);
  } else {
    process.exit(1);
  }
}

run();
