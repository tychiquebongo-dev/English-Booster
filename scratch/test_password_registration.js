const fs = require('fs');
const http = require('http');

console.log('=== VERIFYING PASSWORD REGISTRATION IMPLEMENTATION ===');

// 1. Check pages/inscrits.html
const inscritsHtml = fs.readFileSync('pages/inscrits.html', 'utf8');
const requiredInscritsElements = [
  'id="reg-password"',
  'id="reg-confirm-password"',
  'id="btn-toggle-reg-pass"',
  'id="reg-pass-strength-bar"',
  'id="reg-pass-strength-text"',
  'id="reg-pass-match-indicator"',
  'data-i18n="inscrits_password"',
  'data-i18n="inscrits_confirm_password"'
];

requiredInscritsElements.forEach(item => {
  if (inscritsHtml.includes(item)) {
    console.log(`✓ [pages/inscrits.html] element '${item}' found`);
  } else {
    console.error(`✕ [pages/inscrits.html] missing '${item}'`);
    process.exit(1);
  }
});

// 2. Check js/inscrits.js
const inscritsJs = fs.readFileSync('js/inscrits.js', 'utf8');
const requiredInscritsJsFeatures = [
  "const passInput = document.getElementById('reg-password')",
  "const confirmPassInput = document.getElementById('reg-confirm-password')",
  "togglePassBtn",
  "score < 50",
  "password !== confirmPass",
  "password: password"
];

requiredInscritsJsFeatures.forEach(feature => {
  if (inscritsJs.includes(feature)) {
    console.log(`✓ [js/inscrits.js] feature '${feature}' verified`);
  } else {
    console.error(`✕ [js/inscrits.js] missing '${feature}'`);
    process.exit(1);
  }
});

// 3. Check pages/register.html
const registerHtml = fs.readFileSync('pages/register.html', 'utf8');
if (registerHtml.includes('id="reg-password"') && registerHtml.includes('id="reg-confirm-password"')) {
  console.log(`✓ [pages/register.html] Password and Confirm Password fields verified`);
} else {
  console.error(`✕ [pages/register.html] Password fields missing`);
  process.exit(1);
}

// 4. Check js/auth.js
const authJs = fs.readFileSync('js/auth.js', 'utf8');
if (authJs.includes('confirmPasswordInput') && authJs.includes('Passwords do not match')) {
  console.log(`✓ [js/auth.js] Confirm Password validation verified`);
} else {
  console.error(`✕ [js/auth.js] Confirm Password validation missing`);
  process.exit(1);
}

// 5. Check js/i18n.js for password keys
const i18nJs = fs.readFileSync('js/i18n.js', 'utf8');
const passwordKeys = [
  'inscrits_password',
  'inscrits_confirm_password',
  'inscrits_password_strength_label',
  'inscrits_password_hint',
  'show_password',
  'hide_password'
];

passwordKeys.forEach(k => {
  const count = (i18nJs.match(new RegExp(`("${k}":|\\b${k}:)`, 'g')) || []).length;
  if (count >= 2) {
    console.log(`✓ [js/i18n.js] key '${k}' present in both EN and FR (count: ${count})`);
  } else {
    console.error(`✕ [js/i18n.js] key '${k}' missing or not in both languages (count: ${count})`);
    process.exit(1);
  }
});

// 6. Test HTTP server GET for /pages/inscrits.html
http.get('http://localhost:3000/pages/inscrits.html', (res) => {
  console.log(`HTTP GET /pages/inscrits.html -> Status: ${res.statusCode}`);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 200 && data.includes('reg-password') && data.includes('reg-confirm-password')) {
      console.log('✅ ALL PASSWORD REGISTRATION TESTS PASSED SUCCESSFULLY!');
      process.exit(0);
    } else {
      console.error('✕ Response validation failed');
      process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error('HTTP Request failed:', err.message);
  process.exit(1);
});
