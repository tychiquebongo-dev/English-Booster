/**
 * ENGLISH BOOSTER — CHAT & AI GRAMMAR ENGINE (js/chat.js)
 * Real-time Simulated Messaging, Voice Notes, Emoji Picker & Pedagogical AI Grammar Corrections
 */

// Common ESL grammatical corrections database for instantaneous smart detection
const GRAMMAR_CORRECTION_RULES = [
  {
    pattern: /have\s+went/i,
    wrong: 'I have went to London yesterday.',
    correct: 'I went to London yesterday.',
    explanation: 'Use the simple past "went" instead of "have went" because "yesterday" refers to a specific, finished time in the past.'
  },
  {
    pattern: /am\s+agree/i,
    wrong: 'I am agree with you.',
    correct: 'I agree with you.',
    explanation: '"Agree" is a verb in English, not an adjective. Therefore, say "I agree" rather than "I am agree".'
  },
  {
    pattern: /she\s+don'?t/i,
    wrong: "She don't like spicy food.",
    correct: "She doesn't like spicy food.",
    explanation: 'With third-person singular subjects (he, she, it), use "does not" or "doesn\'t" in the present simple tense.'
  },
  {
    pattern: /people\s+is/i,
    wrong: 'People is very friendly here.',
    correct: 'People are very friendly here.',
    explanation: '"People" is a plural noun in English, so it requires the plural verb "are".'
  },
  {
    pattern: /since\s+(\d+)\s+years/i,
    wrong: 'I live here since 3 years.',
    correct: 'I have been living here for 3 years.',
    explanation: 'Use "for" with a duration/period of time (for 3 years) and "since" with a specific starting point in time (since 2021).'
  },
  {
    pattern: /explain\s+me/i,
    wrong: 'Can you explain me this word?',
    correct: 'Can you explain this word to me?',
    explanation: 'The verb "explain" takes the structure "explain [something] to [someone]".'
  }
];

class EnglishBoosterChat {
  constructor() {
    this.currentPartner = null;
    this.messages = [];
    this.isRecordingVoice = false;
    this.voiceTimer = null;
    this.voiceSeconds = 0;
  }

  init() {
    const urlParams = new URLSearchParams(window.location.search);
    const partnerId = urlParams.get('partner') || 'sofia_es';

    const partners = window.EnglishBoosterMatching ? window.EnglishBoosterMatching.partners : [];
    this.currentPartner = partners.find(p => p.id === partnerId) || {
      id: 'sofia_es',
      name: 'Sofia Martínez',
      country: 'Spain',
      flag: '🇪🇸',
      avatarText: 'SM',
      level: 'B1',
      isOnline: true,
      bio: 'Marketer from Madrid. Practicing conversational fluency!'
    };

    this.renderPartnerSidebar(partners);
    this.renderChatHeader();
    this.loadInitialMessages();
    this.bindEvents();
  }

  renderPartnerSidebar(partners) {
    const list = document.getElementById('chat-partners-list');
    if (!list) return;

    list.innerHTML = partners.map(p => `
      <div class="chat-partner-item ${p.id === this.currentPartner.id ? 'active' : ''}" data-id="${p.id}">
        <div class="partner-avatar" style="width: 44px; height: 44px;">
          ${p.avatarImg ? `<img src="../${p.avatarImg.replace(/^(\.\.\/)+/, '')}" alt="${p.name}" class="avatar-img" />` : p.avatarText}
          <span class="avatar-badge-flag" style="font-size: 0.9rem;">${p.flag}</span>
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <div class="partner-name" style="font-size: 0.92rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.name}</div>
            <span style="font-size: 0.72rem; color: var(--text-subtle);">12:30</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px; font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">
            <span class="status-dot ${p.isOnline ? 'online' : 'offline'}" style="width: 6px; height: 6px;"></span>
            <span class="badge-level level-${p.level.toLowerCase()}" style="font-size: 0.65rem; padding: 1px 6px;">${p.level}</span>
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              ${p.isOnline ? ((window.EnglishBooster?.isFrench && window.EnglishBooster.isFrench()) ? 'En ligne' : 'Online now') : ((window.EnglishBooster?.isFrench && window.EnglishBooster.isFrench()) ? 'Vu il y a 2h' : 'Seen 2h ago')}
            </span>
          </div>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.chat-partner-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        window.location.search = `?partner=${id}`;
      });
    });
  }

  renderChatHeader() {
    const header = document.getElementById('chat-active-header');
    if (!header) return;

    const isFr = (window.EnglishBooster?.isFrench ? window.EnglishBooster.isFrench() : (localStorage.getItem('eb_lang') === 'fr'));

    header.innerHTML = `
      <div style="display: flex; align-items: center; gap: 14px;">
        <div class="partner-avatar" style="width: 48px; height: 48px;">
          ${this.currentPartner.avatarImg ? `<img src="../${this.currentPartner.avatarImg.replace(/^(\.\.\/)+/, '')}" alt="${this.currentPartner.name}" class="avatar-img" />` : this.currentPartner.avatarText}
          <span class="avatar-badge-flag">${this.currentPartner.flag}</span>
        </div>
        <div>
          <h4 style="font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
            ${this.currentPartner.name}
            <span class="badge-level level-${this.currentPartner.level.toLowerCase()}">${this.currentPartner.level}</span>
          </h4>
          <span class="status-indicator">
            <span class="status-dot ${this.currentPartner.isOnline ? 'online' : 'offline'}"></span>
            ${this.currentPartner.isOnline ? (isFr ? 'En ligne — Prêt à échanger' : 'Online — Ready to practice') : (isFr ? 'Hors ligne' : 'Offline')}
          </span>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <button id="ai-quick-check-btn" class="btn btn-outline-cyan btn-sm" title="${isFr ? 'Analyser la saisie pour détecter les fautes' : 'Analyze input for grammatical accuracy'}">
          ${isFr ? '✨ Vérification IA' : '✨ AI Grammar Check'}
        </button>
        <a href="call.html?partner=${this.currentPartner.id}" class="btn btn-secondary btn-sm" title="${isFr ? 'Démarrer l\'Appel en Direct' : 'Start Live Call'}">
          ${isFr ? '🎙️ Appel en Direct' : '🎙️ Live Call'}
        </a>
      </div>
    `;

    document.getElementById('ai-quick-check-btn')?.addEventListener('click', () => {
      this.triggerManualGrammarCheck();
    });
  }

  loadInitialMessages() {
    this.messages = [
      {
        sender: 'partner',
        text: `Hi there! 👋 I am ${this.currentPartner.name.split(' ')[0]} from ${this.currentPartner.country}. Excited to practice English together!`,
        time: '10:14 AM'
      },
      {
        sender: 'partner',
        text: `What topic would you like to talk about today? We can discuss our favorite travel memories or practice interview questions! 🌎`,
        time: '10:15 AM'
      }
    ];
    this.renderMessages();
  }

  renderMessages() {
    const container = document.getElementById('chat-messages-container');
    if (!container) return;

    container.innerHTML = this.messages.map(m => {
      if (m.type === 'voice') {
        return `
          <div class="chat-bubble-wrap ${m.sender === 'user' ? 'outgoing' : 'incoming'}">
            <div class="chat-bubble ${m.sender === 'user' ? 'bubble-user' : 'bubble-partner'}">
              <div style="display: flex; align-items: center; gap: 10px;">
                <button class="voice-play-btn" style="background: rgba(255,255,255,0.15); border-radius: 50%; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;">▶</button>
                <div class="voice-wave-container">
                  <span class="wave-bar"></span><span class="wave-bar"></span><span class="wave-bar"></span>
                  <span class="wave-bar"></span><span class="wave-bar"></span><span class="wave-bar"></span>
                </div>
                <span style="font-size: 0.8rem; font-family: var(--font-mono);">${m.duration || '0:14'}</span>
              </div>
              <div class="chat-time">${m.time}</div>
            </div>
          </div>
        `;
      }

      return `
        <div class="chat-bubble-wrap ${m.sender === 'user' ? 'outgoing' : 'incoming'}">
          <div class="chat-bubble ${m.sender === 'user' ? 'bubble-user' : 'bubble-partner'}">
            <div class="chat-text">${m.text}</div>
            ${m.correction ? this.formatCorrectionCard(m.correction) : ''}
            <div class="chat-time">${m.time}</div>
          </div>
        </div>
      `;
    }).join('');

    container.scrollTop = container.scrollHeight;
  }

  formatCorrectionCard(corr) {
    const isFr = (window.EnglishBooster?.isFrench ? window.EnglishBooster.isFrench() : (localStorage.getItem('eb_lang') === 'fr'));
    return `
      <div class="ai-inline-correction-card" style="margin-top: 10px; background: rgba(0, 0, 0, 0.4); border: 1px solid var(--glass-border); border-radius: var(--radius-sm); padding: 12px; font-size: 0.85rem;">
        <div style="display: flex; align-items: center; gap: 6px; color: var(--cyan-primary); font-weight: 700; margin-bottom: 6px;">
          ${isFr ? '✨ Correction d\'anglais par l\'IA' : '✨ AI English Correction'}
        </div>
        <div style="color: #fda4af; text-decoration: line-through; margin-bottom: 4px;">❌ ${corr.wrong}</div>
        <div style="color: #6ee7b7; font-weight: 600; margin-bottom: 6px;">✓ ${corr.correct}</div>
        <div style="color: var(--text-muted); font-size: 0.8rem; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 6px;">
          <strong>${isFr ? 'Explication :' : 'Explanation:'}</strong> ${corr.explanation}
        </div>
      </div>
    `;
  }

  bindEvents() {
    const input = document.getElementById('chat-input-text');
    const sendBtn = document.getElementById('chat-send-btn');
    const voiceBtn = document.getElementById('chat-voice-btn');
    const emojiBtn = document.getElementById('chat-emoji-btn');
    const grammarModal = document.getElementById('grammar-suggestion-box');

    if (sendBtn && input) {
      sendBtn.addEventListener('click', () => this.sendMessage());
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });
    }

    // Voice Recording Simulation
    if (voiceBtn) {
      voiceBtn.addEventListener('click', () => this.toggleVoiceRecording());
    }

    // Emoji Picker Trigger
    if (emojiBtn && input) {
      emojiBtn.addEventListener('click', () => {
        const emojis = ['👍', '🎉', '✈️', '🇬🇧', '☕', '💡', '🌟', '🚀', '❤️', '😊'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        input.value += ' ' + randomEmoji;
        input.focus();
      });
    }
  }

  sendMessage() {
    const input = document.getElementById('chat-input-text');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    // Check for grammatical errors
    const correctionMatch = this.detectGrammarIssues(text);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    this.messages.push({
      sender: 'user',
      text: text,
      time: timeStr,
      correction: correctionMatch
    });

    input.value = '';
    this.renderMessages();
    window.EnglishBooster.SoundFX.playClick();

    // Reward XP for practicing
    window.EnglishBooster.addXP(5, 'Chat sentence practiced');

    // Simulate Partner Typing and Reply
    this.simulatePartnerReply(text);
  }

  detectGrammarIssues(text) {
    for (const rule of GRAMMAR_CORRECTION_RULES) {
      if (rule.pattern.test(text)) {
        return {
          wrong: text,
          correct: rule.correct,
          explanation: rule.explanation
        };
      }
    }
    return null;
  }

  triggerManualGrammarCheck() {
    const input = document.getElementById('chat-input-text');
    const text = input ? input.value.trim() : '';

    if (!text) {
      // Put a sample error so the user can test the prompt example
      if (input) {
        input.value = "I have went to London yesterday.";
      }
      this.showGrammarModal({
        wrong: "I have went to London yesterday.",
        correct: "I went to London yesterday.",
        explanation: 'Use the simple past "went" instead of "have went" because "yesterday" refers to a finished time in the past.'
      });
      return;
    }

    const match = this.detectGrammarIssues(text);
    if (match) {
      this.showGrammarModal(match);
    } else {
      window.EnglishBooster.showToast('Excellent Grammar! 🌟', 'No grammatical mistakes detected in your sentence.', 'success');
    }
  }

  showGrammarModal(corr) {
    let modal = document.getElementById('grammar-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'grammar-modal';
      modal.style.cssText = `
        position: fixed; inset: 0; background: rgba(6, 10, 20, 0.85); backdrop-filter: blur(14px);
        display: none; align-items: center; justify-content: center; z-index: 2500; padding: 20px;
      `;
      modal.innerHTML = `
        <div class="glass-card" style="width: 100%; max-width: 500px; padding: 28px; position: relative;">
          <button id="close-grammar-modal" style="position: absolute; top: 16px; right: 16px; font-size: 1.5rem; color: var(--text-muted);">&times;</button>
          <div id="grammar-modal-content"></div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#close-grammar-modal').addEventListener('click', () => {
        modal.style.display = 'none';
      });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
      });
    }

    const content = document.getElementById('grammar-modal-content');
    content.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
        <span style="font-size: 1.6rem;">✨</span>
        <h3 style="font-size: 1.3rem;">AI English Grammar Correction</h3>
      </div>

      <div class="correction-item wrong" style="margin-bottom: 10px;">
        <span class="correction-badge">❌</span>
        <div>
          <div style="font-weight: 700; font-size: 0.82rem; text-transform: uppercase;">Original sentence</div>
          <div style="font-size: 1.05rem;">${corr.wrong}</div>
        </div>
      </div>

      <div class="correction-item correct" style="margin-bottom: 16px;">
        <span class="correction-badge">✓</span>
        <div>
          <div style="font-weight: 700; font-size: 0.82rem; text-transform: uppercase;">Natural English correction</div>
          <div style="font-size: 1.05rem; font-weight: 700;">${corr.correct}</div>
        </div>
      </div>

      <div class="correction-explanation" style="margin-bottom: 20px;">
        <strong style="color: var(--cyan-primary); display: block; margin-bottom: 4px;">Pedagogical Rule:</strong>
        ${corr.explanation}
      </div>

      <div style="display: flex; gap: 10px;">
        <button id="apply-grammar-fix-btn" class="btn btn-primary" style="flex: 1;">
          ✓ Apply Correction to Input
        </button>
        <button onclick="document.getElementById('grammar-modal').style.display='none'" class="btn btn-secondary">
          Close
        </button>
      </div>
    `;

    document.getElementById('apply-grammar-fix-btn').addEventListener('click', () => {
      const input = document.getElementById('chat-input-text');
      if (input) input.value = corr.correct;
      modal.style.display = 'none';
      window.EnglishBooster.showToast('Correction Applied', 'Your input has been updated with natural phrasing.', 'info');
    });

    modal.style.display = 'flex';
  }

  toggleVoiceRecording() {
    const voiceBtn = document.getElementById('chat-voice-btn');
    if (!this.isRecordingVoice) {
      // Start recording simulation
      this.isRecordingVoice = true;
      voiceBtn.classList.add('recording');
      voiceBtn.innerHTML = '⏹️';
      window.EnglishBooster.showToast('Recording Voice Note...', 'Speak into your microphone now', 'info');
      this.voiceSeconds = 0;
      this.voiceTimer = setInterval(() => {
        this.voiceSeconds++;
      }, 1000);
    } else {
      // Stop and send voice note
      this.isRecordingVoice = false;
      voiceBtn.classList.remove('recording');
      voiceBtn.innerHTML = '🎙️';
      clearInterval(this.voiceTimer);

      const durationStr = `0:${this.voiceSeconds < 10 ? '0' : ''}${Math.max(this.voiceSeconds, 4)}`;
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      this.messages.push({
        sender: 'user',
        type: 'voice',
        duration: durationStr,
        time: timeStr
      });

      this.renderMessages();
      window.EnglishBooster.addXP(15, 'Voice message sent');
      this.simulatePartnerReply('voice');
    }
  }

  simulatePartnerReply(userMessage) {
    const indicator = document.getElementById('partner-typing-indicator');
    if (indicator) indicator.style.display = 'flex';

    setTimeout(() => {
      if (indicator) indicator.style.display = 'none';

      let replyText = `That's very interesting! Could you tell me more about that?`;
      if (userMessage.includes('London') || userMessage.includes('trip') || userMessage.includes('travel')) {
        replyText = `London is wonderful! I went to Covent Garden and the British Museum last summer. Have you visited many historic places? 🇬🇧`;
      } else if (userMessage === 'voice') {
        replyText = `Great pronunciation! Your rhythm is becoming much clearer. Keep speaking without hesitation! 🎧`;
      } else if (userMessage.length < 15) {
        replyText = `I agree! By the way, how was your day so far? Are you taking any other English classes this week?`;
      }

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      this.messages.push({
        sender: 'partner',
        text: replyText,
        time: timeStr
      });

      this.renderMessages();
      window.EnglishBooster.SoundFX.playSuccess();
    }, 1800);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('chat-messages-container')) {
    window.chatApp = new EnglishBoosterChat();
    window.chatApp.init();
  }
});
