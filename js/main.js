/**
 * ENGLISH BOOSTER — CORE APPLICATION SCRIPTS (js/main.js)
 * Architecture: Modular, Vanilla ES6, High-Performance, Glassmorphism Audio & FX Engine
 * "Connect. Speak. Improve."
 */

// Global App State & Namespace
window.EnglishBooster = window.EnglishBooster || {
  version: '2.0.0',
  currentUser: null,
  activeAudioContext: null
};

// ==========================================================================
// 1. WEB AUDIO SYNTHESIS FX ENGINE (No external MP3s needed!)
// ==========================================================================
class SoundFX {
  static getContext() {
    if (!window.EnglishBooster.activeAudioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        window.EnglishBooster.activeAudioContext = new AudioCtx();
      }
    }
    if (window.EnglishBooster.activeAudioContext && window.EnglishBooster.activeAudioContext.state === 'suspended') {
      window.EnglishBooster.activeAudioContext.resume();
    }
    return window.EnglishBooster.activeAudioContext;
  }

  // Gentle subtle UI Click
  static playClick() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Audio might be blocked by browser autoplay policy before gesture
    }
  }

  // Sparkling XP Chime
  static playSuccess() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.12, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.35);
      });
    } catch (e) {}
  }

  // Call Ringing Synthesizer
  static playCallRing(repeats = 2) {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      for (let i = 0; i < repeats; i++) {
        const start = ctx.currentTime + i * 1.8;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.frequency.setValueAtTime(440, start);
        osc2.frequency.setValueAtTime(480, start);
        gain.gain.setValueAtTime(0.15, start);
        gain.gain.setValueAtTime(0.15, start + 0.8);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.85);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start(start);
        osc2.start(start);
        osc1.stop(start + 0.85);
        osc2.stop(start + 0.85);
      }
    } catch (e) {}
  }
}

// ==========================================================================
// 2. CONFETTI CELEBRATION ENGINE
// ==========================================================================
function launchConfetti(duration = 2500) {
  let canvas = document.getElementById('confetti-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    document.body.appendChild(canvas);
  }
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ['#00f2fe', '#4facfe', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ffffff'];

  for (let i = 0; i < 90; i++) {
    pieces.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.8) * 16,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10
    });
  }

  const startTime = Date.now();

  function render() {
    const elapsed = Date.now() - startTime;
    if (elapsed > duration) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.rotation += p.vRot;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  render();
}

// ==========================================================================
// 3. TOAST NOTIFICATION COMPONENT
// ==========================================================================
function showToast(title, message, type = 'info', duration = 4000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: '🎉',
    info: '💡',
    warning: '⚠️',
    error: '❌'
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span style="font-size: 1.4rem;">${icons[type] || '✨'}</span>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <span class="toast-close" title="Close">&times;</span>
  `;

  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 250);
  });

  container.appendChild(toast);

  if (type === 'success') {
    SoundFX.playSuccess();
  } else {
    SoundFX.playClick();
  }

  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 250);
    }
  }, duration);
}

// ==========================================================================
// 4. USER STATE & LOCAL STORAGE PERSISTENCE
// ==========================================================================
const DEFAULT_USER = {
  fullName: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  nativeLanguage: 'Spanish',
  country: 'Spain 🇪🇸',
  englishLevel: 'B1',
  levelProgress: 68,
  streakDays: 7,
  speakingMinutes: 124,
  xp: 2450,
  mainGoal: 'Improve Speaking & Career',
  interests: ['Travel', 'Tech', 'Music', 'Movies'],
  badges: [
    { id: 'first_conv', name: 'First Conversation', icon: '🎙️', desc: 'Completed your 1st chat' },
    { id: 'streak_7', name: '7 Day Streak', icon: '🔥', desc: 'Practiced 7 days in a row' },
    { id: 'global_speaker', name: 'Global Speaker', icon: '🌍', desc: 'Talked with 5 different countries' },
    { id: 'vocab_builder', name: 'Vocabulary Builder', icon: '📚', desc: 'Learned 50+ new expressions' }
  ],
  isLoggedIn: true
};

function initUserState() {
  const stored = localStorage.getItem('eb_user');
  if (stored) {
    try {
      window.EnglishBooster.currentUser = JSON.parse(stored);
    } catch (e) {
      window.EnglishBooster.currentUser = DEFAULT_USER;
      localStorage.setItem('eb_user', JSON.stringify(DEFAULT_USER));
    }
  } else {
    window.EnglishBooster.currentUser = DEFAULT_USER;
    localStorage.setItem('eb_user', JSON.stringify(DEFAULT_USER));
  }
  return window.EnglishBooster.currentUser;
}

function updateUserState(updates) {
  const current = window.EnglishBooster.currentUser || initUserState();
  const updated = { ...current, ...updates };
  window.EnglishBooster.currentUser = updated;
  localStorage.setItem('eb_user', JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('userStateUpdated', { detail: updated }));
  return updated;
}

function addXP(amount, reason = '') {
  const user = window.EnglishBooster.currentUser || initUserState();
  const newXP = (user.xp || 0) + amount;
  updateUserState({ xp: newXP });
  showToast(`+${amount} XP Earned!`, reason || 'Keep practicing English!', 'success');
  launchConfetti(1800);
}

// ==========================================================================
// 5. THEME MANAGER (DARK / LIGHT MODE)
// ==========================================================================
function initTheme() {
  const savedTheme = localStorage.getItem('eb_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      SoundFX.playClick();
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('eb_theme', next);
      updateThemeIcons(next);
      showToast(next === 'light' ? '☀️ Light Mode Activated' : '🌙 Dark Crystal Mode Activated', 'Preference saved', 'info', 2000);
    });
  });
}

function updateThemeIcons(theme) {
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  });
}

// ==========================================================================
// 6. NAVBAR & MOBILE DRAWER SETUP
// ==========================================================================
function initNavigation() {
  const navbar = document.querySelector('.site-nav');
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const drawer = document.querySelector('.mobile-drawer');

  // Sticky Navbar on Scroll
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Mobile Hamburger Toggle
  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      SoundFX.playClick();
      toggleBtn.classList.toggle('open');
      drawer.classList.toggle('open');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!drawer.contains(e.target) && !toggleBtn.contains(e.target) && drawer.classList.contains('open')) {
        toggleBtn.classList.remove('open');
        drawer.classList.remove('open');
      }
    });

    // Close on navigation link click
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggleBtn.classList.remove('open');
        drawer.classList.remove('open');
      });
    });
  }

  // Active Link Highlight based on current path
  const currentPath = window.location.pathname.toLowerCase();
  document.querySelectorAll('.nav-link, .mobile-nav-link, .dock-item').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.toLowerCase().replace('../', '').replace('./', '');
    if (currentPath.endsWith(cleanHref) || (currentPath === '/' && cleanHref.includes('index.html'))) {
      link.classList.add('active');
    }
  });

  // Sound on interactive buttons
  document.querySelectorAll('.btn, .glass-card-interactive, .mic-circle-btn').forEach(el => {
    el.addEventListener('click', () => {
      SoundFX.playClick();
    });
  });
}

// ==========================================================================
// 7. INITIALIZE ON DOM CONTENT LOADED
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initUserState();
  initTheme();
  initNavigation();
});

// Export helper to global
window.EnglishBooster.SoundFX = SoundFX;
window.EnglishBooster.showToast = showToast;
window.EnglishBooster.launchConfetti = launchConfetti;
window.EnglishBooster.addXP = addXP;
window.EnglishBooster.updateUserState = updateUserState;
