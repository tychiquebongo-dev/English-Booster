const fs = require('fs');
const path = require('path');

console.log('=== TEST SUITE: ELEVATED AI VOICE ENGINE & STUDIO ===');

// Setup mock environment
const storage = {};
global.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: (k) => { delete storage[k]; }
};

let spokenUtterances = [];
class MockUtterance {
  constructor(text) {
    this.text = text;
    this.volume = 1.0;
    this.rate = 1.0;
    this.pitch = 1.0;
    this.lang = 'en-US';
    this.voice = null;
    this.onstart = null;
    this.onend = null;
    this.onerror = null;
  }
}
global.SpeechSynthesisUtterance = MockUtterance;

const mockVoices = [
  { name: 'Microsoft Jenny Online (Natural) - English (United States)', lang: 'en-US' },
  { name: 'Microsoft Guy Online (Natural) - English (United States)', lang: 'en-US' },
  { name: 'Microsoft Sonia Online (Natural) - English (United Kingdom)', lang: 'en-GB' },
  { name: 'Microsoft Ryan Online (Natural) - English (United Kingdom)', lang: 'en-GB' },
  { name: 'Google US English', lang: 'en-US' },
  { name: 'Google UK English Female', lang: 'en-GB' },
  { name: 'Google UK English Male', lang: 'en-GB' }
];

global.window = {
  speechSynthesis: {
    getVoices: () => mockVoices,
    cancel: () => {},
    speak: (utt) => {
      spokenUtterances.push(utt);
      if (utt.onstart) utt.onstart();
      setTimeout(() => {
        if (utt.onend) utt.onend();
      }, 10);
    }
  },
  EnglishBooster: {
    SoundFX: {
      getContext: () => ({
        currentTime: 0,
        destination: {},
        createOscillator: () => ({
          frequency: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
          connect: () => {},
          start: () => {},
          stop: () => {}
        }),
        createGain: () => ({
          gain: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
          connect: () => {}
        })
      })
    },
    showToast: (title, msg, type) => {
      global.lastToast = { title, msg, type };
    }
  },
  dispatchEvent: () => {},
  addEventListener: () => {}
};

class MockElement {
  constructor(tag, id = '') {
    this.tagName = (tag || 'DIV').toUpperCase();
    this.id = id;
    this.className = '';
    this.classList = {
      _set: new Set(),
      add: (...c) => c.forEach(x => this.classList._set.add(x)),
      remove: (...c) => c.forEach(x => this.classList._set.delete(x)),
      contains: (x) => this.classList._set.has(x),
      toggle: (x, f) => {
        if (f === undefined) {
          if (this.classList._set.has(x)) this.classList._set.delete(x);
          else this.classList._set.add(x);
        } else if (f) {
          this.classList._set.add(x);
        } else {
          this.classList._set.delete(x);
        }
      }
    };
    this.children = [];
    this.attributes = {};
    this.dataset = {};
    this.style = {};
    this.listeners = {};
    this._innerHTML = '';
  }

  get innerHTML() { return this._innerHTML; }
  set innerHTML(val) {
    this._innerHTML = val;
    this._parse(val);
  }

  get textContent() { return String(this._innerHTML || '').replace(/<[^>]*>/g, ''); }
  set textContent(v) { this._innerHTML = String(v); }

  setAttribute(k, v) {
    this.attributes[k] = v;
    if (k === 'id') this.id = v;
    if (k === 'class') this.className = v;
  }
  getAttribute(k) { return this.attributes[k] || null; }

  addEventListener(evt, fn) {
    if (!this.listeners[evt]) this.listeners[evt] = [];
    this.listeners[evt].push(fn);
  }

  dispatchEvent(evt) {
    (this.listeners[evt.type || evt] || []).forEach(fn => fn(evt));
  }

  click() { this.dispatchEvent({ type: 'click', stopPropagation: () => {}, preventDefault: () => {} }); }

  querySelector(sel) { return this.querySelectorAll(sel)[0] || null; }
  querySelectorAll(sel) {
    const res = [];
    const walk = (el) => {
      let m = false;
      if (sel.startsWith('#') && el.id === sel.slice(1)) m = true;
      else if (sel.startsWith('.') && el.className && el.className.includes(sel.slice(1))) m = true;
      else if (sel.includes('[data-') && el.attributes) {
        const attrM = sel.match(/\[([a-zA-Z0-9_-]+)="?([^"\]]*)"?\]/);
        if (attrM && el.attributes[attrM[1]] === attrM[2]) m = true;
      } else if (sel.toLowerCase() === (el.tagName || '').toLowerCase()) m = true;
      if (m) res.push(el);
      (el.children || []).forEach(walk);
    };
    (this.children || []).forEach(walk);
    return res;
  }

  _parse(html) {
    this.children = [];
    const tagRegex = /<([a-z0-9]+)([^>]*)>(.*?)<\/\1>|<([a-z0-9]+)([^>]*)\/>/gis;
    let match;
    while ((match = tagRegex.exec(html)) !== null) {
      const tag = match[1] || match[4];
      const attrsStr = match[2] || match[5] || '';
      const child = new MockElement(tag);

      const idMatch = attrsStr.match(/id="([^"]+)"/i);
      if (idMatch) { child.id = idMatch[1]; child.setAttribute('id', idMatch[1]); }

      const classMatch = attrsStr.match(/class="([^"]+)"/i);
      if (classMatch) {
        child.className = classMatch[1];
        child.setAttribute('class', classMatch[1]);
        classMatch[1].split(/\s+/).forEach(c => child.classList.add(c));
      }

      const attrRegex = /([a-z0-9_-]+)="([^"]*)"/gi;
      let am;
      while ((am = attrRegex.exec(attrsStr)) !== null) {
        child.setAttribute(am[1], am[2]);
        if (am[1].startsWith('data-')) {
          const key = am[1].slice(5).replace(/-([a-z])/g, (_, l) => l.toUpperCase());
          child.dataset[key] = am[2];
        }
      }

      child.innerHTML = match[3] || '';
      this.children.push(child);
    }
  }

  appendChild(c) {
    this.children.push(c);
    if (c.id) global.documentStore[c.id] = c;
    return c;
  }
}

global.documentStore = {};
global.document = {
  body: new MockElement('body'),
  createElement: (t) => new MockElement(t),
  getElementById: (id) => global.documentStore[id] || global.document.body.querySelector('#' + id),
  querySelectorAll: (sel) => global.document.body.querySelectorAll(sel),
  querySelector: (sel) => global.document.body.querySelector(sel),
  addEventListener: () => {}
};

// Evaluate aiVoiceEngine.js
const engineCode = fs.readFileSync(path.join(__dirname, '../js/aiVoiceEngine.js'), 'utf-8');
eval(engineCode);

const engine = global.window.AIVoiceEngine;
console.log('1. AIVoiceEngine instantiated:', !!engine);

// Check personas
const personas = engine.getPersonas();
const personaKeys = Object.keys(personas);
console.log('2. Personas available:', personaKeys);
console.log('   Nova 🇺🇸:', personas.nova?.name, '-', personas.nova?.tag);
console.log('   Aria 🇬🇧:', personas.aria?.name, '-', personas.aria?.tag);
console.log('   Marcus 🇺🇸:', personas.marcus?.name, '-', personas.marcus?.tag);
console.log('   Liam 🇬🇧:', personas.liam?.name, '-', personas.liam?.tag);
console.log('   Emma 🇦🇺:', personas.emma?.name, '-', personas.emma?.tag);

if (personaKeys.length !== 5) {
  throw new Error('Expected 5 personas, got: ' + personaKeys.length);
}

// Check initial configuration (Elevated Volume = 1.0)
console.log('3. Initial config volume:', engine.config.volume, '(Elevated 100% Volume expected)');
if (engine.config.volume !== 1.0) {
  throw new Error('Initial volume must be 1.0 (elevated volume)');
}

// Test speak function
spokenUtterances = [];
engine.speak("Welcome to English Booster. Let us master executive English.");
console.log('4. Spoken utterance count:', spokenUtterances.length);
const firstUtt = spokenUtterances[0];
console.log('   Utterance text:', firstUtt.text);
console.log('   Utterance volume:', firstUtt.volume, '(1.0 = Max Loudness)');
console.log('   Matched voice name:', firstUtt.voice ? firstUtt.voice.name : 'none');
if (firstUtt.volume !== 1.0) {
  throw new Error('Utterance volume must be elevated to 1.0');
}

// Test persona switching
console.log('\n5. Testing persona switching to Aria (British BBC)...');
engine.selectPersona('aria');
console.log('   Active persona after switch:', engine.getCurrentPersona().name, engine.getCurrentPersona().flag);
spokenUtterances = [];
engine.speak("Nuanced British diplomatic articulation.");
const ariaUtt = spokenUtterances[0];
console.log('   Aria utterance voice:', ariaUtt.voice ? ariaUtt.voice.name : 'none');

// Test Marcus (Deep Gravitas)
console.log('\n6. Testing Marcus (Deep Gravitas)...');
engine.selectPersona('marcus');
console.log('   Active persona:', engine.getCurrentPersona().name, engine.getCurrentPersona().flag);
spokenUtterances = [];
engine.speak("Authoritative boardroom presence.");
const marcusUtt = spokenUtterances[0];
console.log('   Marcus pitch:', marcusUtt.pitch, '(expected ~0.88 for deep tone)');

// Test Studio Modal Opening
console.log('\n7. Testing AI Voice Studio Modal Opening...');
engine.openStudioModal();
const modal = document.getElementById('ai-voice-studio-modal');
console.log('   Studio Modal element created:', !!modal);
console.log('   Modal contains 5 personas:', modal.querySelectorAll('.ai-voice-persona-card').length === 5);
console.log('   Modal contains volume elevation slider:', modal.innerHTML.includes('slider-voice-volume'));
console.log('   Modal contains cadence slider:', modal.innerHTML.includes('slider-voice-rate'));
console.log('   Modal contains pitch slider:', modal.innerHTML.includes('slider-voice-pitch'));
console.log('   Modal contains presence boost switch:', modal.innerHTML.includes('toggle-voice-boost'));
console.log('   Modal contains waveform bars:', modal.innerHTML.includes('ai-voice-wave-bar'));

// Test live voice test
console.log('\n8. Testing Live Test Voice button...');
engine.testVoice('nova');
console.log('   Last toast title:', global.lastToast?.title);
console.log('   Last toast message:', global.lastToast?.msg);

console.log('\n=== ALL ELEVATED AI VOICE ENGINE TESTS PASSED! ===');
