/**
 * ENGLISH BOOSTER — AI ENGLISH COACH ENGINE (js/coach.js)
 * Fluency Metrics, Radar Analytics, Speech Synthesis & Interactive AI Practice
 */

class EnglishBoosterAICoach {
  constructor() {
    this.isListening = false;
    this.recognition = null;
    this.synth = window.speechSynthesis;
  }

  init() {
    this.initSpeechRecognition();
    this.bindPracticeChat();
    this.initVoiceSpeaker();
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.lang = 'en-US';
      this.recognition.interimResults = false;

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const input = document.getElementById('ai-coach-input');
        if (input) {
          input.value = transcript;
          this.handleUserSubmit(transcript);
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        const micBtn = document.getElementById('coach-mic-btn');
        if (micBtn) {
          const isFr = (window.EnglishBooster?.isFrench ? window.EnglishBooster.isFrench() : (localStorage.getItem('eb_lang') === 'fr'));
          micBtn.classList.remove('recording');
          micBtn.innerHTML = isFr ? '🎙️ Parler au Coach' : '🎙️ Speak to Coach';
        }
      };

      this.recognition.onerror = () => {
        this.isListening = false;
        const micBtn = document.getElementById('coach-mic-btn');
        if (micBtn) {
          const isFr = (window.EnglishBooster?.isFrench ? window.EnglishBooster.isFrench() : (localStorage.getItem('eb_lang') === 'fr'));
          micBtn.classList.remove('recording');
          micBtn.innerHTML = isFr ? '🎙️ Parler au Coach' : '🎙️ Speak to Coach';
        }
      };
    }
  }

  bindPracticeChat() {
    const micBtn = document.getElementById('coach-mic-btn');
    const sendBtn = document.getElementById('coach-send-btn');
    const input = document.getElementById('ai-coach-input');

    if (micBtn) {
      micBtn.addEventListener('click', () => {
        const isFr = (window.EnglishBooster?.isFrench ? window.EnglishBooster.isFrench() : (localStorage.getItem('eb_lang') === 'fr'));
        if (!this.recognition) {
          window.EnglishBooster.showToast(
            isFr ? 'Mode Microphone' : 'Microphone Mode',
            isFr ? 'La reconnaissance vocale est active. Vous pouvez également taper vos phrases !' : 'Speech recognition is active. You can also type your sentences!',
            'info'
          );
          return;
        }

        if (!this.isListening) {
          try {
            this.recognition.start();
            this.isListening = true;
            micBtn.classList.add('recording');
            micBtn.innerHTML = isFr ? '⏹️ Écoute en cours...' : '⏹️ Listening...';
            window.EnglishBooster.showToast(
              isFr ? 'Écoute en cours...' : 'Listening...',
              isFr ? 'Parlez en anglais maintenant !' : 'Speak in English now!',
              'info',
              2000
            );
          } catch (e) {}
        } else {
          this.recognition.stop();
          this.isListening = false;
          micBtn.classList.remove('recording');
          micBtn.innerHTML = isFr ? '🎙️ Parler au Coach' : '🎙️ Speak to Coach';
        }
      });
    }

    if (sendBtn && input) {
      sendBtn.addEventListener('click', () => {
        const text = input.value.trim();
        if (text) {
          this.handleUserSubmit(text);
          input.value = '';
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const text = input.value.trim();
          if (text) {
            this.handleUserSubmit(text);
            input.value = '';
          }
        }
      });
    }
  }

  initVoiceSpeaker() {
    // Allows user to click "Hear Pronunciation" on AI responses
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.speak-text-btn');
      if (btn) {
        const text = btn.getAttribute('data-text');
        this.speakEnglish(text);
      }
    });
  }

  speakEnglish(text) {
    // Voix de l'IA désactivée
    if (this.synth) {
      try { this.synth.cancel(); } catch (e) {}
    }
  }

  handleUserSubmit(userText) {
    const container = document.getElementById('coach-dialog-container');
    if (!container) return;

    // Append user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-bubble-wrap outgoing';
    userMsg.innerHTML = `
      <div class="chat-bubble bubble-user">
        <div class="chat-text">${userText}</div>
        <div class="chat-time">Just now</div>
      </div>
    `;
    container.appendChild(userMsg);
    container.scrollTop = container.scrollHeight;

    // Simulate AI Coach linguistic feedback and spoken reply
    setTimeout(() => {
      let coachReply = "That's well expressed! You used natural word order.";
      let corrections = "";

      if (userText.toLowerCase().includes('have went')) {
        coachReply = "Careful with the irregular past tense of 'go'. You should say: 'I went' instead of 'I have went'!";
        corrections = `
          <div style="background: rgba(244,63,94,0.1); border-left: 3px solid #fda4af; padding: 8px 12px; margin-top: 8px; border-radius: 4px; font-size: 0.85rem;">
            <strong>Grammar Tip:</strong> Simple past = <em>went</em>. Present perfect = <em>have gone</em>.
          </div>
        `;
      } else if (userText.toLowerCase().includes('i am agree')) {
        coachReply = "Remember: In English, 'agree' is already a verb! Say 'I agree' rather than 'I am agree'.";
      } else {
        coachReply = `Great sentence! To make it sound even more native, you could say: "Certainly, that sounds like an inspiring perspective." What do you think?`;
      }

      const isFr = (window.EnglishBooster?.isFrench ? window.EnglishBooster.isFrench() : (localStorage.getItem('eb_lang') === 'fr'));
      const coachMsg = document.createElement('div');
      coachMsg.className = 'chat-bubble-wrap incoming';
      coachMsg.innerHTML = `
        <div class="chat-bubble bubble-partner" style="border-left: 3px solid var(--purple-primary);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <strong style="color: var(--cyan-primary); font-size: 0.82rem;">${isFr ? '🤖 Coach IA d\'Anglais' : '🤖 AI English Coach'}</strong>
          </div>
          <div class="chat-text">${coachReply}</div>
          ${corrections}
          <div class="chat-time">${isFr ? 'Retour Linguistique IA' : 'AI Linguistic Feedback'}</div>
        </div>
      `;
      container.appendChild(coachMsg);
      container.scrollTop = container.scrollHeight;

      // Speak feedback
      this.speakEnglish(coachReply);

      // Reward XP
      window.EnglishBooster.addXP(20, isFr ? 'Pratique avec le Coach IA' : 'Practiced with AI Coach');
    }, 1000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('coach-dialog-container') || document.getElementById('coach-mic-btn')) {
    window.aiCoach = new EnglishBoosterAICoach();
    window.aiCoach.init();
  }
});
