const fs = require('fs');
const vm = require('vm');

let code = fs.readFileSync('js/animations.js', 'utf8');

// Replace any occurrence of the unescaped line 553
code = code.replace(
  "const subtitle = isFrench ? 'Échauffez votre voix, visualisez vos fréquences orales et recevez le diagnostic de l'IA' : 'Warm up your voice, analyze your pitch and test your speaking clarity in real-time';",
  'const subtitle = isFrench ? "Échauffez votre voix, visualisez vos fréquences orales et recevez le diagnostic de l\'IA" : "Warm up your voice, analyze your pitch and test your speaking clarity in real-time";'
);

fs.writeFileSync('js/animations.js', code, 'utf8');

try {
  new vm.Script(fs.readFileSync('js/animations.js', 'utf8'), { filename: 'animations.js' });
  console.log('ANIMATIONS.JS SYNTAX PASSED PERFECTLY!');
} catch (e) {
  console.error('SYNTAX ERROR:', e.stack);
}
