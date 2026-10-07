/**
 * ENGLISH BOOSTER — AVATAR & PROFILE PHOTO MANAGER (js/avatarManager.js)
 * Permet à chaque utilisateur :
 * 1. De choisir ou d'importer une photo de profil lors de son inscription
 * 2. De changer sa photo de profil à tout moment depuis son profil, son dashboard ou la navbar
 * 3. Supporte l'upload d'image locale (galerie, caméra, fichiers) avec compression automatique Canvas
 * 4. Fournit une galerie de 7 avatars internationaux pré-sélectionnés en haute qualité
 * 5. Synchronise la photo sur l'ensemble de l'application (localStorage, inscrits, dashboard, navbar)
 */

(function () {
  'use strict';

  function resolvePath(path) {
    if (!path) return '';
    if (path.startsWith('data:') || path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    const inPages = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
    const clean = path.replace(/^(\.\.\/)+/, '');
    return inPages ? '../' + clean : clean;
  }

  const PRESET_AVATARS = [
    { id: 'alex', name: 'Alex Rivera', src: 'assets/avatars/alex.jpg', flag: '🇪🇸', country: 'Espagne' },
    { id: 'sofia', name: 'Sofia Martínez', src: 'assets/avatars/sofia.jpg', flag: '🇪🇸', country: 'Espagne' },
    { id: 'kenji', name: 'Kenji Sato', src: 'assets/avatars/kenji.jpg', flag: '🇯🇵', country: 'Japon' },
    { id: 'amara', name: 'Amara Okafor', src: 'assets/avatars/amara.jpg', flag: '🇳🇬', country: 'Nigeria' },
    { id: 'lucas', name: 'Lucas Weber', src: 'assets/avatars/lucas.jpg', flag: '🇩🇪', country: 'Allemagne' },
    { id: 'chloe', name: 'Chloé Dubois', src: 'assets/avatars/chloe.jpg', flag: '🇫🇷', country: 'France' },
    { id: 'tychique', name: 'Tychique Bongo', src: 'assets/images/tychique-bongo.jpg', flag: '🇨🇮', country: "Côte d'Ivoire" }
  ];

  class AvatarManager {
    constructor() {
      this.currentAvatar = this.getStoredAvatar();
      this.modal = null;
    }

    getStoredAvatar() {
      const user = window.EnglishBooster && window.EnglishBooster.currentUser;
      if (user && user.avatar) return user.avatar;
      const stored = localStorage.getItem('eb_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.avatar) return parsed.avatar;
        } catch (e) {}
      }
      return 'assets/avatars/alex.jpg';
    }

    getPresets() {
      return PRESET_AVATARS;
    }

    /**
     * Met à jour la photo de profil de l'utilisateur actif
     */
    setAvatar(avatarData, notify = true) {
      if (!avatarData) return;
      this.currentAvatar = avatarData;

      // 1. Mettre à jour l'utilisateur courant
      if (window.EnglishBooster && window.EnglishBooster.updateUserState) {
        window.EnglishBooster.updateUserState({ avatar: avatarData });
      } else {
        const stored = localStorage.getItem('eb_user');
        let user = stored ? JSON.parse(stored) : {};
        user.avatar = avatarData;
        localStorage.setItem('eb_user', JSON.stringify(user));
      }

      // 2. Mettre à jour dans la liste des membres inscrits si présent
      this.syncWithRegisteredMembers(avatarData);

      // 3. Mettre à jour tous les éléments d'avatar visibles sur la page
      this.updateDOMElements(avatarData);

      // 4. Événement global
      window.dispatchEvent(new CustomEvent('eb_avatar_changed', {
        detail: { avatar: avatarData }
      }));

      // 5. Feedback visuel et sonore
      if (notify && window.EnglishBooster) {
        const isFr = (localStorage.getItem('eb_lang') || 'fr') === 'fr';
        if (window.EnglishBooster.showToast) {
          window.EnglishBooster.showToast(
            isFr ? '🎉 Photo de profil mise à jour !' : '🎉 Profile photo updated!',
            isFr ? 'Votre nouvelle photo est visible sur toute la plateforme.' : 'Your new photo is now visible across the entire platform.',
            'success',
            3000
          );
        }
        if (window.EnglishBooster.SoundFX) {
          window.EnglishBooster.SoundFX.playSuccess();
        }
        if (window.EnglishBooster.launchConfetti) {
          window.EnglishBooster.launchConfetti(2200);
        }
      }
    }

    syncWithRegisteredMembers(avatarData) {
      try {
        const stored = localStorage.getItem('eb_registered_users');
        if (stored) {
          const members = JSON.parse(stored);
          const currentUser = window.EnglishBooster?.currentUser;
          const userEmail = (currentUser?.email || 'alex.rivera@example.com').toLowerCase();

          let updated = false;
          members.forEach(m => {
            if (m.email && m.email.toLowerCase() === userEmail) {
              m.avatarImg = avatarData;
              updated = true;
            }
          });

          if (updated) {
            localStorage.setItem('eb_registered_users', JSON.stringify(members));
            // Si la page des inscrits est active, demander le rafraîchissement
            if (window.EnglishBoosterApp && window.EnglishBoosterApp.loadMembers) {
              window.EnglishBoosterApp.loadMembers();
              window.EnglishBoosterApp.renderMembers(window.EnglishBoosterApp.members);
            }
          }
        }
      } catch (e) {
        console.error('Error syncing avatar with registered members', e);
      }
    }

    updateDOMElements(avatarData) {
      const resolved = resolvePath(avatarData);

      // Images spécifiques au profil
      document.querySelectorAll('#prof-avatar-img, #dash-avatar-img, .current-user-avatar-img').forEach(img => {
        img.src = resolved;
      });

      // Puce de profil dans la navigation
      document.querySelectorAll('.nav-profile-chip img, .partner-avatar.active img, .nav-actions .partner-avatar img').forEach(img => {
        img.src = resolved;
      });
    }

    /**
     * Traite un fichier image depuis un input file (galerie/caméra) avec compression Canvas
     */
    processUploadedFile(file, callback) {
      if (!file || !file.type.startsWith('image/')) {
        if (window.EnglishBooster?.showToast) {
          window.EnglishBooster.showToast('Format non supporté', 'Veuillez sélectionner un fichier image valide (JPG, PNG, WebP).', 'error');
        }
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Redimensionnement fluide max 400x400 pour un format carré net et optimisé
          const canvas = document.createElement('canvas');
          const maxDim = 400;
          let width = img.width;
          let height = img.height;

          // Cadrage au format carré
          const minDim = Math.min(width, height);
          const startX = (width - minDim) / 2;
          const startY = (height - minDim) / 2;

          canvas.width = maxDim;
          canvas.height = maxDim;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, maxDim, maxDim);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          callback(compressedDataUrl);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    /**
     * Crée le composant de sélection d'avatar pour les formulaires d'inscription
     */
    renderFormPicker(containerId, options = {}) {
      const container = document.getElementById(containerId);
      if (!container) return;

      const isFr = (localStorage.getItem('eb_lang') || 'fr') === 'fr';
      const initialAvatar = options.initialAvatar || this.currentAvatar || 'assets/avatars/alex.jpg';

      container.innerHTML = `
        <div class="avatar-picker-card glass-card" style="padding: 20px 24px; margin-bottom: 20px; border: 1.5px solid rgba(74, 222, 128, 0.45); background: linear-gradient(135deg, rgba(74, 222, 128, 0.08), rgba(96, 165, 250, 0.08)); border-radius: var(--radius-lg);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
            <label class="form-label" style="margin: 0; font-size: 1rem; font-weight: 700; color: #ffffff; display: flex; align-items: center; gap: 8px;">
              <span>📸</span>
              <span>${isFr ? 'Votre Photo de Profil' : 'Your Profile Photo'} <span style="color: var(--coral-accent);">*</span></span>
            </label>
            <span class="crystal-badge" style="font-size: 0.75rem;">
              ${isFr ? 'Obligatoire & Modifiable à tout moment' : 'Required & Editable anytime'}
            </span>
          </div>

          <div style="display: flex; align-items: center; gap: 24px; flex-wrap: wrap;">
            <!-- Aperçu de la photo sélectionnée -->
            <div style="position: relative; flex-shrink: 0;">
              <div class="partner-avatar" style="width: 80px; height: 80px; border: 3px solid var(--green-400); box-shadow: 0 0 25px rgba(74, 222, 128, 0.4);">
                <img src="${resolvePath(initialAvatar)}" alt="Aperçu Photo" id="${containerId}-preview-img" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />
                <span class="avatar-badge-flag" id="${containerId}-flag-badge" style="font-size: 1.3rem;">✨</span>
              </div>
            </div>

            <!-- Options : Upload ou Choix Rapide -->
            <div style="flex: 1; min-width: 240px;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; flex-wrap: wrap;">
                <label class="btn btn-primary btn-sm" style="cursor: pointer; display: inline-flex; align-items: center; gap: 6px; padding: 10px 16px; font-weight: 700;">
                  <span>📁</span> ${isFr ? 'Importer ma photo' : 'Upload my photo'}
                  <input type="file" id="${containerId}-file-input" accept="image/*" style="display: none;" />
                </label>
                <span style="font-size: 0.85rem; color: var(--text-muted);">
                  ${isFr ? 'ou choisissez parmi les avatars ci-dessous :' : 'or pick one below :'}
                </span>
              </div>

              <!-- Rangée d'avatars prédéfinis -->
              <div class="avatar-presets-strip" style="display: flex; gap: 10px; overflow-x: auto; padding-bottom: 6px;">
                ${PRESET_AVATARS.map((av, idx) => `
                  <button type="button" class="avatar-preset-btn ${av.src === initialAvatar ? 'active' : ''}" data-avatar="${av.src}" data-flag="${av.flag}" title="${av.name} (${av.country})" style="position: relative; width: 44px; height: 44px; border-radius: 50%; padding: 0; border: 2.5px solid ${av.src === initialAvatar ? 'var(--green-400)' : 'var(--glass-border)'}; cursor: pointer; transition: all var(--transition-fast); flex-shrink: 0; overflow: hidden; background: transparent;">
                    <img src="${resolvePath(av.src)}" alt="${av.name}" style="width: 100%; height: 100%; object-fit: cover;" />
                  </button>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Champ caché stockant la valeur de l'avatar sélectionné -->
          <input type="hidden" id="${containerId}-selected-val" value="${initialAvatar}" />
        </div>
      `;

      // Gestionnaires d'événements
      const previewImg = document.getElementById(`${containerId}-preview-img`);
      const flagBadge = document.getElementById(`${containerId}-flag-badge`);
      const hiddenInput = document.getElementById(`${containerId}-selected-val`);
      const fileInput = document.getElementById(`${containerId}-file-input`);
      const presetButtons = container.querySelectorAll('.avatar-preset-btn');

      // 1. Clic sur un avatar prédéfini
      presetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          presetButtons.forEach(b => {
            b.classList.remove('active');
            b.style.borderColor = 'var(--glass-border)';
            b.style.transform = 'scale(1)';
          });
          btn.classList.add('active');
          btn.style.borderColor = 'var(--green-400)';
          btn.style.transform = 'scale(1.12)';

          const chosenSrc = btn.getAttribute('data-avatar');
          const chosenFlag = btn.getAttribute('data-flag') || '✨';
          if (previewImg) previewImg.src = resolvePath(chosenSrc);
          if (flagBadge) flagBadge.textContent = chosenFlag;
          if (hiddenInput) hiddenInput.value = chosenSrc;

          if (window.EnglishBooster?.SoundFX) {
            window.EnglishBooster.SoundFX.playClick();
          }
        });
      });

      // 2. Upload de photo personnalisée
      fileInput?.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          this.processUploadedFile(file, (dataUrl) => {
            if (previewImg) previewImg.src = dataUrl;
            if (flagBadge) flagBadge.textContent = '📸';
            if (hiddenInput) hiddenInput.value = dataUrl;

            // Retirer l'état actif des presets
            presetButtons.forEach(b => {
              b.classList.remove('active');
              b.style.borderColor = 'var(--glass-border)';
              b.style.transform = 'scale(1)';
            });

            if (window.EnglishBooster?.showToast) {
              window.EnglishBooster.showToast(
                isFr ? 'Photo chargée !' : 'Photo loaded!',
                isFr ? 'Votre photo personnalisée a été préparée.' : 'Your custom photo is ready.',
                'success',
                2200
              );
            }
            if (window.EnglishBooster?.SoundFX) {
              window.EnglishBooster.SoundFX.playSuccess();
            }
          });
        }
      });
    }

    /**
     * Ouvre la fenêtre modale universelle pour changer sa photo de profil
     */
    openChangeAvatarModal() {
      const isFr = (localStorage.getItem('eb_lang') || 'fr') === 'fr';
      let modal = document.getElementById('modal-change-profile-avatar');

      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-change-profile-avatar';
        modal.className = 'shorts-modal-overlay';
        modal.style.cssText = 'position: fixed; inset: 0; background: rgba(3, 7, 18, 0.85); backdrop-filter: blur(16px); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px;';
        document.body.appendChild(modal);
      }

      const activeAvatar = this.currentAvatar || 'assets/avatars/alex.jpg';

      modal.innerHTML = `
        <div class="glass-card avatar-modal-card reveal-init" style="width: 100%; max-width: 520px; padding: 32px; border-radius: var(--radius-xl); border: 1.5px solid var(--green-400); box-shadow: 0 25px 70px rgba(0,0,0,0.6); position: relative; animation: modalPop 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
          <!-- Bouton Fermer -->
          <button type="button" id="btn-close-avatar-modal" style="position: absolute; top: 18px; right: 20px; font-size: 1.4rem; color: var(--text-muted); cursor: pointer; border: none; background: transparent;" title="Fermer">
            &times;
          </button>

          <div style="text-align: center; margin-bottom: 24px;">
            <span class="crystal-badge" style="margin-bottom: 8px;">
              <span>👤</span> ${isFr ? 'Profil Utilisateur' : 'User Profile'}
            </span>
            <h2 style="font-size: 1.8rem; margin: 6px 0;" class="text-gradient-cyan">
              ${isFr ? 'Changer Ma Photo de Profil' : 'Change My Profile Photo'}
            </h2>
            <p style="font-size: 0.92rem; color: var(--text-muted); margin: 0;">
              ${isFr ? 'Importez votre propre photo ou choisissez un avatar parmi nos membres internationaux.' : 'Upload your own photo or pick an avatar from our international members.'}
            </p>
          </div>

          <!-- Aperçu de la photo actuelle / sélectionnée -->
          <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 24px;">
            <div style="position: relative;">
              <div class="partner-avatar" style="width: 108px; height: 108px; border: 3.5px solid var(--green-400); box-shadow: 0 0 35px rgba(74, 222, 128, 0.45);">
                <img src="${resolvePath(activeAvatar)}" alt="Current Avatar" id="modal-avatar-preview-img" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />
                <span class="avatar-badge-flag" id="modal-avatar-flag" style="font-size: 1.6rem;">✨</span>
              </div>
            </div>
            <div style="margin-top: 14px;">
              <label class="btn btn-secondary btn-sm" style="cursor: pointer; display: inline-flex; align-items: center; gap: 8px; border-color: var(--blue-400);">
                <span>📁</span> ${isFr ? 'Importer depuis mon appareil (PC / Mobile)' : 'Upload from my device (PC / Mobile)'}
                <input type="file" id="modal-file-upload-input" accept="image/*" style="display: none;" />
              </label>
            </div>
          </div>

          <!-- Galerie des Avatars Pré-définis -->
          <div style="margin-bottom: 24px;">
            <div style="font-size: 0.88rem; font-weight: 700; color: #ffffff; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
              <span>${isFr ? 'Ou choisissez un avatar prédéfini :' : 'Or pick a preset avatar :'}</span>
              <span style="font-size: 0.75rem; color: var(--text-subtle);">7 ${isFr ? 'choix' : 'choices'}</span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px;">
              ${PRESET_AVATARS.map(av => `
                <button type="button" class="modal-preset-choice-btn ${av.src === activeAvatar ? 'active' : ''}" data-avatar="${av.src}" data-flag="${av.flag}" title="${av.name} (${av.country})" style="width: 100%; aspect-ratio: 1; border-radius: 50%; padding: 0; border: 2.5px solid ${av.src === activeAvatar ? 'var(--green-400)' : 'var(--glass-border)'}; cursor: pointer; transition: all var(--transition-fast); overflow: hidden; background: transparent; position: relative;">
                  <img src="${resolvePath(av.src)}" alt="${av.name}" style="width: 100%; height: 100%; object-fit: cover;" />
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Actions du modal -->
          <div style="display: flex; gap: 12px; margin-top: 10px;">
            <button type="button" id="btn-cancel-avatar-modal" class="btn btn-secondary" style="flex: 1; justify-content: center;">
              ${isFr ? 'Annuler' : 'Cancel'}
            </button>
            <button type="button" id="btn-save-avatar-modal" class="btn btn-primary" style="flex: 1.5; justify-content: center; font-weight: 800; box-shadow: 0 4px 20px rgba(74, 222, 128, 0.4);">
              <span>💾</span> ${isFr ? 'Enregistrer la photo' : 'Save photo'}
            </button>
          </div>
        </div>
      `;

      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';

      let pendingAvatar = activeAvatar;
      const previewImg = modal.querySelector('#modal-avatar-preview-img');
      const flagBadge = modal.querySelector('#modal-avatar-flag');
      const fileInput = modal.querySelector('#modal-file-upload-input');
      const presetBtns = modal.querySelectorAll('.modal-preset-choice-btn');
      const closeBtn = modal.querySelector('#btn-close-avatar-modal');
      const cancelBtn = modal.querySelector('#btn-cancel-avatar-modal');
      const saveBtn = modal.querySelector('#btn-save-avatar-modal');

      function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }

      closeBtn.addEventListener('click', closeModal);
      cancelBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });

      // Sélection preset
      presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          presetBtns.forEach(b => {
            b.classList.remove('active');
            b.style.borderColor = 'var(--glass-border)';
            b.style.transform = 'scale(1)';
          });
          btn.classList.add('active');
          btn.style.borderColor = 'var(--green-400)';
          btn.style.transform = 'scale(1.15)';

          pendingAvatar = btn.getAttribute('data-avatar');
          const chosenFlag = btn.getAttribute('data-flag') || '✨';
          if (previewImg) previewImg.src = resolvePath(pendingAvatar);
          if (flagBadge) flagBadge.textContent = chosenFlag;

          if (window.EnglishBooster?.SoundFX) {
            window.EnglishBooster.SoundFX.playClick();
          }
        });
      });

      // Upload personnalisé
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          this.processUploadedFile(file, (dataUrl) => {
            pendingAvatar = dataUrl;
            if (previewImg) previewImg.src = dataUrl;
            if (flagBadge) flagBadge.textContent = '📸';

            presetBtns.forEach(b => {
              b.classList.remove('active');
              b.style.borderColor = 'var(--glass-border)';
              b.style.transform = 'scale(1)';
            });

            if (window.EnglishBooster?.SoundFX) {
              window.EnglishBooster.SoundFX.playClick();
            }
          });
        }
      });

      // Sauvegarder
      saveBtn.addEventListener('click', () => {
        this.setAvatar(pendingAvatar, true);
        closeModal();
      });
    }

    /**
     * Attache les écouteurs sur tous les boutons "Changer de photo" existants dans le DOM
     */
    bindEditTriggers() {
      // Boutons explicites
      document.querySelectorAll('.btn-open-avatar-modal, .btn-change-avatar-badge, [data-action="change-avatar"]').forEach(btn => {
        if (!btn.dataset.avatarBound) {
          btn.dataset.avatarBound = 'true';
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            this.openChangeAvatarModal();
          });
        }
      });

      // Clic direct sur l'avatar du profil sur profile.html
      const profAvatar = document.querySelector('.user-profile-avatar, #prof-avatar-wrap');
      if (profAvatar && !profAvatar.dataset.avatarBound) {
        profAvatar.dataset.avatarBound = 'true';
        profAvatar.addEventListener('click', (e) => {
          e.preventDefault();
          this.openChangeAvatarModal();
        });
      }
    }
  }

  // Initialisation globale
  const avatarManager = new AvatarManager();
  window.EnglishBooster = window.EnglishBooster || {};
  window.EnglishBooster.avatarManager = avatarManager;
  window.EnglishBooster.openChangeAvatarModal = () => avatarManager.openChangeAvatarModal();

  document.addEventListener('DOMContentLoaded', () => {
    avatarManager.bindEditTriggers();
    avatarManager.updateDOMElements(avatarManager.currentAvatar);

    // Initialiser le sélecteur si le conteneur est présent sur la page courante
    if (document.getElementById('inscrits-avatar-picker-wrap')) {
      avatarManager.renderFormPicker('inscrits-avatar-picker-wrap');
    }
    if (document.getElementById('register-avatar-picker-wrap')) {
      avatarManager.renderFormPicker('register-avatar-picker-wrap');
    }
  });

})();
