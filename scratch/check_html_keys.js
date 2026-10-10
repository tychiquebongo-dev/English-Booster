const fs = require('fs');

const i18nContent = fs.readFileSync('js/i18n.js', 'utf8');
const match = i18nContent.match(/const translations = (\{[\s\S]*?\n  \};\n\n  \/\/ 2\.)/);
const code = 'return ' + match[1].replace(/;\n\n  \/\/ 2\.$/, '');
const translations = new Function(code)();

const htmlFiles = fs.readdirSync('pages').filter(f => f.endsWith('.html')).map(f => 'pages/' + f);
htmlFiles.push('index.html');

// For each key in translations.en, check if its English string appears in any HTML file without data-i18n="key"
let matchesFound = 0;
const results = {};

for (const [key, enVal] of Object.entries(translations.en)) {
  if (typeof enVal !== 'string' || enVal.trim().length < 5) continue;
  const cleanVal = enVal.replace(/<[^>]+>/g, '').trim();
  if (cleanVal.length < 5) continue;

  htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes(cleanVal) && !content.includes(`data-i18n="${key}"`) && !content.includes(`data-i18n='${key}'`)) {
      if (!results[file]) results[file] = [];
      results[file].push({ key, enVal: cleanVal.slice(0, 50) });
      matchesFound++;
    }
  });
}

console.log('Total keys whose English text is in HTML without data-i18n:', matchesFound);
for (const [file, keys] of Object.entries(results)) {
  console.log(`\n=== ${file} (${keys.length} keys) ===`);
  keys.slice(0, 15).forEach(k => console.log(`  ${k.key} -> "${k.enVal}"`));
}
