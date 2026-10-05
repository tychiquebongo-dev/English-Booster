/**
 * ENGLISH BOOSTER — DAILY CHALLENGES & GAMIFICATION (js/challenges.js)
 * Daily Speaking Prompts, XP Multipliers, Badges System & Confetti Celebrations
 */

const BADGES_DATABASE = [
  { id: 'first_conv', name: 'First Conversation', icon: '🎙️', desc: 'Completed your first live exchange', unlocked: true, xp: 50 },
  { id: 'streak_7', name: '7 Day Streak', icon: '🔥', desc: 'Practiced 7 consecutive days', unlocked: true, xp: 100 },
  { id: 'global_speaker', name: 'Global Speaker', icon: '🌍', desc: 'Spoke with partners from 5 countries', unlocked: true, xp: 150 },
  { id: 'conv_master', name: 'Conversation Master', icon: '👑', desc: 'Completed 50 speaking sessions', unlocked: false, xp: 300 },
  { id: 'vocab_builder', name: 'Vocabulary Builder', icon: '📚', desc: 'Mastered 100+ native expressions', unlocked: true, xp: 100 },
  { id: 'english_champ', name: 'English Champion', icon: '🏆', desc: 'Achieved 10,000+ XP in leaderboard', unlocked: false, xp: 500 }
];

class EnglishBoosterChallenges {
  constructor() {
    this.isRecording = false;
    this.secondsRecorded = 0;
    this.recordTimer = null;
    this.challengeCompleted = false;
  }

  init() {
    this.bindDailyChallenge();
    this.renderBadges();
  }

  bindDailyChallenge() {
    const startBtn = document.getElementById('btn-start-challenge');
    const micBtn = document.getElementById('challenge-mic-btn');
    const timerDisplay = document.getElementById('challenge-record-time');
    const statusText = document.getElementById('challenge-status-text');
    const submitBtn = document.getElementById('btn-submit-challenge');

    if (startBtn) {
      startBtn.addEventListener('click', () => {
        document.getElementById('challenge-interactive-area')?.scrollIntoView({ behavior: 'smooth' });
        window.EnglishBooster.showToast('Challenge Activated', 'Press the microphone and speak about your dream destination!', 'info');
      });
    }

    if (micBtn) {
      micBtn.addEventListener('click', () => {
        if (!this.isRecording) {
          // Start recording
          this.isRecording = true;
          micBtn.classList.add('recording');
          micBtn.innerHTML = '⏹️';
          if (statusText) statusText.textContent = 'Recording your answer... Speak naturally!';
          
          this.secondsRecorded = 0;
          this.recordTimer = setInterval(() => {
            this.secondsRecorded++;
            const mins = Math.floor(this.secondsRecorded / 60);
            const secs = this.secondsRecorded % 60;
            if (timerDisplay) {
              timerDisplay.textContent = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
            }
            if (this.secondsRecorded >= 15 && submitBtn) {
              submitBtn.removeAttribute('disabled');
              submitBtn.classList.add('btn-primary');
            }
          }, 1000);

          window.EnglishBooster.SoundFX.playClick();
        } else {
          // Stop recording
          this.isRecording = false;
          micBtn.classList.remove('recording');
          micBtn.innerHTML = '🎙️';
          clearInterval(this.recordTimer);
          if (statusText) statusText.textContent = 'Audio recorded! Click Submit to claim your XP.';
          if (submitBtn) submitBtn.removeAttribute('disabled');
          window.EnglishBooster.SoundFX.playSuccess();
        }
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        if (this.challengeCompleted) {
          window.EnglishBooster.showToast('Already Completed', "You have already completed today's challenge!", 'info');
          return;
        }

        this.challengeCompleted = true;
        submitBtn.setAttribute('disabled', 'true');
        submitBtn.innerHTML = '✓ Challenge Completed!';
        if (statusText) statusText.innerHTML = '🎉 <strong style="color: var(--emerald-accent);">Excellent job! Challenge Completed!</strong>';

        // Trigger celebratory XP and Confetti
        window.EnglishBooster.addXP(100, "Today's Challenge Completed (+100 XP)!");
        
        // Update daily streak
        const user = window.EnglishBooster.currentUser || {};
        window.EnglishBooster.updateUserState({
          streakDays: (user.streakDays || 7) + 1,
          speakingMinutes: (user.speakingMinutes || 124) + Math.max(Math.round(this.secondsRecorded / 60), 1)
        });

        // Trigger Confetti
        window.EnglishBooster.launchConfetti(3500);
      });
    }
  }

  renderBadges() {
    const container = document.getElementById('badges-grid-container');
    if (!container) return;

    container.innerHTML = BADGES_DATABASE.map(b => `
      <div class="glass-card" style="padding: 20px; text-align: center; border-color: ${b.unlocked ? 'rgba(0,242,254,0.3)' : 'var(--glass-border)'}; opacity: ${b.unlocked ? '1' : '0.55'};">
        <div style="font-size: 2.4rem; margin-bottom: 8px; filter: ${b.unlocked ? 'none' : 'grayscale(100%)'};">${b.icon}</div>
        <h4 style="font-size: 1.05rem; margin-bottom: 4px;">${b.name}</h4>
        <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 10px;">${b.desc}</p>
        <span class="crystal-badge ${b.unlocked ? 'crystal-badge-emerald' : ''}" style="font-size: 0.75rem;">
          ${b.unlocked ? '✓ Unlocked' : '🔒 Locked'} · +${b.xp} XP
        </span>
      </div>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.challengesApp = new EnglishBoosterChallenges();
  window.challengesApp.init();
});
