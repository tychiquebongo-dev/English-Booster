/**
 * ENGLISH BOOSTER — INTERNATIONAL MATCHING ENGINE (js/matching.js)
 * Curated Global Conversation Partners, AI Match Score & Compatibility Matrix
 */

function resolveAvatar(imgPath) {
  if (!imgPath) return '';
  const inPages = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
  const clean = imgPath.replace(/^(\.\.\/)+/, '');
  return inPages ? '../' + clean : clean;
}

const PARTNERS_DATABASE = [
  {
    id: 'sofia_es',
    name: 'Sofia Martínez',
    country: 'Spain',
    flag: '🇪🇸',
    avatarText: 'SM',
    avatarImg: 'assets/avatars/sofia.jpg',
    level: 'B1',
    levelTitle: 'Intermediate',
    nativeLang: 'Spanish',
    targetLang: 'English',
    goal: 'Improve Speaking',
    interests: ['Travel', 'Music', 'Movies', 'Photography'],
    isOnline: true,
    rating: 4.9,
    conversationsCount: 84,
    availability: 'Evenings & Weekends',
    bio: "¡Hola! I work in marketing and need English for international clients. Love talking about world cultures, music and movies!",
    matchScore: 98,
    matchReasons: [
      'Same learning goal: Improve Speaking',
      'Similar English level: B1 Intermediate',
      'Shared interests: Travel, Music, Movies',
      'High compatibility availability'
    ]
  },
  {
    id: 'kenji_jp',
    name: 'Kenji Sato',
    country: 'Japan',
    flag: '🇯🇵',
    avatarText: 'KS',
    avatarImg: 'assets/avatars/kenji.jpg',
    level: 'B2',
    levelTitle: 'Upper Intermediate',
    nativeLang: 'Japanese',
    targetLang: 'English',
    goal: 'Career',
    interests: ['Tech', 'Coding', 'Anime', 'Gaming'],
    isOnline: true,
    rating: 4.8,
    conversationsCount: 112,
    availability: 'Mornings & Weekends',
    bio: "Software developer from Tokyo. I can understand English docs well, but want to become fluent in spoken communication!",
    matchScore: 94,
    matchReasons: [
      'Compatible English level: B2',
      'Shared interest: Technology & Media',
      'Active today in current timezone',
      'Consistent daily speaking streak'
    ]
  },
  {
    id: 'amara_ng',
    name: 'Amara Okafor',
    country: 'Nigeria',
    flag: '🇳🇬',
    avatarText: 'AO',
    avatarImg: 'assets/avatars/amara.jpg',
    level: 'C1',
    levelTitle: 'Advanced',
    nativeLang: 'Igbo & English',
    targetLang: 'Advanced Business English',
    goal: 'Business',
    interests: ['Startups', 'Literature', 'Podcast', 'Debate'],
    isOnline: true,
    rating: 5.0,
    conversationsCount: 195,
    availability: 'Flexible all day',
    bio: "Product designer & writer from Lagos. Passionate about helping others overcome speaking anxiety and sharing cultural idioms!",
    matchScore: 96,
    matchReasons: [
      'High fluency partner for confident immersion',
      'Excellent pronunciation coach rating (5.0)',
      'Shared interest: Startups & Communication',
      'Online now and ready to practice'
    ]
  },
  {
    id: 'mateo_ar',
    name: 'Mateo Rossi',
    country: 'Argentina',
    flag: '🇦🇷',
    avatarText: 'MR',
    avatarImg: 'assets/avatars/alex.jpg',
    level: 'A2',
    levelTitle: 'Elementary',
    nativeLang: 'Spanish',
    targetLang: 'English',
    goal: 'Travel',
    interests: ['Football', 'Food', 'Travel', 'Nature'],
    isOnline: false,
    rating: 4.7,
    conversationsCount: 32,
    availability: 'Evenings',
    bio: "Chef from Buenos Aires planning a trip across Europe and Canada. Patient learner eager for friendly daily conversations.",
    matchScore: 88,
    matchReasons: [
      'Shared native language helps with quick explanations',
      'Shared interest: Food & Travel',
      'Relaxed, friendly conversation pace'
    ]
  },
  {
    id: 'lucas_de',
    name: 'Lucas Weber',
    country: 'Germany',
    flag: '🇩🇪',
    avatarText: 'LW',
    avatarImg: 'assets/avatars/lucas.jpg',
    level: 'B2',
    levelTitle: 'Upper Intermediate',
    nativeLang: 'German',
    targetLang: 'English',
    goal: 'Career',
    interests: ['Engineering', 'Automotive', 'Hiking', 'Science'],
    isOnline: true,
    rating: 4.9,
    conversationsCount: 78,
    availability: 'Lunch hours & Weekends',
    bio: "Mechanical engineer from Munich. Preparing for international assignments in the US. Let's discuss science, hobbies and daily life!",
    matchScore: 92,
    matchReasons: [
      'Similar CEFR level (B1-B2)',
      'Goal oriented practice',
      'High reliability score'
    ]
  },
  {
    id: 'chloe_fr',
    name: 'Chloé Laurent',
    country: 'France',
    flag: '🇫🇷',
    avatarText: 'CL',
    avatarImg: 'assets/avatars/chloe.jpg',
    level: 'B1',
    levelTitle: 'Intermediate',
    nativeLang: 'French',
    targetLang: 'English',
    goal: 'Exams',
    interests: ['Art', 'Design', 'Fashion', 'Cinema'],
    isOnline: true,
    rating: 4.8,
    conversationsCount: 64,
    availability: 'Evenings',
    bio: "Graphic designer living in Lyon preparing for IELTS. I get nervous when speaking English, looking for kind partner to practice without judgment.",
    matchScore: 95,
    matchReasons: [
      'Perfect match for B1 conversational comfort',
      'Shared interest: Art & Cinema',
      'Supports mutual grammar corrections'
    ]
  },
  {
    id: 'elena_it',
    name: 'Elena Conti',
    country: 'Italy',
    flag: '🇮🇹',
    avatarText: 'EC',
    avatarImg: 'assets/avatars/sofia.jpg',
    level: 'B2',
    levelTitle: 'Upper Intermediate',
    nativeLang: 'Italian',
    targetLang: 'English',
    goal: 'Social Communication',
    interests: ['Cooking', 'Travel', 'Languages', 'Yoga'],
    isOnline: false,
    rating: 4.9,
    conversationsCount: 140,
    availability: 'Mornings',
    bio: "Ciao! Language enthusiast from Florence. Fluent in Italian and conversational in Spanish, practicing English to make global friends.",
    matchScore: 91,
    matchReasons: [
      'Passionate language exchange partner',
      'High engagement and active feedback',
      'Shared interest: Travel & Culture'
    ]
  },
  {
    id: 'chen_sg',
    name: 'Chen Wei',
    country: 'Singapore',
    flag: '🇸🇬',
    avatarText: 'CW',
    avatarImg: 'assets/avatars/kenji.jpg',
    level: 'C2',
    levelTitle: 'Proficient',
    nativeLang: 'English & Mandarin',
    targetLang: 'Public Speaking',
    goal: 'Business',
    interests: ['Fintech', 'Economics', 'Badminton', 'Books'],
    isOnline: true,
    rating: 5.0,
    conversationsCount: 220,
    availability: 'Evenings',
    bio: "Finance consultant from Singapore. Happy to help intermediate speakers polish idioms, corporate tone, and natural pronunciation.",
    matchScore: 97,
    matchReasons: [
      'Native-level fluency guide',
      'Top rated mentor in English Booster community',
      'Expert in business vocabulary & phrasing'
    ]
  }
];

// Partner Matching Module
window.EnglishBoosterMatching = {
  partners: PARTNERS_DATABASE,

  init() {
    this.renderPartners(this.partners);
    this.initFilters();
    this.initPartnerModal();
  },

  renderPartners(list) {
    const container = document.getElementById('partners-container');
    if (!container) return;

    if (!list.length) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;" class="glass-card">
          <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
          <h3>No partners found</h3>
          <p style="color: var(--text-muted); margin-top: 6px;">Try adjusting your filters or search criteria to see more conversation partners.</p>
          <button class="btn btn-primary btn-sm" style="margin-top: 18px;" onclick="window.EnglishBoosterMatching.resetFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(p => `
      <div class="glass-card partner-card" data-partner-id="${p.id}">
        <div class="match-score-badge">
          ✨ ${p.matchScore}% Match
        </div>
        
        <div class="partner-card-header">
          <div class="partner-avatar">
            ${p.avatarImg ? `<img src="${resolveAvatar(p.avatarImg)}" alt="${p.name}" class="avatar-img" />` : p.avatarText}
            <span class="avatar-badge-flag">${p.flag}</span>
          </div>
          <div class="partner-info">
            <h4 class="partner-name">
              ${p.name}
            </h4>
            <div class="partner-country">${p.flag} ${p.country}</div>
          </div>
        </div>

        <div class="partner-meta-row">
          <div class="meta-item">
            <span class="meta-label">English Level</span>
            <span class="meta-val"><span class="badge-level level-${p.level.toLowerCase()}">${p.level}</span></span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Native</span>
            <span class="meta-val">${p.nativeLang}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Status</span>
            <span class="meta-val">
              <span class="status-indicator">
                <span class="status-dot ${p.isOnline ? 'online' : 'offline'}"></span>
                ${p.isOnline ? 'Online' : 'Offline'}
              </span>
            </span>
          </div>
        </div>

        <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin: 4px 0;">
          "${p.bio}"
        </p>

        <div class="interests-tags">
          ${p.interests.map(tag => `<span class="interest-tag">${tag}</span>`).join('')}
        </div>

        <div class="partner-card-footer">
          <a href="chat.html?partner=${p.id}" class="btn btn-primary btn-sm" style="flex: 1;">
            💬 Start Conversation
          </a>
          <button class="btn btn-secondary btn-sm btn-icon-only view-profile-btn" data-id="${p.id}" title="View Full Profile">
            👁️
          </button>
          <a href="call.html?partner=${p.id}" class="btn btn-secondary btn-sm btn-icon-only" title="Voice / Video Call">
            🎙️
          </a>
        </div>
      </div>
    `).join('');

    // Attach profile modal listeners
    container.querySelectorAll('.view-profile-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        this.openPartnerModal(id);
      });
    });
  },

  initFilters() {
    const levelSelect = document.getElementById('filter-level');
    const countryInput = document.getElementById('filter-country');
    const onlineCheckbox = document.getElementById('filter-online');
    const goalSelect = document.getElementById('filter-goal');
    const searchInput = document.getElementById('filter-search');

    const apply = () => {
      const level = levelSelect?.value || 'all';
      const country = countryInput?.value.trim().toLowerCase() || '';
      const onlineOnly = onlineCheckbox?.checked || false;
      const goal = goalSelect?.value || 'all';
      const search = searchInput?.value.trim().toLowerCase() || '';

      const filtered = this.partners.filter(p => {
        if (level !== 'all' && p.level !== level) return false;
        if (country && !p.country.toLowerCase().includes(country)) return false;
        if (onlineOnly && !p.isOnline) return false;
        if (goal !== 'all' && p.goal !== goal) return false;
        if (search && !p.name.toLowerCase().includes(search) && !p.interests.some(i => i.toLowerCase().includes(search))) {
          return false;
        }
        return true;
      });

      this.renderPartners(filtered);
    };

    [levelSelect, countryInput, onlineCheckbox, goalSelect, searchInput].forEach(el => {
      if (el) {
        el.addEventListener('input', apply);
        el.addEventListener('change', apply);
      }
    });
  },

  resetFilters() {
    document.querySelectorAll('#filter-level, #filter-goal').forEach(el => el.value = 'all');
    document.querySelectorAll('#filter-country, #filter-search').forEach(el => el.value = '');
    const online = document.getElementById('filter-online');
    if (online) online.checked = false;
    this.renderPartners(this.partners);
  },

  initPartnerModal() {
    let modal = document.getElementById('partner-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'partner-modal';
      modal.style.cssText = `
        position: fixed; inset: 0; background: rgba(6, 10, 20, 0.85); backdrop-filter: blur(14px);
        display: none; align-items: center; justify-content: center; z-index: 2000; padding: 20px;
      `;
      modal.innerHTML = `
        <div class="glass-card" style="width: 100%; max-width: 540px; padding: 32px; position: relative;">
          <button id="close-partner-modal" style="position: absolute; top: 20px; right: 20px; font-size: 1.5rem; color: var(--text-muted);">&times;</button>
          <div id="partner-modal-body"></div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#close-partner-modal').addEventListener('click', () => {
        modal.style.display = 'none';
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
      });
    }
  },

  openPartnerModal(id) {
    const partner = this.partners.find(p => p.id === id);
    if (!partner) return;

    const modal = document.getElementById('partner-modal');
    const body = document.getElementById('partner-modal-body');

    body.innerHTML = `
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
        <div class="partner-avatar" style="width: 72px; height: 72px;">
          ${partner.avatarImg ? `<img src="${resolveAvatar(partner.avatarImg)}" alt="${partner.name}" class="avatar-img" />` : partner.avatarText}
          <span class="avatar-badge-flag" style="font-size: 1.4rem;">${partner.flag}</span>
        </div>
        <div>
          <h3 style="font-size: 1.4rem;">${partner.name}</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem;">${partner.flag} ${partner.country} · Native: <strong>${partner.nativeLang}</strong></p>
        </div>
      </div>

      <div style="background: rgba(74, 222, 128, 0.08); border: 1px solid rgba(74, 222, 128, 0.25); border-radius: var(--radius-md); padding: 16px; margin-bottom: 20px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <strong style="color: var(--cyan-primary);">✨ AI Match Score: ${partner.matchScore}%</strong>
          <span class="badge-level level-${partner.level.toLowerCase()}">${partner.level}</span>
        </div>
        <ul style="padding-left: 20px; font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">
          ${partner.matchReasons.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>

      <div style="margin-bottom: 20px;">
        <h5 style="margin-bottom: 6px; font-size: 0.95rem;">About</h5>
        <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6;">${partner.bio}</p>
      </div>

      <div style="margin-bottom: 24px;">
        <h5 style="margin-bottom: 8px; font-size: 0.95rem;">Interests & Conversation Topics</h5>
        <div class="interests-tags">
          ${partner.interests.map(i => `<span class="interest-tag">${i}</span>`).join('')}
        </div>
      </div>

      <div style="display: flex; gap: 12px;">
        <a href="chat.html?partner=${partner.id}" class="btn btn-primary" style="flex: 1;">
          💬 Chat with ${partner.name.split(' ')[0]}
        </a>
        <a href="call.html?partner=${partner.id}" class="btn btn-secondary">
          🎙️ Live Call
        </a>
      </div>
    `;

    modal.style.display = 'flex';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('partners-container')) {
    window.EnglishBoosterMatching.init();
  }
});
