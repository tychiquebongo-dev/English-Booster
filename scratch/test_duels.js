const fs = require('fs');
const path = require('path');

console.log('Testing 5 Active Duel Modes on English Booster...');

// 1. Read challenges.js
const challengesJs = fs.readFileSync(path.join(__dirname, '../js/challenges.js'), 'utf8');

// Check that ARENAS_DATABASE has all 5 modes
const modes = ['speed_duel', 'debate', 'roleplay', 'phonetics', 'cefr_grand'];
modes.forEach(mode => {
  if (!challengesJs.includes(`id: '${mode}'`)) {
    throw new Error(`Mode ${mode} missing from ARENAS_DATABASE`);
  }
  console.log(`✓ Mode '${mode}' verified in ARENAS_DATABASE`);
});

// 2. Read pages/challenges.html
const challengesHtml = fs.readFileSync(path.join(__dirname, '../pages/challenges.html'), 'utf8');
modes.forEach(mode => {
  if (!challengesHtml.includes(`data-arena-id="${mode}"`)) {
    throw new Error(`data-arena-id="${mode}" missing in pages/challenges.html`);
  }
  if (!challengesHtml.includes(`data-mode="${mode}"`)) {
    throw new Error(`data-mode="${mode}" missing in pages/challenges.html`);
  }
  console.log(`✓ HTML elements verified for '${mode}' in pages/challenges.html`);
});

// Check new interactive elements in challenges.html
const requiredIds = [
  'battle-mode-hud',
  'battle-custom-arg-input',
  'btn-send-custom-arg',
  'btn-next-battle-round',
  'btn-multi-next-round',
  'result-mode-custom-box'
];
requiredIds.forEach(id => {
  if (!challengesHtml.includes(`id="${id}"`)) {
    throw new Error(`Required DOM element id="${id}" missing from pages/challenges.html`);
  }
  console.log(`✓ Required element id="${id}" present in pages/challenges.html`);
});

// 3. Read index.html
const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
modes.forEach(mode => {
  if (!indexHtml.includes(`data-arena-id="${mode}"`)) {
    throw new Error(`data-arena-id="${mode}" missing on homepage index.html`);
  }
  if (!indexHtml.includes(`data-mode="${mode}"`)) {
    throw new Error(`data-mode="${mode}" missing on homepage index.html`);
  }
  console.log(`✓ Homepage card and launch button verified for '${mode}' in index.html`);
});

// 4. Check CSS in css/style.css
const styleCss = fs.readFileSync(path.join(__dirname, '../css/style.css'), 'utf8');
const requiredCssClasses = [
  '.battle-mode-hud-wrap',
  '.hud-metric-pill.speed-pill',
  '.hud-metric-pill.debate-pill-pro',
  '.hud-metric-pill.phonetics-pill',
  '.hud-metric-pill.cefr-pill',
  '.battle-custom-input-wrap',
  '.cefr-certificate-card'
];
requiredCssClasses.forEach(cls => {
  if (!styleCss.includes(cls)) {
    throw new Error(`Required CSS rule ${cls} missing from css/style.css`);
  }
  console.log(`✓ CSS rule '${cls}' verified in style.css`);
});

console.log('\n🌟 ALL 5 ACTIVE DUEL MODES VALIDATED SUCCESSFULLY!');
