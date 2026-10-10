/**
 * ENGLISH BOOSTER — WATCH VIDEOS, SHORTS ENGINE & LIVE VIDEO STUDIO (js/watchShorts.js)
 * Permet aux membres inscrits :
 * 1. De visionner des capsules vidéos au format vertical (9:16)
 * 2. De publier leur propre vidéo Short (upload MP4/WebM ou enregistrement caméra) avec règle stricte : 100% EN ANGLAIS UNIQUEMENT
 * 3. De lancer ou rejoindre une vidéo en DIRECT (Live Broadcast Studio avec webcam, micro, partage d'écran, chat et réactions)
 */

(function () {
  'use strict';

  // Helper pour résoudre les chemins relatifs des assets selon la page active
  function getAssetPath(path) {
    if (!path) return '';
    if (path.startsWith('data:') || path.startsWith('blob:') || path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    const inPages = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
    const clean = path.replace(/^(\.\.\/)+/, '');
    return inPages ? '../' + clean : clean;
  }

  // Liste initiale des vidéos Shorts publiées par des membres inscrits
  // Liste initiale des vidéos de Masterclasses Exécutives publiées par des membres inscrits (Format Pro & Fiches de Synthèse)
  const DEFAULT_SHORTS = [
    {
      id: 'short_1',
      author: {
        id: 'sarah_uk',
        name: 'Sarah Jenkins',
        flag: '🇬🇧',
        avatar: 'assets/images/executive-boardroom-briefing.jpg',
        level: 'C2',
        role: 'Senior VP Global Tech Strategy'
      },
      title: 'Handling Tough Boardroom Pushback with Executive Poise 🏛️',
      category: 'leadership',
      duration: '0:52',
      views: '38.4K',
      mediaUrl: 'assets/images/executive-boardroom-briefing.jpg',
      mediaType: 'image',
      likes: 2410,
      dislikes: 14,
      userReaction: null,
      captions: "When board directors challenge your roadmap, never become defensive. Acknowledge the fiduciary concern: 'That is a critical downside risk. Here is how our operational hedging strategy insulates the enterprise.'",
      executiveDossier: {
        framework: '3-Step Boardroom Pivot (Acknowledge, Anchor, Re-frame)',
        levelBadge: 'CEFR C2 · Boardroom Executive',
        takeaways: [
          "Never counter emotionally: begin with 'That is a critical fiduciary consideration.'",
          "Re-anchor to empirical runway, risk mitigation models, and stakeholder consensus.",
          "Close with forward-looking alignment: 'Does this strategic mitigation provide the committee sufficient comfort?'"
        ],
        lexicon: [
          { phrase: "fiduciary consideration", note: "Formal boardroom term for executive and financial stewardship" },
          { phrase: "operational hedging strategy", note: "Proactive measures mitigating downside operational risk" },
          { phrase: "insulate the enterprise", note: "Shielding company revenue and reputation against external shocks" }
        ],
        practiceSentence: "That is a critical downside risk. Here is how our operational hedging strategy insulates the enterprise."
      },
      tags: ['#BoardroomLeadership', '#ExecutivePresence', '#C2English', '#CorporateStrategy'],
      date: 'Aujourd\'hui',
      isEnglishOnly: true,
      comments: [
        {
          id: 'sc1_1',
          name: 'Alex Rivera',
          flag: '🇪🇸',
          avatar: 'assets/avatars/alex.jpg',
          text: 'Using "insulate the enterprise" completely elevated my tone during our quarterly steering committee!',
          time: 'Il y a 1h'
        },
        {
          id: 'sc1_2',
          name: 'David Müller',
          flag: '🇩🇪',
          avatar: 'assets/avatars/lucas.jpg',
          text: 'Essential advice for technical leads speaking to non-technical executive boards.',
          time: 'Il y a 45m'
        }
      ]
    },
    {
      id: 'short_2',
      author: {
        id: 'kenji_jp',
        name: 'Kenji Sato',
        flag: '🇯🇵',
        avatar: 'assets/avatars/kenji.jpg',
        level: 'C1',
        role: 'AI Co-Founder & Systems Lead'
      },
      title: 'The 45s VC Elevator Pitch: Framing ARR & Net Retention to Investors ⚡',
      category: 'pitch',
      duration: '0:45',
      views: '34.1K',
      mediaUrl: 'assets/images/short-tech-pitch.jpg',
      mediaType: 'image',
      likes: 1954,
      dislikes: 11,
      userReaction: null,
      captions: "Investors don't want buzzwords; they want defensible unit economics. Open with your inflection point: 'Our enterprise AI pipeline reached 140% Net Revenue Retention, generating a $3.2M ARR expansion with zero customer churn.'",
      executiveDossier: {
        framework: 'Tier-1 VC 3-Part Hook (Inflection, Economics, Syndicate)',
        levelBadge: 'CEFR C1 · Silicon Valley Tech',
        takeaways: [
          "State market inflection point and technological catalyst in the first 8 seconds.",
          "Quantify defensible unit economics: Net Revenue Retention (NRR) and ARR trajectory.",
          "State round syndication terms with confident brevity without apologetic tone."
        ],
        lexicon: [
          { phrase: "defensible unit economics", note: "Sustainable financial metrics that competitors cannot easily copy" },
          { phrase: "Net Revenue Retention (NRR)", note: "Core SaaS metric demonstrating revenue growth from existing clients" },
          { phrase: "inflection point", note: "Moment of undeniable market acceleration creating venture opportunity" }
        ],
        practiceSentence: "Our enterprise AI pipeline reached 140% Net Revenue Retention, generating a $3.2M ARR expansion with zero customer churn."
      },
      tags: ['#ElevatorPitch', '#VentureCapital', '#TechLeadership', '#SiliconValleyPrep'],
      date: 'Hier',
      isEnglishOnly: true,
      comments: [
        {
          id: 'sc2_1',
          name: 'Sarah Jenkins',
          flag: '🇬🇧',
          avatar: 'assets/images/executive-boardroom-briefing.jpg',
          text: 'Clear, crisp, zero fluff. This is the exact cadence London and Valley investors look for.',
          time: 'Il y a 2h'
        }
      ]
    },
    {
      id: 'short_3',
      author: {
        id: 'tychique_bongo',
        name: 'Tychique Bongo',
        flag: '🇨🇮',
        avatar: 'assets/images/tychique-bongo.jpg',
        level: 'C2',
        role: 'Fondateur & Global Executive Coach'
      },
      title: 'Cross-Border Contract Negotiations: The Art of Reciprocal Concessions 📈',
      category: 'negotiation',
      duration: '0:58',
      views: '42.6K',
      mediaUrl: 'assets/images/executive-negotiation-deal.jpg',
      mediaType: 'image',
      likes: 3120,
      dislikes: 18,
      userReaction: null,
      captions: "Never concede unilaterally in international deal-making. Always attach a reciprocal condition: 'We can accommodate your accelerated rollout milestone, provided payment milestones shift to Net-15 terms.'",
      executiveDossier: {
        framework: 'Reciprocal Deal Covenant (Give & Gain Principle)',
        levelBadge: 'CEFR C2 · Strategic Deal-Making',
        takeaways: [
          "Never make unilateral concessions: always bridge with 'provided that' or 'on the condition that'.",
          "Maintain cordial executive poise and comfortable silence during price tension.",
          "Use calibrated questions: 'How does this structure facilitate your procurement cycle?'"
        ],
        lexicon: [
          { phrase: "reciprocal concession", note: "Yielding ground only when opposing side grants an equivalent commercial advantage" },
          { phrase: "Net-15 terms", note: "Contractual payment schedule due within 15 calendar days" },
          { phrase: "calibrated question", note: "Strategic open-ended inquiry guiding stakeholders toward collaborative solutions" }
        ],
        practiceSentence: "We can accommodate your accelerated rollout milestone, provided payment milestones shift to Net-15 terms."
      },
      tags: ['#ContractNegotiation', '#ExecutiveEnglish', '#DealMaking', '#EnglishBooster'],
      date: 'Il y a 2 jours',
      isEnglishOnly: true,
      comments: [
        {
          id: 'sc3_1',
          name: 'Amara Okafor',
          flag: '🇳🇬',
          avatar: 'assets/avatars/amara.jpg',
          text: 'The "provided that" bridge saved our enterprise contract negotiations last month. Masterclass!',
          time: 'Il y a 1 jour'
        }
      ]
    },
    {
      id: 'short_4',
      author: {
        id: 'amara_sn',
        name: 'Amara Okafor',
        flag: '🇳🇬',
        avatar: 'assets/avatars/amara.jpg',
        level: 'C1',
        role: 'Global VP Human Capital & Culture'
      },
      title: 'Mastering the Anglo-American "Soft No" in Cross-Functional Teams 🤝',
      category: 'pragmatics',
      duration: '0:42',
      views: '31.9K',
      mediaUrl: 'assets/images/conversation-business.jpg',
      mediaType: 'image',
      likes: 2180,
      dislikes: 12,
      userReaction: null,
      captions: "In UK and US corporate circles, a blunt 'No' sounds antagonistic. Frame your boundary constructively: 'I would love to champion this initiative in Q3, but our current engineering bandwidth is fully committed to the security audit.'",
      executiveDossier: {
        framework: 'Diplomatic Boundary Matrix (Validate, Pivot, Defer)',
        levelBadge: 'CEFR C1 · Corporate Pragmatics',
        takeaways: [
          "Replace 'We cannot do this' with 'Our current bandwidth is committed to our core deliverables.'",
          "Validate the strategic merit of the request before outlining bandwidth boundaries.",
          "Provide actionable timelines and roadmap deferrals instead of conversational dead-ends."
        ],
        lexicon: [
          { phrase: "bandwidth constraint", note: "Corporate euphemism for lack of team capacity, time, or head-count" },
          { phrase: "champion the initiative", note: "To actively advocate, sponsor, and lead a project across the company" },
          { phrase: "constructive boundary", note: "Diplomatically safeguarding team workload while preserving stakeholder trust" }
        ],
        practiceSentence: "I would love to champion this initiative in Q3, but our current engineering bandwidth is fully committed to the security audit."
      },
      tags: ['#CorporatePragmatics', '#BusinessEtiquette', '#ExecutiveEnglish', '#Leadership'],
      date: 'Il y a 3 jours',
      isEnglishOnly: true,
      comments: [
        {
          id: 'sc4_1',
          name: 'Chloé Dubois',
          flag: '🇫🇷',
          avatar: 'assets/avatars/chloe.jpg',
          text: 'This subtle cultural distinction between French directness and Anglo diplomacy is so critical!',
          time: 'Il y a 2 jours'
        }
      ]
    },
    {
      id: 'short_5',
      author: {
        id: 'liam_ie',
        name: "Liam O'Connor",
        flag: '🇮🇪',
        avatar: 'assets/images/conversation-mentor.jpg',
        level: 'C2',
        role: 'Keynote Speaker & Communication Coach'
      },
      title: 'The 3-Second Executive Hook: Opening Global Keynotes with Authority 🎤',
      category: 'keynote',
      duration: '0:48',
      views: '25.7K',
      mediaUrl: 'assets/images/short-idiom-debate.jpg',
      mediaType: 'image',
      likes: 1890,
      dislikes: 10,
      userReaction: null,
      captions: "Stop starting your speeches with 'Good morning everyone, I am thrilled to be here.' Command the room instantly: hold silence for 2 seconds, look at the back row, and open with a bold contrarian premise.",
      executiveDossier: {
        framework: 'The 3-Second Contrarian Opener (Silence, Eye Anchor, Hook)',
        levelBadge: 'CEFR C2 · Global Keynotes',
        takeaways: [
          "Eliminate generic pleasantries that waste the most valuable 10 seconds of audience attention.",
          "Breathe diaphragmatically into the lower ribs to project natural vocal resonance and calm gravitas.",
          "Open with a sharp counter-intuitive premise: 'Conventional wisdom suggests X, but data proves Y.'"
        ],
        lexicon: [
          { phrase: "command the room", note: "Establishing instant authority and stage presence without aggressive volume" },
          { phrase: "contrarian premise", note: "A provocative, data-backed viewpoint that challenges industry consensus" },
          { phrase: "grounded authority", note: "Unhurried posture and resonant vocal cadence that projects natural credibility" }
        ],
        practiceSentence: "Conventional wisdom suggests cost reduction drives efficiency, but empirical data reveals that agility accelerates margins."
      },
      tags: ['#PublicSpeaking', '#KeynoteStrategy', '#ExecutivePresence', '#C2English'],
      date: 'Il y a 4 jours',
      isEnglishOnly: true,
      comments: [
        {
          id: 'sc5_1',
          name: 'Kenji Sato',
          flag: '🇯🇵',
          avatar: 'assets/avatars/kenji.jpg',
          text: 'The 2-second silence technique felt uncomfortable at first, but the audience went pin-drop quiet. Huge tip!',
          time: 'Il y a 3 jours'
        }
      ]
    },
    {
      id: 'short_6',
      author: {
        id: 'david_de',
        name: 'David Müller',
        flag: '🇩🇪',
        avatar: 'assets/avatars/lucas.jpg',
        level: 'C1',
        role: 'Principal Systems Architect & Cloud Lead'
      },
      title: 'Incident Post-Mortems: Communicating Outages to Enterprise Clients 🛠️',
      category: 'leadership',
      duration: '0:50',
      views: '21.2K',
      mediaUrl: 'assets/images/short-tychique-coach.jpg',
      mediaType: 'image',
      likes: 1540,
      dislikes: 8,
      userReaction: null,
      captions: "When enterprise systems experience downtime, technical transparency restores trust. State the facts: 'We identified a cascading failover latency at 09:14 UTC. Redundancy protocols engaged within 3 minutes to restore 100% throughput.'",
      executiveDossier: {
        framework: 'Blameless Post-Mortem Cadence (Detect, Remediate, Safeguard)',
        levelBadge: 'CEFR C1 · Tech Leadership',
        takeaways: [
          "Never assign individual blame; frame failures around architectural failure domains and system limits.",
          "State Mean Time to Recovery (MTTR) with timestamped empirical milestones.",
          "Conclude with explicit, forward-looking architectural safeguards to prevent recurrence."
        ],
        lexicon: [
          { phrase: "cascading failover latency", note: "System delay occurring during automated server switchover" },
          { phrase: "redundancy protocols", note: "Backup infrastructure engineered to maintain uptime during failures" },
          { phrase: "preventive guardrails", note: "Architectural rules that permanently eliminate recurring points of failure" }
        ],
        practiceSentence: "We identified a cascading failover latency at 09:14 UTC. Redundancy protocols engaged within 3 minutes to restore 100% throughput."
      },
      tags: ['#TechLeadership', '#IncidentResponse', '#EnterpriseArchitecture', '#C1English'],
      date: 'Il y a 5 jours',
      isEnglishOnly: true,
      comments: [
        {
          id: 'sc6_1',
          name: 'Sarah Jenkins',
          flag: '🇬🇧',
          avatar: 'assets/images/executive-boardroom-briefing.jpg',
          text: 'Enterprise CTOs appreciate nothing more than crisp, timestamped engineering candor.',
          time: 'Il y a 4 jours'
        }
      ]
    },
    {
      id: 'short_7',
      author: {
        id: 'sofia_es',
        name: 'Sofia Martínez',
        flag: '🇪🇸',
        avatar: 'assets/avatars/sofia.jpg',
        level: 'B2+',
        role: 'Corporate Communications & Voice Specialist'
      },
      title: 'Executive Vocal Cadence: Eliminating Upspeak & Rushing in High-Stakes Calls 🎯',
      category: 'phonetics',
      duration: '0:39',
      views: '29.8K',
      mediaUrl: 'assets/images/short-pronunciation-coach.jpg',
      mediaType: 'image',
      likes: 2210,
      dislikes: 11,
      userReaction: null,
      captions: "Upspeak makes executives sound uncertain. When pitching a proposal, drop your pitch at the end of the sentence: not 'We believe this is feasible?', but 'We have confirmed this is feasible.' Finish with downward authority!",
      executiveDossier: {
        framework: 'Downward Pitch Cadence & Strategic Pausing',
        levelBadge: 'CEFR B2+ · Vocal Presence',
        takeaways: [
          "Eliminate rising question inflections (upspeak) on declarative business proposals.",
          "Drop pitch on the final syllable of key strategic decisions to project executive conviction.",
          "Insert deliberate 1-second micro-pauses between clauses to avoid the appearance of rushed anxiety."
        ],
        lexicon: [
          { phrase: "downward pitch cadence", note: "Dropping vocal frequency at the end of statements to project certainty" },
          { phrase: "declarative authority", note: "Speaking with conviction rather than seeking implicit permission" },
          { phrase: "unhurried cadence", note: "Pacing speech deliberately to convey emotional regulation and executive poise" }
        ],
        practiceSentence: "We have confirmed this roadmap is feasible, and we are prepared to initiate phase one."
      },
      tags: ['#ExecutiveVoice', '#Phonetics', '#PronunciationAuthority', '#SpeakingConfidence'],
      date: 'Il y a 6 jours',
      isEnglishOnly: true,
      comments: [
        {
          id: 'sc7_1',
          name: 'Alex Rivera',
          flag: '🇪🇸',
          avatar: 'assets/avatars/alex.jpg',
          text: 'Dropping the pitch at the end of sentences made my presentations sound 10x more confident!',
          time: 'Il y a 5 jours'
        }
      ]
    },
    {
      id: 'short_8',
      author: {
        id: 'chloe_fr',
        name: 'Chloé Dubois',
        flag: '🇫🇷',
        avatar: 'assets/avatars/chloe.jpg',
        level: 'C1',
        role: 'Executive Talent & Compensation Partner'
      },
      title: 'Executive Salary Negotiation: Anchoring Leverage Around Business Impact 💼',
      category: 'negotiation',
      duration: '0:47',
      views: '36.5K',
      mediaUrl: 'assets/images/conversation-live-duo.jpg',
      mediaType: 'image',
      likes: 2740,
      dislikes: 15,
      userReaction: null,
      captions: "Never negotiate compensation around personal living expenses. Anchor around business leverage: 'Based on the $5M ARR expansion portfolio I will direct, the market benchmark for this role ranges from $180K to $210K base with equity participation.'",
      executiveDossier: {
        framework: 'The Executive Value Anchor (Portfolio, Benchmark, Equity)',
        levelBadge: 'CEFR C1 · Compensation Strategy',
        takeaways: [
          "Anchor to the top of the market benchmark before the compensation committee proposes an offer.",
          "Tie compensation directly to the scope of revenue under management and team headcount.",
          "Embrace comfortable silence after stating your compensation expectations."
        ],
        lexicon: [
          { phrase: "market benchmark", note: "Standard compensation data across peer companies in your sector" },
          { phrase: "equity participation", note: "Stock options, RSUs, or profit-sharing stakes aligned with corporate performance" },
          { phrase: "anchoring leverage", note: "Establishing the initial reference point in a high-stakes negotiation" }
        ],
        practiceSentence: "Based on the $5M expansion portfolio I will direct, the market benchmark for this role ranges from $180K to $210K base with equity participation."
      },
      tags: ['#SalaryNegotiation', '#ExecutiveCareers', '#CompensationStrategy', '#C1Business'],
      date: 'Il y a 1 semaine',
      isEnglishOnly: true,
      comments: [
        {
          id: 'sc8_1',
          name: 'Amara Okafor',
          flag: '🇳🇬',
          avatar: 'assets/avatars/amara.jpg',
          text: 'Framing salary as an investment portfolio rather than an expense is the exact mindset shift needed.',
          time: 'Il y a 6 jours'
        }
      ]
    }
  ];

  // Liste initiale des vidéos en direct (Live Streams) actives orientées Masterclasses Professionnelles
  const DEFAULT_LIVES = [
    {
      id: 'live_tychique_lead',
      host: {
        id: 'tychique_bongo',
        name: 'Tychique Bongo',
        flag: '🇨🇮',
        avatar: 'assets/images/tychique-bongo.jpg',
        level: 'C2',
        role: 'Fondateur & Lead Executive Coach'
      },
      title: 'Live Executive Workshop: C-Suite Meeting Simulation & Live Corrections 🏛️',
      category: 'leadership',
      topic: 'Executive Boardroom Simulation · C1/C2 Workplace Register & Tact',
      viewers: 68,
      duration: '22:15',
      thumb: 'assets/images/tychique-bongo.jpg',
      comments: [
        { name: 'Sarah Jenkins', flag: '🇬🇧', text: 'Terrific simulation. The diplomatic pushback drills are essential!' },
        { name: 'Kenji Sato', flag: '🇯🇵', text: 'Shadowing this executive cadence live is so valuable.' },
        { name: 'David Müller', flag: '🇩🇪', text: 'Great breakdown on handling tough steering committee questions.' }
      ]
    },
    {
      id: 'live_kenji_pitch',
      host: {
        id: 'kenji_jp',
        name: 'Kenji Sato',
        flag: '🇯🇵',
        avatar: 'assets/avatars/kenji.jpg',
        level: 'C1',
        role: 'AI Co-Founder & Tech Lead'
      },
      title: 'Live Venture Pitching Arena: 60-Second Drills for US Tech Funds ⚡',
      category: 'pitch',
      topic: 'Series A Investor Pitch Practice · Unit Economics & Rebuttal Drills',
      viewers: 45,
      duration: '14:20',
      thumb: 'assets/images/short-tech-pitch.jpg',
      comments: [
        { name: 'Amara Okafor', flag: '🇳🇬', text: 'Spot-on guidance on framing NRR metrics!' },
        { name: 'Chloé Dubois', flag: '🇫🇷', text: 'Loved the fast-paced elevator pitch drill!' }
      ]
    }
  ];

  let shortsData = [];
  let liveStreamsData = [];
  let currentActiveShort = null;
  let isSpeechPlaying = false;
  let currentFilter = 'all';
  let currentPlaybackRate = 1.0;

  // Live Studio State
  let activeLiveStreamSession = null;
  let liveMediaStream = null;
  let liveTimerInterval = null;
  let liveReactionInterval = null;
  let liveAudienceInterval = null;
  let isMicMuted = false;
  let isCamOff = false;

  // Initialisation et chargement
  function loadShorts() {
    try {
      const stored = localStorage.getItem('eb_shorts_videos_v3');
      if (stored) {
        shortsData = JSON.parse(stored);
      } else {
        shortsData = [...DEFAULT_SHORTS];
        saveShorts();
      }
    } catch (e) {
      shortsData = [...DEFAULT_SHORTS];
    }

    try {
      const storedLives = localStorage.getItem('eb_live_streams_v3');
      if (storedLives) {
        liveStreamsData = JSON.parse(storedLives);
      } else {
        liveStreamsData = [...DEFAULT_LIVES];
        saveLives();
      }
    } catch (e) {
      liveStreamsData = [...DEFAULT_LIVES];
    }
  }

  function saveShorts() {
    try {
      localStorage.setItem('eb_shorts_videos_v3', JSON.stringify(shortsData));
    } catch (e) {
      console.warn('Could not save shorts', e);
    }
  }

  function saveLives() {
    try {
      localStorage.setItem('eb_live_streams_v3', JSON.stringify(liveStreamsData));
    } catch (e) {
      console.warn('Could not save lives', e);
    }
  }

  // Récupérer les membres inscrits pour le formulaire de publication
  function getRegisteredMembers() {
    try {
      const stored = localStorage.getItem('eb_inscrits_list');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}

    return [
      { id: 'tychique_bongo', nom: 'Bongo', prenom: 'Tychique', nationalite: "Côte d'Ivoire", drapeau: '🇨🇮', level: 'C2', avatarImg: 'assets/images/tychique-bongo.jpg' },
      { id: 'alex_rivera', nom: 'Rivera', prenom: 'Alex', nationalite: 'Espagne', drapeau: '🇪🇸', level: 'B1', avatarImg: 'assets/avatars/alex.jpg' },
      { id: 'sofia_es', nom: 'Martínez', prenom: 'Sofia', nationalite: 'Espagne', drapeau: '🇪🇸', level: 'B1', avatarImg: 'assets/avatars/sofia.jpg' },
      { id: 'kenji_jp', nom: 'Sato', prenom: 'Kenji', nationalite: 'Japon', drapeau: '🇯🇵', level: 'B2', avatarImg: 'assets/avatars/kenji.jpg' },
      { id: 'amara_sn', nom: 'Okafor', prenom: 'Amara', nationalite: 'Nigéria', drapeau: '🇳🇬', level: 'C1', avatarImg: 'assets/avatars/amara.jpg' },
      { id: 'chloe_fr', nom: 'Dubois', prenom: 'Chloé', nationalite: 'France', drapeau: '🇫🇷', level: 'B2', avatarImg: 'assets/avatars/chloe.jpg' },
      { id: 'lucas_de', nom: 'Weber', prenom: 'Lucas', nationalite: 'Allemagne', drapeau: '🇩🇪', level: 'B2', avatarImg: 'assets/avatars/lucas.jpg' }
    ];
  }

  // Vérificateur linguistique pour exiger STRICTEMENT l'anglais
  function checkEnglishCompliance(title, captions) {
    const text = ((title || '') + ' ' + (captions || '')).toLowerCase();
    if (!text.trim()) {
      return { status: 'neutral', valid: false, msg: '⚠️ Saisissez votre titre et transcription en anglais pour validation.' };
    }

    // Mots-clés français courants interdits
    const frenchStopwords = [
      'bonjour', 'salut', 'merci', 'avec', 'pour', 'dans', 'sur', 'sous', 'par', 'très', 'bien',
      'je', 'suis', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles', 'mon', 'ma', 'mes',
      'ton', 'ta', 'tes', 'notre', 'nos', 'votre', 'vos', 'leur', 'leurs', 'faire', 'fait',
      'parler', 'parlez', 'apprendre', 'cours', 'vidéo', 'vidéos', 'français', 'française',
      'cette', 'cet', 'ces', 'ceci', 'cela', 'pourquoi', 'comment', 'quand', 'combien', 'aussi',
      'mais', 'donc', 'alors', 'toujours', 'jamais', 'aujourd\'hui', 'voici', 'voilà'
    ];

    const detected = [];
    frenchStopwords.forEach(word => {
      const regex = new RegExp('\\b' + word + '\\b', 'i');
      if (regex.test(text)) detected.push(word);
    });

    if (detected.length > 0) {
      const sample = detected.slice(0, 3).join(', ');
      return {
        status: 'warning',
        valid: false,
        msg: `⚠️ Détection : Des termes en français ont été repérés ("${sample}"). Le Short doit être 100% EN ANGLAIS !`
      };
    }

    // Marqueurs d'anglais acceptés
    const englishMarkers = [
      'the', 'is', 'are', 'am', 'was', 'were', 'to', 'in', 'for', 'with', 'and', 'how', 'what',
      'why', 'speak', 'speaking', 'english', 'fluency', 'pitch', 'learn', 'accent', 'pronounce',
      'idiom', 'habit', 'practice', 'today', 'great', 'daily', 'without', 'about', 'your', 'my'
    ];

    let enScore = 0;
    englishMarkers.forEach(word => {
      const regex = new RegExp('\\b' + word + '\\b', 'i');
      if (regex.test(text)) enScore++;
    });

    if (enScore >= 1 || text.length > 15) {
      return {
        status: 'valid',
        valid: true,
        msg: '🇬🇧 Conforme : Anglais certifié à 100% (Accents internationaux bienvenus) ✅'
      };
    }

    return {
      status: 'neutral',
      valid: true,
      msg: '🇬🇧 Anglais requis : assurez-vous de rédiger votre contenu exclusivement en anglais.'
    };
  }

  // Rendu de la grille des directs vidéo (Live Streams)
  function renderLiveStreams() {
    const container = document.getElementById('live-streams-grid');
    if (!container) return;

    const cardsHtml = liveStreamsData.map(live => {
      const avatarSrc = getAssetPath(live.host.avatar);
      const thumbSrc = getAssetPath(live.thumb || live.host.avatar);

      return `
        <article class="live-stream-card" data-live-id="${live.id}">
          <div class="live-stream-thumb-wrap">
            <img src="${thumbSrc}" alt="${escapeHTML(live.title)}" class="live-stream-thumb-img" loading="lazy" />
            <div class="live-stream-pill-badge">
              <span class="live-pulse-dot" style="background:#fff; width:6px; height:6px;"></span>
              <span>🔴 EN DIRECT</span>
            </div>
            <div class="live-stream-viewers-badge">
              👁️ ${live.viewers} spectateurs
            </div>
          </div>

          <div class="live-stream-body">
            <div class="live-stream-host-info">
              <img src="${avatarSrc}" alt="${escapeHTML(live.host.name)}" class="live-stream-host-avatar" />
              <div>
                <strong style="color: #fff; font-size: 0.88rem;">${escapeHTML(live.host.name)} ${live.host.flag}</strong>
                <span class="short-badge-level" style="margin-left: 6px;">${live.host.level}</span>
              </div>
            </div>

            <h3 class="live-stream-title">${escapeHTML(live.title)}</h3>
            <div class="live-stream-category-tag">🎯 ${escapeHTML(live.topic || 'English Fluency')}</div>

            <button type="button" class="btn btn-sm btn-join-live" data-live-id="${live.id}" style="margin-top: auto; width: 100%; background: linear-gradient(135deg, #ef4444, #dc2626); color: #fff; border: none; font-weight: 700; padding: 10px; border-radius: var(--radius-md); box-shadow: 0 4px 14px rgba(239, 68, 68, 0.35);">
              <span>👀</span> Rejoindre le Direct en Anglais
            </button>
          </div>
        </article>
      `;
    }).join('');

    // Carte interactive CTA "Lancer votre Direct"
    const hostCtaCard = `
      <article class="live-stream-card" style="border: 2px dashed rgba(239, 68, 68, 0.6); background: rgba(239, 68, 68, 0.05); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px;">
        <div style="font-size: 2.8rem; margin-bottom: 12px; filter: drop-shadow(0 0 12px rgba(239,68,68,0.5));">🎥</div>
        <h3 style="font-size: 1.15rem; color: #fff; margin-bottom: 8px;">Animer Votre Propre Live</h3>
        <p style="color: var(--text-muted); font-size: 0.86rem; margin-bottom: 20px; line-height: 1.45;">
          Allumez votre caméra et votre micro. Entraînez votre anglais oral avec la communauté en direct !
        </p>
        <button type="button" class="btn btn-danger btn-open-live-studio" style="padding: 10px 20px; font-weight: 800; background: linear-gradient(135deg, #ef4444, #dc2626); border-color: #ef4444; box-shadow: 0 4px 16px rgba(239, 68, 68, 0.5);">
          <span>🔴</span> Lancer mon Direct Vidéo
        </button>
      </article>
    `;

    container.innerHTML = cardsHtml + hostCtaCard;

    // Attacher écouteurs pour rejoindre les directs
    container.querySelectorAll('.btn-join-live').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const liveId = btn.getAttribute('data-live-id');
        openLiveStudio(false, liveId);
      });
    });

    container.querySelectorAll('.live-stream-card[data-live-id]').forEach(card => {
      card.addEventListener('click', () => {
        const liveId = card.getAttribute('data-live-id');
        openLiveStudio(false, liveId);
      });
    });

    // Mettre à jour le compteur de lives actifs
    const liveCountBadge = document.getElementById('live-active-count');
    if (liveCountBadge) liveCountBadge.textContent = liveStreamsData.length;
  }

  // Rendu de la grille des briefings courts (Format Pro 9:16)
  function renderShortsGrid() {
    const containers = [
      document.getElementById('shorts-grid-container'),
      document.getElementById('home-shorts-carousel')
    ];

    containers.forEach(container => {
      if (!container) return;

      const filtered = shortsData.filter(s => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'live') return false; // les lives sont affichés dans leur section dédiée
        return s.category === currentFilter;
      });

      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="glass-card" style="padding: 40px; text-align: center; grid-column: 1 / -1; width: 100%;">
            <div style="font-size: 2.5rem; margin-bottom: 12px;">💼</div>
            <h3 style="font-size: 1.25rem; margin-bottom: 8px;">Aucun briefing exécutif dans cette catégorie</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 16px;">Soyez le premier leader inscrit à publier un briefing professionnel !</p>
            <button type="button" class="btn btn-primary btn-sm btn-open-publish-short">
              <span>+</span> Publier un Briefing Exécutif (English Only)
            </button>
          </div>
        `;
        return;
      }

      container.innerHTML = filtered.map(short => {
        const isLiked = short.userReaction === 'like';
        const avatarSrc = getAssetPath(short.author.avatar);
        const mediaSrc = getAssetPath(short.mediaUrl);
        const isVideo = short.mediaType === 'video' || (short.videoUrl && short.videoUrl.length > 0);
        const dossier = short.executiveDossier || {};

        return `
          <article class="short-card" data-short-id="${short.id}">
            <div class="short-video-frame">
              ${isVideo 
                ? `<video src="${mediaSrc}" class="short-poster-img" muted playsinline loop preload="metadata"></video>` 
                : `<img src="${mediaSrc}" alt="${escapeHTML(short.title)}" class="short-poster-img" loading="lazy" />`}
              <div class="short-gradient-overlay"></div>

              <!-- Top badges -->
              <div class="short-top-bar">
                <span class="short-duration-tag">⏱️ ${short.duration}</span>
                <span class="executive-card-badge">💼 ${escapeHTML(short.author.level)} · Pro</span>
              </div>

              <!-- Central Play Button -->
              <button type="button" class="btn-play-short-hero" data-short-id="${short.id}" aria-label="Consulter le briefing ${escapeHTML(short.title)}">
                <span class="play-icon-triangle">▶</span>
              </button>

              <!-- Bottom Content Overlay -->
              <div class="short-info-overlay">
                <div class="short-author-row">
                  <div class="short-author-avatar-wrap">
                    <img src="${avatarSrc}" alt="${escapeHTML(short.author.name)}" class="short-author-avatar" />
                    <span class="short-author-flag">${short.author.flag}</span>
                  </div>
                  <div class="short-author-details">
                    <span class="short-author-name">${escapeHTML(short.author.name)}</span>
                    <span class="short-badge-level" style="font-size:0.7rem; font-weight:700;">${escapeHTML(short.author.role ? short.author.role.split('·')[0].trim() : short.author.level)}</span>
                  </div>
                </div>

                <h3 class="short-card-title">${escapeHTML(short.title)}</h3>

                ${dossier.framework ? `
                  <div class="executive-framework-pill">
                    <span>${escapeHTML(dossier.framework.split('(')[0].trim())}</span>
                  </div>
                ` : ''}

                <div class="short-meta-row" style="margin-top: 8px;">
                  <div class="short-stat-chip">👁️ ${short.views} vues</div>
                  <div class="short-stat-chip ${isLiked ? 'liked' : ''}">👍 ${short.likes}</div>
                  <div class="short-stat-chip">📁 Fiche C1-C2</div>
                </div>
              </div>
            </div>
          </article>
        `;
      }).join('');
    });

    // Mettre à jour les compteurs
    const countBadge = document.getElementById('shorts-total-count');
    if (countBadge) countBadge.textContent = shortsData.length;

    // Attacher les écouteurs sur les cartes et boutons play
    document.querySelectorAll('.short-card, .btn-play-short-hero').forEach(el => {
      el.addEventListener('click', e => {
        const id = el.getAttribute('data-short-id') || el.closest('[data-short-id]').getAttribute('data-short-id');
        if (id) openShortModal(id);
      });
    });

    // Attacher les boutons "+ Publier un Short"
    document.querySelectorAll('.btn-open-publish-short').forEach(btn => {
      btn.addEventListener('click', () => openPublishModal());
    });

    // Attacher les boutons "🔴 Faire une Vidéo en Direct"
    document.querySelectorAll('.btn-open-live-studio').forEach(btn => {
      btn.addEventListener('click', () => openLiveStudio(true));
    });

    // Rendre aussi les lives
    renderLiveStreams();
  }

  // Ouvrir le lecteur modal immersif d'un Briefing Exécutif
  function openShortModal(shortId) {
    const short = shortsData.find(s => s.id === shortId);
    if (!short) return;

    currentActiveShort = short;
    let modal = document.getElementById('shorts-viewer-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'shorts-viewer-modal';
      modal.className = 'shorts-modal-overlay';
      document.body.appendChild(modal);
    }

    const isLiked = short.userReaction === 'like';
    const isDisliked = short.userReaction === 'dislike';
    const avatarSrc = getAssetPath(short.author.avatar);
    const mediaSrc = getAssetPath(short.mediaUrl);
    const isVideo = short.mediaType === 'video' || (short.videoUrl && short.videoUrl.length > 0);
    const edits = short.creativeEdits || {};
    const hasFx = edits.effect && edits.effect !== 'none';
    const hasText = edits.text && edits.text.content && edits.text.content.trim().length > 0;
    const hasStickers = edits.stickers && edits.stickers.length > 0;

    const dossier = short.executiveDossier || {
      framework: 'Executive Communication Matrix',
      takeaways: [
        'Anchor the strategic problem statement within the first 10 seconds.',
        'Deploy calm vocal cadence with downward inflection.',
        'Transition smoothly to actionable next steps and measurable metrics.'
      ],
      lexicon: [
        { term: 'Strategic Alignment', phonetic: '/strəˈtiːdʒɪk əˈlaɪnmənt/', meaning: 'Harmonizing cross-functional priorities', collocation: 'Ensure strategic alignment across all stakeholders.' }
      ],
      practiceSentence: short.captions || 'Let us anchor our approach on measurable fundamentals.'
    };

    modal.innerHTML = `
      <div class="shorts-modal-backdrop"></div>
      <div class="shorts-modal-dialog">
        <!-- Close button avec symbole '✕' -->
        <button type="button" class="btn-close-shorts-modal" id="btn-close-viewer" title="Fermer (Échap) / Close (Esc)" aria-label="Fermer la vidéo">
          <span class="close-icon-symbol">✕</span>
        </button>

        <div class="shorts-player-layout">
          <!-- Video Vertical Player (9:16) -->
          <div class="shorts-stage-column">
            <div class="shorts-screen">
              ${isVideo 
                ? `<video src="${mediaSrc}" class="shorts-screen-bg" id="viewer-video-player" autoplay loop playsinline controls></video>` 
                : `<img src="${mediaSrc}" alt="${escapeHTML(short.title)}" class="shorts-screen-bg" />`}
              <div class="shorts-screen-gradient"></div>

              <!-- Overlays créatifs personnalisés -->
              ${hasFx ? `<div class="short-fx-layer fx-${edits.effect}"></div>` : ''}
              ${hasText ? `<div class="short-text-layer typo-${edits.text.style || 'impact'} pos-${edits.text.position || 'top'}"><span class="short-text-content" style="color:${edits.text.color || '#ffffff'}">${escapeHTML(edits.text.content)}</span></div>` : ''}
              ${hasStickers ? `<div class="short-stickers-layer" style="pointer-events:none;">${edits.stickers.map(s => `<span class="placed-sticker-badge">${s}</span>`).join('')}</div>` : ''}
              ${edits.voiceover && edits.voiceover.active ? `<div class="short-voiceover-indicator"><span>🎙️ Voix off</span></div>` : ''}

              <!-- Top Screen Bar with Speed Controller -->
              <div class="shorts-screen-top">
                <div class="shorts-channel-chip">
                  <img src="${avatarSrc}" alt="${escapeHTML(short.author.name)}" class="channel-pic" />
                  <span class="channel-name">${escapeHTML(short.author.name)} ${short.author.flag}</span>
                  <span class="badge-level-pill">${short.author.level}</span>
                </div>
                
                <div style="display:flex; align-items:center; gap:8px;">
                  <!-- Contrôleur de vitesse pro -->
                  <div class="executive-speed-bar" id="executive-speed-selector">
                    <button type="button" class="executive-speed-btn ${currentPlaybackRate === 0.75 ? 'active' : ''}" data-speed="0.75" title="Analyse Détaillée (0.75x)">0.75x</button>
                    <button type="button" class="executive-speed-btn ${currentPlaybackRate === 1.0 ? 'active' : ''}" data-speed="1.0" title="Standard Pro (1.0x)">1.0x</button>
                    <button type="button" class="executive-speed-btn ${currentPlaybackRate === 1.25 ? 'active' : ''}" data-speed="1.25" title="Cadence Rapide (1.25x)">1.25x</button>
                  </div>

                  <div class="shorts-sound-toggle" id="btn-toggle-sound" title="Activer / Désactiver la voix">
                    <span class="sound-icon">🔊</span>
                  </div>
                </div>
              </div>

              <!-- Live Captions Subtitle Box -->
              <div class="shorts-captions-box">
                <div class="captions-badge">🎙️ Transcription Exécutive (English)</div>
                <p class="captions-text">"${escapeHTML(short.captions)}"</p>
              </div>

              <!-- Floating Controls: Play / Pause center -->
              <button type="button" class="btn-screen-play-pause" id="btn-screen-play-pause" aria-label="Play / Pause">
                <span class="play-state-symbol">⏸️</span>
              </button>

              <!-- Bottom Timeline Progress -->
              <div class="shorts-timeline-track">
                <div class="shorts-timeline-bar" id="shorts-timeline-bar"></div>
              </div>
            </div>
          </div>

          <!-- Interaction Side Panel -->
          <div class="shorts-side-column">
            <!-- Header Section with Expert Identity -->
            <div class="shorts-side-header">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom: 8px;">
                <span class="crystal-badge">Briefing Exécutif C-Suite</span>
                <span class="crystal-badge crystal-badge-cyan">🇬🇧 100% English</span>
              </div>

              <div style="display:flex; align-items:center; gap:10px; margin-bottom: 10px;">
                <img src="${avatarSrc}" alt="${escapeHTML(short.author.name)}" style="width:40px; height:40px; border-radius:50%; object-fit:cover; border:2px solid #34d399;" />
                <div style="flex:1;">
                  <div style="font-weight:700; color:#fff; font-size:0.92rem; display:flex; align-items:center; gap:6px;">
                    ${escapeHTML(short.author.name)} ${short.author.flag}
                    <span class="short-badge-level">${short.author.level}</span>
                  </div>
                  <div style="font-size:0.75rem; color:var(--text-muted);">${escapeHTML(short.author.role || 'Executive Leader')}</div>
                </div>
              </div>

              <h2 class="viewer-short-title">${escapeHTML(short.title)}</h2>
              <div class="viewer-tags-row">
                ${(short.tags || []).map(t => `<span class="tag-pill">${escapeHTML(t)}</span>`).join(' ')}
              </div>
            </div>

            <!-- Professional Navigation Tabs -->
            <div class="executive-tabs-bar">
              <button type="button" class="executive-tab-btn active" id="tab-btn-dossier" data-tab="dossier">
                <span>💼</span> Dossier Exécutif & Drill
              </button>
              <button type="button" class="executive-tab-btn" id="tab-btn-comments" data-tab="comments">
                <span>💬</span> Retours de Pairs (<span id="viewer-comments-count-pill">${short.comments.length}</span>)
              </button>
            </div>

            <!-- Tab 1: Executive Dossier & Shadowing Drill -->
            <div id="tab-pane-dossier" class="executive-dossier-wrap">
              <!-- Methodological Framework -->
              <div class="executive-meta-card">
                <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 800; color: #34d399;">Cadre Méthodologique</span>
                  <span class="executive-card-badge">Niveau ${escapeHTML(short.author.level)}</span>
                </div>
                <div style="font-weight: 700; color: #ffffff; font-size: 0.94rem;">${escapeHTML(dossier.framework)}</div>
              </div>

              <!-- 3 Strategic Pillars -->
              <div class="executive-takeaways-block">
                <h4 style="font-size: 0.8rem; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px 0; display: flex; align-items: center; gap: 6px;">
                  <span>🎯</span> 3 Piliers Stratégiques Décryptés
                </h4>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${(dossier.takeaways || []).map((t, idx) => `
                    <div class="executive-takeaway-item">
                      <span class="executive-takeaway-num">0${idx + 1}</span>
                      <div style="flex: 1;">${escapeHTML(t)}</div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- C-Suite Lexicon & Collocations -->
              <div class="executive-lexicon-block">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <h4 style="font-size: 0.8rem; color: #a78bfa; text-transform: uppercase; letter-spacing: 0.05em; margin: 0; display: flex; align-items: center; gap: 6px;">
                    <span>💎</span> Collocations & Lexique C-Suite
                  </h4>
                  <span style="font-size: 0.72rem; color: var(--text-muted);">Cliquez 📋 pour copier</span>
                </div>
                <div class="executive-lexicon-grid">
                  ${(dossier.lexicon || []).map(item => {
                    const term = item.term || item.phrase || 'Executive Collocation';
                    const note = item.meaning || item.note || '';
                    const phonetic = item.phonetic ? `[${item.phonetic}]` : '';
                    const collocation = item.collocation ? `« ${item.collocation} »` : '';
                    const copyText = item.collocation ? `${term} — ${item.collocation}` : `${term} (${note})`;
                    return `
                    <div class="executive-lexicon-card">
                      <div style="flex: 1;">
                        <div class="executive-lexicon-phrase">${escapeHTML(term)} ${phonetic ? `<span style="font-size: 0.74rem; color: #94a3b8; font-weight: normal;">${escapeHTML(phonetic)}</span>` : ''}</div>
                        <div class="executive-lexicon-note"><strong>${escapeHTML(note)}</strong> ${collocation ? `· <em style="color: #e2e8f0;">${escapeHTML(collocation)}</em>` : ''}</div>
                      </div>
                      <button type="button" class="btn-copy-lexicon" data-phrase="${escapeHTML(copyText)}" title="Copier la collocation" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: #38bdf8; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 0.82rem; transition: all 0.2s ease;">
                        📋
                      </button>
                    </div>
                  `;}).join('')}
                </div>
              </div>

              <!-- Interactive Vocal Shadowing Card -->
              <div class="executive-shadowing-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <strong style="color: #c4b5fd; font-size: 0.88rem; display: flex; align-items: center; gap: 6px;">
                    <span>🎙️</span> Entraînement au Shadowing Vocal
                  </strong>
                  <span class="hud-metric-pill" style="background: rgba(139, 92, 246, 0.25); color: #c4b5fd; border-color: rgba(139, 92, 246, 0.4); font-size: 0.7rem; padding: 2px 8px;">+20 XP</span>
                </div>
                <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 8px; line-height: 1.4;">
                  Prononcez cette phrase d'impact avec cadence descendante et autorité exécutive :
                </p>
                <blockquote style="margin: 0 0 10px 0; padding: 8px 12px; background: rgba(0,0,0,0.35); border-left: 3px solid #8b5cf6; border-radius: 4px; font-style: italic; font-size: 0.86rem; color: #f8fafc; line-height: 1.45;">
                  "${escapeHTML(dossier.practiceSentence || short.captions)}"
                </blockquote>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                  <button type="button" class="btn btn-sm btn-outline-cyan" id="btn-listen-sentence" style="padding: 6px 12px; font-size: 0.78rem;">
                    <span>🔊</span> Écouter le Modèle
                  </button>
                  <button type="button" class="btn btn-sm btn-primary" id="btn-practice-mic" style="padding: 6px 14px; font-size: 0.78rem; background: linear-gradient(135deg, #8b5cf6, #6366f1); border-color: #8b5cf6;">
                    <span id="mic-icon-state">🎤</span> <span id="mic-label-state">Parler au Micro</span>
                  </button>
                </div>
                <div id="shadowing-feedback-box" style="display: none; margin-top: 10px;">
                  <div id="shadowing-score-badge" class="executive-speech-score-badge"></div>
                  <p id="shadowing-transcript-line" style="font-size: 0.78rem; margin: 6px 0 0 0; color: var(--text-secondary);"></p>
                </div>
              </div>

              <!-- Export Full Briefing Sheet -->
              <button type="button" class="btn btn-sm btn-outline-primary" id="btn-export-dossier" style="width: 100%; padding: 10px; font-weight: 700; border-radius: 8px; margin-top: 4px;">
                <span>📋</span> Copier la Fiche Synthèse Complète (Format Fiche Pro)
              </button>
            </div>

            <!-- Tab 2: Comments & Peer Exchange -->
            <div id="tab-pane-comments" style="display: none; flex-direction: column; gap: 14px;">
              <!-- Social Action Buttons (Like, Dislike, Share) -->
              <div class="shorts-interaction-row" style="margin-bottom: 0;">
                <button type="button" class="btn-short-action btn-short-like ${isLiked ? 'active' : ''}" id="viewer-btn-like">
                  <span class="action-icon">👍</span>
                  <span class="action-count" id="viewer-like-count">${short.likes}</span>
                  <span class="action-label">J'aime</span>
                </button>

                <button type="button" class="btn-short-action btn-short-dislike ${isDisliked ? 'active' : ''}" id="viewer-btn-dislike">
                  <span class="action-icon">👎</span>
                  <span class="action-count" id="viewer-dislike-count">${short.dislikes}</span>
                  <span class="action-label">Dislike</span>
                </button>

                <button type="button" class="btn-short-action" id="viewer-btn-share">
                  <span class="action-icon">🔗</span>
                  <span class="action-label">Partager</span>
                </button>
              </div>

              <!-- Comments Section -->
              <div class="shorts-comments-block">
                <div class="comments-block-header">
                  <h3>Retours et Analyses de Pairs (<span id="viewer-comments-count">${short.comments.length}</span>)</h3>
                </div>

                <div class="shorts-comments-scroll" id="viewer-comments-list" style="max-height: 280px;">
                  ${short.comments.map(c => `
                    <div class="short-comment-item">
                      <img src="${getAssetPath(c.avatar)}" alt="${escapeHTML(c.name)}" class="comment-author-avatar" />
                      <div class="comment-bubble">
                        <div class="comment-top">
                          <strong>${escapeHTML(c.name)} ${c.flag || ''}</strong>
                          <span class="comment-time">${c.time}</span>
                        </div>
                        <p class="comment-message">${escapeHTML(c.text)}</p>
                      </div>
                    </div>
                  `).join('')}
                </div>

                <!-- Add Comment Input -->
                <form class="shorts-add-comment-form" id="viewer-comment-form">
                  <input type="text" id="viewer-comment-input" class="form-control" placeholder="Ajouter un retour professionnel en anglais..." required />
                  <button type="submit" class="btn btn-primary btn-sm">Envoyer</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Lancer la lecture audio TTS uniquement si ce n'est pas déjà un fichier vidéo avec sa propre piste audio
    if (!isVideo) {
      playSpeechCaptions(short.captions, currentPlaybackRate);
    }

    // Timeline animation
    const timelineBar = modal.querySelector('#shorts-timeline-bar');
    if (timelineBar) {
      timelineBar.style.width = '0%';
      timelineBar.style.transition = 'width 25s linear';
      setTimeout(() => {
        timelineBar.style.width = '100%';
      }, 50);
    }

    // Appliquer le filtre de montage créatif s'il existe
    const viewerFilterCssMap = {
      none: 'none',
      teal_orange: 'contrast(1.25) saturate(1.4) hue-rotate(-10deg) sepia(0.15)',
      vintage: 'sepia(0.55) contrast(1.15) brightness(0.95) saturate(1.2)',
      noir: 'grayscale(1) contrast(1.4) brightness(0.95)',
      warm: 'sepia(0.35) saturate(1.45) brightness(1.05)',
      cyberpunk: 'contrast(1.35) saturate(1.8) hue-rotate(180deg) brightness(0.92)',
      pastel: 'brightness(1.1) contrast(0.92) saturate(1.2) hue-rotate(30deg)'
    };
    const viewerMediaEl = modal.querySelector('#viewer-video-player') || modal.querySelector('.shorts-screen-bg');
    if (viewerMediaEl && edits.filter && viewerFilterCssMap[edits.filter]) {
      viewerMediaEl.style.filter = viewerFilterCssMap[edits.filter];
    }

    // Appliquer le taux de vitesse actuel sur le lecteur vidéo
    const videoEl = modal.querySelector('#viewer-video-player');
    if (videoEl) {
      videoEl.playbackRate = currentPlaybackRate;
    }

    // Gestion du basculement d'onglets (Dossier vs Retours)
    const tabBtnDossier = modal.querySelector('#tab-btn-dossier');
    const tabBtnComments = modal.querySelector('#tab-btn-comments');
    const paneDossier = modal.querySelector('#tab-pane-dossier');
    const paneComments = modal.querySelector('#tab-pane-comments');

    if (tabBtnDossier && tabBtnComments && paneDossier && paneComments) {
      tabBtnDossier.addEventListener('click', () => {
        tabBtnDossier.classList.add('active');
        tabBtnComments.classList.remove('active');
        paneDossier.style.display = 'flex';
        paneComments.style.display = 'none';
      });

      tabBtnComments.addEventListener('click', () => {
        tabBtnComments.classList.add('active');
        tabBtnDossier.classList.remove('active');
        paneComments.style.display = 'flex';
        paneDossier.style.display = 'none';
      });
    }

    // Gestion du sélecteur de vitesse de lecture (0.75x, 1.0x, 1.25x)
    const speedButtons = modal.querySelectorAll('.executive-speed-btn');
    speedButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const rate = parseFloat(btn.getAttribute('data-speed')) || 1.0;
        currentPlaybackRate = rate;

        speedButtons.forEach(b => b.classList.toggle('active', b === btn));

        const activeVid = modal.querySelector('#viewer-video-player');
        if (activeVid) {
          activeVid.playbackRate = currentPlaybackRate;
        }

        if (isSpeechPlaying) {
          playSpeechCaptions(short.captions, currentPlaybackRate);
        }

        if (window.showToast) {
          window.showToast(`⚡ Cadence de lecture réglée à ${rate}x`, 'Vitesse d\'Analyse', 'info');
        }
      });
    });

    // Copie de collocation individuelle en 1 clic
    modal.querySelectorAll('.btn-copy-lexicon').forEach(btn => {
      btn.addEventListener('click', () => {
        const phrase = btn.getAttribute('data-phrase');
        if (phrase && navigator.clipboard) {
          navigator.clipboard.writeText(phrase);
          if (window.showToast) {
            window.showToast(`📋 Collocation copiée : "${phrase}"`, 'Lexique Exécutif', 'success');
          }
        }
      });
    });

    // Copie de la fiche synthèse complète du Briefing
    const exportBtn = modal.querySelector('#btn-export-dossier');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const sheet = `=== ENGLISH BOOSTER · FICHE DE BRIEFING EXÉCUTIF ===
Sujet : ${short.title}
Niveau : ${short.author.level} | Expert : ${short.author.name} (${short.author.role || 'Executive Leader'})
Cadre Méthodologique : ${dossier.framework}

🎯 PILIERS STRATÉGIQUES :
${(dossier.takeaways || []).map((t, i) => `${i + 1}. ${t}`).join('\n')}

💎 LEXIQUE & COLLOCATIONS C-SUITE :
${(dossier.lexicon || []).map(l => `• ${l.term || l.phrase}${l.phonetic ? ` [${l.phonetic}]` : ''} : ${l.meaning || l.note}${l.collocation ? `\n  Exemple : « ${l.collocation} »` : ''}`).join('\n')}

🎙️ PHRASE D'IMPACT (SHADOWING) :
"${dossier.practiceSentence || short.captions}"
=====================================================`;

        if (navigator.clipboard) {
          navigator.clipboard.writeText(sheet);
        }
        if (window.showToast) {
          window.showToast('📋 Fiche de synthèse exécutive copiée dans le presse-papier !', 'Dossier Exécutif', 'success');
        }
      });
    }

    // Écoute du modèle vocal (TTS)
    const listenSentenceBtn = modal.querySelector('#btn-listen-sentence');
    if (listenSentenceBtn) {
      listenSentenceBtn.addEventListener('click', () => {
        playSpeechCaptions(dossier.practiceSentence || short.captions, currentPlaybackRate);
      });
    }

    // Entraînement vocal interactif au Shadowing (Speech Recognition)
    const practiceMicBtn = modal.querySelector('#btn-practice-mic');
    const micIconState = modal.querySelector('#mic-icon-state');
    const micLabelState = modal.querySelector('#mic-label-state');
    const feedbackBox = modal.querySelector('#shadowing-feedback-box');
    const scoreBadge = modal.querySelector('#shadowing-score-badge');
    const transcriptLine = modal.querySelector('#shadowing-transcript-line');

    if (practiceMicBtn) {
      practiceMicBtn.addEventListener('click', () => {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRec) {
          if (feedbackBox && scoreBadge) {
            feedbackBox.style.display = 'block';
            scoreBadge.style.background = 'rgba(59, 130, 246, 0.2)';
            scoreBadge.style.color = '#93c5fd';
            scoreBadge.style.border = '1px solid rgba(59, 130, 246, 0.4)';
            scoreBadge.innerHTML = '<span>ℹ️</span> Reconnaissance vocale non disponible sur ce navigateur. Répétez à voix haute ! (+10 XP)';
          }
          if (window.EnglishBooster && typeof window.EnglishBooster.addXP === 'function') {
            window.EnglishBooster.addXP(10);
          }
          return;
        }

        try {
          const recognizer = new SpeechRec();
          recognizer.lang = 'en-US';
          recognizer.interimResults = false;
          recognizer.maxAlternatives = 1;

          if (micIconState) micIconState.textContent = '🔴';
          if (micLabelState) micLabelState.textContent = 'Écoute en cours... Parlez !';
          practiceMicBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';

          recognizer.onresult = (event) => {
            const spoken = (event.results[0][0].transcript || '').trim();
            const target = (dossier.practiceSentence || short.captions || '').trim().toLowerCase();
            const cleanSpoken = spoken.toLowerCase().replace(/[^a-z0-9\s]/g, '');
            const cleanTarget = target.replace(/[^a-z0-9\s]/g, '');

            const spokenWords = cleanSpoken.split(/\s+/).filter(Boolean);
            const targetWords = cleanTarget.split(/\s+/).filter(Boolean);

            let matches = 0;
            spokenWords.forEach(w => {
              if (targetWords.includes(w)) matches++;
            });

            const accuracy = targetWords.length > 0 
              ? Math.min(100, Math.round((matches / targetWords.length) * 100))
              : 85;

            if (feedbackBox && scoreBadge && transcriptLine) {
              feedbackBox.style.display = 'block';
              transcriptLine.innerHTML = `<strong>Vous avez dit :</strong> « ${escapeHTML(spoken)} »`;

              if (accuracy >= 60) {
                scoreBadge.style.background = 'rgba(16, 185, 129, 0.25)';
                scoreBadge.style.color = '#34d399';
                scoreBadge.style.border = '1px solid rgba(52, 211, 153, 0.5)';
                scoreBadge.innerHTML = `<span>🎯</span> <strong>Score d'Élocution : ${accuracy}%</strong> — Cadence et clarté exécutive validées ! (+20 XP)`;
                if (window.SoundFX && typeof window.SoundFX.playSuccess === 'function') {
                  window.SoundFX.playSuccess();
                }
                if (window.EnglishBooster && typeof window.EnglishBooster.addXP === 'function') {
                  window.EnglishBooster.addXP(20);
                }
              } else {
                scoreBadge.style.background = 'rgba(245, 158, 11, 0.2)';
                scoreBadge.style.color = '#fbbf24';
                scoreBadge.style.border = '1px solid rgba(245, 158, 11, 0.4)';
                scoreBadge.innerHTML = `<span>⚠️</span> <strong>Score d'Élocution : ${accuracy}%</strong> — Bonne tentative ! Réessayez avec une cadence plus appuyée (+10 XP)`;
                if (window.EnglishBooster && typeof window.EnglishBooster.addXP === 'function') {
                  window.EnglishBooster.addXP(10);
                }
              }
            }
          };

          recognizer.onerror = () => {
            if (feedbackBox && scoreBadge) {
              feedbackBox.style.display = 'block';
              scoreBadge.style.background = 'rgba(239, 68, 68, 0.2)';
              scoreBadge.style.color = '#fca5a5';
              scoreBadge.style.border = '1px solid rgba(239, 68, 68, 0.4)';
              scoreBadge.innerHTML = '<span>⚠️</span> Micro inactif ou non détecté. Répétez la phrase à voix haute (+10 XP) !';
            }
            if (window.EnglishBooster && typeof window.EnglishBooster.addXP === 'function') {
              window.EnglishBooster.addXP(10);
            }
          };

          recognizer.onend = () => {
            if (micIconState) micIconState.textContent = '🎤';
            if (micLabelState) micLabelState.textContent = 'Parler au Micro';
            practiceMicBtn.style.background = 'linear-gradient(135deg, #8b5cf6, #6366f1)';
          };

          recognizer.start();
        } catch (err) {
          if (micIconState) micIconState.textContent = '🎤';
          if (micLabelState) micLabelState.textContent = 'Parler au Micro';
          practiceMicBtn.style.background = 'linear-gradient(135deg, #8b5cf6, #6366f1)';
        }
      });
    }

    // Événements du modal (Fermeture, Play/Pause, Son)
    const closeBtn = modal.querySelector('#btn-close-viewer');
    const backdrop = modal.querySelector('.shorts-modal-backdrop');
    function closeModal() {
      stopSpeechCaptions();
      const currentVid = modal.querySelector('#viewer-video-player');
      if (currentVid) currentVid.pause();
      window.removeEventListener('keydown', handleEscViewerKey);
      modal.style.display = 'none';
      document.body.style.overflow = '';
      currentActiveShort = null;
    }
    const handleEscViewerKey = (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscViewerKey);
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    // Play / Pause toggle
    const playPauseBtn = modal.querySelector('#btn-screen-play-pause');
    const playStateSymbol = modal.querySelector('.play-state-symbol');
    playPauseBtn.addEventListener('click', () => {
      const currentVid = modal.querySelector('#viewer-video-player');
      if (currentVid) {
        if (currentVid.paused) {
          currentVid.play();
          playStateSymbol.textContent = '⏸️';
        } else {
          currentVid.pause();
          playStateSymbol.textContent = '▶️';
        }
      } else {
        if (isSpeechPlaying) {
          stopSpeechCaptions();
          playStateSymbol.textContent = '▶️';
        } else {
          playSpeechCaptions(short.captions, currentPlaybackRate);
          playStateSymbol.textContent = '⏸️';
        }
      }
    });

    // Sound toggle
    const soundToggle = modal.querySelector('#btn-toggle-sound');
    soundToggle.addEventListener('click', () => {
      const currentVid = modal.querySelector('#viewer-video-player');
      if (currentVid) {
        currentVid.muted = !currentVid.muted;
        soundToggle.querySelector('.sound-icon').textContent = currentVid.muted ? '🔇' : '🔊';
      } else {
        if (isSpeechPlaying) {
          stopSpeechCaptions();
          soundToggle.querySelector('.sound-icon').textContent = '🔇';
        } else {
          playSpeechCaptions(short.captions, currentPlaybackRate);
          soundToggle.querySelector('.sound-icon').textContent = '🔊';
        }
      }
    });

    // Like
    const likeBtn = modal.querySelector('#viewer-btn-like');
    if (likeBtn) {
      likeBtn.addEventListener('click', () => {
        handleShortReaction(short.id, 'like');
        const updated = shortsData.find(s => s.id === short.id);
        modal.querySelector('#viewer-like-count').textContent = updated.likes;
        modal.querySelector('#viewer-dislike-count').textContent = updated.dislikes;
        likeBtn.classList.toggle('active', updated.userReaction === 'like');
        modal.querySelector('#viewer-btn-dislike').classList.toggle('active', updated.userReaction === 'dislike');
        renderShortsGrid();
      });
    }

    // Dislike
    const dislikeBtn = modal.querySelector('#viewer-btn-dislike');
    if (dislikeBtn) {
      dislikeBtn.addEventListener('click', () => {
        handleShortReaction(short.id, 'dislike');
        const updated = shortsData.find(s => s.id === short.id);
        modal.querySelector('#viewer-like-count').textContent = updated.likes;
        modal.querySelector('#viewer-dislike-count').textContent = updated.dislikes;
        dislikeBtn.classList.toggle('active', updated.userReaction === 'dislike');
        modal.querySelector('#viewer-btn-like').classList.toggle('active', updated.userReaction === 'like');
        renderShortsGrid();
      });
    }

    // Partager
    const shareBtn = modal.querySelector('#viewer-btn-share');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
        }
        if (window.showToast) {
          window.showToast('🔗 Lien du Briefing Exécutif copié dans le presse-papier !', 'Partage Pro', 'success');
        } else {
          alert('Lien copié !');
        }
      });
    }

    // Nouveau commentaire / retour de pair
    const commentForm = modal.querySelector('#viewer-comment-form');
    if (commentForm) {
      commentForm.addEventListener('submit', e => {
        e.preventDefault();
        const input = modal.querySelector('#viewer-comment-input');
        const text = input.value.trim();
        if (!text) return;

        const currentUserName = localStorage.getItem('eb_user_name') || 'Alex Rivera';
        const newComment = {
          id: 'sc_' + Date.now(),
          name: currentUserName,
          flag: '🇪🇸',
          avatar: 'assets/avatars/alex.jpg',
          text: text,
          time: 'À l\'instant'
        };

        short.comments.unshift(newComment);
        saveShorts();

        // Mettre à jour l'affichage
        const list = modal.querySelector('#viewer-comments-list');
        const countEl = modal.querySelector('#viewer-comments-count');
        const countPill = modal.querySelector('#viewer-comments-count-pill');
        if (countEl) countEl.textContent = short.comments.length;
        if (countPill) countPill.textContent = short.comments.length;

        const itemHtml = `
          <div class="short-comment-item" style="animation: fadeIn 0.3s ease;">
            <img src="${getAssetPath(newComment.avatar)}" alt="${escapeHTML(newComment.name)}" class="comment-author-avatar" />
            <div class="comment-bubble">
              <div class="comment-top">
                <strong>${escapeHTML(newComment.name)} ${newComment.flag}</strong>
                <span class="comment-time">${newComment.time}</span>
              </div>
              <p class="comment-message">${escapeHTML(newComment.text)}</p>
            </div>
          </div>
        `;
        if (list) list.insertAdjacentHTML('afterbegin', itemHtml);
        input.value = '';

        if (window.SoundFX && typeof window.SoundFX.playSuccess === 'function') {
          window.SoundFX.playSuccess();
        }
      });
    }
  }

  // Synthèse vocale de démonstration avec cadence ajustable et voix IA élevée
  function playSpeechCaptions(text, rate = currentPlaybackRate) {
    if (!text) return;
    if (window.AIVoiceEngine) {
      isSpeechPlaying = true;
      window.AIVoiceEngine.speak(text, {
        rate: rate,
        onEnd: () => {
          isSpeechPlaying = false;
          const playState = document.querySelector('.play-state-symbol');
          if (playState) playState.textContent = '▶️';
        },
        onError: () => {
          isSpeechPlaying = false;
          const playState = document.querySelector('.play-state-symbol');
          if (playState) playState.textContent = '▶️';
        }
      });
      return;
    }

    // Voix de l'IA désactivée
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
    isSpeechPlaying = false;
    const playState = document.querySelector('.play-state-symbol');
    if (playState) playState.textContent = '▶️';
  }

  function stopSpeechCaptions() {
    if (window.AIVoiceEngine) {
      window.AIVoiceEngine.stop();
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    isSpeechPlaying = false;
  }

  // Gestion des réactions Like / Dislike
  function handleShortReaction(shortId, type) {
    const short = shortsData.find(s => s.id === shortId);
    if (!short) return;

    if (short.userReaction === type) {
      short.userReaction = null;
      if (type === 'like') short.likes = Math.max(0, short.likes - 1);
      else short.dislikes = Math.max(0, short.dislikes - 1);
    } else {
      if (short.userReaction === 'like' && type === 'dislike') short.likes = Math.max(0, short.likes - 1);
      if (short.userReaction === 'dislike' && type === 'like') short.dislikes = Math.max(0, short.dislikes - 1);

      short.userReaction = type;
      if (type === 'like') {
        const isFr = (window.EnglishBooster?.i18n?.getLang() === 'fr') || (localStorage.getItem('eb_lang') === 'fr') || (localStorage.getItem('eb_language') === 'fr');
        if (window.showToast) window.showToast('❤️ Vous avez liké ce Short !', isFr ? 'Regardez les vidéos' : 'Watch Videos', 'success');
      } else {
        short.dislikes += 1;
      }
    }

    saveShorts();
  }

  // ==========================================================================
  // FORMULAIRE DE PUBLICATION DE SHORT (CHOIX VIDÉO & 100% EN ANGLAIS)
  // ==========================================================================
  function openPublishModal() {
    let modal = document.getElementById('modal-publish-short');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modal-publish-short';
      modal.className = 'shorts-modal-overlay';
      document.body.appendChild(modal);
    }

    const members = getRegisteredMembers();
    const storedUser = localStorage.getItem('eb_user_name') || '';

    const membersOptions = members.map(m => {
      const isSelected = storedUser && (m.prenom.toLowerCase().includes(storedUser.toLowerCase()) || m.nom.toLowerCase().includes(storedUser.toLowerCase()));
      return `
        <option value="${m.id}" data-name="${m.prenom} ${m.nom}" data-flag="${m.drapeau || '🌍'}" data-level="${m.level || 'B1'}" data-avatar="${m.avatarImg || 'assets/avatars/alex.jpg'}" ${isSelected ? 'selected' : ''}>
          ${m.drapeau || '🌍'} ${m.prenom} ${m.nom} (${m.level || 'B1'} — ${m.nationalite || 'International'})
        </option>
      `;
    }).join('');

    modal.innerHTML = `
      <div class="shorts-modal-backdrop"></div>
      <div class="shorts-modal-dialog" style="max-width: 840px; max-height: 94vh; overflow-y: auto;">
        <!-- BOUTON FERMER AVEC SYMBOLE CLAIR '✕' -->
        <button type="button" class="btn-close-shorts-modal" id="btn-close-publish" title="Fermer (Échap) / Close (Esc)" aria-label="Fermer">
          <span class="close-icon-symbol">✕</span>
        </button>

        <div class="publish-short-card">
          <div style="margin-bottom: 18px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <span class="crystal-badge">Espace Membres Inscrits</span>
              <span class="crystal-badge" style="background: rgba(239, 68, 68, 0.2); border-color: #ef4444; color: #fca5a5; font-size: 0.72rem;">🇬🇧 Règle : 100% Anglais</span>
            </div>
            <h2 style="font-size: 1.6rem; margin: 4px 0;">🎬 Publier votre Vidéo Short</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 4px;">
              Choisissez votre vidéo, appliquez vos retouches créatives (Texte, Effets, Filtres, Voix) et partagez-la avec la communauté mondiale.
            </p>
          </div>

          <!-- BANNIÈRE RÈGLE D'OR : 100% EN ANGLAIS -->
          <div class="english-rule-card">
            <span class="english-rule-badge">🇬🇧</span>
            <div>
              <strong style="color: #60a5fa; font-size: 0.9rem; display: block; margin-bottom: 2px;">
                RÈGLE STRICTE : VIDÉO & CONTENU 100% EN ANGLAIS
              </strong>
              <p style="color: var(--text-secondary); font-size: 0.82rem; margin: 0; line-height: 1.4;">
                Pour garantir l'immersion orale de tous les membres, chaque Short publié doit être <strong>entièrement parlé, titré et décrit en anglais</strong> (accents américain, britannique ou internationaux bienvenus). Tout contenu dans une autre langue sera rejeté par la modération.
              </p>
            </div>
          </div>

          <form id="form-create-new-short">
            <!-- 1. Profil Inscrit Auteur -->
            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" for="short-author-select" style="font-weight: 700;">Compte de membre inscrit :</label>
              <select id="short-author-select" class="form-control" required style="padding: 10px 14px;">
                ${membersOptions}
              </select>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">
                Pas encore inscrit ? <a href="${getAssetPath('pages/inscrits.html')}" style="color: var(--green-400); text-decoration: underline;">Inscrivez-vous gratuitement ici</a>
              </div>
            </div>

            <!-- 2. CHOIX DE LA VIDÉO (IMPORT FICHIER, CAMÉRA OU STUDIO) -->
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label" style="font-weight: 700;">
                Choisissez votre vidéo (Format vertical 9:16 recommandé) :
              </label>

              <!-- Onglets de sélection de méthode -->
              <div class="upload-method-tabs" role="tablist">
                <button type="button" class="upload-tab-btn active" data-tab="file" id="tab-btn-file">
                  <span>📁</span> Importer un fichier vidéo
                </button>
                <button type="button" class="upload-tab-btn" data-tab="camera" id="tab-btn-camera">
                  <span>🎥</span> Enregistrer avec ma caméra
                </button>
                <button type="button" class="upload-tab-btn" data-tab="studio" id="tab-btn-studio">
                  <span>🎨</span> Studio Virtuel HD
                </button>
              </div>

              <!-- CONTENU ONGLET 1 : IMPORT DE FICHIER VIDÉO -->
              <div class="tab-content-panel" id="panel-tab-file">
                <div class="video-dropzone" id="short-video-dropzone">
                  <input type="file" id="short-video-file-input" accept="video/mp4,video/webm,video/ogg,video/quicktime" style="display:none;" />
                  <div class="video-dropzone-icon">📥</div>
                  <strong style="color: #fff; font-size: 0.95rem; display: block; margin-bottom: 4px;">
                    Glissez votre fichier vidéo ici ou cliquez pour choisir
                  </strong>
                  <p style="color: var(--text-muted); font-size: 0.8rem; margin: 0;">
                    Formats acceptés : MP4, WebM, MOV • Max 60 secondes • Vidéo parlée en anglais
                  </p>
                </div>

                <!-- Aperçu vidéo après sélection de fichier avec Stage d'effets superposés -->
                <div class="video-preview-wrapper" id="file-video-preview-wrap" style="display: none;">
                  <div class="short-stage-overlay-container" id="file-stage-container">
                    <video id="file-video-preview-player" class="video-preview-player" controls playsinline loop></video>
                    <!-- Overlays synchronisés -->
                    <div class="short-fx-layer" id="file-fx-layer"></div>
                    <div class="short-text-layer" id="file-text-layer" style="display:none;"><span class="short-text-content"></span></div>
                    <div class="short-stickers-layer" id="file-stickers-layer"></div>
                    <div class="short-subtitles-layer" id="file-subtitles-layer" style="display:none;"><div class="short-subtitles-bubble style-tiktok"><span></span></div></div>
                    <div class="short-voiceover-indicator" id="file-voiceover-indicator" style="display:none;"><span>🎙️ Voix off active</span></div>
                  </div>
                  <div class="video-info-strip">
                    <span id="file-video-info-text">Vidéo sélectionnée</span>
                    <button type="button" id="btn-change-video-file" class="btn btn-sm btn-secondary" style="padding: 3px 8px; font-size: 0.75rem;">
                      🔄 Changer
                    </button>
                  </div>
                </div>
              </div>

              <!-- CONTENU ONGLET 2 : ENREGISTREMENT CAMÉRA DIRECT -->
              <div class="tab-content-panel" id="panel-tab-camera" style="display: none;">
                <div class="camera-recording-box">
                  <div class="short-stage-overlay-container" id="camera-stage-container" style="width:100%;">
                    <video id="short-camera-preview" class="camera-preview-feed" autoplay playsinline muted></video>
                    <!-- Overlays synchronisés -->
                    <div class="short-fx-layer" id="camera-fx-layer"></div>
                    <div class="short-text-layer" id="camera-text-layer" style="display:none;"><span class="short-text-content"></span></div>
                    <div class="short-stickers-layer" id="camera-stickers-layer"></div>
                    <div class="short-subtitles-layer" id="camera-subtitles-layer" style="display:none;"><div class="short-subtitles-bubble style-tiktok"><span></span></div></div>
                    <div class="short-voiceover-indicator" id="camera-voiceover-indicator" style="display:none;"><span>🎙️ Voix off active</span></div>
                  </div>
                  <div class="camera-recording-controls">
                    <button type="button" id="btn-start-record" class="btn btn-sm btn-danger" style="font-weight: 700;">
                      <span>🔴</span> Démarrer l'enregistrement (60s)
                    </button>
                    <button type="button" id="btn-stop-record" class="btn btn-sm btn-secondary" style="font-weight: 700; display:none;">
                      <span>⏹️</span> Arrêter & Valider
                    </button>
                    <span id="record-timer-text" style="font-family: var(--font-mono); color: #fff; font-size: 0.85rem; display:none;">00:00</span>
                  </div>
                </div>
              </div>

              <!-- CONTENU ONGLET 3 : STUDIO VIRTUEL PRÉDÉFINI -->
              <div class="tab-content-panel" id="panel-tab-studio" style="display: none;">
                <div class="shorts-thumb-selector">
                  <label class="thumb-radio-card active">
                    <input type="radio" name="short_thumb" value="assets/images/short-pronunciation-coach.jpg" checked style="display:none;" />
                    <img src="${getAssetPath('assets/images/short-pronunciation-coach.jpg')}" alt="Prononciation" />
                    <span>Studio Voix</span>
                  </label>
                  <label class="thumb-radio-card">
                    <input type="radio" name="short_thumb" value="assets/images/short-tech-pitch.jpg" style="display:none;" />
                    <img src="${getAssetPath('assets/images/short-tech-pitch.jpg')}" alt="Tech Pitch" />
                    <span>Tech Pitch</span>
                  </label>
                  <label class="thumb-radio-card">
                    <input type="radio" name="short_thumb" value="assets/images/short-idiom-debate.jpg" style="display:none;" />
                    <img src="${getAssetPath('assets/images/short-idiom-debate.jpg')}" alt="Idioms" />
                    <span>Idiomes</span>
                  </label>
                  <label class="thumb-radio-card">
                    <input type="radio" name="short_thumb" value="assets/images/short-tychique-coach.jpg" style="display:none;" />
                    <img src="${getAssetPath('assets/images/short-tychique-coach.jpg')}" alt="Coaching" />
                    <span>Masterclass</span>
                  </label>
                </div>

                <!-- Aperçu interactif du studio virtuel avec overlay -->
                <div class="studio-preview-frame" style="margin-top: 14px; text-align: center;">
                  <div class="video-preview-wrapper" style="max-width: 380px; margin: 0 auto;">
                    <div class="short-stage-overlay-container" id="studio-stage-container">
                      <img id="studio-video-preview-img" src="${getAssetPath('assets/images/short-pronunciation-coach.jpg')}" alt="Studio Preview" class="video-preview-player" style="object-fit: cover; height: 380px;" />
                      <!-- Overlays synchronisés -->
                      <div class="short-fx-layer" id="studio-fx-layer"></div>
                      <div class="short-text-layer" id="studio-text-layer" style="display:none;"><span class="short-text-content"></span></div>
                      <div class="short-stickers-layer" id="studio-stickers-layer"></div>
                      <div class="short-subtitles-layer" id="studio-subtitles-layer" style="display:none;"><div class="short-subtitles-bubble style-tiktok"><span></span></div></div>
                      <div class="short-voiceover-indicator" id="studio-voiceover-indicator" style="display:none;"><span>🎙️ Voix off active</span></div>
                    </div>
                    <div class="video-info-strip">
                      <span>🎨 Thème Studio Virtuel HD actif</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ================================================================= -->
            <!-- SUITE DE RETOUCHE CRÉATIVE : TEXTE Aa, EFFET, FILTRES, AUTOCOLLANTS, SOUS-TITRE, VOIX OFF, ENREGISTRER (GALERIE) -->
            <!-- ================================================================= -->
            <div class="video-editing-suite" id="video-editing-suite" style="margin-bottom: 22px;">
              <div class="editing-suite-header">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span class="editing-suite-badge">✨ Creative Studio</span>
                  <span style="font-weight: 800; font-size: 0.95rem; color: #fff;">Outils de Retouche & Effets Vidéo</span>
                </div>
                <span style="font-size: 0.8rem; color: var(--cyan-400);">Personnalisez votre Short en direct</span>
              </div>

              <!-- BARRE DES 7 OUTILS PRINCIPAUX -->
              <div class="creative-tools-nav" role="tablist">
                <button type="button" class="creative-tool-btn active" data-tool="text" id="tool-btn-text">
                  <span class="tool-icon">🔤</span>
                  <span class="tool-name">Texte Aa</span>
                </button>
                <button type="button" class="creative-tool-btn" data-tool="effects" id="tool-btn-effects">
                  <span class="tool-icon">✨</span>
                  <span class="tool-name">Effet</span>
                </button>
                <button type="button" class="creative-tool-btn" data-tool="filters" id="tool-btn-filters">
                  <span class="tool-icon">🎨</span>
                  <span class="tool-name">Filtres</span>
                </button>
                <button type="button" class="creative-tool-btn" data-tool="stickers" id="tool-btn-stickers">
                  <span class="tool-icon">🎭</span>
                  <span class="tool-name">Autocollants</span>
                </button>
                <button type="button" class="creative-tool-btn" data-tool="subtitles" id="tool-btn-subtitles">
                  <span class="tool-icon">📝</span>
                  <span class="tool-name">Sous-titre</span>
                </button>
                <button type="button" class="creative-tool-btn" data-tool="voiceover" id="tool-btn-voiceover">
                  <span class="tool-icon">🎙️</span>
                  <span class="tool-name">Voix off</span>
                </button>
                <button type="button" class="creative-tool-btn tool-save-gallery" data-tool="save_gallery" id="tool-btn-save-gallery" title="Enregistrer et aller vers la galerie">
                  <span class="tool-icon">💾</span>
                  <span class="tool-name">Enregistrer (Galerie)</span>
                </button>
              </div>

              <!-- PANNEAUX DE CONFIGURATION DES 7 OUTILS -->
              <div class="creative-panels-container">

                <!-- 1. PANNEAU TEXTE Aa -->
                <div class="creative-panel" id="panel-tool-text" style="display: block;">
                  <div style="margin-bottom: 12px;">
                    <label class="form-label" style="font-size: 0.85rem; font-weight: 700; color: #fff;">Texte à afficher sur la vidéo :</label>
                    <div style="display: flex; gap: 8px;">
                      <input type="text" id="studio-text-input" class="form-control" placeholder="ex: English Speaking Breakthrough! 🚀" style="flex: 1;" />
                      <button type="button" id="btn-clear-text" class="btn btn-sm btn-secondary" title="Effacer le texte">✕</button>
                    </div>
                  </div>

                  <div style="margin-bottom: 12px;">
                    <label class="form-label" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 6px;">Style de typographie :</label>
                    <div class="studio-chip-row">
                      <button type="button" class="studio-chip style-chip active" data-style="impact">Impact Bold</button>
                      <button type="button" class="studio-chip style-chip" data-style="neon">Néon Cyan</button>
                      <button type="button" class="studio-chip style-chip" data-style="highlight">Surligné Jaune</button>
                      <button type="button" class="studio-chip style-chip" data-style="typewriter">Typewriter</button>
                      <button type="button" class="studio-chip style-chip" data-style="sunset">Sunset Glow</button>
                    </div>
                  </div>

                  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                    <div>
                      <label class="form-label" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">Couleur :</label>
                      <div class="studio-color-palette">
                        <button type="button" class="color-dot active" data-color="#ffffff" style="background:#ffffff;" title="Blanc"></button>
                        <button type="button" class="color-dot" data-color="#facc15" style="background:#facc15;" title="Jaune Fluo"></button>
                        <button type="button" class="color-dot" data-color="#06b6d4" style="background:#06b6d4;" title="Cyan"></button>
                        <button type="button" class="color-dot" data-color="#10b981" style="background:#10b981;" title="Vert Émeraude"></button>
                        <button type="button" class="color-dot" data-color="#ef4444" style="background:#ef4444;" title="Rouge"></button>
                        <button type="button" class="color-dot" data-color="#a855f7" style="background:#a855f7;" title="Violet Néon"></button>
                        <button type="button" class="color-dot" data-color="#000000" style="background:#000000; border:1px solid #475569;" title="Noir"></button>
                      </div>
                    </div>

                    <div>
                      <label class="form-label" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">Position :</label>
                      <div class="studio-chip-row">
                        <button type="button" class="studio-chip pos-chip active" data-pos="top">⬆️ Haut</button>
                        <button type="button" class="studio-chip pos-chip" data-pos="center">⏸️ Centre</button>
                        <button type="button" class="studio-chip pos-chip" data-pos="bottom">⬇️ Bas</button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 2. PANNEAU EFFET -->
                <div class="creative-panel" id="panel-tool-effects" style="display: none;">
                  <label class="form-label" style="font-size: 0.85rem; font-weight: 700; color: #fff; margin-bottom: 8px;">
                    Effets visuels dynamiques en direct :
                  </label>
                  <div class="fx-cards-grid">
                    <button type="button" class="fx-option-card active" data-fx="none">
                      <span class="fx-icon">🚫</span>
                      <strong class="fx-title">Naturel</strong>
                      <span class="fx-desc">Sans effet</span>
                    </button>
                    <button type="button" class="fx-option-card" data-fx="sparkles">
                      <span class="fx-icon">✨</span>
                      <strong class="fx-title">Sparkles</strong>
                      <span class="fx-desc">Étincelles dorées</span>
                    </button>
                    <button type="button" class="fx-option-card" data-fx="glitch">
                      <span class="fx-icon">⚡</span>
                      <strong class="fx-title">Glitch</strong>
                      <span class="fx-desc">Distorsion cyber</span>
                    </button>
                    <button type="button" class="fx-option-card" data-fx="zoom_pulse">
                      <span class="fx-icon">🔍</span>
                      <strong class="fx-title">Zoom Pulse</strong>
                      <span class="fx-desc">Battement rythmé</span>
                    </button>
                    <button type="button" class="fx-option-card" data-fx="vhs">
                      <span class="fx-icon">📼</span>
                      <strong class="fx-title">Rétro VHS</strong>
                      <span class="fx-desc">Scanlines 1985</span>
                    </button>
                    <button type="button" class="fx-option-card" data-fx="soft_glow">
                      <span class="fx-icon">🌟</span>
                      <strong class="fx-title">Lueur Douce</strong>
                      <span class="fx-desc">Bloom féerique</span>
                    </button>
                  </div>
                </div>

                <!-- 3. PANNEAU FILTRES -->
                <div class="creative-panel" id="panel-tool-filters" style="display: none;">
                  <label class="form-label" style="font-size: 0.85rem; font-weight: 700; color: #fff; margin-bottom: 8px;">
                    Filtres colorimétriques de la vidéo :
                  </label>
                  <div class="filters-cards-grid">
                    <button type="button" class="filter-option-card active" data-filter="none">
                      <div class="filter-swatch swatch-none"></div>
                      <span class="filter-lbl">Normal</span>
                    </button>
                    <button type="button" class="filter-option-card" data-filter="teal_orange">
                      <div class="filter-swatch swatch-teal"></div>
                      <span class="filter-lbl">Teal & Orange</span>
                    </button>
                    <button type="button" class="filter-option-card" data-filter="vintage">
                      <div class="filter-swatch swatch-vintage"></div>
                      <span class="filter-lbl">Vintage 70s</span>
                    </button>
                    <button type="button" class="filter-option-card" data-filter="noir">
                      <div class="filter-swatch swatch-noir"></div>
                      <span class="filter-lbl">Noir & Blanc</span>
                    </button>
                    <button type="button" class="filter-option-card" data-filter="warm">
                      <div class="filter-swatch swatch-warm"></div>
                      <span class="filter-lbl">Solaire Chaud</span>
                    </button>
                    <button type="button" class="filter-option-card" data-filter="cyberpunk">
                      <div class="filter-swatch swatch-cyber"></div>
                      <span class="filter-lbl">Cyberpunk</span>
                    </button>
                    <button type="button" class="filter-option-card" data-filter="pastel">
                      <div class="filter-swatch swatch-pastel"></div>
                      <span class="filter-lbl">Pastel Cool</span>
                    </button>
                  </div>
                </div>

                <!-- 4. PANNEAU AUTOCOLLANTS -->
                <div class="creative-panel" id="panel-tool-stickers" style="display: none;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <label class="form-label" style="font-size: 0.85rem; font-weight: 700; color: #fff; margin: 0;">
                      Cliquez pour ajouter des autocollants sur la vidéo :
                    </label>
                    <button type="button" id="btn-clear-stickers" class="btn btn-sm btn-secondary" style="font-size: 0.75rem; padding: 3px 8px;">
                      🧹 Tout retirer (<span id="stickers-count">0</span>)
                    </button>
                  </div>
                  <div class="stickers-palette-grid">
                    <button type="button" class="sticker-chip-btn" data-sticker="🇬🇧">🇬🇧</button>
                    <button type="button" class="sticker-chip-btn" data-sticker="🇺🇸">🇺🇸</button>
                    <button type="button" class="sticker-chip-btn" data-sticker="🇨🇦">🇨🇦</button>
                    <button type="button" class="sticker-chip-btn" data-sticker="🇦🇺">🇦🇺</button>
                    <button type="button" class="sticker-chip-btn" data-sticker="🔥">🔥</button>
                    <button type="button" class="sticker-chip-btn" data-sticker="🎯">🎯</button>
                    <button type="button" class="sticker-chip-btn" data-sticker="🚀">🚀</button>
                    <button type="button" class="sticker-chip-btn" data-sticker="💯">💯</button>
                    <button type="button" class="sticker-chip-btn" data-sticker="👑">👑</button>
                    <button type="button" class="sticker-chip-btn" data-sticker="🎙️">🎙️</button>
                    <button type="button" class="sticker-chip-btn" data-sticker="⭐">⭐</button>
                    <button type="button" class="sticker-chip-btn" data-sticker="👏">👏</button>
                    <button type="button" class="sticker-chip-btn" data-sticker="🧠">🧠</button>
                    <button type="button" class="sticker-chip-btn" data-sticker="💡">💡</button>
                    <button type="button" class="sticker-chip-btn" data-sticker="🏆">🏆</button>
                    <button type="button" class="sticker-chip-btn" data-sticker="⚡">⚡</button>
                    <button type="button" class="sticker-chip-btn" data-sticker="🎬">🎬</button>
                    <button type="button" class="sticker-chip-btn" data-sticker="💬">💬</button>
                    <button type="button" class="sticker-chip-btn" data-sticker="🌍">🌍</button>
                    <button type="button" class="sticker-chip-btn" data-sticker="🤩">🤩</button>
                  </div>
                  <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-top: 6px;">
                    💡 Astuce : Cliquez directement sur un autocollant sur l'aperçu vidéo pour le retirer.
                  </span>
                </div>

                <!-- 5. PANNEAU SOUS-TITRE -->
                <div class="creative-panel" id="panel-tool-subtitles" style="display: none;">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                    <label style="display: flex; align-items: center; gap: 8px; font-size: 0.88rem; font-weight: 700; color: #fff; cursor: pointer;">
                      <input type="checkbox" id="check-enable-subtitles" checked style="accent-color: var(--green-400);" />
                      Afficher les sous-titres dynamiques sur la vidéo
                    </label>
                    <span class="crystal-badge" style="font-size: 0.72rem;">Synchronisation active</span>
                  </div>

                  <div style="margin-top: 10px;">
                    <label class="form-label" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 6px;">Style graphique des sous-titres :</label>
                    <div class="studio-chip-row">
                      <button type="button" class="studio-chip sub-style-chip active" data-sub-style="style-tiktok">
                        🟡 TikTok Viral (Jaune & Noir)
                      </button>
                      <button type="button" class="studio-chip sub-style-chip" data-sub-style="style-boxed">
                        ⬛ Boîte Noire Contraste
                      </button>
                      <button type="button" class="studio-chip sub-style-chip" data-sub-style="style-neon">
                        💎 Néon Cyan
                      </button>
                      <button type="button" class="studio-chip sub-style-chip" data-sub-style="style-emerald">
                        🟢 Émeraude Punch
                      </button>
                    </div>
                  </div>
                  <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 10px; margin-bottom: 0;">
                    Le texte est synchronisé en temps réel avec le champ "Transcription du discours en anglais" ci-dessous.
                  </p>
                </div>

                <!-- 6. PANNEAU VOIX OFF -->
                <div class="creative-panel" id="panel-tool-voiceover" style="display: none;">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span style="font-size: 1.4rem;">🎙️</span>
                      <div>
                        <strong style="color: #fff; font-size: 0.9rem; display: block;">Studio Voix off & Doublage</strong>
                        <span id="voiceover-status-text" style="font-size: 0.78rem; color: var(--text-muted);">Micro prêt pour l'enregistrement</span>
                      </div>
                    </div>
                    <span id="voiceover-timer" style="font-family: var(--font-mono); font-size: 0.95rem; color: var(--green-400); font-weight: 700; display: none;">00:00</span>
                  </div>

                  <!-- Waveform Animé pendant enregistrement -->
                  <div class="voiceover-waveform-box" id="voiceover-waveform-box" style="display: none;">
                    <div class="waveform-anim-bars">
                      <span class="wb"></span><span class="wb"></span><span class="wb"></span>
                      <span class="wb"></span><span class="wb"></span><span class="wb"></span>
                      <span class="wb"></span><span class="wb"></span><span class="wb"></span>
                      <span class="wb"></span><span class="wb"></span><span class="wb"></span>
                    </div>
                    <span style="font-size: 0.8rem; color: #ef4444; font-weight: 700; margin-left: 10px;">ENREGISTREMENT MICRO EN COURS...</span>
                  </div>

                  <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: 12px;">
                    <button type="button" id="btn-start-voiceover" class="btn btn-sm btn-primary" style="font-weight: 700;">
                      <span>🎙️</span> Démarrer la Voix off (30s)
                    </button>
                    <button type="button" id="btn-stop-voiceover" class="btn btn-sm btn-danger" style="font-weight: 700; display: none;">
                      <span>⏹️</span> Arrêter & Sauvegarder
                    </button>
                    <button type="button" id="btn-play-voiceover" class="btn btn-sm btn-secondary" style="font-weight: 700; display: none;">
                      <span>▶️</span> Écouter la Voix off
                    </button>
                    <button type="button" id="btn-delete-voiceover" class="btn btn-sm btn-secondary" style="color: #ef4444; display: none;">
                      <span>🗑️</span> Supprimer
                    </button>
                  </div>

                  <div style="margin-top: 14px; display: flex; align-items: center; gap: 12px;">
                    <label for="voiceover-volume" style="font-size: 0.8rem; color: var(--text-muted); white-space: nowrap;">Volume :</label>
                    <input type="range" id="voiceover-volume" min="0" max="100" value="100" style="flex: 1; accent-color: var(--green-400);" />
                    <span id="voiceover-volume-val" style="font-size: 0.8rem; color: #fff; min-width: 38px;">100%</span>
                  </div>
                </div>

                <!-- 7. PANNEAU ENREGISTRER (ALLER VERS LA GALERIE) -->
                <div class="creative-panel" id="panel-tool-save_gallery" style="display: none;">
                  <div class="save-gallery-card">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                      <div class="save-icon-circle">💾</div>
                      <div>
                        <strong style="font-size: 1.05rem; color: #fff; display: block;">Enregistrer dans la Galerie des Shorts</strong>
                        <span style="font-size: 0.82rem; color: var(--text-secondary);">
                          Sauvegarde avec vos effets vidéo, export et ouverture immédiate
                        </span>
                      </div>
                    </div>

                    <div class="save-summary-box">
                      <div class="summary-line">
                        <span>🎨 Filtre appliqué :</span>
                        <strong id="summary-filter-val" style="color: var(--cyan-400);">Normal</strong>
                      </div>
                      <div class="summary-line">
                        <span>✨ Effet appliqué :</span>
                        <strong id="summary-effect-val" style="color: var(--cyan-400);">Aucun</strong>
                      </div>
                      <div class="summary-line">
                        <span>🔤 Texte superposé :</span>
                        <strong id="summary-text-val" style="color: var(--cyan-400);">Aucun</strong>
                      </div>
                      <div class="summary-line">
                        <span>🎭 Autocollants :</span>
                        <strong id="summary-stickers-val" style="color: var(--cyan-400);">0</strong>
                      </div>
                      <div class="summary-line">
                        <span>📝 Sous-titres :</span>
                        <strong id="summary-subtitles-val" style="color: var(--green-400);">Activés (TikTok)</strong>
                      </div>
                      <div class="summary-line">
                        <span>🎙️ Voix off :</span>
                        <strong id="summary-voiceover-val" style="color: var(--text-muted);">Non enregistrée</strong>
                      </div>
                    </div>

                    <button type="button" id="btn-save-to-gallery-action" class="btn btn-primary" style="width: 100%; margin-top: 14px; padding: 12px 20px; font-weight: 800; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; gap: 8px;">
                      <span>💾</span> Enregistrer et Aller vers la Galerie des Shorts
                    </button>
                  </div>
                </div>

              </div>
            </div>

            <!-- 3. Titre du Short (EN ANGLAIS) -->
            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" for="short-title-input" style="font-weight: 700;">
                Titre du Short <span style="color: var(--cyan-400);">(en anglais obligatoirement)</span> :
              </label>
              <input type="text" id="short-title-input" class="form-control" placeholder="ex: How to pronounce 'Schedule' in British vs American 🇬🇧🇺🇸" required />
            </div>

            <!-- 4. Catégorie du Short -->
            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label" for="short-category-select" style="font-weight: 700;">Catégorie de pratique :</label>
              <select id="short-category-select" class="form-control" required style="padding: 10px 14px;">
                <option value="pronunciation">🎙️ Prononciation & Phonétique</option>
                <option value="pitch">💼 Elevator Pitch & Carrière Tech</option>
                <option value="idioms">🗣️ Idiomes & Expressions Courantes</option>
                <option value="fluency">⚡ Fluency & Automatismes d'Expression</option>
              </select>
            </div>

            <!-- 5. Transcription parlée en Anglais -->
            <div class="form-group" style="margin-bottom: 14px;">
              <label class="form-label" for="short-captions-input" style="font-weight: 700;">
                Transcription du discours en anglais (sous-titres) :
              </label>
              <textarea id="short-captions-input" class="form-control" rows="3" placeholder="Write down the exact spoken English sentences for live speech & subtitles..." required></textarea>
            </div>

            <!-- INDICATEUR DE CONFORMITÉ LINGUISTIQUE EN TEMPS RÉEL -->
            <div id="english-compliance-box" class="english-compliance-status neutral">
              <span>🇬🇧</span>
              <span id="english-compliance-text">Saisissez votre titre et transcription pour vérifier la conformité anglaise.</span>
            </div>

            <!-- 6. CERTIFICATION SOLENNELLE OBLIGATOIRE -->
            <div style="margin: 18px 0; padding: 12px 14px; background: rgba(0,0,0,0.3); border-radius: var(--radius-md); border: 1px solid var(--glass-border);">
              <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; font-size: 0.85rem; color: #fff;">
                <input type="checkbox" id="short-english-certify" required style="margin-top: 3px; accent-color: var(--green-400);" />
                <span>
                  <strong>Je certifie sur l'honneur que cette vidéo est enregistrée et prononcée exclusivement en ANGLAIS.</strong> 
                  Je comprends que toute vidéo dans une autre langue sera automatiquement retirée.
                </span>
              </label>
            </div>

            <!-- Actions -->
            <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 14px;">
              <button type="button" class="btn btn-secondary" id="btn-cancel-publish">Annuler</button>
              <button type="submit" class="btn btn-primary" id="btn-submit-short" style="padding: 12px 26px; font-weight: 800;">
                <span>💾</span> Enregistrer (Aller vers la galerie) (+50 XP)
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Variables pour l'upload et l'enregistrement
    let selectedVideoBlobUrl = null;
    let selectedVideoType = 'studio'; // 'file', 'camera', 'studio'
    let mediaRecorder = null;
    let recordedChunks = [];
    let cameraStream = null;
    let recordTimerInterval = null;

    // État du Studio Créatif
    let appliedText = {
      content: '',
      style: 'impact',
      color: '#ffffff',
      position: 'top'
    };
    let appliedEffect = 'none'; // 'none', 'sparkles', 'glitch', 'zoom_pulse', 'vhs', 'soft_glow'
    let appliedFilter = 'none'; // 'none', 'teal_orange', 'vintage', 'noir', 'warm', 'cyberpunk', 'pastel'
    let appliedStickers = [];
    let subtitlesConfig = {
      enabled: true,
      style: 'style-tiktok',
      position: 'bottom'
    };
    let voiceoverConfig = {
      active: false,
      duration: 0,
      audioBlobUrl: null,
      volume: 1.0
    };
    let voiceoverRecorder = null;
    let voiceoverChunks = [];
    let voiceoverTimerInterval = null;
    let voiceoverAudio = null;

    // Fermeture du modal (avec support de la touche Échap)
    const closeBtn = modal.querySelector('#btn-close-publish');
    const cancelBtn = modal.querySelector('#btn-cancel-publish');
    const backdrop = modal.querySelector('.shorts-modal-backdrop');

    function closePublish() {
      if (cameraStream) {
        cameraStream.getTracks().forEach(t => t.stop());
        cameraStream = null;
      }
      if (recordTimerInterval) clearInterval(recordTimerInterval);
      if (voiceoverTimerInterval) clearInterval(voiceoverTimerInterval);
      if (voiceoverRecorder && voiceoverRecorder.state !== 'inactive') {
        try { voiceoverRecorder.stop(); } catch(e){}
      }
      if (voiceoverAudio) {
        voiceoverAudio.pause();
        voiceoverAudio = null;
      }
      window.removeEventListener('keydown', handleEscKey);
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }

    const handleEscKey = (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closePublish();
      }
    };
    window.addEventListener('keydown', handleEscKey);

    closeBtn.addEventListener('click', closePublish);
    cancelBtn.addEventListener('click', closePublish);
    backdrop.addEventListener('click', closePublish);

    // =========================================================================
    // SYNCHRONISATION EN DIRECT DES OVERLAYS ET DES EFFETS SUR LES LECTEURS
    // =========================================================================
    const filterCssMap = {
      none: 'none',
      teal_orange: 'contrast(1.25) saturate(1.4) hue-rotate(-10deg) sepia(0.15)',
      vintage: 'sepia(0.55) contrast(1.15) brightness(0.95) saturate(1.2)',
      noir: 'grayscale(1) contrast(1.4) brightness(0.95)',
      warm: 'sepia(0.35) saturate(1.45) brightness(1.05)',
      cyberpunk: 'contrast(1.35) saturate(1.8) hue-rotate(180deg) brightness(0.92)',
      pastel: 'brightness(1.1) contrast(0.92) saturate(1.2) hue-rotate(30deg)'
    };

    const filterNameMap = {
      none: 'Normal',
      teal_orange: 'Teal & Orange',
      vintage: 'Vintage 70s',
      noir: 'Noir & Blanc',
      warm: 'Solaire Chaud',
      cyberpunk: 'Cyberpunk',
      pastel: 'Pastel Cool'
    };

    const fxNameMap = {
      none: 'Aucun',
      sparkles: '✨ Sparkles',
      glitch: '⚡ Glitch VHS',
      zoom_pulse: '🔍 Zoom Pulse',
      vhs: '📼 Rétro VHS 1985',
      soft_glow: '🌟 Lueur Douce'
    };

    const captionsInput = modal.querySelector('#short-captions-input');

    function updateLiveOverlays() {
      const activeFilterCss = filterCssMap[appliedFilter] || 'none';

      // 1. Appliquer les filtres CSS sur les éléments vidéo
      const videoEls = [
        modal.querySelector('#file-video-preview-player'),
        modal.querySelector('#short-camera-preview'),
        modal.querySelector('#studio-video-preview-img')
      ];
      videoEls.forEach(el => {
        if (el) el.style.filter = activeFilterCss;
      });

      // 2. Mettre à jour la couche d'effets visuels (FX)
      ['#file-fx-layer', '#camera-fx-layer', '#studio-fx-layer'].forEach(selector => {
        const layer = modal.querySelector(selector);
        if (!layer) return;
        layer.className = 'short-fx-layer';
        if (appliedEffect !== 'none') {
          layer.classList.add('fx-' + appliedEffect);
        }
      });

      // 3. Mettre à jour le texte superposé (Texte Aa)
      ['#file-text-layer', '#camera-text-layer', '#studio-text-layer'].forEach(selector => {
        const layer = modal.querySelector(selector);
        if (!layer) return;
        const textSpan = layer.querySelector('.short-text-content');
        if (appliedText.content.trim().length > 0) {
          layer.style.display = 'block';
          layer.className = `short-text-layer typo-${appliedText.style} pos-${appliedText.position}`;
          if (textSpan) {
            textSpan.textContent = appliedText.content;
            textSpan.style.color = appliedText.color;
          }
        } else {
          layer.style.display = 'none';
        }
      });

      // 4. Mettre à jour les autocollants
      ['#file-stickers-layer', '#camera-stickers-layer', '#studio-stickers-layer'].forEach(selector => {
        const layer = modal.querySelector(selector);
        if (!layer) return;
        layer.innerHTML = appliedStickers.map((item, idx) => `
          <button type="button" class="placed-sticker-badge" data-sticker-index="${idx}" title="Cliquer pour retirer">
            <span>${item}</span>
          </button>
        `).join('');

        // Attacher écouteur de suppression de sticker au clic
        layer.querySelectorAll('.placed-sticker-badge').forEach(badge => {
          badge.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt(badge.getAttribute('data-sticker-index'), 10);
            appliedStickers.splice(idx, 1);
            updateLiveOverlays();
          });
        });
      });

      const stickersCountEl = modal.querySelector('#stickers-count');
      if (stickersCountEl) stickersCountEl.textContent = appliedStickers.length;

      // 5. Mettre à jour les sous-titres
      const rawCaptions = captionsInput ? captionsInput.value.trim() : '';
      const displayCaptions = rawCaptions.length > 0 
        ? rawCaptions 
        : "Spoken English subtitles preview in real-time 🇬🇧";

      ['#file-subtitles-layer', '#camera-subtitles-layer', '#studio-subtitles-layer'].forEach(selector => {
        const layer = modal.querySelector(selector);
        if (!layer) return;
        if (subtitlesConfig.enabled) {
          layer.style.display = 'flex';
          const bubble = layer.querySelector('.short-subtitles-bubble');
          if (bubble) {
            bubble.className = `short-subtitles-bubble ${subtitlesConfig.style}`;
            const textEl = bubble.querySelector('span');
            if (textEl) textEl.textContent = displayCaptions;
          }
        } else {
          layer.style.display = 'none';
        }
      });

      // 6. Mettre à jour l'indicateur de voix off
      ['#file-voiceover-indicator', '#camera-voiceover-indicator', '#studio-voiceover-indicator'].forEach(selector => {
        const indicator = modal.querySelector(selector);
        if (indicator) {
          indicator.style.display = voiceoverConfig.active ? 'inline-flex' : 'none';
        }
      });

      // 7. Mettre à jour le récapitulatif de la galerie
      const sumFilter = modal.querySelector('#summary-filter-val');
      const sumEffect = modal.querySelector('#summary-effect-val');
      const sumText = modal.querySelector('#summary-text-val');
      const sumStickers = modal.querySelector('#summary-stickers-val');
      const sumSubtitles = modal.querySelector('#summary-subtitles-val');
      const sumVoiceover = modal.querySelector('#summary-voiceover-val');

      if (sumFilter) sumFilter.textContent = filterNameMap[appliedFilter] || 'Normal';
      if (sumEffect) sumEffect.textContent = fxNameMap[appliedEffect] || 'Aucun';
      if (sumText) sumText.textContent = appliedText.content.trim() ? `"${appliedText.content.trim().slice(0, 20)}..."` : 'Aucun';
      if (sumStickers) sumStickers.textContent = appliedStickers.length > 0 ? `${appliedStickers.length} autocollant(s)` : '0';
      if (sumSubtitles) sumSubtitles.textContent = subtitlesConfig.enabled ? `Activés (${subtitlesConfig.style})` : 'Désactivés';
      if (sumVoiceover) sumVoiceover.textContent = voiceoverConfig.active ? 'Enregistrée & Prête ✅' : 'Non enregistrée';
    }

    // =========================================================================
    // GESTION DES ONGLETS DU STUDIO CRÉATIF (NAV 7 OUTILS)
    // =========================================================================
    const toolButtons = modal.querySelectorAll('.creative-tool-btn');
    const toolPanels = {
      text: modal.querySelector('#panel-tool-text'),
      effects: modal.querySelector('#panel-tool-effects'),
      filters: modal.querySelector('#panel-tool-filters'),
      stickers: modal.querySelector('#panel-tool-stickers'),
      subtitles: modal.querySelector('#panel-tool-subtitles'),
      voiceover: modal.querySelector('#panel-tool-voiceover'),
      save_gallery: modal.querySelector('#panel-tool-save_gallery')
    };

    toolButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        toolButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tool = btn.getAttribute('data-tool');

        Object.keys(toolPanels).forEach(k => {
          if (toolPanels[k]) toolPanels[k].style.display = (k === tool) ? 'block' : 'none';
        });
      });
    });

    // 1. Outil Texte Aa
    const textInput = modal.querySelector('#studio-text-input');
    const clearTextBtn = modal.querySelector('#btn-clear-text');

    textInput.addEventListener('input', () => {
      appliedText.content = textInput.value;
      updateLiveOverlays();
    });

    clearTextBtn.addEventListener('click', () => {
      textInput.value = '';
      appliedText.content = '';
      updateLiveOverlays();
    });

    modal.querySelectorAll('.style-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        modal.querySelectorAll('.style-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        appliedText.style = chip.getAttribute('data-style');
        updateLiveOverlays();
      });
    });

    modal.querySelectorAll('.color-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        modal.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        appliedText.color = dot.getAttribute('data-color');
        updateLiveOverlays();
      });
    });

    modal.querySelectorAll('.pos-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        modal.querySelectorAll('.pos-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        appliedText.position = chip.getAttribute('data-pos');
        updateLiveOverlays();
      });
    });

    // 2. Outil Effet
    modal.querySelectorAll('.fx-option-card').forEach(card => {
      card.addEventListener('click', () => {
        modal.querySelectorAll('.fx-option-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        appliedEffect = card.getAttribute('data-fx');
        updateLiveOverlays();
      });
    });

    // 3. Outil Filtres
    modal.querySelectorAll('.filter-option-card').forEach(card => {
      card.addEventListener('click', () => {
        modal.querySelectorAll('.filter-option-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        appliedFilter = card.getAttribute('data-filter');
        updateLiveOverlays();
      });
    });

    // 4. Outil Autocollants
    modal.querySelectorAll('.sticker-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const emoji = btn.getAttribute('data-sticker');
        if (appliedStickers.length >= 10) {
          alert('Vous avez atteint la limite de 10 autocollants sur ce Short.');
          return;
        }
        appliedStickers.push(emoji);
        updateLiveOverlays();
        if (window.SoundFX && typeof window.SoundFX.playClick === 'function') {
          window.SoundFX.playClick();
        }
      });
    });

    modal.querySelector('#btn-clear-stickers').addEventListener('click', () => {
      appliedStickers = [];
      updateLiveOverlays();
    });

    // 5. Outil Sous-titre
    const subCheckbox = modal.querySelector('#check-enable-subtitles');
    subCheckbox.addEventListener('change', () => {
      subtitlesConfig.enabled = subCheckbox.checked;
      updateLiveOverlays();
    });

    modal.querySelectorAll('.sub-style-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        modal.querySelectorAll('.sub-style-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        subtitlesConfig.style = chip.getAttribute('data-sub-style');
        updateLiveOverlays();
      });
    });

    // 6. Outil Voix off
    const startVoiceBtn = modal.querySelector('#btn-start-voiceover');
    const stopVoiceBtn = modal.querySelector('#btn-stop-voiceover');
    const playVoiceBtn = modal.querySelector('#btn-play-voiceover');
    const delVoiceBtn = modal.querySelector('#btn-delete-voiceover');
    const voiceStatusText = modal.querySelector('#voiceover-status-text');
    const voiceTimerText = modal.querySelector('#voiceover-timer');
    const voiceWaveform = modal.querySelector('#voiceover-waveform-box');
    const voiceVolumeSlider = modal.querySelector('#voiceover-volume');
    const voiceVolumeVal = modal.querySelector('#voiceover-volume-val');

    voiceVolumeSlider.addEventListener('input', () => {
      voiceoverConfig.volume = voiceVolumeSlider.value / 100;
      voiceVolumeVal.textContent = voiceVolumeSlider.value + '%';
      if (voiceoverAudio) voiceoverAudio.volume = voiceoverConfig.volume;
    });

    startVoiceBtn.addEventListener('click', async () => {
      try {
        let stream = null;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          try {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          } catch(e) {
            console.warn('Microphone permission not granted, using simulated studio audio track', e);
          }
        }

        voiceoverChunks = [];
        if (stream) {
          voiceoverRecorder = new MediaRecorder(stream);
          voiceoverRecorder.ondataavailable = e => {
            if (e.data.size > 0) voiceoverChunks.push(e.data);
          };
          voiceoverRecorder.onstop = () => {
            const blob = new Blob(voiceoverChunks, { type: 'audio/webm' });
            voiceoverConfig.audioBlobUrl = URL.createObjectURL(blob);
            stream.getTracks().forEach(t => t.stop());
          };
          voiceoverRecorder.start();
        }

        startVoiceBtn.style.display = 'none';
        stopVoiceBtn.style.display = 'inline-flex';
        voiceWaveform.style.display = 'flex';
        voiceTimerText.style.display = 'inline-block';
        voiceStatusText.textContent = 'Enregistrement de la voix off en cours...';

        let seconds = 0;
        if (voiceoverTimerInterval) clearInterval(voiceoverTimerInterval);
        voiceoverTimerInterval = setInterval(() => {
          seconds++;
          voiceoverConfig.duration = seconds;
          const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
          const secs = String(seconds % 60).padStart(2, '0');
          voiceTimerText.textContent = `${mins}:${secs}`;
          if (seconds >= 30) {
            stopVoiceBtn.click();
          }
        }, 1000);
      } catch (err) {
        console.error('Voiceover record error', err);
        alert('Impossible d\'accéder au microphone.');
      }
    });

    stopVoiceBtn.addEventListener('click', () => {
      if (voiceoverRecorder && voiceoverRecorder.state !== 'inactive') {
        voiceoverRecorder.stop();
      }
      if (voiceoverTimerInterval) clearInterval(voiceoverTimerInterval);

      voiceoverConfig.active = true;
      stopVoiceBtn.style.display = 'none';
      startVoiceBtn.style.display = 'inline-flex';
      startVoiceBtn.innerHTML = '<span>🔄</span> Réenregistrer';
      playVoiceBtn.style.display = 'inline-flex';
      delVoiceBtn.style.display = 'inline-flex';
      voiceWaveform.style.display = 'none';
      voiceStatusText.textContent = 'Voix off enregistrée et synchronisée ✅';
      voiceTimerText.textContent = 'Validé ✅';

      updateLiveOverlays();
      if (window.SoundFX && typeof window.SoundFX.playSuccess === 'function') {
        window.SoundFX.playSuccess();
      }
    });

    playVoiceBtn.addEventListener('click', () => {
      if (voiceoverAudio) {
        voiceoverAudio.pause();
        voiceoverAudio = null;
        playVoiceBtn.innerHTML = '<span>▶️</span> Écouter la Voix off';
        return;
      }

      if (voiceoverConfig.audioBlobUrl) {
        voiceoverAudio = new Audio(voiceoverConfig.audioBlobUrl);
        voiceoverAudio.volume = voiceoverConfig.volume;
        voiceoverAudio.onended = () => {
          voiceoverAudio = null;
          playVoiceBtn.innerHTML = '<span>▶️</span> Écouter la Voix off';
        };
        voiceoverAudio.play();
        playVoiceBtn.innerHTML = '<span>⏸️</span> Pause Voix off';
      } else {
        // Fallback vocal synthèse pour démonstration
        const speechText = captionsInput ? captionsInput.value.trim() : 'English Booster Studio Voiceover Track';
        playSpeechCaptions(speechText || 'English Booster Voice Track');
      }
    });

    delVoiceBtn.addEventListener('click', () => {
      if (voiceoverAudio) {
        voiceoverAudio.pause();
        voiceoverAudio = null;
      }
      voiceoverConfig.active = false;
      voiceoverConfig.audioBlobUrl = null;
      voiceoverConfig.duration = 0;
      playVoiceBtn.style.display = 'none';
      delVoiceBtn.style.display = 'none';
      voiceTimerText.style.display = 'none';
      startVoiceBtn.innerHTML = '<span>🎙️</span> Démarrer la Voix off';
      voiceStatusText.textContent = 'Piste vocale supprimée';
      updateLiveOverlays();
    });

    // =========================================================================
    // GESTION DES ONGLETS DE SÉLECTION VIDÉO (FILE / CAMERA / STUDIO)
    // =========================================================================
    const tabButtons = modal.querySelectorAll('.upload-tab-btn');
    const tabPanels = {
      file: modal.querySelector('#panel-tab-file'),
      camera: modal.querySelector('#panel-tab-camera'),
      studio: modal.querySelector('#panel-tab-studio')
    };

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.getAttribute('data-tab');
        selectedVideoType = tab;

        Object.keys(tabPanels).forEach(k => {
          if (tabPanels[k]) tabPanels[k].style.display = (k === tab) ? 'block' : 'none';
        });

        if (tab === 'camera' && !cameraStream) {
          initCameraPreview();
        } else if (tab !== 'camera' && cameraStream) {
          cameraStream.getTracks().forEach(t => t.stop());
          cameraStream = null;
        }

        updateLiveOverlays();
      });
    });

    // 1. Gestion de l'import de fichier vidéo
    const dropzone = modal.querySelector('#short-video-dropzone');
    const fileInput = modal.querySelector('#short-video-file-input');
    const previewWrap = modal.querySelector('#file-video-preview-wrap');
    const previewPlayer = modal.querySelector('#file-video-preview-player');
    const videoInfoText = modal.querySelector('#file-video-info-text');
    const changeVideoBtn = modal.querySelector('#btn-change-video-file');

    dropzone.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('dragover', e => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
    dropzone.addEventListener('drop', e => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleVideoFile(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files.length > 0) {
        handleVideoFile(fileInput.files[0]);
      }
    });

    changeVideoBtn.addEventListener('click', () => {
      fileInput.click();
    });

    function handleVideoFile(file) {
      if (!file.type.startsWith('video/')) {
        alert('Veuillez sélectionner un fichier vidéo valide (MP4, WebM, MOV).');
        return;
      }
      const url = URL.createObjectURL(file);
      selectedVideoBlobUrl = url;
      selectedVideoType = 'file';

      previewPlayer.src = url;
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      videoInfoText.textContent = `🎬 ${file.name} (${sizeMb} Mo) • Prêt avec retouches`;
      dropzone.style.display = 'none';
      previewWrap.style.display = 'flex';
      previewPlayer.play().catch(() => {});
      updateLiveOverlays();
    }

    // 2. Gestion de l'enregistrement Caméra
    async function initCameraPreview() {
      const cameraFeed = modal.querySelector('#short-camera-preview');
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Caméra non disponible sur ce navigateur');
        }
        cameraStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: true
        });
        cameraFeed.srcObject = cameraStream;
      } catch (err) {
        console.warn('Camera error in short composer', err);
        cameraFeed.poster = getAssetPath('assets/images/short-pronunciation-coach.jpg');
      }
    }

    const startRecordBtn = modal.querySelector('#btn-start-record');
    const stopRecordBtn = modal.querySelector('#btn-stop-record');
    const timerText = modal.querySelector('#record-timer-text');

    startRecordBtn.addEventListener('click', () => {
      if (!cameraStream) {
        alert('Caméra non accessible. Utilisez l\'import de fichier ou le studio virtuel.');
        return;
      }
      try {
        recordedChunks = [];
        mediaRecorder = new MediaRecorder(cameraStream);
        mediaRecorder.ondataavailable = e => {
          if (e.data.size > 0) recordedChunks.push(e.data);
        };
        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunks, { type: 'video/webm' });
          selectedVideoBlobUrl = URL.createObjectURL(blob);
          selectedVideoType = 'camera';
          const cameraFeed = modal.querySelector('#short-camera-preview');
          cameraFeed.srcObject = null;
          cameraFeed.src = selectedVideoBlobUrl;
          cameraFeed.controls = true;
          cameraFeed.play().catch(() => {});
          updateLiveOverlays();
        };

        mediaRecorder.start();
        startRecordBtn.style.display = 'none';
        stopRecordBtn.style.display = 'inline-flex';
        timerText.style.display = 'inline-block';

        let seconds = 0;
        recordTimerInterval = setInterval(() => {
          seconds++;
          const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
          const secs = String(seconds % 60).padStart(2, '0');
          timerText.textContent = `${mins}:${secs}`;
          if (seconds >= 60) {
            stopRecordBtn.click();
          }
        }, 1000);
      } catch (e) {
        console.error('Recording error', e);
      }
    });

    stopRecordBtn.addEventListener('click', () => {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
      if (recordTimerInterval) clearInterval(recordTimerInterval);
      stopRecordBtn.style.display = 'none';
      startRecordBtn.style.display = 'inline-flex';
      startRecordBtn.innerHTML = '<span>🔄</span> Réenregistrer';
      timerText.textContent = 'Enregistrement validé ✅';
    });

    // 3. Studio Thématique Radio
    const studioPreviewImg = modal.querySelector('#studio-video-preview-img');
    modal.querySelectorAll('.thumb-radio-card').forEach(card => {
      card.addEventListener('click', () => {
        modal.querySelectorAll('.thumb-radio-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const r = card.querySelector('input');
        if (r) {
          r.checked = true;
          if (studioPreviewImg) {
            studioPreviewImg.src = getAssetPath(r.value);
          }
        }
      });
    });

    // Vérificateur de conformité linguistique en temps réel
    const titleInput = modal.querySelector('#short-title-input');
    const complianceBox = modal.querySelector('#english-compliance-box');
    const complianceText = modal.querySelector('#english-compliance-text');

    function updateCompliance() {
      const result = checkEnglishCompliance(titleInput.value, captionsInput.value);
      complianceBox.className = 'english-compliance-status ' + result.status;
      complianceText.textContent = result.msg;
      updateLiveOverlays();
    }

    titleInput.addEventListener('input', updateCompliance);
    captionsInput.addEventListener('input', updateCompliance);

    // Initialiser les overlays
    updateLiveOverlays();

    // =========================================================================
    // ENREGISTRER DANS LA GALERIE & PUBLIER LE SHORT
    // =========================================================================
    function executeSaveAndPublishShort() {
      const authorSelect = modal.querySelector('#short-author-select');
      const selectedOption = authorSelect.options[authorSelect.selectedIndex];
      const title = titleInput.value.trim();
      const category = modal.querySelector('#short-category-select').value;
      const captions = captionsInput.value.trim();
      const certifyCheck = modal.querySelector('#short-english-certify');

      // Validation 100% Anglais
      const compliance = checkEnglishCompliance(title, captions);
      if (!compliance.valid) {
        alert('Attention : Votre publication ne respecte pas la règle d\'anglais !\n' + compliance.msg);
        complianceBox.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      if (!certifyCheck.checked) {
        alert('Vous devez certifier que votre vidéo est 100% en anglais.');
        certifyCheck.focus();
        return;
      }

      // Déterminer le média utilisé
      let mediaUrl = 'assets/images/short-pronunciation-coach.jpg';
      let mediaType = 'image';

      if (selectedVideoType === 'file' && selectedVideoBlobUrl) {
        mediaUrl = selectedVideoBlobUrl;
        mediaType = 'video';
      } else if (selectedVideoType === 'camera' && selectedVideoBlobUrl) {
        mediaUrl = selectedVideoBlobUrl;
        mediaType = 'video';
      } else {
        const thumbRadio = modal.querySelector('input[name="short_thumb"]:checked');
        mediaUrl = thumbRadio ? thumbRadio.value : 'assets/images/short-pronunciation-coach.jpg';
        mediaType = 'image';
      }

      const newShort = {
        id: 'short_' + Date.now(),
        author: {
          id: authorSelect.value,
          name: selectedOption.getAttribute('data-name') || 'Membre Inscrit',
          flag: selectedOption.getAttribute('data-flag') || '🌍',
          avatar: selectedOption.getAttribute('data-avatar') || 'assets/avatars/alex.jpg',
          level: selectedOption.getAttribute('data-level') || 'B1',
          role: 'Membre Inscrit'
        },
        title: title,
        category: category,
        duration: '0:35',
        views: '1',
        mediaUrl: mediaUrl,
        mediaType: mediaType,
        videoUrl: mediaType === 'video' ? mediaUrl : null,
        likes: 1,
        dislikes: 0,
        userReaction: 'like',
        captions: captions,
        isEnglishOnly: true,
        tags: ['#EnglishOnly', '#EnglishBooster', '#' + category],
        date: 'À l\'instant',
        comments: [],
        creativeEdits: {
          filter: appliedFilter,
          effect: appliedEffect,
          text: { ...appliedText },
          stickers: [...appliedStickers],
          subtitles: { ...subtitlesConfig },
          voiceover: { ...voiceoverConfig }
        }
      };

      // Sauvegarde dans la collection
      shortsData.unshift(newShort);
      saveShorts();

      // Déclencher le téléchargement local si fichier vidéo
      try {
        const downloadAnchor = document.createElement('a');
        downloadAnchor.style.display = 'none';
        downloadAnchor.href = mediaUrl;
        downloadAnchor.download = `EnglishBooster_${newShort.id}.webm`;
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        setTimeout(() => downloadAnchor.remove(), 1000);
      } catch(e){}

      if (window.SoundFX && typeof window.SoundFX.playSuccess === 'function') {
        window.SoundFX.playSuccess();
      }
      if (window.showToast) {
        window.showToast(
          '🎉 Félicitations ! Votre vidéo Short a été enregistrée dans votre galerie (+50 XP).',
          'Galerie des Vidéos & Shorts',
          'success',
          3500
        );
      }

      closePublish();
      renderShortsGrid();

      // Navigation directe vers la Galerie des Shorts
      const gridContainer = document.getElementById('shorts-grid-container');
      if (gridContainer) {
        gridContainer.scrollIntoView({ behavior: 'smooth' });
      }

      // Ouvrir immédiatement le lecteur immersif sur le nouveau Short dans la galerie
      setTimeout(() => {
        openShortModal(newShort.id);
      }, 400);
    }

    // Déclencheurs de sauvegarde
    const form = modal.querySelector('#form-create-new-short');
    form.addEventListener('submit', e => {
      e.preventDefault();
      executeSaveAndPublishShort();
    });

    const saveGalleryBtn = modal.querySelector('#btn-save-to-gallery-action');
    if (saveGalleryBtn) {
      saveGalleryBtn.addEventListener('click', () => {
        executeSaveAndPublishShort();
      });
    }
  }

  // ==========================================================================
  // PLACE POUR FAIRE UNE VIDÉO EN DIRECT (LIVE STREAM BROADCAST STUDIO)
  // ==========================================================================
  function openLiveStudio(isHost = true, liveId = null) {
    let modal = document.getElementById('modal-live-studio');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modal-live-studio';
      modal.className = 'live-studio-modal-overlay';
      document.body.appendChild(modal);
    }

    const members = getRegisteredMembers();
    const currentMember = members[0] || {
      name: 'Tychique Bongo', flag: '🇨🇮', level: 'C2', avatarImg: 'assets/images/tychique-bongo.jpg'
    };

    let sessionTitle = isHost 
      ? '🔴 Live Fluency Hour: English Speaking Practice & Real-Time Q&A' 
      : 'Live Broadcast';
    let hostName = isHost ? (currentMember.prenom ? `${currentMember.prenom} ${currentMember.nom}` : currentMember.name) : 'Lead Host';
    let hostFlag = isHost ? currentMember.drapeau || '🇨🇮' : '🌍';
    let hostLevel = isHost ? currentMember.level || 'C2' : 'C1';
    let hostAvatar = isHost ? getAssetPath(currentMember.avatarImg) : getAssetPath('assets/images/tychique-bongo.jpg');
    let initialViewers = isHost ? 18 : 45;

    if (!isHost && liveId) {
      const foundLive = liveStreamsData.find(l => l.id === liveId);
      if (foundLive) {
        sessionTitle = foundLive.title;
        hostName = foundLive.host.name;
        hostFlag = foundLive.host.flag;
        hostLevel = foundLive.host.level;
        hostAvatar = getAssetPath(foundLive.host.avatar);
        initialViewers = foundLive.viewers;
      }
    }

    modal.innerHTML = `
      <div class="shorts-modal-backdrop"></div>
      <div class="live-studio-dialog">
        <!-- Header -->
        <div class="live-studio-header">
          <div style="display:flex; align-items:center; gap:12px;">
            <span class="live-badge-glow">🔴 EN DIRECT / LIVE</span>
            <span class="crystal-badge" style="background: rgba(59, 130, 246, 0.2); border-color: #3b82f6; color: #93c5fd; font-size: 0.76rem;">
              🇬🇧 100% English Broadcast Only
            </span>
            <span class="live-duration-timer" id="live-timer-val">00:00</span>
          </div>

          <div style="display:flex; align-items:center; gap:12px;">
            <div class="live-audience-chip">
              <span>👁️</span> <span id="live-viewer-count">${initialViewers}</span> spectateurs
            </div>
            <button type="button" class="btn-close-shorts-modal" id="btn-close-live-studio" style="position:static;" aria-label="Fermer le studio">&times;</button>
          </div>
        </div>

        <!-- Main Studio Layout -->
        <div class="live-studio-main-layout">
          <!-- Video Stage (Left) -->
          <div class="live-stage-viewport">
            <!-- Feed vidéo ou flux simulé -->
            <video id="live-broadcast-feed" class="live-camera-video" autoplay playsinline muted></video>
            
            <div class="live-camera-placeholder" id="live-cam-placeholder" style="display:none;">
              <img src="${hostAvatar}" alt="${escapeHTML(hostName)}" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid #ef4444; box-shadow: 0 0 25px rgba(239, 68, 68, 0.6);" />
              <strong style="color: #fff; font-size: 1.1rem;">${escapeHTML(hostName)} ${hostFlag}</strong>
              <span class="crystal-badge">Caméra désactivée • Audio actif 🎙️</span>
            </div>

            <!-- Top Overlays on Stage -->
            <div class="live-on-air-strip">
              <img src="${hostAvatar}" alt="${escapeHTML(hostName)}" style="width: 26px; height: 26px; border-radius: 50%; object-fit: cover; border: 1.5px solid #ef4444;" />
              <span style="color:#fff; font-size:0.82rem; font-weight:700;">${escapeHTML(hostName)} ${hostFlag}</span>
              <span class="badge-level-pill">${hostLevel}</span>
            </div>

            <!-- Layer for floating reaction particles -->
            <div class="floating-reactions-layer" id="live-floating-layer"></div>

            <!-- Controls Dock (Host vs Spectator) -->
            <div class="live-controls-dock">
              ${isHost ? `
                <button type="button" class="live-ctrl-btn" id="btn-toggle-mic" title="Activer / Désactiver le microphone">
                  <span id="mic-icon">🎙️</span>
                </button>
                <button type="button" class="live-ctrl-btn" id="btn-toggle-cam" title="Activer / Désactiver la caméra">
                  <span id="cam-icon">📹</span>
                </button>
                <button type="button" class="live-ctrl-btn" id="btn-share-screen" title="Partager l'écran pour un support de cours">
                  <span>🖥️</span>
                </button>
                <button type="button" class="live-ctrl-btn" id="btn-ai-prompt" title="Sujets de conversation impromptus (AI Topics)">
                  <span>💡</span>
                </button>
                <button type="button" class="live-ctrl-btn btn-end-live" id="btn-stop-live">
                  <span>⏹️</span> Terminer le Direct
                </button>
              ` : `
                <button type="button" class="live-ctrl-btn" id="btn-toggle-mute-spec" title="Couper le son">
                  <span>🔊</span>
                </button>
                <button type="button" class="live-ctrl-btn" id="btn-request-speak" title="Demander la parole en anglais">
                  <span>✋</span>
                </button>
                <button type="button" class="live-ctrl-btn btn-end-live" id="btn-leave-live">
                  <span>🚪</span> Quitter le Direct
                </button>
              `}
            </div>
          </div>

          <!-- Live Chat & Interaction Column (Right) -->
          <div class="live-chat-panel">
            <div class="live-chat-header">
              <strong style="color: #fff; font-size: 0.92rem; display: flex; align-items: center; gap: 6px;">
                <span>💬</span> Chat en Direct (English Only)
              </strong>
              <span class="crystal-badge" style="font-size: 0.68rem; background: rgba(74, 222, 128, 0.2); color: #4ade80;">Modération Active</span>
            </div>

            <!-- Messages list -->
            <div class="live-chat-messages-wrap" id="live-chat-list">
              <div class="live-chat-msg-row">
                <span style="font-size: 1.1rem;">🤖</span>
                <div>
                  <span class="live-chat-author-name">Système English Booster:</span>
                  <span class="live-chat-text" style="color: var(--text-muted); font-size: 0.8rem;">
                    Bienvenue dans ce direct vidéo ! Posez vos questions et échangez exclusivement en langue anglaise.
                  </span>
                </div>
              </div>
              <div class="live-chat-msg-row">
                <img src="${getAssetPath('assets/avatars/alex.jpg')}" alt="Alex" class="live-chat-msg-avatar" />
                <div>
                  <span class="live-chat-author-name">Alex Rivera 🇪🇸:</span>
                  <span class="live-chat-text">Hello everyone! Excited for today's fluency workshop! 🚀</span>
                </div>
              </div>
            </div>

            <!-- Floating Reactions Toolbar -->
            <div class="live-reactions-toolbar">
              <button type="button" class="reaction-trigger-btn" data-emoji="❤️" title="Love">❤️</button>
              <button type="button" class="reaction-trigger-btn" data-emoji="🔥" title="Fire">🔥</button>
              <button type="button" class="reaction-trigger-btn" data-emoji="👏" title="Applause">👏</button>
              <button type="button" class="reaction-trigger-btn" data-emoji="🎯" title="Bullseye">🎯</button>
              <button type="button" class="reaction-trigger-btn" data-emoji="🚀" title="Rocket">🚀</button>
              <button type="button" class="reaction-trigger-btn" data-emoji="🇬🇧" title="English">🇬🇧</button>
            </div>

            <!-- Chat Input Bar -->
            <form class="live-chat-input-bar" id="live-chat-form">
              <input type="text" id="live-chat-input" class="form-control" placeholder="Message en anglais..." style="font-size: 0.85rem;" required />
              <button type="submit" class="btn btn-primary btn-sm">Envoyer</button>
            </form>
          </div>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    const videoFeed = modal.querySelector('#live-broadcast-feed');
    const placeholder = modal.querySelector('#live-cam-placeholder');
    const timerVal = modal.querySelector('#live-timer-val');
    const viewersEl = modal.querySelector('#live-viewer-count');
    const chatList = modal.querySelector('#live-chat-list');
    const floatingLayer = modal.querySelector('#live-floating-layer');

    // 1. Démarrer le flux vidéo (Webcam pour hôte ou fallback)
    if (isHost) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then(stream => {
            liveMediaStream = stream;
            videoFeed.srcObject = stream;
          })
          .catch(err => {
            console.warn('Webcam permission denied or unavailable, using fallback stage', err);
            videoFeed.style.display = 'none';
            placeholder.style.display = 'flex';
          });
      } else {
        videoFeed.style.display = 'none';
        placeholder.style.display = 'flex';
      }
    } else {
      // Spectateur : simule la vidéo de l'hôte
      videoFeed.poster = hostAvatar;
    }

    // 2. Chronomètre du live
    let elapsedSeconds = 0;
    if (liveTimerInterval) clearInterval(liveTimerInterval);
    liveTimerInterval = setInterval(() => {
      elapsedSeconds++;
      const mins = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
      const secs = String(elapsedSeconds % 60).padStart(2, '0');
      timerVal.textContent = `${mins}:${secs}`;
    }, 1000);

    // 3. Fluctuation dynamique du nombre de spectateurs
    let currentViewers = initialViewers;
    if (liveAudienceInterval) clearInterval(liveAudienceInterval);
    liveAudienceInterval = setInterval(() => {
      const delta = Math.floor(Math.random() * 5) - 2; // -2 à +2
      currentViewers = Math.max(12, currentViewers + delta);
      if (viewersEl) viewersEl.textContent = currentViewers;
    }, 4500);

    // 4. Flux automatique de commentaires en anglais de la communauté
    const sampleChatMessages = [
      { name: 'Sofia Martínez 🇪🇸', avatar: 'assets/avatars/sofia.jpg', text: 'Can you give an example of connected speech?' },
      { name: 'Kenji Sato 🇯🇵', avatar: 'assets/avatars/kenji.jpg', text: 'Watching live from Tokyo! Fantastic fluency tips.' },
      { name: 'Amara Okafor 🇳🇬', avatar: 'assets/avatars/amara.jpg', text: 'Confidence is key! Keep talking coach! 🔥' },
      { name: 'Lucas Weber 🇩🇪', avatar: 'assets/avatars/lucas.jpg', text: 'How do you practice shadowing without getting exhausted?' },
      { name: 'Chloé Dubois 🇫🇷', avatar: 'assets/avatars/chloe.jpg', text: 'Super clear pronunciation masterclass!' }
    ];

    let chatIdx = 0;
    const chatInterval = setInterval(() => {
      if (chatIdx >= sampleChatMessages.length) chatIdx = 0;
      const msg = sampleChatMessages[chatIdx++];
      addLiveChatMessage(msg.name, msg.avatar, msg.text);
      // Réaction aléatoire flottante
      const emojis = ['❤️', '🔥', '👏', '🚀'];
      spawnFloatingReaction(emojis[Math.floor(Math.random() * emojis.length)]);
    }, 6000);

    function addLiveChatMessage(author, avatar, text) {
      if (!chatList) return;
      const row = document.createElement('div');
      row.className = 'live-chat-msg-row';
      row.innerHTML = `
        <img src="${getAssetPath(avatar)}" alt="${escapeHTML(author)}" class="live-chat-msg-avatar" />
        <div>
          <span class="live-chat-author-name">${escapeHTML(author)}:</span>
          <span class="live-chat-text">${escapeHTML(text)}</span>
        </div>
      `;
      chatList.appendChild(row);
      chatList.scrollTop = chatList.scrollHeight;
    }

    // 5. Réactions flottantes
    function spawnFloatingReaction(emoji) {
      if (!floatingLayer) return;
      const particle = document.createElement('div');
      particle.className = 'reaction-particle';
      particle.textContent = emoji;
      particle.style.left = Math.floor(Math.random() * 60 + 20) + '%';
      floatingLayer.appendChild(particle);
      setTimeout(() => particle.remove(), 2400);
    }

    modal.querySelectorAll('.reaction-trigger-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const emoji = btn.getAttribute('data-emoji') || '❤️';
        spawnFloatingReaction(emoji);
        if (window.SoundFX && typeof window.SoundFX.playPop === 'function') {
          window.SoundFX.playPop();
        }
      });
    });

    // 6. Envoi de message dans le chat en direct
    const chatForm = modal.querySelector('#live-chat-form');
    chatForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = modal.querySelector('#live-chat-input');
      const text = input.value.trim();
      if (!text) return;

      const userName = localStorage.getItem('eb_user_name') || (isHost ? hostName : 'Alex Rivera');
      addLiveChatMessage(userName + (isHost ? ' (Hôte 👑)' : ''), hostAvatar, text);
      input.value = '';

      if (window.SoundFX && typeof window.SoundFX.playSuccess === 'function') {
        window.SoundFX.playSuccess();
      }
    });

    // 7. Contrôles hôte (Micro, Caméra, Partage d'écran, AI Prompts)
    if (isHost) {
      const micBtn = modal.querySelector('#btn-toggle-mic');
      const micIcon = modal.querySelector('#mic-icon');
      micBtn.addEventListener('click', () => {
        isMicMuted = !isMicMuted;
        if (liveMediaStream) {
          liveMediaStream.getAudioTracks().forEach(t => t.enabled = !isMicMuted);
        }
        micBtn.classList.toggle('off', isMicMuted);
        micIcon.textContent = isMicMuted ? '🔇' : '🎙️';
        if (window.showToast) {
          window.showToast(isMicMuted ? 'Microphone désactivé' : 'Microphone activé', 'Studio Live', 'info');
        }
      });

      const camBtn = modal.querySelector('#btn-toggle-cam');
      const camIcon = modal.querySelector('#cam-icon');
      camBtn.addEventListener('click', () => {
        isCamOff = !isCamOff;
        if (liveMediaStream) {
          liveMediaStream.getVideoTracks().forEach(t => t.enabled = !isCamOff);
        }
        camBtn.classList.toggle('off', isCamOff);
        camIcon.textContent = isCamOff ? '🚫' : '📹';
        videoFeed.style.display = isCamOff ? 'none' : 'block';
        placeholder.style.display = isCamOff ? 'flex' : 'none';
      });

      const screenBtn = modal.querySelector('#btn-share-screen');
      screenBtn.addEventListener('click', async () => {
        try {
          if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            videoFeed.srcObject = screenStream;
            videoFeed.style.display = 'block';
            placeholder.style.display = 'none';
            screenStream.getVideoTracks()[0].onended = () => {
              if (liveMediaStream) videoFeed.srcObject = liveMediaStream;
            };
            if (window.showToast) {
              window.showToast('Partage d\'écran actif pour les spectateurs', 'Studio Live', 'success');
            }
          } else {
            alert('Le partage d\'écran n\'est pas supporté sur cet appareil.');
          }
        } catch (err) {
          console.warn('Screen share cancelled', err);
        }
      });

      const aiPromptBtn = modal.querySelector('#btn-ai-prompt');
      const promptsList = [
        "What is the single best habit that helped you speak English faster?",
        "Debate: Is natural pronunciation more important than perfect grammar?",
        "Challenge: Describe your dream project in 45 seconds without using filler words!",
        "Idiom in action: Explain what 'cut to the chase' means in business English."
      ];
      aiPromptBtn.addEventListener('click', () => {
        const randomPrompt = promptsList[Math.floor(Math.random() * promptsList.length)];
        addLiveChatMessage('💡 Sujet IA Suggéré', 'assets/images/logo.svg', `"${randomPrompt}"`);
        if (window.showToast) {
          window.showToast('Sujet de conversation lancé dans le chat !', 'Studio Live IA', 'info');
        }
      });
    }

    // 8. Fermeture et arrêt du direct
    function closeLiveStudio() {
      if (liveMediaStream) {
        liveMediaStream.getTracks().forEach(t => t.stop());
        liveMediaStream = null;
      }
      if (liveTimerInterval) clearInterval(liveTimerInterval);
      if (liveAudienceInterval) clearInterval(liveAudienceInterval);
      if (chatInterval) clearInterval(chatInterval);

      modal.style.display = 'none';
      document.body.style.overflow = '';

      if (isHost) {
        if (window.showToast) {
          window.showToast(
            `🎉 Direct terminé avec succès ! Durée : ${timerVal.textContent} • +150 XP gagnés.`,
            'Studio Live English Booster',
            'success',
            4000
          );
        }
      }
    }

    const closeBtn = modal.querySelector('#btn-close-live-studio');
    const stopLiveBtn = modal.querySelector('#btn-stop-live');
    const leaveLiveBtn = modal.querySelector('#btn-leave-live');

    closeBtn.addEventListener('click', closeLiveStudio);
    if (stopLiveBtn) {
      stopLiveBtn.addEventListener('click', () => {
        if (confirm('Voulez-vous vraiment terminer la diffusion en direct ?')) {
          closeLiveStudio();
        }
      });
    }
    if (leaveLiveBtn) {
      leaveLiveBtn.addEventListener('click', closeLiveStudio);
    }
  }

  // Filtrage par catégories
  function initCategoryFilters() {
    document.querySelectorAll('.short-filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.short-filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentFilter = chip.getAttribute('data-filter') || 'all';

        if (currentFilter === 'live') {
          const liveSection = document.getElementById('live-broadcasts-section');
          if (liveSection) {
            liveSection.scrollIntoView({ behavior: 'smooth' });
            liveSection.style.animation = 'pulseBeacon 0.8s ease';
          }
        } else {
          renderShortsGrid();
        }
      });
    });
  }

  // Échapper HTML
  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // API Publique
  window.EB_WatchShorts = {
    init: function () {
      loadShorts();
      initCategoryFilters();
      renderShortsGrid();
      renderLiveStreams();
    },
    openPublishModal: openPublishModal,
    openShortModal: openShortModal,
    openLiveStudio: openLiveStudio,
    renderLiveStreams: renderLiveStreams
  };

  // Initialisation automatique
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.EB_WatchShorts.init);
  } else {
    window.EB_WatchShorts.init();
  }
})();
