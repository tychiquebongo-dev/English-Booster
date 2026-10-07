/**
 * ENGLISH BOOSTER — "HOW IT WORKS" 3-STEP INTERACTIVE ENGINE (js/howItWorks.js)
 * Step 1: Create Your Profile
 * Step 2: Find Your Partner (AI Matchmaking Engine)
 * Step 3: Start Speaking (Microphone Voice STT & Partner Audio TTS)
 */

class HowItWorksWizard {
  constructor() {
    this.currentStep = 1;
    this.selectedPartner = null;
    this.selectedLevel = 'B1';
    this.selectedAvatar = 'alex';
    this.voiceAudioEnabled = true;
    this.speechRecognition = null;
    this.isRecording = false;

    this.partnersList = [
      {
        id: 'sofia_es',
        name: 'Sofia Martínez',
        country: 'Spain',
        flag: '🇪🇸',
        level: 'B1',
        avatarImg: 'assets/avatars/sofia.jpg',
        nativeLang: 'Spanish',
        interests: ['Travel', 'Music', 'Movies'],
        matchScore: 98,
        matchReason: 'Same target goal (Spoken Fluency) · Similar intermediate level · High availability'
      },
      {
        id: 'kenji_jp',
        name: 'Kenji Sato',
        country: 'Japan',
        flag: '🇯🇵',
        level: 'B2',
        avatarImg: 'assets/avatars/kenji.jpg',
        nativeLang: 'Japanese',
        interests: ['Tech', 'Coding', 'Anime'],
        matchScore: 95,
        matchReason: 'Compatible B2 level · Shared interest in technology · Fast conversation response'
      },
      {
        id: 'maya_sg',
        name: 'Maya Lin',
        country: 'Singapore',
        flag: '🇸🇬',
        level: 'B2',
        avatarImg: 'assets/avatars/maya.jpg',
        nativeLang: 'Mandarin',
        interests: ['Art', 'Design', 'Books'],
        matchScore: 92,
        matchReason: 'Compatible conversation tempo · Creative topics discussion · Online right now'
      }
    ];

    this.selectedPartner = this.partnersList[0];
  }

  init() {
    this.createModalStructure();
    this.bindCardTriggers();
    this.initSpeechRecognition();

    const urlParams = new URLSearchParams(window.location.search);
    const stepParam = urlParams.get('step');
    if (stepParam && ['1', '2', '3'].includes(stepParam)) {
      setTimeout(() => this.open(parseInt(stepParam, 10)), 400);
    }
  }

  createModalStructure() {
    if (document.getElementById('step-wizard-backdrop')) return;

    const modal = document.createElement('div');
    modal.id = 'step-wizard-backdrop';
    modal.className = 'step-wizard-backdrop';
    modal.innerHTML = `
      <div class="step-wizard-container">
        <button id="step-wizard-close-btn" class="step-wizard-close" title="Close Walkthrough">&times;</button>
        
        <!-- Header -->
        <div style="margin-bottom: 20px;">
          <span class="crystal-badge" style="font-size: 0.76rem; margin-bottom: 8px;">Interactive 3-Step Walkthrough</span>
          <h2 style="font-size: 1.7rem; margin-bottom: 4px;" class="text-gradient-cyan">Mastering Spoken English in 3 Steps</h2>
          <p style="color: var(--text-muted); font-size: 0.9rem;">From zero speaking practice to confident international conversations.</p>
        </div>

        <!-- Step Navigation Pills -->
        <div class="step-nav-pills">
          <button class="step-nav-pill active" data-step-tab="1">
            <span>01</span> Create Profile
          </button>
          <button class="step-nav-pill" data-step-tab="2">
            <span>02</span> Find Partner
          </button>
          <button class="step-nav-pill" data-step-tab="3">
            <span>03</span> Start Speaking
          </button>
        </div>

        <!-- STEP 1 PANE: CREATE YOUR PROFILE -->
        <div id="step-pane-1" class="step-pane active">
          <div style="display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 24px; align-items: start;">
            <!-- Form Inputs -->
            <div style="display: flex; flex-direction: column; gap: 16px;">
              <div>
                <label class="form-label" style="margin-bottom: 6px;">Full Name or Nickname</label>
                <input type="text" id="wiz-name" class="form-control" value="Alex Rivera" placeholder="Your name" />
              </div>

              <div>
                <label class="form-label" style="margin-bottom: 6px;">Your Native Language</label>
                <select id="wiz-native-lang" class="form-control">
                  <option value="French">French 🇫🇷</option>
                  <option value="Spanish" selected>Spanish 🇪🇸</option>
                  <option value="Arabic">Arabic 🇸🇦</option>
                  <option value="Portuguese">Portuguese 🇧🇷</option>
                  <option value="German">German 🇩🇪</option>
                  <option value="Italian">Italian 🇮🇹</option>
                  <option value="Japanese">Japanese 🇯🇵</option>
                  <option value="Chinese">Chinese 🇨🇳</option>
                </select>
              </div>

              <div>
                <label class="form-label" style="margin-bottom: 6px;">Select Your Current English Level (CEFR)</label>
                <div class="level-picker-grid">
                  <button type="button" class="level-pick-btn" data-level="A1">A1</button>
                  <button type="button" class="level-pick-btn" data-level="A2">A2</button>
                  <button type="button" class="level-pick-btn selected" data-level="B1">B1</button>
                  <button type="button" class="level-pick-btn" data-level="B2">B2</button>
                  <button type="button" class="level-pick-btn" data-level="C1">C1</button>
                  <button type="button" class="level-pick-btn" data-level="C2">C2</button>
                </div>
              </div>

              <div>
                <label class="form-label" style="margin-bottom: 6px;">Your Primary Speaking Goal</label>
                <select id="wiz-goal" class="form-control">
                  <option value="Improve Spoken Fluency" selected>Improve Spoken Fluency & Confidence</option>
                  <option value="Career & Job Interviews">Career & Professional Meetings</option>
                  <option value="Travel & Daily Life">Travel & Daily Casual Conversations</option>
                  <option value="Exam Prep (IELTS/TOEFL)">Exam Preparation (IELTS / TOEFL / Cambridge)</option>
                </select>
              </div>

              <div>
                <label class="form-label" style="margin-bottom: 8px;">Choose Avatar</label>
                <div class="avatar-picker-grid">
                  <div class="avatar-pick-item selected" data-avatar="alex">
                    <img src="assets/avatars/alex.jpg" alt="Alex" />
                  </div>
                  <div class="avatar-pick-item" data-avatar="sofia">
                    <img src="assets/avatars/sofia.jpg" alt="Sofia" />
                  </div>
                  <div class="avatar-pick-item" data-avatar="kenji">
                    <img src="assets/avatars/kenji.jpg" alt="Kenji" />
                  </div>
                  <div class="avatar-pick-item" data-avatar="maya">
                    <img src="assets/avatars/maya.jpg" alt="Maya" />
                  </div>
                  <div class="avatar-pick-item" data-avatar="lucas">
                    <img src="assets/avatars/lucas.jpg" alt="Lucas" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Live Reactive Profile Badge Card -->
            <div class="glass-card" style="padding: 24px; text-align: center; border-color: rgba(74, 222, 128, 0.4); background: rgba(74, 222, 128, 0.06);">
              <span class="crystal-badge" style="font-size: 0.72rem; margin-bottom: 14px;">Live Profile Preview</span>
              <div class="partner-avatar" style="width: 82px; height: 82px; margin: 0 auto 12px; border-color: var(--green-400); box-shadow: 0 0 25px rgba(74, 222, 128, 0.4);">
                <img id="wiz-preview-avatar-img" src="assets/avatars/alex.jpg" alt="Avatar" class="avatar-img" />
              </div>
              <h3 id="wiz-preview-name" style="font-size: 1.3rem; margin-bottom: 4px;">Alex Rivera</h3>
              <div id="wiz-preview-lang" style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">Native: Spanish 🇪🇸</div>
              
              <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 16px;">
                <span id="wiz-preview-level" class="badge-level level-b1">Level B1</span>
                <span class="crystal-badge" style="font-size: 0.72rem;">⭐ +50 XP Starter</span>
              </div>

              <div style="background: rgba(0,0,0,0.3); border-radius: var(--radius-sm); padding: 10px; font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">
                🎯 <strong id="wiz-preview-goal" style="color: #ffffff;">Improve Spoken Fluency</strong>
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; margin-top: 24px;">
            <button id="wiz-step1-next-btn" class="btn btn-primary">
              Save Profile & Find Partner ➔
            </button>
          </div>
        </div>

        <!-- STEP 2 PANE: FIND YOUR PARTNER -->
        <div id="step-pane-2" class="step-pane">
          <div style="text-align: center; margin-bottom: 16px;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.88rem; color: var(--cyan-primary); font-weight: 700;">
              <span class="status-dot online"></span>
              <span>AI Engine matched 3 compatible partners available now</span>
            </div>
          </div>

          <div class="match-candidates-grid">
            ${this.partnersList.map((p, idx) => `
              <div class="match-candidate-card ${idx === 0 ? 'selected' : ''}" data-partner-id="${p.id}">
                <div class="match-score-pill">${p.matchScore}% Match</div>
                <div class="partner-avatar" style="width: 68px; height: 68px; margin: 12px 0 10px; border-color: var(--blue-400);">
                  <img src="${p.avatarImg}" alt="${p.name}" class="avatar-img" />
                  <span class="avatar-badge-flag">${p.flag}</span>
                </div>
                <h4 style="font-size: 1.1rem; margin-bottom: 2px;">${p.name}</h4>
                <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px;">${p.country} · Native: ${p.nativeLang}</div>
                <span class="badge-level level-${p.level.toLowerCase()}" style="margin-bottom: 10px;">${p.level} Intermediate</span>
                <p style="font-size: 0.78rem; color: var(--text-subtle); line-height: 1.4; margin-top: auto;">${p.matchReason}</p>
              </div>
            `).join('')}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; flex-wrap: wrap; gap: 12px;">
            <button id="wiz-step2-back-btn" class="btn btn-secondary btn-sm">
              ⬅ Back to Profile
            </button>
            <div style="display: flex; gap: 10px;">
              <a href="pages/partners.html" class="btn btn-secondary btn-sm">
                Browse All 50+ Partners 🌐
              </a>
              <button id="wiz-step2-next-btn" class="btn btn-primary">
                Connect with Sofia & Start Speaking ➔
              </button>
            </div>
          </div>
        </div>

        <!-- STEP 3 PANE: START SPEAKING -->
        <div id="step-pane-3" class="step-pane">
          <!-- Active Speaking Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.04); border: 1px solid var(--glass-border); padding: 14px 18px; border-radius: var(--radius-md); margin-bottom: 16px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div class="partner-avatar" style="width: 48px; height: 48px; border-color: var(--green-400);">
                <img id="wiz-step3-avatar" src="assets/avatars/sofia.jpg" alt="Partner" class="avatar-img" />
                <span id="wiz-step3-flag" class="avatar-badge-flag">🇪🇸</span>
              </div>
              <div>
                <h4 id="wiz-step3-name" style="font-size: 1.05rem; margin-bottom: 2px;">Sofia Martínez</h4>
                <div style="display: flex; align-items: center; gap: 8px; font-size: 0.78rem; color: var(--text-muted);">
                  <span class="status-indicator"><span class="status-dot online"></span> In Call Session</span>
                  <span>·</span>
                  <span id="wiz-step3-level" class="badge-level level-b1">B1 Intermediate</span>
                </div>
              </div>
            </div>

            <button id="wiz-toggle-tts-btn" class="btn btn-secondary btn-sm" style="font-size: 0.78rem; padding: 6px 12px;">
              🔊 Partner Voice: ON
            </button>
          </div>

          <!-- Conversation Prompt Card -->
          <div style="background: rgba(74, 222, 128, 0.08); border-left: 4px solid var(--green-400); padding: 12px 16px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; margin-bottom: 16px;">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--green-400); font-weight: 800; margin-bottom: 2px;">
              💡 Speaking Discussion Topic:
            </div>
            <div style="font-size: 0.95rem; font-weight: 600; color: #ffffff;">
              "What is your dream travel destination, and how would you describe what you want to experience there?"
            </div>
          </div>

          <!-- Live Interactive Chat Exchange Box -->
          <div class="live-speaking-box">
            <!-- Initial Partner Prompt Message -->
            <div class="speaking-msg-bubble partner" id="wiz-bubble-partner">
              👋 Hi Alex! I am Sofia from Madrid. Nice to meet you! Where would you like to travel next, and why?
            </div>

            <!-- User Response Bubble (Populated live) -->
            <div class="speaking-msg-bubble you" id="wiz-bubble-you" style="display: none;">
              (Listening to your voice...)
            </div>

            <!-- Partner Animated Wave & Status -->
            <div id="wiz-partner-typing" style="display: none; align-items: center; gap: 8px; font-size: 0.82rem; color: var(--blue-400);">
              <div class="voice-wave-container" style="height: 20px;">
                <span class="wave-bar"></span><span class="wave-bar"></span><span class="wave-bar"></span>
              </div>
              <span id="wiz-partner-typing-text">Sofia is speaking...</span>
            </div>
          </div>

          <!-- Microphone and Speaking Controls -->
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; gap: 10px;">
              <button id="wiz-mic-btn" class="btn btn-primary" style="flex: 1; justify-content: center;">
                🎙️ Speak with Microphone (Live Voice)
              </button>
              <button id="wiz-replay-tts-btn" class="btn btn-secondary" title="Replay partner voice audio">
                🔊 Replay Audio
              </button>
            </div>

            <!-- Quick Answer Prompts (Fallback if user does not speak aloud) -->
            <div>
              <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 6px;">
                Or select a quick spoken response:
              </div>
              <div style="display: grid; grid-template-columns: 1fr; gap: 8px;">
                <button type="button" class="btn btn-secondary btn-sm wiz-quick-btn" style="text-align: left; justify-content: flex-start; font-size: 0.82rem;" data-text="I'd love to visit Tokyo and London to discover their culture and practice my English with locals!">
                  💬 "I'd love to visit Tokyo and London to discover their culture and practice my English with locals!"
                </button>
                <button type="button" class="btn btn-secondary btn-sm wiz-quick-btn" style="text-align: left; justify-content: flex-start; font-size: 0.82rem;" data-text="My dream destination is New Zealand for its nature and outdoor hiking adventures.">
                  💬 "My dream destination is New Zealand for its nature and outdoor hiking adventures."
                </button>
              </div>
            </div>
          </div>

          <!-- Bottom Action Redirects -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08); flex-wrap: wrap; gap: 10px;">
            <button id="wiz-step3-back-btn" class="btn btn-secondary btn-sm">
              ⬅ Back to Partners
            </button>
            <div style="display: flex; gap: 10px;">
              <a id="wiz-launch-chat-btn" href="pages/chat.html?partner=sofia_es" class="btn btn-secondary btn-sm">
                💬 Open Full Chat
              </a>
              <a id="wiz-launch-call-btn" href="pages/call.html?partner=sofia_es" class="btn btn-primary btn-sm">
                📞 Launch Live Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Bind modal internal events
    this.bindModalEvents();
  }

  bindModalEvents() {
    const backdrop = document.getElementById('step-wizard-backdrop');
    const closeBtn = document.getElementById('step-wizard-close-btn');

    closeBtn?.addEventListener('click', () => this.close());
    backdrop?.addEventListener('click', (e) => {
      if (e.target === backdrop) this.close();
    });

    // Step Nav Tabs
    document.querySelectorAll('.step-nav-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const targetStep = parseInt(pill.dataset.stepTab, 10);
        this.goToStep(targetStep);
      });
    });

    // Step 1: Inputs Reactive Preview
    const nameInput = document.getElementById('wiz-name');
    const langSelect = document.getElementById('wiz-native-lang');
    const goalSelect = document.getElementById('wiz-goal');
    const previewName = document.getElementById('wiz-preview-name');
    const previewLang = document.getElementById('wiz-preview-lang');
    const previewGoal = document.getElementById('wiz-preview-goal');

    nameInput?.addEventListener('input', () => {
      if (previewName) previewName.textContent = nameInput.value.trim() || 'Your Name';
    });

    langSelect?.addEventListener('change', () => {
      if (previewLang) previewLang.textContent = `Native: ${langSelect.value}`;
    });

    goalSelect?.addEventListener('change', () => {
      if (previewGoal) previewGoal.textContent = goalSelect.value;
    });

    // Level buttons
    document.querySelectorAll('.level-pick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.level-pick-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.selectedLevel = btn.dataset.level;
        const levelBadge = document.getElementById('wiz-preview-level');
        if (levelBadge) {
          levelBadge.textContent = `Level ${this.selectedLevel}`;
          levelBadge.className = `badge-level level-${this.selectedLevel.toLowerCase()}`;
        }
        window.EnglishBooster.SoundFX.playClick();
      });
    });

    // Avatar pick items
    document.querySelectorAll('.avatar-pick-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.avatar-pick-item').forEach(a => a.classList.remove('selected'));
        item.classList.add('selected');
        this.selectedAvatar = item.dataset.avatar;
        const img = document.getElementById('wiz-preview-avatar-img');
        if (img) img.src = `assets/avatars/${this.selectedAvatar}.jpg`;
        window.EnglishBooster.SoundFX.playClick();
      });
    });

    // Step 1 Next Button
    document.getElementById('wiz-step1-next-btn')?.addEventListener('click', () => {
      this.saveStep1Profile();
      this.goToStep(2);
    });

    // Step 2 Candidates Selection
    document.querySelectorAll('.match-candidate-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.match-candidate-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const pId = card.dataset.partnerId;
        this.selectedPartner = this.partnersList.find(p => p.id === pId) || this.partnersList[0];
        
        const nextBtn = document.getElementById('wiz-step2-next-btn');
        if (nextBtn) {
          nextBtn.textContent = `Connect with ${this.selectedPartner.name.split(' ')[0]} & Start Speaking ➔`;
        }
        window.EnglishBooster.SoundFX.playClick();
      });
    });

    document.getElementById('wiz-step2-back-btn')?.addEventListener('click', () => this.goToStep(1));
    document.getElementById('wiz-step2-next-btn')?.addEventListener('click', () => {
      this.updateStep3PartnerUI();
      this.goToStep(3);
    });

    // Step 3 Controls
    document.getElementById('wiz-step3-back-btn')?.addEventListener('click', () => this.goToStep(2));

    // Toggle Voice Audio TTS
    const ttsBtn = document.getElementById('wiz-toggle-tts-btn');
    ttsBtn?.addEventListener('click', () => {
      this.voiceAudioEnabled = !this.voiceAudioEnabled;
      ttsBtn.textContent = this.voiceAudioEnabled ? '🔊 Partner Voice: ON' : '🔇 Partner Voice: OFF';
      window.EnglishBooster.SoundFX.playClick();
    });

    // Replay Partner TTS
    document.getElementById('wiz-replay-tts-btn')?.addEventListener('click', () => {
      this.speakPartnerText(
        `Hi! I am ${this.selectedPartner.name.split(' ')[0]} from ${this.selectedPartner.country}. Nice to meet you! Where would you like to travel next?`
      );
    });

    // Quick Prompts Click
    document.querySelectorAll('.wiz-quick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.dataset.text;
        this.handleUserSpokenResponse(text);
      });
    });

    // Microphone Button
    document.getElementById('wiz-mic-btn')?.addEventListener('click', () => {
      this.toggleMicrophone();
    });
  }

  bindCardTriggers() {
    // 1. Click on the 4 Step Cards on index.html
    const cards = document.querySelectorAll('.how-step-card');
    cards.forEach((card, index) => {
      card.addEventListener('click', (e) => {
        // Prevent double trigger if clicking button inside
        if (e.target.closest('.btn-step-trigger')) return;
        const stepNum = index + 1;
        if (stepNum <= 3) {
          this.open(stepNum);
        } else {
          window.location.href = 'pages/challenges.html';
        }
      });
    });

    // 2. Buttons inside cards
    document.querySelectorAll('.btn-step-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const stepNum = parseInt(btn.dataset.step, 10);
        this.open(stepNum);
      });
    });

    // 3. Global guided walkthrough launcher button if present
    document.querySelectorAll('.btn-launch-how-it-works').forEach(btn => {
      btn.addEventListener('click', () => {
        this.open(1);
      });
    });
  }

  open(step = 1) {
    this.createModalStructure();
    const backdrop = document.getElementById('step-wizard-backdrop');
    if (!backdrop) return;

    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.goToStep(step);
    window.EnglishBooster.SoundFX.playClick();
  }

  close() {
    const backdrop = document.getElementById('step-wizard-backdrop');
    if (!backdrop) return;

    backdrop.classList.remove('active');
    document.body.style.overflow = '';
    if (this.isRecording && this.speechRecognition) {
      try { this.speechRecognition.stop(); } catch (e) {}
    }
  }

  goToStep(stepNumber) {
    this.currentStep = stepNumber;

    // Update Pills
    document.querySelectorAll('.step-nav-pill').forEach(pill => {
      const pStep = parseInt(pill.dataset.stepTab, 10);
      pill.classList.remove('active', 'completed');
      if (pStep === stepNumber) {
        pill.classList.add('active');
      } else if (pStep < stepNumber) {
        pill.classList.add('completed');
      }
    });

    // Show Pane
    document.querySelectorAll('.step-pane').forEach((pane, idx) => {
      pane.classList.remove('active');
      if (idx + 1 === stepNumber) {
        pane.classList.add('active');
      }
    });

    // Highlighting cards on page
    document.querySelectorAll('.how-step-card').forEach((c, idx) => {
      if (idx + 1 === stepNumber) {
        c.classList.add('active-step-glow');
      } else {
        c.classList.remove('active-step-glow');
      }
    });

    // If entering Step 3, speak introductory partner message
    if (stepNumber === 3) {
      setTimeout(() => {
        this.speakPartnerText(
          `Hi there! I am ${this.selectedPartner.name.split(' ')[0]} from ${this.selectedPartner.country}. Excited to practice English with you! Tell me, what is your dream travel destination?`
        );
      }, 500);
    }
  }

  saveStep1Profile() {
    const nameInput = document.getElementById('wiz-name');
    const langSelect = document.getElementById('wiz-native-lang');
    const goalSelect = document.getElementById('wiz-goal');

    const updatedUser = {
      fullName: nameInput ? nameInput.value.trim() : 'Alex Rivera',
      nativeLanguage: langSelect ? langSelect.value : 'Spanish',
      country: langSelect ? langSelect.value : 'Spain 🇪🇸',
      email: (nameInput ? nameInput.value.trim().toLowerCase().replace(/\s+/g, '.') : 'alex.rivera') + '@example.com',
      englishLevel: this.selectedLevel,
      mainGoal: goalSelect ? goalSelect.value : 'Improve Spoken Fluency',
      avatarImg: `assets/avatars/${this.selectedAvatar}.jpg`
    };

    window.EnglishBooster.updateUserState(updatedUser);
    if (window.EnglishBoosterRegisterMember) {
      window.EnglishBoosterRegisterMember(updatedUser);
    }
    window.EnglishBooster.SoundFX.playSuccess();
    window.EnglishBooster.showToast('Profile Saved!', `Welcome ${updatedUser.fullName}! Level ${updatedUser.englishLevel} registered.`, 'success');
    window.EnglishBooster.addXP(50, 'Completed Step 1: Profile Creation');
  }

  updateStep3PartnerUI() {
    const avatarImg = document.getElementById('wiz-step3-avatar');
    const flag = document.getElementById('wiz-step3-flag');
    const nameEl = document.getElementById('wiz-step3-name');
    const levelEl = document.getElementById('wiz-step3-level');
    const chatBtn = document.getElementById('wiz-launch-chat-btn');
    const callBtn = document.getElementById('wiz-launch-call-btn');

    if (avatarImg) avatarImg.src = this.selectedPartner.avatarImg;
    if (flag) flag.textContent = this.selectedPartner.flag;
    if (nameEl) nameEl.textContent = this.selectedPartner.name;
    if (levelEl) {
      levelEl.textContent = `${this.selectedPartner.level} Intermediate`;
      levelEl.className = `badge-level level-${this.selectedPartner.level.toLowerCase()}`;
    }

    if (chatBtn) chatBtn.href = `pages/chat.html?partner=${this.selectedPartner.id}`;
    if (callBtn) callBtn.href = `pages/call.html?partner=${this.selectedPartner.id}`;

    const partnerBubble = document.getElementById('wiz-bubble-partner');
    if (partnerBubble) {
      partnerBubble.textContent = `👋 Hi! I am ${this.selectedPartner.name.split(' ')[0]} from ${this.selectedPartner.country}. Nice to meet you! Where would you like to travel next, and why?`;
    }
  }

  // ==========================================================================
  // WEB SPEECH API (STT & TTS)
  // ==========================================================================
  initSpeechRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      this.speechRecognition = new SpeechRec();
      this.speechRecognition.continuous = false;
      this.speechRecognition.interimResults = true;
      this.speechRecognition.lang = 'en-US';

      this.speechRecognition.onstart = () => {
        this.isRecording = true;
        const micBtn = document.getElementById('wiz-mic-btn');
        if (micBtn) {
          micBtn.textContent = '⏹️ Listening... Click when done speaking';
          micBtn.classList.add('btn-battle-mic-recording');
        }
      };

      this.speechRecognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(r => r[0].transcript)
          .join('');
        const userBubble = document.getElementById('wiz-bubble-you');
        if (userBubble) {
          userBubble.style.display = 'block';
          userBubble.textContent = `🗣️ You: "${transcript}"`;
        }
      };

      this.speechRecognition.onend = () => {
        this.isRecording = false;
        const micBtn = document.getElementById('wiz-mic-btn');
        if (micBtn) {
          micBtn.textContent = '🎙️ Speak with Microphone (Live Voice)';
          micBtn.classList.remove('btn-battle-mic-recording');
        }

        const userBubble = document.getElementById('wiz-bubble-you');
        if (userBubble && userBubble.textContent.trim().length > 12) {
          const cleanText = userBubble.textContent.replace('🗣️ You: "', '').replace('"', '');
          this.handlePartnerResponse(cleanText);
        }
      };

      this.speechRecognition.onerror = () => {
        this.isRecording = false;
        const micBtn = document.getElementById('wiz-mic-btn');
        if (micBtn) {
          micBtn.textContent = '🎙️ Speak with Microphone (Live Voice)';
          micBtn.classList.remove('btn-battle-mic-recording');
        }
      };
    }
  }

  toggleMicrophone() {
    if (!this.speechRecognition) {
      window.EnglishBooster.showToast('Microphone Info', 'Speech recognition is supported in Chrome/Edge. You can also click a quick spoken reply below!', 'info');
      return;
    }

    if (this.isRecording) {
      try { this.speechRecognition.stop(); } catch (e) {}
    } else {
      const userBubble = document.getElementById('wiz-bubble-you');
      if (userBubble) {
        userBubble.style.display = 'block';
        userBubble.textContent = '🎙️ Listening... Speak your English response now!';
      }
      try {
        this.speechRecognition.start();
      } catch (e) {
        this.speechRecognition.stop();
      }
    }
  }

  handleUserSpokenResponse(text) {
    const userBubble = document.getElementById('wiz-bubble-you');
    if (userBubble) {
      userBubble.style.display = 'block';
      userBubble.textContent = `🗣️ You: "${text}"`;
    }
    window.EnglishBooster.SoundFX.playClick();
    this.handlePartnerResponse(text);
  }

  handlePartnerResponse(userText) {
    const typingIndicator = document.getElementById('wiz-partner-typing');
    const typingText = document.getElementById('wiz-partner-typing-text');
    if (typingIndicator) {
      typingIndicator.style.display = 'flex';
      if (typingText) typingText.textContent = `${this.selectedPartner.name.split(' ')[0]} is listening & thinking...`;
    }

    setTimeout(() => {
      if (typingIndicator) typingIndicator.style.display = 'none';

      const partnerReplies = [
        `That sounds fantastic! Traveling and connecting with locals is definitely the best way to become fluent. Let's practice more together!`,
        `I completely agree with you! Expressing yourself spontaneously is what brings genuine confidence. You speak with great rhythm!`,
        `Awesome answer! Your pronunciation was clear and natural. Shall we do a live call or a 5-minute duel challenge?`
      ];

      const reply = partnerReplies[Math.floor(Math.random() * partnerReplies.length)];

      const partnerBubble = document.getElementById('wiz-bubble-partner');
      if (partnerBubble) {
        partnerBubble.textContent = `💬 ${this.selectedPartner.name.split(' ')[0]}: "${reply}"`;
      }

      this.speakPartnerText(reply);
      window.EnglishBooster.addXP(80, 'Spoken conversation exchange with partner!');
      window.EnglishBooster.showToast('Fluency +80 XP!', 'Great live conversation turn completed!', 'success');
    }, 1200);
  }

  speakPartnerText(text) {
    if (!this.voiceAudioEnabled) return;
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Jenny')));
    if (enVoice) utterance.voice = enVoice;

    window.speechSynthesis.speak(utterance);
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.howItWorksWizard = new HowItWorksWizard();
  window.howItWorksWizard.init();
});
