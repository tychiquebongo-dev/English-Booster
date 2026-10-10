const fs = require('fs');

const original = fs.readFileSync('scratch/i18n.js.bak', 'utf8');

// Load existing translations
const match = original.match(/const translations = (\{[\s\S]*?\n  \};\n\n  \/\/ 2\.)/);
if (!match) {
  console.error('Could not match translations');
  process.exit(1);
}

const code = 'return ' + match[1].replace(/;\n\n  \/\/ 2\.$/, '');
const translations = new Function(code)();

console.log('Current EN keys:', Object.keys(translations.en).length);
console.log('Current FR keys:', Object.keys(translations.fr).length);
