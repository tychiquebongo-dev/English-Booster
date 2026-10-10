const fs = require('fs');
const path = require('path');

// 1. Load translations from js/i18n.js
const i18nContent = fs.readFileSync('js/i18n.js', 'utf8');
const match = i18nContent.match(/const translations = (\{[\s\S]*?\n  \};\n\n  \/\/ 2\.)/);
const code = 'return ' + match[1].replace(/;\n\n  \/\/ 2\.$/, '');
const translations = new Function(code)();

const htmlFiles = fs.readdirSync('pages').filter(f => f.endsWith('.html')).map(f => 'pages/' + f);
htmlFiles.push('index.html');

console.log('=== AUDIT OF DATA-I18N IN HTML FILES ===');
let missingKeys = [];
let usedKeys = new Set();

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const regex = /data-i18n(?:-placeholder|-title)?=["']([^"']+)["']/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const key = m[1];
    usedKeys.add(key);
    if (translations.fr[key] === undefined) {
      missingKeys.push({ file, key });
    }
  }
});

console.log('Distinct data-i18n keys used:', usedKeys.size);
console.log('Missing in translations.fr:', missingKeys.length);
if (missingKeys.length > 0) {
  console.log(missingKeys);
}

// 2. Check keys defined in translations.en vs translations.fr
console.log('\n=== EN vs FR KEYS AUDIT ===');
const enKeys = Object.keys(translations.en);
const frKeys = Object.keys(translations.fr);
console.log('EN total keys:', enKeys.length);
console.log('FR total keys:', frKeys.length);

const enMissingInFr = enKeys.filter(k => translations.fr[k] === undefined);
console.log('Keys in EN but not in FR:', enMissingInFr);

const identicalKeys = enKeys.filter(k => {
  const enVal = translations.en[k];
  const frVal = translations.fr[k];
  return typeof enVal === 'string' && enVal === frVal && enVal.trim().length > 3;
});
console.log('\nKeys with identical EN and FR values (length > 3):', identicalKeys.length);
identicalKeys.forEach(k => {
  console.log(`  ${k}: "${translations.en[k]}"`);
});
