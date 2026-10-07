const fs = require('fs');
const vm = require('vm');

console.log('=== TEST I18N EN / FR FOR "WATCH VIDEOS" -> "REGARDEZ LES VIDÉOS" ===');

const i18nContent = fs.readFileSync('js/i18n.js', 'utf8');

// 1. Check fr dictionary
if (i18nContent.includes("nav_watch: 'Regardez les vidéos',")) {
  console.log("✓ [FR Dict] nav_watch: 'Regardez les vidéos'");
} else {
  console.error("✕ [FR Dict] Missing nav_watch: 'Regardez les vidéos'");
}

if (i18nContent.includes("shorts_section_title: 'Regardez les vidéos : ',")) {
  console.log("✓ [FR Dict] shorts_section_title: 'Regardez les vidéos : '");
} else {
  console.error("✕ [FR Dict] Missing shorts_section_title: 'Regardez les vidéos : '");
}

if (i18nContent.includes("shorts_badge_reels: '🎬 Regardez les vidéos & Reels',")) {
  console.log("✓ [FR Dict] shorts_badge_reels: '🎬 Regardez les vidéos & Reels'");
} else {
  console.error("✕ [FR Dict] Missing shorts_badge_reels: '🎬 Regardez les vidéos & Reels'");
}

// 2. Check en dictionary
if (i18nContent.includes("nav_watch: 'Watch Videos',")) {
  console.log("✓ [EN Dict] nav_watch: 'Watch Videos'");
} else {
  console.error("✕ [EN Dict] Missing nav_watch: 'Watch Videos'");
}

if (i18nContent.includes("shorts_section_title: 'Watch Videos : ',")) {
  console.log("✓ [EN Dict] shorts_section_title: 'Watch Videos : '");
} else {
  console.error("✕ [EN Dict] Missing shorts_section_title: 'Watch Videos : '");
}

// 3. Test DOM simulation
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
    return this.innerHTML.replace(/<[^>]+>/g, '');
  }

  set textContent(val) {
    this.innerHTML = val;
  }

  setAttribute(k, v) { this.attributes[k] = v; }
  getAttribute(k) { return this.attributes[k] !== undefined ? this.attributes[k] : null; }
  hasAttribute(k) { return this.attributes[k] !== undefined; }

  querySelector(sel) { return null; }
  querySelectorAll(sel) { return []; }

  addEventListener(evt, fn) {}
  removeEventListener(evt, fn) {}

  classList = {
    contains: (c) => this.className.split(' ').includes(c),
    add: (c) => {},
    remove: (c) => {},
    toggle: (c, cond) => {}
  };
}

const elements = [];
function createElement(tag, attrs = {}, initialHtml = '', className = '') {
  const el = new MockElement(tag, attrs.id || '', className);
  for (const [k, v] of Object.entries(attrs)) {
    el.setAttribute(k, v);
  }
  el.innerHTML = initialHtml;
  el._textContent = initialHtml.replace(/<[^>]+>/g, '');
  elements.push(el);
  return el;
}

const navWatch = createElement('a', { 'data-i18n': 'nav_watch', href: 'watch.html' }, 'Watch Videos', 'nav-link');
const navWatchStandard = createElement('a', { href: 'watch.html' }, 'Watch Videos', 'nav-link');
const sectionTitleWatch = createElement('span', { 'data-i18n': 'shorts_section_title' }, 'Watch Videos : ');
const badgeWatch = createElement('span', { 'data-i18n': 'shorts_badge_reels' }, '🎬 Watch Videos & Reels', 'crystal-badge');
const unTaggedHeading = createElement('h2', {}, 'Watch Videos : Shorts des Membres Inscrits', 'shorts-page-title');

const store = {};
const mockWindow = {
  location: { pathname: '/index.html' },
  localStorage: {
    getItem: (k) => store[k] || null,
    setItem: (k, v) => { store[k] = v; }
  },
  navigator: { language: 'fr' },
  document: {
    documentElement: { lang: 'fr', setAttribute: (k, v) => {} },
    querySelectorAll: (selector) => {
      const parts = selector.split(',').map(s => s.trim());
      return elements.filter(e => {
        for (const p of parts) {
          if (p === '[data-i18n]' && e.hasAttribute('data-i18n')) return true;
          if (p === '[data-i18n-placeholder]' && e.hasAttribute('data-i18n-placeholder')) return true;
          if (p === '[data-i18n-title]' && e.hasAttribute('data-i18n-title')) return true;
          if (p.startsWith('.') && e.className.split(' ').includes(p.slice(1))) return true;
          if (p === e.tagName.toLowerCase()) return true;
        }
        return false;
      });
    },
    getElementById: (id) => elements.find(e => e.id === id) || null,
    addEventListener: () => {}
  },
  CustomEvent: function(name, opts) { this.name = name; this.detail = opts ? opts.detail : {}; },
  dispatchEvent: () => {}
};
mockWindow.window = mockWindow;

vm.runInNewContext(i18nContent, mockWindow);
const i18n = mockWindow.EnglishBooster.i18n;

let errors = 0;
function assert(desc, actual, expected) {
  if (actual === expected) {
    console.log(`✓ ${desc}: "${actual}"`);
  } else {
    console.error(`✕ ${desc}: Expected "${expected}", got "${actual}"`);
    errors++;
  }
}

// TEST IN FRENCH MODE
console.log('\n--- TESTING FRENCH MODE ("fr") ---');
i18n.setLanguage('fr', false);
assert('navWatch data-i18n (FR)', navWatch.innerHTML, 'Regardez les vidéos');
assert('navWatchStandard via linkMap/fallback (FR)', navWatchStandard.textContent, 'Regardez les vidéos');
assert('sectionTitleWatch data-i18n (FR)', sectionTitleWatch.innerHTML, 'Regardez les vidéos : ');
assert('badgeWatch data-i18n (FR)', badgeWatch.innerHTML, '🎬 Regardez les vidéos & Reels');
assert('unTaggedHeading fallback replace (FR)', unTaggedHeading.innerHTML.includes('Regardez les vidéos'), true);

// TEST IN ENGLISH MODE
console.log('\n--- TESTING ENGLISH MODE ("en") ---');
i18n.setLanguage('en', false);
assert('navWatch data-i18n (EN)', navWatch.innerHTML, 'Watch Videos');
assert('navWatchStandard via linkMap/fallback (EN)', navWatchStandard.textContent, 'Watch Videos');
assert('sectionTitleWatch data-i18n (EN)', sectionTitleWatch.innerHTML, 'Watch Videos : ');
assert('badgeWatch data-i18n (EN)', badgeWatch.innerHTML, '🎬 Watch Videos & Reels');
assert('unTaggedHeading fallback replace (EN)', unTaggedHeading.innerHTML.includes('Watch Videos'), true);

console.log(`\n=== RESULTS: ${errors === 0 ? 'ALL CHECKS PASSED PERFECTLY! ✓' : `${errors} TEST(S) FAILED`} ===`);
process.exit(errors > 0 ? 1 : 0);
