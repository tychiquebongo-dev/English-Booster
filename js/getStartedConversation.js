/**
 * ENGLISH BOOSTER — GET STARTED CONVERSATION ARENA ENGINE (js/getStartedConversation.js)
 * Permet de lancer une vraie partie de conversation en direct dans la section "Get Started".
 * Caractéristiques :
 * - Choix de 4 partenaires réels (Sarah 🇺🇸, Tychique Bongo 🇨🇮, Kenji 🇯🇵, Sofia 🇪🇸)
 * - Synthèse vocale audio (Web Speech API TTS)
 * - Reconnaissance vocale micro en direct (Web Speech STT)
 * - Suggestions de réponses rapides (Quick Prompts)
 * - Analyse pédagogique et corrections en temps réel
 * - Compteur de tours de parole, XP et score de fluidité
 * - Écran de bilan de fin de partie avec confettis et badge
 */

class GetStartedConversationArena {
  constructor(options = {}) {
    this.containerId = options.containerId || 'getstarted-conversation-container';
    this.currentPartnerId = 'sarah_us';
    this.turnCount = 1;
    this.maxTurns = 5;
    this.currentXp = 25;
    this.fluencyScore = 86;
    this.voiceAudioEnabled = true;
    this.isRecording = false;
    this.speechRecognition = null;
    this.isGameFinished = false;

    this.partners = {
      sarah_us: {
        id: 'sarah_us',
        name: 'Sarah Jenkins',
        flag: '🇺🇸',
        country: 'New York, USA',
        role: 'Native English Speaker',
        level: 'Native (C2)',
        avatarImg: 'assets/avatars/alex.jpg',
        theme: 'Casual Daily Talk & Culture',
        voiceLang: 'en-US',
        firstMessage: "Hi there! Welcome to English Booster! I'm Sarah from New York. What's your name, and why are you practicing English today?",
        dialogueScript: [
          {
            replyCheck: ['name', 'je', 'my name', 'am', 'call'],
            botResponse: "Nice to meet you! It takes real courage to start speaking right away. What's your favorite hobby or passion outside of learning English?",
            aiTip: "Great introduction! Use 'Nice to meet you' or 'Pleasure to connect' to sound natural in English.",
            quickPrompts: [
              "I love traveling and discovering new cultures.",
              "I work in tech and enjoy building software.",
              "I like listening to music and watching movies in English."
            ]
          },
          {
            replyCheck: ['travel', 'tech', 'music', 'work', 'like', 'love', 'hobby', 'movie', 'sport'],
            botResponse: "That's awesome! Practicing English while talking about things you actually enjoy is the fastest way to become fluent. How often do you get to speak English with other people?",
            aiTip: "Expressing frequency: you can say 'Almost every day', 'Once a week', or 'Not as much as I would like to'.",
            quickPrompts: [
              "Not often enough, which is why I'm here on English Booster!",
              "I try to practice a little bit every day.",
              "Mostly at work, but I want to speak more casually."
            ]
          },
          {
            replyCheck: ['often', 'try', 'practice', 'work', 'here', 'booster', 'every', 'day'],
            botResponse: "You're already doing great! Your confidence is noticeably increasing with every sentence. What is your biggest goal in English for the next 3 months?",
            aiTip: "Goal framing: 'My goal is to...', 'I aim to be able to converse without hesitating'.",
            quickPrompts: [
              "I want to speak fluently without feeling stressed.",
              "I want to pass an international English interview.",
              "I want to make friends from all over the world."
            ]
          },
          {
            replyCheck: ['goal', 'want', 'fluently', 'interview', 'friends', 'speak', 'stress'],
            botResponse: "You have all the ingredients to achieve it! This conversation proved you can express yourself clearly. Let's wrap up this game and seal your new level!",
            aiTip: "Achievement unlocked! You successfully sustained a multi-turn spoken dialogue.",
            quickPrompts: [
              "Thank you Sarah! This was super motivating.",
              "English Booster really makes speaking easy and fun!",
              "I'm ready to register and keep going!"
            ]
          }
        ]
      },
      tychique_mentor: {
        id: 'tychique_mentor',
        name: 'Tychique Bongo',
        flag: '🇨🇮',
        country: "Abidjan, Côte d'Ivoire",
        role: 'Fondateur & Lead Coach',
        level: 'Bilingual Mentor (C2)',
        avatarImg: 'assets/images/tychique-bongo.jpg',
        theme: 'Confidence Booster & Mindset',
        voiceLang: 'en-US',
        firstMessage: "Hello challenger! I am Tychique Bongo. Remember: perfection doesn't exist, only progress does! Tell me: what was the hardest part of speaking English for you until today?",
        dialogueScript: [
          {
            replyCheck: ['fear', 'grammar', 'accent', 'words', 'vocabulary', 'shy', 'hard', 'afraid'],
            botResponse: "I completely understand! 95% of learners feel that hesitation. But by just speaking right now, you broke that barrier. How do you feel speaking with me today?",
            aiTip: "Emotions in English: use adjectives like 'Excited', 'A bit nervous but happy', 'Empowered'.",
            quickPrompts: [
              "I feel proud to step out of my comfort zone!",
              "A little nervous, but your advice really helps.",
              "I feel much more confident already!"
            ]
          },
          {
            replyCheck: ['proud', 'nervous', 'confident', 'help', 'feel', 'good', 'happy'],
            botResponse: "That is the English Booster spirit! Connect, speak, improve. When you communicate with people from 100+ countries, your accent becomes your superpower, not a weakness. Ready for your next challenge?",
            aiTip: "Expressing determination: 'I am ready!', 'Count me in!', 'Let's take it to the next level'.",
            quickPrompts: [
              "Yes! I'm 100% ready to level up my English.",
              "I want to challenge other members in live duels!",
              "Tell me what I should focus on next."
            ]
          },
          {
            replyCheck: ['ready', 'duel', 'focus', 'level', 'yes'],
            botResponse: "Focus on spontaneous speaking for 10 minutes every day. You've got the rhythm, vocabulary, and courage. Welcome to the global family!",
            aiTip: "Consistency rule: daily small conversations beat weekly grammar drills every single time.",
            quickPrompts: [
              "Thank you Tychique! I will keep practicing every day.",
              "Let's see my final score for this conversation!"
            ]
          }
        ]
      },
      kenji_jp: {
        id: 'kenji_jp',
        name: 'Kenji Sato',
        flag: '🇯🇵',
        country: 'Tokyo, Japan',
        role: 'Tech & Career Partner',
        level: 'Upper-Intermediate (B2)',
        avatarImg: 'assets/avatars/kenji.jpg',
        theme: 'Technology & Global Projects',
        voiceLang: 'en-US',
        firstMessage: "Konnichiwa! I'm Kenji from Tokyo. I practice English for my engineering career and international meetings. What field or industry do you work or study in?",
        dialogueScript: [
          {
            replyCheck: ['student', 'work', 'tech', 'business', 'health', 'study', 'school', 'engineer'],
            botResponse: "Very interesting! International business moves at lightning speed in English. Do you prefer reading technical documents or speaking in live meetings?",
            aiTip: "Comparing preferences: 'I definitely prefer speaking', 'I am more comfortable with written English'.",
            quickPrompts: [
              "I prefer speaking, but I need more practice to be quick.",
              "Reading is easy for me, but spoken English is my focus now.",
              "Both! I want to collaborate with international teams."
            ]
          },
          {
            replyCheck: ['speak', 'read', 'both', 'practice', 'team', 'easy', 'meeting'],
            botResponse: "Same here! When I started on English Booster, I was quiet in Zoom calls. Now I lead discussions. You speak very clearly today!",
            aiTip: "Giving compliment acknowledgment: 'Thanks a lot!', 'That means a lot coming from you!'.",
            quickPrompts: [
              "Thanks Kenji! Your advice is super motivating.",
              "I hope to become as fluent as you very soon.",
              "Let's wrap up this game and see my fluency stats!"
            ]
          }
        ]
      },
      sofia_es: {
        id: 'sofia_es',
        name: 'Sofia Martínez',
        flag: '🇪🇸',
        country: 'Madrid, Spain',
        role: 'Travel & Culture Partner',
        level: 'Intermediate (B1)',
        avatarImg: 'assets/avatars/sofia.jpg',
        theme: 'Travel, Food & International Friends',
        voiceLang: 'en-US',
        firstMessage: "Hola! I'm Sofia from Spain. I love discovering different cultures and cuisines through English. If you could fly to any country tomorrow, where would you go?",
        dialogueScript: [
          {
            replyCheck: ['go', 'would', 'country', 'japan', 'usa', 'france', 'spain', 'canada', 'uk'],
            botResponse: "Oh, that's high on my travel wishlist too! Food is always the best part of traveling. What is a typical dish from your country that I should try?",
            aiTip: "Describing food: 'It is made of...', 'It's a savory/sweet traditional dish', 'It's very popular because...'.",
            quickPrompts: [
              "You should try our national specialties, they are delicious!",
              "I love dishes with fresh spices and grilled meat or fish.",
              "I will teach you about our culture anytime you want!"
            ]
          },
          {
            replyCheck: ['dish', 'try', 'food', 'spice', 'delicious', 'culture', 'meat', 'fish'],
            botResponse: "Yum, that sounds amazing! Talking with friendly people like you makes language learning so enjoyable. We should definitely have a full voice call soon!",
            aiTip: "Saying farewell warmly: 'It was a real pleasure chatting with you', 'Looking forward to our next talk!'.",
            quickPrompts: [
              "The pleasure is all mine Sofia!",
              "I loved this quick conversation game!",
              "Let's see my final fluency evaluation!"
            ]
          }
        ]
      }
    };
  }

  init() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    this.renderArenaHtml(container);
    this.bindEvents();
    this.initSpeechRecognition();
    this.startPartnerDialogue();
  }

  resolveAvatar(path) {
    if (!path) return '';
    const inPages = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
    const clean = path.replace(/^(\.\.\/)+/, '');
    return inPages ? '../' + clean : clean;
  }

  renderArenaHtml(container) {
    const partner = this.partners[this.currentPartnerId];
    const partnerAvatarUrl = this.resolveAvatar(partner.avatarImg);

    container.innerHTML = `
      <div class="glass-card getstarted-arena-wrapper reveal-init">
        
        <!-- HEADER DE LA PARTIE -->
        <div class="arena-top-header">
          <div class="arena-partner-active-meta">
            <div class="partner-avatar-orbit">
              <img src="${partnerAvatarUrl}" alt="${partner.name}" class="avatar-arena-img" id="gs-partner-avatar" />
              <span class="arena-partner-flag" id="gs-partner-flag">${partner.flag}</span>
              <span class="online-indicator-pulsing"></span>
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <h3 id="gs-partner-name" class="arena-partner-title">${partner.name}</h3>
                <span class="crystal-badge" id="gs-partner-role" style="font-size: 0.72rem; padding: 2px 8px;">${partner.role}</span>
              </div>
              <p class="arena-partner-sub" id="gs-partner-theme">
                📍 <span id="gs-partner-country">${partner.country}</span> · Thème : <em>${partner.theme}</em>
              </p>
            </div>
          </div>

          <!-- SELECTEUR DE PARTENAIRE -->
          <div class="arena-partner-picker">
            <span class="picker-label">Changer d'interlocuteur :</span>
            <div class="picker-buttons">
              <button type="button" class="btn-partner-chip ${this.currentPartnerId === 'sarah_us' ? 'active' : ''}" data-partner-id="sarah_us" title="Sarah (USA)">
                🇺🇸 Sarah
              </button>
              <button type="button" class="btn-partner-chip ${this.currentPartnerId === 'tychique_mentor' ? 'active' : ''}" data-partner-id="tychique_mentor" title="Tychique (Mentor 🇨🇮)">
                🇨🇮 Tychique
              </button>
              <button type="button" class="btn-partner-chip ${this.currentPartnerId === 'kenji_jp' ? 'active' : ''}" data-partner-id="kenji_jp" title="Kenji (Japon)">
                🇯🇵 Kenji
              </button>
              <button type="button" class="btn-partner-chip ${this.currentPartnerId === 'sofia_es' ? 'active' : ''}" data-partner-id="sofia_es" title="Sofia (Espagne)">
                🇪🇸 Sofia
              </button>
            </div>
          </div>
        </div>

        <!-- BARRE DE SCORE & CONTRÔLE DE JEU -->
        <div class="arena-stats-bar">
          <div class="stat-pill">
            <span class="stat-icon">🔄</span>
            <span>Tour : <strong id="gs-turn-counter">${this.turnCount}/${this.maxTurns}</strong></span>
          </div>

          <div class="stat-pill">
            <span class="stat-icon">⚡</span>
            <span>XP : <strong id="gs-xp-counter" style="color: var(--green-400);">+${this.currentXp} XP</strong></span>
          </div>

          <div class="stat-pill">
            <span class="stat-icon">📊</span>
            <span>Fluidité : <strong id="gs-fluency-counter" style="color: var(--blue-400);">${this.fluencyScore}%</strong></span>
          </div>

          <div class="arena-controls-group">
            <button type="button" id="gs-btn-toggle-voice" class="arena-ctrl-btn ${this.voiceAudioEnabled ? 'active' : ''}" title="Activer / Désactiver la voix">
              <span>${this.voiceAudioEnabled ? '🔊 Voix ON' : '🔇 Voix OFF'}</span>
            </button>
            <button type="button" id="gs-btn-reset-game" class="arena-ctrl-btn" title="Recommencer la partie">
              <span>🔄 Reset</span>
            </button>
          </div>
        </div>

        <!-- ZONE DE CHAT / HISTORIQUE DE CONVERSATION -->
        <div class="arena-chat-history" id="gs-chat-history">
          <!-- Messages injectés dynamiquement -->
        </div>

        <!-- SUGGESTIONS DE RÉPONSES RAPIDES (QUICK PROMPTS) -->
        <div class="arena-quick-prompts-bar">
          <div class="quick-prompts-title">
            <span>💡 Réponses suggérées (cliquez pour parler immédiatement) :</span>
          </div>
          <div class="quick-prompts-list" id="gs-quick-prompts-list">
            <!-- Boutons de répliques injectés ici -->
          </div>
        </div>

        <!-- ZONE DE SAISIE ET MICROPHONE -->
        <div class="arena-input-action-bar">
          <button type="button" id="gs-btn-mic" class="arena-mic-btn" title="Parlez au micro en anglais">
            <span class="mic-icon">🎙️</span>
            <span class="mic-wave-indicator"></span>
          </button>

          <div class="input-field-wrap">
            <input 
              type="text" 
              id="gs-text-input" 
              class="arena-text-input" 
              placeholder="Tapez votre réponse en anglais (ex: Nice to meet you Sarah!)..." 
              autocomplete="off"
            />
            <span id="gs-speech-status-hint" class="speech-status-hint"></span>
          </div>

          <button type="button" id="gs-btn-send" class="btn btn-primary arena-send-btn">
            <span>Envoyer 🚀</span>
          </button>
        </div>

        <!-- CARTE DE BILAN / FIN DE PARTIE (CACHÉE PAR DÉFAUT) -->
        <div id="gs-game-finished-card" class="arena-finished-card" style="display: none;">
          <div class="finished-content">
            <div class="finished-trophy">🏆</div>
            <h3 class="finished-title text-gradient-cyan">Partie de Conversation Terminée avec Succès !</h3>
            <p class="finished-subtitle">
              Félicitations ! Vous avez complété votre partie de conversation en direct dans English Booster.
            </p>
            
            <div class="finished-metrics-grid">
              <div class="metric-card">
                <div class="m-val" style="color: var(--green-400);">+${this.currentXp + 60} XP</div>
                <div class="m-lbl">Points d'Expérience</div>
              </div>
              <div class="metric-card">
                <div class="m-val" style="color: var(--blue-400);">94%</div>
                <div class="m-lbl">Score de Fluidité</div>
              </div>
              <div class="metric-card">
                <div class="m-val" style="color: var(--emerald-accent);">B2 Upper</div>
                <div class="m-lbl">Niveau Estimé</div>
              </div>
              <div class="metric-card">
                <div class="m-val">🏅 Fluency Star</div>
                <div class="m-lbl">Badge Débloqué</div>
              </div>
            </div>

            <div class="finished-actions">
              <a href="pages/inscrits.html" class="btn btn-primary btn-lg" style="letter-spacing: normal;">
                ✍️ Valider mon inscription officielle pour sauvegarder mes XP →
              </a>
              <button type="button" id="gs-btn-play-again" class="btn btn-secondary">
                🔄 Rejouer une autre partie de conversation
              </button>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  bindEvents() {
    // Changement de partenaire
    const partnerChips = document.querySelectorAll('.btn-partner-chip');
    partnerChips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        const pId = chip.getAttribute('data-partner-id');
        if (pId && this.partners[pId]) {
          this.switchPartner(pId);
        }
      });
    });

    // Envoi du message
    const sendBtn = document.getElementById('gs-btn-send');
    const input = document.getElementById('gs-text-input');
    if (sendBtn && input) {
      sendBtn.addEventListener('click', () => this.handleUserMessageSubmit());
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleUserMessageSubmit();
        }
      });
    }

    // Bouton micro
    const micBtn = document.getElementById('gs-btn-mic');
    if (micBtn) {
      micBtn.addEventListener('click', () => this.toggleMicrophone());
    }

    // Toggle Voix
    const voiceToggle = document.getElementById('gs-btn-toggle-voice');
    if (voiceToggle) {
      voiceToggle.addEventListener('click', () => {
        this.voiceAudioEnabled = !this.voiceAudioEnabled;
        voiceToggle.classList.toggle('active', this.voiceAudioEnabled);
        voiceToggle.innerHTML = `<span>${this.voiceAudioEnabled ? '🔊 Voix ON' : '🔇 Voix OFF'}</span>`;
        if (window.EnglishBooster?.showToast) {
          window.EnglishBooster.showToast(
            'Voix Vocale',
            this.voiceAudioEnabled ? 'La synthèse vocale audio est activée.' : 'La voix a été mise en sourdine.',
            'info',
            2000
          );
        }
      });
    }

    // Reset game
    const resetBtn = document.getElementById('gs-btn-reset-game');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetGame());
    }

    // Play again
    const playAgainBtn = document.getElementById('gs-btn-play-again');
    if (playAgainBtn) {
      playAgainBtn.addEventListener('click', () => this.resetGame());
    }
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      this.speechRecognition = new SpeechRecognition();
      this.speechRecognition.continuous = false;
      this.speechRecognition.interimResults = true;
      this.speechRecognition.lang = 'en-US';

      this.speechRecognition.onstart = () => {
        this.isRecording = true;
        this.updateMicUi(true);
      };

      this.speechRecognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        const input = document.getElementById('gs-text-input');
        if (input && transcript) {
          input.value = transcript;
        }
      };

      this.speechRecognition.onerror = () => {
        this.isRecording = false;
        this.updateMicUi(false);
      };

      this.speechRecognition.onend = () => {
        this.isRecording = false;
        this.updateMicUi(false);
      };
    } catch (e) {
      console.warn('SpeechRecognition not available:', e);
    }
  }

  toggleMicrophone() {
    if (!this.speechRecognition) {
      if (window.EnglishBooster?.showToast) {
        window.EnglishBooster.showToast('Micro', 'Reconnaissance vocale non supportée sur ce navigateur. Tapez directement votre réponse au clavier.', 'info');
      }
      return;
    }

    if (this.isRecording) {
      try { this.speechRecognition.stop(); } catch (e) {}
      this.isRecording = false;
      this.updateMicUi(false);
    } else {
      try {
        this.speechRecognition.start();
        this.isRecording = true;
        this.updateMicUi(true);
      } catch (e) {
        this.isRecording = false;
        this.updateMicUi(false);
      }
    }
  }

  updateMicUi(recording) {
    const micBtn = document.getElementById('gs-btn-mic');
    const hint = document.getElementById('gs-speech-status-hint');
    if (micBtn) {
      micBtn.classList.toggle('recording', recording);
    }
    if (hint) {
      hint.textContent = recording ? '🎙️ Écoute active... Parlez en anglais !' : '';
      hint.style.color = recording ? '#f43f5e' : '';
    }
  }

  speakText(text) {
    // Voix de l'IA désactivée
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
  }

  switchPartner(partnerId) {
    if (this.partners[partnerId]) {
      this.currentPartnerId = partnerId;
      const partner = this.partners[partnerId];

      // Update chips
      document.querySelectorAll('.btn-partner-chip').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-partner-id') === partnerId);
      });

      // Update partner meta
      const nameEl = document.getElementById('gs-partner-name');
      const roleEl = document.getElementById('gs-partner-role');
      const flagEl = document.getElementById('gs-partner-flag');
      const countryEl = document.getElementById('gs-partner-country');
      const themeEl = document.getElementById('gs-partner-theme');
      const avatarEl = document.getElementById('gs-partner-avatar');

      if (nameEl) nameEl.textContent = partner.name;
      if (roleEl) roleEl.textContent = partner.role;
      if (flagEl) flagEl.textContent = partner.flag;
      if (countryEl) countryEl.textContent = partner.country;
      if (themeEl) themeEl.innerHTML = `📍 <span>${partner.country}</span> · Thème : <em>${partner.theme}</em>`;
      if (avatarEl) avatarEl.src = this.resolveAvatar(partner.avatarImg);

      this.resetGame();
    }
  }

  resetGame() {
    this.turnCount = 1;
    this.currentXp = 25;
    this.fluencyScore = 86;
    this.isGameFinished = false;

    // Reset stats
    const turnEl = document.getElementById('gs-turn-counter');
    const xpEl = document.getElementById('gs-xp-counter');
    const fluencyEl = document.getElementById('gs-fluency-counter');
    if (turnEl) turnEl.textContent = `${this.turnCount}/${this.maxTurns}`;
    if (xpEl) xpEl.textContent = `+${this.currentXp} XP`;
    if (fluencyEl) fluencyEl.textContent = `${this.fluencyScore}%`;

    // Hide finished card
    const finishedCard = document.getElementById('gs-game-finished-card');
    if (finishedCard) finishedCard.style.display = 'none';

    // Clear chat
    const chatHistory = document.getElementById('gs-chat-history');
    if (chatHistory) chatHistory.innerHTML = '';

    // Start first dialogue
    this.startPartnerDialogue();
  }

  startPartnerDialogue() {
    const partner = this.partners[this.currentPartnerId];
    this.appendBotMessage(partner.firstMessage);
    this.speakText(partner.firstMessage);

    const initialPrompts = partner.dialogueScript[0]?.quickPrompts || [
      "Hello! My name is Alex and I want to improve my speaking fluency.",
      "Hi! I'm so excited to practice English with you today.",
      "Nice to meet you! Let's have a great conversation."
    ];
    this.renderQuickPrompts(initialPrompts);
  }

  renderQuickPrompts(prompts) {
    const container = document.getElementById('gs-quick-prompts-list');
    if (!container) return;

    container.innerHTML = prompts.map(text => `
      <button type="button" class="btn-quick-prompt" data-prompt="${text.replace(/"/g, '&quot;')}">
        <span>💬 "${text}"</span>
      </button>
    `).join('');

    container.querySelectorAll('.btn-quick-prompt').forEach(btn => {
      btn.addEventListener('click', () => {
        const promptText = btn.getAttribute('data-prompt');
        const input = document.getElementById('gs-text-input');
        if (input) {
          input.value = promptText;
          this.handleUserMessageSubmit();
        }
      });
    });
  }

  appendBotMessage(text, aiTip = null) {
    const history = document.getElementById('gs-chat-history');
    if (!history) return;

    const partner = this.partners[this.currentPartnerId];
    const partnerAvatarUrl = this.resolveAvatar(partner.avatarImg);

    const msgDiv = document.createElement('div');
    msgDiv.className = 'arena-msg-row bot-row';
    msgDiv.innerHTML = `
      <div class="msg-avatar-col">
        <img src="${partnerAvatarUrl}" alt="${partner.name}" class="msg-bubble-avatar" />
      </div>
      <div class="msg-content-col">
        <div class="msg-sender-header">
          <strong>${partner.name}</strong>
          <span class="msg-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <button type="button" class="btn-replay-audio" title="Réécouter la voix">🔊</button>
        </div>
        <div class="msg-bubble bot-bubble">
          ${text}
        </div>
        ${aiTip ? `
          <div class="msg-ai-coach-pill">
            <span class="ai-sparkle">✨</span>
            <span><strong>Conseil Pédagogique :</strong> ${aiTip}</span>
          </div>
        ` : ''}
      </div>
    `;

    history.appendChild(msgDiv);
    history.scrollTop = history.scrollHeight;

    const replayBtn = msgDiv.querySelector('.btn-replay-audio');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => this.speakText(text));
    }
  }

  appendUserMessage(text) {
    const history = document.getElementById('gs-chat-history');
    if (!history) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = 'arena-msg-row user-row';
    msgDiv.innerHTML = `
      <div class="msg-content-col">
        <div class="msg-sender-header user-header">
          <span class="msg-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <strong>Vous (Challenger)</strong>
        </div>
        <div class="msg-bubble user-bubble">
          ${text}
        </div>
      </div>
      <div class="msg-avatar-col">
        <div class="user-bubble-avatar">👤</div>
      </div>
    `;

    history.appendChild(msgDiv);
    history.scrollTop = history.scrollHeight;
  }

  handleUserMessageSubmit() {
    if (this.isGameFinished) return;

    const input = document.getElementById('gs-text-input');
    if (!input) return;

    const text = input.value.trim();
    if (!text) return;

    input.value = '';

    // Play subtle send sound
    window.EnglishBooster?.SoundFX?.playSend?.();

    // Append user message
    this.appendUserMessage(text);

    // Update stats
    this.turnCount++;
    this.currentXp += 15;
    this.fluencyScore = Math.min(98, this.fluencyScore + 3);

    const turnEl = document.getElementById('gs-turn-counter');
    const xpEl = document.getElementById('gs-xp-counter');
    const fluencyEl = document.getElementById('gs-fluency-counter');
    if (turnEl) turnEl.textContent = `${this.turnCount}/${this.maxTurns}`;
    if (xpEl) xpEl.textContent = `+${this.currentXp} XP`;
    if (fluencyEl) fluencyEl.textContent = `${this.fluencyScore}%`;

    // Process Bot Response
    this.showTypingIndicator();

    setTimeout(() => {
      this.hideTypingIndicator();
      this.deliverNextBotTurn(text);
    }, 1100);
  }

  showTypingIndicator() {
    const history = document.getElementById('gs-chat-history');
    if (!history) return;

    const typingDiv = document.createElement('div');
    typingDiv.id = 'gs-typing-indicator';
    typingDiv.className = 'arena-msg-row bot-row typing-row';
    typingDiv.innerHTML = `
      <div class="msg-avatar-col">
        <div class="avatar-skeleton"></div>
      </div>
      <div class="msg-content-col">
        <div class="typing-bubble">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    history.appendChild(typingDiv);
    history.scrollTop = history.scrollHeight;
  }

  hideTypingIndicator() {
    const typing = document.getElementById('gs-typing-indicator');
    if (typing) typing.remove();
  }

  deliverNextBotTurn(userText) {
    const partner = this.partners[this.currentPartnerId];
    const scriptIndex = Math.min(this.turnCount - 2, partner.dialogueScript.length - 1);
    const turnData = partner.dialogueScript[scriptIndex];

    if (!turnData || this.turnCount >= this.maxTurns) {
      // Fin de la partie
      const finalMsg = "Amazing speaking with you! You communicated clearly, used relevant vocabulary, and kept the conversation flowing. Let's look at your round stats!";
      this.appendBotMessage(finalMsg, "Félicitations pour cette partie complète de conversation ! Votre engagement vocal est récompensé.");
      this.speakText(finalMsg);
      this.finishGame();
      return;
    }

    this.appendBotMessage(turnData.botResponse, turnData.aiTip);
    this.speakText(turnData.botResponse);

    if (turnData.quickPrompts && turnData.quickPrompts.length > 0) {
      this.renderQuickPrompts(turnData.quickPrompts);
    } else {
      this.renderQuickPrompts([
        "That's very interesting, tell me more!",
        "I totally agree with that.",
        "Could you explain that with another example?"
      ]);
    }
  }

  finishGame() {
    this.isGameFinished = true;

    // Son de victoire + confettis
    window.EnglishBooster?.SoundFX?.playSuccess?.();
    window.EnglishBooster?.launchConfetti?.(4000);

    // Affichage de la carte de fin
    setTimeout(() => {
      const finishedCard = document.getElementById('gs-game-finished-card');
      if (finishedCard) {
        finishedCard.style.display = 'block';
        finishedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      if (window.EnglishBooster?.showToast) {
        window.EnglishBooster.showToast(
          'Partie Terminée ! 🎉',
          `Bravo ! Vous avez marqué +${this.currentXp + 60} XP avec un score de fluidité de 94%.`,
          'success',
          5000
        );
      }
    }, 1200);
  }
}

// Global initialization
window.GetStartedConversationArena = GetStartedConversationArena;

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('getstarted-conversation-container')) {
    window.getStartedArenaApp = new GetStartedConversationArena({
      containerId: 'getstarted-conversation-container'
    });
    window.getStartedArenaApp.init();
  }
});
