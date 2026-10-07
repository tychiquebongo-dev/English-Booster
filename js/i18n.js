/**
 * ENGLISH BOOSTER — INTERNATIONALIZATION (i18n) ENGINE
 * Languages supported: English (en) & Français (fr)
 * Architecture: Vanilla ES6, High-Performance, Persistent Storage, Reactive DOM Translation
 */

(function () {
  'use strict';

  // 1. DICTIONARIES (ENGLISH & FRANÇAIS)
  const translations = {
    en: {
      // Common & Meta
      app_name: 'ENGLISH BOOSTER',
      app_tagline: '"Connect. Speak. Improve." — Breaking language barriers worldwide through natural human conversation and smart AI feedback.',
      switch_lang_title: 'Switch language to French / Passer en Français',
      lang_en: 'EN',
      lang_fr: 'FR',
      live: 'Live',
      online: 'Online',
      offline: 'Offline',
      minutes: 'min',
      share: 'Share',
      close: 'Close',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      back: 'Back',

      // Navigation
      nav_home: 'Home',
      nav_inscrits: 'Inscrivez-vous',
      nav_how_it_works: 'How it works',
      nav_partners: 'Find Partners',
      nav_watch: 'Watch Videos',
      nav_community: 'Community',
      nav_challenges: 'Challenges',
      nav_pricing: 'Pricing',
      nav_about: 'About',
      nav_login: 'Log in',
      nav_get_started: 'Get Started',
      nav_dashboard: 'Dashboard',
      nav_chat: 'Live Chat',
      nav_discover: 'Discover',
      nav_profile: 'Profile',

      // Hero Section
      hero_badge_edtech: '✨ EdTech International Platform',
      hero_badge_conversations: '🔥 50,000+ Active Conversations',
      hero_title_prefix: 'Improve Your English by ',
      hero_title_accent: 'Speaking With the World.',
      hero_subtitle: 'Connect with people from around the world, practice real conversations, and build the confidence to speak English naturally.',
      hero_btn_call: '🎙️ Direct 1-to-1 Call (3s)',
      hero_btn_match: '⚡ Fast Matchmaking',
      hero_trust_text: 'Joined by <strong>10,000+ passionate learners</strong> from 100+ countries today.',
      hero_live_chip: 'Live: <strong>Sofia 🇪🇸</strong> & <strong>Kenji 🇯🇵</strong>',
      hero_ai_chip: '✨ AI Feedback: <strong>"98% Fluency Score"</strong>',

      // Mission Statement Card
      mission_badge: '✨ Our Global Mission',
      mission_badge_core: '✨ Core Mission',
      mission_tag: 'Authentic Real-Time English Exchange',
      mission_tag_core: 'Authentic Global Connection',
      mission_btn_about: 'About Us & Founder →',
      mission_text: 'Our platform connects learners worldwide to practice English in real time through authentic conversations, via messaging and live calls. Designed to break down language barriers, it fosters supportive cultural exchange and mutual learning between partners with shared interests. We provide an interactive, inclusive space where daily practice turns language fluency into genuine human connections.',

      // Stats Section
      stats_countries: 'Countries',
      stats_learners: 'Learners',
      stats_conversations: 'Conversations',
      stats_minutes: 'Minutes Spoken',

      // How It Works
      how_tag: 'Methodology',
      how_title: 'How English Booster Works',
      how_desc: 'A simple 4-step framework to transition from understanding English to speaking it fluently with genuine international confidence.',
      step_1_num: 'Step 01',
      step_1_title: 'Create your profile',
      step_1_desc: 'Set up your profile, indicate your native language, select your current CEFR level (A1 to C2), and declare your conversation goals.',
      step_1_btn: '👤 1. Create My Profile',
      step_2_num: 'Step 02',
      step_2_title: 'Find your partner',
      step_2_desc: 'Our AI compatibility engine matches you with compatible conversation partners around the world based on interests and availability.',
      step_2_btn: '🤝 2. Find AI Partner',
      step_3_num: 'Step 03',
      step_3_title: 'Start speaking',
      step_3_desc: 'Engage in friendly text messages, audio voice notes, or live audio/video calls with built-in topic prompts and zero judgment.',
      step_3_btn: '🎙️ 3. Start Speaking Now',
      step_4_num: 'Step 04',
      step_4_title: 'Improve every day',
      step_4_desc: 'Receive smart AI pedagogical corrections, earn XP, complete daily challenges, unlock streak badges, and track your fluency growth.',
      step_4_btn: '🏆 4. Battles & XP ➔',
      how_guided_title: 'Interactive 3-Step Guided Experience',
      how_guided_desc: 'Test the complete flow in 60 seconds: Create profile ➔ Match AI partner ➔ Speak with voice synthesis & microphone!',
      how_guided_btn: '🚀 Launch 3-Step Interactive Experience (1 Min)',

      // AI Grammar Demo
      ai_demo_badge: 'Smart Pedagogical AI',
      ai_demo_title: 'Instant AI Corrections With Explanations',
      ai_demo_desc: "Don't just get corrected — understand the exact grammar rule behind each sentence. Speak naturally without fear of making mistakes.",
      ai_demo_engine: 'Pedagogical Rule Engine',
      ai_demo_engine_desc: 'Our intelligent model identifies common English-as-a-second-language patterns and gives constructive explanations to cement long-term memory.',
      ai_demo_chat_btn: 'Try Live in Chat',
      ai_preview_badge: 'Live Example',
      ai_preview_title: '✨ AI Grammar Correction Preview',
      ai_learner_msg: 'Learner message',
      ai_corrected_msg: 'Natural English correction',
      ai_explanation_label: 'Explanation:',
      ai_explanation_text: 'Use "went" because "yesterday" refers to a finished, completed time in the past. The present perfect "have gone" is used for unstated or ongoing timeframes.',

      // Video & WebRTC Immersion
      call_showcase_badge: 'High-Definition WebRTC',
      call_showcase_title: 'Crystal-Clear 1-on-1 Video & Audio Immersion',
      call_showcase_desc: 'Overcome speaking anxiety through immersive, high-definition peer conversations. Equipped with live speech waveforms, automated conversation icebreakers, and real-time guidance.',
      call_showcase_aids: 'Built-in Conversation Aids',
      call_showcase_aids_desc: 'Never run out of things to say. Our interactive prompt engine suggests debate topics, cultural questions, and pronunciation hints dynamically during calls.',
      call_showcase_btn_call: '📹 Launch 1-to-1 Video Call',
      call_showcase_btn_match: '⚡ Matchmaking by Level & Interests',

      // AI Coach Showcase
      coach_badge: 'Your AI English Coach',
      coach_title: 'Measure Every Aspect of Your Spoken Fluency',
      coach_desc: 'Get continuous analytics across speaking, vocabulary, grammar, fluency, and confidence. Receive tailored weekly recommendations to level up your English skills.',
      coach_speaking: 'Speaking',
      coach_vocab: 'Vocabulary',
      coach_grammar: 'Grammar',
      coach_fluency: 'Fluency',
      coach_confidence: 'Confidence',

      // Conversation Gallery
      conv_gallery_tag: 'Real Immersion & Daily Practice',
      conv_gallery_title: 'Real English Conversations, Worldwide',
      conv_gallery_desc: 'Discover how our members speak with confidence: from business meetings to campus talks and 1-on-1 speaking coaching.',
      conv_card_1_badge: '💼 Business & Meetings',
      conv_card_1_title: 'English for the Workplace',
      conv_card_1_desc: 'Master professional vocabulary, lead international meetings, and negotiate with ease and executive impact.',
      conv_card_2_badge: '☕ Friendly Talks & Campus',
      conv_card_2_title: 'Spontaneous Peer Talks',
      conv_card_2_desc: 'Smooth, stress-free discussions between students and global language enthusiasts. Build reflexes around vibrant topics.',
      conv_card_3_badge: '🎙️ Mentorship & AI Feedback',
      conv_card_3_title: '1-on-1 Speaking Coaching',
      conv_card_3_desc: 'Targeted sessions with instant phonetic corrections, clear grammar explanations, and TOEFL/IELTS test preparation.',

      // Watch Videos & Shorts
      shorts_badge_reels: '🎬 Watch Videos & Reels',
      shorts_badge_format: '9:16 Vertical Format',
      shorts_section_title: 'Watch Videos : ',
      shorts_section_title_accent: 'Shorts by Registered Members',
      shorts_section_desc: 'Watch oral English capsules shared by registered members. Practice your pronunciation, elevator pitches, and publish your own Shorts!',
      shorts_btn_publish: '+ Publish a Short Video',
      shorts_btn_explore: 'Explore All Shorts →',
      shorts_filter_all: '🌟 All',
      shorts_filter_pronunciation: '🎙️ Pronunciation',
      shorts_filter_pitch: '💼 Elevator Pitch',
      shorts_filter_idioms: '🗣️ Idioms',
      shorts_filter_fluency: '⚡ Fluency',

      // Featured Partners
      partners_tag: 'Active Global Community',
      partners_title: 'Meet Top Conversation Partners',
      partners_desc: 'Thousands of motivated learners from 100+ countries are online right now. Find your ideal speaking partner and start practicing in seconds.',
      partners_btn_inscrits: '✍️ Register in English Booster (Last Name, First Name, Email, Password) →',
      partners_btn_explore: 'Explore All 10,000+ Active Partners →',

      // Registration Form & Password
      inscrits_badge: 'Join the Global Community',
      inscrits_title: 'Sign up for English Booster',
      inscrits_desc: 'Simply fill in your Last Name, First Name, Email Address, and Password below to officially register and start speaking English right now.',
      inscrits_password: 'Password:',
      inscrits_password_placeholder: 'Min. 6 characters...',
      inscrits_confirm_password: 'Confirm Password:',
      inscrits_confirm_password_placeholder: 'Repeat your password...',
      inscrits_password_strength_label: 'Password security:',
      inscrits_password_strength_weak: 'Weak',
      inscrits_password_strength_medium: 'Medium',
      inscrits_password_strength_strong: 'Strong & Secure',
      inscrits_password_hint: 'Protects your account and secures your login to the Dashboard.',
      inscrits_password_match: 'Passwords match ✓',
      inscrits_password_mismatch: 'Passwords do not match ✕',
      show_password: 'Show',
      hide_password: 'Hide',

      // Challenges & Arenas
      challenges_badge_battles: '⚡ Real-Time Online Speaking Battles',
      challenges_badge_online: '138 Active Challengers Online',
      challenges_title: 'Live Conversation Challenges: ',
      challenges_title_accent: 'Duel, Speak & Evaluate Your Level',
      challenges_desc: 'Challenge learners and fluent speakers worldwide in spontaneous 1-on-1 English conversations. Test your speaking speed, debate skills, roleplay versatility, phonetics, and get an immediate AI CEFR Level Evaluation (A1 to C2).',
      arena_speed_title: 'Speed Fluency Duel',
      arena_speed_desc: 'Rapid-fire 1-on-1 battle. Answer spontaneous questions within 30-second turns without hesitation or fillers.',
      arena_debate_title: 'The Great Debate Arena',
      arena_debate_desc: 'Structured philosophical & tech debate. Defend PRO or CON positions with arguments and rebut your opponent live.',
      arena_roleplay_title: 'Roleplay & Impromptu Scenario',
      arena_roleplay_desc: 'Immerse in realistic situations (Tech Job Interview, Hotel Crisis, VC Pitch). Achieve secret conversational objectives.',
      arena_phonetics_title: 'Pronunciation Clash',
      arena_phonetics_desc: 'Phonetic showdown of complex tongue twisters, minimal pairs (/θ/ vs /ð/, /iː/ vs /ɪ/), and rhythm stress accuracy.',
      arena_cefr_title: 'CEFR Grand Live Diagnostic',
      arena_cefr_desc: 'Complete dual conversation audit assessed across all 5 CEFR criteria by AI Referee. Delivers an official diagnostic level certificate.',

      // Founder Spotlight
      founder_tag: 'Leadership & Vision',
      founder_title: 'Meet the Founder',
      founder_desc: 'Empowering millions across Africa and the world to break language barriers and access international opportunities.',
      founder_role: 'Founder & Product Architect',
      founder_role_sub: 'Creator of English Booster · EdTech Entrepreneur',
      founder_bio: '"We built English Booster because studying grammar rules in books isn\'t enough. Language comes alive when two humans from opposite corners of the globe converse, exchange perspectives, and build confidence together. Connect. Speak. Improve."',
      founder_whatsapp: '💬 WhatsApp Direct',
      founder_call: '📞 Call Founder',
      founder_email: '📧 Email Founder',

      // Get Started Section
      getstarted_badge: '🚀 Section Get Started · Immediate Immersion',
      getstarted_badge_tts: '🎙️ Real-time TTS Voice & STT Microphone',
      getstarted_title: 'Start Your First ',
      getstarted_title_accent: 'English Conversation Match',
      getstarted_desc: "Don't remain a spectator! Choose an international partner below, speak into the mic or type, listen to native voice responses, and collect live XP points.",

      // Pricing Page & Plans
      pricing_tag: 'Transparent Plans',
      pricing_badge_hero: '💎 Accessible EdTech Plans',
      pricing_title: 'Affordable Global Learning',
      pricing_hero_title: 'Invest in Confident Global Communication',
      pricing_subtitle: 'Simple, transparent pricing tailored to your goals. Start free forever or accelerate your fluency with unlimited real-time conversations & smart AI.',
      pricing_desc: 'Start free and upgrade anytime as your conversational practice intensifies.',
      pricing_toggle_monthly: 'Monthly',
      pricing_toggle_annual: 'Annual',
      pricing_save_20: 'Save 20%',
      pricing_currency_label: 'Currency:',
      pricing_per_month: '/ month',
      pricing_billed_annually: 'billed annually',

      pricing_free_title: 'FREE',
      pricing_free_cost: '$0',
      pricing_free_audience: 'For beginners & casual explorers',
      pricing_free_desc: 'Essential access for casual conversational practice with global partners.',
      pricing_btn_free: 'Get Started Free',

      pricing_premium_title: 'PREMIUM',
      pricing_premium_cost: '$4.99',
      pricing_premium_audience: 'For active daily learners & students',
      pricing_premium_desc: 'Unlimited real-time conversations, HD video calls, and instant AI voice coaching.',
      pricing_popular_badge: 'Most Popular',
      pricing_btn_premium: 'Choose Premium',

      pricing_pro_title: 'PRO',
      pricing_pro_cost: '$9.99',
      pricing_pro_audience: 'For executives, job seekers & exam candidates',
      pricing_pro_desc: 'Engineered for career advancement, international interviews & TOEFL/IELTS preparation.',
      pricing_best_value: 'Best for Career',
      pricing_btn_pro: 'Choose Pro',

      // Features lists
      pricing_feat_free_1: '3 weekly 1-on-1 partner conversations',
      pricing_feat_free_2: 'Basic text & voice chat',
      pricing_feat_free_3: 'Browse registered community directory',
      pricing_feat_free_4: '1 live speech challenge per day',
      pricing_feat_free_5: 'Curated educational video shorts',
      pricing_feat_free_6: 'No credit card required',

      pricing_feat_prem_1: 'Unlimited 1-on-1 conversations & HD video calls',
      pricing_feat_prem_2: 'Real-time AI English Coach & phonetic feedback',
      pricing_feat_prem_3: 'Smart matchmaking (filter by interests & level)',
      pricing_feat_prem_4: 'Fluency radar & deep progress analytics',
      pricing_feat_prem_5: 'Unlimited arena duels, XP & excellence badges',
      pricing_feat_prem_6: 'Priority 24/7 community support',

      pricing_feat_pro_1: 'Everything included in Premium',
      pricing_feat_pro_2: 'Job Interview AI Simulator (Tech, Business, HR)',
      pricing_feat_pro_3: 'Business English modules (Pitch, negotiation, meetings)',
      pricing_feat_pro_4: 'Exam preparation (TOEFL, IELTS, Cambridge, TOEIC)',
      pricing_feat_pro_5: 'Certified CEFR skill evaluation & certificate',
      pricing_feat_pro_6: 'Dedicated mentorship & personalized study plan',

      // Trust & Guarantees Bar
      pricing_trust_guarantee_title: '7-Day Money-Back Guarantee',
      pricing_trust_guarantee_desc: 'Try Premium or Pro risk-free. 100% refund if not fully satisfied within 7 days.',
      pricing_trust_nocontract_title: 'Zero Commitment',
      pricing_trust_nocontract_desc: 'Cancel or switch plans anytime in 1 single click with zero penalty.',
      pricing_trust_secure_title: '100% Secure Payments',
      pricing_trust_secure_desc: 'Encrypted cards (Visa, Mastercard), PayPal & Mobile Money (Wave, Orange, MTN).',
      pricing_trust_students_title: 'Student & Non-Profit Discount',
      pricing_trust_students_desc: 'Get an instant 50% discount on annual subscriptions with code STUDENT50.',

      // Comparison Table
      pricing_compare_title: 'Detailed Plan Comparison',
      pricing_compare_subtitle: 'Explore every feature side-by-side to choose the exact plan that matches your goals.',
      pricing_th_feature: 'Platform Features',
      pricing_cat_practice: '🎙️ Practice & Real-Time Conversations',
      pricing_row_calls: '1-on-1 Voice & Video Calls',
      pricing_row_calls_free: '3 sessions / week',
      pricing_row_calls_prem: 'Unlimited HD Calls',
      pricing_row_calls_pro: 'Unlimited Ultra HD + Subtitles',
      pricing_row_matching: 'Partner Matchmaking Algorithm',
      pricing_row_matching_free: 'Standard Queue',
      pricing_row_matching_prem: 'Filter by Level & Interests',
      pricing_row_matching_pro: 'Priority VIP & Native Speakers',
      pricing_row_messaging: 'Instant Direct Messaging',
      pricing_row_messaging_free: 'Standard Text',
      pricing_row_messaging_prem: 'Unlimited Text & Voice Audio',
      pricing_row_messaging_pro: 'Unlimited + Instant Translation',

      pricing_cat_ai: '🤖 Pedagogical AI & Fluency Coaching',
      pricing_row_ai_coach: 'AI English Coach',
      pricing_row_ai_coach_free: 'Basic suggestions',
      pricing_row_ai_coach_prem: 'Real-time Voice & Grammar',
      pricing_row_ai_coach_pro: 'Advanced Executive & Phonetics',
      pricing_row_interview: 'Job Interview AI Simulator',
      pricing_row_business: 'Business English Modules',
      pricing_row_exam: 'TOEFL / IELTS Exam Prep',
      pricing_row_cefr: 'Certified CEFR Level Certificate',

      pricing_cat_community: '🏆 Community, Arenas & Content',
      pricing_row_challenges: 'Live Speech Challenges & Duels',
      pricing_row_challenges_free: '1 duel / day',
      pricing_row_challenges_prem: 'Unlimited Duels & XP',
      pricing_row_challenges_pro: 'Unlimited + Private Tournaments',
      pricing_row_videos: 'Educational Shorts & Videos',
      pricing_row_videos_free: 'Selected library',
      pricing_row_videos_prem: 'Full library + Interactive Quizzes',
      pricing_row_videos_pro: 'Full library + Scripts & Transcripts',

      pricing_cat_support: '🛡️ Support & Guarantees',
      pricing_row_support: 'Customer Support',
      pricing_row_support_free: 'Community Help Center',
      pricing_row_support_prem: 'Priority Support (< 24h response)',
      pricing_row_support_pro: 'VIP 24/7 + Dedicated Mentor',
      pricing_row_guarantee: 'Money-Back Guarantee',
      pricing_row_guarantee_free: 'Free forever',
      pricing_row_guarantee_prem: '7 Days Risk-Free',
      pricing_row_guarantee_pro: '7 Days Risk-Free',

      // Enterprise & Schools
      pricing_enterprise_badge: '🏢 Organizations & Universities',
      pricing_enterprise_title: 'Equip Your Team or Students with Fluent English',
      pricing_enterprise_desc: 'Get bulk seat licensing, dedicated admin analytics dashboards, custom workshops, and team management tools.',
      pricing_enterprise_btn: 'Contact Sales & Request Quote',

      // Pricing FAQ
      pricing_faq_badge: '❓ Clear Answers',
      pricing_faq_title: 'Frequently Asked Questions About Pricing',
      pricing_faq_subtitle: 'Everything you need to know about plans, billing, payment options, and guarantees.',
      pricing_faq_q1: 'Is the Free plan really free forever?',
      pricing_faq_a1: 'Yes, 100%! The Free plan never expires. You can practice English each week, meet conversation partners, and browse learning resources without ever entering a credit card.',
      pricing_faq_q2: 'Which payment methods do you accept?',
      pricing_faq_a2: 'We accept international Credit/Debit cards (Visa, Mastercard, American Express), PayPal, as well as local Mobile Money (Wave, Orange Money, MTN MoMo) across Africa to make learning accessible to everyone.',
      pricing_faq_q3: 'Can I cancel or change my plan anytime?',
      pricing_faq_a3: 'Absolutely. There is zero lock-in or long-term commitment. You can upgrade, downgrade, or cancel your subscription in one click from your account settings at any moment.',
      pricing_faq_q4: 'How does the 7-day money-back guarantee work?',
      pricing_faq_a4: 'If you subscribe to Premium or Pro and decide within 7 days that English Booster does not meet your expectations, simply reach out to our team via chat or email for a prompt 100% refund.',
      pricing_faq_q5: 'Do you offer student or non-profit discounts?',
      pricing_faq_a5: 'Yes! Verified students enrolled in universities and colleges receive an instant 50% discount on annual subscriptions with coupon STUDENT50 upon registration.',
      pricing_faq_q6: 'Are my video calls and conversations private?',
      pricing_faq_a6: 'Yes. Video and audio calls use peer-to-peer WebRTC technology with end-to-end encryption. Your calls are never recorded on our servers without your explicit consent.',

      // Interactive Checkout Modal
      pricing_modal_title: 'Complete Your Subscription',
      pricing_modal_plan: 'Selected Plan:',
      pricing_modal_cycle: 'Billing Cycle:',
      pricing_modal_monthly_badge: 'Monthly billing',
      pricing_modal_annual_badge: 'Annual billing (Saved 20%)',
      pricing_modal_total: 'Total to Pay:',
      pricing_modal_payment_method: 'Select Payment Method:',
      pricing_modal_method_card: 'Credit Card (Visa / Mastercard)',
      pricing_modal_method_momo: 'Mobile Money (Wave / Orange / MTN)',
      pricing_modal_method_paypal: 'PayPal',
      pricing_modal_promo_placeholder: 'Promo code (e.g. BOOSTER2026)',
      pricing_modal_promo_btn: 'Apply',
      pricing_modal_confirm_btn: 'Confirm & Activate Plan',
      pricing_modal_guarantee: '🔒 256-bit SSL encrypted · 7-day money-back guarantee',
      pricing_modal_success_title: 'Welcome to',
      pricing_modal_success_desc: 'Your subscription is now active! Enjoy unlimited conversations and smart AI.',

      // Footer
      footer_platform: 'Platform',
      footer_resources: 'Resources',
      footer_legal: 'Legal',
      footer_contact: 'Contact / Founder',
      footer_copyright: '© 2026 English Booster. All rights reserved. International English Communication & Learning Platform.',

      // About Page Specific
      about_purpose_badge: 'Our Purpose & Mission',
      about_why_title: 'Why ',
      about_why_accent: 'English Booster?',
      about_intro_p: 'English Booster connects people from different cultures and countries through one universal language: <strong>English</strong>.',
      about_pillar_1_title: 'Human Connection First',
      about_pillar_1_desc: 'Fluency does not come from memorizing vocabulary lists in isolation. It emerges when you interact with real people who listen, respond, and share genuine life stories.',
      about_pillar_2_title: 'Intelligent Pedagogical AI',
      about_pillar_2_desc: 'Our AI acts as an encouraging mentor in the background — offering gentle grammatical corrections with explanations so you learn naturally without fear.',
      about_pillar_3_title: 'Global Inclusivity',
      about_pillar_3_desc: 'From Abidjan and Tokyo to Madrid and Lagos, we welcome learners of all cultural backgrounds and CEFR proficiency levels from A1 beginners to C2 proficients.',
      about_vision_tag: 'Leadership & Contact',
      about_vision_title: 'The Vision Behind English Booster',
      about_faq_tag: 'FAQ',
      about_faq_title: 'Common Questions',
      about_legal_title: 'Legal & Community Guidelines'
    },

    fr: {
      // Common & Meta
      app_name: 'ENGLISH BOOSTER',
      app_tagline: '"Connecter. Parler. Progresser." — Briser les barrières linguistiques mondiales grâce à la conversation humaine naturelle et aux retours IA intelligents.',
      switch_lang_title: 'Passer en anglais / Switch to English',
      lang_en: 'EN',
      lang_fr: 'FR',
      live: 'En direct',
      online: 'En ligne',
      offline: 'Hors ligne',
      minutes: 'min',
      share: 'Partager',
      close: 'Fermer',
      cancel: 'Annuler',
      confirm: 'Confirmer',
      save: 'Enregistrer',
      back: 'Retour',

      // Navigation
      nav_home: 'Accueil',
      nav_inscrits: 'Inscrivez-vous',
      nav_how_it_works: 'Comment ça marche',
      nav_partners: 'Trouver des partenaires',
      nav_watch: 'Watch Videos',
      nav_community: 'Communauté',
      nav_challenges: 'Défis',
      nav_pricing: 'Tarifs',
      nav_about: 'À propos',
      nav_login: 'Connexion',
      nav_get_started: 'Commencer',
      nav_dashboard: 'Tableau de bord',
      nav_chat: 'Chat en direct',
      nav_discover: 'Découvrir',
      nav_profile: 'Profil',

      // Hero Section
      hero_badge_edtech: '✨ Plateforme Internationale EdTech',
      hero_badge_conversations: '🔥 50 000+ Conversations Actives',
      hero_title_prefix: 'Perfectionnez votre anglais en ',
      hero_title_accent: 'parlant avec le monde entier.',
      hero_subtitle: 'Échangez avec des personnes du monde entier, pratiquez de vraies conversations et gagnez la confiance nécessaire pour parler anglais naturellement.',
      hero_btn_call: '🎙️ Appel Direct 1-to-1 (3s)',
      hero_btn_match: '⚡ Matchmaking Rapide',
      hero_trust_text: 'Rejoint par plus de <strong>10 000 apprenants passionnés</strong> issus de plus de 100 pays aujourd\'hui.',
      hero_live_chip: 'En direct : <strong>Sofia 🇪🇸</strong> & <strong>Kenji 🇯🇵</strong>',
      hero_ai_chip: '✨ Score IA : <strong>"98% Score de Fluidité"</strong>',

      // Mission Statement Card
      mission_badge: '✨ Notre Mission Mondiale',
      mission_badge_core: '✨ Mission Principale',
      mission_tag: 'Échanges Authentiques d\'Anglais en Temps Réel',
      mission_tag_core: 'Connexion Mondiale Authentique',
      mission_btn_about: 'À propos & Fondateur →',
      mission_text: 'Notre plateforme connecte les apprenants du monde entier pour pratiquer l\'anglais en temps réel à travers des conversations authentiques, par messagerie et appels en direct. Conçue pour briser les barrières linguistiques, elle favorise des échanges culturels bienveillants et un apprentissage mutuel entre partenaires partageant les mêmes centres d\'intérêt. Nous offrons un espace interactif et inclusif où la pratique quotidienne transforme la fluidité linguistique en véritables liens humains.',

      // Stats Section
      stats_countries: 'Pays',
      stats_learners: 'Apprenants',
      stats_conversations: 'Conversations',
      stats_minutes: 'Minutes Parlées',

      // How It Works
      how_tag: 'Méthodologie',
      how_title: 'Comment fonctionne English Booster',
      how_desc: 'Une méthode éprouvée en 4 étapes pour passer de la simple compréhension à l\'expression fluide avec une réelle aisance internationale.',
      step_1_num: 'Étape 01',
      step_1_title: 'Créez votre profil',
      step_1_desc: 'Configurez votre profil, indiquez votre langue maternelle, sélectionnez votre niveau CECRL actuel (A1 à C2) et définissez vos objectifs.',
      step_1_btn: '👤 1. Créer Mon Profil',
      step_2_num: 'Étape 02',
      step_2_title: 'Trouvez votre partenaire',
      step_2_desc: 'Notre moteur d\'affinité IA vous met en relation avec des partenaires du monde entier compatibles selon vos centres d\'intérêt.',
      step_2_btn: '🤝 2. Trouver Partenaire IA',
      step_3_num: 'Étape 03',
      step_3_title: 'Commencez à parler',
      step_3_desc: 'Échangez par messages texte conviviaux, notes vocales audio ou appels vidéo/audio avec des thèmes guidés et zéro jugement.',
      step_3_btn: '🎙️ 3. Parler Dès Maintenant',
      step_4_num: 'Étape 04',
      step_4_title: 'Progressez chaque jour',
      step_4_desc: 'Recevez des corrections pédagogiques intelligentes, accumulez des points XP, complétez des défis et suivez votre fluidité.',
      step_4_btn: '🏆 4. Duels & XP ➔',
      how_guided_title: 'Expérience Guidée Interactive en 3 Étapes',
      how_guided_desc: 'Testez l\'expérience complète en 60 secondes : Créez votre profil ➔ Matcher un partenaire IA ➔ Parlez au micro avec synthèse vocale !',
      how_guided_btn: '🚀 Lancer l\'Expérience en 3 Étapes (1 Min)',

      // AI Grammar Demo
      ai_demo_badge: 'IA Pédagogique Intelligente',
      ai_demo_title: 'Corrections IA Instantanées Avec Explications',
      ai_demo_desc: 'Ne soyez pas seulement corrigé : comprenez la règle exacte derrière chaque phrase. Exprimez-vous librement sans crainte de l\'erreur.',
      ai_demo_engine: 'Moteur de Règles Pédagogiques',
      ai_demo_engine_desc: 'Notre modèle intelligent identifie les constructions courantes des apprenants et propose des explications claires pour ancrer les acquis.',
      ai_demo_chat_btn: 'Essayer en Direct dans le Chat',
      ai_preview_badge: 'Exemple en Direct',
      ai_preview_title: '✨ Aperçu de Correction Grammaticale IA',
      ai_learner_msg: 'Message de l\'apprenant',
      ai_corrected_msg: 'Correction anglaise naturelle',
      ai_explanation_label: 'Explication :',
      ai_explanation_text: 'Utilisez "went" car "yesterday" fait référence à un moment révolu dans le passé. Le present perfect "have gone" s\'emploie pour des périodes non terminées ou sans date précise.',

      // Video & WebRTC Immersion
      call_showcase_badge: 'WebRTC Haute Définition',
      call_showcase_title: 'Immersion Audio & Vidéo 1-on-1 Haute Clarté',
      call_showcase_desc: 'Dépassez la peur de parler grâce à des échanges immersifs en haute définition. Ondes vocales en direct, relances thématiques et guidance en temps réel.',
      call_showcase_aids: 'Assistance Conversationnelle Intégrée',
      call_showcase_aids_desc: 'Ne soyez jamais à court de sujets. Notre moteur propose des thèmes de débats stimulants, questions culturelles et astuces de prononciation.',
      call_showcase_btn_call: '📹 Lancer un Appel Vidéo 1-to-1',
      call_showcase_btn_match: '⚡ Matchmaking par Niveau & Intérêts',

      // AI Coach Showcase
      coach_badge: 'Votre Coach Anglais IA',
      coach_title: 'Mesurez Chaque Dimension de Votre Aisance Orale',
      coach_desc: 'Obtenez des indicateurs continus : expression, vocabulaire, grammaire, fluidité et confiance. Recevez des recommandations chaque semaine.',
      coach_speaking: 'Expression Orale',
      coach_vocab: 'Vocabulaire',
      coach_grammar: 'Grammaire',
      coach_fluency: 'Fluidité',
      coach_confidence: 'Assurance',

      // Conversation Gallery
      conv_gallery_tag: 'Immersion Réelle & Pratique Quotidienne',
      conv_gallery_title: 'Des Vraies Conversations en Anglais, Partout dans le Monde',
      conv_gallery_desc: 'Découvrez comment nos membres s\'expriment avec assurance : du monde professionnel aux discussions amicales et au tutorat individuel.',
      conv_card_1_badge: '💼 Business & Réunions',
      conv_card_1_title: 'English for the Workplace',
      conv_card_1_desc: 'Maîtrisez le vocabulaire professionnel, menez des réunions internationales et négociez en anglais avec aisance et impact.',
      conv_card_2_badge: '☕ Échanges Amicaux & Campus',
      conv_card_2_title: 'Spontaneous Peer Talks',
      conv_card_2_desc: 'Discussions fluides sans stress entre étudiants et passionnés de langues. Développez vos automatismes autour de sujets stimulants.',
      conv_card_3_badge: '🎙️ Tutorat & Correction IA',
      conv_card_3_title: '1-on-1 Speaking Coaching',
      conv_card_3_desc: 'Des sessions ciblées avec corrections phonétiques immédiates, explications grammaticales claires et préparation aux examens TOEFL & IELTS.',

      // Watch Videos & Shorts
      shorts_badge_reels: '🎬 Watch Videos & Reels',
      shorts_badge_format: 'Format 9:16 Vertical',
      shorts_section_title: 'Watch Videos : ',
      shorts_section_title_accent: 'Shorts des Membres Inscrits',
      shorts_section_desc: 'Visionnez les capsules d\'expression orale en anglais publiées par les membres inscrits. Entraînez votre prononciation, vos elevator pitches et publiez vos propres Shorts !',
      shorts_btn_publish: '+ Publier une Vidéo Short',
      shorts_btn_explore: 'Explorer Tous les Shorts →',
      shorts_filter_all: '🌟 Tous',
      shorts_filter_pronunciation: '🎙️ Prononciation',
      shorts_filter_pitch: '💼 Elevator Pitch',
      shorts_filter_idioms: '🗣️ Idiomes',
      shorts_filter_fluency: '⚡ Fluency',

      // Featured Partners
      partners_tag: 'Communauté Mondiale Active',
      partners_title: 'Rencontrez Nos Meilleurs Partenaires de Conversation',
      partners_desc: 'Des milliers d\'apprenants motivés issus de plus de 100 pays sont en ligne en ce moment. Trouvez votre partenaire idéal et commencez à pratiquer.',
      partners_btn_inscrits: '✍️ Inscrivez-vous dans English Booster (NOM, Prénom, Email, Mot de passe) →',
      partners_btn_explore: 'Explorer Tous les 10 000+ Partenaires Actifs →',

      // Registration Form & Password
      inscrits_badge: 'Rejoignez la Communauté Mondiale',
      inscrits_title: 'Inscrivez-vous dans English Booster',
      inscrits_desc: 'Remplissez simplement votre NOM, Prénom, Adresse email et votre Mot de passe ci-dessous pour être officiellement inscrit et commencer à converser en anglais dès maintenant.',
      inscrits_password: 'Mot de passe :',
      inscrits_password_placeholder: 'Minimum 6 caractères...',
      inscrits_confirm_password: 'Confirmer le mot de passe :',
      inscrits_confirm_password_placeholder: 'Répétez votre mot de passe...',
      inscrits_password_strength_label: 'Sécurité du mot de passe :',
      inscrits_password_strength_weak: 'Faible',
      inscrits_password_strength_medium: 'Moyen',
      inscrits_password_strength_strong: 'Fort & Sécurisé',
      inscrits_password_hint: 'Protège votre compte et sécurise votre connexion au Dashboard.',
      inscrits_password_match: 'Les mots de passe correspondent ✓',
      inscrits_password_mismatch: 'Les mots de passe ne correspondent pas ✕',
      show_password: 'Afficher',
      hide_password: 'Masquer',

      // Challenges & Arenas
      challenges_badge_battles: '⚡ Duels d\'Expression en Direct',
      challenges_badge_online: '138 Challengers Actifs en Ligne',
      challenges_title: 'Défis de Conversation en Direct : ',
      challenges_title_accent: 'Duel, Parole & Évaluation de Niveau',
      challenges_desc: 'Affrontez des apprenants et locuteurs du monde entier dans des duels spontanés. Testez votre vitesse de parole, votre argumentation et obtenez une évaluation CECRL immédiate (A1 à C2).',
      arena_speed_title: 'Duel de Vitesse & Fluidité',
      arena_speed_desc: 'Défi 1-contre-1 ultra-dynamique. Répondez à des questions surprises en 30 secondes sans hésitation.',
      arena_debate_title: 'La Grande Arène de Débat',
      arena_debate_desc: 'Débat argumenté philo & tech. Défendez votre thèse POUR ou CONTRE et réfutez votre adversaire en direct.',
      arena_roleplay_title: 'Jeu de Rôle & Scénarios Improvvisés',
      arena_roleplay_desc: 'Immergez-vous dans des contextes réels (Entretien d\'embauche tech, pitch VC, gestion d\'hôtel) avec des objectifs secrets.',
      arena_phonetics_title: 'Clash de Prononciation & Phonétique',
      arena_phonetics_desc: 'Duel phonétique sur des virelangues complexes, paires minimales (/θ/ vs /ð/) et précision du rythme accentuel.',
      arena_cefr_title: 'Grand Diagnostic CECRL en Direct',
      arena_cefr_desc: 'Audit complet de conversation évalué sur les 5 critères officiels par Arbitre IA. Délivre une attestation de niveau.',

      // Founder Spotlight
      founder_tag: 'Leadership & Vision',
      founder_title: 'Rencontrez le Fondateur',
      founder_desc: 'Donner à des millions de personnes en Afrique et dans le monde la force de briser les barrières de la langue et de saisir les opportunités internationales.',
      founder_role: 'Fondateur & Architecte Produit',
      founder_role_sub: 'Créateur d\'English Booster · Entrepreneur EdTech',
      founder_bio: '"Nous avons créé English Booster parce qu\'apprendre la grammaire dans des livres ne suffit pas. Une langue prend vie quand deux humains de continents différents échangent, partagent et prennent confiance ensemble. Connect. Speak. Improve."',
      founder_whatsapp: '💬 WhatsApp Direct',
      founder_call: '📞 Appeler le Fondateur',
      founder_email: '📧 Écrire au Fondateur',

      // Get Started Section
      getstarted_badge: '🚀 Section Get Started · Immersion Immédiate',
      getstarted_badge_tts: '🎙️ Voix Synthétique TTS & Micro STT en Temps Réel',
      getstarted_title: 'Lancez Votre Première ',
      getstarted_title_accent: 'Partie de Conversation en Anglais',
      getstarted_desc: 'Ne restez pas simple spectateur ! Choisissez un partenaire ci-dessous, parlez au micro ou tapez vos répliques, écoutez ses réponses vocales avec l\'accent natif, et accumulez vos premiers points d\'XP en direct.',

      // Pricing Page & Plans
      pricing_tag: 'Tarifs Transparents',
      pricing_badge_hero: '💎 Plans EdTech Accessibles',
      pricing_title: 'Un Apprentissage Accessible Partout',
      pricing_hero_title: 'Investissez dans Votre Expression en Anglais',
      pricing_subtitle: 'Des formules claires et abordables adaptées à vos objectifs. Commencez gratuitement ou accélérez votre maîtrise avec des conversations illimitées et l\'IA.',
      pricing_desc: 'Commencez gratuitement et passez au niveau supérieur à mesure que votre pratique s\'intensifie.',
      pricing_toggle_monthly: 'Mensuel',
      pricing_toggle_annual: 'Annuel',
      pricing_save_20: 'Économisez 20%',
      pricing_currency_label: 'Devise :',
      pricing_per_month: '/ mois',
      pricing_billed_annually: 'facturé annuellement',

      pricing_free_title: 'GRATUIT',
      pricing_free_cost: '0$',
      pricing_free_audience: 'Pour débuter & explorer sans frais',
      pricing_free_desc: 'Accès fondamental pour une pratique orale décontractée avec des partenaires mondiaux.',
      pricing_btn_free: 'Commencer Gratuitement',

      pricing_premium_title: 'PREMIUM',
      pricing_premium_cost: '4.99$',
      pricing_premium_audience: 'Pour apprenants réguliers & étudiants',
      pricing_premium_desc: 'Conversations et appels vidéo HD illimités avec corrections et coach vocal IA.',
      pricing_popular_badge: 'Le Plus Populaire',
      pricing_btn_premium: 'Choisir Premium',

      pricing_pro_title: 'PRO',
      pricing_pro_cost: '9.99$',
      pricing_pro_audience: 'Pour professionnels, candidats & examens',
      pricing_pro_desc: 'Conçu pour booster votre carrière, réussir vos entretiens internationaux et préparer le TOEFL/IELTS.',
      pricing_best_value: 'Idéal Carrière & Tests',
      pricing_btn_pro: 'Choisir Pro',

      // Features lists
      pricing_feat_free_1: '3 conversations 1-contre-1 par semaine',
      pricing_feat_free_2: 'Chat textuel et vocal standard',
      pricing_feat_free_3: 'Accès à l\'annuaire des apprenants inscrits',
      pricing_feat_free_4: '1 défi d\'expression par jour dans l\'arène',
      pricing_feat_free_5: 'Sélection de vidéos & shorts éducatifs',
      pricing_feat_free_6: 'Aucune carte bancaire requise',

      pricing_feat_prem_1: 'Conversations & appels vidéo HD ILLIMITÉS',
      pricing_feat_prem_2: 'Coach vocal IA en temps réel (grammaire & prononciation)',
      pricing_feat_prem_3: 'Matchmaking intelligent (filtres centres d\'intérêt & niveau)',
      pricing_feat_prem_4: 'Radar de fluidité & statistiques de progrès détaillées',
      pricing_feat_prem_5: 'Arène de duels illimitée, points d\'XP & badges d\'excellence',
      pricing_feat_prem_6: 'Support communautaire prioritaire 24/7',

      pricing_feat_pro_1: 'Tout ce qui est inclus dans l\'offre Premium',
      pricing_feat_pro_2: 'Simulateur d\'entretiens d\'embauche IA (RH, Tech, Finance)',
      pricing_feat_pro_3: 'Modules Business English (Négociation, pitch, réunions)',
      pricing_feat_pro_4: 'Préparation intensive aux tests (TOEFL, IELTS, TOEIC, Cambridge)',
      pricing_feat_pro_5: 'Diagnostic CECRL officiel avec attestation certifiée',
      pricing_feat_pro_6: 'Mentorat dédié & plan d\'apprentissage sur-mesure',

      // Trust & Guarantees Bar
      pricing_trust_guarantee_title: 'Satisfait ou Remboursé sous 7 jours',
      pricing_trust_guarantee_desc: 'Testez Premium ou Pro l\'esprit tranquille. Remboursement à 100% sans justification sous 7 jours.',
      pricing_trust_nocontract_title: 'Sans Aucun Engagement',
      pricing_trust_nocontract_desc: 'Résiliation ou changement d\'offre à tout moment en 1 seul clic.',
      pricing_trust_secure_title: 'Paiements 100% Sécurisés',
      pricing_trust_secure_desc: 'Cartes sécurisées (Visa, Mastercard), PayPal et Mobile Money (Wave, Orange, MTN).',
      pricing_trust_students_title: 'Réduction Étudiants & Écoles',
      pricing_trust_students_desc: 'Jusqu\'à 50% de réduction immédiate sur l\'abonnement annuel avec le code STUDENT50.',

      // Comparison Table
      pricing_compare_title: 'Tableau Comparatif Détaillé',
      pricing_compare_subtitle: 'Comparez chaque fonctionnalité point par point pour choisir l\'offre idéale pour vos progrès.',
      pricing_th_feature: 'Fonctionnalités de la Plateforme',
      pricing_cat_practice: '🎙️ Pratique & Conversations en Direct',
      pricing_row_calls: 'Appels Vocaux & Vidéo 1-contre-1',
      pricing_row_calls_free: '3 sessions / semaine',
      pricing_row_calls_prem: 'Appels HD Illimités',
      pricing_row_calls_pro: 'Illimité Ultra HD + Sous-titres',
      pricing_row_matching: 'Algorithme de Matchmaking Partenaires',
      pricing_row_matching_free: 'File d\'attente standard',
      pricing_row_matching_prem: 'Filtre par Niveau & Centres d\'intérêt',
      pricing_row_matching_pro: 'Accès VIP Prioritaire & Locuteurs Natifs',
      pricing_row_messaging: 'Messagerie Instantanée Directe',
      pricing_row_messaging_free: 'Texte standard',
      pricing_row_messaging_prem: 'Texte & Notes vocales illimités',
      pricing_row_messaging_pro: 'Illimité + Traduction instantanée',

      pricing_cat_ai: '🤖 IA Pédagogique & Coaching de Fluidité',
      pricing_row_ai_coach: 'Coach IA d\'Anglais',
      pricing_row_ai_coach_free: 'Corrections basiques',
      pricing_row_ai_coach_prem: 'Vocal temps réel & Grammaire',
      pricing_row_ai_coach_pro: 'Exécutif avancé & Phonétique fine',
      pricing_row_interview: 'Simulateur d\'Entretiens d\'Embauche IA',
      pricing_row_business: 'Modules Business English & Affaires',
      pricing_row_exam: 'Préparation TOEFL / IELTS / TOEIC',
      pricing_row_cefr: 'Attestation Officielle de Niveau CECRL',

      pricing_cat_community: '🏆 Communauté, Arènes & Contenus',
      pricing_row_challenges: 'Défis de Parole & Duels en Direct',
      pricing_row_challenges_free: '1 duel / jour',
      pricing_row_challenges_prem: 'Duels & XP Illimités',
      pricing_row_challenges_pro: 'Illimité + Tournois Privés',
      pricing_row_videos: 'Vidéos & Shorts Pédagogiques',
      pricing_row_videos_free: 'Sélection restreinte',
      pricing_row_videos_prem: 'Catalogue complet + Quiz interactifs',
      pricing_row_videos_pro: 'Catalogue complet + Scripts & Transcriptions',

      pricing_cat_support: '🛡️ Support & Garanties',
      pricing_row_support: 'Support & Assistance',
      pricing_row_support_free: 'Centre d\'aide & forum',
      pricing_row_support_prem: 'Support prioritaire (réponse < 24h)',
      pricing_row_support_pro: 'VIP 24/7 + Mentor dédié',
      pricing_row_guarantee: 'Garantie de Remboursement',
      pricing_row_guarantee_free: 'Gratuit à vie',
      pricing_row_guarantee_prem: '7 Jours Sans Risque',
      pricing_row_guarantee_pro: '7 Jours Sans Risque',

      // Enterprise & Schools
      pricing_enterprise_badge: '🏢 Entreprises, Écoles & Universités',
      pricing_enterprise_title: 'Donnez à Vos Équipes et Étudiants le Pouvoir de Parler Anglais',
      pricing_enterprise_desc: 'Profitez de forfaits groupés, d\'un tableau de bord de suivi administratif, d\'ateliers sur mesure et d\'outils d\'analyse.',
      pricing_enterprise_btn: 'Demander un Devis Entreprise / École',

      // Pricing FAQ
      pricing_faq_badge: '❓ Réponses Claires',
      pricing_faq_title: 'Questions Fréquentes sur les Tarifs',
      pricing_faq_subtitle: 'Tout ce que vous devez savoir sur nos formules, la facturation, les paiements et les garanties.',
      pricing_faq_q1: 'La version Gratuite est-elle vraiment gratuite pour toujours ?',
      pricing_faq_a1: 'Oui, à 100% ! La formule Gratuite n\'a aucune date d\'expiration. Vous pouvez vous exercer chaque semaine, échanger avec d\'autres apprenants et explorer les ressources sans jamais avoir à renseigner de carte bancaire.',
      pricing_faq_q2: 'Quels moyens de paiement acceptez-vous ?',
      pricing_faq_a2: 'Nous acceptons les cartes bancaires internationales (Visa, Mastercard, CB), PayPal, ainsi que les solutions Mobile Money locales très populaires en Afrique (Wave, Orange Money, MTN MoMo) pour garantir l\'accessibilité à tous.',
      pricing_faq_q3: 'Puis-je annuler ou changer de formule à tout moment ?',
      pricing_faq_a3: 'Absolument. Il n\'y a aucun engagement de durée. Vous pouvez surclasser, rétrograder ou annuler votre abonnement en un clic depuis votre espace membre, sans aucun frais de rupture.',
      pricing_faq_q4: 'Comment fonctionne la garantie satisfait ou remboursé sous 7 jours ?',
      pricing_faq_a4: 'Si vous souscrivez à Premium ou Pro et que la plateforme ne comble pas vos attentes dans les 7 premiers jours, contactez-nous par chat ou email pour un remboursement intégral et immédiat.',
      pricing_faq_q5: 'Proposez-vous des réductions pour les étudiants ou les ONG ?',
      pricing_faq_a5: 'Oui ! Les étudiants inscrits dans une université ou école bénéficient de -50% sur l\'abonnement annuel grâce au code promo STUDENT50 après vérification de leur statut.',
      pricing_faq_q6: 'Mes appels vidéo et conversations sont-ils privés et sécurisés ?',
      pricing_faq_a6: 'Oui. Les appels vidéo et vocaux s\'appuient sur la technologie WebRTC peer-to-peer chiffrée de bout en bout. Aucune conversation n\'est enregistrée sur nos serveurs sans votre accord explicite.',

      // Interactive Checkout Modal
      pricing_modal_title: 'Finaliser Votre Abonnement',
      pricing_modal_plan: 'Forfait sélectionné :',
      pricing_modal_cycle: 'Cycle de facturation :',
      pricing_modal_monthly_badge: 'Facturation mensuelle',
      pricing_modal_annual_badge: 'Facturation annuelle (-20% appliqués)',
      pricing_modal_total: 'Total à régler :',
      pricing_modal_payment_method: 'Choisissez votre mode de paiement :',
      pricing_modal_method_card: 'Carte Bancaire (Visa / Mastercard)',
      pricing_modal_method_momo: 'Mobile Money (Wave / Orange / MTN)',
      pricing_modal_method_paypal: 'PayPal',
      pricing_modal_promo_placeholder: 'Code promo (ex: BOOSTER2026)',
      pricing_modal_promo_btn: 'Appliquer',
      pricing_modal_confirm_btn: 'Confirmer & Activer l\'Abonnement',
      pricing_modal_guarantee: '🔒 Chiffrement SSL 256-bit · Garantie satisfait ou remboursé 7 jours',
      pricing_modal_success_title: 'Bienvenue dans',
      pricing_modal_success_desc: 'Votre abonnement est maintenant actif ! Profitez de vos conversations illimitées et de l\'IA.',

      // Footer
      footer_platform: 'Plateforme',
      footer_resources: 'Ressources',
      footer_legal: 'Légal & Conditions',
      footer_contact: 'Contact / Fondateur',
      footer_copyright: '© 2026 English Booster. Tous droits réservés. Plateforme internationale d\'apprentissage et de communication en anglais.',

      // About Page Specific
      about_purpose_badge: 'Notre Raison d\'Être & Mission',
      about_why_title: 'Pourquoi ',
      about_why_accent: 'English Booster ?',
      about_intro_p: 'English Booster connecte des personnes de cultures et de pays différents autour d\'une langue universelle : <strong>l\'anglais</strong>.',
      about_pillar_1_title: 'La Connexion Humaine d\'Abord',
      about_pillar_1_desc: 'L\'aisance ne vient pas de listes de vocabulaire mémorisées dans son coin. Elle naît de l\'interaction avec de vraies personnes qui vous écoutent, vous répondent et partagent leur vécu.',
      about_pillar_2_title: 'IA Pédagogique Bienveillante',
      about_pillar_2_desc: 'Notre IA agit comme un mentor encourageant en coulisses : corrections grammaticales douces avec explications pour progresser naturellement et sans peur.',
      about_pillar_3_title: 'Inclusivité Mondiale',
      about_pillar_3_desc: 'D\'Abidjan et Tokyo à Madrid et Lagos, nous accueillons des apprenants de tous horizons culturels et de tous niveaux CECRL, du grand débutant A1 au bilingue C2.',
      about_vision_tag: 'Direction & Contact',
      about_vision_title: 'La Vision Derrière English Booster',
      about_faq_tag: 'FAQ',
      about_faq_title: 'Questions Fréquentes',
      about_legal_title: 'Directives Légales & Communauté'
    }
  };

  // 2. STATE MANAGER
  class I18nEngine {
    constructor() {
      this.currentLang = this.detectLanguage();
      this.listeners = [];
    }

    detectLanguage() {
      // 1. LocalStorage
      const saved = localStorage.getItem('eb_lang');
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
      localStorage.setItem('eb_lang', lang);
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
            'L\'application est désormais affichée en français.',
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

      // 4. Smart translation for common existing nav-links if data-i18n not set
      this.translateStandardLinks();
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
        'Tableau de bord': isFr ? 'Tableau de bord' : 'Dashboard'
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
        const rawText = link.textContent.replace(/^[^\w\sÀ-ÿ]+/u, '').trim();
        
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

      // Comprehensive global UI Phrase Pairs (English <-> French)
      const phrasePairs = [
        ['Inscrivez-vous dans English Booster', 'Register for English Booster'],
        ['Rejoignez la Communauté Mondiale', 'Join the Global Community'],
        ['Trouvez Vos Partenaires de Conversation en Anglais', 'Find Your English Conversation Partners'],
        ['Meet Top Conversation Partners', 'Rencontrez Nos Meilleurs Partenaires de Conversation'],
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
        ['Why English Booster?', 'Pourquoi English Booster ?'],
        ['Our Purpose & Mission', 'Notre Raison d\'Être & Mission'],
        ['Human Connection First', 'La Connexion Humaine d\'Abord'],
        ['Intelligent Pedagogical AI', 'IA Pédagogique Intelligente'],
        ['Global Inclusivity', 'Inclusivité Mondiale'],
        ['The Vision Behind English Booster', 'La Vision Derrière English Booster'],
        ['Common Questions', 'Questions Fréquentes'],
        ['Legal & Community Guidelines', 'Règles de la Communauté & Légal'],
        ['WhatsApp Direct', 'WhatsApp Direct'],
        ['Call Founder', 'Appeler le Fondateur'],
        ['Send Email', 'Envoyer un Email'],
        ['Transparent Plans', 'Tarifs Transparents'],
        ['Affordable Global Learning', 'Un Apprentissage Accessible Partout'],
        ['Get Started Free', 'Commencer Gratuitement'],
        ['Choose Premium', 'Choisir Premium'],
        ['Choose Pro', 'Choisir Pro'],
        ['Unlimited conversations', 'Conversations illimitées'],
        ['Basic learner profile', 'Profil apprenant de base'],
        ['Find conversation partners', 'Trouver des partenaires de conversation'],
        ['Daily challenges', 'Défis quotidiens'],
        ['Community forum access', 'Accès au forum communautaire'],
        ['Job interview prep modules', 'Préparation aux entretiens d\'embauche'],
        ['Professional corporate vocabulary', 'Vocabulaire professionnel d\'entreprise'],
        ['Personalized learning plan', 'Plan d\'apprentissage personnalisé'],
        ['Monthly', 'Mensuel'],
        ['Annual', 'Annuel'],
        ['Save 20%', 'Économisez 20%'],
        ['Start speaking', 'Commencez à parler'],
        ['Improve every day', 'Progressez chaque jour'],
        ['Create your profile', 'Créez votre profil'],
        ['Find your partner', 'Trouvez votre partenaire'],
        ['Methodology', 'Méthodologie'],
        ['How English Booster Works', 'Comment fonctionne English Booster']
      ];

      // Scan and translate matching elements
      const targetSelectors = 'h1, h2, h3, h4, .section-tag, .section-title, .btn, .crystal-badge, .short-metric-lbl';
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
      // Find all nav-actions containers
      const navActionsList = document.querySelectorAll('.nav-actions');
      navActionsList.forEach(navActions => {
        if (!navActions.querySelector('.lang-switcher-pill')) {
          const pill = document.createElement('div');
          pill.className = 'lang-switcher-pill';
          pill.setAttribute('role', 'group');
          pill.setAttribute('aria-label', 'Language Selector');
          pill.innerHTML = `
            <button type="button" class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en" title="English">
              <span>🇬🇧</span> EN
            </button>
            <button type="button" class="lang-btn ${this.currentLang === 'fr' ? 'active' : ''}" data-lang="fr" title="Français">
              <span>🇫🇷</span> FR
            </button>
          `;

          // Bind clicks
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

          // Insert right before theme toggle button
          const themeBtn = navActions.querySelector('.theme-toggle-btn');
          if (themeBtn) {
            navActions.insertBefore(pill, themeBtn);
          } else {
            navActions.prepend(pill);
          }
        }
      });

      // Also inject into mobile drawer header/bottom if present
      const drawer = document.getElementById('mobile-drawer') || document.querySelector('.mobile-drawer');
      if (drawer && !drawer.querySelector('.lang-drawer-wrap')) {
        const drawerPillWrap = document.createElement('div');
        drawerPillWrap.className = 'lang-drawer-wrap';
        drawerPillWrap.style.cssText = 'padding: 12px 0; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--glass-border); margin-bottom: 12px;';
        drawerPillWrap.innerHTML = `
          <span style="font-size: 0.88rem; font-weight: 700; color: var(--text-muted); display: flex; align-items: center; gap: 6px;">
            <span>🌐</span> Langue / Language
          </span>
          <div class="lang-switcher-pill" role="group">
            <button type="button" class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">
              <span>🇬🇧</span> EN
            </button>
            <button type="button" class="lang-btn ${this.currentLang === 'fr' ? 'active' : ''}" data-lang="fr">
              <span>🇫🇷</span> FR
            </button>
          </div>
        `;

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

  document.addEventListener('DOMContentLoaded', () => {
    i18n.injectSwitcherIntoNav();
    i18n.bindAllSwitchers();
    i18n.setLanguage(i18n.getLang(), false);
  });

})();
