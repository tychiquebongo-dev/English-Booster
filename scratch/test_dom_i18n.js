const fs = require('fs');

// Simple DOM Mock
class MockElement {
  constructor(tag, className = '') {
    this.tagName = tag.toUpperCase();
    this.className = className;
    this.attributes = {};
    this.children = [];
    this.parentElement = null;
    this.textContent = '';
    this._innerHTML = '';
    this.style = {};
    this.classList = {
      _classes: new Set(className.split(' ').filter(Boolean)),
      add: (c) => this.classList._classes.add(c),
      remove: (c) => this.classList._classes.delete(c),
      toggle: (c, force) => {
        if (force === undefined) {
          if (this.classList._classes.has(c)) this.classList._classes.delete(c);
          else this.classList._classes.add(c);
        } else if (force) {
          this.classList._classes.add(c);
        } else {
          this.classList._classes.delete(c);
        }
      },
      contains: (c) => this.classList._classes.has(c)
    };
  }

  get innerHTML() {
    return this._innerHTML || this.textContent;
  }

  set innerHTML(val) {
    this._innerHTML = val;
    this.textContent = val.replace(/<[^>]+>/g, '');
  }

  setAttribute(k, v) { this.attributes[k] = v; }
  getAttribute(k) { return this.attributes[k] || null; }
  hasAttribute(k) { return k in this.attributes; }

  appendChild(child) {
    child.parentElement = this;
    this.children.push(child);
  }

  prepend(child) {
    child.parentElement = this;
    this.children.unshift(child);
  }

  insertBefore(newChild, refChild) {
    newChild.parentElement = this;
    const idx = this.children.indexOf(refChild);
    if (idx !== -1) {
      this.children.splice(idx, 0, newChild);
    } else {
      this.children.push(newChild);
    }
  }

  querySelector(sel) {
    const all = this.querySelectorAll(sel);
    return all.length > 0 ? all[0] : null;
  }

  querySelectorAll(sel) {
    const res = [];
    function match(el) {
      if (sel.startsWith('.') && el.classList.contains(sel.slice(1))) res.push(el);
      else if (sel.startsWith('[') && sel.endsWith(']')) {
        const attr = sel.slice(1, -1);
        if (attr.includes('=')) {
          const [k, v] = attr.split('=').map(s => s.replace(/["']/g, ''));
          if (el.getAttribute(k) === v) res.push(el);
        } else {
          if (el.hasAttribute(attr)) res.push(el);
        }
      } else if (sel.toUpperCase() === el.tagName) {
        res.push(el);
      }
      for (const c of el.children) match(c);
    }
    for (const c of this.children) match(c);
    return res;
  }

  addEventListener() {}
}

const doc = new MockElement('HTML');
const body = new MockElement('BODY');
doc.appendChild(body);

const navActions = new MockElement('DIV', 'nav-actions');
const themeBtn = new MockElement('BUTTON', 'theme-toggle-btn');
navActions.appendChild(themeBtn);
body.appendChild(navActions);

const heroTitle = new MockElement('H1', 'hero-title');
heroTitle.setAttribute('data-i18n', 'hero_title_accent');
heroTitle.textContent = 'Speaking With the World.';
body.appendChild(heroTitle);

const missionText = new MockElement('P', 'about-mission-statement-text');
missionText.setAttribute('data-i18n', 'mission_text');
missionText.textContent = 'Our platform connects learners worldwide...';
body.appendChild(missionText);

const storage = {};
global.window = {
  EnglishBooster: {},
  dispatchEvent: () => {}
};
global.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = v; }
};
global.navigator = { language: 'en-US' };
global.document = {
  documentElement: doc,
  body: body,
  querySelector: (sel) => doc.querySelector(sel),
  querySelectorAll: (sel) => doc.querySelectorAll(sel),
  getElementById: () => null,
  createElement: (tag) => new MockElement(tag),
  addEventListener: () => {}
};

// Load i18n
const i18nCode = fs.readFileSync('js/i18n.js', 'utf8');
eval(i18nCode);

// Inject switcher
window.EnglishBooster.i18n.injectSwitcherIntoNav();
const switcher = navActions.querySelector('.lang-switcher-pill');
console.log('1. Switcher injected into navbar:', Boolean(switcher));
console.log('2. Switcher buttons count:', switcher.querySelectorAll('.lang-btn').length);

// Default English text
window.EnglishBooster.i18n.setLanguage('en', false);
console.log('3. English Hero Title:', heroTitle.textContent);
console.log('4. English Mission Badge:', window.EnglishBooster.t('mission_badge'));

// Switch to French
window.EnglishBooster.i18n.setLanguage('fr', false);
console.log('5. French Hero Title:', heroTitle.textContent);
console.log('6. French Mission Badge:', window.EnglishBooster.t('mission_badge'));
console.log('7. French Mission Text starts with:', missionText.textContent.slice(0, 40) + '...');

if (heroTitle.textContent.includes('parlant') && missionText.textContent.includes('Notre plateforme')) {
  console.log('✓ TEST PASSED: DOM reacts and translates cleanly to French!');
} else {
  console.error('✗ DOM failed to update');
}
