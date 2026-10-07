/**
 * ENGLISH BOOSTER — ANNUAIRE DES MEMBRES INSCRITS (js/inscrits.js)
 * Affichage et gestion des inscrits : Nom, Prénom, Email, Nationalité & Liens d'action
 */

function resolveMemberAvatar(imgPath) {
  if (!imgPath) return '';
  const inPages = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
  const clean = imgPath.replace(/^(\.\.\/)+/, '');
  return inPages ? '../' + clean : clean;
}

const DEFAULT_REGISTERED_USERS = [
  {
    id: 'tychique_bongo',
    nom: 'Bongo',
    prenom: 'Tychique',
    email: 'tychiquebongo@gmail.com',
    nationalite: "Côte d'Ivoire",
    drapeau: '🇨🇮',
    level: 'C2',
    role: 'Fondateur & Lead Architect',
    isFounder: true,
    avatarImg: 'assets/images/tychique-bongo.jpg',
    conversationsCount: 340,
    dateInscription: '10 Jan 2026',
    online: true
  },
  {
    id: 'alex_rivera',
    nom: 'Rivera',
    prenom: 'Alex',
    email: 'alex.rivera@example.com',
    nationalite: 'Espagne',
    drapeau: '🇪🇸',
    level: 'B1',
    role: 'Apprenant Passionné',
    isFounder: false,
    avatarImg: 'assets/avatars/alex.jpg',
    conversationsCount: 92,
    dateInscription: '14 Fév 2026',
    online: true
  },
  {
    id: 'sofia_es',
    nom: 'Martínez',
    prenom: 'Sofia',
    email: 'sofia.martinez@example.es',
    nationalite: 'Espagne',
    drapeau: '🇪🇸',
    level: 'B1',
    role: 'Challenger Actif',
    isFounder: false,
    avatarImg: 'assets/avatars/sofia.jpg',
    conversationsCount: 114,
    dateInscription: '18 Fév 2026',
    online: true
  },
  {
    id: 'kenji_jp',
    nom: 'Sato',
    prenom: 'Kenji',
    email: 'kenji.sato@example.jp',
    nationalite: 'Japon',
    drapeau: '🇯🇵',
    level: 'B2',
    role: 'Tech & Professional English',
    isFounder: false,
    avatarImg: 'assets/avatars/kenji.jpg',
    conversationsCount: 128,
    dateInscription: '01 Mar 2026',
    online: true
  },
  {
    id: 'lucas_br',
    nom: 'Silva',
    prenom: 'Lucas',
    email: 'lucas.silva@example.br',
    nationalite: 'Brésil',
    drapeau: '🇧🇷',
    level: 'B1',
    role: 'Conversational Fluency',
    isFounder: false,
    avatarImg: 'assets/avatars/lucas.jpg',
    conversationsCount: 76,
    dateInscription: '05 Mar 2026',
    online: false
  },
  {
    id: 'chloe_fr',
    nom: 'Dubois',
    prenom: 'Chloe',
    email: 'chloe.dubois@example.fr',
    nationalite: 'France',
    drapeau: '🇫🇷',
    level: 'B2',
    role: 'Pronunciation Enthusiast',
    isFounder: false,
    avatarImg: 'assets/avatars/chloe.jpg',
    conversationsCount: 88,
    dateInscription: '12 Mar 2026',
    online: true
  },
  {
    id: 'amara_sn',
    nom: 'Traoré',
    prenom: 'Amara',
    email: 'amara.traore@example.sn',
    nationalite: 'Sénégal',
    drapeau: '🇸🇳',
    level: 'B1',
    role: 'Fluency Challenger',
    isFounder: false,
    avatarImg: 'assets/avatars/amara.jpg',
    conversationsCount: 65,
    dateInscription: '20 Mar 2026',
    online: true
  },
  {
    id: 'maya_sg',
    nom: 'Lin',
    prenom: 'Maya',
    email: 'maya.lin@example.sg',
    nationalite: 'Singapour',
    drapeau: '🇸🇬',
    level: 'B2',
    role: 'Business English Speaker',
    isFounder: false,
    avatarImg: 'assets/avatars/maya.jpg',
    conversationsCount: 142,
    dateInscription: '25 Mar 2026',
    online: true
  },
  {
    id: 'priya_in',
    nom: 'Patel',
    prenom: 'Priya',
    email: 'priya.patel@example.in',
    nationalite: 'Inde',
    drapeau: '🇮🇳',
    level: 'B2',
    role: 'Debate & Vocabulary Pro',
    isFounder: false,
    avatarImg: 'assets/avatars/priya.jpg',
    conversationsCount: 95,
    dateInscription: '28 Mar 2026',
    online: false
  },
  {
    id: 'david_de',
    nom: 'Müller',
    prenom: 'David',
    email: 'david.muller@example.de',
    nationalite: 'Allemagne',
    drapeau: '🇩🇪',
    level: 'C1',
    role: 'Advanced Grammar Speaker',
    isFounder: false,
    avatarImg: 'assets/avatars/david.jpg',
    conversationsCount: 160,
    dateInscription: '02 Avr 2026',
    online: true
  },
  {
    id: 'amira_eg',
    nom: 'Mansour',
    prenom: 'Amira',
    email: 'amira.mansour@example.eg',
    nationalite: 'Égypte',
    drapeau: '🇪🇬',
    level: 'B1',
    role: 'IELTS Preparation',
    isFounder: false,
    avatarImg: 'assets/avatars/amira.jpg',
    conversationsCount: 54,
    dateInscription: '08 Avr 2026',
    online: false
  },
  {
    id: 'liam_ie',
    nom: "O'Connor",
    prenom: 'Liam',
    email: 'liam.oconnor@example.ie',
    nationalite: 'Irlande',
    drapeau: '🇮🇪',
    level: 'C2',
    role: 'Native Speaking Coach',
    isFounder: false,
    avatarImg: 'assets/avatars/liam.jpg',
    conversationsCount: 220,
    dateInscription: '15 Avr 2026',
    online: true
  },
  {
    id: 'jean_marc_ci',
    nom: 'Kouassi',
    prenom: 'Jean-Marc',
    email: 'jm.kouassi@example.ci',
    nationalite: "Côte d'Ivoire",
    drapeau: '🇨🇮',
    level: 'B2',
    role: 'Ambassadeur Abidjan',
    isFounder: false,
    avatarImg: 'assets/avatars/alex.jpg',
    conversationsCount: 78,
    dateInscription: '22 Avr 2026',
    online: true
  }
];

class RegisteredMembersApp {
  constructor() {
    this.members = [];
    this.currentView = 'table'; // 'table' or 'cards'
  }

  init() {
    this.loadMembers();
    this.renderStats();
    this.renderMembers(this.members);
    this.bindSearchAndFilters();
    this.bindViewSwitcher();
    this.bindAddMemberModal();
    this.bindDirectRegistrationForm();
  }

  loadMembers() {
    const stored = localStorage.getItem('eb_registered_users');
    if (stored) {
      try {
        this.members = JSON.parse(stored);
      } catch (e) {
        this.members = DEFAULT_REGISTERED_USERS;
        localStorage.setItem('eb_registered_users', JSON.stringify(this.members));
      }
    } else {
      this.members = DEFAULT_REGISTERED_USERS;
      localStorage.setItem('eb_registered_users', JSON.stringify(this.members));
    }
  }

  saveMembers() {
    localStorage.setItem('eb_registered_users', JSON.stringify(this.members));
    this.renderStats();
    this.applyFilters();
  }

  renderStats() {
    const totalEl = document.getElementById('stat-total-inscrits');
    const countriesEl = document.getElementById('stat-total-countries');
    const onlineEl = document.getElementById('stat-total-online');

    if (totalEl) totalEl.textContent = this.members.length.toLocaleString();
    if (countriesEl) {
      const uniqueCountries = new Set(this.members.map(m => m.nationalite));
      countriesEl.textContent = uniqueCountries.size;
    }
    if (onlineEl) {
      const onlineCount = this.members.filter(m => m.online).length;
      onlineEl.textContent = onlineCount;
    }
  }

  renderMembers(list) {
    this.renderTable(list);
    this.renderCards(list);
  }

  renderTable(list) {
    const tbody = document.getElementById('inscrits-table-body');
    const countBadge = document.getElementById('inscrits-count-badge');
    if (countBadge) countBadge.textContent = `${list.length} membres inscrits`;
    if (!tbody) return;

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 40px; color: var(--text-muted);">
            <div style="font-size: 2rem; margin-bottom: 8px;">🔍</div>
            <p>Aucun membre inscrit trouvé avec ces critères.</p>
          </td>
        </tr>
      `;
      return;
    }

    const inPages = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
    const pathPrefix = inPages ? '' : 'pages/';

    tbody.innerHTML = list.map(m => {
      const avatarSrc = resolveMemberAvatar(m.avatarImg);
      const isFounder = m.isFounder;

      return `
        <tr class="${isFounder ? 'founder-row' : ''}">
          <!-- Photo & Statut -->
          <td>
            <div style="display: flex; align-items: center; gap: 12px;">
              <div class="partner-avatar" style="width: 44px; height: 44px; border-color: ${isFounder ? 'var(--green-400)' : 'var(--glass-border)'};">
                <img src="${avatarSrc}" alt="${m.prenom} ${m.nom}" class="avatar-img" />
                <span class="avatar-badge-flag" style="font-size: 1rem;">${m.drapeau}</span>
              </div>
              <div>
                <span class="status-indicator">
                  <span class="status-dot ${m.online ? 'online' : 'offline'}"></span>
                  <span style="font-size: 0.76rem; color: var(--text-subtle);">${m.online ? 'En ligne' : 'Hors-ligne'}</span>
                </span>
                ${isFounder ? '<span class="crystal-badge" style="font-size: 0.65rem; padding: 1px 6px; margin-left: 6px;">Fondateur</span>' : ''}
              </div>
            </div>
          </td>

          <!-- Nom de famille -->
          <td>
            <strong style="font-size: 1rem; color: #ffffff;">${m.nom}</strong>
          </td>

          <!-- Prénom -->
          <td>
            <span style="font-size: 0.95rem; color: var(--text-main); font-weight: 600;">${m.prenom}</span>
          </td>

          <!-- Email -->
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <a href="mailto:${m.email}" class="email-badge-link" title="Envoyer un email à ${m.prenom}">
                ✉️ <span>${m.email}</span>
              </a>
              <button type="button" class="btn-action-icon copy-btn" data-email="${m.email}" title="Copier l'adresse email">
                📋
              </button>
            </div>
          </td>

          <!-- Nationalité -->
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 1.3rem;">${m.drapeau}</span>
              <span style="font-weight: 600;">${m.nationalite}</span>
            </div>
          </td>

          <!-- Niveau CECRL -->
          <td>
            <span class="badge-level level-${m.level.toLowerCase()}">Level ${m.level}</span>
          </td>

          <!-- Liens d'action directs -->
          <td>
            <div style="display: flex; align-items: center; gap: 6px;">
              <a href="${pathPrefix}call.html?partner=${m.id}" class="btn-action-icon call" title="Lancer un appel avec ${m.prenom}">
                📞
              </a>
              <a href="${pathPrefix}chat.html?partner=${m.id}" class="btn-action-icon chat" title="Ouvrir le chat avec ${m.prenom}">
                💬
              </a>
              <a href="${pathPrefix}challenges.html?arena=speed_duel&partner=${m.id}" class="btn-action-icon duel" title="Défier ${m.prenom} en duel vocal">
                ⚔️
              </a>
              <a href="mailto:${m.email}" class="btn-action-icon" title="Email direct">
                ✉️
              </a>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    this.bindCopyButtons();
  }

  renderCards(list) {
    const container = document.getElementById('inscrits-cards-container');
    if (!container) return;

    if (list.length === 0) {
      container.innerHTML = `
        <div class="glass-card" style="padding: 40px; text-align: center; grid-column: 1 / -1; color: var(--text-muted);">
          <div style="font-size: 2.2rem; margin-bottom: 10px;">🔍</div>
          <p>Aucun membre inscrit trouvé avec ces critères.</p>
        </div>
      `;
      return;
    }

    const inPages = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
    const pathPrefix = inPages ? '' : 'pages/';

    container.innerHTML = list.map(m => {
      const avatarSrc = resolveMemberAvatar(m.avatarImg);
      const isFounder = m.isFounder;

      return `
        <div class="glass-card inscrit-card" style="${isFounder ? 'border-color: var(--green-400); background: rgba(74, 222, 128, 0.05);' : ''}">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div class="partner-avatar" style="width: 60px; height: 60px; border-color: ${isFounder ? 'var(--green-400)' : 'var(--cyan-primary)'};">
              <img src="${avatarSrc}" alt="${m.prenom} ${m.nom}" class="avatar-img" />
              <span class="avatar-badge-flag">${m.drapeau}</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
              <span class="badge-level level-${m.level.toLowerCase()}">Level ${m.level}</span>
              <span class="status-indicator">
                <span class="status-dot ${m.online ? 'online' : 'offline'}"></span>
                <span style="font-size: 0.72rem; color: var(--text-subtle);">${m.online ? 'En ligne' : 'Hors-ligne'}</span>
              </span>
            </div>
          </div>

          <div>
            <h3 style="font-size: 1.25rem; margin-bottom: 2px;">
              ${m.prenom} <strong style="color: #ffffff;">${m.nom}</strong>
              ${isFounder ? ' ⭐' : ''}
            </h3>
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px;">
              ${m.drapeau} <strong>${m.nationalite}</strong> · ${m.role}
            </div>
            
            <!-- Email avec lien direct -->
            <div style="margin: 8px 0;">
              <a href="mailto:${m.email}" class="email-badge-link" style="width: 100%; justify-content: space-between;">
                <span>✉️ ${m.email}</span>
                <button type="button" class="copy-btn" data-email="${m.email}" style="border:none;background:transparent;cursor:pointer;color:inherit;" title="Copier">📋</button>
              </a>
            </div>
          </div>

          <!-- Barre de liens directs de l'inscrit -->
          <div style="margin-top: auto; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; gap: 8px;">
            <a href="${pathPrefix}call.html?partner=${m.id}" class="btn btn-primary btn-sm" style="flex: 1; justify-content: center; font-size: 0.8rem; padding: 6px 10px;">
              📞 Appeler
            </a>
            <a href="${pathPrefix}chat.html?partner=${m.id}" class="btn btn-secondary btn-sm" style="flex: 1; justify-content: center; font-size: 0.8rem; padding: 6px 10px;">
              💬 Chat
            </a>
            <a href="${pathPrefix}challenges.html?arena=speed_duel&partner=${m.id}" class="btn btn-secondary btn-sm" style="padding: 6px 10px;" title="Défier">
              ⚔️
            </a>
          </div>
        </div>
      `;
    }).join('');

    this.bindCopyButtons();
  }

  bindCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const email = btn.dataset.email;
        if (email) {
          navigator.clipboard.writeText(email).then(() => {
            window.EnglishBooster.SoundFX?.playClick();
            window.EnglishBooster.showToast('Email Copié !', `${email} dans le presse-papier.`, 'success');
          });
        }
      });
    });
  }

  bindSearchAndFilters() {
    const searchInput = document.getElementById('search-inscrits');
    const countrySelect = document.getElementById('filter-country');
    const levelSelect = document.getElementById('filter-level');

    const apply = () => {
      const q = (searchInput?.value || '').trim().toLowerCase();
      const country = countrySelect?.value || 'all';
      const level = levelSelect?.value || 'all';

      const filtered = this.members.filter(m => {
        // Search matches: Nom, Prénom, Email, Nationalité
        if (q) {
          const matchNom = m.nom.toLowerCase().includes(q);
          const matchPrenom = m.prenom.toLowerCase().includes(q);
          const matchEmail = m.email.toLowerCase().includes(q);
          const matchNat = m.nationalite.toLowerCase().includes(q);
          if (!matchNom && !matchPrenom && !matchEmail && !matchNat) return false;
        }

        if (country !== 'all' && m.nationalite !== country) return false;
        if (level !== 'all' && m.level !== level) return false;

        return true;
      });

      this.renderMembers(filtered);
    };

    searchInput?.addEventListener('input', apply);
    countrySelect?.addEventListener('change', apply);
    levelSelect?.addEventListener('change', apply);

    // Reset button
    document.getElementById('btn-reset-filters')?.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (countrySelect) countrySelect.value = 'all';
      if (levelSelect) levelSelect.value = 'all';
      this.renderMembers(this.members);
    });
  }

  bindViewSwitcher() {
    const btnTable = document.getElementById('btn-view-table');
    const btnCards = document.getElementById('btn-view-cards');
    const tableWrap = document.getElementById('inscrits-table-wrapper');
    const cardsWrap = document.getElementById('inscrits-cards-container');

    btnTable?.addEventListener('click', () => {
      this.currentView = 'table';
      btnTable.classList.add('active');
      btnCards?.classList.remove('active');
      if (tableWrap) tableWrap.style.display = 'block';
      if (cardsWrap) cardsWrap.style.display = 'none';
    });

    btnCards?.addEventListener('click', () => {
      this.currentView = 'cards';
      btnCards.classList.add('active');
      btnTable?.classList.remove('active');
      if (tableWrap) tableWrap.style.display = 'none';
      if (cardsWrap) cardsWrap.style.display = 'grid';
    });
  }

  bindAddMemberModal() {
    const openBtn = document.getElementById('btn-open-add-member');
    const modal = document.getElementById('modal-add-member');
    const closeBtn = document.getElementById('close-add-member-modal');
    const form = document.getElementById('form-add-member');

    openBtn?.addEventListener('click', () => {
      if (modal) modal.style.display = 'flex';
    });

    closeBtn?.addEventListener('click', () => {
      if (modal) modal.style.display = 'none';
    });

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const nom = document.getElementById('new-nom')?.value.trim();
      const prenom = document.getElementById('new-prenom')?.value.trim();
      const email = document.getElementById('new-email')?.value.trim();
      const countryData = document.getElementById('new-nationalite')?.value.split('|') || ['Côte d\'Ivoire', '🇨🇮'];
      const level = document.getElementById('new-level')?.value || 'B1';

      if (!nom || !prenom || !email) {
        window.EnglishBooster.showToast('Champs requis', 'Veuillez renseigner le nom, prénom et email.', 'error');
        return;
      }

      const newMember = {
        id: `user_${Date.now()}`,
        nom: nom,
        prenom: prenom,
        email: email,
        nationalite: countryData[0],
        drapeau: countryData[1] || '🌐',
        level: level,
        role: 'Nouvel Inscrit',
        isFounder: false,
        avatarImg: 'assets/avatars/alex.jpg',
        conversationsCount: 1,
        dateInscription: "Aujourd'hui",
        online: true
      };

      this.members.unshift(newMember);
      this.saveMembers();

      if (modal) modal.style.display = 'none';
      form.reset();

      window.EnglishBooster.SoundFX?.playSuccess();
      window.EnglishBooster.showToast('Membre Ajouté !', `${prenom} ${nom} (${email}) est maintenant enregistré.`, 'success');
    });
  }

  bindDirectRegistrationForm() {
    const directForm = document.getElementById('form-inscrire-direct');
    if (!directForm) return;

    directForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nomInput = document.getElementById('reg-nom');
      const prenomInput = document.getElementById('reg-prenom');
      const emailInput = document.getElementById('reg-email');
      const paysSelect = document.getElementById('reg-nationalite');

      const nom = nomInput?.value.trim();
      const prenom = prenomInput?.value.trim();
      const email = emailInput?.value.trim();
      const paysData = (paysSelect?.value || "Côte d'Ivoire|🇨🇮").split('|');

      if (!nom || !prenom || !email) {
        window.EnglishBooster.showToast('Champs requis', 'Veuillez renseigner votre NOM, Prénom et Adresse email.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        window.EnglishBooster.showToast('Email invalide', 'Veuillez saisir une adresse email valide (ex: nom@domaine.com).', 'error');
        return;
      }

      const chosenAvatar = document.getElementById('inscrits-avatar-picker-wrap-selected-val')?.value || 'assets/avatars/alex.jpg';

      const newMember = {
        id: `user_${Date.now()}`,
        nom: nom,
        prenom: prenom,
        email: email,
        nationalite: paysData[0],
        drapeau: paysData[1] || '🌐',
        level: 'B1',
        role: 'Membre Récemment Inscrit',
        isFounder: false,
        avatarImg: chosenAvatar,
        conversationsCount: 1,
        dateInscription: "Aujourd'hui",
        online: true
      };

      // Check if already in list
      const existingIdx = this.members.findIndex(m => m.email.toLowerCase() === email.toLowerCase());
      if (existingIdx !== -1) {
        this.members[existingIdx] = newMember;
      } else {
        this.members.unshift(newMember);
      }

      this.saveMembers();

      // Update current user state in app
      window.EnglishBooster.updateUserState({
        fullName: `${prenom} ${nom}`,
        email: email,
        avatar: chosenAvatar,
        country: `${paysData[0]} ${paysData[1]}`,
        isLoggedIn: true
      });

      if (window.EnglishBooster?.avatarManager) {
        window.EnglishBooster.avatarManager.setAvatar(chosenAvatar, false);
      }

      // Sound & Celebration
      window.EnglishBooster.SoundFX?.playSuccess();
      window.EnglishBooster.launchConfetti(3500);

      // Display animated confirmation banner
      const confirmBox = document.getElementById('reg-confirm-banner');
      if (confirmBox) {
        confirmBox.style.display = 'block';
        confirmBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const nameConfirm = document.getElementById('reg-confirm-name');
        const emailConfirm = document.getElementById('reg-confirm-email');
        if (nameConfirm) nameConfirm.textContent = `${prenom} ${nom}`;
        if (emailConfirm) emailConfirm.textContent = email;
      }

      window.EnglishBooster.showToast(
        'Inscription Validée ! 🎉',
        `Félicitations ${prenom} ${nom} ! Vous êtes désormais inscrit dans English Booster.`,
        'success',
        4500
      );

      directForm.reset();
    });
  }
}

// Global registry helper to register someone from outside
window.EnglishBoosterRegisterMember = function(user) {
  try {
    const raw = localStorage.getItem('eb_registered_users');
    const list = raw ? JSON.parse(raw) : DEFAULT_REGISTERED_USERS;

    // Check if already registered by email
    const exists = list.find(m => m.email.toLowerCase() === (user.email || '').toLowerCase());
    if (!exists && user.email) {
      // Split full name into nom and prenom
      const parts = (user.fullName || 'New Member').trim().split(' ');
      const prenom = parts[0];
      const nom = parts.slice(1).join(' ') || prenom;

      const flagMap = {
        'france': '🇫🇷', 'côte d\'ivoire': '🇨🇮', 'ivory coast': '🇨🇮',
        'spain': '🇪🇸', 'espagne': '🇪🇸', 'japan': '🇯🇵', 'japon': '🇯🇵',
        'brazil': '🇧🇷', 'brésil': '🇧🇷', 'senegal': '🇸🇳', 'sénégal': '🇸🇳',
        'singapore': '🇸🇬', 'india': '🇮🇳', 'inde': '🇮🇳', 'germany': '🇩🇪',
        'allemagne': '🇩🇪', 'egypt': '🇪🇬', 'égypte': '🇪🇬', 'ireland': '🇮🇪'
      };

      const cNorm = (user.country || '').toLowerCase();
      let flag = '🌐';
      for (const k in flagMap) {
        if (cNorm.includes(k)) { flag = flagMap[k]; break; }
      }

      list.unshift({
        id: `user_${Date.now()}`,
        nom: nom,
        prenom: prenom,
        email: user.email,
        nationalite: user.country || 'Global 🌐',
        drapeau: flag,
        level: user.englishLevel || 'B1',
        role: 'Membre Récemment Inscrit',
        isFounder: false,
        avatarImg: user.avatarImg || 'assets/avatars/alex.jpg',
        conversationsCount: 1,
        dateInscription: "Aujourd'hui",
        online: true
      });

      localStorage.setItem('eb_registered_users', JSON.stringify(list));
    }
  } catch (e) {}
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('inscrits-table-body')) {
    window.registeredMembersApp = new RegisteredMembersApp();
    window.registeredMembersApp.init();
  }
});
