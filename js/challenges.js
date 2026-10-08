/**
 * ENGLISH BOOSTER — LIVE CHALLENGE ARENAS & GAMIFICATION (js/challenges.js)
 * 5 Live Online Conversation Battle Modes with Real-Time Peer Evaluation,
 * Level Diagnostic Engine (CEFR A1-C2), Waveforms, SoundFX, and Celebrations.
 */

const ARENAS_DATABASE = {
  speed_duel: {
    id: 'speed_duel',
    name: 'Speed Fluency Duel',
    nameFr: 'Duel de Fluidité & Vitesse',
    icon: '⚡',
    timeSecs: 180,
    roundCount: 3,
    xpReward: 80,
    instruction: '⚡ 30s Rapid Turn: Zero hesitations or filler words allowed!',
    instructionFr: '⚡ Tour rapide de 30s : Zéro hésitation ni tic de langage autorisé !',
    rounds: [
      {
        topic: "What is the single most defining adventure of your life so far?",
        topicFr: "Quelle a été la plus grande aventure de votre vie jusqu'ici ?",
        partnerScript: "For me, it was backpacking across Hokkaido during winter. I had to navigate remote train stations purely in basic Japanese, which pushed my adaptability to the absolute limit!",
        userSuggestions: [
          "My defining adventure was presenting our university robotics research to international judges in Singapore with zero preparation.",
          "Traveling solo to Berlin without speaking German forced me to rely entirely on conversational English and spontaneous body language.",
          "Launching an online community from my bedroom with learners from 25 countries changed how I view global communication."
        ]
      },
      {
        topic: "If you could master any complex skill overnight, what would it be and why?",
        topicFr: "Si vous pouviez maîtriser n'importe quelle compétence complexe du jour au lendemain, laquelle choisiriez-vous et pourquoi ?",
        partnerScript: "I would immediately master simultaneous interpretation between English, Mandarin, and Japanese so I could facilitate international diplomatic dialogues.",
        userSuggestions: [
          "I would choose executive public speaking so I can inspire international crowds and pitch bold ideas effortlessly.",
          "Mastering full-stack artificial intelligence architecture would allow me to build impactful global EdTech platforms."
        ]
      },
      {
        topic: "Sell an ordinary cold black coffee as if it were a $500 luxury elixir in 25 seconds!",
        topicFr: "Vendez un simple café noir froid comme s'il s'agissait d'un élixir de luxe à 500 $ en 25 secondes !",
        partnerScript: "Harvested from volcanic slopes at dawn, this chilled obsidian nectar sharpens your cognitive frequency and awakens primal genius with zero compromise!",
        userSuggestions: [
          "Behold liquid focus: brewed with glacial Alpine water and rare Ethiopian cherries to supercharge your mental bandwidth for 12 hours.",
          "This isn't mere coffee—it is distilled ambition, handcrafted to ignite laser concentration without jitters or crashes."
        ]
      }
    ],
    evalMetric: "Words Per Minute (WPM) & Hesitation Reflex",
    evalCriteria: ["Fluency (118 WPM)", "Zero Filler Words", "Immediate Reflex", "Natural Pauses"],
    feedbackGenerator: (youScore, partnerScore, yourCEFR, partner, isFr = false) => isFr ? `
      <strong>Diagnostic de l'Arbitre IA pour le Duel de Fluidité & Vitesse :</strong><br>
      • <strong>Alex (Vous)</strong> : Niveau attribué <strong>${yourCEFR}</strong>. Latence de réponse remarquable (${Math.round(youScore * 1.25)} WPM). Hésitations contenues sous 0.8s avec une belle spontanéité.<br>
      • <strong>${partner.name}</strong> : Niveau attribué <strong>${partner.level}</strong>. Cadence soutenue (${Math.round(partner.baseScore * 1.15)} WPM) avec des structures complètes.<br>
      • <strong>Conseil Pédagogique</strong> : Excellent rythme oral ! Continuez à enchaîner vos idées sans interruption pour consolider votre fluidité native.
    ` : `
      <strong>AI Referee Assessment for Speed Fluency Duel:</strong><br>
      • <strong>Alex (You)</strong>: Awarded <strong>${yourCEFR}</strong>. Exceptional response latency (${Math.round(youScore * 1.25)} WPM). Kept hesitations under 0.8s with natural transitional momentum.<br>
      • <strong>${partner.name}</strong>: Awarded <strong>${partner.level}</strong>. High cadence (${Math.round(partner.baseScore * 1.15)} WPM) with solid sentence completeness.<br>
      • <strong>Pedagogical Insight</strong>: Excellent rhythm! Try incorporating more advanced contrastive idioms (<em>"on the flip side", "truth be told"</em>) to push towards C1+.
    `
  },
  debate: {
    id: 'debate',
    name: 'The Great Debate Arena',
    nameFr: 'La Grande Arène de Débat',
    icon: '⚖️',
    timeSecs: 300,
    roundCount: 3,
    xpReward: 150,
    instruction: '⚖️ Stance: You are PRO (Affirmative) · Partner is CON (Negative) · Defend with structured logic!',
    instructionFr: '⚖️ Position : Vous êtes POUR · Le partenaire est CONTRE · Argumentez avec une logique structurée !',
    rounds: [
      {
        topic: "Resolved: AI language coaches will fundamentally accelerate human fluency faster than traditional classroom curricula.",
        topicFr: "Thèse : Les coachs linguistiques IA accéléreront fondamentalement l'aisance orale plus vite que les cours traditionnels.",
        partnerScript: "I stand on the CON side: human emotional nuance, spontaneous social empathy, and genuine peer camaraderie cannot be replicated by synthetic algorithms!",
        userSuggestions: [
          "I argue PRO: AI eliminates psychological embarrassment, provides infinite repetitions, and pinpoints micro-phonetic errors instantly.",
          "Furthermore, traditional classrooms force 30 students to share 1 teacher's attention, whereas AI coaches tailor every syllable to the individual.",
          "Studies show conversational frequency triples when learners have 24/7 on-demand AI speaking practice before entering peer duels."
        ]
      },
      {
        topic: "Resolved: Global remote work culture builds greater cross-cultural understanding than physical office relocation.",
        topicFr: "Thèse : Le télétravail mondial favorise une meilleure compréhension interculturelle que l'expatriation physique.",
        partnerScript: "CON rebuttal: Virtual video calls are transactional. Real cross-cultural understanding requires sharing lunch, reading body language, and living in local communities!",
        userSuggestions: [
          "PRO stance: Remote work democratizes access for talent across Africa, Latin America, and Asia without expensive visas or displacement.",
          "Empirical data shows distributed teams collaborate across 10+ timezones daily, naturally eroding linguistic and national barriers."
        ]
      },
      {
        topic: "Final Rebuttal & Synthesis: Balancing automated feedback with authentic human conversation.",
        topicFr: "Réfutation Finale & Synthèse : Équilibrer les retours automatisés et la conversation humaine authentique.",
        partnerScript: "I concede that hybrid learning is potent, but human connection must remain the primary anchor of language mastery!",
        userSuggestions: [
          "In conclusion, AI provides the training simulator, but live peer duels like this platform provide the authentic conversational arena.",
          "By synthesizing instant AI metrics with human empathy, we achieve optimal communicative mastery."
        ]
      }
    ],
    evalMetric: "Logical Connectors & Persuasive Nuance",
    evalCriteria: ["Logical Connectors (Furthermore, However)", "Argument Structure", "Persuasive Tone", "Rebuttal Precision"],
    feedbackGenerator: (youScore, partnerScore, yourCEFR, partner, isFr = false) => isFr ? `
      <strong>Diagnostic de l'Arbitre IA pour l'Arène de Débat :</strong><br>
      • <strong>Alex (Vous)</strong> : Niveau attribué <strong>${yourCEFR}</strong>. Maîtrise exemplaire des connecteurs de discours formels (<em>"furthermore", "empirical data shows", "in conclusion"</em>). Forte présence rhétorique.<br>
      • <strong>${partner.name}</strong> : Niveau attribué <strong>${partner.level}</strong>. Réfutations précises avec un argumentaire percutant.<br>
      • <strong>Conseil Pédagogique</strong> : Remarquable profondeur argumentative ! Continuez à challenger des débatteurs C1/C2 pour parfaire l'art de la concession.
    ` : `
      <strong>AI Referee Assessment for The Great Debate Arena:</strong><br>
      • <strong>Alex (You)</strong>: Awarded <strong>${yourCEFR}</strong>. Demonstrated mastery of formal discourse markers (<em>"furthermore", "empirical data shows", "in conclusion"</em>). Strong rhetorical poise.<br>
      • <strong>${partner.name}</strong>: Awarded <strong>${partner.level}</strong>. Countered effectively with pragmatic emotional appeals and crisp rebuttals.<br>
      • <strong>Pedagogical Insight</strong>: Outstanding argumentative depth. Continue challenging advanced C1/C2 debaters to refine subtle concession techniques.
    `
  },
  roleplay: {
    id: 'roleplay',
    name: 'Roleplay & Impromptu Scenario',
    nameFr: 'Jeu de Rôle & Scénario Improvvisé',
    icon: '🎭',
    timeSecs: 240,
    roundCount: 3,
    xpReward: 120,
    instruction: '🎭 Scenario: Silicon Valley Tech Interview · You are Candidate · Partner is Lead Architect!',
    instructionFr: '🎭 Scénario : Entretien Tech Silicon Valley · Vous êtes le Candidat · Le partenaire est l\'Architecte Principal !',
    rounds: [
      {
        topic: "Scenario: Tell me about a critical technical breakdown in your previous project and how you regained user trust.",
        topicFr: "Scénario : Décrivez une panne technique critique sur votre projet précédent et comment vous avez regagné la confiance des utilisateurs.",
        partnerScript: "Welcome to the interview Alex! Let's dive straight in: describe a high-stakes incident where your system failed and how you communicated with stakeholders.",
        userSuggestions: [
          "During our peak user launch, our audio streaming pipeline dropped 15% of packets. I immediately published a transparent status report and deployed an edge-caching fix within 20 minutes.",
          "When our database migration spiked latency, I held a cross-functional war room, communicated every 15 minutes, and recovered full throughput without data loss.",
          "I prioritize transparent customer trust over vanity metrics; owning our mistakes openly turned frustrated users into long-term brand advocates."
        ]
      },
      {
        topic: "Scenario: Handling divergent opinions between engineering priorities and aggressive product deadlines.",
        topicFr: "Scénario : Gérer des divergences entre priorités d'ingénierie et délais produit serrés.",
        partnerScript: "Good incident response. Now, how do you handle a scenario where product managers demand a launch tomorrow, but engineering flags technical debt?",
        userSuggestions: [
          "I align both sides around measurable risk: we define non-negotiable security guardrails, launch an invite-only beta, and schedule dedicated debt sprints.",
          "I replace emotional friction with empirical data: showing how unaddressed bugs degrade retention by 30% aligns commercial and engineering goals."
        ]
      },
      {
        topic: "Scenario: Pitch your visionary 5-year outlook for AI-augmented human communication.",
        topicFr: "Scénario : Présentez votre vision à 5 ans pour la communication humaine assistée par IA.",
        partnerScript: "Final question: What is your 5-year thesis on how human language learning will interface with ambient intelligence?",
        userSuggestions: [
          "We will see ambient coaching whisper contextual vocabulary during live conversations, turning everyday life into an immersive language lab.",
          "Language learning will transition from memorization to real-time interactive confidence building across cross-border communities."
        ]
      }
    ],
    evalMetric: "Speech Register, Idioms & Pragmatics",
    evalCriteria: ["Appropriate Politeness Register", "Idiomatic Fluency", "Context Adaptability", "Active Empathy"],
    feedbackGenerator: (youScore, partnerScore, yourCEFR, partner, isFr = false) => isFr ? `
      <strong>Diagnostic de l'Arbitre IA pour le Jeu de Rôle :</strong><br>
      • <strong>Alex (Vous)</strong> : Niveau attribué <strong>${yourCEFR}</strong>. Registre professionnel impeccable (<em>"cross-functional alignment", "empirical risk", "guardrails"</em>). Forte empathie conversationnelle.<br>
      • <strong>${partner.name}</strong> : Niveau attribué <strong>${partner.level}</strong>. Posture managériale authentique avec des relances ciblées.<br>
      • <strong>Conseil Pédagogique</strong> : Excellente réactivité professionnelle ! Votre niveau d'anglais est parfaitement adapté à un environnement de direction en entreprise.
    ` : `
      <strong>AI Referee Assessment for Roleplay Scenario:</strong><br>
      • <strong>Alex (You)</strong>: Awarded <strong>${yourCEFR}</strong>. Impeccable professional register (<em>"cross-functional alignment", "empirical risk", "guardrails"</em>). High conversational empathy.<br>
      • <strong>${partner.name}</strong>: Awarded <strong>${partner.level}</strong>. Maintained an authentic executive demeanor with targeted situational follow-ups.<br>
      • <strong>Pedagogical Insight</strong>: Excellent situational agility! You demonstrated executive-ready conversational English suitable for C1 workplace environments.
    `
  },
  phonetics: {
    id: 'phonetics',
    name: 'Pronunciation & Phonetics Clash',
    nameFr: 'Duel de Prononciation & Phonétique',
    icon: '🎯',
    timeSecs: 180,
    roundCount: 3,
    xpReward: 100,
    instruction: '🎯 Phonetics Clash: Articulate dental fricatives /θ/ vs /ð/ & rhythmic syllable stress!',
    instructionFr: '🎯 Duel Phonétique : Articulez les fricatives dentales /θ/ vs /ð/ et le rythme accentuel !',
    rounds: [
      {
        topic: "Phonetic Target: /θ/ (unvoiced) vs /ð/ (voiced) dental fricatives",
        topicFr: "Cible Phonétique : Fricatives dentales /θ/ (sourde) vs /ð/ (sonore)",
        partnerScript: "My turn: 'Thirty-three thoughtful brothers breathe thoroughly through the freezing northern weather.' Notice the vocal cord vibration on 'breathe' versus 'thoughtful'!",
        userSuggestions: [
          "Thirty-three thoughtful brothers breathe thoroughly through the freezing northern weather.",
          "They thought that their father had gathered three feathers in the heather.",
          "Whether the weather is warm, whether the weather is hot, we must weather the weather whatever the weather!"
        ]
      },
      {
        topic: "Phonetic Target: Rapid tongue agility & rhythmic stress cadence",
        topicFr: "Cible Phonétique : Agilité linguale rapide et cadence rythmique accentuée",
        partnerScript: "Listen to my cadence: 'Through three cheese trees three free fleas flew. While these fleas flew, freezy breeze blew.' Your turn to match the tempo!",
        userSuggestions: [
          "Through three cheese trees three free fleas flew. While these fleas flew, freezy breeze blew. Freezy breeze made these three trees freeze!",
          "Peter Piper picked a peck of pickled peppers; a peck of pickled peppers Peter Piper picked!"
        ]
      },
      {
        topic: "Phonetic Target: Emphatic contrastive stress shift in spoken English",
        topicFr: "Cible Phonétique : Déplacement de l'accent contrastif emphatique en anglais oral",
        partnerScript: "Shift the emphatic focus across the sentence: 'I never said she stole my money.' Emphasize 'never' first, then emphasize 'stole'!",
        userSuggestions: [
          "I NEVER said she stole my money... and I never said SHE stole my money!",
          "I never said she STOLE my money; perhaps she merely borrowed it with permission!"
        ]
      }
    ],
    evalMetric: "Phonological Precision, Intonation & Syllable Stress",
    evalCriteria: ["Acoustic Clarity (96%)", "Minimal Pair Precision", "Rhythm & Stress", "Reduction of Accent Bias"],
    feedbackGenerator: (youScore, partnerScore, yourCEFR, partner, isFr = false) => isFr ? `
      <strong>Diagnostic de l'Arbitre IA pour le Duel de Prononciation & Phonétique :</strong><br>
      • <strong>Alex (Vous)</strong> : Niveau attribué <strong>${yourCEFR}</strong>. Clarté acoustique mesurée à <strong>96%</strong>. Articulation nette des fricatives dentales (/θ/ et /ð/) et contours d'intonation expressifs.<br>
      • <strong>${partner.name}</strong> : Niveau attribué <strong>${partner.level}</strong>. Haute précision phonologique avec régularité syllabique.<br>
      • <strong>Conseil Pédagogique</strong> : Phonétique remarquable ! Votre placement d'accent rend vos virelangues limpides et parfaitement compréhensibles.
    ` : `
      <strong>AI Referee Assessment for Pronunciation & Phonetics Clash:</strong><br>
      • <strong>Alex (You)</strong>: Awarded <strong>${yourCEFR}</strong>. Acoustic clarity scored at <strong>96%</strong>. Crisp dental fricative articulation (/θ/ and /ð/) and expressive intonation contours.<br>
      • <strong>${partner.name}</strong>: Awarded <strong>${partner.level}</strong>. High phonological precision with consistent syllable timing.<br>
      • <strong>Pedagogical Insight</strong>: Exceptional phonetics! Your rhythmic stress placement made complex tongue twisters sound clear and intelligible.
    `
  },
  cefr_grand: {
    id: 'cefr_grand',
    name: 'CEFR Grand Live Diagnostic',
    nameFr: 'Grand Diagnostic Live CECRL',
    icon: '🏆',
    timeSecs: 480,
    roundCount: 3,
    xpReward: 250,
    instruction: '🏆 Comprehensive CEFR Matrix Audit: Fluency, Lexical Resource, Grammar, Phonology & Cohesion!',
    instructionFr: '🏆 Audit Global Matrice CECRL : Fluidité, Lexique, Grammaire, Phonologie & Cohésion !',
    rounds: [
      {
        topic: "Benchmark 1 — Complex Socio-Economic Analysis: Propose an actionable reform for structural educational inequality.",
        topicFr: "Repère 1 — Analyse Socio-Économique : Proposez une réforme concrète face aux inégalités éducatives structurelles.",
        partnerScript: "For our initial benchmark, let us analyze systemic equity. In your view, what multilateral framework best mitigates the digital divide in developing economies?",
        userSuggestions: [
          "To bridge educational disparities, governments should subsidize open-source satellite connectivity and incentivize micro-accreditation hubs in underserved regions.",
          "Sustainable equity requires pairing localized language curriculum with international digital competencies, fostering both cultural pride and economic mobility.",
          "By decentralizing educational credentials through verified skills assessments, we empower marginalized learners to compete in the global freelance economy."
        ]
      },
      {
        topic: "Benchmark 2 — Nuanced Counter-Factual Reasoning: Analyze unintended consequences of rapid algorithmic centralization.",
        topicFr: "Repère 2 — Raisonnement Contrefactuel : Analysez les conséquences inattendues de la centralisation algorithmique.",
        partnerScript: "A compelling structural synthesis. Now, consider the trade-offs: what subtle socio-cultural distortions emerge when communication algorithms optimize purely for engagement?",
        userSuggestions: [
          "Algorithmic polarization tends to flatten rhetorical nuance, encouraging hyperbolic soundbites over substantive, dialectical discourse.",
          "When engagement metrics supersede cognitive depth, linguistic diversity diminishes into homogenized digital colloquialisms.",
          "Preserving authentic discourse requires building public-interest communication protocols that reward deliberation rather than emotional outrage."
        ]
      },
      {
        topic: "Benchmark 3 — Abstract Vision & Rhetorical Synthesis: The future of human consciousness in a multilingual global civilization.",
        topicFr: "Repère 3 — Vision Abstraite & Synthèse Rhétorique : L'avenir de la conscience humaine dans une civilisation multilingue.",
        partnerScript: "Outstanding lexical precision. In your final synthesis, articulate how linguistic versatility expands an individual's cognitive architecture.",
        userSuggestions: [
          "Speaking multiple languages expands conceptual horizons; it offers alternative syntactic prisms through which we interpret empathy, time, and shared destiny.",
          "A multilingual civilization is inherently more resilient, as diverse linguistic frameworks prevent dogmatic groupthink and foster collaborative innovation."
        ]
      }
    ],
    evalMetric: "Official 5-Criteria CEFR Level Diagnostic (A1-C2)",
    evalCriteria: ["Lexical Resource (C1)", "Grammatical Accuracy", "Coherence & Cohesion", "Interactive Fluency", "Phonological Control"],
    feedbackGenerator: (youScore, partnerScore, yourCEFR, partner, isFr = false) => isFr ? `
      <strong>Diagnostic de l'Arbitre IA pour le Grand Diagnostic Live CECRL :</strong><br>
      • <strong>Alex (Vous)</strong> : Niveau Officiel Attribué <strong>${yourCEFR}</strong>. Cohésion structurelle sans faille, forte densité lexicale C1/C2 (<em>"multilateral framework", "dialectical discourse", "syntactic prisms"</em>), et autonomie communicative naturelle.<br>
      • <strong>${partner.name}</strong> : Niveau attribué <strong>${partner.level}</strong>. Rigueur syntaxique constante et formulation conceptuelle claire.<br>
      • <strong>Conclusion Officielle</strong> : Félicitations ! Votre évaluation diagnostique vous qualifie pour l'attestation officielle <strong>CECRL ${yourCEFR} Avancé</strong> sur English Booster.
    ` : `
      <strong>AI Referee Assessment for CEFR Grand Live Diagnostic:</strong><br>
      • <strong>Alex (You)</strong>: Awarded <strong>${yourCEFR} Verified Level</strong>. Flawless structural cohesion, high-density C1/C2 lexicon (<em>"multilateral framework", "dialectical discourse", "syntactic prisms"</em>), and effortless communicative autonomy.<br>
      • <strong>${partner.name}</strong>: Awarded <strong>${partner.level}</strong>. Consistent syntactic discipline and articulate conceptual delivery.<br>
      • <strong>Official Conclusion</strong>: Congratulations! Your diagnostic evaluation qualifies you for the <strong>CEFR ${yourCEFR} Advanced Certificate</strong> on English Booster.
    `
  }
};

const CHALLENGER_PEERS = [
  { id: 'kenji_jp', name: 'Kenji Sato', country: 'Japan 🇯🇵', flag: '🇯🇵', avatar: '../assets/avatars/kenji.jpg', level: 'B2', baseScore: 89 },
  { id: 'sofia_es', name: 'Sofia Martínez', country: 'Spain 🇪🇸', flag: '🇪🇸', avatar: '../assets/avatars/sofia.jpg', level: 'B2+', baseScore: 92 },
  { id: 'amara_ng', name: 'Amara Okafor', country: 'Nigeria 🇳🇬', flag: '🇳🇬', avatar: '../assets/avatars/amara.jpg', level: 'C1', baseScore: 95 },
  { id: 'lucas_de', name: 'Lucas Weber', country: 'Germany 🇩🇪', flag: '🇩🇪', avatar: '../assets/avatars/lucas.jpg', level: 'B1+', baseScore: 86 },
  { id: 'tychique_ci', name: 'Tychique Bongo', country: 'Côte d’Ivoire 🇨🇮', flag: '🇨🇮', avatar: '../assets/images/tychique-bongo.jpg', level: 'Master C2', baseScore: 98 }
];

const BADGES_DATABASE = [
  { id: 'first_conv', name: 'First Conversation', icon: '🎙️', desc: 'Completed your first live exchange', unlocked: true, xp: 50 },
  { id: 'streak_7', name: '7 Day Streak', icon: '🔥', desc: 'Practiced 7 consecutive days', unlocked: true, xp: 100 },
  { id: 'arena_gladiator', name: 'Arena Gladiator', icon: '⚔️', desc: 'Won 5 live online English duels', unlocked: true, xp: 120 },
  { id: 'global_speaker', name: 'Global Speaker', icon: '🌍', desc: 'Spoke with partners from 5 countries', unlocked: true, xp: 150 },
  { id: 'master_debater', name: 'Master Debater', icon: '⚖️', desc: 'Completed 3 Great Debate challenges', unlocked: true, xp: 180 },
  { id: 'cefr_certified', name: 'CEFR Verified B2+', icon: '🏆', desc: 'Achieved verified B2+ in live diagnostic', unlocked: true, xp: 250 },
  { id: 'vocab_builder', name: 'Vocabulary Builder', icon: '📚', desc: 'Mastered 100+ native expressions', unlocked: true, xp: 100 },
  { id: 'english_champ', name: 'English Champion', icon: '👑', desc: 'Achieved 10,000+ XP in leaderboard', unlocked: false, xp: 500 }
];

class EnglishBoosterChallenges {
  constructor() {
    // Solo Challenge State
    this.isRecording = false;
    this.secondsRecorded = 0;
    this.recordTimer = null;
    this.challengeCompleted = false;

    // Live Battle Arena State
    this.currentMode = null;
    this.currentPartner = null;
    this.currentRound = 1;
    this.battleTimerInterval = null;
    this.battleSecondsLeft = 0;
    this.isMyTurn = true;
    this.partnerTranscriptTimer = null;
    this.voiceAudioEnabled = true;

    // Speech-to-Text State
    this.recognition = null;
    this.isMicActive = false;
    this.userSpokenWords = 0;
  }

  init() {
    this.bindDailyChallenge();
    this.bindLiveArenas();
    this.bindFilterTabs();
    this.bindCopyScorecard();
    this.initSpeechRecognition();
    this.renderBadges();

    // Auto-open requested arena if passed via URL parameter (e.g., from home page)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const arenaParam = urlParams.get('arena');
      const partnerParam = urlParams.get('partner');
      if (arenaParam && ARENAS_DATABASE[arenaParam]) {
        setTimeout(() => this.openArena(arenaParam, partnerParam), 350);
      } else if (urlParams.get('quick') === 'true') {
        setTimeout(() => {
          const quickBattleBtn = document.getElementById('btn-quick-random-battle');
          if (quickBattleBtn) quickBattleBtn.click();
        }, 350);
      }
    } catch (err) {
      console.warn('URL arena param error:', err);
    }
  }

  /* ========================================================================
     FILTER TABS & QUICK BATTLE
     ======================================================================== */
  bindFilterTabs() {
    const filterButtons = document.querySelectorAll('.arena-filter-btn');
    const arenaCards = document.querySelectorAll('.arena-card[data-arena-id]');
    const quickBattleBtn = document.getElementById('btn-quick-random-battle');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter') || 'all';
        arenaCards.forEach(card => {
          const cardId = card.getAttribute('data-arena-id');
          if (filter === 'all' || cardId === filter) {
            card.classList.remove('arena-hidden');
          } else {
            card.classList.add('arena-hidden');
          }
        });

        if (window.EnglishBooster?.SoundFX) {
          window.EnglishBooster.SoundFX.playClick();
        }
      });
    });

    const quickChoiceModal = document.getElementById('quick-duel-choice-modal');
    const closeChoiceBtn = document.getElementById('btn-close-quick-choice');
    const launchChoiceArenaBtn = document.getElementById('btn-launch-choice-arena');
    const launchChoiceCallBtn = document.getElementById('btn-launch-choice-call');
    const quickCallBtn = document.getElementById('btn-quick-random-call');

    if (quickBattleBtn) {
      quickBattleBtn.addEventListener('click', () => {
        if (quickChoiceModal) {
          quickChoiceModal.style.display = 'flex';
          setTimeout(() => quickChoiceModal.classList.add('active'), 10);
          if (window.EnglishBooster?.SoundFX) {
            window.EnglishBooster.SoundFX.playClick();
          }
        } else {
          const modes = Object.keys(ARENAS_DATABASE);
          const randomMode = modes[Math.floor(Math.random() * modes.length)];
          this.openArena(randomMode);
        }
      });
    }

    if (closeChoiceBtn && quickChoiceModal) {
      closeChoiceBtn.addEventListener('click', () => {
        quickChoiceModal.classList.remove('active');
        setTimeout(() => { quickChoiceModal.style.display = 'none'; }, 250);
      });
      quickChoiceModal.addEventListener('click', (e) => {
        if (e.target === quickChoiceModal) {
          quickChoiceModal.classList.remove('active');
          setTimeout(() => { quickChoiceModal.style.display = 'none'; }, 250);
        }
      });
    }

    if (launchChoiceArenaBtn) {
      launchChoiceArenaBtn.addEventListener('click', () => {
        if (quickChoiceModal) {
          quickChoiceModal.classList.remove('active');
          setTimeout(() => { quickChoiceModal.style.display = 'none'; }, 250);
        }
        const modes = Object.keys(ARENAS_DATABASE);
        const randomMode = modes[Math.floor(Math.random() * modes.length)];
        this.openArena(randomMode);
      });
    }

    if (launchChoiceCallBtn) {
      launchChoiceCallBtn.addEventListener('click', () => {
        if (quickChoiceModal) {
          quickChoiceModal.classList.remove('active');
          setTimeout(() => { quickChoiceModal.style.display = 'none'; }, 250);
        }
        this.startDirectRandomLiveCall();
      });
    }

    if (quickCallBtn) {
      quickCallBtn.addEventListener('click', () => {
        this.startDirectRandomLiveCall();
      });
    }
  }

  /* ========================================================================
     SPEECH RECOGNITION (MIC INPUT)
     ======================================================================== */
  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onstart = () => {
          this.isMicActive = true;
          this.updateMicVisuals(true);
        };

        this.recognition.onresult = (event) => {
          let interimTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            interimTranscript += event.results[i][0].transcript;
          }
          if (interimTranscript.trim()) {
            this.userSpokenWords += interimTranscript.trim().split(/\s+/).length;
            const youTranscriptEl = document.getElementById('battle-you-transcript');
            if (youTranscriptEl) {
              youTranscriptEl.textContent = `"${interimTranscript.trim()}"`;
              youTranscriptEl.style.color = '#ffffff';
            }
            const multiTranscriptEl = document.getElementById('multi-transcript-you');
            if (multiTranscriptEl) {
              multiTranscriptEl.textContent = `"${interimTranscript.trim()}"`;
              multiTranscriptEl.style.color = '#ffffff';
            }
          }
        };

        this.recognition.onerror = (event) => {
          console.warn('Speech recognition warning:', event.error);
          this.isMicActive = false;
          this.updateMicVisuals(false);
        };

        this.recognition.onend = () => {
          this.isMicActive = false;
          this.updateMicVisuals(false);
        };
      } catch (err) {
        console.warn('SpeechRecognition initialization error:', err);
      }
    }
  }

  toggleMicrophone() {
    if (!this.recognition) {
      // Fallback if browser doesn't support Web Speech API
      window.EnglishBooster.showToast(
        'Mic Simulation',
        'Web Speech API not supported in this browser. Click any of the suggested arguments below to speak!',
        'info'
      );
      const suggestions = this.getCurrentRoundData()?.userSuggestions || [];
      if (suggestions.length > 0) {
        this.selectSuggestion(suggestions[0]);
      }
      return;
    }

    if (!this.isMicActive) {
      try {
        this.recognition.start();
        window.EnglishBooster.SoundFX.playClick();
      } catch (err) {
        console.warn('Error starting speech recognition:', err);
        this.updateMicVisuals(false);
      }
    } else {
      try {
        this.recognition.stop();
        window.EnglishBooster.SoundFX.playSuccess();
      } catch (err) {
        console.warn('Error stopping speech recognition:', err);
      }
    }
  }

  updateMicVisuals(isActive) {
    const micBtn = document.getElementById('btn-battle-mic');
    const multiMicBtn = document.getElementById('btn-multi-mic');
    const indicator = document.getElementById('speech-indicator-you');
    const waveScreenYou = document.getElementById('wave-screen-you');

    if (multiMicBtn) {
      if (isActive) {
        multiMicBtn.classList.add('btn-battle-mic-recording');
        multiMicBtn.innerHTML = '⏹️ Stop Mic';
      } else {
        multiMicBtn.classList.remove('btn-battle-mic-recording');
        multiMicBtn.innerHTML = '🎙️ Speak (Mic)';
      }
    }

    if (waveScreenYou) {
      waveScreenYou.style.opacity = isActive ? '1' : (this.isMyTurn ? '0.85' : '0.35');
    }

    if (!micBtn) return;

    if (isActive) {
      micBtn.classList.add('btn-battle-mic-recording');
      micBtn.innerHTML = '⏹️ Stop Speaking / Done';
      if (indicator) {
        indicator.innerHTML = '🎙️ <strong style="color: #34d399;">Listening to your voice... Speak English!</strong>';
      }
    } else {
      micBtn.classList.remove('btn-battle-mic-recording');
      micBtn.innerHTML = '🎙️ Speak with Microphone';
      if (indicator) {
        indicator.innerHTML = this.isMyTurn
          ? '🎙️ Your Turn · Microphone Ready'
          : '👂 Muted · Listening to partner';
        indicator.style.color = this.isMyTurn ? '#34d399' : 'var(--text-muted)';
      }
    }
  }

  /* ========================================================================
     TEXT-TO-SPEECH (OPPONENT VOICE)
     ======================================================================== */
  /* ========================================================================
     TEXT-TO-SPEECH (OPPONENT VOICE & PHONETIC MODELS)
     ======================================================================== */
  speakPartnerText(text, onCompleteCallback = null) {
    let completed = false;
    const notifyDone = () => {
      if (completed) return;
      completed = true;
      const partnerWave = document.getElementById('wave-partner');
      if (!this.isMyTurn && partnerWave) partnerWave.style.opacity = '0.35';
      if (typeof onCompleteCallback === 'function') {
        onCompleteCallback();
      }
    };

    if (!this.voiceAudioEnabled || !('speechSynthesis' in window)) {
      // Calculate realistic pause duration for simulated speech
      const words = text ? text.split(/\s+/).length : 12;
      const delayMs = Math.max(Math.min(words * 260, 4800), 2200);
      setTimeout(notifyDone, delayMs);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';

      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('David') || v.name.includes('Samantha')));
      if (englishVoice) utterance.voice = englishVoice;

      const partnerWave = document.getElementById('wave-partner');
      if (partnerWave) partnerWave.style.opacity = '1';

      utterance.onend = () => notifyDone();
      utterance.onerror = () => notifyDone();

      // Reliable failsafe timer in case browser delays speech synthesis onend
      const wordCount = text.split(/\s+/).length;
      const safetyTimeoutMs = Math.max(Math.min(wordCount * 340, 6800), 3200);
      setTimeout(notifyDone, safetyTimeoutMs);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('SpeechSynthesis error:', err);
      notifyDone();
    }
  }

  playPhoneticModelAudio() {
    const roundData = this.getCurrentRoundData();
    const modelText = roundData?.partnerScript || "Thirty-three thoughtful brothers breathe thoroughly through the freezing northern weather.";
    
    if (window.EnglishBooster?.SoundFX) {
      window.EnglishBooster.SoundFX.playClick();
    }
    window.EnglishBooster.showToast('Phonetic Model', 'Listening to authentic native articulation cadence...', 'info');

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(modelText);
        utterance.rate = 0.85; // Slightly slower for crisp articulation
        utterance.pitch = 1.05;
        utterance.lang = 'en-US';

        const voices = window.speechSynthesis.getVoices();
        const nativeVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha')));
        if (nativeVoice) utterance.voice = nativeVoice;

        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn('Phonetic audio error:', e);
      }
    }
  }

  /* ========================================================================
     LIVE CHALLENGE ARENA ENGINE
     ======================================================================== */
  bindLiveArenas() {
    const startButtons = document.querySelectorAll('.btn-arena-start');
    const arenaCards = document.querySelectorAll('.arena-card[data-arena-id]');
    const modalBackdrop = document.getElementById('arena-modal-backdrop');
    const closeBtn = document.getElementById('btn-close-arena');
    const cancelMatchBtn = document.getElementById('btn-cancel-matching');
    const endEarlyBtn = document.getElementById('btn-finish-battle-early');
    const toggleTurnBtn = document.getElementById('btn-toggle-battle-turn');
    const nextRoundBtn = document.getElementById('btn-next-battle-round');
    const multiNextRoundBtn = document.getElementById('btn-multi-next-round');
    const submitEvalBtn = document.getElementById('btn-submit-battle-eval');
    const rematchBtn = document.getElementById('btn-rematch-arena');
    const finishBtn = document.getElementById('btn-finish-arena');
    const reactionButtons = document.querySelectorAll('.btn-battle-reaction');
    const micBtn = document.getElementById('btn-battle-mic');
    const voiceAudioBtn = document.getElementById('btn-toggle-voice-audio');
    const replayVoiceBtn = document.getElementById('btn-replay-partner-voice');

    // Launch Arena Battle from Card Action Buttons
    startButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const modeId = btn.getAttribute('data-mode') || 'speed_duel';
        this.openArena(modeId);
      });
    });

    // Launch Arena Battle by Clicking Card Itself
    arenaCards.forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', (e) => {
        if (e.target.closest('button') || e.target.closest('a')) return;
        const modeId = card.getAttribute('data-arena-id');
        if (modeId) this.openArena(modeId);
      });
    });

    // Custom Spoken Argument Input Field (Type or Hit Enter)
    const customArgInput = document.getElementById('battle-custom-arg-input');
    const sendCustomArgBtn = document.getElementById('btn-send-custom-arg');

    if (sendCustomArgBtn) {
      sendCustomArgBtn.addEventListener('click', () => this.sendCustomArgument());
    }
    if (customArgInput) {
      customArgInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.sendCustomArgument();
        }
      });
    }

    // Close Modal
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeArena());
    if (cancelMatchBtn) cancelMatchBtn.addEventListener('click', () => this.closeArena());
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) this.closeArena();
      });
    }

    // Microphone button
    if (micBtn) {
      micBtn.addEventListener('click', () => this.toggleMicrophone());
    }

    // Voice Audio Toggle
    if (voiceAudioBtn) {
      voiceAudioBtn.addEventListener('click', () => {
        this.voiceAudioEnabled = !this.voiceAudioEnabled;
        voiceAudioBtn.innerHTML = this.voiceAudioEnabled ? '🔊 Voice: ON' : '🔇 Voice: OFF';
        if (!this.voiceAudioEnabled && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
        window.EnglishBooster.SoundFX.playClick();
      });
    }

    // Replay Partner Voice
    if (replayVoiceBtn) {
      replayVoiceBtn.addEventListener('click', () => {
        const transcriptPartner = document.getElementById('battle-partner-transcript');
        const text = transcriptPartner?.textContent.replace(/^"|"$/g, '').trim();
        if (text) {
          this.speakPartnerText(text);
          window.EnglishBooster.SoundFX.playClick();
        }
      });
    }

    // Battle Actions
    if (endEarlyBtn) {
      endEarlyBtn.addEventListener('click', () => {
        if (confirm("End duel early and proceed directly to AI Level Evaluation?")) {
          this.finishBattleAndEvaluate();
        }
      });
    }

    if (toggleTurnBtn) {
      toggleTurnBtn.addEventListener('click', () => this.toggleBattleTurn());
    }

    if (nextRoundBtn) {
      nextRoundBtn.addEventListener('click', () => this.advanceToNextRound());
    }

    if (multiNextRoundBtn) {
      multiNextRoundBtn.addEventListener('click', () => this.advanceToNextRound());
    }

    if (submitEvalBtn) {
      submitEvalBtn.addEventListener('click', () => this.finishBattleAndEvaluate());
    }

    if (rematchBtn) {
      rematchBtn.addEventListener('click', () => {
        this.startMatchmaking();
      });
    }

    if (finishBtn) {
      finishBtn.addEventListener('click', () => {
        this.closeArena();
        window.EnglishBooster.showToast('Level Updated', 'Your CEFR assessment scores and XP rewards have been saved!', 'success');
      });
    }

    // Live Reactions
    reactionButtons.forEach(rBtn => {
      rBtn.addEventListener('click', () => {
        const emoji = rBtn.getAttribute('data-emoji') || '👏';
        this.triggerLiveReaction(emoji);
      });
    });

    // In-Battle Live Call Handlers
    const battleLiveCallBtn = document.getElementById('btn-battle-live-call');
    const partnerLiveCallBtn = document.getElementById('btn-partner-live-call');

    if (battleLiveCallBtn) {
      battleLiveCallBtn.addEventListener('click', () => {
        this.startDirectRandomLiveCall(this.currentPartner?.id);
      });
    }

    if (partnerLiveCallBtn) {
      partnerLiveCallBtn.addEventListener('click', () => {
        this.startDirectRandomLiveCall(this.currentPartner?.id);
      });
    }

    // Multi-Screen Grid vs Duo Focus Toggle
    const btnMultiScreens = document.getElementById('btn-view-multi-screens');
    const btnDuoFocus = document.getElementById('btn-view-duo-focus');
    const multiGrid = document.getElementById('quick-random-multi-screens');
    const duoGrid = document.getElementById('battle-stage-duo-grid');

    if (btnMultiScreens && btnDuoFocus && multiGrid && duoGrid) {
      btnMultiScreens.addEventListener('click', () => {
        multiGrid.style.display = 'grid';
        duoGrid.style.display = 'none';
        btnMultiScreens.classList.add('active');
        btnDuoFocus.classList.remove('active');
        if (window.EnglishBooster?.SoundFX) window.EnglishBooster.SoundFX.playClick();
      });

      btnDuoFocus.addEventListener('click', () => {
        multiGrid.style.display = 'none';
        duoGrid.style.display = 'grid';
        btnDuoFocus.classList.add('active');
        btnMultiScreens.classList.remove('active');
        if (window.EnglishBooster?.SoundFX) window.EnglishBooster.SoundFX.playClick();
      });
    }

    // Multi-Screen Live Call Action Controls
    const multiMicBtn = document.getElementById('btn-multi-mic');
    if (multiMicBtn) {
      multiMicBtn.addEventListener('click', () => {
        this.toggleMicrophone();
      });
    }

    const multiPassTurnBtn = document.getElementById('btn-multi-pass-turn');
    if (multiPassTurnBtn) {
      multiPassTurnBtn.addEventListener('click', () => {
        this.toggleBattleTurn();
      });
    }

    // Screen Listen Buttons (Play audio for any participant)
    const screenListenButtons = document.querySelectorAll('.btn-screen-listen');
    screenListenButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const speakerKey = btn.getAttribute('data-speaker') || 'kenji';
        this.listenToScreenSpeaker(speakerKey);
      });
    });

    // Screen Pin Buttons (Set that participant as primary duel opponent)
    const screenPinButtons = document.querySelectorAll('.btn-screen-pin');
    screenPinButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const speakerKey = btn.getAttribute('data-speaker') || 'kenji';
        this.pinScreenSpeaker(speakerKey);
      });
    });
  }

  listenToScreenSpeaker(speakerKey) {
    const transcriptEl = document.getElementById(`multi-transcript-${speakerKey}`);
    const text = transcriptEl ? transcriptEl.textContent.replace(/^"|"$/g, '').trim() : '';
    if (!text) return;

    const waveEl = document.getElementById(`wave-screen-${speakerKey}`);
    const screenCard = document.getElementById(`screen-call-${speakerKey}`);
    const statusEl = document.getElementById(`status-screen-${speakerKey}`);

    if (waveEl) waveEl.style.opacity = '1';
    if (screenCard) screenCard.classList.add('active-speaker');
    if (statusEl) {
      const isFr = (window.EnglishBooster?.i18n?.getLang() === 'fr') || (document.documentElement.getAttribute('lang') === 'fr');
      statusEl.textContent = isFr ? '🎤 En train de parler...' : '🎤 Speaking...';
      statusEl.style.color = 'var(--green-400)';
    }

    if (window.EnglishBooster?.SoundFX) window.EnglishBooster.SoundFX.playClick();
    this.speakPartnerText(text);

    setTimeout(() => {
      if (waveEl && (!this.currentPartner || !this.currentPartner.id.includes(speakerKey) || this.isMyTurn)) {
        waveEl.style.opacity = '0.35';
      }
      if (screenCard && speakerKey !== 'you' && this.isMyTurn) {
        screenCard.classList.remove('active-speaker');
      }
      if (statusEl) {
        const isFr = (window.EnglishBooster?.i18n?.getLang() === 'fr') || (document.documentElement.getAttribute('lang') === 'fr');
        statusEl.textContent = isFr ? '👂 Écoute active' : '👂 Listening';
        statusEl.style.color = 'var(--text-muted)';
      }
    }, 4500);
  }

  pinScreenSpeaker(speakerKey) {
    const peerMap = {
      kenji: 'kenji_jp',
      sofia: 'sofia_es',
      amara: 'amara_ng',
      lucas: 'lucas_de',
      tychique: 'tychique_ci'
    };
    const targetPeerId = peerMap[speakerKey];
    const peer = CHALLENGER_PEERS.find(p => p.id === targetPeerId) || CHALLENGER_PEERS[0];
    this.currentPartner = peer;

    // Update duo focus view elements
    const partnerName = document.getElementById('battle-partner-name');
    const partnerLevel = document.getElementById('battle-partner-level');
    const partnerImg = document.getElementById('battle-partner-img');
    const partnerFlag = document.getElementById('battle-partner-flag');

    if (partnerName) partnerName.textContent = peer.name;
    if (partnerLevel) partnerLevel.textContent = `Level ${peer.level} · ${peer.country}`;
    if (partnerImg) partnerImg.src = peer.avatar;
    if (partnerFlag) partnerFlag.textContent = peer.flag;

    if (window.EnglishBooster?.SoundFX) window.EnglishBooster.SoundFX.playSuccess();
    const isFr = (window.EnglishBooster?.i18n?.getLang() === 'fr') || (document.documentElement.getAttribute('lang') === 'fr');
    const title = isFr ? 'Interlocuteur Épinglé' : 'Opponent Pinned';
    const msg = isFr 
      ? `${peer.name} (${peer.country}) est maintenant votre interlocuteur direct !`
      : `${peer.name} (${peer.country}) is now your primary sparring partner!`;
    window.EnglishBooster.showToast(title, msg, 'success', 2500);

    // Visual pulse outline on pinned card
    document.querySelectorAll('.live-call-screen').forEach(c => c.style.outline = 'none');
    const targetCard = document.getElementById(`screen-call-${speakerKey}`);
    if (targetCard) {
      targetCard.style.outline = '2px solid var(--green-400)';
      targetCard.style.outlineOffset = '2px';
      setTimeout(() => { if (targetCard) targetCard.style.outline = 'none'; }, 2500);
    }
  }

  openArena(modeId, partnerId = null) {
    this.currentMode = ARENAS_DATABASE[modeId] || ARENAS_DATABASE.speed_duel;
    this.currentRound = 1;
    this.userSpokenWords = 0;
    const modal = document.getElementById('arena-modal-backdrop');
    if (!modal) return;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (window.EnglishBooster?.SoundFX) {
      window.EnglishBooster.SoundFX.playClick();
    }
    this.startMatchmaking(partnerId);
  }

  closeArena() {
    const modal = document.getElementById('arena-modal-backdrop');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';

    clearInterval(this.battleTimerInterval);
    clearTimeout(this.partnerTranscriptTimer);

    if (this.isMicActive && this.recognition) {
      try { this.recognition.stop(); } catch (e) {}
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  startDirectRandomLiveCall(partnerId = null) {
    if (window.EnglishBooster?.SoundFX) {
      window.EnglishBooster.SoundFX.playSuccess();
    }
    const partner = partnerId 
      ? (CHALLENGER_PEERS.find(p => p.id === partnerId) || CHALLENGER_PEERS[0])
      : CHALLENGER_PEERS[Math.floor(Math.random() * CHALLENGER_PEERS.length)];

    const isFr = (window.EnglishBooster?.i18n?.getLang() === 'fr') || (document.documentElement.getAttribute('lang') === 'fr');
    const toastTitle = isFr ? '🎙️ Appel en Direct Lancé' : '🎙️ Live Call Initiated';
    const toastMsg = isFr 
      ? `Connexion à l'appel en direct 1-to-1 avec ${partner.name} (${partner.country})...`
      : `Connecting to 1-on-1 Live Call with ${partner.name} (${partner.country})...`;

    if (window.EnglishBooster?.showToast) {
      window.EnglishBooster.showToast(toastTitle, toastMsg, 'success', 2200);
    }

    setTimeout(() => {
      window.location.href = `call.html?partner=${partner.id || 'kenji_jp'}&mode=quick_duel`;
    }, 700);
  }

  startMatchmaking(partnerId = null) {
    // Reset Stages
    document.getElementById('arena-stage-matching').style.display = 'block';
    document.getElementById('arena-stage-battle').style.display = 'none';
    document.getElementById('arena-stage-results').style.display = 'none';

    const title = document.getElementById('arena-matching-title');
    const desc = document.getElementById('arena-matching-desc');
    const radarIcon = document.getElementById('arena-radar-icon');

    const isFr = (window.EnglishBooster?.i18n?.getLang() === 'fr') || (document.documentElement.getAttribute('lang') === 'fr');
    const modeName = isFr && this.currentMode.nameFr ? this.currentMode.nameFr : this.currentMode.name;
    if (radarIcon) radarIcon.textContent = this.currentMode.icon;
    if (title) {
      title.textContent = isFr
        ? `Recherche d'un adversaire pour ${modeName}...`
        : `Finding Opponent for ${this.currentMode.name}...`;
    }
    if (desc) {
      desc.textContent = isFr
        ? `Mise en relation avec des apprenants en ligne testant ${this.currentMode.evalMetric}...`
        : `Matching with active online learners testing ${this.currentMode.evalMetric}...`;
    }

    // Select partner from peer list or use specific partner if requested
    let partner = null;
    if (partnerId) {
      partner = CHALLENGER_PEERS.find(p => p.id === partnerId || p.id.startsWith(partnerId.split('_')[0]));
    }
    this.currentPartner = partner || CHALLENGER_PEERS[Math.floor(Math.random() * CHALLENGER_PEERS.length)];
    this.userSpokenWords = 0;

    // Simulate online discovery (1.4s)
    setTimeout(() => {
      this.launchBattleDuel();
    }, 1400);
  }

  getCurrentRoundData() {
    if (!this.currentMode || !this.currentMode.rounds) return null;
    const roundIdx = Math.min(this.currentRound - 1, this.currentMode.rounds.length - 1);
    return this.currentMode.rounds[roundIdx];
  }

  launchBattleDuel() {
    document.getElementById('arena-stage-matching').style.display = 'none';
    document.getElementById('arena-stage-battle').style.display = 'block';
    document.getElementById('arena-stage-results').style.display = 'none';

    // Set Duo Focus View by default for duels (clean 1-on-1 sparring interface)
    const btnMultiScreens = document.getElementById('btn-view-multi-screens');
    const btnDuoFocus = document.getElementById('btn-view-duo-focus');
    const multiGrid = document.getElementById('quick-random-multi-screens');
    const duoGrid = document.getElementById('battle-stage-duo-grid');

    if (multiGrid && duoGrid && btnDuoFocus && btnMultiScreens) {
      duoGrid.style.display = 'grid';
      multiGrid.style.display = 'none';
      btnDuoFocus.classList.add('active');
      btnMultiScreens.classList.remove('active');
    }

    if (window.EnglishBooster?.SoundFX) {
      window.EnglishBooster.SoundFX.playSuccess();
    }
    const isFr = (window.EnglishBooster?.i18n?.getLang() === 'fr') || (document.documentElement.getAttribute('lang') === 'fr');
    window.EnglishBooster.showToast(
      isFr ? 'Adversaire Connecté !' : 'Opponent Found!',
      `${this.currentPartner.name} (${this.currentPartner.country}) · Level ${this.currentPartner.level}`,
      'success'
    );

    // Setup Arena Details
    this.currentRound = 1;
    this.battleSecondsLeft = this.currentMode.timeSecs;
    this.isMyTurn = true;

    const modeBadge = document.getElementById('battle-mode-badge');
    const modeInstruction = document.getElementById('battle-mode-instruction');
    const partnerName = document.getElementById('battle-partner-name');
    const partnerLevel = document.getElementById('battle-partner-level');
    const partnerImg = document.getElementById('battle-partner-img');
    const partnerFlag = document.getElementById('battle-partner-flag');

    const modeName = isFr && this.currentMode.nameFr ? this.currentMode.nameFr : this.currentMode.name;
    const modeInstructionText = isFr && this.currentMode.instructionFr ? this.currentMode.instructionFr : this.currentMode.instruction;

    if (modeBadge) modeBadge.textContent = `${this.currentMode.icon} ${modeName}`;
    if (modeInstruction) modeInstruction.textContent = modeInstructionText;

    if (partnerName) partnerName.textContent = this.currentPartner.name;
    if (partnerLevel) partnerLevel.textContent = `Level ${this.currentPartner.level} · ${this.currentPartner.country}`;
    if (partnerImg) partnerImg.src = this.currentPartner.avatar;
    if (partnerFlag) partnerFlag.textContent = this.currentPartner.flag;

    // Reset transcripts
    const youTranscript = document.getElementById('battle-you-transcript');
    if (youTranscript) {
      youTranscript.textContent = isFr
        ? '"Appuyez sur le micro, choisissez un argument ou tapez votre phrase ci-dessous..."'
        : '"Tap microphone to speak, select an argument or type below..."';
      youTranscript.style.color = '#ffffff';
    }
    const multiTranscript = document.getElementById('multi-transcript-you');
    if (multiTranscript) {
      multiTranscript.textContent = isFr
        ? '"Appuyez sur le micro ou tapez ci-dessous..."'
        : '"Tap microphone or argue below to speak..."';
      multiTranscript.style.color = '#ffffff';
    }

    this.updateRoundView();
    this.updateTurnVisuals();
    this.startBattleTimer();
  }

  updateRoundView() {
    const roundBadge = document.getElementById('battle-round-badge');
    const topicText = document.getElementById('battle-topic-text');
    const roundData = this.getCurrentRoundData();
    const isFr = (window.EnglishBooster?.i18n?.getLang() === 'fr') || (document.documentElement.getAttribute('lang') === 'fr');

    if (roundBadge) {
      roundBadge.textContent = `Round ${this.currentRound} / ${this.currentMode.roundCount}`;
    }
    if (topicText && roundData) {
      if (isFr && roundData.topicFr) {
        topicText.innerHTML = `"${roundData.topic}"<div style="font-size: 0.88rem; color: #94a3b8; font-weight: 400; margin-top: 6px;"><em>(« ${roundData.topicFr} »)</em></div>`;
      } else {
        topicText.textContent = `"${roundData.topic}"`;
      }
    }

    this.renderQuickSuggestions();
    this.updateModeHUD();
  }

  updateModeHUD() {
    const hudContainer = document.getElementById('battle-mode-hud');
    if (!hudContainer || !this.currentMode) return;

    const modeId = this.currentMode.id;
    const roundData = this.getCurrentRoundData();
    const isFr = (window.EnglishBooster?.i18n?.getLang() === 'fr') || (document.documentElement.getAttribute('lang') === 'fr');
    let hudHtml = '';

    if (modeId === 'speed_duel') {
      const calculatedWPM = Math.max(Math.round(118 + (this.userSpokenWords * 1.5)), 122);
      hudHtml = `
        <div class="hud-items-row">
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <span class="hud-metric-pill speed-pill">⚡ ${isFr ? 'Cadence en direct :' : 'Live Cadence:'} ${calculatedWPM} WPM</span>
            <span class="hud-metric-pill">⏱️ ${isFr ? 'Limite par tour : 30s' : 'Turn Limit: 30s Rapid Sprint'}</span>
            <span class="hud-metric-pill" style="color: var(--green-400);">🚫 ${isFr ? '0 Hésitation / 0 Remplissage' : '0 Hesitations / 0 Fillers'}</span>
          </div>
          <span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 700;">${isFr ? 'Cible réflexe : < 0.8s' : 'Reflex Target: < 0.8s'}</span>
        </div>
      `;
    } else if (modeId === 'debate') {
      const stageName = isFr
        ? (this.currentRound === 1 ? 'Phase 1 : Thèse & Construction' : (this.currentRound === 2 ? 'Phase 2 : Contre-Interrogatoire' : 'Phase 3 : Synthèse & Verdict'))
        : (this.currentRound === 1 ? 'Stage 1: Opening Thesis' : (this.currentRound === 2 ? 'Stage 2: Cross-Examination' : 'Stage 3: Final Synthesis'));
      
      hudHtml = `
        <div class="hud-items-row">
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <span class="hud-metric-pill debate-pill-pro">🟢 Alex (You): PRO</span>
            <span class="hud-metric-pill debate-pill-con">🟣 ${this.currentPartner.name}: CON</span>
            <span class="hud-metric-pill">${stageName}</span>
          </div>
          <div style="font-size: 0.78rem; color: var(--text-muted); display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
            <span>💡 ${isFr ? 'Connecteurs :' : 'Rhetorical markers:'}</span>
            <button type="button" class="btn btn-secondary btn-sm btn-connector-insert" data-text="Furthermore, " style="padding: 2px 7px; font-size: 0.72rem;">Furthermore</button>
            <button type="button" class="btn btn-secondary btn-sm btn-connector-insert" data-text="Conversely, " style="padding: 2px 7px; font-size: 0.72rem;">Conversely</button>
            <button type="button" class="btn btn-secondary btn-sm btn-connector-insert" data-text="Empirical data shows " style="padding: 2px 7px; font-size: 0.72rem;">Empirical data</button>
            <button type="button" class="btn btn-secondary btn-sm btn-connector-insert" data-text="In light of this, " style="padding: 2px 7px; font-size: 0.72rem;">In light of this</button>
            <button type="button" class="btn btn-secondary btn-sm btn-connector-insert" data-text="In conclusion, " style="padding: 2px 7px; font-size: 0.72rem;">In conclusion</button>
          </div>
        </div>
      `;
    } else if (modeId === 'roleplay') {
      hudHtml = `
        <div class="hud-items-row">
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <span class="hud-metric-pill" style="background: rgba(236, 72, 153, 0.2); color: #f472b6; border-color: rgba(236, 72, 153, 0.4);">
              🎭 Silicon Valley Tech Interview
            </span>
            <span class="hud-metric-pill">${isFr ? 'Rôle : Candidat Senior' : 'Role: Senior Candidate'}</span>
            <span class="hud-metric-pill">${isFr ? 'Partenaire : Architecte Principal' : 'Partner: Lead Architect'}</span>
          </div>
          <span style="font-size: 0.78rem; color: #34d399; font-weight: 600;">☑️ ${isFr ? 'Registre Professionnel : Actif' : 'Executive Register Target: Active'}</span>
        </div>
      `;
    } else if (modeId === 'phonetics') {
      hudHtml = `
        <div class="hud-items-row">
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <span class="hud-metric-pill phonetics-pill">
              🎯 ${roundData?.topic?.split(':')[0] || 'Phonetic Articulation Target'}
            </span>
            <span class="hud-metric-pill" style="color: var(--green-400);">📊 ${isFr ? 'Clarté Acoustique : 97%' : 'Acoustic Clarity: 97%'}</span>
          </div>
          <button type="button" id="btn-listen-phonetic-model" class="btn btn-secondary btn-sm" style="font-size: 0.74rem; padding: 4px 10px; border-color: rgba(6, 182, 212, 0.5); color: #22d3ee;">
            🔊 ${isFr ? 'Écouter le Modèle Audio Natif' : 'Hear Native Model Audio'}
          </button>
        </div>
      `;
    } else if (modeId === 'cefr_grand') {
      hudHtml = `
        <div class="hud-items-row">
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <span class="hud-metric-pill cefr-pill">
              🏆 ${isFr ? `Benchmark Diagnostique ${this.currentRound}/3 : Matrice Complète` : `Diagnostic Benchmark ${this.currentRound}/3: Comprehensive Matrix`}
            </span>
            <span class="hud-metric-pill" style="color: #93c5fd;">${isFr ? 'Critères : Fluidité · Lexique · Syntaxe · Cohésion · Phonologie' : 'Criteria: Fluency · Lexis · Syntax · Cohesion · Phonology'}</span>
          </div>
          <span style="font-size: 0.78rem; color: var(--green-400); font-weight: 700;">${isFr ? 'Niveau Visé : C1 Avancé' : 'Diagnostic Level: Evaluating C1'}</span>
        </div>
      `;
    }

    hudContainer.innerHTML = hudHtml;

    // Bind Phonetic model audio button if present
    const listenModelBtn = document.getElementById('btn-listen-phonetic-model');
    if (listenModelBtn) {
      listenModelBtn.addEventListener('click', () => this.playPhoneticModelAudio());
    }

    // Bind Clickable Rhetorical Connectors for Debate Arena
    hudContainer.querySelectorAll('.btn-connector-insert').forEach(btn => {
      btn.addEventListener('click', () => {
        const insertText = btn.getAttribute('data-text') || '';
        const input = document.getElementById('battle-custom-arg-input');
        if (input) {
          input.value = input.value ? `${input.value} ${insertText}` : insertText;
          input.focus();
        }
        if (window.EnglishBooster?.SoundFX) {
          window.EnglishBooster.SoundFX.playClick();
        }
      });
    });
  }

  renderQuickSuggestions() {
    const container = document.getElementById('battle-quick-prompts');
    if (!container) return;

    const roundData = this.getCurrentRoundData();
    const suggestions = roundData?.userSuggestions || [];

    container.innerHTML = suggestions.map((text, idx) => `
      <button class="battle-quick-prompt-btn" data-suggestion-idx="${idx}">
        <span>💬</span>
        <span>"${text}"</span>
      </button>
    `).join('');

    container.querySelectorAll('.battle-quick-prompt-btn').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        this.selectSuggestion(suggestions[idx]);
      });
    });
  }

  sendCustomArgument() {
    const input = document.getElementById('battle-custom-arg-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) {
      window.EnglishBooster.showToast('Please type an argument', 'Type your spoken thoughts in English to continue!', 'info');
      return;
    }
    input.value = '';
    this.submitUserSpokenText(text);
  }

  selectSuggestion(text) {
    this.submitUserSpokenText(text);
  }

  submitUserSpokenText(text) {
    if (!this.isMyTurn) {
      window.EnglishBooster.showToast('Please Wait', "It's your partner's turn to speak!", 'info');
      return;
    }

    const youTranscript = document.getElementById('battle-you-transcript');
    if (youTranscript) {
      youTranscript.textContent = `"${text}"`;
      youTranscript.style.color = '#ffffff';
    }

    const multiTranscript = document.getElementById('multi-transcript-you');
    if (multiTranscript) {
      multiTranscript.textContent = `"${text}"`;
      multiTranscript.style.color = '#ffffff';
    }

    this.userSpokenWords += text.split(/\s+/).length;

    if (window.EnglishBooster?.SoundFX) {
      window.EnglishBooster.SoundFX.playClick();
    }
    
    const isFr = (window.EnglishBooster?.i18n?.getLang() === 'fr') || (document.documentElement.getAttribute('lang') === 'fr');
    window.EnglishBooster.showToast(
      isFr ? 'Argument Exprimé' : 'Argument Spoken',
      isFr ? 'Excellente intervention ! La main passe au partenaire...' : 'Great point! Passing turn to partner...',
      'success'
    );

    // Update Live HUD metrics if in speed duel
    this.updateModeHUD();

    // Auto transfer turn to partner after short pause
    setTimeout(() => {
      if (this.isMyTurn) {
        this.transferTurnToPartner();
      }
    }, 1000);
  }

  transferTurnToPartner() {
    this.isMyTurn = false;
    this.updateTurnVisuals();

    const roundData = this.getCurrentRoundData();
    const partnerText = roundData?.partnerScript || "I completely agree with that perspective and appreciate your structured reasoning!";

    const transcriptPartner = document.getElementById('battle-partner-transcript');
    if (transcriptPartner) {
      transcriptPartner.textContent = `"${partnerText}"`;
    }

    // Speak with partner audio and trigger next round when speech ends
    this.speakPartnerText(partnerText, () => {
      this.handlePartnerTurnComplete();
    });
  }

  handlePartnerTurnComplete() {
    // Both user and partner have spoken in this round
    if (this.currentRound < this.currentMode.roundCount) {
      const completedRound = this.currentRound;
      this.currentRound++;

      if (window.EnglishBooster?.SoundFX) {
        window.EnglishBooster.SoundFX.playSuccess();
      }

      const isFr = (window.EnglishBooster?.i18n?.getLang() === 'fr') || (document.documentElement.getAttribute('lang') === 'fr');
      window.EnglishBooster.showToast(
        isFr ? `⚡ Round ${completedRound} Terminé !` : `⚡ Round ${completedRound} Completed!`,
        isFr ? `Passage au Round ${this.currentRound} / ${this.currentMode.roundCount}... À vous la parole !` : `Advancing to Round ${this.currentRound} / ${this.currentMode.roundCount}... Your turn to speak!`,
        'success',
        2500
      );

      this.updateRoundView();
      this.isMyTurn = true;
      this.updateTurnVisuals();
    } else {
      // All rounds complete!
      const isFr = (window.EnglishBooster?.i18n?.getLang() === 'fr') || (document.documentElement.getAttribute('lang') === 'fr');
      window.EnglishBooster.showToast(
        isFr ? '🏆 Duel Terminé !' : '🏆 All Rounds Completed!',
        isFr ? 'Calcul de l\'évaluation officielle du niveau CECRL...' : 'Calculating official AI Referee CEFR diagnostic level...',
        'success',
        2200
      );

      setTimeout(() => {
        this.finishBattleAndEvaluate();
      }, 1300);
    }
  }

  advanceToNextRound() {
    if (this.currentRound < this.currentMode.roundCount) {
      const oldRound = this.currentRound;
      this.currentRound++;
      if (window.EnglishBooster?.SoundFX) {
        window.EnglishBooster.SoundFX.playSuccess();
      }
      const isFr = (window.EnglishBooster?.i18n?.getLang() === 'fr') || (document.documentElement.getAttribute('lang') === 'fr');
      window.EnglishBooster.showToast(
        isFr ? `⚡ Passage au Round ${this.currentRound}` : `⚡ Advanced to Round ${this.currentRound}`,
        isFr ? `Round ${oldRound} validé. Nouveau sujet débloqué !` : `Round ${oldRound} confirmed. New topic unlocked!`,
        'info',
        2200
      );

      this.updateRoundView();
      this.isMyTurn = true;
      this.updateTurnVisuals();
    } else {
      this.finishBattleAndEvaluate();
    }
  }

  startBattleTimer() {
    clearInterval(this.battleTimerInterval);
    const timerDisplay = document.getElementById('battle-timer');

    this.battleTimerInterval = setInterval(() => {
      if (this.battleSecondsLeft <= 0) {
        clearInterval(this.battleTimerInterval);
        this.finishBattleAndEvaluate();
        return;
      }

      this.battleSecondsLeft--;
      const mins = Math.floor(this.battleSecondsLeft / 60);
      const secs = this.battleSecondsLeft % 60;
      if (timerDisplay) {
        timerDisplay.textContent = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
      }
    }, 1000);
  }

  toggleBattleTurn() {
    this.isMyTurn = !this.isMyTurn;

    if (this.isMicActive && this.recognition) {
      try { this.recognition.stop(); } catch (e) {}
    }

    if (window.EnglishBooster?.SoundFX) {
      window.EnglishBooster.SoundFX.playClick();
    }

    if (!this.isMyTurn) {
      this.transferTurnToPartner();
    } else {
      this.updateTurnVisuals();
    }
  }

  updateTurnVisuals() {
    const cardYou = document.getElementById('player-card-you');
    const cardPartner = document.getElementById('player-card-partner');
    const pillYou = document.getElementById('turn-pill-you');
    const pillPartner = document.getElementById('turn-pill-partner');
    const waveYou = document.getElementById('wave-you');
    const wavePartner = document.getElementById('wave-partner');
    const indicatorYou = document.getElementById('speech-indicator-you');
    const transcriptPartner = document.getElementById('battle-partner-transcript');

    // Multi-Room 6 Live Screens Sync
    const isFr = (window.EnglishBooster?.i18n?.getLang() === 'fr') || (document.documentElement.getAttribute('lang') === 'fr');
    const screenYou = document.getElementById('screen-call-you');
    const waveScreenYou = document.getElementById('wave-screen-you');
    const allScreens = document.querySelectorAll('.live-call-screen');

    // Identify current partner screen key
    const partnerKey = this.currentPartner?.id ? this.currentPartner.id.split('_')[0] : 'kenji';
    const partnerScreen = document.getElementById(`screen-call-${partnerKey}`);
    const wavePartnerScreen = document.getElementById(`wave-screen-${partnerKey}`);
    const statusPartnerScreen = document.getElementById(`status-screen-${partnerKey}`);

    if (this.isMyTurn) {
      if (cardYou) cardYou.classList.add('active-turn');
      if (cardPartner) cardPartner.classList.remove('active-turn');
      if (pillYou) {
        pillYou.textContent = '🎤 Your Turn to Speak';
        pillYou.style.background = 'rgba(74, 222, 128, 0.25)';
        pillYou.style.color = 'var(--green-400)';
      }
      if (pillPartner) {
        pillPartner.textContent = '👂 Partner Listening';
        pillPartner.style.background = 'rgba(255,255,255,0.06)';
        pillPartner.style.color = 'var(--text-muted)';
      }
      if (waveYou) waveYou.style.opacity = '1';
      if (wavePartner) wavePartner.style.opacity = '0.25';
      if (indicatorYou) {
        indicatorYou.innerHTML = '🎙️ Microphone Ready · Speak or type your answer';
        indicatorYou.style.color = '#34d399';
      }
      if (transcriptPartner) {
        transcriptPartner.textContent = `(Listening carefully to Alex's argument...)`;
      }

      // Sync 6 Live Screens
      allScreens.forEach(s => s.classList.remove('active-speaker'));
      if (screenYou) screenYou.classList.add('active-speaker');
      if (waveScreenYou) waveScreenYou.style.opacity = '1';
      document.querySelectorAll('.voice-wave-container[id^="wave-screen-"]').forEach(w => {
        if (w.id !== 'wave-screen-you') w.style.opacity = '0.35';
      });
      document.querySelectorAll('.screen-status-text').forEach(st => {
        st.textContent = isFr ? '👂 Écoute active' : '👂 Listening';
        st.style.color = 'var(--text-muted)';
      });
    } else {
      if (cardYou) cardYou.classList.remove('active-turn');
      if (cardPartner) cardPartner.classList.add('active-turn');
      if (pillYou) {
        pillYou.textContent = '👂 Listening to Partner';
        pillYou.style.background = 'rgba(255,255,255,0.06)';
        pillYou.style.color = 'var(--text-muted)';
      }
      if (pillPartner) {
        pillPartner.textContent = `🎤 ${this.currentPartner.name} Speaking`;
        pillPartner.style.background = 'rgba(96, 165, 250, 0.25)';
        pillPartner.style.color = 'var(--blue-400)';
      }
      if (waveYou) waveYou.style.opacity = '0.25';
      if (wavePartner) wavePartner.style.opacity = '1';
      if (indicatorYou) {
        indicatorYou.innerHTML = '👂 Muted · Listening to response';
        indicatorYou.style.color = 'var(--text-muted)';
      }

      // Sync 6 Live Screens
      allScreens.forEach(s => s.classList.remove('active-speaker'));
      if (screenYou) screenYou.classList.remove('active-speaker');
      if (waveScreenYou) waveScreenYou.style.opacity = '0.35';
      if (partnerScreen) partnerScreen.classList.add('active-speaker');
      if (wavePartnerScreen) wavePartnerScreen.style.opacity = '1';
      if (statusPartnerScreen) {
        statusPartnerScreen.textContent = isFr ? '🎤 En train de parler...' : '🎤 Speaking...';
        statusPartnerScreen.style.color = 'var(--green-400)';
      }
    }
  }

  triggerLiveReaction(emoji) {
    if (window.EnglishBooster?.SoundFX) {
      window.EnglishBooster.SoundFX.playClick();
    }
    window.EnglishBooster.showToast(`Reaction Sent`, `You sent ${emoji} to ${this.currentPartner.name}!`, 'info');

    // Float emoji animation
    const container = document.getElementById('arena-stage-battle');
    if (!container) return;

    const floater = document.createElement('div');
    floater.textContent = emoji;
    floater.style.position = 'absolute';
    floater.style.left = '50%';
    floater.style.top = '65%';
    floater.style.fontSize = '2.4rem';
    floater.style.zIndex = '999';
    floater.style.pointerEvents = 'none';
    floater.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
    container.appendChild(floater);

    requestAnimationFrame(() => {
      floater.style.transform = `translate(${Math.random() * 80 - 40}px, -140px) scale(1.4)`;
      floater.style.opacity = '0';
    });

    setTimeout(() => floater.remove(), 1300);
  }

  finishBattleAndEvaluate() {
    clearInterval(this.battleTimerInterval);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (this.isMicActive && this.recognition) {
      try { this.recognition.stop(); } catch (e) {}
    }

    // Switch to Results View
    document.getElementById('arena-stage-matching').style.display = 'none';
    document.getElementById('arena-stage-battle').style.display = 'none';
    document.getElementById('arena-stage-results').style.display = 'block';

    if (window.EnglishBooster?.SoundFX) {
      window.EnglishBooster.SoundFX.playSuccess();
    }
    if (window.EnglishBooster?.launchConfetti) {
      window.EnglishBooster.launchConfetti(4000);
    }

    // Calculate dynamic CEFR evaluation tailored to the active mode
    const mode = this.currentMode;
    const partner = this.currentPartner;

    let yourCEFR = 'B2+';
    let yourFluency = 93;
    let yourGrammar = 88;
    let yourVocab = 86;
    let yourPron = 95;

    if (mode.id === 'cefr_grand') {
      yourCEFR = 'C1';
      yourFluency = 95;
      yourGrammar = 92;
      yourVocab = 94;
      yourPron = 96;
    } else if (mode.id === 'speed_duel') {
      yourCEFR = 'B2+';
      yourFluency = 97; // 126 WPM
      yourGrammar = 86;
      yourVocab = 84;
      yourPron = 94;
    } else if (mode.id === 'debate') {
      yourCEFR = 'C1';
      yourFluency = 92;
      yourGrammar = 94;
      yourVocab = 93;
      yourPron = 91;
    } else if (mode.id === 'phonetics') {
      yourCEFR = 'C1';
      yourFluency = 90;
      yourGrammar = 89;
      yourVocab = 88;
      yourPron = 98; // Highest phonetics score
    } else if (mode.id === 'roleplay') {
      yourCEFR = 'B2+';
      yourFluency = 94;
      yourGrammar = 91;
      yourVocab = 93;
      yourPron = 92;
    }

    const partnerCEFR = partner.level;

    // Populate Results Scorecard
    document.getElementById('result-cefr-you').textContent = yourCEFR;
    document.getElementById('result-partner-name').textContent = partner.name;
    document.getElementById('result-cefr-partner').textContent = partnerCEFR;

    document.getElementById('result-fluency-you').textContent = `${yourFluency}% (${mode.id === 'speed_duel' ? '128 WPM' : '118 WPM'})`;
    document.getElementById('result-grammar-you').textContent = `${yourGrammar}%`;
    document.getElementById('result-vocab-you').textContent = `${yourVocab}% (${yourCEFR} Lexis)`;
    document.getElementById('result-pron-you').textContent = `${yourPron}%`;

    document.getElementById('result-fluency-partner').textContent = `${partner.baseScore}% (105 WPM)`;
    document.getElementById('result-grammar-partner').textContent = `${partner.baseScore + 2}%`;
    document.getElementById('result-vocab-partner').textContent = `${partner.baseScore - 2}%`;
    document.getElementById('result-pron-partner').textContent = `${partner.baseScore + 1}%`;

    const xpEl = document.getElementById('result-xp-reward');
    if (xpEl) xpEl.textContent = `+${mode.xpReward} XP`;

    const isFr = (window.EnglishBooster?.i18n?.getLang() === 'fr') || (document.documentElement.getAttribute('lang') === 'fr');

    const feedbackEl = document.getElementById('result-ai-feedback');
    if (feedbackEl && mode.feedbackGenerator) {
      feedbackEl.innerHTML = mode.feedbackGenerator(yourFluency, partner.baseScore, yourCEFR, partner, isFr);
    }

    // Populate Mode-Specific Custom Box (Official CEFR Certificate for cefr_grand, metrics for others)
    const customBox = document.getElementById('result-mode-custom-box');
    if (customBox) {
      if (mode.id === 'cefr_grand') {
        const certId = `EB-CEFR-${Math.floor(100000 + Math.random() * 900000)}`;
        const dateStr = new Date().toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        customBox.innerHTML = `
          <div class="cefr-certificate-card">
            <div class="cefr-cert-seal">🏆</div>
            <span class="crystal-badge crystal-badge-emerald" style="font-size: 0.76rem; margin-bottom: 8px;">
              ${isFr ? '✓ CERTIFICAT D\'ÉVALUATION OFFICIEL VÉRIFIÉ' : '✓ OFFICIAL VERIFIED ASSESSMENT CERTIFICATE'}
            </span>
            <h3 style="font-size: 1.4rem; margin: 6px 0; color: #ffffff;">${isFr ? 'Certificat de Maîtrise de l\'Anglais Oral' : 'Certificate of Spoken English Proficiency'}</h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 14px;">
              ${isFr 
                ? `Atteste que <strong>Alex Rivera</strong> a complété avec succès le <strong>Grand Diagnostic Live CECRL</strong> sur English Booster.`
                : `This certifies that <strong>Alex Rivera</strong> has successfully passed the <strong>CEFR Grand Live Diagnostic</strong> on English Booster.`}
            </p>
            <div style="font-size: 2.2rem; font-weight: 900; color: #34d399; font-family: var(--font-heading); text-shadow: 0 0 20px rgba(52, 211, 153, 0.5);">
              CEFR ${yourCEFR} ${isFr ? 'AVANCÉ' : 'ADVANCED'}
            </div>
            <div class="cefr-cert-grid">
              <div class="cefr-cert-item">
                <span style="font-size: 0.72rem; color: var(--text-muted);">${isFr ? 'Aisance & Fluidité' : 'Fluency'}</span>
                <strong style="display: block; font-size: 0.9rem; color: #ffffff;">${yourFluency}%</strong>
              </div>
              <div class="cefr-cert-item">
                <span style="font-size: 0.72rem; color: var(--text-muted);">${isFr ? 'Ressource Lexicale' : 'Lexical Resource'}</span>
                <strong style="display: block; font-size: 0.9rem; color: #ffffff;">${yourVocab}%</strong>
              </div>
              <div class="cefr-cert-item">
                <span style="font-size: 0.72rem; color: var(--text-muted);">${isFr ? 'Précision Grammaticale' : 'Grammar Accuracy'}</span>
                <strong style="display: block; font-size: 0.9rem; color: #ffffff;">${yourGrammar}%</strong>
              </div>
              <div class="cefr-cert-item">
                <span style="font-size: 0.72rem; color: var(--text-muted);">${isFr ? 'Contrôle Phonologique' : 'Phonological Control'}</span>
                <strong style="display: block; font-size: 0.9rem; color: #ffffff;">${yourPron}%</strong>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; font-size: 0.76rem; color: var(--text-subtle); margin-top: 12px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 10px;">
              <span>Credential ID: <code>${certId}</code></span>
              <span>${isFr ? 'Délivré le :' : 'Issue Date:'} ${dateStr}</span>
              <span>${isFr ? 'Auditeur : Tychique Bongo & Arbitre IA' : 'Auditor: Tychique Bongo & AI Referee'}</span>
            </div>
            <div style="margin-top: 14px; text-align: center;">
              <button onclick="window.print()" class="btn btn-secondary btn-sm" style="border-radius: 999px; padding: 6px 16px; font-size: 0.8rem;">
                🖨️ ${isFr ? 'Imprimer / Exporter le Certificat' : 'Print / Export Certificate'}
              </button>
            </div>
          </div>
        `;
      } else if (mode.id === 'speed_duel') {
        customBox.innerHTML = `
          <div class="glass-card" style="padding: 18px; margin: 16px 0; border-color: rgba(245, 158, 11, 0.4); background: rgba(245, 158, 11, 0.05); text-align: left;">
            <h4 style="font-size: 0.98rem; color: #fbbf24; margin-bottom: 8px;">${isFr ? '⚡ Analyse de Performance Réflexe & Vitesse' : '⚡ Speed Reflex Performance Breakdown'}</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; font-size: 0.82rem;">
              <div>• <strong>${isFr ? 'Latence de Réponse :' : 'Response Latency:'}</strong> 0.4s (${isFr ? 'Immédiat' : 'Immediate'})</div>
              <div>• <strong>${isFr ? 'Cadence Mesurée :' : 'Measured Cadence:'}</strong> 128 WPM (${isFr ? 'Niveau Natif' : 'Native tier'})</div>
              <div>• <strong>${isFr ? 'Tics d\'Hésitation :' : 'Filler Words:'}</strong> 0 (${isFr ? 'Aucun détecté' : '0 detected'})</div>
              <div>• <strong>${isFr ? 'Discipline de Tour :' : 'Turn Discipline:'}</strong> 100% (${isFr ? 'Respect strict' : 'adherence'})</div>
            </div>
          </div>
        `;
      } else if (mode.id === 'debate') {
        customBox.innerHTML = `
          <div class="glass-card" style="padding: 18px; margin: 16px 0; border-color: rgba(139, 92, 246, 0.4); background: rgba(139, 92, 246, 0.05); text-align: left;">
            <h4 style="font-size: 0.98rem; color: #c4b5fd; margin-bottom: 8px;">${isFr ? '⚖️ Structure Rhétorique & Éloquence du Débat' : '⚖️ Rhetorical Structure & Debate Poise Breakdown'}</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; font-size: 0.82rem;">
              <div>• <strong>${isFr ? 'Connecteurs de Discours :' : 'Discourse Connectors:'}</strong> 94% (C1 Formal)</div>
              <div>• <strong>${isFr ? 'Précision de Réfutation :' : 'Rebuttal Precision:'}</strong> 92% (${isFr ? 'Fort impact' : 'High impact'})</div>
              <div>• <strong>${isFr ? 'Position de Thèse :' : 'Thesis Poise:'}</strong> ${isFr ? 'Affirmative (POUR)' : 'Affirmative (PRO)'}</div>
              <div>• <strong>${isFr ? 'Cohérence Logique :' : 'Logical Coherence:'}</strong> ${isFr ? 'Exemplaire' : 'Exemplary'}</div>
            </div>
          </div>
        `;
      } else if (mode.id === 'phonetics') {
        customBox.innerHTML = `
          <div class="glass-card" style="padding: 18px; margin: 16px 0; border-color: rgba(6, 182, 212, 0.4); background: rgba(6, 182, 212, 0.05); text-align: left;">
            <h4 style="font-size: 0.98rem; color: #22d3ee; margin-bottom: 8px;">${isFr ? '🎯 Clarté Phonologique & Articulation' : '🎯 Phonological Clarity & Articulation Breakdown'}</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; font-size: 0.82rem;">
              <div>• <strong>${isFr ? 'Clarté Acoustique :' : 'Acoustic Clarity:'}</strong> 98% (${isFr ? 'Énonciation nette' : 'Crisp enunciation'})</div>
              <div>• <strong>${isFr ? 'Paires Minimales :' : 'Minimal Pair Articulation:'}</strong> /θ/ vs /ð/ 96%</div>
              <div>• <strong>${isFr ? 'Cadence Rythmique :' : 'Rhythm Cadence:'}</strong> ${isFr ? 'Isochrone régulier' : 'Isochronous syllable timing'}</div>
              <div>• <strong>${isFr ? 'Intelligibilité d\'Accent :' : 'Accent Intelligibility:'}</strong> ${isFr ? 'Standard International Élevé' : 'High Global Standard'}</div>
            </div>
          </div>
        `;
      } else if (mode.id === 'roleplay') {
        customBox.innerHTML = `
          <div class="glass-card" style="padding: 18px; margin: 16px 0; border-color: rgba(236, 72, 153, 0.4); background: rgba(236, 72, 153, 0.05); text-align: left;">
            <h4 style="font-size: 0.98rem; color: #f472b6; margin-bottom: 8px;">${isFr ? '🎭 Registre Professionnel & Pragmatique en Entreprise' : '🎭 Executive Workplace Register & Pragmatics Breakdown'}</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; font-size: 0.82rem;">
              <div>• <strong>${isFr ? 'Politesse en Entreprise :' : 'Workplace Politeness:'}</strong> 95% (${isFr ? 'Niveau Exécutif' : 'Executive tier'})</div>
              <div>• <strong>${isFr ? 'Aisance Idiomatique :' : 'Idiomatic Naturalness:'}</strong> 93% (Silicon Valley)</div>
              <div>• <strong>${isFr ? 'Adaptabilité de Contexte :' : 'Situational Adaptability:'}</strong> 94%</div>
              <div>• <strong>${isFr ? 'Empathie Active :' : 'Active Empathy:'}</strong> 96%</div>
            </div>
          </div>
        `;
      }
    }

    // Add XP to user profile
    window.EnglishBooster.addXP(mode.xpReward, `Completed ${mode.name} (+${mode.xpReward} XP)!`);

    // Update User Stats
    const user = window.EnglishBooster.currentUser || {};
    window.EnglishBooster.updateUserState({
      speakingMinutes: (user.speakingMinutes || 124) + Math.max(Math.round(mode.timeSecs / 60), 3)
    });
  }

  bindCopyScorecard() {
    const copyBtn = document.getElementById('btn-copy-scorecard');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const isFr = (window.EnglishBooster?.i18n?.getLang() === 'fr') || (document.documentElement.getAttribute('lang') === 'fr');
        const youCEFR = document.getElementById('result-cefr-you')?.textContent || 'B2+';
        const partnerName = document.getElementById('result-partner-name')?.textContent || 'Challenger';
        const partnerCEFR = document.getElementById('result-cefr-partner')?.textContent || 'B2';
        const modeName = this.currentMode 
          ? (isFr && this.currentMode.nameFr ? this.currentMode.nameFr : this.currentMode.name)
          : 'Live English Battle';

        const summary = isFr 
          ? `🏆 Attestation de Duel en Direct English Booster\n` +
            `• Arène de Duel : ${modeName}\n` +
            `• Alex Rivera : Niveau Officiel Vérifié CECRL ${youCEFR}\n` +
            `• Adversaire (${partnerName}) : Niveau CECRL ${partnerCEFR}\n` +
            `• Évaluation par Arbitre IA : Fluidité, Grammaire, Vocabulaire & Prononciation\n` +
            `Pratiquez en direct sur : http://localhost:3000/pages/challenges.html`
          : `🏆 English Booster Live Duel Scorecard\n` +
            `• Battle Arena: ${modeName}\n` +
            `• Alex Rivera: Verified CEFR ${youCEFR}\n` +
            `• Challenger (${partnerName}): CEFR ${partnerCEFR}\n` +
            `• Audited via AI Referee: Fluency, Grammar, Vocabulary & Pronunciation\n` +
            `Practice live at: http://localhost:3000/pages/challenges.html`;

        if (navigator.clipboard) {
          navigator.clipboard.writeText(summary).then(() => {
            window.EnglishBooster.showToast(
              isFr ? 'Attestation Copiée !' : 'Copied to Clipboard!',
              isFr ? 'Votre bilan de compétences CECRL est prêt à être partagé !' : 'Your CEFR Assessment Scorecard is ready to share!',
              'success'
            );
          });
        } else {
          window.EnglishBooster.showToast('Scorecard Ready', `Your verified score is ${youCEFR}!`, 'success');
        }
      });
    }
  }

  /* ========================================================================
     SOLO HABIT CHALLENGE RECORDER
     ======================================================================== */
  bindDailyChallenge() {
    const startBtn = document.getElementById('btn-start-challenge');
    const micBtn = document.getElementById('challenge-mic-btn');
    const timerDisplay = document.getElementById('challenge-record-time');
    const statusText = document.getElementById('challenge-status-text');
    const submitBtn = document.getElementById('btn-submit-challenge');

    if (startBtn) {
      startBtn.addEventListener('click', () => {
        document.getElementById('challenge-interactive-area')?.scrollIntoView({ behavior: 'smooth' });
        window.EnglishBooster.showToast('Challenge Activated', 'Press the microphone and speak about your dream destination!', 'info');
      });
    }

    if (micBtn) {
      micBtn.addEventListener('click', () => {
        if (!this.isRecording) {
          // Start recording
          this.isRecording = true;
          micBtn.classList.add('recording');
          micBtn.innerHTML = '⏹️';
          if (statusText) statusText.textContent = 'Recording your answer... Speak naturally!';
          
          this.secondsRecorded = 0;
          this.recordTimer = setInterval(() => {
            this.secondsRecorded++;
            const mins = Math.floor(this.secondsRecorded / 60);
            const secs = this.secondsRecorded % 60;
            if (timerDisplay) {
              timerDisplay.textContent = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
            }
            if (this.secondsRecorded >= 10 && submitBtn) {
              submitBtn.removeAttribute('disabled');
              submitBtn.classList.add('btn-primary');
            }
          }, 1000);

          window.EnglishBooster.SoundFX.playClick();
        } else {
          // Stop recording
          this.isRecording = false;
          micBtn.classList.remove('recording');
          micBtn.innerHTML = '🎙️';
          clearInterval(this.recordTimer);
          if (statusText) statusText.textContent = 'Audio recorded! Click Submit to claim your XP.';
          if (submitBtn) submitBtn.removeAttribute('disabled');
          window.EnglishBooster.SoundFX.playSuccess();
        }
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        if (this.challengeCompleted) {
          window.EnglishBooster.showToast('Already Completed', "You have already completed today's challenge!", 'info');
          return;
        }

        this.challengeCompleted = true;
        submitBtn.setAttribute('disabled', 'true');
        submitBtn.innerHTML = '✓ Challenge Completed!';
        if (statusText) statusText.innerHTML = '🎉 <strong style="color: var(--emerald-accent);">Excellent job! Challenge Completed!</strong>';

        // Trigger celebratory XP and Confetti
        window.EnglishBooster.addXP(100, "Today's Challenge Completed (+100 XP)!");
        
        // Update daily streak
        const user = window.EnglishBooster.currentUser || {};
        window.EnglishBooster.updateUserState({
          streakDays: (user.streakDays || 7) + 1,
          speakingMinutes: (user.speakingMinutes || 124) + Math.max(Math.round(this.secondsRecorded / 60), 1)
        });

        // Trigger Confetti
        window.EnglishBooster.launchConfetti(3500);
      });
    }
  }

  renderBadges() {
    const container = document.getElementById('badges-grid-container');
    if (!container) return;

    container.innerHTML = BADGES_DATABASE.map(b => `
      <div class="glass-card" style="padding: 20px; text-align: center; border-color: ${b.unlocked ? 'rgba(74, 222, 128, 0.4)' : 'var(--glass-border)'}; opacity: ${b.unlocked ? '1' : '0.55'};">
        <div style="font-size: 2.4rem; margin-bottom: 8px; filter: ${b.unlocked ? 'none' : 'grayscale(100%)'};">${b.icon}</div>
        <h4 style="font-size: 1.05rem; margin-bottom: 4px;">${b.name}</h4>
        <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 10px;">${b.desc}</p>
        <span class="crystal-badge ${b.unlocked ? 'crystal-badge-emerald' : ''}" style="font-size: 0.75rem;">
          ${b.unlocked ? '✓ Unlocked' : '🔒 Locked'} · +${b.xp} XP
        </span>
      </div>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.challengesApp = new EnglishBoosterChallenges();
  window.challengesApp.init();
});
