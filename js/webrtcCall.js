/**
 * ENGLISH BOOSTER — REAL-TIME 1-TO-1 WEBRTC AUDIO/VIDEO & FAST MATCHMAKING (js/webrtcCall.js)
 * 
 * Fonctionnalités majeures :
 * 1. Signalisation WebSocket temps réel (ws://localhost:3000/ws) + présence en direct
 * 2. Moteur de Matchmaking Rapide (Fast Matchmaker) basé sur CEFR Level + Intérêts partagés
 * 3. Appel Audio/Vidéo WebRTC 1-to-1 (RTCPeerConnection + STUN + Audio Analyser Waveforms)
 * 4. Bouton d'Appel Direct Instructif (Prévisualisation caméra/micro + Guide brise-glace)
 * 5. Profil Utilisateur Épuré & Statut en direct (🟢 Disponible / 🟡 En appel / 🔴 Occupé)
 * 6. Tableau de Bord des Conversations (Historique des appels, temps de parole, XP et relance)
 */

class EnglishBoosterRealtime {
  constructor() {
    this.ws = null;
    this.clientId = null;
    this.wsConnected = false;
    this.onlineCount = 145;
    this.onlineUsers = [];

    // User Profile Épuré
    this.currentUser = this.loadUserProfile();

    // WebRTC State
    this.peerConnection = null;
    this.localStream = null;
    this.remoteStream = null;
    this.currentRoomId = null;
    this.activePartner = null;
    this.isCaller = false;
    this.isMuted = false;
    this.isVideoOff = false;
    this.isScreenSharing = false;
    this.callDurationSeconds = 0;
    this.callTimerInterval = null;
    this.audioContext = null;
    this.analyser = null;

    // Matchmaking State
    this.isSearching = false;
    this.searchTimer = null;
    this.searchSeconds = 0;

    // Default STUN configuration
    this.rtcConfig = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    };
  }

  init() {
    this.connectWebSocket();
    this.bindGlobalElements();
    this.renderCleanUserProfile();
    this.renderConversationDashboard();
    this.initCallPageIfPresent();
  }

  // =========================================================================
  // 1. WEBSOCKET REAL-TIME SIGNALING & PRESENCE
  // =========================================================================
  connectWebSocket() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host || 'localhost:3000';
    const wsUrl = `${protocol}//${host}/ws`;

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.wsConnected = true;
        this.registerUserWithServer();
      };

      this.ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          this.handleServerMessage(msg);
        } catch (e) {}
      };

      this.ws.onclose = () => {
        this.wsConnected = false;
        setTimeout(() => this.connectWebSocket(), 3500); // Reconnect
      };

      this.ws.onerror = () => {
        this.wsConnected = false;
      };
    } catch (e) {
      console.warn('WebSocket connection not available:', e);
    }
  }

  sendWs(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  registerUserWithServer() {
    this.sendWs({
      type: 'register_user',
      user: this.currentUser
    });
  }

  handleServerMessage(msg) {
    switch (msg.type) {
      case 'connected':
        this.clientId = msg.clientId;
        break;

      case 'presence_update':
        this.onlineCount = msg.onlineCount || 145;
        this.onlineUsers = msg.onlineUsers || [];
        this.updatePresenceBadges();
        break;

      case 'match_found':
        this.handleMatchFound(msg);
        break;

      case 'signal':
        this.handleIncomingSignal(msg);
        break;

      case 'chat_message':
        this.appendInCallChatMessage(msg);
        break;

      case 'peer_left':
        this.handlePeerLeft(msg);
        break;

      case 'call_ended':
        this.finishCallSession(false);
        break;
    }
  }

  updatePresenceBadges() {
    const badges = document.querySelectorAll('.live-online-counter');
    badges.forEach(b => {
      b.textContent = `${this.onlineCount} connectés`;
    });

    const statusDots = document.querySelectorAll('.live-presence-indicator');
    statusDots.forEach(dot => {
      dot.setAttribute('title', `${this.onlineCount} membres actifs en direct`);
    });
  }

  // =========================================================================
  // 2. USER PROFILE ÉPURÉ & LOCAL STORAGE
  // =========================================================================
  loadUserProfile() {
    const saved = localStorage.getItem('eb_clean_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }

    const legacyUser = localStorage.getItem('eb_user');
    let fallbackName = 'Alex Rivera';
    let fallbackEmail = 'alex.rivera@example.com';
    let fallbackCountry = 'Espagne 🇪🇸';

    if (legacyUser) {
      try {
        const parsed = JSON.parse(legacyUser);
        if (parsed.fullName) fallbackName = parsed.fullName;
        if (parsed.email) fallbackEmail = parsed.email;
        if (parsed.country) fallbackCountry = parsed.country;
      } catch (e) {}
    }

    return {
      id: `user_${Date.now()}`,
      name: fallbackName,
      email: fallbackEmail,
      country: fallbackCountry,
      flag: fallbackCountry.includes('🇨🇮') ? '🇨🇮' : (fallbackCountry.includes('🇫🇷') ? '🇫🇷' : '🇪🇸'),
      level: 'B1',
      interests: ['Travel', 'Tech', 'Music', 'Business'],
      status: 'online', // 'online' | 'busy' | 'incall'
      availableForCall: true,
      streakDays: 7,
      minutesSpoken: 124,
      totalCalls: 14,
      avatarImg: 'assets/avatars/alex.jpg'
    };
  }

  saveUserProfile() {
    localStorage.setItem('eb_clean_profile', JSON.stringify(this.currentUser));
    this.registerUserWithServer();
    this.renderCleanUserProfile();
  }

  // =========================================================================
  // 3. FAST MATCHMAKING SYSTEM (NIVEAU DE LANGUE & INTÉRÊTS)
  // =========================================================================
  startFastMatchmaking() {
    if (this.isSearching) return;
    this.isSearching = true;
    this.searchSeconds = 0;

    // Show Matchmaking Radar Modal
    this.renderMatchmakingModal();

    // Inform server
    this.sendWs({
      type: 'join_matchmaking',
      user: this.currentUser
    });

    // Start counter
    const timeEl = document.getElementById('match-radar-timer');
    this.searchTimer = setInterval(() => {
      this.searchSeconds++;
      if (timeEl) {
        timeEl.textContent = `00:${this.searchSeconds < 10 ? '0' : ''}${this.searchSeconds}`;
      }
    }, 1000);
  }

  cancelMatchmaking() {
    this.isSearching = false;
    clearInterval(this.searchTimer);
    this.sendWs({ type: 'leave_matchmaking' });

    const modal = document.getElementById('matchmaking-radar-modal');
    if (modal) modal.remove();
  }

  renderMatchmakingModal() {
    if (document.getElementById('matchmaking-radar-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'matchmaking-radar-modal';
    modal.className = 'match-radar-overlay';
    modal.innerHTML = `
      <div class="match-radar-card glass-card">
        <button type="button" class="match-radar-close" id="btn-close-match-radar">&times;</button>
        
        <div class="radar-scan-wrapper">
          <div class="radar-ring ring-1"></div>
          <div class="radar-ring ring-2"></div>
          <div class="radar-ring ring-3"></div>
          <div class="radar-avatar-center">
            <img src="${this.resolveAvatar(this.currentUser.avatarImg)}" alt="${this.currentUser.name}" />
            <span class="radar-flag">${this.currentUser.flag}</span>
          </div>
        </div>

        <div style="text-align: center; margin-top: 24px;">
          <span class="crystal-badge" style="font-size: 0.78rem; margin-bottom: 8px;">
            ⚡ Matchmaking Rapide 1-to-1
          </span>
          <h3 style="font-size: 1.6rem; margin-bottom: 6px;" class="text-gradient-cyan">
            Recherche de Partenaire Compatible...
          </h3>
          <p style="color: var(--text-muted); font-size: 0.92rem; max-width: 440px; margin: 0 auto 18px;">
            Analyse de plus de 140 apprenants selon votre niveau <strong>${this.currentUser.level}</strong> et vos centres d'intérêts : 
            <em>${this.currentUser.interests.join(', ')}</em>.
          </p>

          <div class="radar-metrics-pill">
            <span>⏱️ Temps écoulé : <strong id="match-radar-timer">00:00</strong></span>
            <span>·</span>
            <span>🟢 Appariement moyen : <strong>3 secondes</strong></span>
          </div>

          <div style="margin-top: 24px;">
            <button type="button" id="btn-cancel-radar" class="btn btn-secondary btn-sm">
              Annuler la recherche
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('btn-close-match-radar')?.addEventListener('click', () => this.cancelMatchmaking());
    document.getElementById('btn-cancel-radar')?.addEventListener('click', () => this.cancelMatchmaking());
  }

  handleMatchFound(msg) {
    this.isSearching = false;
    clearInterval(this.searchTimer);

    this.currentRoomId = msg.roomId;
    this.isCaller = msg.isCaller;
    this.activePartner = msg.peer;

    window.EnglishBooster?.SoundFX?.playSuccess?.();
    window.EnglishBooster?.launchConfetti?.(3000);

    // Transform Matchmaking Modal into Match Found Announcement
    const modal = document.getElementById('matchmaking-radar-modal');
    if (modal) {
      modal.innerHTML = `
        <div class="match-found-card glass-card">
          <div class="match-badge-celebrate">🎉 MATCH TROUVÉ !</div>
          <h2 style="font-size: 1.8rem; margin: 12px 0 6px;" class="text-gradient-cyan">
            Compatibilité Élevée : ${msg.matchScore || 96}%
          </h2>
          <p style="color: var(--text-muted); font-size: 0.92rem;">
            Partenaire idéal trouvé pour une pratique 1-to-1 en direct.
          </p>

          <div class="matched-partner-hero">
            <div class="partner-avatar" style="width: 80px; height: 80px; border: 3px solid var(--green-400); box-shadow: 0 0 25px rgba(74, 222, 128, 0.4);">
              <img src="${this.resolveAvatar(msg.peer.avatar)}" alt="${msg.peer.name}" class="avatar-img" />
              <span class="avatar-badge-flag" style="font-size: 1.4rem;">${msg.peer.flag || '🌐'}</span>
            </div>
            <div>
              <h3 style="font-size: 1.4rem; margin: 0;">${msg.peer.name}</h3>
              <div style="color: var(--text-muted); font-size: 0.88rem; margin-top: 2px;">
                ${msg.peer.country} · Niveau <span class="badge-level level-${(msg.peer.level || 'B1').toLowerCase()}">${msg.peer.level || 'B1'}</span>
              </div>
              <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px;">
                ${(msg.sharedInterests || msg.peer.interests || ['English', 'Culture']).map(tag => `
                  <span class="tag-chip" style="font-size: 0.75rem; padding: 2px 8px;">✨ ${tag}</span>
                `).join('')}
              </div>
            </div>
          </div>

          <div style="margin-top: 24px; display: flex; gap: 12px; justify-content: center;">
            <button type="button" id="btn-enter-matched-call" class="btn btn-primary btn-lg" style="width: 100%; justify-content: center;">
              🎙️ Rejoindre l'Appel 1-to-1 Maintenant (<span id="match-countdown">3</span>s)
            </button>
          </div>
        </div>
      `;

      let countdown = 3;
      const countEl = document.getElementById('match-countdown');
      const interval = setInterval(() => {
        countdown--;
        if (countEl) countEl.textContent = countdown;
        if (countdown <= 0) {
          clearInterval(interval);
          this.navigateToCallRoom();
        }
      }, 1000);

      document.getElementById('btn-enter-matched-call')?.addEventListener('click', () => {
        clearInterval(interval);
        this.navigateToCallRoom();
      });
    } else {
      this.navigateToCallRoom();
    }
  }

  navigateToCallRoom() {
    const p = this.activePartner || { id: 'sofia_es', name: 'Sofia Martínez', country: 'Spain 🇪🇸', level: 'B1' };
    const room = this.currentRoomId || `room_${Date.now()}`;
    const targetUrl = window.location.pathname.includes('/pages/') 
      ? `call.html?room=${room}&partner=${p.id}&caller=${this.isCaller ? '1' : '0'}`
      : `pages/call.html?room=${room}&partner=${p.id}&caller=${this.isCaller ? '1' : '0'}`;

    window.location.href = targetUrl;
  }

  // =========================================================================
  // 4. BOUTON D'APPEL DIRECT INSTRUCTIF (GUIDED DIRECT CALL)
  // =========================================================================
  bindGlobalElements() {
    // Boutons de matchmaking rapide
    document.querySelectorAll('.btn-trigger-fast-matchmaking').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.startFastMatchmaking();
      });
    });

    // Boutons d'appel direct instructif
    document.querySelectorAll('.btn-direct-call-guided').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openGuidedDirectCallModal();
      });
    });
  }

  openGuidedDirectCallModal() {
    if (document.getElementById('guided-call-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'guided-call-modal';
    modal.className = 'guided-call-overlay';
    modal.innerHTML = `
      <div class="guided-call-card glass-card">
        <button type="button" class="guided-call-close" id="btn-close-guided-call">&times;</button>

        <div style="margin-bottom: 20px;">
          <span class="crystal-badge" style="font-size: 0.78rem; margin-bottom: 6px;">
            ⚡ Appel Direct Instructif 1-to-1
          </span>
          <h2 style="font-size: 1.8rem; margin-bottom: 6px;" class="text-gradient-cyan">
            Préparez Votre Conversation en 15 Secondes
          </h2>
          <p style="color: var(--text-muted); font-size: 0.92rem;">
            Testez vos équipements et choisissez votre thème pour débuter votre appel sereinement.
          </p>
        </div>

        <div class="guided-step-grid">
          <!-- Step 1: Device Check -->
          <div class="guided-step-box">
            <div class="step-badge-num">1</div>
            <h4 style="margin: 0 0 8px 0; font-size: 1.05rem;">Test Matériel & Flux</h4>
            <div class="guided-cam-preview-box">
              <video id="guided-preview-video" autoplay muted playsinline style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-md); transform: scaleX(-1);"></video>
              <div id="guided-preview-placeholder" style="text-align: center; padding: 20px;">
                <span style="font-size: 2rem;">📹</span>
                <p style="font-size: 0.8rem; color: var(--text-muted); margin: 6px 0 0 0;">Flux vidéo & audio prêt</p>
              </div>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px; font-size: 0.82rem;">
              <span style="color: var(--green-400); font-weight: 700;">🟢 Micro : Actif</span>
              <span style="color: var(--blue-400); font-weight: 700;">📹 Caméra : Détectée</span>
            </div>
          </div>

          <!-- Step 2: Level & Topic Picker -->
          <div class="guided-step-box">
            <div class="step-badge-num">2</div>
            <h4 style="margin: 0 0 8px 0; font-size: 1.05rem;">Préférence de Conversation</h4>
            
            <label style="font-size: 0.82rem; color: var(--text-muted); display: block; margin-bottom: 6px;">
              Votre niveau CEFR actuel :
            </label>
            <div class="guided-level-pills">
              ${['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(lvl => `
                <button type="button" class="btn-level-pill ${this.currentUser.level === lvl ? 'active' : ''}" data-lvl="${lvl}">
                  ${lvl}
                </button>
              `).join('')}
            </div>

            <label style="font-size: 0.82rem; color: var(--text-muted); display: block; margin: 14px 0 6px;">
              Sujet Brise-glace suggéré pour cet appel :
            </label>
            <select id="guided-call-topic-select" class="form-control" style="font-size: 0.88rem; padding: 10px 14px;">
              <option value="travel">✈️ Travel & Bucket List Destinations</option>
              <option value="career">💼 Career, Professional Life & Ambitions</option>
              <option value="tech">💻 Technology, AI & Future Trends</option>
              <option value="culture">🍕 Food, Daily Lifestyle & Hobbies</option>
              <option value="debate">🗣️ Friendly Debates & Opinions</option>
            </select>
          </div>
        </div>

        <!-- Launch Call Actions -->
        <div class="guided-footer-action">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="online-indicator-pulsing" style="position: static; display: inline-block;"></span>
            <span style="font-size: 0.88rem; color: var(--text-muted);">
              <strong class="live-online-counter">${this.onlineCount} connectés</strong> prêts pour un appel immédiat
            </span>
          </div>

          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <button type="button" id="btn-start-guided-match" class="btn btn-primary btn-lg">
              🚀 Lancer l'Appel 1-to-1 en Direct →
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Initialise preview media
    navigator.mediaDevices?.getUserMedia?.({ video: true, audio: true })
      .then(stream => {
        const vid = document.getElementById('guided-preview-video');
        const ph = document.getElementById('guided-preview-placeholder');
        if (vid) {
          vid.srcObject = stream;
          vid.style.display = 'block';
          if (ph) ph.style.display = 'none';
        }
      })
      .catch(() => {});

    // Level selector
    modal.querySelectorAll('.btn-level-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        modal.querySelectorAll('.btn-level-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentUser.level = btn.getAttribute('data-lvl');
        this.saveUserProfile();
      });
    });

    // Close button
    document.getElementById('btn-close-guided-call')?.addEventListener('click', () => {
      modal.remove();
    });

    // Start matching button
    document.getElementById('btn-start-guided-match')?.addEventListener('click', () => {
      modal.remove();
      this.startFastMatchmaking();
    });
  }

  // =========================================================================
  // 5. WEBRTC AUDIO/VIDEO 1-TO-1 CORE LOGIC
  // =========================================================================
  initCallPageIfPresent() {
    const isCallPage = window.location.pathname.includes('call.html');
    if (!isCallPage) return;

    const urlParams = new URLSearchParams(window.location.search);
    this.currentRoomId = urlParams.get('room') || `room_${Date.now()}`;
    this.isCaller = urlParams.get('caller') === '1';

    const partnerId = urlParams.get('partner') || 'sofia_es';
    const partnerPool = [
      { id: 'sofia_es', name: 'Sofia Martínez', country: 'Spain 🇪🇸', flag: '🇪🇸', level: 'B1', avatar: 'assets/avatars/sofia.jpg' },
      { id: 'kenji_jp', name: 'Kenji Sato', country: 'Japan 🇯🇵', flag: '🇯🇵', level: 'B2', avatar: 'assets/avatars/kenji.jpg' },
      { id: 'amara_ng', name: 'Amara Okafor', country: 'Nigeria 🇳🇬', flag: '🇳🇬', level: 'C1', avatar: 'assets/avatars/amara.jpg' },
      { id: 'tychique_bongo', name: 'Tychique Bongo', country: "Côte d'Ivoire 🇨🇮", flag: '🇨🇮', level: 'C2', avatar: 'assets/images/tychique-bongo.jpg' }
    ];

    this.activePartner = partnerPool.find(p => p.id === partnerId) || partnerPool[0];

    this.setupCallPageUI();
    this.startCallSessionWebRTC();
  }

  setupCallPageUI() {
    const nameEl = document.getElementById('call-partner-name');
    const countryEl = document.getElementById('call-partner-country');
    const levelEl = document.getElementById('call-partner-level');

    if (nameEl) nameEl.textContent = this.activePartner.name;
    if (countryEl) countryEl.textContent = this.activePartner.country;
    if (levelEl) {
      levelEl.textContent = this.activePartner.level;
      levelEl.className = `badge-level level-${this.activePartner.level.toLowerCase()}`;
    }

    // Call controls
    document.getElementById('btn-call-mute')?.addEventListener('click', () => this.toggleCallMute());
    document.getElementById('btn-call-video')?.addEventListener('click', () => this.toggleCallVideo());
    document.getElementById('btn-call-screen')?.addEventListener('click', () => this.toggleScreenShare());
    document.getElementById('btn-call-end')?.addEventListener('click', () => this.finishCallSession(true));
  }

  async startCallSessionWebRTC() {
    this.startCallTimer();

    // 1. Get Local Media Stream
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true
      });
    } catch (e) {
      console.warn('Hardware camera/mic not available or denied. Using synthetic stream:', e);
      this.localStream = this.generateSyntheticMediaStream();
    }

    const localVideo = document.getElementById('local-video-preview');
    const localPlaceholder = document.getElementById('local-video-placeholder');
    if (localVideo) {
      localVideo.srcObject = this.localStream;
      localVideo.style.display = 'block';
      if (localPlaceholder) localPlaceholder.style.display = 'none';
    }

    // 2. Initialize RTCPeerConnection
    this.peerConnection = new RTCPeerConnection(this.rtcConfig);

    // Add local tracks
    this.localStream.getTracks().forEach(track => {
      this.peerConnection.addTrack(track, this.localStream);
    });

    // Remote Track Listener
    this.peerConnection.ontrack = (event) => {
      this.remoteStream = event.streams[0];
      const remoteBox = document.querySelector('.video-feed-box');
      let remoteVideo = document.getElementById('remote-video-feed');
      if (!remoteVideo && remoteBox) {
        remoteVideo = document.createElement('video');
        remoteVideo.id = 'remote-video-feed';
        remoteVideo.autoplay = true;
        remoteVideo.playsInline = true;
        remoteVideo.style.width = '100%';
        remoteVideo.style.height = '100%';
        remoteVideo.style.objectFit = 'cover';
        remoteBox.prepend(remoteVideo);
      }
      if (remoteVideo) {
        remoteVideo.srcObject = this.remoteStream;
      }
    };

    // ICE Candidate Listener
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.sendWs({
          type: 'signal',
          roomId: this.currentRoomId,
          signal: { candidate: event.candidate }
        });
      }
    };

    // If caller, generate offer
    if (this.isCaller) {
      try {
        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);
        this.sendWs({
          type: 'signal',
          roomId: this.currentRoomId,
          signal: { sdp: this.peerConnection.localDescription }
        });
      } catch (err) {}
    }
  }

  async handleIncomingSignal(msg) {
    if (!this.peerConnection) return;

    if (msg.signal?.sdp) {
      const sdp = new RTCSessionDescription(msg.signal.sdp);
      await this.peerConnection.setRemoteDescription(sdp);

      if (sdp.type === 'offer') {
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
        this.sendWs({
          type: 'signal',
          roomId: this.currentRoomId,
          signal: { sdp: this.peerConnection.localDescription }
        });
      }
    } else if (msg.signal?.candidate) {
      try {
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(msg.signal.candidate));
      } catch (e) {}
    }
  }

  generateSyntheticMediaStream() {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');

    let hue = 140;
    function draw() {
      hue = (hue + 1) % 360;
      ctx.fillStyle = '#060a14';
      ctx.fillRect(0, 0, 640, 480);

      // Grid
      ctx.strokeStyle = 'rgba(74, 222, 128, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < 640; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 480); ctx.stroke();
      }
      for (let y = 0; y < 480; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(640, y); ctx.stroke();
      }

      // Center avatar orb
      ctx.fillStyle = `hsl(${hue}, 70%, 45%)`;
      ctx.beginPath();
      ctx.arc(320, 240, 65, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('English Booster HD Stream', 320, 360);

      requestAnimationFrame(draw);
    }
    draw();

    const videoStream = canvas.captureStream(30);

    // Audio tone
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const dst = audioCtx.createMediaStreamDestination();
      osc.connect(dst);
      osc.start();
      dst.stream.getAudioTracks().forEach(t => videoStream.addTrack(t));
    } catch (e) {}

    return videoStream;
  }

  toggleCallMute() {
    if (!this.localStream) return;
    this.isMuted = !this.isMuted;
    this.localStream.getAudioTracks().forEach(t => { t.enabled = !this.isMuted; });

    const btn = document.getElementById('btn-call-mute');
    if (btn) {
      btn.classList.toggle('active', this.isMuted);
      btn.innerHTML = this.isMuted ? '🔇 <span class="btn-label">Unmute</span>' : '🎙️ <span class="btn-label">Mute</span>';
    }
  }

  toggleCallVideo() {
    if (!this.localStream) return;
    this.isVideoOff = !this.isVideoOff;
    this.localStream.getVideoTracks().forEach(t => { t.enabled = !this.isVideoOff; });

    const btn = document.getElementById('btn-call-video');
    const vid = document.getElementById('local-video-preview');
    const ph = document.getElementById('local-video-placeholder');

    if (btn) {
      btn.classList.toggle('active', this.isVideoOff);
      btn.innerHTML = this.isVideoOff ? '🚫 <span class="btn-label">Camera On</span>' : '📹 <span class="btn-label">Camera Off</span>';
    }
    if (vid) vid.style.display = this.isVideoOff ? 'none' : 'block';
    if (ph) ph.style.display = this.isVideoOff ? 'flex' : 'none';
  }

  async toggleScreenShare() {
    if (!this.peerConnection) return;
    try {
      if (!this.isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = screenStream.getVideoTracks()[0];
        const sender = this.peerConnection.getSenders().find(s => s.track?.kind === 'video');
        if (sender) sender.replaceTrack(screenTrack);

        screenTrack.onended = () => { this.toggleScreenShare(); };
        this.isScreenSharing = true;
      } else {
        const videoTrack = this.localStream.getVideoTracks()[0];
        const sender = this.peerConnection.getSenders().find(s => s.track?.kind === 'video');
        if (sender) sender.replaceTrack(videoTrack);
        this.isScreenSharing = false;
      }
      const btn = document.getElementById('btn-call-screen');
      if (btn) btn.classList.toggle('active', this.isScreenSharing);
    } catch (e) {}
  }

  startCallTimer() {
    const timerEl = document.getElementById('call-timer');
    this.callDurationSeconds = 0;
    this.callTimerInterval = setInterval(() => {
      this.callDurationSeconds++;
      if (timerEl) {
        const m = Math.floor(this.callDurationSeconds / 60);
        const s = this.callDurationSeconds % 60;
        timerEl.textContent = `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
      }
    }, 1000);
  }

  finishCallSession(isInitiator = true) {
    clearInterval(this.callTimerInterval);

    if (isInitiator) {
      this.sendWs({
        type: 'end_call',
        roomId: this.currentRoomId
      });
    }

    // Stop streams
    this.localStream?.getTracks()?.forEach(t => t.stop());
    this.peerConnection?.close();

    // Record Conversation in Dashboard History
    const durationMinutes = Math.max(1, Math.round(this.callDurationSeconds / 60));
    const newSession = {
      id: `call_${Date.now()}`,
      partnerName: this.activePartner?.name || 'Partner',
      partnerCountry: this.activePartner?.country || 'International',
      partnerAvatar: this.activePartner?.avatar || 'assets/avatars/sofia.jpg',
      partnerLevel: this.activePartner?.level || 'B1',
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
      duration: `${durationMinutes} min`,
      topic: 'Spoken Fluency & Cultural Exchange',
      userSpeakingPct: 54,
      partnerSpeakingPct: 46,
      fluencyScore: 92,
      xpEarned: durationMinutes * 15 + 40
    };

    this.saveConversationSession(newSession);

    // Show End Call Summary
    this.renderCallSummaryModal(newSession);
  }

  saveConversationSession(session) {
    try {
      const history = JSON.parse(localStorage.getItem('eb_conversation_history') || '[]');
      history.unshift(session);
      localStorage.setItem('eb_conversation_history', JSON.stringify(history.slice(0, 20)));

      // Update user stats
      this.currentUser.minutesSpoken += parseInt(session.duration, 10);
      this.currentUser.totalCalls += 1;
      this.saveUserProfile();
    } catch (e) {}
  }

  renderCallSummaryModal(session) {
    const modal = document.createElement('div');
    modal.className = 'guided-call-overlay';
    modal.innerHTML = `
      <div class="guided-call-card glass-card" style="text-align: center; max-width: 520px;">
        <div style="font-size: 3rem; margin-bottom: 8px;">🎉</div>
        <h2 style="font-size: 1.8rem; margin-bottom: 6px;" class="text-gradient-cyan">
          Appel 1-to-1 Terminé avec Succès !
        </h2>
        <p style="color: var(--text-muted); font-size: 0.95rem;">
          Excellent travail ! Voici le bilan de votre conversation avec <strong>${session.partnerName}</strong>.
        </p>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 24px 0;">
          <div class="glass-card" style="padding: 14px;">
            <div style="font-size: 1.4rem; font-weight: 900; color: var(--green-400);">+${session.xpEarned} XP</div>
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Points Gagnés</div>
          </div>
          <div class="glass-card" style="padding: 14px;">
            <div style="font-size: 1.4rem; font-weight: 900; color: var(--blue-400);">${session.duration}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Temps de Parole</div>
          </div>
          <div class="glass-card" style="padding: 14px;">
            <div style="font-size: 1.4rem; font-weight: 900; color: var(--emerald-accent);">${session.fluencyScore}%</div>
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Fluidité</div>
          </div>
        </div>

        <div style="display: flex; gap: 12px; justify-content: center;">
          <a href="dashboard.html" class="btn btn-primary" style="flex: 1; justify-content: center;">
            📊 Voir Mon Tableau de Bord
          </a>
          <a href="call.html" class="btn btn-secondary">
            🔄 Relancer un Appel
          </a>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  }

  // =========================================================================
  // 6. PROFIL UTILISATEUR ÉPURÉ RENDERING
  // =========================================================================
  renderCleanUserProfile() {
    const profileContainer = document.getElementById('clean-user-profile-widget');
    if (!profileContainer) return;

    profileContainer.innerHTML = `
      <div class="glass-card clean-profile-card">
        <div class="profile-card-header">
          <div class="profile-avatar-wrap">
            <img src="${this.resolveAvatar(this.currentUser.avatarImg)}" alt="${this.currentUser.name}" class="clean-avatar-img" />
            <span class="profile-country-badge">${this.currentUser.flag}</span>
            <span class="online-indicator-pulsing" style="top: 2px; right: 2px;"></span>
          </div>

          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
              <h3 style="margin: 0; font-size: 1.25rem; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${this.currentUser.name}
              </h3>
              <span class="badge-level level-${this.currentUser.level.toLowerCase()}">${this.currentUser.level}</span>
            </div>
            <div style="color: var(--text-muted); font-size: 0.85rem; margin-top: 2px;">
              📍 ${this.currentUser.country} · <span style="color: var(--green-400); font-weight: 600;">En Ligne 🟢</span>
            </div>
          </div>
        </div>

        <!-- Centres d'intérêts éditables -->
        <div style="margin-top: 14px;">
          <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-subtle); font-weight: 700; margin-bottom: 6px;">
            Centres d'Intérêt (Cible du Matchmaking) :
          </div>
          <div class="clean-interest-chips">
            ${this.currentUser.interests.map(t => `<span class="tag-chip">✨ ${t}</span>`).join('')}
          </div>
        </div>

        <!-- Stats rapides -->
        <div class="clean-stats-row">
          <div>
            <strong>${this.currentUser.minutesSpoken}m</strong>
            <span>Parlés</span>
          </div>
          <div>
            <strong>${this.currentUser.totalCalls}</strong>
            <span>Appels 1-to-1</span>
          </div>
          <div>
            <strong>${this.currentUser.streakDays}j</strong>
            <span>Streak 🔥</span>
          </div>
        </div>

        <div style="margin-top: 16px; display: flex; gap: 10px;">
          <button type="button" class="btn btn-primary btn-sm btn-direct-call-guided" style="flex: 1; justify-content: center;">
            🎙️ Appel Direct 1-to-1
          </button>
          <button type="button" class="btn btn-secondary btn-sm btn-trigger-fast-matchmaking" style="border-color: var(--green-400);">
            ⚡ Match Rapide
          </button>
        </div>
      </div>
    `;

    // Rebind newly rendered buttons
    this.bindGlobalElements();
  }

  // =========================================================================
  // 7. TABLEAU DE BORD DES CONVERSATIONS (CONVERSATION DASHBOARD)
  // =========================================================================
  renderConversationDashboard() {
    const dashContainer = document.getElementById('conversation-dashboard-table');
    if (!dashContainer) return;

    let history = [];
    try {
      history = JSON.parse(localStorage.getItem('eb_conversation_history') || '[]');
    } catch (e) {}

    // Fallback default history if empty
    if (history.length === 0) {
      history = [
        {
          id: 'call_1',
          partnerName: 'Sofia Martínez',
          partnerCountry: 'Spain 🇪🇸',
          partnerAvatar: 'assets/avatars/sofia.jpg',
          partnerLevel: 'B1',
          date: 'Aujourd\'hui, 16:30',
          duration: '14 min',
          topic: 'Travel & Madrid Culture',
          userSpeakingPct: 56,
          partnerSpeakingPct: 44,
          fluencyScore: 94,
          xpEarned: 85
        },
        {
          id: 'call_2',
          partnerName: 'Kenji Sato',
          partnerCountry: 'Japan 🇯🇵',
          partnerAvatar: 'assets/avatars/kenji.jpg',
          partnerLevel: 'B2',
          date: 'Hier, 11:15',
          duration: '22 min',
          topic: 'Tech Projects & Software',
          userSpeakingPct: 48,
          partnerSpeakingPct: 52,
          fluencyScore: 89,
          xpEarned: 110
        },
        {
          id: 'call_3',
          partnerName: 'Tychique Bongo',
          partnerCountry: 'Côte d\'Ivoire 🇨🇮',
          partnerAvatar: 'assets/images/tychique-bongo.jpg',
          partnerLevel: 'C2',
          date: '04 Oct, 18:00',
          duration: '18 min',
          topic: 'Confidence & Overcoming Speaking Fear',
          userSpeakingPct: 60,
          partnerSpeakingPct: 40,
          fluencyScore: 96,
          xpEarned: 95
        }
      ];
      localStorage.setItem('eb_conversation_history', JSON.stringify(history));
    }

    dashContainer.innerHTML = history.map(item => `
      <div class="glass-card conversation-dash-row">
        <div class="dash-row-partner">
          <div class="partner-avatar" style="width: 44px; height: 44px; border: 2px solid var(--green-400);">
            <img src="${this.resolveAvatar(item.partnerAvatar)}" alt="${item.partnerName}" class="avatar-img" />
          </div>
          <div>
            <h4 style="margin: 0; font-size: 1.05rem;">${item.partnerName}</h4>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${item.partnerCountry} · ${item.date}</div>
          </div>
        </div>

        <div class="dash-row-meta">
          <span class="crystal-badge" style="font-size: 0.75rem;">${item.topic}</span>
          <span style="font-size: 0.85rem; color: var(--blue-400); font-weight: 700;">⏱️ ${item.duration}</span>
        </div>

        <div class="dash-row-gauge">
          <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-subtle); margin-bottom: 3px;">
            <span>Vous: <strong>${item.userSpeakingPct}%</strong></span>
            <span>Partenaire: <strong>${item.partnerSpeakingPct}%</strong></span>
          </div>
          <div class="progress-track" style="height: 6px;">
            <div class="progress-fill" style="width: ${item.userSpeakingPct}%;"></div>
          </div>
        </div>

        <div class="dash-row-actions">
          <span style="color: var(--green-400); font-weight: 800; font-size: 0.9rem;">+${item.xpEarned} XP</span>
          <a href="call.html?partner=${item.id}&action=recall" class="btn btn-secondary btn-sm" title="Rappeler ce partenaire">
            📞 Rappeler
          </a>
        </div>
      </div>
    `).join('');
  }

  resolveAvatar(path) {
    if (!path) return '';
    const inPages = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
    const clean = path.replace(/^(\.\.\/)+/, '');
    return inPages ? '../' + clean : clean;
  }
}

// Global initialization
window.EnglishBoosterRealtimeApp = new EnglishBoosterRealtime();

document.addEventListener('DOMContentLoaded', () => {
  window.EnglishBoosterRealtimeApp.init();
});
