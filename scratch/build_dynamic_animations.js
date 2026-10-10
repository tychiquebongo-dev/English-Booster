const fs = require('fs');

const animationsJsContent = `/**
 * ENGLISH BOOSTER — ADVANCED ANIMATIONS & DYNAMIC INTERACTION ENGINE (v2.5)
 * Features:
 * 1. 3D Glass Card Tilt & Holographic Specular Glare (Micro-interactions)
 * 2. Magnetic Buttons & Neon Ripple Click Waves
 * 3. Real-Time Global Activity Ticker ("Pulse of the World" Live Feed)
 * 4. Interactive Global Partner Sonar Radar Scanner
 * 5. Interactive Voice Gym & 60 FPS Audio Frequency Spectrum Visualizer
 * 6. Floating Booster Quick Hub (Speed Dial with 1-click actions)
 * 7. Gamification XP Particle Flyout Engine (+XX XP floating stars)
 * 8. Scroll Reveal Observer & Statistical Rolling Number Counters
 * 9. Crystal Mouse Parallax Engine
 */

(function () {
  'use strict';

  // Helper for bilingual detection
  function isFr() {
    if (window.EnglishBooster && window.EnglishBooster.i18n) {
      return window.EnglishBooster.i18n.getLang() === 'fr';
    }
    const saved = localStorage.getItem('eb_lang');
    if (saved) return saved === 'fr';
    return (navigator.language || '').toLowerCase().startsWith('fr');
  }

  function resolvePath(relativePath) {
    const inPages = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\\\pages\\\\');
    const clean = relativePath.replace(/^(\\.\\.\\/)+/, '');
    return inPages ? '../' + clean : clean;
  }

  // ==========================================================================
  // 1. SCROLL REVEAL OBSERVER
  // ==========================================================================
  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal-init');
    if (!elements.length) return;

    const vh = window.innerHeight || document.documentElement.clientHeight || 800;
    elements.forEach(el => {
      try {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh + 100) {
          el.classList.add('reveal-active');
        }
      } catch (e) {
        el.classList.add('reveal-active');
      }
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05, rootMargin: '0px 0px 50px 0px' });

      elements.forEach(el => {
        if (!el.classList.contains('reveal-active')) {
          observer.observe(el);
        }
      });
    } else {
      elements.forEach(el => el.classList.add('reveal-active'));
    }

    setTimeout(() => {
      document.querySelectorAll('.reveal-init:not(.reveal-active)').forEach(el => {
        el.classList.add('reveal-active');
      });
    }, 800);
  }

  // ==========================================================================
  // 2. STATISTICAL NUMBER COUNTER ANIMATIONS (ODOMETER EASING)
  // ==========================================================================
  function initStatCounters() {
    const counters = document.querySelectorAll('[data-counter-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          animateCounter(el);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.25 });

    counters.forEach(counter => observer.observe(counter));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-counter-target'), 10);
    if (isNaN(target)) return;
    const suffix = el.getAttribute('data-counter-suffix') || '';
    const duration = 2000;
    const startTimestamp = performance.now();

    function step(currentTimestamp) {
      const progress = Math.min((currentTimestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeProgress * target);

      el.textContent = currentValue.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  // ==========================================================================
  // 3. CRYSTAL PARALLAX & MOUSE GLOW
  // ==========================================================================
  function initCrystalMouseParallax() {
    const orbs = document.querySelectorAll('.crystal-orb');
    if (!orbs.length) return;

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 35;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 35;
    }, { passive: true });

    function renderParallax() {
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 0.35;
        orb.style.transform = \`translate(\${currentX * factor}px, \${currentY * factor}px)\`;
      });

      requestAnimationFrame(renderParallax);
    }

    renderParallax();
  }

  // ==========================================================================
  // 4. INTERACTIVE 3D GLASS CARD TILT & SPECULAR GLARE
  // ==========================================================================
  function initCard3DTilt() {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const cards = document.querySelectorAll('.glass-card, .partner-card, .pricing-card, .challenge-card, .about-team-card');
    cards.forEach(card => {
      if (card.dataset.tiltInit) return;
      card.dataset.tiltInit = 'true';
      card.classList.add('tilt-card');

      // Add specular glare overlay
      let glare = card.querySelector('.glare-overlay');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'glare-overlay';
        card.appendChild(glare);
      }

      let reqId = null;

      card.addEventListener('mousemove', (e) => {
        if (reqId) cancelAnimationFrame(reqId);
        reqId = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const pctX = Math.round((x / rect.width) * 100);
          const pctY = Math.round((y / rect.height) * 100);

          card.style.setProperty('--mouse-x', \`\${pctX}%\`);
          card.style.setProperty('--mouse-y', \`\${pctY}%\`);

          // Tilt angle (-7 to +7 deg)
          const rotX = ((y / rect.height) - 0.5) * -12;
          const rotY = ((x / rect.width) - 0.5) * 12;

          card.style.transform = \`perspective(1000px) rotateX(\${rotX.toFixed(2)}deg) rotateY(\${rotY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)\`;
        });
      });

      card.addEventListener('mouseleave', () => {
        if (reqId) cancelAnimationFrame(reqId);
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // ==========================================================================
  // 5. MAGNETIC BUTTONS & NEON RIPPLE EFFECT
  // ==========================================================================
  function initMagneticAndRipples() {
    document.querySelectorAll('.btn, .mic-circle-btn, .theme-toggle-btn').forEach(btn => {
      if (btn.dataset.rippleBound) return;
      btn.dataset.rippleBound = 'true';

      // Click ripple
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'eb-ripple';
        const size = Math.max(rect.width, rect.height) * 1.6;
        ripple.style.width = \`\${size}px\`;
        ripple.style.height = \`\${size}px\`;
        ripple.style.left = \`\${e.clientX - rect.left - size / 2}px\`;
        ripple.style.top = \`\${e.clientY - rect.top - size / 2}px\`;
        btn.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });

      // Sound hover
      btn.addEventListener('mouseenter', () => {
        if (window.EnglishBooster && window.EnglishBooster.SoundFX) {
          window.EnglishBooster.SoundFX.playHover();
        }
      });
    });
  }

  // ==========================================================================
  // 6. FLOATING GAMIFICATION XP PARTICLE FLYOUT ENGINE
  // ==========================================================================
  function spawnXpFlyout(amount, sourceElOrCoords) {
    let startX = window.innerWidth - 120;
    let startY = 80;

    if (sourceElOrCoords) {
      if (sourceElOrCoords instanceof HTMLElement) {
        const rect = sourceElOrCoords.getBoundingClientRect();
        startX = rect.left + rect.width / 2;
        startY = rect.top + rect.height / 2;
      } else if (typeof sourceElOrCoords.x === 'number') {
        startX = sourceElOrCoords.x;
        startY = sourceElOrCoords.y;
      }
    }

    const particle = document.createElement('div');
    particle.className = 'eb-xp-particle';
    particle.style.left = \`\${startX}px\`;
    particle.style.top = \`\${startY}px\`;
    particle.innerHTML = \`<span>✨</span> +\${amount} XP\`;
    document.body.appendChild(particle);

    if (window.EnglishBooster && window.EnglishBooster.SoundFX) {
      window.EnglishBooster.SoundFX.playSuccess();
    }

    setTimeout(() => particle.remove(), 1300);

    // Odometer roll on visible XP element
    const xpValEl = document.getElementById('dash-xp-val');
    if (xpValEl && window.EnglishBooster && window.EnglishBooster.currentUser) {
      const user = window.EnglishBooster.currentUser;
      xpValEl.textContent = \`\${(user.xp || 2450).toLocaleString()} XP\`;
    }
  }

  // ==========================================================================
  // 7. REAL-TIME GLOBAL ACTIVITY TICKER ("PULSE OF THE WORLD")
  // ==========================================================================
  const LIVE_EVENTS = [
    {
      name: 'Sofia Martínez',
      flag: '🇪🇸',
      avatar: 'assets/avatars/sofia.jpg',
      en: 'Started a live 1-to-1 conversation with Kenji 🇯🇵',
      fr: 'A démarré un appel direct 1-to-1 avec Kenji 🇯🇵',
      xp: 50
    },
    {
      name: 'Kenji Sato',
      flag: '🇯🇵',
      avatar: 'assets/avatars/kenji.jpg',
      en: 'Unlocked "8 Day Speaking Streak" 🔥',
      fr: 'A débloqué le badge "8 Jours de Série" 🔥',
      xp: 100
    },
    {
      name: 'Amara Okafor',
      flag: '🇳🇬',
      avatar: 'assets/avatars/amara.jpg',
      en: 'Scored 98% in AI Fluency Coach session 🌟',
      fr: 'A obtenu 98% de fluidité avec l\'AI Coach 🌟',
      xp: 75
    },
    {
      name: 'Lucas Weber',
      flag: '🇩🇪',
      avatar: 'assets/avatars/lucas.jpg',
      en: 'Completed Daily Challenge "Dream Destination" 🎯',
      fr: 'A relevé le Défi du Jour "Destination de Rêve" 🎯',
      xp: 100
    },
    {
      name: 'Tychique Bongo',
      flag: '🇨🇮',
      avatar: 'assets/images/tychique-bongo.jpg',
      en: 'Hosting a Live WebRTC Practice Room 🎙️',
      fr: 'Anime un salon d\'immersion WebRTC en direct 🎙️',
      xp: 80
    },
    {
      name: 'Mateo Rossi',
      flag: '🇦🇷',
      avatar: 'assets/avatars/alex.jpg',
      en: 'Logged 25 mins speaking time today ⏱️',
      fr: 'A pratiqué 25 minutes d\'expression orale ⏱️',
      xp: 60
    },
    {
      name: 'Elena Rossi',
      flag: '🇮🇹',
      avatar: 'assets/avatars/sofia.jpg',
      en: 'Shared a cultural idiom in the Community 💡',
      fr: 'A partagé une expression idiomatique 💡',
      xp: 40
    }
  ];

  let currentEventIndex = 0;
  let tickerInterval = null;

  function initLiveActivityTicker() {
    let wrap = document.getElementById('eb-live-ticker-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'eb-live-ticker-wrap';
      wrap.className = 'eb-live-ticker-wrap';
      document.body.appendChild(wrap);
    }

    renderCurrentTickerItem(wrap);

    if (tickerInterval) clearInterval(tickerInterval);
    tickerInterval = setInterval(() => {
      currentEventIndex = (currentEventIndex + 1) % LIVE_EVENTS.length;
      renderCurrentTickerItem(wrap);
    }, 6500);
  }

  function renderCurrentTickerItem(wrap) {
    const ev = LIVE_EVENTS[currentEventIndex];
    const isFrench = isFr();
    const actionText = isFrench ? ev.fr : ev.en;
    const cheerText = isFrench ? 'Encourager 👏' : 'Cheer 👏';
    const avatarSrc = resolvePath(ev.avatar);

    wrap.innerHTML = \`
      <div class="eb-live-ticker-card" id="eb-active-ticker-card">
        <div class="eb-live-dot" title="Live Global Network"></div>
        <div class="eb-ticker-avatar-wrap">
          <img src="\${avatarSrc}" alt="\${ev.name}" class="eb-ticker-avatar" onerror="this.src='\${resolvePath('assets/avatars/alex.jpg')}'" />
          <span class="eb-ticker-flag">\${ev.flag}</span>
        </div>
        <div class="eb-ticker-body">
          <div class="eb-ticker-name">
            <span>\${ev.name}</span>
            <span style="font-size: 0.7rem; color: #4ade80; font-weight: 800;">+\${ev.xp} XP</span>
          </div>
          <div class="eb-ticker-text">\${actionText}</div>
        </div>
        <button type="button" class="eb-ticker-action-btn" id="eb-ticker-cheer-btn" title="Cheer learner">
          \${cheerText}
        </button>
      </div>
    \`;

    const cheerBtn = wrap.querySelector('#eb-ticker-cheer-btn');
    if (cheerBtn) {
      cheerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.EnglishBooster && window.EnglishBooster.SoundFX) {
          window.EnglishBooster.SoundFX.playCheer();
        }
        cheerBtn.disabled = true;
        cheerBtn.innerHTML = '✨ Merci !';
        cheerBtn.style.background = '#4ade80';
        cheerBtn.style.color = '#030712';

        // Reward the cheerer +5 XP!
        spawnXpFlyout(5, cheerBtn);
        if (window.EnglishBooster && window.EnglishBooster.showToast) {
          const cheerMsg = isFrench ? \`Vous avez encouragé \${ev.name} ! +5 XP bonus gagnés.\` : \`You cheered \${ev.name}! +5 bonus XP earned.\`;
          window.EnglishBooster.showToast('👏 Good Karma!', cheerMsg, 'success', 2500);
        }
      });
    }

    const card = wrap.querySelector('#eb-active-ticker-card');
    if (card) {
      card.addEventListener('click', () => {
        // Quick open radar or conversation
        openRadarScanner();
      });
    }
  }

  // ==========================================================================
  // 8. INTERACTIVE GLOBAL PARTNER SONAR RADAR SCANNER
  // ==========================================================================
  function openRadarScanner() {
    let modal = document.getElementById('eb-radar-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'eb-radar-modal';
      modal.className = 'eb-radar-overlay';
      document.body.appendChild(modal);
    }

    const isFrench = isFr();
    const title = isFrench ? 'Radar de Matchmaking Instantané' : 'Instant Global Matchmaking Radar';
    const subtitle = isFrench ? 'Balayage en temps réel des apprenants en ligne (Niveau & Intérêts compatibles)' : 'Real-time sonar scan of active global learners (Level & Shared Interests)';
    const scanStatus = isFrench ? 'Recherche de fréquence à Tokyo, Madrid, Lagos, Berlin...' : 'Scanning radio frequencies across Tokyo, Madrid, Lagos, Berlin...';
    const closeBtnText = isFrench ? 'Fermer' : 'Close';

    modal.innerHTML = \`
      <div class="eb-radar-box">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span class="crystal-badge" style="background: rgba(74, 222, 128, 0.15); color: #4ade80; border-color: rgba(74, 222, 128, 0.4);">
            🟢 145 Live Peers
          </span>
          <button type="button" class="toast-close" id="eb-radar-close-btn" style="color: #ffffff; font-size: 1.6rem; cursor: pointer; border: none; background: transparent;">&times;</button>
        </div>
        <h3 style="font-size: 1.45rem; margin: 0 0 6px;" class="text-gradient-cyan">\${title}</h3>
        <p style="color: var(--text-muted); font-size: 0.86rem; margin: 0 0 16px;">\${subtitle}</p>

        <!-- RADAR SCREEN -->
        <div class="eb-radar-screen">
          <div class="eb-radar-ring eb-radar-ring-1"></div>
          <div class="eb-radar-ring eb-radar-ring-2"></div>
          <div class="eb-radar-cross-h"></div>
          <div class="eb-radar-cross-v"></div>
          <div class="eb-radar-sweep"></div>

          <!-- Pulsing Blips -->
          <div class="eb-radar-blip" style="top: 28%; left: 74%;" title="Kenji (Tokyo 🇯🇵)">🇯🇵</div>
          <div class="eb-radar-blip" style="top: 42%; left: 32%;" title="Sofia (Madrid 🇪🇸)">🇪🇸</div>
          <div class="eb-radar-blip" style="top: 68%; left: 54%;" title="Amara (Lagos 🇳🇬)">🇳🇬</div>
          <div class="eb-radar-blip" style="top: 25%; left: 45%;" title="Lucas (Berlin 🇩🇪)">🇩🇪</div>
          <div class="eb-radar-blip" style="top: 75%; left: 38%;" title="Tychique (Abidjan 🇨🇮)">🇨🇮</div>
          <div class="eb-radar-blip" style="top: 82%; left: 22%;" title="Mateo (Buenos Aires 🇦🇷)">🇦🇷</div>
        </div>

        <div id="eb-radar-status" style="font-size: 0.9rem; color: #38bdf8; font-weight: 700; min-height: 24px; margin-bottom: 12px;">
          \${scanStatus}
        </div>

        <div id="eb-radar-result-container"></div>
      </div>
    \`;

    modal.style.display = 'flex';

    if (window.EnglishBooster && window.EnglishBooster.SoundFX) {
      window.EnglishBooster.SoundFX.playRadarPing();
    }

    const closeBtn = modal.querySelector('#eb-radar-close-btn');
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });

    // Animate search to match after 2.4 seconds
    setTimeout(() => {
      const statusEl = modal.querySelector('#eb-radar-status');
      const resultContainer = modal.querySelector('#eb-radar-result-container');
      if (!statusEl || !resultContainer) return;

      if (window.EnglishBooster && window.EnglishBooster.SoundFX) {
        window.EnglishBooster.SoundFX.playSuccess();
      }

      const matchFoundText = isFrench ? '✨ Partenaire Idéal Trouvé ! Compatibilité 98%' : '✨ Perfect Match Found! 98% Compatibility';
      statusEl.innerHTML = \`<span style="color: #4ade80;">\${matchFoundText}</span>\`;

      const partnerAvatar = resolvePath('assets/avatars/kenji.jpg');
      const callPageUrl = resolvePath('pages/call.html');
      const chatPageUrl = resolvePath('pages/chat.html');

      resultContainer.innerHTML = \`
        <div class="eb-radar-matched-card">
          <div class="partner-avatar" style="width: 54px; height: 54px; border: 2px solid #4ade80;">
            <img src="\${partnerAvatar}" alt="Kenji" class="avatar-img" />
            <span class="avatar-badge-flag">🇯🇵</span>
          </div>
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h4 style="margin: 0; font-size: 1.05rem; color: #ffffff;">Kenji Sato</h4>
              <span class="badge-level level-b2" style="font-size: 0.72rem; padding: 2px 7px;">B2</span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin: 2px 0 6px;">
              Tokyo, Japan · Tech, Gaming & Travel
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <a href="\${callPageUrl}?partner=kenji_jp&autocall=true" class="btn btn-primary btn-sm" style="font-size: 0.78rem; padding: 6px 14px;">
                <span>🎙️</span> \${isFrench ? 'Lancer l\\'Appel Direct' : 'Start Live Call'}
              </a>
              <a href="\${chatPageUrl}?partner=kenji_jp" class="btn btn-secondary btn-sm" style="font-size: 0.78rem; padding: 6px 12px;">
                <span>💬</span> \${isFrench ? 'Discuter en Chat' : 'Open Chat'}
              </a>
            </div>
          </div>
        </div>
      \`;

      if (window.EnglishBooster && window.EnglishBooster.launchConfetti) {
        window.EnglishBooster.launchConfetti(1500);
      }
    }, 2400);
  }

  // ==========================================================================
  // 9. INTERACTIVE VOICE GYM & 60 FPS AUDIO SPECTRUM VISUALIZER
  // ==========================================================================
  let visualizerAudioCtx = null;
  let visualizerAnalyser = null;
  let visualizerStream = null;
  let visualizerAnimFrame = null;
  let isVoiceRecording = false;

  function openVoiceGym() {
    let modal = document.getElementById('eb-voice-gym-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'eb-voice-gym-modal';
      modal.className = 'eb-radar-overlay';
      document.body.appendChild(modal);
    }

    const isFrench = isFr();
    const title = isFrench ? 'Speaking Gym & Analyse Vocale en Direct' : 'Interactive Speaking Gym & Voice Visualizer';
    const subtitle = isFrench ? 'Échauffez votre voix, visualisez vos fréquences orales et recevez le diagnostic de l\'IA' : 'Warm up your voice, analyze your pitch and test your speaking clarity in real-time';
    const sentencePrompt = isFrench ? '"Today is a fantastic day to practice English and connect with the world!"' : '"Today is a fantastic day to practice English and connect with the world!"';
    const startBtnText = isFrench ? '🎙️ Démarrer l\\'Échauffement Vocal' : '🎙️ Start Speaking Warmup';

    modal.innerHTML = \`
      <div class="eb-voice-gym-box">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span class="crystal-badge crystal-badge-purple">
            ✨ AI Speech Engine
          </span>
          <button type="button" class="toast-close" id="eb-voice-close-btn" style="color: #ffffff; font-size: 1.6rem; cursor: pointer; border: none; background: transparent;">&times;</button>
        </div>

        <h3 style="font-size: 1.45rem; margin: 0 0 6px;" class="text-gradient-cyan">\${title}</h3>
        <p style="color: var(--text-muted); font-size: 0.86rem; margin: 0 0 14px;">\${subtitle}</p>

        <!-- Speaking Prompt Card -->
        <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 14px; padding: 12px 16px; margin-bottom: 14px;">
          <div style="font-size: 0.75rem; text-transform: uppercase; color: #4ade80; font-weight: 700; margin-bottom: 4px;">
            \${isFrench ? 'Phrase d\\'entraînement suggérée :' : 'Suggested Speaking Practice :'}
          </div>
          <div style="font-size: 1.05rem; font-style: italic; color: #ffffff; font-weight: 600;">
            \${sentencePrompt}
          </div>
        </div>

        <!-- 60 FPS Canvas Visualizer -->
        <canvas id="eb-gym-canvas" class="eb-visualizer-canvas" width="480" height="120"></canvas>

        <!-- dB Volume Meter -->
        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">
          <span>\${isFrench ? 'Volume Micro' : 'Mic Volume'}</span>
          <span id="eb-voice-db-text">0 dB</span>
        </div>
        <div class="eb-voice-meter-wrap">
          <div id="eb-voice-meter-fill" class="eb-voice-meter-fill"></div>
        </div>

        <!-- Live Metrics Grid -->
        <div class="eb-voice-stat-grid">
          <div class="eb-voice-stat-box">
            <div id="eb-voice-fluency-val" class="eb-voice-stat-val">0%</div>
            <div class="eb-voice-stat-lbl">\${isFrench ? 'Fluidité' : 'Fluency'}</div>
          </div>
          <div class="eb-voice-stat-box">
            <div id="eb-voice-clarity-val" class="eb-voice-stat-val">--</div>
            <div class="eb-voice-stat-lbl">\${isFrench ? 'Clarté Vocale' : 'Vocal Clarity'}</div>
          </div>
          <div class="eb-voice-stat-box">
            <div id="eb-voice-score-val" class="eb-voice-stat-val">+0 XP</div>
            <div class="eb-voice-stat-lbl">\${isFrench ? 'Bonus XP' : 'XP Reward'}</div>
          </div>
        </div>

        <button type="button" id="eb-voice-toggle-btn" class="btn btn-primary" style="width: 100%; font-weight: 800; padding: 14px 20px; box-shadow: 0 0 25px rgba(59, 130, 246, 0.4);">
          \${startBtnText}
        </button>

        <div id="eb-voice-ai-feedback" style="font-size: 0.85rem; color: #4ade80; margin-top: 14px; min-height: 20px;"></div>
      </div>
    \`;

    modal.style.display = 'flex';

    const closeBtn = modal.querySelector('#eb-voice-close-btn');
    closeBtn.addEventListener('click', () => {
      stopVoiceGym();
      modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        stopVoiceGym();
        modal.style.display = 'none';
      }
    });

    const toggleBtn = modal.querySelector('#eb-voice-toggle-btn');
    toggleBtn.addEventListener('click', () => {
      if (!isVoiceRecording) {
        startVoiceGym(modal);
      } else {
        stopVoiceGym();
      }
    });

    // Draw initial idle canvas
    drawIdleVisualizer(modal.querySelector('#eb-gym-canvas'));
  }

  function drawIdleVisualizer(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const bars = 36;
    const barWidth = (w / bars) - 3;
    for (let i = 0; i < bars; i++) {
      const bh = 8 + Math.sin(i * 0.3) * 6;
      ctx.fillStyle = 'rgba(96, 165, 250, 0.25)';
      ctx.beginPath();
      ctx.roundRect(i * (barWidth + 3), h / 2 - bh / 2, barWidth, bh, 3);
      ctx.fill();
    }
  }

  function startVoiceGym(modal) {
    isVoiceRecording = true;
    const isFrench = isFr();
    const toggleBtn = modal.querySelector('#eb-voice-toggle-btn');
    if (toggleBtn) {
      toggleBtn.innerHTML = isFrench ? '⏹️ Terminer l\\'Enregistrement' : '⏹️ Stop Recording';
      toggleBtn.style.background = 'linear-gradient(135deg, #ef4444, #f97316)';
    }

    if (window.EnglishBooster && window.EnglishBooster.SoundFX) {
      window.EnglishBooster.SoundFX.playMicBeep(true);
    }

    const canvas = modal.querySelector('#eb-gym-canvas');
    const meterFill = modal.querySelector('#eb-voice-meter-fill');
    const dbText = modal.querySelector('#eb-voice-db-text');
    const fluencyEl = modal.querySelector('#eb-voice-fluency-val');
    const clarityEl = modal.querySelector('#eb-voice-clarity-val');
    const scoreEl = modal.querySelector('#eb-voice-score-val');
    const feedbackEl = modal.querySelector('#eb-voice-ai-feedback');

    let secondsSpoken = 0;
    const startTime = Date.now();

    // Check if real microphone is accessible
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        visualizerStream = stream;
        visualizerAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
        visualizerAnalyser = visualizerAudioCtx.createAnalyser();
        visualizerAnalyser.fftSize = 64;
        const source = visualizerAudioCtx.createMediaStreamSource(stream);
        source.connect(visualizerAnalyser);
        renderActiveLoop(visualizerAnalyser);
      }).catch(() => {
        // Fallback to simulated audio synthesis
        simulateAudioLoop();
      });
    } else {
      simulateAudioLoop();
    }

    function renderActiveLoop(analyser) {
      if (!isVoiceRecording) return;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      let sum = 0;
      for (let i = 0; i < bufferLength; i++) sum += dataArray[i];
      const avg = sum / bufferLength;

      updateUI(avg, dataArray);
      visualizerAnimFrame = requestAnimationFrame(() => renderActiveLoop(analyser));
    }

    function simulateAudioLoop() {
      if (!isVoiceRecording) return;
      const dataArray = new Uint8Array(32);
      const time = (Date.now() - startTime) / 1000;
      let sum = 0;
      for (let i = 0; i < 32; i++) {
        const val = Math.floor(Math.abs(Math.sin(time * 3 + i * 0.4) * 180 + Math.random() * 40));
        dataArray[i] = val;
        sum += val;
      }
      const avg = sum / 32;

      updateUI(avg, dataArray);
      visualizerAnimFrame = requestAnimationFrame(simulateAudioLoop);
    }

    function updateUI(avg, dataArray) {
      secondsSpoken = (Date.now() - startTime) / 1000;

      // Draw canvas
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const bars = 32;
        const barWidth = (w / bars) - 3;
        for (let i = 0; i < bars; i++) {
          const val = dataArray[i] || 10;
          const bh = Math.max(8, (val / 255) * h * 0.85);

          const grad = ctx.createLinearGradient(0, h / 2 - bh / 2, 0, h / 2 + bh / 2);
          grad.addColorStop(0, '#38bdf8');
          grad.addColorStop(0.5, '#c084fc');
          grad.addColorStop(1, '#34d399');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.roundRect(i * (barWidth + 3), h / 2 - bh / 2, barWidth, bh, 3);
          ctx.fill();
        }
      }

      // Meter fill
      const meterPct = Math.min(100, Math.round((avg / 150) * 100));
      if (meterFill) meterFill.style.width = \`\${meterPct}%\`;
      if (dbText) dbText.textContent = \`-\${Math.max(10, 60 - Math.round(avg / 3))} dB\`;

      // Fluency progress
      const currentFluency = Math.min(96, Math.round(55 + secondsSpoken * 8));
      if (fluencyEl) fluencyEl.textContent = \`\${currentFluency}%\`;
      if (clarityEl) clarityEl.textContent = secondsSpoken > 2 ? (isFrench ? 'Excellente' : 'High Clarity') : (isFrench ? 'Écoute...' : 'Listening...');
      if (scoreEl) scoreEl.textContent = \`+\${Math.min(25, Math.round(secondsSpoken * 5))} XP\`;

      // Auto victory after 5 seconds
      if (secondsSpoken >= 5.5 && isVoiceRecording) {
        stopVoiceGym();
        if (feedbackEl) {
          feedbackEl.innerHTML = isFrench
            ? '🎉 <strong>Bravo !</strong> Clarté vocale impeccable, débit fluide et naturel. +25 XP remportés !'
            : '🎉 <strong>Awesome job!</strong> Crisp resonance, natural pace and high clarity. +25 XP awarded!';
        }
        if (window.EnglishBooster && window.EnglishBooster.addXP) {
          window.EnglishBooster.addXP(25, isFrench ? 'Échauffement vocal réussi' : 'Speaking Warmup Completed', toggleBtn);
        }
      }
    }
  }

  function stopVoiceGym() {
    isVoiceRecording = false;
    if (visualizerAnimFrame) cancelAnimationFrame(visualizerAnimFrame);
    if (visualizerStream) {
      visualizerStream.getTracks().forEach(t => t.stop());
      visualizerStream = null;
    }
    if (visualizerAudioCtx) {
      visualizerAudioCtx.close();
      visualizerAudioCtx = null;
    }

    const modal = document.getElementById('eb-voice-gym-modal');
    if (modal) {
      const toggleBtn = modal.querySelector('#eb-voice-toggle-btn');
      if (toggleBtn) {
        const isFrench = isFr();
        toggleBtn.innerHTML = isFrench ? '🎙️ Démarrer l\\'Échauffement Vocal' : '🎙️ Start Speaking Warmup';
        toggleBtn.style.background = '';
      }
      drawIdleVisualizer(modal.querySelector('#eb-gym-canvas'));
    }

    if (window.EnglishBooster && window.EnglishBooster.SoundFX) {
      window.EnglishBooster.SoundFX.playMicBeep(false);
    }
  }

  // ==========================================================================
  // 10. FLOATING BOOSTER QUICK HUB (SPEED DIAL)
  // ==========================================================================
  function initQuickBoosterHub() {
    let hub = document.getElementById('eb-quick-hub');
    if (!hub) {
      hub = document.createElement('div');
      hub.id = 'eb-quick-hub';
      hub.className = 'eb-quick-hub';
      document.body.appendChild(hub);
    }

    const isFrench = isFr();
    const soundEnabled = window.EnglishBooster && window.EnglishBooster.SoundFX ? window.EnglishBooster.SoundFX.isEnabled() : true;
    const soundText = soundEnabled ? (isFrench ? 'Sons : Activés 🔊' : 'Sound: ON 🔊') : (isFrench ? 'Sons : Muets 🔇' : 'Sound: OFF 🔇');
    const radarLabel = isFrench ? '⚡ Radar Match (3s)' : '⚡ Radar Match (3s)';
    const gymLabel = isFrench ? '🎙️ Voice Gym & Warmup' : '🎙️ Voice Gym & Warmup';
    const chalLabel = isFrench ? '🎯 Défi du Jour (+100 XP)' : '🎯 Daily Challenge (+100 XP)';
    const langLabel = isFrench ? '🇬🇧 Switch to English' : '🇫🇷 Passer en Français';

    const challengesUrl = resolvePath('pages/challenges.html');

    hub.innerHTML = \`
      <div class="eb-hub-menu" id="eb-hub-menu">
        <button type="button" class="eb-hub-item" id="eb-hub-radar">
          <span class="eb-hub-item-icon">⚡</span>
          <span>\${radarLabel}</span>
        </button>
        <button type="button" class="eb-hub-item" id="eb-hub-gym">
          <span class="eb-hub-item-icon">🎙️</span>
          <span>\${gymLabel}</span>
        </button>
        <a href="\${challengesUrl}" class="eb-hub-item" id="eb-hub-challenge">
          <span class="eb-hub-item-icon">🎯</span>
          <span>\${chalLabel}</span>
        </a>
        <button type="button" class="eb-hub-item" id="eb-hub-sound">
          <span class="eb-hub-item-icon">🔊</span>
          <span id="eb-hub-sound-label">\${soundText}</span>
        </button>
        <button type="button" class="eb-hub-item" id="eb-hub-lang">
          <span class="eb-hub-item-icon">🌐</span>
          <span>\${langLabel}</span>
        </button>
      </div>

      <button type="button" class="eb-hub-btn-main" id="eb-hub-toggle-btn" title="English Booster Quick Hub" aria-label="Quick Hub">
        ✨
      </button>
    \`;

    const toggleBtn = hub.querySelector('#eb-hub-toggle-btn');
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hub.classList.toggle('open');
      if (window.EnglishBooster && window.EnglishBooster.SoundFX) {
        window.EnglishBooster.SoundFX.playClick();
      }
    });

    document.addEventListener('click', (e) => {
      if (!hub.contains(e.target)) {
        hub.classList.remove('open');
      }
    });

    // Radar action
    hub.querySelector('#eb-hub-radar').addEventListener('click', () => {
      hub.classList.remove('open');
      openRadarScanner();
    });

    // Voice Gym action
    hub.querySelector('#eb-hub-gym').addEventListener('click', () => {
      hub.classList.remove('open');
      openVoiceGym();
    });

    // Sound toggle action
    const soundBtn = hub.querySelector('#eb-hub-sound');
    soundBtn.addEventListener('click', () => {
      if (window.EnglishBooster && window.EnglishBooster.SoundFX) {
        const nextState = window.EnglishBooster.SoundFX.toggleSound();
        const lbl = hub.querySelector('#eb-hub-sound-label');
        if (lbl) {
          lbl.textContent = nextState ? (isFr() ? 'Sons : Activés 🔊' : 'Sound: ON 🔊') : (isFr() ? 'Sons : Muets 🔇' : 'Sound: OFF 🔇');
        }
        if (window.EnglishBooster.showToast) {
          window.EnglishBooster.showToast(nextState ? '🔊 Sound FX Enabled' : '🔇 Sound FX Muted', '', 'info', 1800);
        }
      }
    });

    // Language switch action
    hub.querySelector('#eb-hub-lang').addEventListener('click', () => {
      if (window.EnglishBooster && window.EnglishBooster.i18n && window.EnglishBooster.i18n.toggle) {
        window.EnglishBooster.i18n.toggle();
      } else {
        const cur = localStorage.getItem('eb_lang') || 'en';
        const next = cur === 'en' ? 'fr' : 'en';
        localStorage.setItem('eb_lang', next);
        window.location.reload();
      }
    });
  }

  // ==========================================================================
  // INITIALIZATION ON DOM READY
  // ==========================================================================
  function initAllDynamicEngines() {
    initScrollReveal();
    initStatCounters();
    initCrystalMouseParallax();
    initCard3DTilt();
    initMagneticAndRipples();
    initLiveActivityTicker();
    initQuickBoosterHub();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllDynamicEngines);
  } else {
    initAllDynamicEngines();
  }

  // Reactive re-render on language change
  window.addEventListener('eb_language_changed', () => {
    initLiveActivityTicker();
    initQuickBoosterHub();
  });

  // Export functions to global namespace
  window.EnglishBooster = window.EnglishBooster || {};
  window.EnglishBooster.openRadarScanner = openRadarScanner;
  window.EnglishBooster.openVoiceGym = openVoiceGym;
  window.EnglishBooster.spawnXpFlyout = spawnXpFlyout;
  window.EnglishBooster.initCard3DTilt = initCard3DTilt;

})();
`;

fs.writeFileSync('js/animations.js', animationsJsContent, 'utf8');
console.log('Successfully written dynamic animations engine to js/animations.js');
