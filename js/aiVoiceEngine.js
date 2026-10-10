/**
 * ENGLISH BOOSTER — AI VOICE ENGINE (js/aiVoiceEngine.js)
 * Statut : Voix de l'intelligence artificielle désactivée / retirée à la demande de l'utilisateur.
 * - Aucune synthèse vocale automatique ou manuelle de l'IA n'est émise.
 * - Les boutons et fenêtres flottantes du studio vocal sont retirés.
 * - Les appels à speak() se résolvent silencieusement sans bruit pour préserver les flux textuels.
 */

(function () {
  'use strict';

  // 1. Stopper immédiatement toute parole en cours et neutraliser définitivement la synthèse
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      // Neutraliser speak pour bloquer toute émission sonore artificielle sur toute l'application
      window.speechSynthesis.speak = function (utterance) {
        try { window.speechSynthesis.cancel(); } catch (e) {}
        if (utterance && typeof utterance.onend === 'function') {
          setTimeout(utterance.onend, 20);
        }
      };
    } catch (e) {}
  }

  // 2. Nettoyer les éléments d'interface du studio s'ils sont présents dans le DOM
  function removeVoiceUI() {
    if (typeof document === 'undefined') return;
    const floatingBtn = document.getElementById('btn-floating-ai-voice');
    if (floatingBtn) floatingBtn.remove();

    const studioModal = document.getElementById('ai-voice-studio-modal');
    if (studioModal) studioModal.remove();

    const navTriggers = document.querySelectorAll('.btn-ai-voice-trigger, #btn-ai-voice-studio, .btn-open-ai-voice-studio');
    navTriggers.forEach(el => el.remove());
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', removeVoiceUI);
    } else {
      removeVoiceUI();
    }
  }

  // 3. API Silencieuse sécurisée (No-op pour éviter toute erreur d'exécution)
  const SilentAIVoiceEngine = {
    enabled: false,
    muted: true,
    isSpeaking: false,
    config: {
      volume: 0,
      enabled: false
    },
    speak: function (text, options = {}) {
      // Voix de l'IA désactivée : exécute silencieusement le callback de fin pour la logique applicative
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch (e) {}
      }
      if (typeof options.onEnd === 'function') {
        setTimeout(options.onEnd, 50);
      }
    },
    stop: function () {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch (e) {}
      }
      this.isSpeaking = false;
    },
    getPersonas: function () {
      return {};
    },
    getCurrentPersona: function () {
      return { id: 'none', name: 'Désactivé', flag: '🔇' };
    },
    testVoice: function () {},
    openStudioModal: function () {},
    init: function () {
      removeVoiceUI();
    }
  };

  // 4. Export global
  if (typeof window !== 'undefined') {
    window.AIVoiceEngine = SilentAIVoiceEngine;
  }
})();
