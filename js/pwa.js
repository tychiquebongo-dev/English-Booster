/**
 * ENGLISH BOOSTER — MULTI-DEVICE & PWA MANAGER (js/pwa.js)
 * Prise en charge Mobile, Ordinateur et Tablette :
 * - Installation PWA (Android, iOS, Windows, Mac, Tablettes)
 * - Détection dynamique de l'appareil
 * - Gestion du viewport mobile / safe areas (--vh / 100dvh)
 * - Bouton flottant et modale d'installation multi-plateforme
 */

(function () {
  'use strict';

  // 1. Calcul du viewport réel pour mobile & tablette (évite les bugs de barre d'adresse 100vh sur iOS/Android)
  function setRealViewportHeight() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined' && document.documentElement && document.documentElement.style) {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  }
  setRealViewportHeight();
  window.addEventListener('resize', setRealViewportHeight);
  window.addEventListener('orientationchange', () => {
    setTimeout(setRealViewportHeight, 200);
  });

  // 2. Détection du type d'appareil
  function getDeviceType() {
    const ua = navigator.userAgent || '';
    const width = window.innerWidth;

    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) || (width >= 768 && width <= 1024)) {
      return { type: 'tablet', label: 'Tablette 📟', icon: '📟', name: 'votre tablette' };
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua) || width < 768) {
      return { type: 'mobile', label: 'Mobile 📱', icon: '📱', name: 'votre smartphone' };
    }
    return { type: 'desktop', label: 'Ordinateur 💻', icon: '💻', name: 'votre ordinateur' };
  }

  // 3. Enregistrement du Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swPath = window.location.pathname.includes('/pages/') ? '../sw.js' : 'sw.js';
      navigator.serviceWorker.register(swPath)
        .then(reg => {
          console.log('✅ English Booster Service Worker actif:', reg.scope);
        })
        .catch(err => {
          console.warn('Service Worker non actif:', err);
        });
    });
  }

  // 4. Gestion de l'événement d'installation PWA
  let deferredPrompt = null;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallPromptWidget();
  });

  // Afficher le widget / bouton d'installation flottant
  function showInstallPromptWidget() {
    if (isStandalone) return; // Déjà installée
    if (document.getElementById('pwa-install-trigger')) return;

    const device = getDeviceType();

    const installBadge = document.createElement('div');
    installBadge.id = 'pwa-install-trigger';
    installBadge.className = 'pwa-install-badge';
    installBadge.innerHTML = `
      <button type="button" class="btn-pwa-floating" id="btn-open-install-modal" title="Installer English Booster sur ${device.name}">
        <span class="pwa-floating-icon">${device.icon}</span>
        <span class="pwa-floating-text">Installer l'App</span>
        <span class="pwa-badge-pulse"></span>
      </button>
    `;
    document.body.appendChild(installBadge);

    const btn = installBadge.querySelector('#btn-open-install-modal');
    btn.addEventListener('click', openInstallModal);
  }

  // Modale d'installation multi-plateforme
  function openInstallModal() {
    let modal = document.getElementById('pwa-install-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'pwa-install-modal';
      modal.className = 'pwa-modal-overlay';
      document.body.appendChild(modal);
    }

    const device = getDeviceType();
    const logoSrc = window.location.pathname.includes('/pages/') ? '../assets/images/logo.svg' : 'assets/images/logo.svg';

    let instructionsHTML = '';
    if (isIOS) {
      instructionsHTML = `
        <div class="install-step-box">
          <div class="install-step-row">
            <span class="step-num">1</span>
            <span>Appuyez sur le bouton de partage <strong>Partager (⎋)</strong> dans Safari en bas de votre écran.</span>
          </div>
          <div class="install-step-row">
            <span class="step-num">2</span>
            <span>Faites défiler et sélectionnez <strong>"Sur l'écran d'accueil" (➕)</strong>.</span>
          </div>
          <div class="install-step-row">
            <span class="step-num">3</span>
            <span>Appuyez sur <strong>Ajouter</strong> en haut à droite. Profitez d'une expérience fluide sans barre d'adresse !</span>
          </div>
        </div>
      `;
    } else {
      instructionsHTML = `
        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.55; margin-bottom: 20px;">
          Installez English Booster sur <strong>${device.name}</strong> pour lancer l'application en 1 clic directement depuis votre bureau ou écran d'accueil, avec des notifications d'appel et un accès hors ligne ultra rapide.
        </p>
        <button type="button" class="btn btn-primary btn-lg" id="btn-direct-install-pwa" style="width: 100%; justify-content: center; font-weight: 800; box-shadow: 0 4px 20px rgba(74, 222, 128, 0.4);">
          <span>📲</span> Installer Directement l'Application
        </button>
      `;
    }

    modal.innerHTML = `
      <div class="pwa-modal-backdrop"></div>
      <div class="pwa-modal-card">
        <button type="button" class="btn-close-pwa-modal" id="btn-close-pwa">&times;</button>
        
        <div style="text-align: center; margin-bottom: 20px;">
          <div class="pwa-modal-logo-wrap">
            <img src="${logoSrc}" alt="English Booster Logo" class="pwa-modal-logo" />
          </div>
          <span class="crystal-badge" style="margin-top: 10px;">Application Multi-Appareils</span>
          <h2 style="font-size: 1.6rem; margin-top: 10px; line-height: 1.3;">
            Installer English Booster sur ${device.label}
          </h2>
          <div class="pwa-device-compat-row">
            <span class="compat-tag active">📱 Mobile</span>
            <span class="compat-tag active">💻 Ordinateur</span>
            <span class="compat-tag active">📟 Tablette</span>
          </div>
        </div>

        ${instructionsHTML}

        <div class="pwa-features-list">
          <div class="pwa-feat-item">⚡ Lancement instantané & navigation ultra fluide</div>
          <div class="pwa-feat-item">🎙️ Appels 1-to-1 en plein écran sans distraction</div>
          <div class="pwa-feat-item">🎬 Vidéos Shorts 9:16 en mode natif autonome</div>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    const closeBtn = modal.querySelector('#btn-close-pwa');
    const backdrop = modal.querySelector('.pwa-modal-backdrop');
    function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    const directBtn = modal.querySelector('#btn-direct-install-pwa');
    if (directBtn) {
      directBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          console.log('Installation outcome:', outcome);
          deferredPrompt = null;
          closeModal();
          const trigger = document.getElementById('pwa-install-trigger');
          if (trigger) trigger.remove();
        } else {
          // Instructions manuelles si prompt déjà consommé
          alert('Pour installer l\'application sur votre navigateur, cliquez sur l\'icône "Installer English Booster" (petit écran avec flèche) dans la barre d\'adresse en haut à droite !');
        }
      });
    }
  }

  // Afficher le widget après quelques secondes même si beforeinstallprompt n'est pas encore émis
  setTimeout(() => {
    showInstallPromptWidget();
  }, 2500);

  // API Publique
  window.EB_PWA = {
    getDeviceType: getDeviceType,
    openInstallModal: openInstallModal
  };
})();
