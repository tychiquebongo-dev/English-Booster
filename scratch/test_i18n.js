const fs = require('fs');

const code = fs.readFileSync('js/i18n.js', 'utf8');

const mockStorage = {};

global.window = {
  EnglishBooster: {},
  dispatchEvent: () => {},
  addEventListener: () => {}
};
global.localStorage = {
  getItem: (k) => mockStorage[k] || null,
  setItem: (k, v) => { mockStorage[k] = v; }
};
global.navigator = {
  language: 'en-US'
};
global.document = {
  documentElement: {
    setAttribute: () => {}
  },
  querySelectorAll: () => [],
  getElementById: () => null,
  addEventListener: () => {}
};

eval(code);

// Force EN
window.EnglishBooster.i18n.setLanguage('en', false);
const enMission = window.EnglishBooster.t('mission_badge');
console.log('EN Mission Badge:', enMission);

// Force FR
window.EnglishBooster.i18n.setLanguage('fr', false);
const frMission = window.EnglishBooster.t('mission_badge');
console.log('FR Mission Badge:', frMission);

if (enMission === '✨ Our Global Mission' && frMission === '✨ Notre Mission Mondiale') {
  console.log('✓ SUCCESS: Perfect bidirectional translation English <-> Français!');
} else {
  console.error('✗ Failure');
}
