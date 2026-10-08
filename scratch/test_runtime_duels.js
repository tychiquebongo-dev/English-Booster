/**
 * RUNTIME SIMULATION TEST FOR 5 ACTIVE DUEL MODES
 * Simulates DOM, speech synthesis, and full interactive flow
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('--- Starting Runtime Simulation of 5 Duel Modes ---');

// Mock DOM & Browser Environment
function createMockEnvironment() {
  const elements = {};
  function getEl(id) {
    if (!elements[id]) {
      elements[id] = {
        id,
        style: {},
        classList: {
          classes: new Set(),
          add(c) { this.classes.add(c); },
          remove(c) { this.classes.delete(c); },
          contains(c) { return this.classes.has(c); }
        },
        innerHTML: '',
        textContent: '',
        value: '',
        listeners: {},
        addEventListener(event, fn) {
          if (!this.listeners[event]) this.listeners[event] = [];
          this.listeners[event].push(fn);
        },
        click() {
          if (this.listeners['click']) {
            this.listeners['click'].forEach(fn => fn({ target: this, stopPropagation: () => {} }));
          }
        },
        removeAttribute() {},
        setAttribute() {},
        querySelectorAll(sel) {
          return [];
        }
      };
    }
    return elements[id];
  }

  const dom = {
    getElementById: (id) => getEl(id),
    querySelectorAll: (selector) => {
      if (selector.includes('.btn-arena-start')) {
        return ['speed_duel', 'debate', 'roleplay', 'phonetics', 'cefr_grand'].map(mode => {
          const el = getEl('btn-start-' + mode);
          el.getAttribute = (attr) => (attr === 'data-mode' ? mode : null);
          return el;
        });
      }
      if (selector.includes('.arena-card')) {
        return ['speed_duel', 'debate', 'roleplay', 'phonetics', 'cefr_grand'].map(mode => {
          const el = getEl('card-' + mode);
          el.getAttribute = (attr) => (attr === 'data-arena-id' ? mode : null);
          return el;
        });
      }
      return [];
    },
    body: { style: {} },
    documentElement: { getAttribute: () => 'fr' },
    addEventListener: (event, fn) => {
      if (event === 'DOMContentLoaded') {
        // Trigger immediately
        fn();
      }
    }
  };

  const win = {
    document: dom,
    location: { search: '' },
    URLSearchParams: global.URLSearchParams,
    speechSynthesis: {
      cancel() {},
      getVoices: () => [{ lang: 'en-US', name: 'Google US English' }],
      speak(utterance) {
        // Automatically complete utterance on next tick
        setTimeout(() => {
          if (utterance.onend) utterance.onend();
        }, 15);
      }
    },
    SpeechSynthesisUtterance: function(text) {
      this.text = text;
      this.rate = 1;
      this.pitch = 1;
      this.lang = 'en-US';
      this.onend = null;
      this.onerror = null;
    },
    EnglishBooster: {
      SoundFX: { playClick() {}, playSuccess() {} },
      showToast(title, msg) {
        // console.log(`   [Toast] ${title}: ${msg}`);
      },
      addXP(xp, reason) {
        // console.log(`   [XP Awarded] +${xp} XP: ${reason}`);
      },
      updateUserState() {},
      launchConfetti() {},
      i18n: { getLang: () => 'en' },
      currentUser: { speakingMinutes: 120 }
    },
    setTimeout: (fn, ms) => setTimeout(fn, Math.min(ms, 25)),
    clearTimeout,
    setInterval: (fn, ms) => setInterval(fn, Math.min(ms, 25)),
    clearInterval,
    console
  };
  win.window = win;

  return { win, dom, elements };
}

// Read challenges.js
const code = fs.readFileSync(path.join(__dirname, '../js/challenges.js'), 'utf8');

const modes = ['speed_duel', 'debate', 'roleplay', 'phonetics', 'cefr_grand'];

modes.forEach(modeId => {
  console.log(`\nTesting Mode: '${modeId}'...`);
  const env = createMockEnvironment();
  const context = vm.createContext(env.win);
  vm.runInContext(code, context);

  const app = context.challengesApp;
  if (!app) throw new Error('challengesApp not instantiated');

  // 1. Open Arena
  app.openArena(modeId);
  if (!app.currentMode || app.currentMode.id !== modeId) {
    throw new Error(`Current mode mismatch: expected ${modeId}, got ${app.currentMode?.id}`);
  }
  console.log(`  1. Arena opened: ${app.currentMode.name} (Rounds: ${app.currentMode.roundCount})`);

  // 2. Launch Battle Duel directly
  app.launchBattleDuel();
  if (app.currentRound !== 1 || !app.isMyTurn) {
    throw new Error(`Round 1 initialization failed for ${modeId}`);
  }
  console.log(`  2. Round 1 launched. Topic: "${app.getCurrentRoundData().topic.substring(0, 45)}..."`);

  // 3. User takes turn
  const suggestions = app.getCurrentRoundData().userSuggestions;
  if (!suggestions || suggestions.length === 0) {
    throw new Error(`No suggestions found for round 1 in ${modeId}`);
  }
  app.selectSuggestion(suggestions[0]);
  console.log(`  3. User spoke argument: "${suggestions[0].substring(0, 40)}..."`);

  // 4. Test Advance to Next Round (Round 2)
  app.advanceToNextRound();
  if (app.currentRound !== 2) {
    throw new Error(`Failed to advance to Round 2 in ${modeId}`);
  }
  console.log(`  4. Round 2 active. New Topic: "${app.getCurrentRoundData().topic.substring(0, 45)}..."`);

  // 5. Test Advance to Round 3
  app.advanceToNextRound();
  if (app.currentRound !== 3) {
    throw new Error(`Failed to advance to Round 3 in ${modeId}`);
  }
  console.log(`  5. Round 3 active. New Topic: "${app.getCurrentRoundData().topic.substring(0, 45)}..."`);

  // 6. Test Duel Completion & AI Evaluation
  app.finishBattleAndEvaluate();
  const resultsCefr = env.elements['result-cefr-you']?.textContent;
  if (!resultsCefr) {
    throw new Error(`Scorecard result CEFR empty for ${modeId}`);
  }
  const customBoxHtml = env.elements['result-mode-custom-box']?.innerHTML;
  if (!customBoxHtml) {
    throw new Error(`Mode-specific custom evaluation box missing for ${modeId}`);
  }

  console.log(`  6. Duel Finished! Verified CEFR Score: ${resultsCefr}`);
  console.log(`     Custom Mode Breakdown rendered: ${customBoxHtml.length} chars (e.g. ${modeId === 'cefr_grand' ? 'Official Certificate' : 'Mode Breakdown'})`);
  console.log(`  ✓ Mode '${modeId}' passed all conversational stages!`);
});

console.log('\n🎉 ALL 5 ACTIVE DUEL MODES FULLY TESTED AND OPERATIONAL!');
