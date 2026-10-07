const fs = require('fs');

console.log('--- TEST I18N EN / FR FOR NOM, PRENOM, NATIONALITE, ADRESSE EMAIL ---');

const i18nContent = fs.readFileSync('js/i18n.js', 'utf8');
const inscritsHtml = fs.readFileSync('pages/inscrits.html', 'utf8');
const inscritsJs = fs.readFileSync('js/inscrits.js', 'utf8');

// 1. Check EN keys
const expectedEn = [
  "inscrits_label_nom: 'Name :'",
  "inscrits_placeholder_nom: 'Enter your name...'",
  "inscrits_label_prenom: 'Firstname :'",
  "inscrits_placeholder_prenom: 'Enter your firstname...'",
  "inscrits_label_email: 'Email address :'",
  "inscrits_placeholder_email: 'your.email@example.com'",
  "inscrits_label_country: 'Country :'",
  "inscrits_th_nom: 'Name'",
  "inscrits_th_prenom: 'Firstname'",
  "inscrits_th_email: 'Email address'",
  "inscrits_th_country: 'Country'",
  "inscrits_search_placeholder: '🔍 Search by Name, Firstname, Email address, Country...'"
];

expectedEn.forEach(k => {
  if (i18nContent.includes(k)) {
    console.log(`✓ [EN Dict] ${k}`);
  } else {
    console.error(`✕ [EN Dict] Missing: ${k}`);
  }
});

// 2. Check FR keys
const expectedFr = [
  "inscrits_label_nom: 'NOM :'",
  "inscrits_placeholder_nom: 'Entrez votre nom...'",
  "inscrits_label_prenom: 'Prénom :'",
  "inscrits_placeholder_prenom: 'Entrez votre prénom...'",
  "inscrits_label_email: 'Adresse email :'",
  "inscrits_placeholder_email: 'votre.email@exemple.com'",
  "inscrits_label_country: 'Nationalité :'",
  "inscrits_th_nom: 'NOM'",
  "inscrits_th_prenom: 'Prénom'",
  "inscrits_th_email: 'Adresse email'",
  "inscrits_th_country: 'Nationalité'",
  "inscrits_search_placeholder: '🔍 Rechercher par NOM, Prénom, Email, Nationalité...'"
];

expectedFr.forEach(k => {
  if (i18nContent.includes(k)) {
    console.log(`✓ [FR Dict] ${k}`);
  } else {
    console.error(`✕ [FR Dict] Missing: ${k}`);
  }
});

// 3. Check HTML bindings
const expectedHtmlBindings = [
  'data-i18n="inscrits_label_nom"',
  'data-i18n-placeholder="inscrits_placeholder_nom"',
  'data-i18n="inscrits_label_prenom"',
  'data-i18n-placeholder="inscrits_placeholder_prenom"',
  'data-i18n="inscrits_label_email"',
  'data-i18n-placeholder="inscrits_placeholder_email"',
  'data-i18n="inscrits_label_country"',
  'data-i18n-placeholder="inscrits_search_placeholder"',
  'data-i18n="inscrits_th_nom"',
  'data-i18n="inscrits_th_prenom"',
  'data-i18n="inscrits_th_email"',
  'data-i18n="inscrits_th_country"'
];

expectedHtmlBindings.forEach(b => {
  if (inscritsHtml.includes(b)) {
    console.log(`✓ [HTML Binding] ${b}`);
  } else {
    console.error(`✕ [HTML Binding] Missing: ${b}`);
  }
});

// 4. Check inscrits.js reactivity
if (inscritsJs.includes('bindLanguageChangeListener')) {
  console.log('✓ [inscrits.js] bindLanguageChangeListener implemented');
} else {
  console.error('✕ [inscrits.js] Missing bindLanguageChangeListener');
}

console.log('--- ALL CHECKS FINISHED ---');
