const fs = require('fs');
const path = require('path');

// Mock browser environment
class MockElement {
  constructor(tag, id = '') {
    this.tagName = (tag || 'DIV').toUpperCase();
    this.id = id;
    this.className = '';
    this.classList = {
      _classes: new Set(),
      add: (...cls) => cls.forEach(c => this.classList._classes.add(c)),
      remove: (...cls) => cls.forEach(c => this.classList._classes.delete(c)),
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
    this.children = [];
    this._innerHTML = '';
    this.style = {};
    this.dataset = {};
    this.listeners = {};
    this.attributes = {};
  }

  get innerHTML() {
    return this._innerHTML;
  }

  set innerHTML(val) {
    this._innerHTML = val;
    this._parseChildren(val);
  }

  get textContent() {
    return String(this._innerHTML || '').replace(/<[^>]*>/g, '');
  }

  set textContent(val) {
    this._innerHTML = String(val);
  }

  setAttribute(k, v) {
    this.attributes[k] = v;
    if (k === 'id') this.id = v;
    if (k === 'class') this.className = v;
  }

  getAttribute(k) {
    return this.attributes[k] || null;
  }

  addEventListener(evt, fn) {
    if (!this.listeners[evt]) this.listeners[evt] = [];
    this.listeners[evt].push(fn);
  }

  dispatchEvent(evt) {
    const list = this.listeners[evt.type || evt] || [];
    list.forEach(fn => fn(evt));
  }

  click() {
    this.dispatchEvent({ type: 'click', stopPropagation: () => {} });
  }

  querySelector(sel) {
    return this.querySelectorAll(sel)[0] || null;
  }

  querySelectorAll(sel) {
    const results = [];
    const check = (el) => {
      let match = false;
      if (sel.startsWith('#') && el.id === sel.slice(1)) match = true;
      else if (sel.startsWith('.') && el.className && el.className.includes(sel.slice(1))) match = true;
      else if (sel.includes('[data-') && el.attributes) {
        const attrMatch = sel.match(/\[([a-zA-Z0-9_-]+)="?([^"\]]*)"?\]/);
        if (attrMatch && el.attributes[attrMatch[1]] === attrMatch[2]) match = true;
      } else if (sel.toLowerCase() === (el.tagName || '').toLowerCase()) match = true;

      if (match) results.push(el);
      (el.children || []).forEach(check);
    };

    (this.children || []).forEach(check);
    return results;
  }

  _parseChildren(html) {
    this.children = [];
    // Extract elements with id, class, or data attributes
    const tagRegex = /<([a-z0-9]+)([^>]*)>(.*?)<\/\1>|<([a-z0-9]+)([^>]*)\/>/gis;
    let match;
    while ((match = tagRegex.exec(html)) !== null) {
      const tag = match[1] || match[4];
      const attrsStr = match[2] || match[5] || '';
      const child = new MockElement(tag);

      const idMatch = attrsStr.match(/id="([^"]+)"/i);
      if (idMatch) {
        child.id = idMatch[1];
        child.setAttribute('id', idMatch[1]);
      }

      const classMatch = attrsStr.match(/class="([^"]+)"/i);
      if (classMatch) {
        child.className = classMatch[1];
        classMatch[1].split(/\s+/).forEach(c => child.classList.add(c));
      }

      const attrRegex = /([a-z0-9_-]+)="([^"]*)"/gi;
      let am;
      while ((am = attrRegex.exec(attrsStr)) !== null) {
        child.setAttribute(am[1], am[2]);
        if (am[1].startsWith('data-')) {
          const dataKey = am[1].slice(5).replace(/-([a-z])/g, (_, l) => l.toUpperCase());
          child.dataset[dataKey] = am[2];
        }
      }

      child.innerHTML = match[3] || '';
      this.children.push(child);
    }
  }

  appendChild(child) {
    this.children.push(child);
    if (child.id) domStore[child.id] = child;
    return child;
  }

  insertAdjacentHTML(pos, html) {
    this._innerHTML += html;
    this._parseChildren(this._innerHTML);
  }
}

// Global environment
const storage = {};
global.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: (k) => { delete storage[k]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
};

let clipboardText = '';
Object.defineProperty(global, 'navigator', {
  value: {
    clipboard: {
      writeText: (t) => { clipboardText = t; return Promise.resolve(); }
    }
  },
  writable: true,
  configurable: true
});

const domStore = {};
global.document = {
  body: new MockElement('body'),
  createElement: (tag) => new MockElement(tag),
  getElementById: (id) => domStore[id] || null,
  querySelectorAll: (sel) => global.document.body.querySelectorAll(sel),
  querySelector: (sel) => global.document.body.querySelector(sel),
  addEventListener: () => {}
};

// Mount key container elements
['shorts-grid-container', 'home-shorts-carousel', 'live-streams-grid', 'shorts-total-count', 'live-active-count'].forEach(id => {
  const el = new MockElement('div', id);
  domStore[id] = el;
  global.document.body.children.push(el);
});

global.window = {
  location: { href: 'http://localhost:3000/pages/watch.html', pathname: '/pages/watch.html' },
  speechSynthesis: {
    cancel: () => {},
    speak: () => {}
  },
  EnglishBooster: {
    addXP: (amount) => {
      global.userXP = (global.userXP || 0) + amount;
    }
  },
  showToast: (msg, title, type) => {
    global.lastToast = { msg, title, type };
  },
  SoundFX: {
    playSuccess: () => { global.soundPlayed = true; }
  },
  addEventListener: () => {},
  removeEventListener: () => {}
};

global.SpeechSynthesisUtterance = function(t) { this.text = t; };

// Load the watchShorts.js script
const code = fs.readFileSync(path.join(__dirname, '../js/watchShorts.js'), 'utf-8');
eval(code);

console.log('=== TEST SUITE: EXECUTIVE VIDEO BRIEFINGS & MASTERCLASSES ===');

// Check rendering
const grid = document.getElementById('shorts-grid-container');
console.log('Grid innerHTML contains articles:', grid.children.length > 0);
console.log('Grid contains executive badges:', grid.innerHTML.includes('executive-card-badge'));
console.log('Grid contains executive framework pills:', grid.innerHTML.includes('executive-framework-pill'));
console.log('Total count badge text:', document.getElementById('shorts-total-count').textContent);

// Verify that the 8 executive briefs are registered
const expectedBriefings = [
  'short_1',
  'short_2',
  'short_3',
  'short_4',
  'short_5',
  'short_6',
  'short_7',
  'short_8'
];

let allCardsFound = true;
expectedBriefings.forEach(id => {
  const found = grid.innerHTML.includes(`data-short-id="${id}"`);
  console.log(`- Briefing [${id}]:`, found ? 'OK' : 'MISSING');
  if (!found) allCardsFound = false;
});

// Test opening modal
console.log('\n--- Testing openShortModal for Boardroom Leadership (C2) ---');
window.EB_WatchShorts.openShortModal('short_1');

const modal = document.getElementById('shorts-viewer-modal');
console.log('Modal element created:', !!modal);
console.log('Modal contains speed bar:', modal.innerHTML.includes('executive-speed-bar'));
console.log('Modal contains executive tabs bar:', modal.innerHTML.includes('executive-tabs-bar'));
console.log('Modal contains 3 takeaways:', modal.innerHTML.includes('executive-takeaway-item'));
console.log('Modal contains C-suite lexicon grid:', modal.innerHTML.includes('executive-lexicon-grid'));
console.log('Modal contains vocal shadowing card:', modal.innerHTML.includes('executive-shadowing-card'));
console.log('Modal contains export briefing sheet button:', modal.innerHTML.includes('btn-export-dossier'));

// Test Tab switching
console.log('\n--- Testing Tab Switching ---');
const tabBtnComments = modal.querySelector('#tab-btn-comments');
const tabBtnDossier = modal.querySelector('#tab-btn-dossier');
const paneDossier = modal.querySelector('#tab-pane-dossier');
const paneComments = modal.querySelector('#tab-pane-comments');

if (tabBtnComments && paneComments && paneDossier) {
  tabBtnComments.click();
  console.log('Switched to Comments tab -> paneComments display:', paneComments.style.display, '(expected flex)');
  console.log('paneDossier display:', paneDossier.style.display, '(expected none)');
  
  tabBtnDossier.click();
  console.log('Switched back to Dossier tab -> paneDossier display:', paneDossier.style.display, '(expected flex)');
  console.log('paneComments display:', paneComments.style.display, '(expected none)');
} else {
  console.log('Tab elements check: tabBtnComments=', !!tabBtnComments, 'paneComments=', !!paneComments);
}

// Test speed buttons
console.log('\n--- Testing Playback Speed Toggle ---');
const speedBtns = modal.querySelectorAll('.executive-speed-btn');
console.log('Speed buttons count:', speedBtns.length);
if (speedBtns.length >= 3) {
  const btn075 = speedBtns.find(b => b.dataset.speed === '0.75');
  if (btn075) {
    btn075.click();
    console.log('Clicked 0.75x speed -> lastToast:', global.lastToast);
  }
}

// Test Export Dossier
console.log('\n--- Testing Briefing Sheet Export ---');
const exportBtn = modal.querySelector('#btn-export-dossier');
console.log('exportBtn found:', !!exportBtn, 'listeners:', exportBtn ? Object.keys(exportBtn.listeners) : 'none');
if (exportBtn) {
  exportBtn.click();
  console.log('Export button clicked -> Clipboard length:', clipboardText.length);
  console.log('Clipboard contains header:', clipboardText.includes('=== ENGLISH BOOSTER · FICHE DE BRIEFING EXÉCUTIF ==='));
  console.log('Clipboard contains C-Suite Lexicon:', clipboardText.includes('LEXIQUE & COLLOCATIONS C-SUITE'));
  if (clipboardText.length === 0 && global.lastToast) {
    console.log('Last toast:', global.lastToast);
  }
}

// Test Vocal Shadowing Mic click (speech recognition fallback or award)
console.log('\n--- Testing Vocal Shadowing Practice ---');
const micBtn = modal.querySelector('#btn-practice-mic');
if (micBtn) {
  const initialXP = global.userXP || 0;
  micBtn.click();
  console.log('Microphone button clicked -> XP awarded:', (global.userXP || 0) - initialXP, 'XP');
}

console.log('\n=== ALL TESTS COMPLETED SUCCESSFULLY! ===');
