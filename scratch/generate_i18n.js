const fs = require('fs');

const original = fs.readFileSync('scratch/i18n.js.bak', 'utf8');

// Load original translations
const match = original.match(/const translations = (\{[\s\S]*?\n  \};\n\n  \/\/ 2\.)/);
if (!match) {
  console.error('Match failed');
  process.exit(1);
}
const code = 'return ' + match[1].replace(/;\n\n  \/\/ 2\.$/, '');
const translations = new Function(code)();

// 1. Fix existing FR translations that were left in English
translations.fr.conv_card_1_title = "L'Anglais Professionnel au Travail";
translations.fr.conv_card_2_title = "Discussions Spontanées entre Pairs";
translations.fr.conv_card_3_title = "Coaching Vocal Individuel 1-to-1";
translations.fr.shorts_filter_fluency = "⚡ Fluidité";
translations.fr.shorts_filter_pitch = "💼 Présentation & Pitch";
translations.fr.founder_tag = "Leadership & Vision Stratégique";
translations.fr.challenges_filter_speed = "⚡ Duel de Vitesse & Fluidité";

// 2. Add extra translation keys
const newEntries = {
  // Page titles
  title_home: {
    en: 'English Booster — Improve Your English by Speaking With the World',
    fr: 'English Booster — Progressez en Anglais en Parlant avec le Monde'
  },
  title_about: {
    en: 'About English Booster & Founder Tychique Bongo',
    fr: 'À Propos d\'English Booster & Fondateur Tychique Bongo'
  },
  title_call: {
    en: 'Live Audio & Video Conversation — English Booster',
    fr: 'Appel Audio & Vidéo en Direct — English Booster'
  },
  title_challenges: {
    en: 'Daily Challenges & Gamification — English Booster',
    fr: 'Arènes de Défis Vocaux & Gamification — English Booster'
  },
  title_chat: {
    en: 'Chat & AI Grammar Assistant — English Booster',
    fr: 'Messagerie & Assistant Grammaire IA — English Booster'
  },
  title_community: {
    en: 'Community Forum — English Booster',
    fr: 'Forum & Communauté — English Booster'
  },
  title_dashboard: {
    en: 'Dashboard — English Booster',
    fr: 'Tableau de Bord — English Booster'
  },
  title_inscrits: {
    en: 'Inscrivez-vous | English Booster — Connect. Speak. Improve.',
    fr: 'Inscrivez-vous | English Booster — Connecter. Parler. Progresser.'
  },
  title_leaderboard: {
    en: 'Global English Champions — Leaderboard',
    fr: 'Champions Mondiaux d\'Anglais — Classement'
  },
  title_login: {
    en: 'Log In — English Booster',
    fr: 'Connexion — English Booster'
  },
  title_partners: {
    en: 'Find Conversation Partners — English Booster',
    fr: 'Trouver des Partenaires de Conversation — English Booster'
  },
  title_pricing: {
    en: 'Pricing Plans — English Booster',
    fr: 'Plans & Tarifs — English Booster'
  },
  title_profile: {
    en: 'My Profile — English Booster',
    fr: 'Mon Profil — English Booster'
  },
  title_register: {
    en: 'Create Your Account — English Booster',
    fr: 'Créer Votre Compte — English Booster'
  },
  title_watch: {
    en: 'Watch Videos & Shorts — English Booster',
    fr: 'Regarder les Vidéos & Shorts — English Booster'
  },

  // Auth & Login
  login_welcome_back: { en: 'Welcome Back', fr: 'Bon retour parmi nous' },
  login_title: { en: 'Log into English Booster', fr: 'Connexion à English Booster' },
  login_subtitle: {
    en: 'Pick up where you left off and keep your daily streak alive.',
    fr: 'Reprenez là où vous vous êtes arrêté et entretenez votre série quotidienne.'
  },
  login_demo_title: {
    en: '⚡ 1-Click Demo Profiles (Instant Access)',
    fr: '⚡ Profils Démo en 1 Clic (Accès Immédiat)'
  },
  login_or_email: { en: 'or log in with email', fr: 'ou connectez-vous par email' },
  login_email_label: { en: 'Email Address', fr: 'Adresse Email' },
  login_password_label: { en: 'Password', fr: 'Mot de passe' },
  login_forgot: { en: 'Forgot password?', fr: 'Mot de passe oublié ?' },
  login_remember: { en: 'Remember this device for 30 days', fr: 'Se souvenir de cet appareil pendant 30 jours' },
  login_btn_submit: { en: 'Log In to Dashboard', fr: 'Se Connecter au Tableau de Bord' },
  login_new_here: { en: 'New here?', fr: 'Nouveau ici ?' },
  login_create_acc: { en: 'Get Started', fr: 'Créer un compte' },

  // Auth & Register
  reg_already_member: { en: 'Already a member?', fr: 'Déjà membre ?' },
  reg_login_link: { en: 'Log in', fr: 'Connexion' },
  reg_badge: { en: 'Global English Community', fr: 'Communauté Mondiale d\'Anglais' },
  reg_title: { en: 'Create your English Booster account', fr: 'Créez votre compte English Booster' },
  reg_subtitle: {
    en: 'Start speaking English confidently with friendly international partners.',
    fr: 'Commencez à parler anglais avec assurance avec des partenaires bienveillants du monde entier.'
  },
  reg_or_email: { en: 'or register with email', fr: 'ou inscrivez-vous avec votre email' },
  reg_fullname_label: { en: 'Full Name *', fr: 'Nom Complet *' },
  reg_email_label: { en: 'Email Address *', fr: 'Adresse Email *' },
  reg_password_label: { en: 'Password *', fr: 'Mot de passe *' },
  reg_phone_label: { en: 'Phone Number', fr: 'Numéro de Téléphone' },
  reg_country_label: { en: 'Country', fr: 'Pays' },
  reg_native_lang_label: { en: 'Native Language', fr: 'Langue Maternelle' },
  reg_level_label: { en: 'Select Your English Level (CEFR)', fr: 'Sélectionnez Votre Niveau d\'Anglais (CECRL)' },
  reg_level_sub: {
    en: 'A1/A2: Beginner/Elementary · B1/B2: Intermediate/Upper · C1/C2: Advanced/Proficient',
    fr: 'A1/A2 : Débutant/Élémentaire · B1/B2 : Intermédiaire/Supérieur · C1/C2 : Avancé/Bilingue'
  },
  reg_goal_label: { en: 'Main Learning Goal', fr: 'Objectif Principal d\'Apprentissage' },
  reg_interests_label: { en: 'Interests & Topics to Discuss', fr: 'Centres d\'intérêt & Sujets de Discussion' },
  reg_terms_label: { en: 'I agree to the', fr: 'J\'accepte les' },
  reg_terms_link: { en: 'Terms', fr: 'Conditions d\'utilisation' },
  reg_and: { en: 'and', fr: 'et la' },
  reg_privacy_link: { en: 'Privacy Policy', fr: 'Politique de Confidentialité' },
  reg_btn_submit: { en: 'Create Account', fr: 'Créer Mon Compte' },
  reg_warmup_badge: { en: 'Instant Vocal Warmup', fr: 'Échauffement Vocal Immédiat' },
  reg_warmup_title: { en: 'Live Conversation Match', fr: 'Partie de Conversation en Direct' },
  reg_warmup_sub: {
    en: 'Test your spoken English right now! Pick a speaking partner below, speak via mic or type, hear native audio replies, and earn your first XP points:',
    fr: 'Testez votre anglais en direct dès maintenant ! Choisissez un interlocuteur ci-dessous, parlez au micro ou écrivez, écoutez ses réponses vocales et gagnez vos premiers points d\'XP :'
  },

  // Profile Page
  profile_title: { en: 'My Profile', fr: 'Mon Profil' },
  profile_audio_intro: { en: '🎙️ Audio Intro (0:20)', fr: '🎙️ Présentation Audio (0:20)' },
  profile_take_test: { en: '📝 Take CEFR Test', fr: '📝 Passer le Test CECRL' },
  profile_stat_minutes: { en: 'Mins Spoken', fr: 'Minutes Parlées' },
  profile_stat_convs: { en: 'Conversations', fr: 'Conversations' },
  profile_stat_xp: { en: 'Total XP', fr: 'Total XP' },
  profile_stat_rating: { en: 'Partner Rating', fr: 'Note des Partenaires' },
  profile_settings_title: { en: 'Profile Settings & Learning Goals', fr: 'Paramètres du Profil & Objectifs' },
  profile_fullname: { en: 'Full Name', fr: 'Nom Complet' },
  profile_email: { en: 'Email Address', fr: 'Adresse Email' },
  profile_primary_goal: { en: 'Primary Goal', fr: 'Objectif Principal' },
  profile_cefr_level: { en: 'Current CEFR Level', fr: 'Niveau CECRL Actuel' },
  profile_bio_label: { en: 'Bio & Conversation Preferences', fr: 'Biographie & Préférences d\'Échange' },
  profile_btn_save: { en: 'Save Profile Changes', fr: 'Enregistrer les Modifications' },
  profile_badges_title: { en: 'My Unlocked Badges', fr: 'Mes Badges Débloqués' },
  profile_badge_first_call: { en: 'First Conversation', fr: 'Première Conversation' },
  profile_badge_first_call_desc: { en: 'Completed 1st live call', fr: '1er appel en direct complété' },
  profile_badge_streak: { en: '7 Day Streak', fr: 'Série de 7 Jours' },
  profile_badge_streak_desc: { en: 'Practiced 7 days in a row', fr: 'Pratique pendant 7 jours consécutifs' },
  profile_badge_global: { en: 'Global Speaker', fr: 'Locuteur International' },
  profile_badge_global_desc: { en: 'Spoke with 5+ countries', fr: 'Échanges avec 5+ pays différents' },
  profile_badge_vocab: { en: 'Vocabulary Builder', fr: 'Enrichisseur de Vocabulaire' },
  profile_badge_vocab_desc: { en: 'Mastered 50+ expressions', fr: '50+ expressions maîtrisées' },

  // Call Page
  call_in_progress: { en: 'LIVE CALL IN PROGRESS', fr: 'APPEL EN DIRECT EN COURS' },
  call_exit_room: { en: 'Exit Room', fr: 'Quitter la Salle' },
  call_live_coach: { en: '🤖 AI Live Coach Assistance', fr: '🤖 Assistance du Coach IA en Direct' },
  call_goals_title: { en: '📝 Real-time Vocabulary Goals', fr: '📝 Objectifs Vocabulaires en Direct' },
  call_goal_1: { en: 'Phrasal verb: "Look forward to"', fr: 'Verbe à particule : "Look forward to"' },
  call_goal_2: { en: 'Ask an open-ended question', fr: 'Poser une question ouverte' },
  call_goal_3: { en: 'Use simple past correctly', fr: 'Utiliser le passé simple correctement' },
  call_goal_4: { en: 'Give a 1-minute storytelling example', fr: 'Raconter une anecdote d\'une minute' },
  call_btn_mute: { en: 'Mute', fr: 'Couper micro' },
  call_btn_unmute: { en: 'Unmute', fr: 'Activer micro' },
  call_btn_camera_off: { en: 'Camera Off', fr: 'Couper caméra' },
  call_btn_camera_on: { en: 'Camera On', fr: 'Activer caméra' },
  call_btn_screen: { en: 'Share Screen', fr: 'Partager l\'écran' },
  call_btn_chat: { en: 'Open Chat', fr: 'Ouvrir le Chat' },
  call_btn_leave: { en: 'Leave Call', fr: 'Terminer l\'Appel' },

  // Chat Page
  chat_active_convs: { en: 'Active Conversations', fr: 'Conversations Actives' },
  chat_typing_hint: { en: 'Partner is typing a response in English...', fr: 'Le partenaire est en train d\'écrire en anglais...' },
  chat_ph_input: {
    en: 'Type a message in English (or try: I agree, have went)...',
    fr: 'Tapez un message en anglais (ou testez : I agree, have went)...'
  },
  chat_btn_send: { en: 'Send', fr: 'Envoyer' },
  chat_ai_grammar_btn: { en: '✨ AI Grammar Check', fr: '✨ Vérification IA' },

  // About FAQ & Founder Details
  about_founder_subtitle: {
    en: 'Lead Full-Stack Architect · EdTech Entrepreneur',
    fr: 'Architecte Full-Stack & Entrepreneur EdTech'
  },
  about_direct_contact: { en: 'Direct Contact Information:', fr: 'Coordonnées Directes :' },
  about_faq_tag: { en: 'FAQ', fr: 'FAQ' },
  about_faq_title: { en: 'Common Questions', fr: 'Questions Fréquentes' },
  about_faq_q1: { en: 'What if I make mistakes while speaking?', fr: 'Que se passe-t-il si je fais des erreurs en parlant ?' },
  about_faq_a1: {
    en: 'Making mistakes is the foundation of spoken language acquisition! English Booster fosters a supportive, zero-judgment atmosphere. Both your partner and our AI assistant are here to help you grow.',
    fr: 'Faire des erreurs est le fondement même de l\'apprentissage d\'une langue ! English Booster favorise un climat bienveillant et sans aucun jugement. Votre partenaire et l\'assistant IA sont là pour vous faire progresser.'
  },
  about_faq_q2: { en: 'How does the AI Match Score work?', fr: 'Comment fonctionne le score d\'affinité IA ?' },
  about_faq_a2: {
    en: 'Our algorithm evaluates your CEFR level, target goals (e.g. travel vs. career), shared interests, and typical availability timezones to suggest the most compatible practice partners.',
    fr: 'Notre algorithme évalue votre niveau CECRL, vos objectifs (voyage, carrière), vos centres d\'intérêt communs et vos fuseaux horaires pour vous suggérer les partenaires les plus compatibles.'
  },
  about_faq_q3: { en: 'Can I practice using audio without turning on my video?', fr: 'Puis-je pratiquer en audio sans activer ma caméra ?' },
  about_faq_a3: {
    en: 'Yes! You have full control. You can exchange voice notes in chat, join audio-only calls, or turn on your camera whenever you feel comfortable.',
    fr: 'Oui ! Vous avez le contrôle total. Vous pouvez échanger par notes vocales, rejoindre des appels audio uniquement ou activer votre vidéo lorsque vous vous sentez prêt.'
  },
  about_faq_q4: { en: 'How can I reach the founder or report feedback?', fr: 'Comment joindre le fondateur ou envoyer un retour ?' },
  about_faq_a4: {
    en: 'You can reach Tychique Bongo directly via WhatsApp (+242 905 37 12), phone (+225 07 05 88 46 87), or email. We read and implement community feedback every single week!',
    fr: 'Vous pouvez joindre Tychique Bongo directement via WhatsApp (+242 905 37 12), téléphone (+225 07 05 88 46 87) ou email. Nous lisons et intégrons les retours de la communauté chaque semaine !'
  },
  about_legal_title: { en: 'Legal & Community Guidelines', fr: 'Règles Communautaires & Mentions Légales' },

  // Watch Videos Page
  watch_briefing_badge: { en: '💼 Executive Video Briefings & Masterclasses', fr: '💼 Briefings Vidéo Exécutifs & Masterclasses' },
  watch_format_badge: { en: 'Format Pro 9:16 & Fiches de Synthèse', fr: 'Format Pro 9:16 & Fiches de Synthèse' },
  watch_micro_classes: { en: 'Micro-Masterclasses for Professionals', fr: 'Micro-Masterclasses pour Professionnels' },
  watch_micro_desc: {
    en: 'Condensed video modules (30 to 60s) tailored for executives, founders, and professionals: contract negotiations, C-Suite speeches, tech pitches, intercultural diplomacy, and downloadable executive vocabulary sheets.',
    fr: 'Capsules vidéo condensées (30 à 60s) conçues pour cadres, entrepreneurs et professionnels : négociation de contrats, prises de parole en C-Suite, elevator pitches tech, diplomatie interculturelle et dossiers de vocabulaire exécutif téléchargeables.'
  },
  watch_btn_live_masterclass: { en: '🔴 Launch Live Masterclass', fr: '🔴 Lancer une Masterclass en Direct' },
  watch_stat_briefings: { en: 'Executive Briefings', fr: 'Briefings Exécutifs' },
  watch_stat_live: { en: 'Live Masterclasses', fr: 'Masterclasses Live' },
  watch_stat_views: { en: 'Pro Views', fr: 'Vues Pro' },
  watch_stat_target: { en: 'Target Level (100% EN)', fr: 'Niveau Visé (100% EN)' },

  // Wizard Interactive
  wiz_badge: { en: 'Interactive 3-Step Walkthrough', fr: 'Guide Interactif en 3 Étapes' },
  wiz_title: { en: 'Mastering Spoken English in 3 Steps', fr: 'Maîtriser l\'Anglais Oral en 3 Étapes' },
  wiz_subtitle: {
    en: 'From zero speaking practice to confident international conversations.',
    fr: 'De zéro pratique à des conversations internationales en toute confiance.'
  },
  wiz_tab_1: { en: 'Create Profile', fr: 'Créer un Profil' },
  wiz_tab_2: { en: 'Find Partner', fr: 'Trouver un Partenaire' },
  wiz_tab_3: { en: 'Start Speaking', fr: 'Commencer à Parler' },
  wiz_label_name: { en: 'Full Name or Nickname', fr: 'Nom complet ou pseudo' },
  wiz_label_native_lang: { en: 'Your Native Language', fr: 'Votre Langue Maternelle' },
  wiz_label_level: { en: 'Select Your Current English Level (CEFR)', fr: 'Sélectionnez votre niveau CECRL actuel' },
  wiz_label_goal: { en: 'Your Primary Speaking Goal', fr: 'Votre Objectif Principal d\'Expression' },
  wiz_label_avatar: { en: 'Choose Avatar', fr: 'Choisir un Avatar' },
  wiz_preview_badge: { en: 'Live Profile Preview', fr: 'Aperçu du Profil en Direct' },
  wiz_btn_save_find: { en: 'Save Profile & Find Partner ➔', fr: 'Enregistrer le Profil & Trouver un Partenaire ➔' },
  wiz_matched_count: {
    en: 'AI Engine matched 3 compatible partners available now',
    fr: 'L\'IA a trouvé 3 partenaires compatibles disponibles maintenant'
  },
  wiz_btn_back_profile: { en: '⬅ Back to Profile', fr: '⬅ Retour au Profil' },
  wiz_btn_browse_all: { en: 'Browse All 50+ Partners 🌐', fr: 'Parcourir les 50+ Partenaires 🌐' },
  wiz_btn_connect_speak: {
    en: 'Connect with Sofia & Start Speaking ➔',
    fr: 'Se connecter avec Sofia & Commencer à Parler ➔'
  },
  wiz_in_call_status: { en: 'In Call Session', fr: 'En Session d\'Appel' },
  wiz_btn_end_demo: { en: 'Finish Demo & Claim XP', fr: 'Terminer la Démo & Réclamer les XP' }
};

for (const [k, v] of Object.entries(newEntries)) {
  translations.en[k] = v.en;
  translations.fr[k] = v.fr;
}

// Write the complete updated i18n.js
const header = `/**
 * ENGLISH BOOSTER — INTERNATIONALIZATION (i18n) ENGINE
 * Languages supported: English (en) & Français (fr)
 * Architecture: Vanilla ES6, High-Performance, Persistent Storage, Reactive DOM Translation
 */

(function () {
  'use strict';

  // 1. DICTIONARIES (ENGLISH & FRANÇAIS)
  const translations = {
    en: ${JSON.stringify(translations.en, null, 4)},

    fr: ${JSON.stringify(translations.fr, null, 4)}
  };

  // 2. STATE MANAGER
  class I18nEngine {
    constructor() {
      this.currentLang = this.detectLanguage();
      this.listeners = [];
      this.observer = null;
    }

    detectLanguage() {
      // 1. LocalStorage
      const saved = localStorage.getItem('eb_lang') || localStorage.getItem('eb_language');
      if (saved && (saved === 'en' || saved === 'fr')) {
        return saved;
      }
      // 2. Navigator language
      const navLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
      if (navLang.startsWith('fr')) {
        return 'fr';
      }
      return 'en';
    }

    getLang() {
      return this.currentLang;
    }

    isFrench() {
      return this.currentLang === 'fr';
    }

    t(key, fallback = '') {
      const dict = translations[this.currentLang] || translations.en;
      if (dict && dict[key] !== undefined) {
        return dict[key];
      }
      const enDict = translations.en;
      if (enDict && enDict[key] !== undefined) {
        return enDict[key];
      }
      return fallback || key;
    }

    setLanguage(lang, triggerToast = true) {
      if (lang !== 'en' && lang !== 'fr') return;
      this.currentLang = lang;
      try {
        localStorage.setItem('eb_lang', lang);
        localStorage.setItem('eb_language', lang);
      } catch (e) {}
      document.documentElement.setAttribute('lang', lang);

      // Translate the DOM
      this.translateDOM();

      // Update switcher controls
      this.updateSwitcherUI();
      this.bindAllSwitchers();

      // Notify external scripts
      window.dispatchEvent(new CustomEvent('eb_language_changed', {
        detail: { lang: this.currentLang }
      }));

      if (triggerToast && window.EnglishBooster && window.EnglishBooster.showToast) {
        if (lang === 'fr') {
          window.EnglishBooster.showToast(
            '🇫🇷 Langue : Français',
            'L\\'application est désormais affichée en français.',
            'info',
            2200
          );
        } else {
          window.EnglishBooster.showToast(
            '🇬🇧 Language: English',
            'The entire platform is now displayed in English.',
            'info',
            2200
          );
        }
      }
    }

    toggleLanguage() {
      const next = this.currentLang === 'en' ? 'fr' : 'en';
      if (window.EnglishBooster && window.EnglishBooster.SoundFX) {
        window.EnglishBooster.SoundFX.playClick();
      }
      this.setLanguage(next, true);
    }

    translateDOM() {
      const lang = this.currentLang;
      const dict = translations[lang] || translations.en;
      const isFr = lang === 'fr';

      // 0. Update Page Title
      this.translatePageTitle();

      // 1. Text elements with data-i18n
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key] !== undefined) {
          el.innerHTML = dict[key];
        }
      });

      // 2. Placeholders with data-i18n-placeholder
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key] !== undefined) {
          el.setAttribute('placeholder', dict[key]);
        }
      });

      // 3. Titles / Aria labels with data-i18n-title
      document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (dict[key] !== undefined) {
          el.setAttribute('title', dict[key]);
          el.setAttribute('aria-label', dict[key]);
        }
      });

      // 4. Smart translation for common existing links & elements
      this.translateStandardLinks();
    }

    translatePageTitle() {
      const isFr = this.currentLang === 'fr';
      const titleMap = [
        ['English Booster — Improve Your English by Speaking With the World', 'English Booster — Progressez en Anglais en Parlant avec le Monde'],
        ['About English Booster & Founder Tychique Bongo', 'À Propos d\\'English Booster & Fondateur Tychique Bongo'],
        ['Live Audio & Video Conversation — English Booster', 'Appel Audio & Vidéo en Direct — English Booster'],
        ['Daily Challenges & Gamification — English Booster', 'Arènes de Défis Vocaux & Gamification — English Booster'],
        ['Chat & AI Grammar Assistant — English Booster', 'Messagerie & Assistant Grammaire IA — English Booster'],
        ['Community Forum — English Booster', 'Forum & Communauté — English Booster'],
        ['Dashboard — English Booster', 'Tableau de Bord — English Booster'],
        ['Inscrivez-vous | English Booster — Connect. Speak. Improve.', 'Inscrivez-vous | English Booster — Connecter. Parler. Progresser.'],
        ['Global English Champions — Leaderboard', 'Champions Mondiaux d\\'Anglais — Classement'],
        ['Log In — English Booster', 'Connexion — English Booster'],
        ['Find Conversation Partners — English Booster', 'Trouver des Partenaires de Conversation — English Booster'],
        ['Pricing Plans — English Booster', 'Plans & Tarifs — English Booster'],
        ['My Profile — English Booster', 'Mon Profil — English Booster'],
        ['Create Your Account — English Booster', 'Créer Votre Compte — English Booster'],
        ['Watch Videos & Shorts — English Booster', 'Regarder les Vidéos & Shorts — English Booster']
      ];

      const current = document.title.trim();
      for (const [enT, frT] of titleMap) {
        if (isFr && (current === enT || current.includes(enT.split(' — ')[0]))) {
          document.title = frT;
          return;
        } else if (!isFr && (current === frT || current.includes(frT.split(' — ')[0]))) {
          document.title = enT;
          return;
        }
      }
    }

    translateStandardLinks() {
      const isFr = this.currentLang === 'fr';

      // Desktop & Mobile Navigation Links mapping
      const linkMap = {
        'Home': isFr ? 'Accueil' : 'Home',
        'Accueil': isFr ? 'Accueil' : 'Home',
        'Inscrivez-vous': isFr ? 'Inscrivez-vous' : 'Register Directory',
        'Register Directory': isFr ? 'Inscrivez-vous' : 'Register Directory',
        'How it works': isFr ? 'Comment ça marche' : 'How it works',
        'Comment ça marche': isFr ? 'Comment ça marche' : 'How it works',
        'Find Partners': isFr ? 'Trouver des partenaires' : 'Find Partners',
        'Trouver des partenaires': isFr ? 'Trouver des partenaires' : 'Find Partners',
        'Community': isFr ? 'Communauté' : 'Community',
        'Communauté': isFr ? 'Communauté' : 'Community',
        'Challenges': isFr ? 'Défis' : 'Challenges',
        'Défis': isFr ? 'Défis' : 'Challenges',
        'Pricing': isFr ? 'Tarifs' : 'Pricing',
        'Tarifs': isFr ? 'Tarifs' : 'Pricing',
        'About': isFr ? 'À propos' : 'About',
        'À propos': isFr ? 'À propos' : 'About',
        'Log in': isFr ? 'Connexion' : 'Log in',
        'Connexion': isFr ? 'Connexion' : 'Log in',
        'Get Started': isFr ? 'Commencer' : 'Get Started',
        'Commencer': isFr ? 'Commencer' : 'Get Started',
        'Dashboard': isFr ? 'Tableau de bord' : 'Dashboard',
        'Tableau de bord': isFr ? 'Tableau de bord' : 'Dashboard',
        'Watch Videos': isFr ? 'Regardez les vidéos' : 'Watch Videos',
        'Watch Videos (Shorts)': isFr ? 'Regardez les vidéos (Shorts)' : 'Watch Videos (Shorts)',
        'Regardez les vidéos': isFr ? 'Regardez les vidéos' : 'Watch Videos',
        'Regardez les vidéos (Shorts)': isFr ? 'Regardez les vidéos (Shorts)' : 'Watch Videos (Shorts)',
        'Watch': isFr ? 'Vidéos' : 'Watch',
        'Vidéos': isFr ? 'Vidéos' : 'Watch',
        'Leaderboard': isFr ? 'Classement' : 'Leaderboard',
        'Classement': isFr ? 'Classement' : 'Leaderboard',
        'Live Call': isFr ? 'Appel en direct' : 'Live Call',
        'Appel en direct': isFr ? 'Appel en direct' : 'Live Call',
        'Chat': isFr ? 'Chat' : 'Chat',
        'Profile': isFr ? 'Profil' : 'Profile',
        'Profil': isFr ? 'Profil' : 'Profile',
        'Discover': isFr ? 'Découvrir' : 'Discover',
        'Découvrir': isFr ? 'Découvrir' : 'Discover'
      };

      document.querySelectorAll('.nav-link, .dock-item span:last-child').forEach(link => {
        const txt = link.textContent.trim();
        if (linkMap[txt]) {
          link.textContent = linkMap[txt];
        }
      });

      // Mobile Drawer links (which have icons e.g. <span>🏠</span> Home)
      document.querySelectorAll('.mobile-nav-link').forEach(link => {
        const iconSpan = link.querySelector('span');
        const iconHtml = iconSpan ? iconSpan.outerHTML + ' ' : '';
        const rawText = link.textContent.replace(/^[^\\w\\sÀ-ÿ]+/u, '').trim();
        
        for (const [key, translated] of Object.entries(linkMap)) {
          if (rawText.toLowerCase() === key.toLowerCase()) {
            link.innerHTML = iconHtml + translated;
            break;
          }
        }
      });

      // Translate Mission Statement if displayed
      document.querySelectorAll('.about-mission-statement-text').forEach(p => {
        p.textContent = this.t('mission_text');
      });

      // Comprehensive global UI Phrase Pairs [French, English]
      const phrasePairs = [
        ['Inscrivez-vous dans English Booster', 'Register for English Booster'],
        ['Rejoignez la Communauté Mondiale', 'Join the Global Community'],
        ['Trouvez Vos Partenaires de Conversation en Anglais', 'Find Your English Conversation Partners'],
        ['Rencontrez Nos Meilleurs Partenaires de Conversation', 'Meet Top Conversation Partners'],
        ['Shorts des Membres Inscrits', 'Shorts by Registered Members'],
        ['Publier une Vidéo Short', 'Publish a Short Video'],
        ['Rejoindre les Inscrits', 'Join Registered Members'],
        ['Explorer Tous les Shorts →', 'Explore All Shorts →'],
        ['Shorts Actifs', 'Active Shorts'],
        ['Vues Totales', 'Total Views'],
        ['Likes Membres', 'Member Likes'],
        ['Partenaires Inscrits', 'Registered Partners'],
        ['Valider Mon Inscription', 'Submit My Registration'],
        ['Démarrer une Conversation Directe', 'Start a Direct Conversation'],
        ['Lancer un Appel Vidéo 1-to-1', 'Launch 1-to-1 Video Call'],
        ['Matchmaking Rapide', 'Fast Matchmaking'],
        ['Appel Direct 1-to-1 (3s)', 'Direct 1-to-1 Call (3s)'],
        ['Pourquoi English Booster ?', 'Why English Booster?'],
        ['Notre Raison d\\'Être & Mission', 'Our Purpose & Mission'],
        ['La Connexion Humaine d\\'Abord', 'Human Connection First'],
        ['IA Pédagogique Intelligente', 'Intelligent Pedagogical AI'],
        ['Inclusivité Mondiale', 'Global Inclusivity'],
        ['La Vision Derrière English Booster', 'The Vision Behind English Booster'],
        ['Questions Fréquentes', 'Common Questions'],
        ['Règles de la Communauté & Légal', 'Legal & Community Guidelines'],
        ['Règles Communautaires & Mentions Légales', 'Legal & Community Guidelines'],
        ['WhatsApp Direct', 'WhatsApp Direct'],
        ['Appeler le Fondateur', 'Call Founder'],
        ['Envoyer un Email', 'Send Email'],
        ['Tarifs Transparents', 'Transparent Plans'],
        ['Un Apprentissage Accessible Partout', 'Affordable Global Learning'],
        ['Commencer Gratuitement', 'Get Started Free'],
        ['Choisir Premium', 'Choose Premium'],
        ['Choisir Pro', 'Choose Pro'],
        ['Conversations illimitées', 'Unlimited conversations'],
        ['Profil apprenant de base', 'Basic learner profile'],
        ['Trouver des partenaires de conversation', 'Find conversation partners'],
        ['Défis quotidiens', 'Daily challenges'],
        ['Accès au forum communautaire', 'Community forum access'],
        ['Préparation aux entretiens d\\'embauche', 'Job interview prep modules'],
        ['Vocabulaire professionnel d\\'entreprise', 'Professional corporate vocabulary'],
        ['Plan d\\'apprentissage personnalisé', 'Personalized learning plan'],
        ['Mensuel', 'Monthly'],
        ['Annuel', 'Annual'],
        ['Économisez 20%', 'Save 20%'],
        ['Commencez à parler', 'Start speaking'],
        ['Progressez chaque jour', 'Improve every day'],
        ['Créez votre profil', 'Create your profile'],
        ['Trouvez votre partenaire', 'Find your partner'],
        ['Méthodologie', 'Methodology'],
        ['Comment fonctionne English Booster', 'How English Booster Works'],
        ['Comment ça marche', 'How it works'],
        ['Regardez les vidéos', 'Watch Videos'],
        ['regardez les vidéos', 'watch videos'],
        ['Regardez les Vidéos', 'Watch Videos'],
        ['Regardez les vidéos : ', 'Watch Videos : '],
        ['Regardez les vidéos :', 'Watch Videos :'],
        ['Regardez les vidéos & Reels', 'Watch Videos & Reels'],
        ['🎬 Regardez les vidéos & Reels', '🎬 Watch Videos & Reels'],
        ['Regardez les vidéos (Shorts)', 'Watch Videos (Shorts)'],
        ['NOM :', 'Name :'],
        ['NOM', 'Name'],
        ['Nom :', 'Name :'],
        ['Nom', 'Name'],
        ['Prénom :', 'Firstname :'],
        ['Prénom', 'Firstname'],
        ['Nationalité :', 'Country :'],
        ['Nationalité', 'Country'],
        ['Nationalités', 'Countries'],
        ['Toutes les Nationalités', 'All Countries'],
        ['Adresse email :', 'Email address :'],
        ['Adresse email', 'Email address'],
        ['Adresse Email :', 'Email address :'],
        ['Adresse Email', 'Email address'],
        ['Mot de passe :', 'Password :'],
        ['Mot de passe', 'Password'],
        ['Confirmer le mot de passe :', 'Repeat the pass word :'],
        ['Confirmer le mot de passe', 'Repeat the pass word'],
        ['Répétez le mot de passe :', 'Repeat the pass word :'],
        ['Répétez le mot de passe', 'Repeat the pass word'],
        ['Répétez le mot de passe...', 'repeat the pass word...'],
        ['Total Inscrits', 'Total Registered'],
        ['Membres En Ligne', 'Members Online'],
        ['Membres Déjà Inscrits dans English Booster', 'Registered Members in English Booster'],
        ['Vos Informations d\\'Inscription', 'Your Registration Details'],
        ['Inscription Instantanée', 'Instant Registration'],
        ['Valider pour être inscrit dans English Booster', 'Register in English Booster'],
        ['Profil & Statut', 'Profile & Status'],
        ['Niveau CECRL', 'CEFR Level'],
        ['Liens d\\'Action Directs', 'Direct Action Links'],
        ['⚡ Duel Aléatoire Rapide & Appel en Direct', '⚡ Quick Random Duel & Live Call'],
        ['Duel Aléatoire Rapide & Appel en Direct', 'Quick Random Duel & Live Call'],
        ['⚡ Duel Rapide & Appel en Direct', '⚡ Quick Random Duel & Live Call'],
        ['Duel Rapide & Appel en Direct', 'Quick Random Duel & Live Call'],
        ['⚡ Duel Aléatoire Rapide', '⚡ Quick Random Duel'],
        ['Duel Aléatoire Rapide', 'Quick Random Duel'],
        ['⚡ Duel Rapide', '⚡ Speed Duel'],
        ['Duel Rapide', 'Speed Duel'],
        ['⚖️ Arène de Débat', '⚖️ Debate Arena'],
        ['Arène de Débat', 'Debate Arena'],
        ['🎭 Jeu de Rôle', '🎭 Roleplay'],
        ['Jeu de Rôle', 'Roleplay'],
        ['🎯 Phonétique', '🎯 Phonetics'],
        ['Phonétique', 'Phonetics'],
        ['🏆 Diagnostic CECRL', '🏆 CEFR Diagnostic'],
        ['Diagnostic CECRL', 'CEFR Diagnostic'],
        ['🌐 Les 5 Modes de Duel', '🌐 All 5 Battle Modes'],
        ['Les 5 Modes de Duel', 'All 5 Battle Modes'],
        ['🎙️ Appel en Direct', '🎙️ Live Call'],
        ['Appel en Direct', 'Live Call'],
        ['🎙️ Passer en Appel en Direct', '🎙️ Switch to Live Call'],
        ['Passer en Appel en Direct', 'Switch to Live Call'],
        ['📞 Lancer l\\'Appel en Direct avec l\\'adversaire', '📞 Start Live Call with Opponent'],
        ['Lancer l\\'Appel en Direct avec l\\'adversaire', 'Start Live Call with Opponent'],
        ['📞 Lancer l\\'Appel en Direct', '📞 Start 1-on-1 Live Call Now'],
        ['⚔️ Lancer le Duel d\\'Arène', '⚔️ Launch Spoken Arena Duel'],
        ['Duel d\\'Élocution en Arène', 'Spoken Arena Duel'],
        ['Appel en Direct 1-to-1 WebRTC', '1-on-1 WebRTC Live Call'],
        ['Arènes de Défis en Anglais en Direct', 'Live English Challenge Arenas'],
        ['Sélectionnez Votre Arène de Conversation en Direct', 'Select Your Live Conversation Arena'],
        ['🎙️ Appel en Direct & Duel Audio Prêts', '🎙️ Live Call & Audio Duel Ready'],
        ['🎥 6 Écrans en Direct', '🎥 6 Live Screens'],
        ['6 Écrans en Direct', '6 Live Screens'],
        ['⚔️ Vue Duo Focus', '⚔️ Duo Focus'],
        ['Vue Duo Focus', 'Duo Focus'],
        ['🔴 EN DIRECT HD 1080p', '🔴 LIVE HD 1080p'],
        ['EN DIRECT HD 1080p', 'LIVE HD 1080p'],
        ['👂 Écoute active', '👂 Listening'],
        ['🎤 En train de parler', '🎤 Speaking'],
        ['🔊 Écouter', '🔊 Listen'],
        ['📌 Épingler', '📌 Pin'],
        ['🎥 6 Écrans Live Simultanés (5+ en direct)', '🎥 6 Simultaneous Live Screens (5+ direct screens)'],
        ['Salle de Duel Aléatoire Rapide & Appel en Direct', 'Quick Random Duel & Live Call Room'],
        ['⚡ Lancer le Duel Aléatoire (6 Écrans)', '⚡ Launch Quick Random (6 Screens)'],
        ['Voir les 5 Arènes →', 'Explore All 5 Arenas →'],
        ['Moteur d\\'Affinité International', 'International Matching Engine'],
        ['✨ Moteur d\\'Affinité International', '✨ International Matching Engine'],
        ['Trouvez Votre Partenaire d\\'Anglais', 'Find Your English Partner'],
        ['Pratiquez l\\'Anglais en Immersion Quotidienne', 'Practice English in Daily Immersion'],
        ['Sessions Ouvertes', 'Open Sessions'],
        ['Communauté Active', 'Active Community'],
        ['🤝 Communauté Active', '🤝 Active Community'],
        ['Parler maintenant (1-to-1)', 'Speak Now (1-to-1)'],
        ['🎙️ Parler maintenant (1-to-1)', '🎙️ Speak Now (1-to-1)'],
        ['Matchmaking Instantané', 'Instant Matchmaking'],
        ['⚡ Matchmaking Instantané', '⚡ Instant Matchmaking'],
        ['Rechercher par nom / passion', 'Search by Name / Interest'],
        ['Niveau d\\'anglais', 'English Level'],
        ['Niveau d\\'Anglais', 'English Level'],
        ['Tous les niveaux (A1 - C2)', 'All Levels (A1 - C2)'],
        ['A1 — Débutant', 'A1 — Beginner'],
        ['A2 — Élémentaire', 'A2 — Elementary'],
        ['B1 — Intermédiaire', 'B1 — Intermediate'],
        ['B2 — Intermédiaire supérieur', 'B2 — Upper Intermediate'],
        ['C1 — Avancé', 'C1 — Advanced'],
        ['C2 — Bilingue / Maîtrise', 'C2 — Proficient'],
        ['Objectif d\\'apprentissage', 'Learning Goal'],
        ['Tous les objectifs', 'All Goals'],
        ['Pratique Orale', 'Improve Speaking'],
        ['Carrière & Tech', 'Career & Tech'],
        ['Affaires & Business', 'Business'],
        ['Communication Sociale', 'Social Communication'],
        ['🟢 En ligne uniquement', '🟢 Online Now Only'],
        ['Statuts d\\'Expression des Membres', 'Member Expression Statuses'],
        ['Tous les Statuts', 'All Statuses'],
        ['Audio / Voix', 'Audio / Voice'],
        ['Vidéos Express', 'Express Videos'],
        ['Images & Fiches', 'Images & Cards'],
        ['Écrit / Débats', 'Text / Debates'],
        ['Publier un Statut', 'Publish Status'],
        ['Temple de la Renommée XP', 'XP Hall of Fame'],
        ['Champions Mondiaux d\\'Anglais', 'Global English Champions'],
        ['Mondial', 'Global'],
        ['🌍 Mondial', '🌍 Global'],
        ['Hebdomadaire', 'Weekly'],
        ['📅 Hebdomadaire', '📅 Weekly'],
        ['Mon Pays', 'My Country'],
        ['🇪🇸 Mon Pays', '🇪🇸 My Country'],
        ['Amis', 'Friends'],
        ['👥 Amis', '👥 Friends'],
        ['Rang', 'Rank'],
        ['Apprenant', 'Learner'],
        ['Niveau', 'Level'],
        ['Série', 'Streak'],
        ['Total XP', 'Total XP'],
        ['Bonjour', 'Good morning'],
        ['Bon après-midi', 'Good afternoon'],
        ['Bonsoir', 'Good evening'],
        ['Audio & Vidéo 1-to-1 WebRTC', 'Audio & Video 1-to-1 WebRTC'],
        ['✨ Actif', '✨ Active'],
        ['Changer ma photo', 'Change my photo'],
        ['📷 Changer ma photo', '📷 Change my photo'],
        ['Profil Complet →', 'Full Profile →'],
        ['👤 Profil Complet →', '👤 Full Profile →'],
        ['Série Quotidienne', 'Daily Streak'],
        ['Temps de Parole', 'Speaking Time'],
        ['Points d\\'XP', 'Gamification XP'],
        ['Partenaires de Conversation Recommandés', 'Recommended Conversation Partners'],
        ['Voir Tous (8+) →', 'View All (8+) →'],
        ['🎯 Défi d\\'Anglais du Jour', '🎯 Today\\'s English Challenge'],
        ['Commencer le Défi', 'Start Challenge Now'],
        ['Discuter dans le Chat', 'Discuss in Chat'],
        ['Votre Coach IA d\\'Anglais', 'Your AI English Coach'],
        ['Stats en Direct', 'Live Stats'],
        ['Recommandation de la Semaine :', 'Weekly Recommendation:'],
        ['Activité Orale de la Semaine', 'Weekly Speaking Activity'],
        ['Salle d\\'Immersion 1-to-1', '1-to-1 Immersion Room'],
        ['Historique & Évaluation en Temps Réel', 'History & Real-time Evaluation'],
        ['Tableau de Bord des Conversations 1-to-1', '1-to-1 Conversation Dashboard'],
        ['Lancer un Nouvel Appel Direct', 'Launch New Direct Call'],
        ['Lancer la Conversation', 'Start Conversation'],
        ['Démarrer la Conversation', 'Start Conversation'],
        ['💬 Démarrer la Conversation', '💬 Start Conversation'],
        ['💬 Lancer la Conversation', '💬 Start Conversation'],
        ['Rappeler', 'Call back'],
        ['📞 Rappeler', '📞 Call back'],

        // New pairs for 100% comprehensive French translation
        ['APPEL EN DIRECT EN COURS', 'LIVE CALL IN PROGRESS'],
        ['Quitter la Salle', 'Exit Room'],
        ['🤖 Assistance du Coach IA en Direct', '🤖 AI Live Coach Assistance'],
        ['Assistance du Coach IA en Direct', 'AI Live Coach Assistance'],
        ['Objectifs Vocabulaires en Direct', 'Real-time Vocabulary Goals'],
        ['📝 Objectifs Vocabulaires en Direct', '📝 Real-time Vocabulary Goals'],
        ['Verbe à particule : "Look forward to"', 'Phrasal verb: "Look forward to"'],
        ['Poser une question ouverte', 'Ask an open-ended question'],
        ['Utiliser le passé simple correctement', 'Use simple past correctly'],
        ['Raconter une anecdote d\\'une minute', 'Give a 1-minute storytelling example'],
        ['Couper micro', 'Mute'],
        ['Activer micro', 'Unmute'],
        ['Couper caméra', 'Camera Off'],
        ['Activer caméra', 'Camera On'],
        ['Partager l\\'écran', 'Share Screen'],
        ['Ouvrir le Chat', 'Open Chat'],
        ['Terminer l\\'Appel', 'Leave Call'],
        ['Recherche d\\'un adversaire en direct...', 'Finding Live Speaking Challenger...'],
        ['Voix : ACTIVÉE', 'Voice: ON'],
        ['Voix : COUPÉE', 'Voice: OFF'],
        ['🔊 Voix : ACTIVÉE', '🔊 Voice: ON'],
        ['🔇 Voix : COUPÉE', '🔇 Voice: OFF'],
        ['Sujet du Duel en Direct :', 'Live Challenge Topic:'],
        ['🎯 Sujet du Duel en Direct :', '🎯 Live Challenge Topic:'],
        ['Mode : Duel Vocal en Direct', 'Mode: Live Speaking Duel'],
        ['Arguments Prêts à l\\'Emploi :', 'Quick Speaking Arguments:'],
        ['💡 Arguments Prêts à l\\'Emploi :', '💡 Quick Speaking Arguments:'],
        ['Réécouter la Voix du Challenger', 'Replay Challenger Voice'],
        ['🔊 Réécouter la Voix du Challenger', '🔊 Replay Challenger Voice'],
        ['Lancer l\\'Appel en Direct avec l\\'adversaire', 'Start Live Call with Opponent'],
        ['📞 Lancer l\\'Appel en Direct avec l\\'adversaire', '📞 Start Live Call with Opponent'],
        ['Passer la Main au Partenaire', 'Pass Turn to Partner'],
        ['🔄 Passer la Main au Partenaire', '🔄 Pass Turn to Partner'],
        ['Round Suivant', 'Next Round'],
        ['➡️ Round Suivant', '➡️ Next Round'],
        ['Soumettre le Duel pour Évaluation IA', 'Submit Duel for AI Level Evaluation'],
        ['⚖️ Soumettre le Duel pour Évaluation IA', '⚖️ Submit Duel for AI Level Evaluation'],
        ['Votre Résultat Vérifié', 'Your Verified Result'],
        ['Résultat de l\\'Adversaire', 'Challenger Result'],
        ['Diagnostic de l\\'Arbitre IA :', 'AI Level Referee Diagnostic:'],
        ['🤖 Diagnostic de l\\'Arbitre IA :', '🤖 AI Level Referee Diagnostic:'],
        ['Récompense Obtenue :', 'Reward Earned:'],
        ['Copier l\\'Attestation CECRL', 'Copy CEFR Scorecard'],
        ['📋 Copier l\\'Attestation CECRL', '📋 Copy CEFR Scorecard'],
        ['Rejouer avec un Autre Partenaire', 'Rematch Another Partner'],
        ['🔁 Rejouer avec un Autre Partenaire', '🔁 Rematch Another Partner'],
        ['Réclamer mes XP & Terminer', 'Claim XP & Finish'],
        ['Conversations Actives', 'Active Conversations'],
        ['Le partenaire est en train d\\'écrire en anglais...', 'Partner is typing a response in English...'],
        ['Vérification IA', 'AI Grammar Check'],
        ['✨ Vérification IA', '✨ AI Grammar Check'],
        ['En ligne — Prêt à échanger', 'Online — Ready to practice'],
        ['En ligne', 'Online now'],
        ['Vu il y a 2h', 'Seen 2h ago'],
        ['Bon retour parmi nous', 'Welcome Back'],
        ['Connexion à English Booster', 'Log into English Booster'],
        ['Reprenez là où vous vous êtes arrêté et entretenez votre série quotidienne.', 'Pick up where you left off and keep your daily streak alive.'],
        ['Profils Démo en 1 Clic (Accès Immédiat)', '1-Click Demo Profiles (Instant Access)'],
        ['⚡ Profils Démo en 1 Clic (Accès Immédiat)', '⚡ 1-Click Demo Profiles (Instant Access)'],
        ['ou connectez-vous par email', 'or log in with email'],
        ['Mot de passe oublié ?', 'Forgot password?'],
        ['Se souvenir de cet appareil pendant 30 jours', 'Remember this device for 30 days'],
        ['Se Connecter au Tableau de Bord', 'Log In to Dashboard'],
        ['Nouveau ici ?', 'New here?'],
        ['Déjà membre ?', 'Already a member?'],
        ['Communauté Mondiale d\\'Anglais', 'Global English Community'],
        ['Créez votre compte English Booster', 'Create your English Booster account'],
        ['Commencez à parler anglais avec assurance avec des partenaires bienveillants du monde entier.', 'Start speaking English confidently with friendly international partners.'],
        ['ou inscrivez-vous avec votre email', 'or register with email'],
        ['Nom Complet *', 'Full Name *'],
        ['Nom Complet', 'Full Name'],
        ['Adresse Email *', 'Email Address *'],
        ['Mot de passe *', 'Password *'],
        ['Numéro de Téléphone', 'Phone Number'],
        ['Sélectionnez Votre Niveau d\\'Anglais (CECRL)', 'Select Your English Level (CEFR)'],
        ['A1/A2 : Débutant/Élémentaire · B1/B2 : Intermédiaire/Supérieur · C1/C2 : Avancé/Bilingue', 'A1/A2: Beginner/Elementary · B1/B2: Intermediate/Upper · C1/C2: Advanced/Proficient'],
        ['Objectif Principal d\\'Apprentissage', 'Main Learning Goal'],
        ['Centres d\\'intérêt & Sujets de Discussion', 'Interests & Topics to Discuss'],
        ['J\\'accepte les', 'I agree to the'],
        ['Conditions d\\'utilisation', 'Terms'],
        ['Conditions', 'Terms'],
        ['Politique de Confidentialité', 'Privacy Policy'],
        ['Créer Mon Compte', 'Create Account'],
        ['Mon Profil', 'My Profile'],
        ['Présentation Audio (0:20)', 'Audio Intro (0:20)'],
        ['🎙️ Présentation Audio (0:20)', '🎙️ Audio Intro (0:20)'],
        ['Passer le Test CECRL', 'Take CEFR Test'],
        ['📝 Passer le Test CECRL', '📝 Take CEFR Test'],
        ['Minutes Parlées', 'Mins Spoken'],
        ['Note des Partenaires', 'Partner Rating'],
        ['Paramètres du Profil & Objectifs', 'Profile Settings & Learning Goals'],
        ['Objectif Principal', 'Primary Goal'],
        ['Niveau CECRL Actuel', 'Current CEFR Level'],
        ['Biographie & Préférences d\\'Échange', 'Bio & Conversation Preferences'],
        ['Enregistrer les Modifications', 'Save Profile Changes'],
        ['Mes Badges Débloqués', 'My Unlocked Badges'],
        ['Première Conversation', 'First Conversation'],
        ['1er appel en direct complété', 'Completed 1st live call'],
        ['Série de 7 Jours', '7 Day Streak'],
        ['Pratique pendant 7 jours consécutifs', 'Practiced 7 days in a row'],
        ['Locuteur International', 'Global Speaker'],
        ['Échanges avec 5+ pays différents', 'Spoke with 5+ countries'],
        ['Enrichisseur de Vocabulaire', 'Vocabulary Builder'],
        ['50+ expressions maîtrisées', 'Mastered 50+ expressions'],
        ['Fondateur & Créateur', 'Founder & Creator'],
        ['Architecte Full-Stack & Entrepreneur EdTech', 'Lead Full-Stack Architect · EdTech Entrepreneur'],
        ['Coordonnées Directes :', 'Direct Contact Information:'],
        ['Que se passe-t-il si je fais des erreurs en parlant ?', 'What if I make mistakes while speaking?'],
        ['Comment fonctionne le score d\\'affinité IA ?', 'How does the AI Match Score work?'],
        ['Puis-je pratiquer en audio sans activer ma caméra ?', 'Can I practice using audio without turning on my video?'],
        ['Comment joindre le fondateur ou envoyer un retour ?', 'How can I reach the founder or report feedback?'],
        ['Guide Interactif en 3 Étapes', 'Interactive 3-Step Walkthrough'],
        ['Maîtriser l\\'Anglais Oral en 3 Étapes', 'Mastering Spoken English in 3 Steps'],
        ['De zéro pratique à des conversations internationales en toute confiance.', 'From zero speaking practice to confident international conversations.'],
        ['Créer un Profil', 'Create Profile'],
        ['Trouver un Partenaire', 'Find Partner'],
        ['Commencer à Parler', 'Start Speaking'],
        ['Nom complet ou pseudo', 'Full Name or Nickname'],
        ['Votre Langue Maternelle', 'Your Native Language'],
        ['Sélectionnez votre niveau CECRL actuel', 'Select Your Current English Level (CEFR)'],
        ['Votre Objectif Principal d\\'Expression', 'Your Primary Speaking Goal'],
        ['Choisir un Avatar', 'Choose Avatar'],
        ['Aperçu du Profil en Direct', 'Live Profile Preview'],
        ['Enregistrer le Profil & Trouver un Partenaire ➔', 'Save Profile & Find Partner ➔'],
        ['L\\'IA a trouvé 3 partenaires compatibles disponibles maintenant', 'AI Engine matched 3 compatible partners available now'],
        ['⬅ Retour au Profil', '⬅ Back to Profile'],
        ['Parcourir les 50+ Partenaires 🌐', 'Browse All 50+ Partners 🌐'],
        ['Se connecter avec Sofia & Commencer à Parler ➔', 'Connect with Sofia & Start Speaking ➔'],
        ['En Session d\\'Appel', 'In Call Session'],
        ['Terminer la Démo & Réclamer les XP', 'Finish Demo & Claim XP'],
        ['Étape 01', 'Step 01'],
        ['Étape 02', 'Step 02'],
        ['Étape 03', 'Step 03'],
        ['Étape 04', 'Step 04'],
        ['1. Créer Mon Profil', '1. Create My Profile'],
        ['👤 1. Créer Mon Profil', '👤 1. Create My Profile'],
        ['2. Trouver un Partenaire IA', '2. Find AI Partner'],
        ['🤝 2. Trouver un Partenaire IA', '🤝 2. Find AI Partner'],
        ['3. Parler Maintenant', '3. Start Speaking Now'],
        ['🎙️ 3. Parler Maintenant', '🎙️ 3. Start Speaking Now'],
        ['4. Duels & XP ➔', '4. Battles & XP ➔'],
        ['🏆 4. Duels & XP ➔', '🏆 4. Battles & XP ➔'],
        ['👁️ Masquer', '👁️ Hide'],
        ['🙈 Masquer', '🙈 Hide'],
        ['👁️ Afficher', '👁️ Show'],
        ['✓ Correspond', '✓ Match'],
        ['✕ Ne correspond pas', '✕ No match'],
        ['Excellente Conversation !', 'Great Conversation!'],
        ['Durée', 'Duration'],
        ['Bonus XP', 'Bonus XP'],
        ['Notes du Coach IA :', 'AI Coach Session Notes:'],
        ['Aller au Tableau de Bord', 'Go to Dashboard'],
        ['Trouver un Autre Partenaire', 'Find Next Partner'],
        ['✨ Correction d\\'anglais par l\\'IA', '✨ AI English Correction'],
        ['Explication :', 'Explanation:'],
        ['🎙️ Parler au Coach', '🎙️ Speak to Coach'],
        ['⏹️ Écoute en cours...', '⏹️ Listening...']
      ];

      // Scan and translate matching elements
      const targetSelectors = 'h1, h2, h3, h4, h5, th, td, label, .section-tag, .section-title, .btn, .crystal-badge, .short-metric-lbl, .form-label, .form-label strong, .form-label span, select option, .nav-link, .mobile-nav-link, .shorts-page-title, .step-title, .step-card-badge, .badge-level, .stat-lbl, .m-lbl';
      document.querySelectorAll(targetSelectors).forEach(el => {
        // If element already has explicit data-i18n, skip manual matching
        if (el.hasAttribute('data-i18n')) return;

        const currentText = el.textContent.trim();
        for (const [frText, enText] of phrasePairs) {
          if (isFr && currentText === enText) {
            el.textContent = frText;
            break;
          } else if (!isFr && currentText === frText) {
            el.textContent = enText;
            break;
          }
        }
      });

      // Partial text replacement for 'Watch Videos' / 'Regardez les vidéos'
      document.querySelectorAll('.nav-link, .mobile-nav-link, .dock-item span, .crystal-badge, .shorts-page-title').forEach(el => {
        if (el.hasAttribute('data-i18n')) return;
        if (isFr) {
          if (el.innerHTML.includes('Watch Videos')) {
            el.innerHTML = el.innerHTML.replace(/Watch Videos/g, 'Regardez les vidéos');
          }
          if (el.innerHTML.includes('watch videos')) {
            el.innerHTML = el.innerHTML.replace(/watch videos/g, 'regardez les vidéos');
          }
        } else {
          if (el.innerHTML.includes('Regardez les vidéos')) {
            el.innerHTML = el.innerHTML.replace(/Regardez les vidéos/g, 'Watch Videos');
          }
          if (el.innerHTML.includes('regardez les vidéos')) {
            el.innerHTML = el.innerHTML.replace(/regardez les vidéos/g, 'watch videos');
          }
        }
      });

      // Specific enforcement for Quick Duel and Live Call buttons
      const quickDuelBtn = document.getElementById('btn-quick-random-battle');
      if (quickDuelBtn) {
        quickDuelBtn.textContent = isFr ? '⚡ Duel Aléatoire Rapide & Appel en Direct' : '⚡ Quick Random Duel & Live Call';
      }
      const quickCallBtn = document.getElementById('btn-quick-random-call');
      if (quickCallBtn) {
        quickCallBtn.textContent = isFr ? '🎙️ Appel en Direct' : '🎙️ Live Call';
      }
      const battleLiveCallBtn = document.getElementById('btn-battle-live-call');
      if (battleLiveCallBtn) {
        battleLiveCallBtn.textContent = isFr ? '🎙️ Passer en Appel en Direct' : '🎙️ Switch to Live Call';
      }
      const partnerLiveCallBtn = document.getElementById('btn-partner-live-call');
      if (partnerLiveCallBtn) {
        partnerLiveCallBtn.textContent = isFr ? '📞 Lancer l\\'Appel en Direct avec l\\'adversaire' : '📞 Start Live Call with Opponent';
      }

      // Specific enforcement for 'repeat the pass word' in English mode
      document.querySelectorAll('label[for="reg-confirm-password"]').forEach(lbl => {
        const strong = lbl.querySelector('strong');
        if (strong) {
          strong.textContent = isFr ? 'Répétez le mot de passe :' : 'Repeat the pass word :';
        } else {
          lbl.textContent = isFr ? 'Répétez le mot de passe *' : 'Repeat the pass word *';
        }
      });
      document.querySelectorAll('input#reg-confirm-password').forEach(inp => {
        inp.setAttribute('placeholder', isFr ? 'Répétez le mot de passe...' : 'repeat the pass word...');
      });
    }

    setupDynamicObserver() {
      if (this.observer) return;
      this.observer = new MutationObserver((mutations) => {
        if (this.currentLang === 'fr') {
          // Re-run light DOM translation on newly added elements
          let hasAddedNodes = false;
          for (const m of mutations) {
            if (m.addedNodes && m.addedNodes.length > 0) {
              hasAddedNodes = true;
              break;
            }
          }
          if (hasAddedNodes) {
            this.translateDOM();
          }
        }
      });

      this.observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }

    updateSwitcherUI() {
      const lang = this.currentLang;
      // Update dual pills
      document.querySelectorAll('.lang-switcher-pill').forEach(pill => {
        const btnEn = pill.querySelector('[data-lang="en"]');
        const btnFr = pill.querySelector('[data-lang="fr"]');
        if (btnEn) btnEn.classList.toggle('active', lang === 'en');
        if (btnFr) btnFr.classList.toggle('active', lang === 'fr');
      });

      // Update single toggle buttons
      document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
        const flag = btn.querySelector('.lang-flag');
        const text = btn.querySelector('.lang-text');
        if (flag) flag.textContent = lang === 'en' ? '🇬🇧' : '🇫🇷';
        if (text) text.textContent = lang.toUpperCase();
        btn.setAttribute('title', this.t('switch_lang_title'));
      });
    }

    injectSwitcherIntoNav() {
      const navActionsList = document.querySelectorAll('.nav-actions');
      navActionsList.forEach(navActions => {
        if (!navActions.querySelector('.lang-switcher-pill')) {
          const pill = document.createElement('div');
          pill.className = 'lang-switcher-pill';
          pill.setAttribute('role', 'group');
          pill.setAttribute('aria-label', 'Language Selector');
          pill.innerHTML = \`
            <button type="button" class="lang-btn \${this.currentLang === 'en' ? 'active' : ''}" data-lang="en" title="English">
              <span>🇬🇧</span> EN
            </button>
            <button type="button" class="lang-btn \${this.currentLang === 'fr' ? 'active' : ''}" data-lang="fr" title="Français">
              <span>🇫🇷</span> FR
            </button>
          \`;

          pill.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
              e.preventDefault();
              const targetLang = btn.getAttribute('data-lang');
              if (targetLang !== this.currentLang) {
                if (window.EnglishBooster && window.EnglishBooster.SoundFX) {
                  window.EnglishBooster.SoundFX.playClick();
                }
                this.setLanguage(targetLang, true);
              }
            });
          });

          const themeBtn = navActions.querySelector('.theme-toggle-btn');
          if (themeBtn) {
            navActions.insertBefore(pill, themeBtn);
          } else {
            navActions.prepend(pill);
          }
        }
      });

      const drawer = document.getElementById('mobile-drawer') || document.querySelector('.mobile-drawer');
      if (drawer && !drawer.querySelector('.lang-drawer-wrap')) {
        const drawerPillWrap = document.createElement('div');
        drawerPillWrap.className = 'lang-drawer-wrap';
        drawerPillWrap.style.cssText = 'padding: 12px 0; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--glass-border); margin-bottom: 12px;';
        drawerPillWrap.innerHTML = \`
          <span style="font-size: 0.88rem; font-weight: 700; color: var(--text-muted); display: flex; align-items: center; gap: 6px;">
            <span>🌐</span> Langue / Language
          </span>
          <div class="lang-switcher-pill" role="group">
            <button type="button" class="lang-btn \${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">
              <span>🇬🇧</span> EN
            </button>
            <button type="button" class="lang-btn \${this.currentLang === 'fr' ? 'active' : ''}" data-lang="fr">
              <span>🇫🇷</span> FR
            </button>
          </div>
        \`;

        drawerPillWrap.querySelectorAll('.lang-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetLang = btn.getAttribute('data-lang');
            if (targetLang !== this.currentLang) {
              if (window.EnglishBooster && window.EnglishBooster.SoundFX) {
                window.EnglishBooster.SoundFX.playClick();
              }
              this.setLanguage(targetLang, true);
            }
          });
        });

        const drawerNavLinks = drawer.querySelector('.mobile-nav-links');
        if (drawerNavLinks) {
          drawer.insertBefore(drawerPillWrap, drawerNavLinks);
        } else {
          drawer.prepend(drawerPillWrap);
        }
      }
    }

    bindAllSwitchers() {
      document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.bound) return;
        btn.dataset.bound = 'true';
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetLang = btn.getAttribute('data-lang');
          if (targetLang && targetLang !== this.currentLang) {
            if (window.EnglishBooster && window.EnglishBooster.SoundFX) {
              window.EnglishBooster.SoundFX.playClick();
            }
            this.setLanguage(targetLang, true);
          }
        });
      });
    }
  }

  // 3. INITIALIZATION
  const i18n = new I18nEngine();

  // Export to EnglishBooster namespace
  window.EnglishBooster = window.EnglishBooster || {};
  window.EnglishBooster.i18n = i18n;
  window.EnglishBooster.t = (key, fallback) => i18n.t(key, fallback);
  window.EnglishBooster.isFrench = () => i18n.isFrench();
  window.EnglishBooster.getLang = () => i18n.getLang();

  document.addEventListener('DOMContentLoaded', () => {
    i18n.injectSwitcherIntoNav();
    i18n.bindAllSwitchers();
    i18n.setLanguage(i18n.getLang(), false);
    i18n.setupDynamicObserver();
  });

})();
`;

fs.writeFileSync('js/i18n.js', header, 'utf8');
console.log('Successfully updated js/i18n.js with extended dictionaries and smart DOM translation!');
