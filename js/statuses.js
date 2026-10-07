/**
 * ENGLISH BOOSTER — COMMUNITY STATUSES & STORIES ENGINE (js/statuses.js)
 * Real-time Text, Video, Image, and Audio status sharing with interactive
 * Likes, Dislikes, Comment threads, and Audio Waveform player.
 */

(function () {
  'use strict';

  // Seed Statuses Database
  const DEFAULT_STATUSES = [
    {
      id: 'status_1',
      author: {
        name: 'Sofia Martínez',
        flag: '🇪🇸',
        avatar: '../assets/avatars/sofia.jpg',
        level: 'B1',
        title: 'Intermediate'
      },
      type: 'audio', // 'audio', 'video', 'image', 'text'
      timeAgo: 'Il y a 12 min',
      content: "Practicing English connected speech and weak forms: 'What do you want to do?' naturally sounds like 'Whaddya wanna do?'. How is my rhythm and vowel length? Give me your honest feedback!",
      audioData: {
        duration: '0:26',
        title: 'Voice Note: Connected Speech & Weak Forms #01',
        speechText: "What do you want to do tonight? Let's grab some coffee and practice our English speaking."
      },
      likes: 42,
      dislikes: 1,
      userReaction: null, // 'like' | 'dislike' | null
      comments: [
        {
          id: 'c1_1',
          name: 'Lucas Weber',
          flag: '🇩🇪',
          avatar: '../assets/avatars/lucas.jpg',
          time: 'Il y a 8 min',
          text: "Your flow is very natural Sofia! The transition between 'what' and 'do you' was super smooth."
        },
        {
          id: 'c1_2',
          name: 'Tychique Bongo',
          flag: '🇨🇮',
          avatar: '../assets/images/tychique-bongo.jpg',
          time: 'Il y a 3 min',
          text: "Great pronunciation rhythm! Just soften the 'd' sound slightly to sound even more effortless."
        }
      ]
    },
    {
      id: 'status_2',
      author: {
        name: 'Kenji Sato',
        flag: '🇯🇵',
        avatar: '../assets/avatars/kenji.jpg',
        level: 'B2',
        title: 'Upper Intermediate'
      },
      type: 'video',
      timeAgo: 'Il y a 35 min',
      content: "My 45-second elevator pitch rehearsal for tech interviews. Trying to stop using filler words ('um', 'like'). Check out my video practice!",
      videoData: {
        thumbnail: '../assets/images/conversation-live-duo.jpg',
        duration: '0:45',
        title: 'Tech Interview Mock Pitch · Silicon Valley Prep',
        captions: "My role as a software engineer revolves around distributed backend architectures and scaling low-latency services..."
      },
      likes: 67,
      dislikes: 2,
      userReaction: null,
      comments: [
        {
          id: 'c2_1',
          name: 'Amara Okafor',
          flag: '🇳🇬',
          avatar: '../assets/avatars/amara.jpg',
          time: 'Il y a 20 min',
          text: "Very confident delivery Kenji! No hesitation at all, you are ready for your technical interview."
        }
      ]
    },
    {
      id: 'status_3',
      author: {
        name: 'Amara Okafor',
        flag: '🇳🇬',
        avatar: '../assets/avatars/amara.jpg',
        level: 'C1',
        title: 'Advanced'
      },
      type: 'image',
      timeAgo: 'Il y a 1h',
      content: "5 high-impact business English idioms from my team presentation today! Save this note for your next workplace meeting: 1. Touch base 2. Circle back 3. Bring to the table 4. Ballpark figure 5. Cut to the chase.",
      imageData: {
        url: '../assets/images/conversation-business.jpg',
        alt: 'Professional business English meeting notes',
        caption: 'Workplace Fluency & Boardroom Idioms — Oxford Business Vocabulary'
      },
      likes: 95,
      dislikes: 0,
      userReaction: null,
      comments: [
        {
          id: 'c3_1',
          name: 'Alex Rivera',
          flag: '🇪🇸',
          avatar: '../assets/avatars/alex.jpg',
          time: 'Il y a 45 min',
          text: "Super useful list! We use 'circle back' constantly in our Slack channels."
        },
        {
          id: 'c3_2',
          name: 'Sofia Martínez',
          flag: '🇪🇸',
          avatar: '../assets/avatars/sofia.jpg',
          time: 'Il y a 30 min',
          text: "Saved! Thanks Amara, always love your professional English tips!"
        }
      ]
    },
    {
      id: 'status_4',
      author: {
        name: 'Lucas Weber',
        flag: '🇩🇪',
        avatar: '../assets/avatars/lucas.jpg',
        level: 'B2',
        title: 'Upper Intermediate'
      },
      type: 'text',
      timeAgo: 'Il y a 2h',
      content: "Quick debate for the English Booster community: What single habit made the biggest leap in your spoken confidence? For me, it was talking out loud to myself in English for 10 minutes every morning before opening my emails. What's yours?",
      textTags: ['#SpeakingHabits', '#FluencyHacks', '#ConfidenceBoost'],
      likes: 54,
      dislikes: 3,
      userReaction: null,
      comments: [
        {
          id: 'c4_1',
          name: 'Chloé Dubois',
          flag: '🇫🇷',
          avatar: '../assets/avatars/chloe.jpg',
          time: 'Il y a 1h',
          text: "For me, having 15-minute 1-to-1 live calls right here on English Booster! Zero pressure and instant progress."
        },
        {
          id: 'c4_2',
          name: 'Kenji Sato',
          flag: '🇯🇵',
          avatar: '../assets/avatars/kenji.jpg',
          time: 'Il y a 50 min',
          text: "Shadowing podcasts at 1.25x speed to train speech velocity and natural intonation!"
        }
      ]
    },
    {
      id: 'status_5',
      author: {
        name: 'Chloé Dubois',
        flag: '🇫🇷',
        avatar: '../assets/avatars/chloe.jpg',
        level: 'B1',
        title: 'Intermediate'
      },
      type: 'audio',
      timeAgo: 'Il y a 3h',
      content: "Day 7 Tongue Twister Challenge: 'She sells seashells by the seashore'. I tried doing it 3 times without stumbling! Listen to my audio note below and try to beat my time! 🐚",
      audioData: {
        duration: '0:18',
        title: 'Phonetics & Tongue Twister #07',
        speechText: "She sells seashells by the seashore. The shells she sells are surely seashells."
      },
      likes: 81,
      dislikes: 1,
      userReaction: null,
      comments: [
        {
          id: 'c5_1',
          name: 'Lucas Weber',
          flag: '🇩🇪',
          avatar: '../assets/avatars/lucas.jpg',
          time: 'Il y a 2h',
          text: "Haha that 's' and 'sh' transition is so tricky! Your speed was impressive Chloé!"
        }
      ]
    }
  ];

  // Store in LocalStorage or Memory
  let statuses = [];
  function loadStatuses() {
    const saved = localStorage.getItem('eb_community_statuses');
    if (saved) {
      try {
        statuses = JSON.parse(saved);
      } catch (e) {
        statuses = [...DEFAULT_STATUSES];
      }
    } else {
      statuses = [...DEFAULT_STATUSES];
      saveStatuses();
    }
  }

  function saveStatuses() {
    localStorage.setItem('eb_community_statuses', JSON.stringify(statuses));
  }

  let activeFilter = 'all';
  let currentlyPlayingAudioId = null;
  let audioTimerInterval = null;

  // Render Status Feed
  function renderStatuses() {
    const container = document.getElementById('status-feed-container');
    if (!container) return;

    const filtered = statuses.filter(s => {
      if (activeFilter === 'all') return true;
      return s.type === activeFilter;
    });

    const countAll = document.getElementById('count-all-status');
    if (countAll) countAll.textContent = statuses.length;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="glass-card" style="padding: 40px; text-align: center; grid-column: 1 / -1;">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">📭</div>
          <h3 style="font-size: 1.3rem; margin-bottom: 6px;">Aucun statut dans cette catégorie</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem;">Soyez le premier à partager un statut ${activeFilter} !</p>
          <button type="button" class="btn btn-primary btn-sm" onclick="window.EB_Statuses.openCreateModal('${activeFilter}')" style="margin-top: 14px;">
            <span>✍️</span> Publier un statut
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(status => renderStatusCard(status)).join('');
    bindStatusEvents();
  }

  // Render Individual Status Card
  function renderStatusCard(status) {
    const isLiked = status.userReaction === 'like';
    const isDisliked = status.userReaction === 'dislike';

    // Type Badge Helper
    let typeBadge = '';
    if (status.type === 'audio') typeBadge = `<span class="crystal-badge crystal-badge-emerald">🎙️ Audio Note</span>`;
    else if (status.type === 'video') typeBadge = `<span class="crystal-badge crystal-badge-cyan">📹 Vidéo Live</span>`;
    else if (status.type === 'image') typeBadge = `<span class="crystal-badge">🖼️ Photo & Notes</span>`;
    else typeBadge = `<span class="crystal-badge crystal-badge-purple">✍️ Texte / Débat</span>`;

    // Media Content Builder
    let mediaContent = '';
    if (status.type === 'audio') {
      const isPlaying = currentlyPlayingAudioId === status.id;
      mediaContent = `
        <div class="status-audio-player-card">
          <div class="audio-player-top">
            <button type="button" class="btn-audio-play ${isPlaying ? 'playing' : ''}" data-audio-id="${status.id}" aria-label="Lire la note audio">
              <span>${isPlaying ? '⏸️' : '▶️'}</span>
            </button>
            <div class="audio-meta-info">
              <div class="audio-title">${escapeHTML(status.audioData.title)}</div>
              <div class="audio-sub">${status.audioData.duration} · Enregistrement Haute Définition</div>
            </div>
            <div class="audio-timer-pill" id="audio-timer-${status.id}">
              ${isPlaying ? '0:12' : status.audioData.duration}
            </div>
          </div>

          <!-- Animated Audio Waveform -->
          <div class="status-waveform-wrap ${isPlaying ? 'active-wave' : ''}" id="waveform-${status.id}">
            <div class="wave-track">
              <span class="w-bar" style="height: 35%;"></span>
              <span class="w-bar" style="height: 65%;"></span>
              <span class="w-bar" style="height: 90%;"></span>
              <span class="w-bar" style="height: 45%;"></span>
              <span class="w-bar" style="height: 80%;"></span>
              <span class="w-bar" style="height: 100%;"></span>
              <span class="w-bar" style="height: 55%;"></span>
              <span class="w-bar" style="height: 75%;"></span>
              <span class="w-bar" style="height: 95%;"></span>
              <span class="w-bar" style="height: 40%;"></span>
              <span class="w-bar" style="height: 85%;"></span>
              <span class="w-bar" style="height: 60%;"></span>
              <span class="w-bar" style="height: 70%;"></span>
              <span class="w-bar" style="height: 30%;"></span>
              <span class="w-bar" style="height: 90%;"></span>
              <span class="w-bar" style="height: 50%;"></span>
            </div>
          </div>
          <div class="audio-transcript-hint">
            💬 <em>"${escapeHTML(status.audioData.speechText)}"</em>
          </div>
        </div>
      `;
    } else if (status.type === 'video') {
      mediaContent = `
        <div class="status-video-wrapper">
          <div class="status-video-preview">
            <img src="${status.videoData.thumbnail}" alt="${escapeHTML(status.videoData.title)}" class="status-video-img" />
            <div class="video-overlay-tint"></div>
            <button type="button" class="btn-video-play-center" data-video-id="${status.id}" title="Lancer la vidéo">
              <span>▶</span>
            </button>
            <span class="video-duration-badge">⏱️ ${status.videoData.duration}</span>
            <span class="video-quality-badge">HD 1080p</span>
          </div>
          <div class="video-caption-bar">
            <strong>${escapeHTML(status.videoData.title)}</strong>
            <p class="video-sub-caption">"${escapeHTML(status.videoData.captions)}"</p>
          </div>
        </div>
      `;
    } else if (status.type === 'image') {
      mediaContent = `
        <div class="status-image-wrapper">
          <div class="status-img-frame">
            <img src="${status.imageData.url}" alt="${escapeHTML(status.imageData.alt)}" class="status-post-photo" loading="lazy" />
          </div>
          <div class="status-image-caption">
            📌 ${escapeHTML(status.imageData.caption)}
          </div>
        </div>
      `;
    } else if (status.type === 'text') {
      const tags = (status.textTags || []).map(t => `<span class="tag-pill">${escapeHTML(t)}</span>`).join(' ');
      mediaContent = tags ? `<div class="status-text-tags">${tags}</div>` : '';
    }

    // Comments section
    const commentsCount = status.comments.length;
    const commentsListHTML = status.comments.map(c => `
      <div class="comment-item">
        <div class="comment-avatar">
          <img src="${c.avatar}" alt="${escapeHTML(c.name)}" />
          <span class="comment-flag">${c.flag}</span>
        </div>
        <div class="comment-bubble">
          <div class="comment-header">
            <strong>${escapeHTML(c.name)}</strong>
            <span class="comment-time">${c.time}</span>
          </div>
          <div class="comment-text">${escapeHTML(c.text)}</div>
        </div>
      </div>
    `).join('');

    return `
      <article class="glass-card status-card" id="card-${status.id}">
        <!-- Author Header -->
        <div class="status-card-header">
          <div class="status-author-wrap">
            <div class="status-avatar-box">
              <img src="${status.author.avatar}" alt="${escapeHTML(status.author.name)}" class="status-avatar-img" />
              <span class="status-flag-badge">${status.author.flag}</span>
            </div>
            <div>
              <div class="status-author-name">
                ${escapeHTML(status.author.name)}
                <span class="badge-level level-${status.author.level.toLowerCase()}">${status.author.level}</span>
              </div>
              <div class="status-time-sub">${status.timeAgo} · Session d'expression orale</div>
            </div>
          </div>
          <div class="status-type-tag">
            ${typeBadge}
          </div>
        </div>

        <!-- Body Text Content -->
        <div class="status-body-text">
          ${escapeHTML(status.content)}
        </div>

        <!-- Media Attachment (Audio / Video / Image) -->
        <div class="status-media-container">
          ${mediaContent}
        </div>

        <!-- Social Action Buttons (Like / Dislike / Comment) -->
        <div class="status-actions-bar">
          <div class="status-reaction-group">
            <!-- LIKE BUTTON -->
            <button type="button" class="btn-reaction btn-like ${isLiked ? 'active-liked' : ''}" data-id="${status.id}" title="J'aime">
              <span class="reaction-icon">👍</span>
              <span class="reaction-label">J'aime</span>
              <span class="reaction-count" id="like-count-${status.id}">${status.likes}</span>
            </button>

            <!-- DISLIKE BUTTON -->
            <button type="button" class="btn-reaction btn-dislike ${isDisliked ? 'active-disliked' : ''}" data-id="${status.id}" title="Je n'aime pas">
              <span class="reaction-icon">👎</span>
              <span class="reaction-label">Dislike</span>
              <span class="reaction-count" id="dislike-count-${status.id}">${status.dislikes}</span>
            </button>
          </div>

          <!-- COMMENT TOGGLE BUTTON -->
          <button type="button" class="btn-reaction btn-comment-toggle" data-id="${status.id}">
            <span class="reaction-icon">💬</span>
            <span class="reaction-label">Commentaires</span>
            <span class="reaction-count" id="comment-count-${status.id}">(${commentsCount})</span>
          </button>
        </div>

        <!-- Collapsible Comments Thread -->
        <div class="status-comments-thread" id="comments-thread-${status.id}" style="display: none;">
          <div class="comments-list" id="comments-list-${status.id}">
            ${commentsListHTML || '<div class="no-comments-msg">Soyez le premier à commenter ce statut !</div>'}
          </div>

          <!-- Add Comment Form -->
          <form class="add-comment-form" data-id="${status.id}">
            <div class="comment-input-wrap">
              <input type="text" class="comment-text-input form-control" placeholder="Écrivez un commentaire ou un conseil d'anglais..." required />
              <button type="submit" class="btn btn-primary btn-sm btn-submit-comment">
                <span>Envoyer</span>
              </button>
            </div>
          </form>
        </div>
      </article>
    `;
  }

  // Bind All Event Handlers
  function bindStatusEvents() {
    // Like button
    document.querySelectorAll('.btn-like').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = btn.getAttribute('data-id');
        handleReaction(id, 'like');
      });
    });

    // Dislike button
    document.querySelectorAll('.btn-dislike').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = btn.getAttribute('data-id');
        handleReaction(id, 'dislike');
      });
    });

    // Toggle Comments
    document.querySelectorAll('.btn-comment-toggle').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = btn.getAttribute('data-id');
        toggleComments(id);
      });
    });

    // Add Comment submit
    document.querySelectorAll('.add-comment-form').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const id = form.getAttribute('data-id');
        const input = form.querySelector('.comment-text-input');
        if (!input) return;
        const text = input.value.trim();
        if (text) {
          addComment(id, text);
          input.value = '';
        }
      });
    });

    // Audio Play/Pause Simulation
    document.querySelectorAll('.btn-audio-play').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-audio-id');
        handleAudioToggle(id);
      });
    });

    // Video Play Demo
    document.querySelectorAll('.btn-video-play-center').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-video-id');
        playVideoDemo(id);
      });
    });
  }

  // Handle Like & Dislike
  function handleReaction(statusId, reactionType) {
    const status = statuses.find(s => s.id === statusId);
    if (!status) return;

    if (window.SoundFX && typeof window.SoundFX.playClick === 'function') {
      window.SoundFX.playClick();
    }

    if (status.userReaction === reactionType) {
      // Toggle off
      status.userReaction = null;
      if (reactionType === 'like') status.likes = Math.max(0, status.likes - 1);
      else status.dislikes = Math.max(0, status.dislikes - 1);
    } else {
      // If switching from the other reaction
      if (status.userReaction === 'like' && reactionType === 'dislike') {
        status.likes = Math.max(0, status.likes - 1);
      } else if (status.userReaction === 'dislike' && reactionType === 'like') {
        status.dislikes = Math.max(0, status.dislikes - 1);
      }

      status.userReaction = reactionType;
      if (reactionType === 'like') {
        status.likes += 1;
        if (window.showToast) window.showToast('👍 Vous aimez ce statut d\'anglais !', 'Réaction enregistrée', 'success', 1800);
      } else {
        status.dislikes += 1;
        if (window.showToast) window.showToast('👎 Réaction enregistrée', 'Feedback partagé', 'info', 1800);
      }
    }

    saveStatuses();

    // Update UI directly without full re-render
    const likeBtn = document.querySelector(`.btn-like[data-id="${statusId}"]`);
    const dislikeBtn = document.querySelector(`.btn-dislike[data-id="${statusId}"]`);
    const likeCount = document.getElementById(`like-count-${statusId}`);
    const dislikeCount = document.getElementById(`dislike-count-${statusId}`);

    if (likeBtn) likeBtn.classList.toggle('active-liked', status.userReaction === 'like');
    if (dislikeBtn) dislikeBtn.classList.toggle('active-disliked', status.userReaction === 'dislike');
    if (likeCount) likeCount.textContent = status.likes;
    if (dislikeCount) dislikeCount.textContent = status.dislikes;
  }

  // Toggle Comments thread
  function toggleComments(statusId) {
    const thread = document.getElementById(`comments-thread-${statusId}`);
    if (!thread) return;

    const isHidden = thread.style.display === 'none';
    thread.style.display = isHidden ? 'block' : 'none';

    if (isHidden) {
      thread.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      const input = thread.querySelector('.comment-text-input');
      if (input) input.focus();
    }
  }

  // Add Comment
  function addComment(statusId, text) {
    const status = statuses.find(s => s.id === statusId);
    if (!status) return;

    // Get current user profile from localStorage or default Alex
    const currentName = localStorage.getItem('eb_user_name') || 'Alex Rivera';
    const currentFlag = '🇪🇸';
    const currentAvatar = '../assets/avatars/alex.jpg';

    const newComment = {
      id: 'c_' + Date.now(),
      name: currentName,
      flag: currentFlag,
      avatar: currentAvatar,
      time: 'À l\'instant',
      text: text
    };

    status.comments.push(newComment);
    saveStatuses();

    if (window.SoundFX && typeof window.SoundFX.playSuccess === 'function') {
      window.SoundFX.playSuccess();
    }
    if (window.showToast) {
      window.showToast('💬 Commentaire publié avec succès !', 'English Booster Community', 'success', 2000);
    }

    // Update comments DOM
    const list = document.getElementById(`comments-list-${statusId}`);
    const countEl = document.getElementById(`comment-count-${statusId}`);

    if (countEl) countEl.textContent = `(${status.comments.length})`;

    if (list) {
      const emptyMsg = list.querySelector('.no-comments-msg');
      if (emptyMsg) emptyMsg.remove();

      const itemDiv = document.createElement('div');
      itemDiv.className = 'comment-item new-comment-anim';
      itemDiv.innerHTML = `
        <div class="comment-avatar">
          <img src="${newComment.avatar}" alt="${escapeHTML(newComment.name)}" />
          <span class="comment-flag">${newComment.flag}</span>
        </div>
        <div class="comment-bubble">
          <div class="comment-header">
            <strong>${escapeHTML(newComment.name)}</strong>
            <span class="comment-time">${newComment.time}</span>
          </div>
          <div class="comment-text">${escapeHTML(newComment.text)}</div>
        </div>
      `;
      list.appendChild(itemDiv);
    }
  }

  // Audio Playback Simulation with SpeechSynthesis
  function handleAudioToggle(statusId) {
    const status = statuses.find(s => s.id === statusId);
    if (!status || !status.audioData) return;

    if (currentlyPlayingAudioId === statusId) {
      // Pause
      stopAudioPlayback();
      return;
    }

    // Stop existing audio
    stopAudioPlayback();
    currentlyPlayingAudioId = statusId;

    // Update button & waveform UI
    const btn = document.querySelector(`.btn-audio-play[data-audio-id="${statusId}"]`);
    const wave = document.getElementById(`waveform-${statusId}`);
    const timer = document.getElementById(`audio-timer-${statusId}`);

    if (btn) {
      btn.classList.add('playing');
      btn.innerHTML = '<span>⏸️</span>';
    }
    if (wave) wave.classList.add('active-wave');

    // Synthesize English voice note if browser supports it
    if ('speechSynthesis' in window && status.audioData.speechText) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(status.audioData.speechText);
      utterance.lang = 'en-US';
      utterance.rate = 0.95;

      utterance.onend = () => {
        stopAudioPlayback();
      };
      utterance.onerror = () => {
        stopAudioPlayback();
      };

      window.speechSynthesis.speak(utterance);
    }

    // Timer simulation
    let seconds = 0;
    audioTimerInterval = setInterval(() => {
      seconds++;
      if (timer) {
        const mins = Math.floor(seconds / 60);
        const rem = seconds % 60;
        timer.textContent = `${mins}:${rem < 10 ? '0' : ''}${rem}`;
      }
      if (seconds >= 26) {
        stopAudioPlayback();
      }
    }, 1000);

    if (window.showToast) {
      window.showToast(`🎧 Lecture de la note vocale de ${status.author.name}`, 'Pratique phonétique', 'info', 2000);
    }
  }

  function stopAudioPlayback() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (audioTimerInterval) {
      clearInterval(audioTimerInterval);
      audioTimerInterval = null;
    }

    if (currentlyPlayingAudioId) {
      const prevBtn = document.querySelector(`.btn-audio-play[data-audio-id="${currentlyPlayingAudioId}"]`);
      const prevWave = document.getElementById(`waveform-${currentlyPlayingAudioId}`);
      const prevTimer = document.getElementById(`audio-timer-${currentlyPlayingAudioId}`);
      const st = statuses.find(s => s.id === currentlyPlayingAudioId);

      if (prevBtn) {
        prevBtn.classList.remove('playing');
        prevBtn.innerHTML = '<span>▶️</span>';
      }
      if (prevWave) prevWave.classList.remove('active-wave');
      if (prevTimer && st && st.audioData) prevTimer.textContent = st.audioData.duration;

      currentlyPlayingAudioId = null;
    }
  }

  // Video Demo Modal
  function playVideoDemo(statusId) {
    const status = statuses.find(s => s.id === statusId);
    if (!status || !status.videoData) return;

    if (window.showToast) {
      window.showToast(`🎬 Lecture de la capsule vidéo de ${status.author.name} (1080p)`, 'Capsule d\'anglais en direct', 'info', 2500);
    }

    // Trigger audio speech synthesis for the video
    if ('speechSynthesis' in window && status.videoData.captions) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(status.videoData.captions);
      utterance.lang = 'en-US';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }

  // Filter Buttons Setup
  function initFilterButtons() {
    document.querySelectorAll('.status-filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.status-filter-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-type') || 'all';
        renderStatuses();
      });
    });
  }

  // Create Status Form
  function initCreateStatus() {
    const openBtn = document.getElementById('btn-open-create-status');
    const card = document.getElementById('create-status-card');
    if (!openBtn || !card) return;

    openBtn.addEventListener('click', () => {
      const isVisible = card.style.display !== 'none';
      card.style.display = isVisible ? 'none' : 'block';
      if (!isVisible) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        const txt = card.querySelector('#new-status-text');
        if (txt) txt.focus();
      }
    });

    // Populate Creator Card HTML
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; border-bottom: 1px solid var(--glass-border); padding-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span class="crystal-badge">Créer un Statut d'Anglais</span>
          <span style="font-size: 0.82rem; color: var(--text-muted);">Partagez vos progrès ou posez une question</span>
        </div>
        <button type="button" class="btn-close-card" id="btn-close-create-status" style="background: transparent; border: none; font-size: 1.2rem; cursor: pointer; color: var(--text-muted);">&times;</button>
      </div>

      <form id="form-publish-status">
        <!-- Choose Type Radio Buttons -->
        <div style="display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap;">
          <label class="status-type-select-chip active" data-type="text">
            <input type="radio" name="new_status_type" value="text" checked style="display:none;">
            ✍️ Écrit / Texte
          </label>
          <label class="status-type-select-chip" data-type="audio">
            <input type="radio" name="new_status_type" value="audio" style="display:none;">
            🎙️ Audio / Voix
          </label>
          <label class="status-type-select-chip" data-type="image">
            <input type="radio" name="new_status_type" value="image" style="display:none;">
            🖼️ Image & Notes
          </label>
          <label class="status-type-select-chip" data-type="video">
            <input type="radio" name="new_status_type" value="video" style="display:none;">
            📹 Vidéo Express
          </label>
        </div>

        <div class="form-group" style="margin-bottom: 14px;">
          <textarea id="new-status-text" class="form-control" rows="3" placeholder="Écrivez votre statut en anglais (ex: une question de vocabulaire, une phrase que vous pratiquez...)" required style="resize: vertical;"></textarea>
        </div>

        <!-- Optional fields based on chosen type -->
        <div id="extra-media-field-wrap" style="display: none; margin-bottom: 14px;">
          <input type="text" id="new-media-title" class="form-control" placeholder="Titre ou transcription de l'enregistrement..." style="font-size: 0.9rem;">
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div style="font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; gap: 8px;">
            <span>ℹ️ Visible par les membres de votre niveau et du monde entier.</span>
          </div>
          <button type="submit" class="btn btn-primary" style="padding: 10px 22px; font-weight: 800;">
            <span>🚀</span> Publier mon Statut
          </button>
        </div>
      </form>
    `;

    // Close button
    const closeBtn = card.querySelector('#btn-close-create-status');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        card.style.display = 'none';
      });
    }

    // Type chips selection
    card.querySelectorAll('.status-type-select-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        card.querySelectorAll('.status-type-select-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const radio = chip.querySelector('input');
        if (radio) radio.checked = true;

        const extraWrap = card.querySelector('#extra-media-field-wrap');
        const mediaInput = card.querySelector('#new-media-title');
        const val = radio.value;

        if (extraWrap && mediaInput) {
          if (val === 'audio') {
            extraWrap.style.display = 'block';
            mediaInput.placeholder = "Phrase que vous prononcez pour la note vocale...";
          } else if (val === 'video') {
            extraWrap.style.display = 'block';
            mediaInput.placeholder = "Thème de votre capsule vidéo d'expression...";
          } else if (val === 'image') {
            extraWrap.style.display = 'block';
            mediaInput.placeholder = "Légende de votre photo ou fiche de révision...";
          } else {
            extraWrap.style.display = 'none';
          }
        }
      });
    });

    // Form submission
    const form = card.querySelector('#form-publish-status');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const text = card.querySelector('#new-status-text').value.trim();
        const typeRadio = card.querySelector('input[name="new_status_type"]:checked');
        const type = typeRadio ? typeRadio.value : 'text';
        const extraTitle = (card.querySelector('#new-media-title') ? card.querySelector('#new-media-title').value.trim() : '') || 'Pratique Anglaise';

        if (!text) return;

        const currentName = localStorage.getItem('eb_user_name') || 'Alex Rivera';
        const currentLevel = localStorage.getItem('eb_user_level') || 'B1';

        const newStatus = {
          id: 'status_' + Date.now(),
          author: {
            name: currentName,
            flag: '🇪🇸',
            avatar: '../assets/avatars/alex.jpg',
            level: currentLevel,
            title: currentLevel === 'B1' ? 'Intermediate' : 'Learner'
          },
          type: type,
          timeAgo: 'À l\'instant',
          content: text,
          likes: 1,
          dislikes: 0,
          userReaction: 'like',
          comments: []
        };

        if (type === 'audio') {
          newStatus.audioData = {
            duration: '0:20',
            title: extraTitle,
            speechText: text
          };
        } else if (type === 'video') {
          newStatus.videoData = {
            thumbnail: '../assets/images/conversation-mentor.jpg',
            duration: '0:35',
            title: extraTitle,
            captions: text
          };
        } else if (type === 'image') {
          newStatus.imageData = {
            url: '../assets/images/conversation-students.jpg',
            alt: extraTitle,
            caption: extraTitle
          };
        } else {
          newStatus.textTags = ['#MyEnglishProgress', '#DailySpeaking'];
        }

        // Add to front of list
        statuses.unshift(newStatus);
        saveStatuses();

        if (window.SoundFX && typeof window.SoundFX.playSuccess === 'function') {
          window.SoundFX.playSuccess();
        }
        if (window.showToast) {
          window.showToast('🎉 Votre statut a été publié avec succès !', 'English Booster Feed', 'success', 2500);
        }

        // Reset & hide form
        card.querySelector('#new-status-text').value = '';
        card.style.display = 'none';

        // Re-render feed
        renderStatuses();
      });
    }
  }

  // Utility to escape HTML
  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Public Interface
  window.EB_Statuses = {
    init: function () {
      loadStatuses();
      initFilterButtons();
      initCreateStatus();
      renderStatuses();
    },
    openCreateModal: function (type) {
      const card = document.getElementById('create-status-card');
      if (card) {
        card.style.display = 'block';
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.EB_Statuses.init);
  } else {
    window.EB_Statuses.init();
  }
})();
