/**
 * ENGLISH BOOSTER — WATCH VIDEOS & SHORTS ENGINE (js/watchShorts.js)
 * Permet aux membres inscrits de visionner et publier des vidéos au format Short (9:16)
 * Avec lecteur interactif, sous-titres en direct, likes, commentaires et persistance localStorage.
 */

(function () {
  'use strict';

  // Helper pour résoudre les chemins relatifs des assets selon la page active
  function getAssetPath(path) {
    if (!path) return '';
    const inPages = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
    const clean = path.replace(/^(\.\.\/)+/, '');
    return inPages ? '../' + clean : clean;
  }

  // Liste initiale des vidéos Shorts publiées par des membres inscrits
  const DEFAULT_SHORTS = [
    {
      id: 'short_1',
      author: {
        id: 'tychique_bongo',
        name: 'Tychique Bongo',
        flag: '🇨🇮',
        avatar: 'assets/images/tychique-bongo.jpg',
        level: 'C2',
        role: 'Fondateur & Lead Coach'
      },
      title: '5 Daily Habits to Speak English Fluently Without Fear 🚀',
      category: 'fluency',
      duration: '0:48',
      views: '14.2K',
      mediaUrl: 'assets/images/short-tychique-coach.jpg',
      likes: 1240,
      dislikes: 12,
      userReaction: null,
      captions: "If you want to become truly fluent, stop translating word for word in your head. Start shadowing native speakers for 10 minutes every single morning!",
      tags: ['#FluencyHabits', '#SpeakingConfidence', '#EnglishBooster'],
      date: 'Aujourd\'hui',
      comments: [
        {
          id: 'sc1_1',
          name: 'Alex Rivera',
          flag: '🇪🇸',
          avatar: 'assets/avatars/alex.jpg',
          text: 'This shadowing advice completely changed my speaking pace, thank you Coach Tychique!',
          time: 'Il y a 1h'
        },
        {
          id: 'sc1_2',
          name: 'Sofia Martínez',
          flag: '🇪🇸',
          avatar: 'assets/avatars/sofia.jpg',
          text: 'Consistency over perfection. Very inspiring short video!',
          time: 'Il y a 30m'
        }
      ]
    },
    {
      id: 'short_2',
      author: {
        id: 'sofia_es',
        name: 'Sofia Martínez',
        flag: '🇪🇸',
        avatar: 'assets/avatars/sofia.jpg',
        level: 'B1',
        role: 'Apprenante Passionnée'
      },
      title: 'Pronunciation Secret: The /θ/ vs /ð/ Sound Masterclass 👄',
      category: 'pronunciation',
      duration: '0:35',
      views: '9.8K',
      mediaUrl: 'assets/images/short-pronunciation-coach.jpg',
      likes: 876,
      dislikes: 8,
      userReaction: null,
      captions: "Notice the difference: 'Think', 'Thorough', 'Thought' use the voiceless TH. But 'This', 'That', 'These' use the voiced TH with your vocal cords vibrating!",
      tags: ['#Pronunciation', '#Phonetics', '#LearnEnglish'],
      date: 'Hier',
      comments: [
        {
          id: 'sc2_1',
          name: 'Lucas Weber',
          flag: '🇩🇪',
          avatar: 'assets/avatars/lucas.jpg',
          text: 'I used to confuse both all the time, your whiteboard demonstration is so clear!',
          time: 'Il y a 3h'
        }
      ]
    },
    {
      id: 'short_3',
      author: {
        id: 'kenji_jp',
        name: 'Kenji Sato',
        flag: '🇯🇵',
        avatar: 'assets/avatars/kenji.jpg',
        level: 'B2',
        role: 'Tech & Startups'
      },
      title: 'Tech Elevator Pitch Rehearsal: Revolutionizing AI Workflows ⚡',
      category: 'pitch',
      duration: '0:42',
      views: '11.5K',
      mediaUrl: 'assets/images/short-tech-pitch.jpg',
      likes: 954,
      dislikes: 15,
      userReaction: null,
      captions: "Hi everyone, I'm Kenji from Tokyo. Our AI platform optimizes distributed cloud microservices. Here is how I structure my 45-second pitch without any filler words!",
      tags: ['#ElevatorPitch', '#TechEnglish', '#SiliconValleyPrep'],
      date: 'Il y a 2 jours',
      comments: [
        {
          id: 'sc3_1',
          name: 'Amara Okafor',
          flag: '🇳🇬',
          avatar: 'assets/avatars/amara.jpg',
          text: 'Fantastic body language and eye contact with the lens Kenji!',
          time: 'Il y a 1 jour'
        }
      ]
    },
    {
      id: 'short_4',
      author: {
        id: 'amara_sn',
        name: 'Amara Okafor',
        flag: '🇳🇬',
        avatar: 'assets/avatars/amara.jpg',
        level: 'C1',
        role: 'Fluency Leader'
      },
      title: 'Stop Saying "I\'m Fine": 4 Real Business English Idioms! 🎯',
      category: 'idioms',
      duration: '0:38',
      views: '18.4K',
      mediaUrl: 'assets/images/short-idiom-debate.jpg',
      likes: 1890,
      dislikes: 19,
      userReaction: null,
      captions: "Today's top idiom: 'Bite the bullet' means facing a difficult situation with courage. Instead of 'I will just do it', say 'Let's bite the bullet and pitch the board today!'",
      tags: ['#BusinessIdioms', '#AdvancedEnglish', '#VocabularyBoost'],
      date: 'Il y a 3 jours',
      comments: [
        {
          id: 'sc4_1',
          name: 'Chloé Dubois',
          flag: '🇫🇷',
          avatar: 'assets/avatars/chloe.jpg',
          text: 'I used "bite the bullet" in my London meeting yesterday, my manager loved it!',
          time: 'Il y a 2 jours'
        }
      ]
    }
  ];

  let shortsData = [];
  let currentActiveShort = null;
  let isSpeechPlaying = false;
  let currentFilter = 'all';

  // Initialisation et chargement
  function loadShorts() {
    try {
      const stored = localStorage.getItem('eb_shorts_videos');
      if (stored) {
        shortsData = JSON.parse(stored);
      } else {
        shortsData = [...DEFAULT_SHORTS];
        saveShorts();
      }
    } catch (e) {
      shortsData = [...DEFAULT_SHORTS];
    }
  }

  function saveShorts() {
    try {
      localStorage.setItem('eb_shorts_videos', JSON.stringify(shortsData));
    } catch (e) {
      console.warn('Could not save shorts', e);
    }
  }

  // Récupérer les membres inscrits pour le formulaire de publication
  function getRegisteredMembers() {
    try {
      const stored = localStorage.getItem('eb_inscrits_list');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}

    return [
      { id: 'tychique_bongo', nom: 'Bongo', prenom: 'Tychique', nationalite: "Côte d'Ivoire", drapeau: '🇨🇮', level: 'C2', avatarImg: 'assets/images/tychique-bongo.jpg' },
      { id: 'alex_rivera', nom: 'Rivera', prenom: 'Alex', nationalite: 'Espagne', drapeau: '🇪🇸', level: 'B1', avatarImg: 'assets/avatars/alex.jpg' },
      { id: 'sofia_es', nom: 'Martínez', prenom: 'Sofia', nationalite: 'Espagne', drapeau: '🇪🇸', level: 'B1', avatarImg: 'assets/avatars/sofia.jpg' },
      { id: 'kenji_jp', nom: 'Sato', prenom: 'Kenji', nationalite: 'Japon', drapeau: '🇯🇵', level: 'B2', avatarImg: 'assets/avatars/kenji.jpg' },
      { id: 'amara_sn', nom: 'Okafor', prenom: 'Amara', nationalite: 'Nigéria', drapeau: '🇳🇬', level: 'C1', avatarImg: 'assets/avatars/amara.jpg' },
      { id: 'chloe_fr', nom: 'Dubois', prenom: 'Chloé', nationalite: 'France', drapeau: '🇫🇷', level: 'B2', avatarImg: 'assets/avatars/chloe.jpg' },
      { id: 'lucas_de', nom: 'Weber', prenom: 'Lucas', nationalite: 'Allemagne', drapeau: '🇩🇪', level: 'B2', avatarImg: 'assets/avatars/lucas.jpg' }
    ];
  }

  // Rendu de la grille des shorts
  function renderShortsGrid() {
    const containers = [
      document.getElementById('shorts-grid-container'),
      document.getElementById('home-shorts-carousel')
    ];

    containers.forEach(container => {
      if (!container) return;

      const filtered = shortsData.filter(s => {
        if (currentFilter === 'all') return true;
        return s.category === currentFilter;
      });

      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="glass-card" style="padding: 40px; text-align: center; grid-column: 1 / -1; width: 100%;">
            <div style="font-size: 2.5rem; margin-bottom: 12px;">🎬</div>
            <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Aucune vidéo Short dans cette catégorie</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 16px;">Soyez le premier membre inscrit à publier un Short ici !</p>
            <button type="button" class="btn btn-primary btn-sm btn-open-publish-short">
              <span>+</span> Publier une Vidéo Short
            </button>
          </div>
        `;
        return;
      }

      container.innerHTML = filtered.map(short => {
        const isLiked = short.userReaction === 'like';
        const avatarSrc = getAssetPath(short.author.avatar);
        const mediaSrc = getAssetPath(short.mediaUrl);

        return `
          <article class="short-card" data-short-id="${short.id}">
            <div class="short-video-frame">
              <img src="${mediaSrc}" alt="${escapeHTML(short.title)}" class="short-poster-img" loading="lazy" />
              <div class="short-gradient-overlay"></div>

              <!-- Top badges -->
              <div class="short-top-bar">
                <span class="short-duration-tag">⏱️ ${short.duration}</span>
                <span class="short-badge-live">⚡ SHORT</span>
              </div>

              <!-- Central Play Button -->
              <button type="button" class="btn-play-short-hero" data-short-id="${short.id}" aria-label="Lire la vidéo short ${escapeHTML(short.title)}">
                <span class="play-icon-triangle">▶</span>
              </button>

              <!-- Bottom Content Overlay -->
              <div class="short-info-overlay">
                <div class="short-author-row">
                  <div class="short-author-avatar-wrap">
                    <img src="${avatarSrc}" alt="${escapeHTML(short.author.name)}" class="short-author-avatar" />
                    <span class="short-author-flag">${short.author.flag}</span>
                  </div>
                  <div class="short-author-details">
                    <span class="short-author-name">${escapeHTML(short.author.name)}</span>
                    <span class="short-badge-level">${short.author.level}</span>
                  </div>
                </div>

                <h3 class="short-card-title">${escapeHTML(short.title)}</h3>

                <div class="short-meta-row">
                  <div class="short-stat-chip">👁️ ${short.views} vues</div>
                  <div class="short-stat-chip ${isLiked ? 'liked' : ''}">👍 ${short.likes}</div>
                  <div class="short-stat-chip">💬 ${short.comments.length}</div>
                </div>
              </div>
            </div>
          </article>
        `;
      }).join('');
    });

    // Mettre à jour les compteurs
    const countBadge = document.getElementById('shorts-total-count');
    if (countBadge) countBadge.textContent = shortsData.length;

    // Attacher les écouteurs sur les cartes et boutons play
    document.querySelectorAll('.short-card, .btn-play-short-hero').forEach(el => {
      el.addEventListener('click', e => {
        const id = el.getAttribute('data-short-id') || el.closest('[data-short-id]').getAttribute('data-short-id');
        if (id) openShortModal(id);
      });
    });

    // Attacher les boutons "+ Publier un Short"
    document.querySelectorAll('.btn-open-publish-short').forEach(btn => {
      btn.addEventListener('click', () => openPublishModal());
    });
  }

  // Ouvrir le lecteur modal immersif d'un Short
  function openShortModal(shortId) {
    const short = shortsData.find(s => s.id === shortId);
    if (!short) return;

    currentActiveShort = short;
    let modal = document.getElementById('shorts-viewer-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'shorts-viewer-modal';
      modal.className = 'shorts-modal-overlay';
      document.body.appendChild(modal);
    }

    const isLiked = short.userReaction === 'like';
    const isDisliked = short.userReaction === 'dislike';
    const avatarSrc = getAssetPath(short.author.avatar);
    const mediaSrc = getAssetPath(short.mediaUrl);

    modal.innerHTML = `
      <div class="shorts-modal-backdrop"></div>
      <div class="shorts-modal-dialog">
        <!-- Close button -->
        <button type="button" class="btn-close-shorts-modal" id="btn-close-viewer" aria-label="Fermer la vidéo">&times;</button>

        <div class="shorts-player-layout">
          <!-- Video Vertical Player (9:16) -->
          <div class="shorts-stage-column">
            <div class="shorts-screen">
              <img src="${mediaSrc}" alt="${escapeHTML(short.title)}" class="shorts-screen-bg" />
              <div class="shorts-screen-gradient"></div>

              <!-- Top Screen Bar -->
              <div class="shorts-screen-top">
                <div class="shorts-channel-chip">
                  <img src="${avatarSrc}" alt="${escapeHTML(short.author.name)}" class="channel-pic" />
                  <span class="channel-name">${escapeHTML(short.author.name)} ${short.author.flag}</span>
                  <span class="badge-level-pill">${short.author.level}</span>
                </div>
                <div class="shorts-sound-toggle" id="btn-toggle-sound" title="Activer / Désactiver la voix">
                  <span class="sound-icon">🔊</span>
                </div>
              </div>

              <!-- Live Captions Subtitle Box -->
              <div class="shorts-captions-box">
                <div class="captions-badge">🎙️ Transcription Audio en Direct</div>
                <p class="captions-text">"${escapeHTML(short.captions)}"</p>
              </div>

              <!-- Floating Controls: Play / Pause center -->
              <button type="button" class="btn-screen-play-pause" id="btn-screen-play-pause" aria-label="Play / Pause">
                <span class="play-state-symbol">⏸️</span>
              </button>

              <!-- Bottom Timeline Progress -->
              <div class="shorts-timeline-track">
                <div class="shorts-timeline-bar" id="shorts-timeline-bar"></div>
              </div>
            </div>
          </div>

          <!-- Interaction Side Panel -->
          <div class="shorts-side-column">
            <div class="shorts-side-header">
              <span class="crystal-badge">Vidéos Shorts · Membres Inscrits</span>
              <h2 class="viewer-short-title">${escapeHTML(short.title)}</h2>
              <div class="viewer-tags-row">
                ${(short.tags || []).map(t => `<span class="tag-pill">${escapeHTML(t)}</span>`).join(' ')}
              </div>
            </div>

            <!-- Social Action Buttons (Like, Dislike, Share) -->
            <div class="shorts-interaction-row">
              <button type="button" class="btn-short-action btn-short-like ${isLiked ? 'active' : ''}" id="viewer-btn-like">
                <span class="action-icon">👍</span>
                <span class="action-count" id="viewer-like-count">${short.likes}</span>
                <span class="action-label">J'aime</span>
              </button>

              <button type="button" class="btn-short-action btn-short-dislike ${isDisliked ? 'active' : ''}" id="viewer-btn-dislike">
                <span class="action-icon">👎</span>
                <span class="action-count" id="viewer-dislike-count">${short.dislikes}</span>
                <span class="action-label">Dislike</span>
              </button>

              <button type="button" class="btn-short-action" id="viewer-btn-share">
                <span class="action-icon">🔗</span>
                <span class="action-label">Partager</span>
              </button>
            </div>

            <!-- Comments Section -->
            <div class="shorts-comments-block">
              <div class="comments-block-header">
                <h3>Commentaires (<span id="viewer-comments-count">${short.comments.length}</span>)</h3>
              </div>

              <div class="shorts-comments-scroll" id="viewer-comments-list">
                ${short.comments.map(c => `
                  <div class="short-comment-item">
                    <img src="${getAssetPath(c.avatar)}" alt="${escapeHTML(c.name)}" class="comment-author-avatar" />
                    <div class="comment-bubble">
                      <div class="comment-top">
                        <strong>${escapeHTML(c.name)} ${c.flag || ''}</strong>
                        <span class="comment-time">${c.time}</span>
                      </div>
                      <p class="comment-message">${escapeHTML(c.text)}</p>
                    </div>
                  </div>
                `).join('')}
              </div>

              <!-- Add Comment Input -->
              <form class="shorts-add-comment-form" id="viewer-comment-form">
                <input type="text" id="viewer-comment-input" class="form-control" placeholder="Ajouter un commentaire ou un conseil d'anglais..." required />
                <button type="submit" class="btn btn-primary btn-sm">Envoyer</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Lancer la lecture de la synthèse vocale (captions)
    playSpeechCaptions(short.captions);

    // Timeline animation
    const timelineBar = modal.querySelector('#shorts-timeline-bar');
    if (timelineBar) {
      timelineBar.style.width = '0%';
      timelineBar.style.transition = 'width 25s linear';
      setTimeout(() => {
        timelineBar.style.width = '100%';
      }, 50);
    }

    // Événements du modal
    const closeBtn = modal.querySelector('#btn-close-viewer');
    const backdrop = modal.querySelector('.shorts-modal-backdrop');
    function closeModal() {
      stopSpeechCaptions();
      modal.style.display = 'none';
      document.body.style.overflow = '';
      currentActiveShort = null;
      renderShortsGrid();
    }
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    // Bouton Play / Pause
    const playPauseBtn = modal.querySelector('#btn-screen-play-pause');
    playPauseBtn.addEventListener('click', () => {
      if (isSpeechPlaying) {
        stopSpeechCaptions();
        playPauseBtn.querySelector('.play-state-symbol').textContent = '▶️';
      } else {
        playSpeechCaptions(short.captions);
        playPauseBtn.querySelector('.play-state-symbol').textContent = '⏸️';
      }
    });

    // Sound toggle
    const soundToggle = modal.querySelector('#btn-toggle-sound');
    soundToggle.addEventListener('click', () => {
      if (isSpeechPlaying) {
        stopSpeechCaptions();
        soundToggle.querySelector('.sound-icon').textContent = '🔇';
      } else {
        playSpeechCaptions(short.captions);
        soundToggle.querySelector('.sound-icon').textContent = '🔊';
      }
    });

    // Reactions Like / Dislike
    const likeBtn = modal.querySelector('#viewer-btn-like');
    const dislikeBtn = modal.querySelector('#viewer-btn-dislike');
    const likeCount = modal.querySelector('#viewer-like-count');
    const dislikeCount = modal.querySelector('#viewer-dislike-count');

    likeBtn.addEventListener('click', () => {
      handleShortReaction(short.id, 'like');
      likeBtn.classList.toggle('active', short.userReaction === 'like');
      dislikeBtn.classList.toggle('active', short.userReaction === 'dislike');
      likeCount.textContent = short.likes;
      dislikeCount.textContent = short.dislikes;
    });

    dislikeBtn.addEventListener('click', () => {
      handleShortReaction(short.id, 'dislike');
      likeBtn.classList.toggle('active', short.userReaction === 'like');
      dislikeBtn.classList.toggle('active', short.userReaction === 'dislike');
      likeCount.textContent = short.likes;
      dislikeCount.textContent = short.dislikes;
    });

    // Partager
    const shareBtn = modal.querySelector('#viewer-btn-share');
    shareBtn.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
      }
      if (window.showToast) {
        window.showToast('🔗 Lien du Short copié dans le presse-papier !', 'Partage English Booster', 'success');
      } else {
        alert('Lien copié !');
      }
    });

    // Nouveau commentaire
    const commentForm = modal.querySelector('#viewer-comment-form');
    commentForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = modal.querySelector('#viewer-comment-input');
      const text = input.value.trim();
      if (!text) return;

      const currentUserName = localStorage.getItem('eb_user_name') || 'Alex Rivera';
      const newComment = {
        id: 'sc_' + Date.now(),
        name: currentUserName,
        flag: '🇪🇸',
        avatar: 'assets/avatars/alex.jpg',
        text: text,
        time: 'À l\'instant'
      };

      short.comments.unshift(newComment);
      saveShorts();

      // Mettre à jour l'affichage
      const list = modal.querySelector('#viewer-comments-list');
      const countEl = modal.querySelector('#viewer-comments-count');
      countEl.textContent = short.comments.length;

      const itemHtml = `
        <div class="short-comment-item" style="animation: fadeIn 0.3s ease;">
          <img src="${getAssetPath(newComment.avatar)}" alt="${escapeHTML(newComment.name)}" class="comment-author-avatar" />
          <div class="comment-bubble">
            <div class="comment-top">
              <strong>${escapeHTML(newComment.name)} ${newComment.flag}</strong>
              <span class="comment-time">${newComment.time}</span>
            </div>
            <p class="comment-message">${escapeHTML(newComment.text)}</p>
          </div>
        </div>
      `;
      list.insertAdjacentHTML('afterbegin', itemHtml);
      input.value = '';

      if (window.SoundFX && typeof window.SoundFX.playSuccess === 'function') {
        window.SoundFX.playSuccess();
      }
    });
  }

  // Synthèse vocale de démonstration pour les sous-titres du Short
  function playSpeechCaptions(text) {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    utterance.onend = () => {
      isSpeechPlaying = false;
      const playState = document.querySelector('.play-state-symbol');
      if (playState) playState.textContent = '▶️';
    };

    isSpeechPlaying = true;
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeechCaptions() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    isSpeechPlaying = false;
  }

  // Gestion des réactions Like / Dislike
  function handleShortReaction(shortId, type) {
    const short = shortsData.find(s => s.id === shortId);
    if (!short) return;

    if (short.userReaction === type) {
      short.userReaction = null;
      if (type === 'like') short.likes = Math.max(0, short.likes - 1);
      else short.dislikes = Math.max(0, short.dislikes - 1);
    } else {
      if (short.userReaction === 'like' && type === 'dislike') short.likes = Math.max(0, short.likes - 1);
      if (short.userReaction === 'dislike' && type === 'like') short.dislikes = Math.max(0, short.dislikes - 1);

      short.userReaction = type;
      if (type === 'like') {
        short.likes += 1;
        if (window.showToast) window.showToast('❤️ Vous avez liké ce Short !', 'Watch Videos', 'success');
      } else {
        short.dislikes += 1;
      }
    }

    saveShorts();
  }

  // Formulaire Modal de Publication d'un Short par un Membre Inscrit
  function openPublishModal() {
    let modal = document.getElementById('modal-publish-short');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modal-publish-short';
      modal.className = 'shorts-modal-overlay';
      document.body.appendChild(modal);
    }

    const members = getRegisteredMembers();
    const membersOptions = members.map(m => `
      <option value="${m.id}" data-name="${m.prenom} ${m.nom}" data-flag="${m.drapeau || '🌍'}" data-level="${m.level || 'B1'}" data-avatar="${m.avatarImg || 'assets/avatars/alex.jpg'}">
        ${m.drapeau || '🌍'} ${m.prenom} ${m.nom} (${m.level || 'B1'} — ${m.nationalite || 'International'})
      </option>
    `).join('');

    modal.innerHTML = `
      <div class="shorts-modal-backdrop"></div>
      <div class="shorts-modal-dialog" style="max-width: 620px;">
        <button type="button" class="btn-close-shorts-modal" id="btn-close-publish">&times;</button>
        <div class="publish-short-card">
          <div style="margin-bottom: 20px;">
            <span class="crystal-badge">Espace Membres Inscrits</span>
            <h2 style="font-size: 1.6rem; margin-top: 8px;">🎬 Publier votre Vidéo Short en Anglais</h2>
            <p style="color: var(--text-muted); font-size: 0.92rem; margin-top: 4px;">
              Partagez votre prononciation, votre pitch ou votre conseil d'anglais au format vertical 9:16 avec toute la communauté.
            </p>
          </div>

          <form id="form-create-new-short">
            <!-- Profil Inscrit Auteur -->
            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" for="short-author-select">Sélectionnez votre compte de membre inscrit :</label>
              <select id="short-author-select" class="form-control" required style="padding: 10px 14px;">
                ${membersOptions}
              </select>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">
                ${(window.EnglishBooster?.i18n?.currentLang || localStorage.getItem('eb_language') || 'en') === 'fr' 
                  ? `Pas encore inscrit ? <a href="${getAssetPath('pages/inscrits.html')}" style="color: var(--green-400); text-decoration: underline;">Inscrivez-vous ici (NOM, Prénom, Email)</a>` 
                  : `Not registered yet? <a href="${getAssetPath('pages/inscrits.html')}" style="color: var(--green-400); text-decoration: underline;">Register here (Name, Firstname, Email)</a>`}
              </div>
            </div>

            <!-- Titre du Short -->
            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" for="short-title-input">Titre accrocheur du Short :</label>
              <input type="text" id="short-title-input" class="form-control" placeholder="ex: How to pronounce 'Schedule' in British vs American 🇬🇧🇺🇸" required />
            </div>

            <!-- Catégorie du Short -->
            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" for="short-category-select">Catégorie linguistique :</label>
              <select id="short-category-select" class="form-control" required style="padding: 10px 14px;">
                <option value="pronunciation">🎙️ Prononciation & Phonétique</option>
                <option value="pitch">💼 Elevator Pitch & Carrière Tech</option>
                <option value="idioms">🗣️ Idiomes & Expressions Courantes</option>
                <option value="fluency">⚡ Fluency & Automatismes d'Expression</option>
              </select>
            </div>

            <!-- Transcription / Sous-titres parlés -->
            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" for="short-captions-input">Sous-titres & Phrase prononcée en anglais (30 à 60s) :</label>
              <textarea id="short-captions-input" class="form-control" rows="3" placeholder="Écrivez le texte exact que vous prononcez en anglais pour que le lecteur de synthèse le vocalise..." required></textarea>
            </div>

            <!-- Choix du Visuel de Couverture Vertical 9:16 -->
            <div class="form-group" style="margin-bottom: 22px;">
              <label class="form-label">Fond de studio vidéo vertical (9:16) :</label>
              <div class="shorts-thumb-selector">
                <label class="thumb-radio-card active">
                  <input type="radio" name="short_thumb" value="assets/images/short-pronunciation-coach.jpg" checked style="display:none;" />
                  <img src="${getAssetPath('assets/images/short-pronunciation-coach.jpg')}" alt="Prononciation" />
                  <span>Studio Voix</span>
                </label>
                <label class="thumb-radio-card">
                  <input type="radio" name="short_thumb" value="assets/images/short-tech-pitch.jpg" style="display:none;" />
                  <img src="${getAssetPath('assets/images/short-tech-pitch.jpg')}" alt="Tech Pitch" />
                  <span>Tech Pitch</span>
                </label>
                <label class="thumb-radio-card">
                  <input type="radio" name="short_thumb" value="assets/images/short-idiom-debate.jpg" style="display:none;" />
                  <img src="${getAssetPath('assets/images/short-idiom-debate.jpg')}" alt="Idioms" />
                  <span>Idiomes</span>
                </label>
                <label class="thumb-radio-card">
                  <input type="radio" name="short_thumb" value="assets/images/short-tychique-coach.jpg" style="display:none;" />
                  <img src="${getAssetPath('assets/images/short-tychique-coach.jpg')}" alt="Coaching" />
                  <span>Masterclass</span>
                </label>
              </div>
            </div>

            <!-- Actions -->
            <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 10px;">
              <button type="button" class="btn btn-secondary" id="btn-cancel-publish">Annuler</button>
              <button type="submit" class="btn btn-primary" style="padding: 12px 26px; font-weight: 800;">
                <span>🚀</span> Publier mon Short (+50 XP)
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Fermeture
    const closeBtn = modal.querySelector('#btn-close-publish');
    const cancelBtn = modal.querySelector('#btn-cancel-publish');
    const backdrop = modal.querySelector('.shorts-modal-backdrop');
    function closePublish() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
    closeBtn.addEventListener('click', closePublish);
    cancelBtn.addEventListener('click', closePublish);
    backdrop.addEventListener('click', closePublish);

    // Sélection des vignettes
    modal.querySelectorAll('.thumb-radio-card').forEach(card => {
      card.addEventListener('click', () => {
        modal.querySelectorAll('.thumb-radio-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const r = card.querySelector('input');
        if (r) r.checked = true;
      });
    });

    // Soumission du formulaire
    const form = modal.querySelector('#form-create-new-short');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const authorSelect = modal.querySelector('#short-author-select');
      const selectedOption = authorSelect.options[authorSelect.selectedIndex];
      const title = modal.querySelector('#short-title-input').value.trim();
      const category = modal.querySelector('#short-category-select').value;
      const captions = modal.querySelector('#short-captions-input').value.trim();
      const thumbRadio = modal.querySelector('input[name="short_thumb"]:checked');
      const thumbUrl = thumbRadio ? thumbRadio.value : 'assets/images/short-pronunciation-coach.jpg';

      if (!title || !captions) return;

      const newShort = {
        id: 'short_' + Date.now(),
        author: {
          id: authorSelect.value,
          name: selectedOption.getAttribute('data-name') || 'Membre Inscrit',
          flag: selectedOption.getAttribute('data-flag') || '🌍',
          avatar: selectedOption.getAttribute('data-avatar') || 'assets/avatars/alex.jpg',
          level: selectedOption.getAttribute('data-level') || 'B1',
          role: 'Membre Inscrit'
        },
        title: title,
        category: category,
        duration: '0:35',
        views: '1',
        mediaUrl: thumbUrl,
        likes: 1,
        dislikes: 0,
        userReaction: 'like',
        captions: captions,
        tags: ['#NewShort', '#EnglishBooster', '#' + category],
        date: 'À l\'instant',
        comments: []
      };

      shortsData.unshift(newShort);
      saveShorts();

      if (window.SoundFX && typeof window.SoundFX.playSuccess === 'function') {
        window.SoundFX.playSuccess();
      }
      if (window.showToast) {
        window.showToast('🎉 Félicitations ! Votre vidéo Short est en ligne.', 'Watch Videos & Shorts', 'success', 3000);
      }

      closePublish();
      renderShortsGrid();

      // Ouvrir immédiatement le lecteur sur le nouveau Short
      setTimeout(() => {
        openShortModal(newShort.id);
      }, 400);
    });
  }

  // Filtrage par catégories
  function initCategoryFilters() {
    document.querySelectorAll('.short-filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.short-filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentFilter = chip.getAttribute('data-filter') || 'all';
        renderShortsGrid();
      });
    });
  }

  // Échapper HTML
  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // API Publique
  window.EB_WatchShorts = {
    init: function () {
      loadShorts();
      initCategoryFilters();
      renderShortsGrid();
    },
    openPublishModal: openPublishModal,
    openShortModal: openShortModal
  };

  // Initialisation automatique
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.EB_WatchShorts.init);
  } else {
    window.EB_WatchShorts.init();
  }
})();
