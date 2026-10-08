/**
 * ENGLISH BOOSTER — WATCH VIDEOS, SHORTS ENGINE & LIVE VIDEO STUDIO (js/watchShorts.js)
 * Permet aux membres inscrits :
 * 1. De visionner des capsules vidéos au format vertical (9:16)
 * 2. De publier leur propre vidéo Short (upload MP4/WebM ou enregistrement caméra) avec règle stricte : 100% EN ANGLAIS UNIQUEMENT
 * 3. De lancer ou rejoindre une vidéo en DIRECT (Live Broadcast Studio avec webcam, micro, partage d'écran, chat et réactions)
 */

(function () {
  'use strict';

  // Helper pour résoudre les chemins relatifs des assets selon la page active
  function getAssetPath(path) {
    if (!path) return '';
    if (path.startsWith('data:') || path.startsWith('blob:') || path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
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
      mediaType: 'image',
      likes: 1240,
      dislikes: 12,
      userReaction: null,
      captions: "If you want to become truly fluent, stop translating word for word in your head. Start shadowing native speakers for 10 minutes every single morning!",
      tags: ['#FluencyHabits', '#SpeakingConfidence', '#EnglishBooster'],
      date: 'Aujourd\'hui',
      isEnglishOnly: true,
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
      mediaType: 'image',
      likes: 876,
      dislikes: 8,
      userReaction: null,
      captions: "Notice the difference: 'Think', 'Thorough', 'Thought' use the voiceless TH. But 'This', 'That', 'These' use the voiced TH with your vocal cords vibrating!",
      tags: ['#Pronunciation', '#Phonetics', '#LearnEnglish'],
      date: 'Hier',
      isEnglishOnly: true,
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
      mediaType: 'image',
      likes: 954,
      dislikes: 15,
      userReaction: null,
      captions: "Hi everyone, I'm Kenji from Tokyo. Our AI platform optimizes distributed cloud microservices. Here is how I structure my 45-second pitch without any filler words!",
      tags: ['#ElevatorPitch', '#TechEnglish', '#SiliconValleyPrep'],
      date: 'Il y a 2 jours',
      isEnglishOnly: true,
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
      mediaType: 'image',
      likes: 1890,
      dislikes: 19,
      userReaction: null,
      captions: "Today's top idiom: 'Bite the bullet' means facing a difficult situation with courage. Instead of 'I will just do it', say 'Let's bite the bullet and pitch the board today!'",
      tags: ['#BusinessIdioms', '#AdvancedEnglish', '#VocabularyBoost'],
      date: 'Il y a 3 jours',
      isEnglishOnly: true,
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

  // Liste initiale des vidéos en direct (Live Streams) actives
  const DEFAULT_LIVES = [
    {
      id: 'live_tychique_lead',
      host: {
        id: 'tychique_bongo',
        name: 'Tychique Bongo',
        flag: '🇨🇮',
        avatar: 'assets/images/tychique-bongo.jpg',
        level: 'C2',
        role: 'Fondateur & Lead Coach'
      },
      title: 'Live Fluency Masterclass: Stop Translating & Think in English 🚀',
      category: 'fluency',
      topic: 'Oral Spoken Confidence & Real-Time Corrections',
      viewers: 52,
      duration: '22:15',
      thumb: 'assets/images/tychique-bongo.jpg',
      comments: [
        { name: 'Sofia Martínez', flag: '🇪🇸', text: 'How do you overcome the hesitation before speaking?' },
        { name: 'Kenji Sato', flag: '🇯🇵', text: 'Shadowing 10 minutes a day changed everything for me!' },
        { name: 'Lucas Weber', flag: '🇩🇪', text: 'Great pronunciation drill coach!' }
      ]
    },
    {
      id: 'live_sofia_practice',
      host: {
        id: 'sofia_es',
        name: 'Sofia Martínez',
        flag: '🇪🇸',
        avatar: 'assets/avatars/sofia.jpg',
        level: 'B1',
        role: 'Apprenante Passionnée'
      },
      title: 'Live Speaking Rehearsal: Daily Conversation & Overcoming Fear 💬',
      category: 'pronunciation',
      topic: 'Everyday Fluency & Interactive English Q&A',
      viewers: 34,
      duration: '11:40',
      thumb: 'assets/avatars/sofia.jpg',
      comments: [
        { name: 'Amara Okafor', flag: '🇳🇬', text: 'Your accent improved so much Sofia, keep it up!' },
        { name: 'Chloé Dubois', flag: '🇫🇷', text: 'Loving this live English discussion!' }
      ]
    }
  ];

  let shortsData = [];
  let liveStreamsData = [];
  let currentActiveShort = null;
  let isSpeechPlaying = false;
  let currentFilter = 'all';

  // Live Studio State
  let activeLiveStreamSession = null;
  let liveMediaStream = null;
  let liveTimerInterval = null;
  let liveReactionInterval = null;
  let liveAudienceInterval = null;
  let isMicMuted = false;
  let isCamOff = false;

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

    try {
      const storedLives = localStorage.getItem('eb_live_streams');
      if (storedLives) {
        liveStreamsData = JSON.parse(storedLives);
      } else {
        liveStreamsData = [...DEFAULT_LIVES];
      }
    } catch (e) {
      liveStreamsData = [...DEFAULT_LIVES];
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

  // Vérificateur linguistique pour exiger STRICTEMENT l'anglais
  function checkEnglishCompliance(title, captions) {
    const text = ((title || '') + ' ' + (captions || '')).toLowerCase();
    if (!text.trim()) {
      return { status: 'neutral', valid: false, msg: '⚠️ Saisissez votre titre et transcription en anglais pour validation.' };
    }

    // Mots-clés français courants interdits
    const frenchStopwords = [
      'bonjour', 'salut', 'merci', 'avec', 'pour', 'dans', 'sur', 'sous', 'par', 'très', 'bien',
      'je', 'suis', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles', 'mon', 'ma', 'mes',
      'ton', 'ta', 'tes', 'notre', 'nos', 'votre', 'vos', 'leur', 'leurs', 'faire', 'fait',
      'parler', 'parlez', 'apprendre', 'cours', 'vidéo', 'vidéos', 'français', 'française',
      'cette', 'cet', 'ces', 'ceci', 'cela', 'pourquoi', 'comment', 'quand', 'combien', 'aussi',
      'mais', 'donc', 'alors', 'toujours', 'jamais', 'aujourd\'hui', 'voici', 'voilà'
    ];

    const detected = [];
    frenchStopwords.forEach(word => {
      const regex = new RegExp('\\b' + word + '\\b', 'i');
      if (regex.test(text)) detected.push(word);
    });

    if (detected.length > 0) {
      const sample = detected.slice(0, 3).join(', ');
      return {
        status: 'warning',
        valid: false,
        msg: `⚠️ Détection : Des termes en français ont été repérés ("${sample}"). Le Short doit être 100% EN ANGLAIS !`
      };
    }

    // Marqueurs d'anglais acceptés
    const englishMarkers = [
      'the', 'is', 'are', 'am', 'was', 'were', 'to', 'in', 'for', 'with', 'and', 'how', 'what',
      'why', 'speak', 'speaking', 'english', 'fluency', 'pitch', 'learn', 'accent', 'pronounce',
      'idiom', 'habit', 'practice', 'today', 'great', 'daily', 'without', 'about', 'your', 'my'
    ];

    let enScore = 0;
    englishMarkers.forEach(word => {
      const regex = new RegExp('\\b' + word + '\\b', 'i');
      if (regex.test(text)) enScore++;
    });

    if (enScore >= 1 || text.length > 15) {
      return {
        status: 'valid',
        valid: true,
        msg: '🇬🇧 Conforme : Anglais certifié à 100% (Accents internationaux bienvenus) ✅'
      };
    }

    return {
      status: 'neutral',
      valid: true,
      msg: '🇬🇧 Anglais requis : assurez-vous de rédiger votre contenu exclusivement en anglais.'
    };
  }

  // Rendu de la grille des directs vidéo (Live Streams)
  function renderLiveStreams() {
    const container = document.getElementById('live-streams-grid');
    if (!container) return;

    const cardsHtml = liveStreamsData.map(live => {
      const avatarSrc = getAssetPath(live.host.avatar);
      const thumbSrc = getAssetPath(live.thumb || live.host.avatar);

      return `
        <article class="live-stream-card" data-live-id="${live.id}">
          <div class="live-stream-thumb-wrap">
            <img src="${thumbSrc}" alt="${escapeHTML(live.title)}" class="live-stream-thumb-img" loading="lazy" />
            <div class="live-stream-pill-badge">
              <span class="live-pulse-dot" style="background:#fff; width:6px; height:6px;"></span>
              <span>🔴 EN DIRECT</span>
            </div>
            <div class="live-stream-viewers-badge">
              👁️ ${live.viewers} spectateurs
            </div>
          </div>

          <div class="live-stream-body">
            <div class="live-stream-host-info">
              <img src="${avatarSrc}" alt="${escapeHTML(live.host.name)}" class="live-stream-host-avatar" />
              <div>
                <strong style="color: #fff; font-size: 0.88rem;">${escapeHTML(live.host.name)} ${live.host.flag}</strong>
                <span class="short-badge-level" style="margin-left: 6px;">${live.host.level}</span>
              </div>
            </div>

            <h3 class="live-stream-title">${escapeHTML(live.title)}</h3>
            <div class="live-stream-category-tag">🎯 ${escapeHTML(live.topic || 'English Fluency')}</div>

            <button type="button" class="btn btn-sm btn-join-live" data-live-id="${live.id}" style="margin-top: auto; width: 100%; background: linear-gradient(135deg, #ef4444, #dc2626); color: #fff; border: none; font-weight: 700; padding: 10px; border-radius: var(--radius-md); box-shadow: 0 4px 14px rgba(239, 68, 68, 0.35);">
              <span>👀</span> Rejoindre le Direct en Anglais
            </button>
          </div>
        </article>
      `;
    }).join('');

    // Carte interactive CTA "Lancer votre Direct"
    const hostCtaCard = `
      <article class="live-stream-card" style="border: 2px dashed rgba(239, 68, 68, 0.6); background: rgba(239, 68, 68, 0.05); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px;">
        <div style="font-size: 2.8rem; margin-bottom: 12px; filter: drop-shadow(0 0 12px rgba(239,68,68,0.5));">🎥</div>
        <h3 style="font-size: 1.15rem; color: #fff; margin-bottom: 8px;">Animer Votre Propre Live</h3>
        <p style="color: var(--text-muted); font-size: 0.86rem; margin-bottom: 20px; line-height: 1.45;">
          Allumez votre caméra et votre micro. Entraînez votre anglais oral avec la communauté en direct !
        </p>
        <button type="button" class="btn btn-danger btn-open-live-studio" style="padding: 10px 20px; font-weight: 800; background: linear-gradient(135deg, #ef4444, #dc2626); border-color: #ef4444; box-shadow: 0 4px 16px rgba(239, 68, 68, 0.5);">
          <span>🔴</span> Lancer mon Direct Vidéo
        </button>
      </article>
    `;

    container.innerHTML = cardsHtml + hostCtaCard;

    // Attacher écouteurs pour rejoindre les directs
    container.querySelectorAll('.btn-join-live').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const liveId = btn.getAttribute('data-live-id');
        openLiveStudio(false, liveId);
      });
    });

    container.querySelectorAll('.live-stream-card[data-live-id]').forEach(card => {
      card.addEventListener('click', () => {
        const liveId = card.getAttribute('data-live-id');
        openLiveStudio(false, liveId);
      });
    });

    // Mettre à jour le compteur de lives actifs
    const liveCountBadge = document.getElementById('live-active-count');
    if (liveCountBadge) liveCountBadge.textContent = liveStreamsData.length;
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
        if (currentFilter === 'live') return false; // les lives sont affichés dans leur section dédiée
        return s.category === currentFilter;
      });

      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="glass-card" style="padding: 40px; text-align: center; grid-column: 1 / -1; width: 100%;">
            <div style="font-size: 2.5rem; margin-bottom: 12px;">🎬</div>
            <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Aucune vidéo Short dans cette catégorie</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 16px;">Soyez le premier membre inscrit à publier un Short ici !</p>
            <button type="button" class="btn btn-primary btn-sm btn-open-publish-short">
              <span>+</span> Publier une Vidéo Short (English Only)
            </button>
          </div>
        `;
        return;
      }

      container.innerHTML = filtered.map(short => {
        const isLiked = short.userReaction === 'like';
        const avatarSrc = getAssetPath(short.author.avatar);
        const mediaSrc = getAssetPath(short.mediaUrl);
        const isVideo = short.mediaType === 'video' || (short.videoUrl && short.videoUrl.length > 0);

        return `
          <article class="short-card" data-short-id="${short.id}">
            <div class="short-video-frame">
              ${isVideo 
                ? `<video src="${mediaSrc}" class="short-poster-img" muted playsinline loop preload="metadata"></video>` 
                : `<img src="${mediaSrc}" alt="${escapeHTML(short.title)}" class="short-poster-img" loading="lazy" />`}
              <div class="short-gradient-overlay"></div>

              <!-- Top badges -->
              <div class="short-top-bar">
                <span class="short-duration-tag">⏱️ ${short.duration}</span>
                <span class="short-badge-live" style="background: linear-gradient(135deg, #10b981, #06b6d4);">🇬🇧 EN 100%</span>
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

    // Attacher les boutons "🔴 Faire une Vidéo en Direct"
    document.querySelectorAll('.btn-open-live-studio').forEach(btn => {
      btn.addEventListener('click', () => openLiveStudio(true));
    });

    // Rendre aussi les lives
    renderLiveStreams();
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
    const isVideo = short.mediaType === 'video' || (short.videoUrl && short.videoUrl.length > 0);

    modal.innerHTML = `
      <div class="shorts-modal-backdrop"></div>
      <div class="shorts-modal-dialog">
        <!-- Close button -->
        <button type="button" class="btn-close-shorts-modal" id="btn-close-viewer" aria-label="Fermer la vidéo">&times;</button>

        <div class="shorts-player-layout">
          <!-- Video Vertical Player (9:16) -->
          <div class="shorts-stage-column">
            <div class="shorts-screen">
              ${isVideo 
                ? `<video src="${mediaSrc}" class="shorts-screen-bg" id="viewer-video-player" autoplay loop playsinline controls></video>` 
                : `<img src="${mediaSrc}" alt="${escapeHTML(short.title)}" class="shorts-screen-bg" />`}
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
                <div class="captions-badge">🎙️ Transcription Audio en Direct (English)</div>
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
              <div style="display:flex; align-items:center; gap:8px; margin-bottom: 8px;">
                <span class="crystal-badge">Short Vidéo · Membres Inscrits</span>
                <span class="crystal-badge crystal-badge-cyan">🇬🇧 100% English</span>
              </div>
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
                <input type="text" id="viewer-comment-input" class="form-control" placeholder="Ajouter un commentaire ou conseil en anglais..." required />
                <button type="submit" class="btn btn-primary btn-sm">Envoyer</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Lancer la lecture audio TTS uniquement si ce n'est pas déjà un fichier vidéo avec sa propre piste audio
    if (!isVideo) {
      playSpeechCaptions(short.captions);
    }

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
      const videoEl = modal.querySelector('#viewer-video-player');
      if (videoEl) videoEl.pause();
      modal.style.display = 'none';
      document.body.style.overflow = '';
      currentActiveShort = null;
    }
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    // Play / Pause toggle
    const playPauseBtn = modal.querySelector('#btn-screen-play-pause');
    const playStateSymbol = modal.querySelector('.play-state-symbol');
    playPauseBtn.addEventListener('click', () => {
      const videoEl = modal.querySelector('#viewer-video-player');
      if (videoEl) {
        if (videoEl.paused) {
          videoEl.play();
          playStateSymbol.textContent = '⏸️';
        } else {
          videoEl.pause();
          playStateSymbol.textContent = '▶️';
        }
      } else {
        if (isSpeechPlaying) {
          stopSpeechCaptions();
          playStateSymbol.textContent = '▶️';
        } else {
          playSpeechCaptions(short.captions);
          playStateSymbol.textContent = '⏸️';
        }
      }
    });

    // Sound toggle
    const soundToggle = modal.querySelector('#btn-toggle-sound');
    soundToggle.addEventListener('click', () => {
      const videoEl = modal.querySelector('#viewer-video-player');
      if (videoEl) {
        videoEl.muted = !videoEl.muted;
        soundToggle.querySelector('.sound-icon').textContent = videoEl.muted ? '🔇' : '🔊';
      } else {
        if (isSpeechPlaying) {
          stopSpeechCaptions();
          soundToggle.querySelector('.sound-icon').textContent = '🔇';
        } else {
          playSpeechCaptions(short.captions);
          soundToggle.querySelector('.sound-icon').textContent = '🔊';
        }
      }
    });

    // Like
    const likeBtn = modal.querySelector('#viewer-btn-like');
    likeBtn.addEventListener('click', () => {
      handleShortReaction(short.id, 'like');
      const updated = shortsData.find(s => s.id === short.id);
      modal.querySelector('#viewer-like-count').textContent = updated.likes;
      modal.querySelector('#viewer-dislike-count').textContent = updated.dislikes;
      likeBtn.classList.toggle('active', updated.userReaction === 'like');
      modal.querySelector('#viewer-btn-dislike').classList.toggle('active', updated.userReaction === 'dislike');
      renderShortsGrid();
    });

    // Dislike
    const dislikeBtn = modal.querySelector('#viewer-btn-dislike');
    dislikeBtn.addEventListener('click', () => {
      handleShortReaction(short.id, 'dislike');
      const updated = shortsData.find(s => s.id === short.id);
      modal.querySelector('#viewer-like-count').textContent = updated.likes;
      modal.querySelector('#viewer-dislike-count').textContent = updated.dislikes;
      dislikeBtn.classList.toggle('active', updated.userReaction === 'dislike');
      modal.querySelector('#viewer-btn-like').classList.toggle('active', updated.userReaction === 'like');
      renderShortsGrid();
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
        const isFr = (window.EnglishBooster?.i18n?.currentLang || localStorage.getItem('eb_language') || 'en') === 'fr';
        if (window.showToast) window.showToast('❤️ Vous avez liké ce Short !', isFr ? 'Regardez les vidéos' : 'Watch Videos', 'success');
      } else {
        short.dislikes += 1;
      }
    }

    saveShorts();
  }

  // ==========================================================================
  // FORMULAIRE DE PUBLICATION DE SHORT (CHOIX VIDÉO & 100% EN ANGLAIS)
  // ==========================================================================
  function openPublishModal() {
    let modal = document.getElementById('modal-publish-short');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modal-publish-short';
      modal.className = 'shorts-modal-overlay';
      document.body.appendChild(modal);
    }

    const members = getRegisteredMembers();
    const storedUser = localStorage.getItem('eb_user_name') || '';

    const membersOptions = members.map(m => {
      const isSelected = storedUser && (m.prenom.toLowerCase().includes(storedUser.toLowerCase()) || m.nom.toLowerCase().includes(storedUser.toLowerCase()));
      return `
        <option value="${m.id}" data-name="${m.prenom} ${m.nom}" data-flag="${m.drapeau || '🌍'}" data-level="${m.level || 'B1'}" data-avatar="${m.avatarImg || 'assets/avatars/alex.jpg'}" ${isSelected ? 'selected' : ''}>
          ${m.drapeau || '🌍'} ${m.prenom} ${m.nom} (${m.level || 'B1'} — ${m.nationalite || 'International'})
        </option>
      `;
    }).join('');

    modal.innerHTML = `
      <div class="shorts-modal-backdrop"></div>
      <div class="shorts-modal-dialog" style="max-width: 740px; max-height: 94vh; overflow-y: auto;">
        <button type="button" class="btn-close-shorts-modal" id="btn-close-publish">&times;</button>
        <div class="publish-short-card">
          <div style="margin-bottom: 18px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <span class="crystal-badge">Espace Membres Inscrits</span>
              <span class="crystal-badge" style="background: rgba(239, 68, 68, 0.2); border-color: #ef4444; color: #fca5a5; font-size: 0.72rem;">🇬🇧 Règle : 100% Anglais</span>
            </div>
            <h2 style="font-size: 1.6rem; margin: 4px 0;">🎬 Publier votre Vidéo Short</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 4px;">
              Choisissez votre vidéo et partagez votre prononciation ou votre pitch avec toute la communauté internationale.
            </p>
          </div>

          <!-- BANNIÈRE RÈGLE D'OR : 100% EN ANGLAIS -->
          <div class="english-rule-card">
            <span class="english-rule-badge">🇬🇧</span>
            <div>
              <strong style="color: #60a5fa; font-size: 0.9rem; display: block; margin-bottom: 2px;">
                RÈGLE STRICTE : VIDÉO & CONTENU 100% EN ANGLAIS
              </strong>
              <p style="color: var(--text-secondary); font-size: 0.82rem; margin: 0; line-height: 1.4;">
                Pour garantir l'immersion orale de tous les membres, chaque Short publié doit être <strong>entièrement parlé, titré et décrit en anglais</strong> (accents américain, britannique ou internationaux bienvenus). Tout contenu dans une autre langue sera rejeté par la modération.
              </p>
            </div>
          </div>

          <form id="form-create-new-short">
            <!-- 1. Profil Inscrit Auteur -->
            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" for="short-author-select" style="font-weight: 700;">Compte de membre inscrit :</label>
              <select id="short-author-select" class="form-control" required style="padding: 10px 14px;">
                ${membersOptions}
              </select>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">
                Pas encore inscrit ? <a href="${getAssetPath('pages/inscrits.html')}" style="color: var(--green-400); text-decoration: underline;">Inscrivez-vous gratuitement ici</a>
              </div>
            </div>

            <!-- 2. CHOIX DE LA VIDÉO (IMPORT FICHIER, CAMÉRA OU STUDIO) -->
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label" style="font-weight: 700;">
                Choisissez votre vidéo (Format vertical 9:16 recommandé) :
              </label>

              <!-- Onglets de sélection de méthode -->
              <div class="upload-method-tabs" role="tablist">
                <button type="button" class="upload-tab-btn active" data-tab="file" id="tab-btn-file">
                  <span>📁</span> Importer un fichier vidéo
                </button>
                <button type="button" class="upload-tab-btn" data-tab="camera" id="tab-btn-camera">
                  <span>🎥</span> Enregistrer avec ma caméra
                </button>
                <button type="button" class="upload-tab-btn" data-tab="studio" id="tab-btn-studio">
                  <span>🎨</span> Studio Virtuel HD
                </button>
              </div>

              <!-- CONTENU ONGLET 1 : IMPORT DE FICHIER VIDÉO -->
              <div class="tab-content-panel" id="panel-tab-file">
                <div class="video-dropzone" id="short-video-dropzone">
                  <input type="file" id="short-video-file-input" accept="video/mp4,video/webm,video/ogg,video/quicktime" style="display:none;" />
                  <div class="video-dropzone-icon">📥</div>
                  <strong style="color: #fff; font-size: 0.95rem; display: block; margin-bottom: 4px;">
                    Glissez votre fichier vidéo ici ou cliquez pour choisir
                  </strong>
                  <p style="color: var(--text-muted); font-size: 0.8rem; margin: 0;">
                    Formats acceptés : MP4, WebM, MOV • Max 60 secondes • Vidéo parlée en anglais
                  </p>
                </div>

                <!-- Aperçu vidéo après sélection de fichier -->
                <div class="video-preview-wrapper" id="file-video-preview-wrap" style="display: none;">
                  <video id="file-video-preview-player" class="video-preview-player" controls playsinline loop></video>
                  <div class="video-info-strip">
                    <span id="file-video-info-text">Vidéo sélectionnée</span>
                    <button type="button" id="btn-change-video-file" class="btn btn-sm btn-secondary" style="padding: 3px 8px; font-size: 0.75rem;">
                      🔄 Changer
                    </button>
                  </div>
                </div>
              </div>

              <!-- CONTENU ONGLET 2 : ENREGISTREMENT CAMÉRA DIRECT -->
              <div class="tab-content-panel" id="panel-tab-camera" style="display: none;">
                <div class="camera-recording-box">
                  <video id="short-camera-preview" class="camera-preview-feed" autoplay playsinline muted></video>
                  <div class="camera-recording-controls">
                    <button type="button" id="btn-start-record" class="btn btn-sm btn-danger" style="font-weight: 700;">
                      <span>🔴</span> Démarrer l'enregistrement (60s)
                    </button>
                    <button type="button" id="btn-stop-record" class="btn btn-sm btn-secondary" style="font-weight: 700; display:none;">
                      <span>⏹️</span> Arrêter & Valider
                    </button>
                    <span id="record-timer-text" style="font-family: var(--font-mono); color: #fff; font-size: 0.85rem; display:none;">00:00</span>
                  </div>
                </div>
              </div>

              <!-- CONTENU ONGLET 3 : STUDIO VIRTUEL PRÉDÉFINI -->
              <div class="tab-content-panel" id="panel-tab-studio" style="display: none;">
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
            </div>

            <!-- 3. Titre du Short (EN ANGLAIS) -->
            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" for="short-title-input" style="font-weight: 700;">
                Titre du Short <span style="color: var(--cyan-400);">(en anglais obligatoirement)</span> :
              </label>
              <input type="text" id="short-title-input" class="form-control" placeholder="ex: How to pronounce 'Schedule' in British vs American 🇬🇧🇺🇸" required />
            </div>

            <!-- 4. Catégorie du Short -->
            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" for="short-category-select" style="font-weight: 700;">Catégorie de pratique :</label>
              <select id="short-category-select" class="form-control" required style="padding: 10px 14px;">
                <option value="pronunciation">🎙️ Prononciation & Phonétique</option>
                <option value="pitch">💼 Elevator Pitch & Carrière Tech</option>
                <option value="idioms">🗣️ Idiomes & Expressions Courantes</option>
                <option value="fluency">⚡ Fluency & Automatismes d'Expression</option>
              </select>
            </div>

            <!-- 5. Transcription parlée en Anglais -->
            <div class="form-group" style="margin-bottom: 14px;">
              <label class="form-label" for="short-captions-input" style="font-weight: 700;">
                Transcription du discours en anglais (sous-titres) :
              </label>
              <textarea id="short-captions-input" class="form-control" rows="3" placeholder="Write down the exact spoken English sentences for live speech & subtitles..." required></textarea>
            </div>

            <!-- INDICATEUR DE CONFORMITÉ LINGUISTIQUE EN TEMPS RÉEL -->
            <div id="english-compliance-box" class="english-compliance-status neutral">
              <span>🇬🇧</span>
              <span id="english-compliance-text">Saisissez votre titre et transcription pour vérifier la conformité anglaise.</span>
            </div>

            <!-- 6. CERTIFICATION SOLENNELLE OBLIGATOIRE -->
            <div style="margin: 18px 0; padding: 12px 14px; background: rgba(0,0,0,0.3); border-radius: var(--radius-md); border: 1px solid var(--glass-border);">
              <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; font-size: 0.85rem; color: #fff;">
                <input type="checkbox" id="short-english-certify" required style="margin-top: 3px; accent-color: var(--green-400);" />
                <span>
                  <strong>Je certifie sur l'honneur que cette vidéo est enregistrée et prononcée exclusivement en ANGLAIS.</strong> 
                  Je comprends que toute vidéo dans une autre langue sera automatiquement retirée.
                </span>
              </label>
            </div>

            <!-- Actions -->
            <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 14px;">
              <button type="button" class="btn btn-secondary" id="btn-cancel-publish">Annuler</button>
              <button type="submit" class="btn btn-primary" id="btn-submit-short" style="padding: 12px 26px; font-weight: 800;">
                <span>🚀</span> Publier mon Short (+50 XP)
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Variables pour l'upload et l'enregistrement
    let selectedVideoBlobUrl = null;
    let selectedVideoType = 'studio'; // 'file', 'camera', 'studio'
    let mediaRecorder = null;
    let recordedChunks = [];
    let cameraStream = null;
    let recordTimerInterval = null;

    // Fermeture du modal
    const closeBtn = modal.querySelector('#btn-close-publish');
    const cancelBtn = modal.querySelector('#btn-cancel-publish');
    const backdrop = modal.querySelector('.shorts-modal-backdrop');
    function closePublish() {
      if (cameraStream) {
        cameraStream.getTracks().forEach(t => t.stop());
        cameraStream = null;
      }
      if (recordTimerInterval) clearInterval(recordTimerInterval);
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
    closeBtn.addEventListener('click', closePublish);
    cancelBtn.addEventListener('click', closePublish);
    backdrop.addEventListener('click', closePublish);

    // Gestion des onglets de choix vidéo
    const tabButtons = modal.querySelectorAll('.upload-tab-btn');
    const tabPanels = {
      file: modal.querySelector('#panel-tab-file'),
      camera: modal.querySelector('#panel-tab-camera'),
      studio: modal.querySelector('#panel-tab-studio')
    };

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.getAttribute('data-tab');
        selectedVideoType = tab;

        Object.keys(tabPanels).forEach(k => {
          if (tabPanels[k]) tabPanels[k].style.display = (k === tab) ? 'block' : 'none';
        });

        // Activer la caméra si on bascule sur l'onglet caméra
        if (tab === 'camera' && !cameraStream) {
          initCameraPreview();
        } else if (tab !== 'camera' && cameraStream) {
          cameraStream.getTracks().forEach(t => t.stop());
          cameraStream = null;
        }
      });
    });

    // 1. Gestion de l'import de fichier vidéo
    const dropzone = modal.querySelector('#short-video-dropzone');
    const fileInput = modal.querySelector('#short-video-file-input');
    const previewWrap = modal.querySelector('#file-video-preview-wrap');
    const previewPlayer = modal.querySelector('#file-video-preview-player');
    const videoInfoText = modal.querySelector('#file-video-info-text');
    const changeVideoBtn = modal.querySelector('#btn-change-video-file');

    dropzone.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('dragover', e => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
    dropzone.addEventListener('drop', e => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleVideoFile(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files.length > 0) {
        handleVideoFile(fileInput.files[0]);
      }
    });

    changeVideoBtn.addEventListener('click', () => {
      fileInput.click();
    });

    function handleVideoFile(file) {
      if (!file.type.startsWith('video/')) {
        alert('Veuillez sélectionner un fichier vidéo valide (MP4, WebM, MOV).');
        return;
      }
      const url = URL.createObjectURL(file);
      selectedVideoBlobUrl = url;
      selectedVideoType = 'file';

      previewPlayer.src = url;
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      videoInfoText.textContent = `🎬 ${file.name} (${sizeMb} Mo) • Prêt pour publication`;
      dropzone.style.display = 'none';
      previewWrap.style.display = 'flex';
      previewPlayer.play().catch(() => {});
    }

    // 2. Gestion de l'enregistrement Caméra
    async function initCameraPreview() {
      const cameraFeed = modal.querySelector('#short-camera-preview');
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Caméra non disponible sur ce navigateur');
        }
        cameraStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: true
        });
        cameraFeed.srcObject = cameraStream;
      } catch (err) {
        console.warn('Camera error in short composer', err);
        cameraFeed.poster = getAssetPath('assets/images/short-pronunciation-coach.jpg');
      }
    }

    const startRecordBtn = modal.querySelector('#btn-start-record');
    const stopRecordBtn = modal.querySelector('#btn-stop-record');
    const timerText = modal.querySelector('#record-timer-text');

    startRecordBtn.addEventListener('click', () => {
      if (!cameraStream) {
        alert('Caméra non accessible. Veuillez utiliser l\'import de fichier ou le studio virtuel.');
        return;
      }
      try {
        recordedChunks = [];
        mediaRecorder = new MediaRecorder(cameraStream);
        mediaRecorder.ondataavailable = e => {
          if (e.data.size > 0) recordedChunks.push(e.data);
        };
        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunks, { type: 'video/webm' });
          selectedVideoBlobUrl = URL.createObjectURL(blob);
          selectedVideoType = 'camera';
          const cameraFeed = modal.querySelector('#short-camera-preview');
          cameraFeed.srcObject = null;
          cameraFeed.src = selectedVideoBlobUrl;
          cameraFeed.controls = true;
          cameraFeed.play().catch(() => {});
        };

        mediaRecorder.start();
        startRecordBtn.style.display = 'none';
        stopRecordBtn.style.display = 'inline-flex';
        timerText.style.display = 'inline-block';

        let seconds = 0;
        recordTimerInterval = setInterval(() => {
          seconds++;
          const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
          const secs = String(seconds % 60).padStart(2, '0');
          timerText.textContent = `${mins}:${secs}`;
          if (seconds >= 60) {
            stopRecordBtn.click();
          }
        }, 1000);
      } catch (e) {
        console.error('Recording error', e);
      }
    });

    stopRecordBtn.addEventListener('click', () => {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
      if (recordTimerInterval) clearInterval(recordTimerInterval);
      stopRecordBtn.style.display = 'none';
      startRecordBtn.style.display = 'inline-flex';
      startRecordBtn.innerHTML = '<span>🔄</span> Réenregistrer';
      timerText.textContent = 'Enregistrement validé ✅';
    });

    // 3. Studio Thématique Radio
    modal.querySelectorAll('.thumb-radio-card').forEach(card => {
      card.addEventListener('click', () => {
        modal.querySelectorAll('.thumb-radio-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const r = card.querySelector('input');
        if (r) r.checked = true;
      });
    });

    // Vérificateur de conformité linguistique en temps réel
    const titleInput = modal.querySelector('#short-title-input');
    const captionsInput = modal.querySelector('#short-captions-input');
    const complianceBox = modal.querySelector('#english-compliance-box');
    const complianceText = modal.querySelector('#english-compliance-text');

    function updateCompliance() {
      const result = checkEnglishCompliance(titleInput.value, captionsInput.value);
      complianceBox.className = 'english-compliance-status ' + result.status;
      complianceText.textContent = result.msg;
    }

    titleInput.addEventListener('input', updateCompliance);
    captionsInput.addEventListener('input', updateCompliance);

    // Soumission du formulaire
    const form = modal.querySelector('#form-create-new-short');
    form.addEventListener('submit', e => {
      e.preventDefault();

      const authorSelect = modal.querySelector('#short-author-select');
      const selectedOption = authorSelect.options[authorSelect.selectedIndex];
      const title = titleInput.value.trim();
      const category = modal.querySelector('#short-category-select').value;
      const captions = captionsInput.value.trim();
      const certifyCheck = modal.querySelector('#short-english-certify');

      // Validation 100% Anglais
      const compliance = checkEnglishCompliance(title, captions);
      if (!compliance.valid) {
        alert('Attention : Votre publication ne respecte pas la règle d\'anglais !\n' + compliance.msg);
        complianceBox.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      if (!certifyCheck.checked) {
        alert('Vous devez certifier que votre vidéo est 100% en anglais.');
        return;
      }

      // Déterminer le média utilisé
      let mediaUrl = 'assets/images/short-pronunciation-coach.jpg';
      let mediaType = 'image';

      if (selectedVideoType === 'file' && selectedVideoBlobUrl) {
        mediaUrl = selectedVideoBlobUrl;
        mediaType = 'video';
      } else if (selectedVideoType === 'camera' && selectedVideoBlobUrl) {
        mediaUrl = selectedVideoBlobUrl;
        mediaType = 'video';
      } else {
        const thumbRadio = modal.querySelector('input[name="short_thumb"]:checked');
        mediaUrl = thumbRadio ? thumbRadio.value : 'assets/images/short-pronunciation-coach.jpg';
        mediaType = 'image';
      }

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
        mediaUrl: mediaUrl,
        mediaType: mediaType,
        videoUrl: mediaType === 'video' ? mediaUrl : null,
        likes: 1,
        dislikes: 0,
        userReaction: 'like',
        captions: captions,
        isEnglishOnly: true,
        tags: ['#EnglishOnly', '#EnglishBooster', '#' + category],
        date: 'À l\'instant',
        comments: []
      };

      shortsData.unshift(newShort);
      saveShorts();

      if (window.SoundFX && typeof window.SoundFX.playSuccess === 'function') {
        window.SoundFX.playSuccess();
      }
      if (window.showToast) {
        window.showToast(
          '🎉 Félicitations ! Votre vidéo Short 100% en anglais est en ligne (+50 XP).',
          'Vidéos & Shorts',
          'success',
          3500
        );
      }

      closePublish();
      renderShortsGrid();

      // Ouvrir immédiatement le lecteur sur le nouveau Short
      setTimeout(() => {
        openShortModal(newShort.id);
      }, 350);
    });
  }

  // ==========================================================================
  // PLACE POUR FAIRE UNE VIDÉO EN DIRECT (LIVE STREAM BROADCAST STUDIO)
  // ==========================================================================
  function openLiveStudio(isHost = true, liveId = null) {
    let modal = document.getElementById('modal-live-studio');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modal-live-studio';
      modal.className = 'live-studio-modal-overlay';
      document.body.appendChild(modal);
    }

    const members = getRegisteredMembers();
    const currentMember = members[0] || {
      name: 'Tychique Bongo', flag: '🇨🇮', level: 'C2', avatarImg: 'assets/images/tychique-bongo.jpg'
    };

    let sessionTitle = isHost 
      ? '🔴 Live Fluency Hour: English Speaking Practice & Real-Time Q&A' 
      : 'Live Broadcast';
    let hostName = isHost ? (currentMember.prenom ? `${currentMember.prenom} ${currentMember.nom}` : currentMember.name) : 'Lead Host';
    let hostFlag = isHost ? currentMember.drapeau || '🇨🇮' : '🌍';
    let hostLevel = isHost ? currentMember.level || 'C2' : 'C1';
    let hostAvatar = isHost ? getAssetPath(currentMember.avatarImg) : getAssetPath('assets/images/tychique-bongo.jpg');
    let initialViewers = isHost ? 18 : 45;

    if (!isHost && liveId) {
      const foundLive = liveStreamsData.find(l => l.id === liveId);
      if (foundLive) {
        sessionTitle = foundLive.title;
        hostName = foundLive.host.name;
        hostFlag = foundLive.host.flag;
        hostLevel = foundLive.host.level;
        hostAvatar = getAssetPath(foundLive.host.avatar);
        initialViewers = foundLive.viewers;
      }
    }

    modal.innerHTML = `
      <div class="shorts-modal-backdrop"></div>
      <div class="live-studio-dialog">
        <!-- Header -->
        <div class="live-studio-header">
          <div style="display:flex; align-items:center; gap:12px;">
            <span class="live-badge-glow">🔴 EN DIRECT / LIVE</span>
            <span class="crystal-badge" style="background: rgba(59, 130, 246, 0.2); border-color: #3b82f6; color: #93c5fd; font-size: 0.76rem;">
              🇬🇧 100% English Broadcast Only
            </span>
            <span class="live-duration-timer" id="live-timer-val">00:00</span>
          </div>

          <div style="display:flex; align-items:center; gap:12px;">
            <div class="live-audience-chip">
              <span>👁️</span> <span id="live-viewer-count">${initialViewers}</span> spectateurs
            </div>
            <button type="button" class="btn-close-shorts-modal" id="btn-close-live-studio" style="position:static;" aria-label="Fermer le studio">&times;</button>
          </div>
        </div>

        <!-- Main Studio Layout -->
        <div class="live-studio-main-layout">
          <!-- Video Stage (Left) -->
          <div class="live-stage-viewport">
            <!-- Feed vidéo ou flux simulé -->
            <video id="live-broadcast-feed" class="live-camera-video" autoplay playsinline muted></video>
            
            <div class="live-camera-placeholder" id="live-cam-placeholder" style="display:none;">
              <img src="${hostAvatar}" alt="${escapeHTML(hostName)}" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid #ef4444; box-shadow: 0 0 25px rgba(239, 68, 68, 0.6);" />
              <strong style="color: #fff; font-size: 1.1rem;">${escapeHTML(hostName)} ${hostFlag}</strong>
              <span class="crystal-badge">Caméra désactivée • Audio actif 🎙️</span>
            </div>

            <!-- Top Overlays on Stage -->
            <div class="live-on-air-strip">
              <img src="${hostAvatar}" alt="${escapeHTML(hostName)}" style="width: 26px; height: 26px; border-radius: 50%; object-fit: cover; border: 1.5px solid #ef4444;" />
              <span style="color:#fff; font-size:0.82rem; font-weight:700;">${escapeHTML(hostName)} ${hostFlag}</span>
              <span class="badge-level-pill">${hostLevel}</span>
            </div>

            <!-- Layer for floating reaction particles -->
            <div class="floating-reactions-layer" id="live-floating-layer"></div>

            <!-- Controls Dock (Host vs Spectator) -->
            <div class="live-controls-dock">
              ${isHost ? `
                <button type="button" class="live-ctrl-btn" id="btn-toggle-mic" title="Activer / Désactiver le microphone">
                  <span id="mic-icon">🎙️</span>
                </button>
                <button type="button" class="live-ctrl-btn" id="btn-toggle-cam" title="Activer / Désactiver la caméra">
                  <span id="cam-icon">📹</span>
                </button>
                <button type="button" class="live-ctrl-btn" id="btn-share-screen" title="Partager l'écran pour un support de cours">
                  <span>🖥️</span>
                </button>
                <button type="button" class="live-ctrl-btn" id="btn-ai-prompt" title="Sujets de conversation impromptus (AI Topics)">
                  <span>💡</span>
                </button>
                <button type="button" class="live-ctrl-btn btn-end-live" id="btn-stop-live">
                  <span>⏹️</span> Terminer le Direct
                </button>
              ` : `
                <button type="button" class="live-ctrl-btn" id="btn-toggle-mute-spec" title="Couper le son">
                  <span>🔊</span>
                </button>
                <button type="button" class="live-ctrl-btn" id="btn-request-speak" title="Demander la parole en anglais">
                  <span>✋</span>
                </button>
                <button type="button" class="live-ctrl-btn btn-end-live" id="btn-leave-live">
                  <span>🚪</span> Quitter le Direct
                </button>
              `}
            </div>
          </div>

          <!-- Live Chat & Interaction Column (Right) -->
          <div class="live-chat-panel">
            <div class="live-chat-header">
              <strong style="color: #fff; font-size: 0.92rem; display: flex; align-items: center; gap: 6px;">
                <span>💬</span> Chat en Direct (English Only)
              </strong>
              <span class="crystal-badge" style="font-size: 0.68rem; background: rgba(74, 222, 128, 0.2); color: #4ade80;">Modération Active</span>
            </div>

            <!-- Messages list -->
            <div class="live-chat-messages-wrap" id="live-chat-list">
              <div class="live-chat-msg-row">
                <span style="font-size: 1.1rem;">🤖</span>
                <div>
                  <span class="live-chat-author-name">Système English Booster:</span>
                  <span class="live-chat-text" style="color: var(--text-muted); font-size: 0.8rem;">
                    Bienvenue dans ce direct vidéo ! Posez vos questions et échangez exclusivement en langue anglaise.
                  </span>
                </div>
              </div>
              <div class="live-chat-msg-row">
                <img src="${getAssetPath('assets/avatars/alex.jpg')}" alt="Alex" class="live-chat-msg-avatar" />
                <div>
                  <span class="live-chat-author-name">Alex Rivera 🇪🇸:</span>
                  <span class="live-chat-text">Hello everyone! Excited for today's fluency workshop! 🚀</span>
                </div>
              </div>
            </div>

            <!-- Floating Reactions Toolbar -->
            <div class="live-reactions-toolbar">
              <button type="button" class="reaction-trigger-btn" data-emoji="❤️" title="Love">❤️</button>
              <button type="button" class="reaction-trigger-btn" data-emoji="🔥" title="Fire">🔥</button>
              <button type="button" class="reaction-trigger-btn" data-emoji="👏" title="Applause">👏</button>
              <button type="button" class="reaction-trigger-btn" data-emoji="🎯" title="Bullseye">🎯</button>
              <button type="button" class="reaction-trigger-btn" data-emoji="🚀" title="Rocket">🚀</button>
              <button type="button" class="reaction-trigger-btn" data-emoji="🇬🇧" title="English">🇬🇧</button>
            </div>

            <!-- Chat Input Bar -->
            <form class="live-chat-input-bar" id="live-chat-form">
              <input type="text" id="live-chat-input" class="form-control" placeholder="Message en anglais..." style="font-size: 0.85rem;" required />
              <button type="submit" class="btn btn-primary btn-sm">Envoyer</button>
            </form>
          </div>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    const videoFeed = modal.querySelector('#live-broadcast-feed');
    const placeholder = modal.querySelector('#live-cam-placeholder');
    const timerVal = modal.querySelector('#live-timer-val');
    const viewersEl = modal.querySelector('#live-viewer-count');
    const chatList = modal.querySelector('#live-chat-list');
    const floatingLayer = modal.querySelector('#live-floating-layer');

    // 1. Démarrer le flux vidéo (Webcam pour hôte ou fallback)
    if (isHost) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then(stream => {
            liveMediaStream = stream;
            videoFeed.srcObject = stream;
          })
          .catch(err => {
            console.warn('Webcam permission denied or unavailable, using fallback stage', err);
            videoFeed.style.display = 'none';
            placeholder.style.display = 'flex';
          });
      } else {
        videoFeed.style.display = 'none';
        placeholder.style.display = 'flex';
      }
    } else {
      // Spectateur : simule la vidéo de l'hôte
      videoFeed.poster = hostAvatar;
    }

    // 2. Chronomètre du live
    let elapsedSeconds = 0;
    if (liveTimerInterval) clearInterval(liveTimerInterval);
    liveTimerInterval = setInterval(() => {
      elapsedSeconds++;
      const mins = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
      const secs = String(elapsedSeconds % 60).padStart(2, '0');
      timerVal.textContent = `${mins}:${secs}`;
    }, 1000);

    // 3. Fluctuation dynamique du nombre de spectateurs
    let currentViewers = initialViewers;
    if (liveAudienceInterval) clearInterval(liveAudienceInterval);
    liveAudienceInterval = setInterval(() => {
      const delta = Math.floor(Math.random() * 5) - 2; // -2 à +2
      currentViewers = Math.max(12, currentViewers + delta);
      if (viewersEl) viewersEl.textContent = currentViewers;
    }, 4500);

    // 4. Flux automatique de commentaires en anglais de la communauté
    const sampleChatMessages = [
      { name: 'Sofia Martínez 🇪🇸', avatar: 'assets/avatars/sofia.jpg', text: 'Can you give an example of connected speech?' },
      { name: 'Kenji Sato 🇯🇵', avatar: 'assets/avatars/kenji.jpg', text: 'Watching live from Tokyo! Fantastic fluency tips.' },
      { name: 'Amara Okafor 🇳🇬', avatar: 'assets/avatars/amara.jpg', text: 'Confidence is key! Keep talking coach! 🔥' },
      { name: 'Lucas Weber 🇩🇪', avatar: 'assets/avatars/lucas.jpg', text: 'How do you practice shadowing without getting exhausted?' },
      { name: 'Chloé Dubois 🇫🇷', avatar: 'assets/avatars/chloe.jpg', text: 'Super clear pronunciation masterclass!' }
    ];

    let chatIdx = 0;
    const chatInterval = setInterval(() => {
      if (chatIdx >= sampleChatMessages.length) chatIdx = 0;
      const msg = sampleChatMessages[chatIdx++];
      addLiveChatMessage(msg.name, msg.avatar, msg.text);
      // Réaction aléatoire flottante
      const emojis = ['❤️', '🔥', '👏', '🚀'];
      spawnFloatingReaction(emojis[Math.floor(Math.random() * emojis.length)]);
    }, 6000);

    function addLiveChatMessage(author, avatar, text) {
      if (!chatList) return;
      const row = document.createElement('div');
      row.className = 'live-chat-msg-row';
      row.innerHTML = `
        <img src="${getAssetPath(avatar)}" alt="${escapeHTML(author)}" class="live-chat-msg-avatar" />
        <div>
          <span class="live-chat-author-name">${escapeHTML(author)}:</span>
          <span class="live-chat-text">${escapeHTML(text)}</span>
        </div>
      `;
      chatList.appendChild(row);
      chatList.scrollTop = chatList.scrollHeight;
    }

    // 5. Réactions flottantes
    function spawnFloatingReaction(emoji) {
      if (!floatingLayer) return;
      const particle = document.createElement('div');
      particle.className = 'reaction-particle';
      particle.textContent = emoji;
      particle.style.left = Math.floor(Math.random() * 60 + 20) + '%';
      floatingLayer.appendChild(particle);
      setTimeout(() => particle.remove(), 2400);
    }

    modal.querySelectorAll('.reaction-trigger-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const emoji = btn.getAttribute('data-emoji') || '❤️';
        spawnFloatingReaction(emoji);
        if (window.SoundFX && typeof window.SoundFX.playPop === 'function') {
          window.SoundFX.playPop();
        }
      });
    });

    // 6. Envoi de message dans le chat en direct
    const chatForm = modal.querySelector('#live-chat-form');
    chatForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = modal.querySelector('#live-chat-input');
      const text = input.value.trim();
      if (!text) return;

      const userName = localStorage.getItem('eb_user_name') || (isHost ? hostName : 'Alex Rivera');
      addLiveChatMessage(userName + (isHost ? ' (Hôte 👑)' : ''), hostAvatar, text);
      input.value = '';

      if (window.SoundFX && typeof window.SoundFX.playSuccess === 'function') {
        window.SoundFX.playSuccess();
      }
    });

    // 7. Contrôles hôte (Micro, Caméra, Partage d'écran, AI Prompts)
    if (isHost) {
      const micBtn = modal.querySelector('#btn-toggle-mic');
      const micIcon = modal.querySelector('#mic-icon');
      micBtn.addEventListener('click', () => {
        isMicMuted = !isMicMuted;
        if (liveMediaStream) {
          liveMediaStream.getAudioTracks().forEach(t => t.enabled = !isMicMuted);
        }
        micBtn.classList.toggle('off', isMicMuted);
        micIcon.textContent = isMicMuted ? '🔇' : '🎙️';
        if (window.showToast) {
          window.showToast(isMicMuted ? 'Microphone désactivé' : 'Microphone activé', 'Studio Live', 'info');
        }
      });

      const camBtn = modal.querySelector('#btn-toggle-cam');
      const camIcon = modal.querySelector('#cam-icon');
      camBtn.addEventListener('click', () => {
        isCamOff = !isCamOff;
        if (liveMediaStream) {
          liveMediaStream.getVideoTracks().forEach(t => t.enabled = !isCamOff);
        }
        camBtn.classList.toggle('off', isCamOff);
        camIcon.textContent = isCamOff ? '🚫' : '📹';
        videoFeed.style.display = isCamOff ? 'none' : 'block';
        placeholder.style.display = isCamOff ? 'flex' : 'none';
      });

      const screenBtn = modal.querySelector('#btn-share-screen');
      screenBtn.addEventListener('click', async () => {
        try {
          if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            videoFeed.srcObject = screenStream;
            videoFeed.style.display = 'block';
            placeholder.style.display = 'none';
            screenStream.getVideoTracks()[0].onended = () => {
              if (liveMediaStream) videoFeed.srcObject = liveMediaStream;
            };
            if (window.showToast) {
              window.showToast('Partage d\'écran actif pour les spectateurs', 'Studio Live', 'success');
            }
          } else {
            alert('Le partage d\'écran n\'est pas supporté sur cet appareil.');
          }
        } catch (err) {
          console.warn('Screen share cancelled', err);
        }
      });

      const aiPromptBtn = modal.querySelector('#btn-ai-prompt');
      const promptsList = [
        "What is the single best habit that helped you speak English faster?",
        "Debate: Is natural pronunciation more important than perfect grammar?",
        "Challenge: Describe your dream project in 45 seconds without using filler words!",
        "Idiom in action: Explain what 'cut to the chase' means in business English."
      ];
      aiPromptBtn.addEventListener('click', () => {
        const randomPrompt = promptsList[Math.floor(Math.random() * promptsList.length)];
        addLiveChatMessage('💡 Sujet IA Suggéré', 'assets/images/logo.svg', `"${randomPrompt}"`);
        if (window.showToast) {
          window.showToast('Sujet de conversation lancé dans le chat !', 'Studio Live IA', 'info');
        }
      });
    }

    // 8. Fermeture et arrêt du direct
    function closeLiveStudio() {
      if (liveMediaStream) {
        liveMediaStream.getTracks().forEach(t => t.stop());
        liveMediaStream = null;
      }
      if (liveTimerInterval) clearInterval(liveTimerInterval);
      if (liveAudienceInterval) clearInterval(liveAudienceInterval);
      if (chatInterval) clearInterval(chatInterval);

      modal.style.display = 'none';
      document.body.style.overflow = '';

      if (isHost) {
        if (window.showToast) {
          window.showToast(
            `🎉 Direct terminé avec succès ! Durée : ${timerVal.textContent} • +150 XP gagnés.`,
            'Studio Live English Booster',
            'success',
            4000
          );
        }
      }
    }

    const closeBtn = modal.querySelector('#btn-close-live-studio');
    const stopLiveBtn = modal.querySelector('#btn-stop-live');
    const leaveLiveBtn = modal.querySelector('#btn-leave-live');

    closeBtn.addEventListener('click', closeLiveStudio);
    if (stopLiveBtn) {
      stopLiveBtn.addEventListener('click', () => {
        if (confirm('Voulez-vous vraiment terminer la diffusion en direct ?')) {
          closeLiveStudio();
        }
      });
    }
    if (leaveLiveBtn) {
      leaveLiveBtn.addEventListener('click', closeLiveStudio);
    }
  }

  // Filtrage par catégories
  function initCategoryFilters() {
    document.querySelectorAll('.short-filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.short-filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentFilter = chip.getAttribute('data-filter') || 'all';

        if (currentFilter === 'live') {
          const liveSection = document.getElementById('live-broadcasts-section');
          if (liveSection) {
            liveSection.scrollIntoView({ behavior: 'smooth' });
            liveSection.style.animation = 'pulseBeacon 0.8s ease';
          }
        } else {
          renderShortsGrid();
        }
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
      renderLiveStreams();
    },
    openPublishModal: openPublishModal,
    openShortModal: openShortModal,
    openLiveStudio: openLiveStudio,
    renderLiveStreams: renderLiveStreams
  };

  // Initialisation automatique
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.EB_WatchShorts.init);
  } else {
    window.EB_WatchShorts.init();
  }
})();
