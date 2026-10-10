const fs = require('fs');
const path = require('path');

const rootFiles = ['index.html'];
const pageFiles = fs.readdirSync('pages').filter(f => f.endsWith('.html')).map(f => path.join('pages', f));

let updatedCount = 0;

// Root index.html
let indexContent = fs.readFileSync('index.html', 'utf8');
if (!indexContent.includes('js/animations.js')) {
  indexContent = indexContent.replace(
    '<script src="js/main.js"></script>',
    '<script src="js/main.js"></script>\\n  <script src="js/animations.js"></script>'
  );
  fs.writeFileSync('index.html', indexContent, 'utf8');
  console.log('Updated index.html');
  updatedCount++;
} else {
  console.log('index.html already has animations.js');
}

// Pages
pageFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('js/animations.js')) {
    if (content.includes('<script src="../js/main.js"></script>')) {
      content = content.replace(
        '<script src="../js/main.js"></script>',
        '<script src="../js/main.js"></script>\\n  <script src="../js/animations.js"></script>'
      );
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${file}`);
      updatedCount++;
    } else {
      console.log(`Warning: ${file} does not have main.js tag`);
    }
  } else {
    console.log(`${file} already has animations.js`);
  }
});

console.log(`Finished. Updated ${updatedCount} files.`);
