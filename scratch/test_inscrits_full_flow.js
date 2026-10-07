const fs = require('fs');
const vm = require('vm');

console.log('=== RUNNING SIMULATED DOM TRANSLATION TEST FOR INSCRITS ===');

// Simple DOM element mock
class MockElement {
  constructor(tag, id = '', className = '') {
    this.tagName = tag.toUpperCase();
    this.id = id;
    this.className = className;
    this.attributes = {};
    this.innerHTML = '';
    this._textContent = '';
    this.children = [];
    this.dataset = {};
  }

  get textContent() {
    return this._textContent || this.innerHTML.replace(/<[^>]+>/g, '');
  }

  set textContent(val) {
    this._textContent = val;
    this.innerHTML = val;
  }

  setAttribute(k, v) {
    this.attributes[k] = v;
    if (k === 'placeholder') this.placeholder = v;
  }

  getAttribute(k) {
    return this.attributes[k] !== undefined ? this.attributes[k] : null;
  }

  hasAttribute(k) {
    return this.attributes[k] !== undefined;
  }

  classList = {
    add: (c) => {},
    remove: (c) => {},
    toggle: (c, cond) => {}
  };
}

// Build mock document with all elements from inscrits.html
const elements = [];

function createElement(tag, attrs = {}, initialHtml = '') {
  const el = new MockElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    el.setAttribute(k, v);
  }
  el.innerHTML = initialHtml;
  el._textContent = initialHtml.replace(/<[^>]+>/g, '');
  elements.push(el);
  return el;
}

// Form Labels & Inputs
const labelNom = createElement('strong', { 'data-i18n': 'inscrits_label_nom' }, 'NOM :');
const inputNom = createElement('input', { id: 'reg-nom', 'data-i18n-placeholder': 'inscrits_placeholder_nom', placeholder: 'Entrez votre nom...' });

const labelPrenom = createElement('strong', { 'data-i18n': 'inscrits_label_prenom' }, 'Prénom :');
const inputPrenom = createElement('input', { id: 'reg-prenom', 'data-i18n-placeholder': 'inscrits_placeholder_prenom', placeholder: 'Entrez votre prénom...' });

const labelEmail = createElement('strong', { 'data-i18n': 'inscrits_label_email' }, 'Adresse email :');
const inputEmail = createElement('input', { id: 'reg-email', 'data-i18n-placeholder': 'inscrits_placeholder_email', placeholder: 'votre.email@exemple.com' });

const labelCountry = createElement('strong', { 'data-i18n': 'inscrits_label_country' }, 'Nationalité :');

const searchInput = createElement('input', { id: 'search-inscrits', 'data-i18n-placeholder': 'inscrits_search_placeholder', placeholder: '🔍 Rechercher par NOM, Prénom, Email, Nationalité...' });

// Table Headers
const thProfile = createElement('th', { 'data-i18n': 'inscrits_th_profile' }, 'Profil & Statut');
const thNom = createElement('th', { 'data-i18n': 'inscrits_th_nom' }, 'NOM');
const thPrenom = createElement('th', { 'data-i18n': 'inscrits_th_prenom' }, 'Prénom');
const thEmail = createElement('th', { 'data-i18n': 'inscrits_th_email' }, 'Adresse email');
const thCountry = createElement('th', { 'data-i18n': 'inscrits_th_country' }, 'Nationalité');
const thLevel = createElement('th', { 'data-i18n': 'inscrits_th_level' }, 'Niveau CECRL');
const thActions = createElement('th', { 'data-i18n': 'inscrits_th_actions' }, "Liens d'Action Directs");

// Setup browser globals
const store = {};
const mockWindow = {
  location: { pathname: '/pages/inscrits.html' },
  localStorage: {
    getItem: (k) => store[k] || null,
    setItem: (k, v) => { store[k] = v; }
  },
  navigator: { language: 'fr' },
  document: {
    documentElement: { lang: 'fr', setAttribute: (k, v) => {} },
    querySelectorAll: (selector) => {
      if (selector === '[data-i18n]') {
        return elements.filter(e => e.hasAttribute('data-i18n'));
      }
      if (selector === '[data-i18n-placeholder]') {
        return elements.filter(e => e.hasAttribute('data-i18n-placeholder'));
      }
      if (selector === '[data-i18n-title]') {
        return elements.filter(e => e.hasAttribute('data-i18n-title'));
      }
      return [];
    },
    getElementById: (id) => elements.find(e => e.id === id) || null,
    addEventListener: () => {}
  },
  CustomEvent: function(name, opts) { this.name = name; this.detail = opts ? opts.detail : {}; },
  dispatchEvent: () => {}
};
mockWindow.window = mockWindow;

// Read and execute i18n.js
const i18nCode = fs.readFileSync('js/i18n.js', 'utf8');
vm.runInNewContext(i18nCode, mockWindow);

const i18n = mockWindow.EnglishBooster.i18n;

// TEST 1: Switch to English mode
console.log('\n--- TESTING SWITCH TO ENGLISH ("en") ---');
i18n.setLanguage('en', false);

console.log('labelNom.innerHTML:', labelNom.innerHTML);
console.log('inputNom.placeholder:', inputNom.placeholder);
console.log('labelPrenom.innerHTML:', labelPrenom.innerHTML);
console.log('inputPrenom.placeholder:', inputPrenom.placeholder);
console.log('labelEmail.innerHTML:', labelEmail.innerHTML);
console.log('inputEmail.placeholder:', inputEmail.placeholder);
console.log('labelCountry.innerHTML:', labelCountry.innerHTML);
console.log('thNom.innerHTML:', thNom.innerHTML);
console.log('thPrenom.innerHTML:', thPrenom.innerHTML);
console.log('thEmail.innerHTML:', thEmail.innerHTML);
console.log('thCountry.innerHTML:', thCountry.innerHTML);
console.log('searchInput.placeholder:', searchInput.placeholder);

let errors = 0;
function assert(desc, actual, expected) {
  if (actual === expected) {
    console.log(`✓ ${desc}: "${actual}"`);
  } else {
    console.error(`✕ ${desc}: Expected "${expected}", got "${actual}"`);
    errors++;
  }
}

assert('Nom Label (EN)', labelNom.innerHTML, 'Name :');
assert('Nom Placeholder (EN)', inputNom.placeholder, 'Enter your name...');
assert('Prenom Label (EN)', labelPrenom.innerHTML, 'Firstname :');
assert('Prenom Placeholder (EN)', inputPrenom.placeholder, 'Enter your firstname...');
assert('Email Label (EN)', labelEmail.innerHTML, 'Email address :');
assert('Email Placeholder (EN)', inputEmail.placeholder, 'your.email@example.com');
assert('Country Label (EN)', labelCountry.innerHTML, 'Country :');
assert('TH Nom (EN)', thNom.innerHTML, 'Name');
assert('TH Prenom (EN)', thPrenom.innerHTML, 'Firstname');
assert('TH Email (EN)', thEmail.innerHTML, 'Email address');
assert('TH Country (EN)', thCountry.innerHTML, 'Country');
assert('Search Placeholder (EN)', searchInput.placeholder, '🔍 Search by Name, Firstname, Email address, Country...');

// TEST 2: Switch to French mode
console.log('\n--- TESTING SWITCH TO FRENCH ("fr") ---');
i18n.setLanguage('fr', false);

assert('Nom Label (FR)', labelNom.innerHTML, 'NOM :');
assert('Nom Placeholder (FR)', inputNom.placeholder, 'Entrez votre nom...');
assert('Prenom Label (FR)', labelPrenom.innerHTML, 'Prénom :');
assert('Prenom Placeholder (FR)', inputPrenom.placeholder, 'Entrez votre prénom...');
assert('Email Label (FR)', labelEmail.innerHTML, 'Adresse email :');
assert('Email Placeholder (FR)', inputEmail.placeholder, 'votre.email@exemple.com');
assert('Country Label (FR)', labelCountry.innerHTML, 'Nationalité :');
assert('TH Nom (FR)', thNom.innerHTML, 'NOM');
assert('TH Prenom (FR)', thPrenom.innerHTML, 'Prénom');
assert('TH Email (FR)', thEmail.innerHTML, 'Adresse email');
assert('TH Country (FR)', thCountry.innerHTML, 'Nationalité');
assert('Search Placeholder (FR)', searchInput.placeholder, '🔍 Rechercher par NOM, Prénom, Email, Nationalité...');

console.log(`\n=== RESULTS: ${errors === 0 ? 'ALL TESTS PASSED SUCCESSFULLY! ✓' : `${errors} TEST(S) FAILED`} ===`);
process.exit(errors > 0 ? 1 : 0);
