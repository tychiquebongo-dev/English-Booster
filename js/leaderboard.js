/**
 * ENGLISH BOOSTER — LEADERBOARD & GLOBAL CHAMPIONS (js/leaderboard.js)
 * Global, Weekly, Country, Friends Tabs, Podium Highlights & XP Rankings
 */

const LEADERBOARD_DATA = {
  global: [
    { rank: 1, name: 'Alex Johnson', flag: '🇬🇧', level: 'C1', streak: 48, xp: 12450, medal: '🥇' },
    { rank: 2, name: 'Maria Silva', flag: '🇧🇷', level: 'B2', streak: 36, xp: 11820, medal: '🥈' },
    { rank: 3, name: 'John Doe', flag: '🇺🇸', level: 'C2', streak: 30, xp: 10940, medal: '🥉' },
    { rank: 4, name: 'Tychique Bongo', flag: '🇨🇮', level: 'C2', streak: 45, xp: 9850, medal: '' },
    { rank: 5, name: 'Kenji Sato', flag: '🇯🇵', level: 'B2', streak: 22, xp: 8420, medal: '' },
    { rank: 6, name: 'Sofia Martínez', flag: '🇪🇸', level: 'B1', streak: 18, xp: 7650, medal: '' },
    { rank: 7, name: 'Lucas Weber', flag: '🇩🇪', level: 'B2', streak: 14, xp: 6890, medal: '' },
    { rank: 8, name: 'Amara Okafor', flag: '🇳🇬', level: 'C1', streak: 29, xp: 6240, medal: '' },
    { rank: 9, name: 'Chloé Laurent', flag: '🇫🇷', level: 'B1', streak: 12, xp: 5800, medal: '' },
    { rank: 10, name: 'Mateo Rossi', flag: '🇦🇷', level: 'A2', streak: 9, xp: 4950, medal: '' }
  ],
  weekly: [
    { rank: 1, name: 'Maria Silva', flag: '🇧🇷', level: 'B2', streak: 7, xp: 2150, medal: '🥇' },
    { rank: 2, name: 'Alex Rivera (You)', flag: '🇪🇸', level: 'B1', streak: 7, xp: 1950, medal: '🥈' },
    { rank: 3, name: 'Sofia Martínez', flag: '🇪🇸', level: 'B1', streak: 7, xp: 1820, medal: '🥉' },
    { rank: 4, name: 'Lucas Weber', flag: '🇩🇪', level: 'B2', streak: 5, xp: 1440, medal: '' },
    { rank: 5, name: 'Amara Okafor', flag: '🇳🇬', level: 'C1', streak: 6, xp: 1300, medal: '' }
  ],
  country: [
    { rank: 1, name: 'Sofia Martínez', flag: '🇪🇸', level: 'B1', streak: 18, xp: 7650, medal: '🥇' },
    { rank: 2, name: 'Alex Rivera (You)', flag: '🇪🇸', level: 'B1', streak: 7, xp: 2450, medal: '🥈' },
    { rank: 3, name: 'Carlos Gomez', flag: '🇪🇸', level: 'A2', streak: 5, xp: 1980, medal: '🥉' },
    { rank: 4, name: 'Lucia Fernandez', flag: '🇪🇸', level: 'B2', streak: 8, xp: 1720, medal: '' }
  ],
  friends: [
    { rank: 1, name: 'Sofia Martínez', flag: '🇪🇸', level: 'B1', streak: 18, xp: 7650, medal: '🥇' },
    { rank: 2, name: 'Alex Rivera (You)', flag: '🇪🇸', level: 'B1', streak: 7, xp: 2450, medal: '🥈' },
    { rank: 3, name: 'Kenji Sato', flag: '🇯🇵', level: 'B2', streak: 22, xp: 8420, medal: '🥉' }
  ]
};

class EnglishBoosterLeaderboard {
  constructor() {
    this.currentTab = 'global';
  }

  init() {
    this.renderLeaderboard('global');
    this.bindTabs();
  }

  bindTabs() {
    document.querySelectorAll('.leaderboard-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.leaderboard-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentTab = btn.getAttribute('data-tab');
        this.renderLeaderboard(this.currentTab);
        window.EnglishBooster.SoundFX.playClick();
      });
    });
  }

  renderLeaderboard(tabKey) {
    const list = LEADERBOARD_DATA[tabKey] || LEADERBOARD_DATA.global;
    const tableBody = document.getElementById('leaderboard-tbody');
    const podiumEl = document.getElementById('leaderboard-podium');

    // Render Podium (top 3)
    if (podiumEl && list.length >= 3) {
      const first = list[0];
      const second = list[1];
      const third = list[2];

      podiumEl.innerHTML = `
        <!-- 2nd Place -->
        <div class="glass-card" style="padding: 24px 16px; text-align: center; border-color: rgba(148, 163, 184, 0.4); flex: 1; max-width: 210px;">
          <div style="font-size: 1.8rem; margin-bottom: 6px;">🥈</div>
          <div class="partner-avatar" style="width: 64px; height: 64px; margin: 0 auto 10px; border-color: #94a3b8;">
            <img src="../assets/avatars/sofia.jpg" alt="${second.name}" class="avatar-img" />
            <span class="avatar-badge-flag">${second.flag}</span>
          </div>
          <div style="font-weight: 800; font-size: 1.05rem;">${second.name}</div>
          <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 2px;"><span class="badge-level level-${second.level.toLowerCase()}">${second.level}</span></div>
          <div style="margin-top: 10px; font-weight: 800; color: var(--cyan-primary); font-size: 1.1rem;">${second.xp.toLocaleString()} XP</div>
        </div>

        <!-- 1st Place (Crown Champion) -->
        <div class="glass-card" style="padding: 32px 18px; text-align: center; border-color: var(--cyan-primary); box-shadow: 0 0 35px rgba(74, 222, 128, 0.35); flex: 1.15; max-width: 230px; transform: translateY(-16px);">
          <div style="font-size: 2.2rem; margin-bottom: 6px;">👑 🥇</div>
          <div class="partner-avatar" style="width: 76px; height: 76px; margin: 0 auto 10px; border-color: var(--cyan-primary); box-shadow: 0 0 25px rgba(74, 222, 128, 0.45);">
            <img src="../assets/avatars/alex.jpg" alt="${first.name}" class="avatar-img" />
            <span class="avatar-badge-flag">${first.flag}</span>
          </div>
          <div style="font-weight: 800; font-size: 1.2rem;">${first.name}</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 2px;"><span class="badge-level level-${first.level.toLowerCase()}">${first.level}</span></div>
          <div style="margin-top: 12px; font-weight: 900; color: var(--cyan-primary); font-size: 1.35rem;">${first.xp.toLocaleString()} XP</div>
          <span class="crystal-badge" style="margin-top: 8px; font-size: 0.72rem;">🔥 ${first.streak} Day Streak</span>
        </div>

        <!-- 3rd Place -->
        <div class="glass-card" style="padding: 24px 16px; text-align: center; border-color: rgba(245, 158, 11, 0.4); flex: 1; max-width: 210px;">
          <div style="font-size: 1.8rem; margin-bottom: 6px;">🥉</div>
          <div class="partner-avatar" style="width: 64px; height: 64px; margin: 0 auto 10px; border-color: #f59e0b;">
            <img src="../assets/avatars/lucas.jpg" alt="${third.name}" class="avatar-img" />
            <span class="avatar-badge-flag">${third.flag}</span>
          </div>
          <div style="font-weight: 800; font-size: 1.05rem;">${third.name}</div>
          <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 2px;"><span class="badge-level level-${third.level.toLowerCase()}">${third.level}</span></div>
          <div style="margin-top: 10px; font-weight: 800; color: var(--amber-accent); font-size: 1.1rem;">${third.xp.toLocaleString()} XP</div>
        </div>
      `;
    }

    // Render Table
    if (tableBody) {
      tableBody.innerHTML = list.map((item, index) => {
        const isUser = item.name.includes('(You)');
        return `
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.06); ${isUser ? 'background: rgba(74, 222, 128, 0.1); font-weight: 700;' : ''}">
            <td style="padding: 16px; font-weight: 800; font-size: 1.05rem;">
              ${item.medal || `#${index + 1}`}
            </td>
            <td style="padding: 16px; display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.2rem;">${item.flag}</span>
              <span>${item.name}</span>
            </td>
            <td style="padding: 16px;">
              <span class="badge-level level-${item.level.toLowerCase()}">${item.level}</span>
            </td>
            <td style="padding: 16px; color: var(--amber-accent);">
              🔥 ${item.streak} days
            </td>
            <td style="padding: 16px; text-align: right; font-weight: 800; color: var(--cyan-primary);">
              ⭐ ${item.xp.toLocaleString()} XP
            </td>
          </tr>
        `;
      }).join('');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('leaderboard-tbody') || document.getElementById('leaderboard-podium')) {
    window.leaderboardApp = new EnglishBoosterLeaderboard();
    window.leaderboardApp.init();
  }
});
