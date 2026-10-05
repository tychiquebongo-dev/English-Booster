/**
 * ENGLISH BOOSTER — LIVE AUDIO/VIDEO CALL ROOM ENGINE (js/call.js)
 * Real-time Media Stream Management, Audio Waveforms, AI Prompts & Call Summary
 */

class EnglishBoosterCallRoom {
  constructor() {
    this.partner = null;
    this.seconds = 763; // 12:43 initial or starts from 00:00
    this.timerInterval = null;
    this.isMuted = false;
    this.isVideoOff = false;
    this.isScreenSharing = false;
    this.localStream = null;
  }

  init() {
    const urlParams = new URLSearchParams(window.location.search);
    const partnerId = urlParams.get('partner') || 'sofia_es';

    const partners = window.EnglishBoosterMatching ? window.EnglishBoosterMatching.partners : [];
    this.partner = partners.find(p => p.id === partnerId) || {
      id: 'sofia_es',
      name: 'Sofia Martínez',
      country: 'Spain 🇪🇸',
      level: 'B1',
      avatarText: 'SM'
    };

    this.renderHeader();
    this.startTimer();
    this.bindControls();
    this.initMediaStreams();
    this.initAIPromptRotator();

    // Play ringing sound on start
    window.EnglishBooster.SoundFX.playCallRing(1);
    window.EnglishBooster.showToast('Call Connected', `Practicing English with ${this.partner.name}`, 'success');
  }

  renderHeader() {
    const nameEl = document.getElementById('call-partner-name');
    const countryEl = document.getElementById('call-partner-country');
    const levelEl = document.getElementById('call-partner-level');

    if (nameEl) nameEl.textContent = this.partner.name;
    if (countryEl) countryEl.textContent = this.partner.country;
    if (levelEl) {
      levelEl.textContent = this.partner.level;
      levelEl.className = `badge-level level-${this.partner.level.toLowerCase()}`;
    }
  }

  startTimer() {
    const timerEl = document.getElementById('call-timer');
    if (!timerEl) return;

    const updateDisplay = () => {
      const mins = Math.floor(this.seconds / 60);
      const secs = this.seconds % 60;
      timerEl.textContent = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    updateDisplay();
    this.timerInterval = setInterval(() => {
      this.seconds++;
      updateDisplay();
    }, 1000);
  }

  bindControls() {
    const muteBtn = document.getElementById('btn-call-mute');
    const videoBtn = document.getElementById('btn-call-video');
    const screenBtn = document.getElementById('btn-call-screen');
    const endBtn = document.getElementById('btn-call-end');

    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        this.isMuted = !this.isMuted;
        muteBtn.classList.toggle('active', this.isMuted);
        muteBtn.innerHTML = this.isMuted ? '🔇 <span class="btn-label">Unmute</span>' : '🎙️ <span class="btn-label">Mute</span>';
        window.EnglishBooster.showToast(this.isMuted ? 'Microphone Muted' : 'Microphone Active', '', 'info', 1500);
        window.EnglishBooster.SoundFX.playClick();
      });
    }

    if (videoBtn) {
      videoBtn.addEventListener('click', () => {
        this.isVideoOff = !this.isVideoOff;
        videoBtn.classList.toggle('active', this.isVideoOff);
        videoBtn.innerHTML = this.isVideoOff ? '🚫 <span class="btn-label">Camera On</span>' : '📹 <span class="btn-label">Camera Off</span>';
        
        const localVideo = document.getElementById('local-video-preview');
        const localPlaceholder = document.getElementById('local-video-placeholder');
        if (localVideo && localPlaceholder) {
          localVideo.style.display = this.isVideoOff ? 'none' : 'block';
          localPlaceholder.style.display = this.isVideoOff ? 'flex' : 'none';
        }
        window.EnglishBooster.SoundFX.playClick();
      });
    }

    if (screenBtn) {
      screenBtn.addEventListener('click', () => {
        this.isScreenSharing = !this.isScreenSharing;
        screenBtn.classList.toggle('active', this.isScreenSharing);
        window.EnglishBooster.showToast(this.isScreenSharing ? 'Screen Share Active' : 'Screen Share Stopped', '', 'info');
        window.EnglishBooster.SoundFX.playClick();
      });
    }

    if (endBtn) {
      endBtn.addEventListener('click', () => {
        this.endCall();
      });
    }
  }

  async initMediaStreams() {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Try getting user camera
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }).catch(() => null);
        if (stream) {
          this.localStream = stream;
          const localVideo = document.getElementById('local-video-preview');
          if (localVideo) {
            localVideo.srcObject = stream;
            localVideo.play();
          }
        }
      }
    } catch (e) {
      // Permission denied or headless environment fallback is handled smoothly
    }
  }

  initAIPromptRotator() {
    const promptEl = document.getElementById('ai-coach-prompt-text');
    if (!promptEl) return;

    const prompts = [
      "💡 Ask your partner: 'What is your favorite weekend activity in your city?'",
      "💡 Try using this phrasal verb: 'Look forward to' (e.g. 'I look forward to our next trip')",
      "💡 Discussion topic: 'If you could work anywhere in the world, where would you go?'",
      "💡 Idiom of the day: 'Hit the nail on the head' (meaning: exactly right!)",
      "💡 Ask: 'What are the main cultural differences you noticed when traveling?'"
    ];

    let index = 0;
    setInterval(() => {
      index = (index + 1) % prompts.length;
      promptEl.style.opacity = '0';
      setTimeout(() => {
        promptEl.textContent = prompts[index];
        promptEl.style.opacity = '1';
      }, 400);
    }, 12000);
  }

  endCall() {
    clearInterval(this.timerInterval);
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
    }

    const durationMins = Math.floor(this.seconds / 60);

    // Show celebratory post-call summary modal
    let modal = document.getElementById('call-summary-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'call-summary-modal';
      modal.style.cssText = `
        position: fixed; inset: 0; background: rgba(6, 10, 20, 0.9); backdrop-filter: blur(20px);
        display: flex; align-items: center; justify-content: center; z-index: 3000; padding: 20px;
      `;
      modal.innerHTML = `
        <div class="glass-card" style="width: 100%; max-width: 520px; padding: 36px; text-align: center; position: relative;">
          <div style="font-size: 3.5rem; margin-bottom: 10px;">🎉</div>
          <h2 style="font-size: 1.8rem; margin-bottom: 8px;">Great Conversation!</h2>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 24px;">You practiced speaking English with ${this.partner.name}.</p>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 24px;">
            <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--glass-border); padding: 14px; border-radius: var(--radius-md);">
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--cyan-primary);">${durationMins} min</div>
              <div style="font-size: 0.75rem; color: var(--text-subtle); text-transform: uppercase;">Duration</div>
            </div>
            <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--glass-border); padding: 14px; border-radius: var(--radius-md);">
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--purple-primary);">+50 XP</div>
              <div style="font-size: 0.75rem; color: var(--text-subtle); text-transform: uppercase;">Bonus XP</div>
            </div>
            <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--glass-border); padding: 14px; border-radius: var(--radius-md);">
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--emerald-accent);">88%</div>
              <div style="font-size: 0.75rem; color: var(--text-subtle); text-transform: uppercase;">Fluency</div>
            </div>
          </div>

          <div style="text-align: left; background: rgba(0,242,254,0.06); border: 1px solid rgba(0,242,254,0.2); border-radius: var(--radius-md); padding: 16px; margin-bottom: 24px; font-size: 0.9rem;">
            <strong style="color: var(--cyan-primary); display: block; margin-bottom: 4px;">AI Coach Session Notes:</strong>
            <p style="color: var(--text-muted); line-height: 1.5;">You spoke with natural rhythm and good listening responsiveness. Try using more transition words like "Furthermore" and "On the other hand" next time!</p>
          </div>

          <div style="display: flex; gap: 12px;">
            <a href="dashboard.html" class="btn btn-primary" style="flex: 1;">
              Go to Dashboard
            </a>
            <a href="partners.html" class="btn btn-secondary">
              Find Next Partner
            </a>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    window.EnglishBooster.addXP(50, 'Completed Live Conversation');
    window.EnglishBooster.launchConfetti(3000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('call-timer')) {
    window.callRoom = new EnglishBoosterCallRoom();
    window.callRoom.init();
  }
});
