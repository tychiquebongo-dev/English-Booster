const fs = require('fs');

const original = fs.readFileSync('scratch/i18n.js.bak', 'utf8');

// Load existing translations
const match = original.match(/const translations = (\{[\s\S]*?\n  \};\n\n  \/\/ 2\.)/);
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

// 2. Add new dictionary keys
const newKeys = {
  // Page Titles
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

  // Auth / Login Page
  login_welcome_back: {
    en: 'Welcome Back',
    fr: 'Bon retour parmi nous'
  },
  login_title: {
    en: 'Log into English Booster',
    fr: 'Connexion à English Booster'
  },
  login_subtitle: {
    en: 'Pick up where you left off and keep your daily streak alive.',
    fr: 'Reprenez là où vous vous êtes arrêté et entretenez votre série quotidienne.'
  },
  login_demo_title: {
    en: '⚡ 1-Click Demo Profiles (Instant Access)',
    fr: '⚡ Profils Démo en 1 Clic (Accès Immédiat)'
  },
  login_or_email: {
    en: 'or log in with email',
    fr: 'ou connectez-vous par email'
  },
  login_email_label: {
    en: 'Email Address',
    fr: 'Adresse Email'
  },
  login_password_label: {
    en: 'Password',
    fr: 'Mot de passe'
  },
  login_forgot: {
    en: 'Forgot password?',
    fr: 'Mot de passe oublié ?'
  },
  login_remember: {
    en: 'Remember this device for 30 days',
    fr: 'Se souvenir de cet appareil pendant 30 jours'
  },
  login_btn_submit: {
    en: 'Log In to Dashboard',
    fr: 'Se Connecter au Tableau de Bord'
  },
  login_new_here: {
    en: 'New here?',
    fr: 'Nouveau ici ?'
  },
  login_create_acc: {
    en: 'Get Started',
    fr: 'Créer un compte'
  },

  // Auth / Register Page
  reg_already_member: {
    en: 'Already a member?',
    fr: 'Déjà membre ?'
  },
  reg_login_link: {
    en: 'Log in',
    fr: 'Connexion'
  },
  reg_badge: {
    en: 'Global English Community',
    fr: 'Communauté Mondiale d\'Anglais'
  },
  reg_title: {
    en: 'Create your English Booster account',
    fr: 'Créez votre compte English Booster'
  },
  reg_subtitle: {
    en: 'Start speaking English confidently with friendly international partners.',
    fr: 'Commencez à parler anglais avec assurance avec des partenaires bienveillants du monde entier.'
  },
  reg_or_email: {
    en: 'or register with email',
    fr: 'ou inscrivez-vous avec votre email'
  },
  reg_fullname_label: {
    en: 'Full Name *',
    fr: 'Nom Complet *'
  },
  reg_email_label: {
    en: 'Email Address *',
    fr: 'Adresse Email *'
  },
  reg_password_label: {
    en: 'Password *',
    fr: 'Mot de passe *'
  },
  reg_phone_label: {
    en: 'Phone Number',
    fr: 'Numéro de Téléphone'
  },
  reg_country_label: {
    en: 'Country',
    fr: 'Pays'
  },
  reg_native_lang_label: {
    en: 'Native Language',
    fr: 'Langue Maternelle'
  },
  reg_level_label: {
    en: 'Select Your English Level (CEFR)',
    fr: 'Sélectionnez Votre Niveau d\'Anglais (CECRL)'
  },
  reg_level_sub: {
    en: 'A1/A2: Beginner/Elementary · B1/B2: Intermediate/Upper · C1/C2: Advanced/Proficient',
    fr: 'A1/A2 : Débutant/Élémentaire · B1/B2 : Intermédiaire/Supérieur · C1/C2 : Avancé/Bilingue'
  },
  reg_goal_label: {
    en: 'Main Learning Goal',
    fr: 'Objectif Principal d\'Apprentissage'
  },
  reg_interests_label: {
    en: 'Interests & Topics to Discuss',
    fr: 'Centres d\'intérêt & Sujets de Discussion'
  },
  reg_terms_label: {
    en: 'I agree to the',
    fr: 'J\'accepte les'
  },
  reg_terms_link: {
    en: 'Terms',
    fr: 'Conditions d\'utilisation'
  },
  reg_and: {
    en: 'and',
    fr: 'et la'
  },
  reg_privacy_link: {
    en: 'Privacy Policy',
    fr: 'Politique de Confidentialité'
  },
  reg_btn_submit: {
    en: 'Create Account',
    fr: 'Créer Mon Compte'
  },
  reg_warmup_badge: {
    en: 'Instant Vocal Warmup',
    fr: 'Échauffement Vocal Immédiat'
  },
  reg_warmup_title: {
    en: 'Live Conversation Match',
    fr: 'Partie de Conversation en Direct'
  },
  reg_warmup_sub: {
    en: 'Test your spoken English right now! Pick a speaking partner below, speak via mic or type, hear native audio replies, and earn your first XP points:',
    fr: 'Testez votre anglais en direct dès maintenant ! Choisissez un interlocuteur ci-dessous, parlez au micro ou écrivez, écoutez ses réponses vocales et gagnez vos premiers points d\'XP :'
  },

  // Profile Page
  profile_title: {
    en: 'My Profile',
    fr: 'Mon Profil'
  },
  profile_audio_intro: {
    en: '🎙️ Audio Intro (0:20)',
    fr: '🎙️ Présentation Audio (0:20)'
  },
  profile_take_test: {
    en: '📝 Take CEFR Test',
    fr: '📝 Passer le Test CECRL'
  },
  profile_stat_minutes: {
    en: 'Mins Spoken',
    fr: 'Minutes Parlées'
  },
  profile_stat_convs: {
    en: 'Conversations',
    fr: 'Conversations'
  },
  profile_stat_xp: {
    en: 'Total XP',
    fr: 'Total XP'
  },
  profile_stat_rating: {
    en: 'Partner Rating',
    fr: 'Note des Partenaires'
  },
  profile_settings_title: {
    en: 'Profile Settings & Learning Goals',
    fr: 'Paramètres du Profil & Objectifs'
  },
  profile_fullname: {
    en: 'Full Name',
    fr: 'Nom Complet'
  },
  profile_email: {
    en: 'Email Address',
    fr: 'Adresse Email'
  },
  profile_primary_goal: {
    en: 'Primary Goal',
    fr: 'Objectif Principal'
  },
  profile_cefr_level: {
    en: 'Current CEFR Level',
    fr: 'Niveau CECRL Actuel'
  },
  profile_bio_label: {
    en: 'Bio & Conversation Preferences',
    fr: 'Biographie & Préférences d\'Échange'
  },
  profile_btn_save: {
    en: 'Save Profile Changes',
    fr: 'Enregistrer les Modifications'
  },
  profile_badges_title: {
    en: 'My Unlocked Badges',
    fr: 'Mes Badges Débloqués'
  },
  profile_badge_first_call: {
    en: 'First Conversation',
    fr: 'Première Conversation'
  },
  profile_badge_first_call_desc: {
    en: 'Completed 1st live call',
    fr: '1er appel en direct complété'
  },
  profile_badge_streak: {
    en: '7 Day Streak',
    fr: 'Série de 7 Jours'
  },
  profile_badge_streak_desc: {
    en: 'Practiced 7 days in a row',
    fr: 'Pratique pendant 7 jours consécutifs'
  },
  profile_badge_global: {
    en: 'Global Speaker',
    fr: 'Locuteur International'
  },
  profile_badge_global_desc: {
    en: 'Spoke with 5+ countries',
    fr: 'Échanges avec 5+ pays différents'
  },
  profile_badge_vocab: {
    en: 'Vocabulary Builder',
    fr: 'Enrichisseur de Vocabulaire'
  },
  profile_badge_vocab_desc: {
    en: 'Mastered 50+ expressions',
    fr: '50+ expressions maîtrisées'
  },

  // Call Page
  call_in_progress: {
    en: 'LIVE CALL IN PROGRESS',
    fr: 'APPEL EN DIRECT EN COURS'
  },
  call_exit_room: {
    en: 'Exit Room',
    fr: 'Quitter la Salle'
  },
  call_live_coach: {
    en: '🤖 AI Live Coach Assistance',
    fr: '🤖 Assistance du Coach IA en Direct'
  },
  call_goals_title: {
    en: '📝 Real-time Vocabulary Goals',
    fr: '📝 Objectifs Vocabulaires en Direct'
  },
  call_goal_1: {
    en: 'Phrasal verb: "Look forward to"',
    fr: 'Verbe à particule : "Look forward to"'
  },
  call_goal_2: {
    en: 'Ask an open-ended question',
    fr: 'Poser une question ouverte'
  },
  call_goal_3: {
    en: 'Use simple past correctly',
    fr: 'Utiliser le passé simple correctement'
  },
  call_goal_4: {
    en: 'Give a 1-minute storytelling example',
    fr: 'Raconter une anecdote d\'une minute'
  },
  call_btn_mute: {
    en: 'Mute',
    fr: 'Couper micro'
  },
  call_btn_unmute: {
    en: 'Unmute',
    fr: 'Activer micro'
  },
  call_btn_camera_off: {
    en: 'Camera Off',
    fr: 'Couper caméra'
  },
  call_btn_camera_on: {
    en: 'Camera On',
    fr: 'Activer caméra'
  },
  call_btn_screen: {
    en: 'Share Screen',
    fr: 'Partager l\'écran'
  },
  call_btn_chat: {
    en: 'Open Chat',
    fr: 'Ouvrir le Chat'
  },
  call_btn_leave: {
    en: 'Leave Call',
    fr: 'Terminer l\'Appel'
  },

  // Chat Page
  chat_active_convs: {
    en: 'Active Conversations',
    fr: 'Conversations Actives'
  },
  chat_typing_hint: {
    en: 'Partner is typing a response in English...',
    fr: 'Le partenaire est en train d\'écrire en anglais...'
  },
  chat_ph_input: {
    en: 'Type a message in English (or try: I agree, have went)...',
    fr: 'Tapez un message en anglais (ou testez : I agree, have went)...'
  },
  chat_btn_send: {
    en: 'Send',
    fr: 'Envoyer'
  },
  chat_ai_grammar_btn: {
    en: '✨ AI Grammar Check',
    fr: '✨ Vérification IA'
  },

  // About FAQ & Founder Details
  about_founder_subtitle: {
    en: 'Lead Full-Stack Architect · EdTech Entrepreneur',
    fr: 'Architecte Full-Stack & Entrepreneur EdTech'
  },
  about_direct_contact: {
    en: 'Direct Contact Information:',
    fr: 'Coordonnées Directes :'
  },
  about_faq_tag: {
    en: 'FAQ',
    fr: 'FAQ'
  },
  about_faq_title: {
    en: 'Common Questions',
    fr: 'Questions Fréquentes'
  },
  about_faq_q1: {
    en: 'What if I make mistakes while speaking?',
    fr: 'Que se passe-t-il si je fais des erreurs en parlant ?'
  },
  about_faq_a1: {
    en: 'Making mistakes is the foundation of spoken language acquisition! English Booster fosters a supportive, zero-judgment atmosphere. Both your partner and our AI assistant are here to help you grow.',
    fr: 'Faire des erreurs est le fondement même de l\'apprentissage d\'une langue ! English Booster favorise un climat bienveillant et sans aucun jugement. Votre partenaire et l\'assistant IA sont là pour vous faire progresser.'
  },
  about_faq_q2: {
    en: 'How does the AI Match Score work?',
    fr: 'Comment fonctionne le score d\'affinité IA ?'
  },
  about_faq_a2: {
    en: 'Our algorithm evaluates your CEFR level, target goals (e.g. travel vs. career), shared interests, and typical availability timezones to suggest the most compatible practice partners.',
    fr: 'Notre algorithme évalue votre niveau CECRL, vos objectifs (voyage, carrière), vos centres d\'intérêt communs et vos fuseaux horaires pour vous suggérer les partenaires les plus compatibles.'
  },
  about_faq_q3: {
    en: 'Can I practice using audio without turning on my video?',
    fr: 'Puis-je pratiquer en audio sans activer ma caméra ?'
  },
  about_faq_a3: {
    en: 'Yes! You have full control. You can exchange voice notes in chat, join audio-only calls, or turn on your camera whenever you feel comfortable.',
    fr: 'Oui ! Vous avez le contrôle total. Vous pouvez échanger par notes vocales, rejoindre des appels audio uniquement ou activer votre vidéo lorsque vous vous sentez prêt.'
  },
  about_faq_q4: {
    en: 'How can I reach the founder or report feedback?',
    fr: 'Comment joindre le fondateur ou envoyer un retour ?'
  },
  about_faq_a4: {
    en: 'You can reach Tychique Bongo directly via WhatsApp (+242 905 37 12), phone (+225 07 05 88 46 87), or email. We read and implement community feedback every single week!',
    fr: 'Vous pouvez joindre Tychique Bongo directement via WhatsApp (+242 905 37 12), téléphone (+225 07 05 88 46 87) ou email. Nous lisons et intégrons les retours de la communauté chaque semaine !'
  },
  about_legal_title: {
    en: 'Legal & Community Guidelines',
    fr: 'Règles Communautaires & Mentions Légales'
  },

  // Watch Videos Page
  watch_briefing_badge: {
    en: '💼 Executive Video Briefings & Masterclasses',
    fr: '💼 Briefings Vidéo Exécutifs & Masterclasses'
  },
  watch_format_badge: {
    en: 'Format Pro 9:16 & Fiches de Synthèse',
    fr: 'Format Pro 9:16 & Fiches de Synthèse'
  },
  watch_micro_classes: {
    en: 'Micro-Masterclasses for Professionals',
    fr: 'Micro-Masterclasses pour Professionnels'
  },
  watch_micro_desc: {
    en: 'Condensed video modules (30 to 60s) tailored for executives, founders, and professionals: contract negotiations, C-Suite speeches, tech pitches, intercultural diplomacy, and downloadable executive vocabulary sheets.',
    fr: 'Capsules vidéo condensées (30 à 60s) conçues pour cadres, entrepreneurs et professionnels : négociation de contrats, prises de parole en C-Suite, elevator pitches tech, diplomatie interculturelle et dossiers de vocabulaire exécutif téléchargeables.'
  },
  watch_btn_live_masterclass: {
    en: '🔴 Launch Live Masterclass',
    fr: '🔴 Lancer une Masterclass en Direct'
  },
  watch_stat_briefings: {
    en: 'Executive Briefings',
    fr: 'Briefings Exécutifs'
  },
  watch_stat_live: {
    en: 'Live Masterclasses',
    fr: 'Masterclasses Live'
  },
  watch_stat_views: {
    en: 'Pro Views',
    fr: 'Vues Pro'
  },
  watch_stat_target: {
    en: 'Target Level (100% EN)',
    fr: 'Niveau Visé (100% EN)'
  },

  // Wizard Interactive
  wiz_badge: {
    en: 'Interactive 3-Step Walkthrough',
    fr: 'Guide Interactif en 3 Étapes'
  },
  wiz_title: {
    en: 'Mastering Spoken English in 3 Steps',
    fr: 'Maîtriser l\'Anglais Oral en 3 Étapes'
  },
  wiz_subtitle: {
    en: 'From zero speaking practice to confident international conversations.',
    fr: 'De zéro pratique à des conversations internationales en toute confiance.'
  },
  wiz_tab_1: {
    en: 'Create Profile',
    fr: 'Créer un Profil'
  },
  wiz_tab_2: {
    en: 'Find Partner',
    fr: 'Trouver un Partenaire'
  },
  wiz_tab_3: {
    en: 'Start Speaking',
    fr: 'Commencer à Parler'
  },
  wiz_label_name: {
    en: 'Full Name or Nickname',
    fr: 'Nom complet ou pseudo'
  },
  wiz_label_native_lang: {
    en: 'Your Native Language',
    fr: 'Votre Langue Maternelle'
  },
  wiz_label_level: {
    en: 'Select Your Current English Level (CEFR)',
    fr: 'Sélectionnez votre niveau CECRL actuel'
  },
  wiz_label_goal: {
    en: 'Your Primary Speaking Goal',
    fr: 'Votre Objectif Principal d\'Expression'
  },
  wiz_label_avatar: {
    en: 'Choose Avatar',
    fr: 'Choisir un Avatar'
  },
  wiz_preview_badge: {
    en: 'Live Profile Preview',
    fr: 'Aperçu du Profil en Direct'
  },
  wiz_btn_save_find: {
    en: 'Save Profile & Find Partner ➔',
    fr: 'Enregistrer le Profil & Trouver un Partenaire ➔'
  },
  wiz_matched_count: {
    en: 'AI Engine matched 3 compatible partners available now',
    fr: 'L\'IA a trouvé 3 partenaires compatibles disponibles maintenant'
  },
  wiz_btn_back_profile: {
    en: '⬅ Back to Profile',
    fr: '⬅ Retour au Profil'
  },
  wiz_btn_browse_all: {
    en: 'Browse All 50+ Partners 🌐',
    fr: 'Parcourir les 50+ Partenaires 🌐'
  },
  wiz_btn_connect_speak: {
    en: 'Connect with Sofia & Start Speaking ➔',
    fr: 'Se connecter avec Sofia & Commencer à Parler ➔'
  },
  wiz_in_call_status: {
    en: 'In Call Session',
    fr: 'En Session d\'Appel'
  },
  wiz_btn_end_demo: {
    en: 'Finish Demo & Claim XP',
    fr: 'Terminer la Démo & Réclamer les XP'
  }
};

for (const [k, v] of Object.entries(newKeys)) {
  translations.en[k] = v.en;
  translations.fr[k] = v.fr;
}

console.log('New EN keys count:', Object.keys(translations.en).length);
console.log('New FR keys count:', Object.keys(translations.fr).length);

// Generate JSON string for translations object
const enStr = JSON.stringify(translations.en, null, 2);
const frStr = JSON.stringify(translations.fr, null, 2);

console.log('Ready to write i18n file.');
