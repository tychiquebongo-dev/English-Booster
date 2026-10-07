/**
 * ENGLISH BOOSTER — DASHBOARD CONTROLLER (js/dashboard.js)
 * User Profile Metrics, Real-time Streak, XP Stats, Level Progress, & Weekly Chart
 */

document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
});

function initDashboard() {
  const user = window.EnglishBooster.currentUser || (window.EnglishBooster.initUserState ? window.EnglishBooster.initUserState() : {});

  // Update Greeting
  const greetingEl = document.getElementById('dash-greeting');
  if (greetingEl) {
    const hours = new Date().getHours();
    let timeGreeting = 'Good morning';
    if (hours >= 12 && hours < 18) timeGreeting = 'Good afternoon';
    if (hours >= 18) timeGreeting = 'Good evening';
    greetingEl.textContent = `${timeGreeting}, ${user.fullName ? user.fullName.split(' ')[0] : 'Learner'} 👋`;
  }

  const fullnameEl = document.getElementById('dash-user-fullname');
  if (fullnameEl && user.fullName) fullnameEl.textContent = user.fullName;
  const avatarImgEl = document.getElementById('dash-avatar-img');
  if (avatarImgEl && user.avatar) {
    const cleanAvatar = user.avatar.startsWith('data:') ? user.avatar : (window.location.pathname.includes('/pages/') ? '../' : '') + user.avatar.replace(/^(\.\.\/)+/, '');
    avatarImgEl.src = cleanAvatar;
  }

  // Update Core Metrics Cards
  const levelEl = document.getElementById('dash-level-text');
  const levelProgressEl = document.getElementById('dash-level-progress-bar');
  const levelProgressPercent = document.getElementById('dash-level-percent');
  const streakEl = document.getElementById('dash-streak-val');
  const speakingTimeEl = document.getElementById('dash-speaking-val');
  const xpEl = document.getElementById('dash-xp-val');

  if (levelEl) levelEl.textContent = `${user.englishLevel || 'B1'} — Intermediate`;
  if (levelProgressPercent) levelProgressPercent.textContent = `${user.levelProgress || 68}%`;
  if (levelProgressEl) {
    setTimeout(() => {
      levelProgressEl.style.width = `${user.levelProgress || 68}%`;
    }, 200);
  }

  if (streakEl) streakEl.textContent = `${user.streakDays || 7} Days`;
  if (speakingTimeEl) speakingTimeEl.textContent = `${user.speakingMinutes || 124} minutes`;
  if (xpEl) xpEl.textContent = `${(user.xp || 2450).toLocaleString()} XP`;

  // Render Dashboard Recommended Partners
  renderDashboardPartners();

  // Listen for user state updates
  window.addEventListener('userStateUpdated', (e) => {
    const updated = e.detail;
    if (streakEl) streakEl.textContent = `${updated.streakDays || 7} Days`;
    if (speakingTimeEl) speakingTimeEl.textContent = `${updated.speakingMinutes || 124} minutes`;
    if (xpEl) xpEl.textContent = `${(updated.xp || 2450).toLocaleString()} XP`;
  });
}

function renderDashboardPartners() {
  const container = document.getElementById('dash-recommended-partners');
  if (!container) return;

  const topPartners = [
    {
      id: 'sofia_es',
      name: 'Sofia Martínez',
      country: 'Spain',
      flag: '🇪🇸',
      avatarText: 'SM',
      avatarImg: '../assets/avatars/sofia.jpg',
      level: 'B1',
      interests: ['Travel', 'Music', 'Movies'],
      isOnline: true,
      bio: 'Enjoys casual travel chats and movie discussions.'
    },
    {
      id: 'kenji_jp',
      name: 'Kenji Sato',
      country: 'Japan',
      flag: '🇯🇵',
      avatarText: 'KS',
      avatarImg: '../assets/avatars/kenji.jpg',
      level: 'B2',
      interests: ['Tech', 'Coding', 'Anime'],
      isOnline: true,
      bio: 'Software engineer eager to practice spoken conversational fluency.'
    },
    {
      id: 'amara_ng',
      name: 'Amara Okafor',
      country: 'Nigeria',
      flag: '🇳🇬',
      avatarText: 'AO',
      avatarImg: '../assets/avatars/amara.jpg',
      level: 'C1',
      interests: ['Startups', 'Literature', 'Debate'],
      isOnline: true,
      bio: 'Passionate about idioms, cultural nuances and business vocabulary.'
    }
  ];

  container.innerHTML = topPartners.map(p => `
    <div class="glass-card partner-card">
      <div class="partner-card-header">
        <div class="partner-avatar">
          <img src="${p.avatarImg}" alt="${p.name}" class="avatar-img" />
          <span class="avatar-badge-flag">${p.flag}</span>
        </div>
        <div class="partner-info">
          <h4 class="partner-name">${p.name.split(' ')[0]}</h4>
          <div class="partner-country">${p.flag} ${p.country}</div>
        </div>
      </div>

      <div class="partner-meta-row">
        <div class="meta-item">
          <span class="meta-label">English Level</span>
          <span class="meta-val"><span class="badge-level level-${p.level.toLowerCase()}">${p.level}</span></span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Status</span>
          <span class="meta-val">
            <span class="status-indicator">
              <span class="status-dot online"></span>
              Online
            </span>
          </span>
        </div>
      </div>

      <div class="interests-tags">
        ${p.interests.map(i => `<span class="interest-tag">${i}</span>`).join('')}
      </div>

      <div class="partner-card-footer" style="margin-top: 12px;">
        <a href="chat.html?partner=${p.id}" class="btn btn-primary btn-sm" style="flex: 1;">
          Start Conversation
        </a>
      </div>
    </div>
  `).join('');
}
