const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Hero
html = html.replace(
  '<span class="crystal-badge">\n              <span>✨</span> EdTech International Platform\n            </span>',
  '<span class="crystal-badge" data-i18n="hero_badge_edtech"><span>✨</span> EdTech International Platform</span>'
);
html = html.replace(
  '<span class="crystal-badge crystal-badge-purple">\n              <span>🔥</span> 50,000+ Active Conversations\n            </span>',
  '<span class="crystal-badge crystal-badge-purple" data-i18n="hero_badge_conversations"><span>🔥</span> 50,000+ Active Conversations</span>'
);
html = html.replace(
  '<h1 class="hero-title">\n            Improve Your English by <span class="text-gradient-cyan">Speaking With the World.</span>\n          </h1>',
  '<h1 class="hero-title"><span data-i18n="hero_title_prefix">Improve Your English by </span><span class="text-gradient-cyan" data-i18n="hero_title_accent">Speaking With the World.</span></h1>'
);
html = html.replace(
  '<p class="hero-subtitle">\n            Connect with people from around the world, practice real conversations, and build the confidence to speak English naturally.\n          </p>',
  '<p class="hero-subtitle" data-i18n="hero_subtitle">Connect with people from around the world, practice real conversations, and build the confidence to speak English naturally.</p>'
);
html = html.replace(
  '<button type="button" class="btn btn-primary btn-lg btn-direct-call-guided" style="box-shadow: 0 0 30px rgba(74, 222, 128, 0.45); font-weight: 800;">\n              <span>🎙️</span> Appel Direct 1-to-1 (3s)\n            </button>',
  '<button type="button" class="btn btn-primary btn-lg btn-direct-call-guided" style="box-shadow: 0 0 30px rgba(74, 222, 128, 0.45); font-weight: 800;" data-i18n="hero_btn_call"><span>🎙️</span> Appel Direct 1-to-1 (3s)</button>'
);
html = html.replace(
  '<button type="button" class="btn btn-secondary btn-lg btn-trigger-fast-matchmaking" style="border-color: var(--blue-400); font-weight: 700;">\n              <span>⚡</span> Matchmaking Rapide\n            </button>',
  '<button type="button" class="btn btn-secondary btn-lg btn-trigger-fast-matchmaking" style="border-color: var(--blue-400); font-weight: 700;" data-i18n="hero_btn_match"><span>⚡</span> Matchmaking Rapide</button>'
);
html = html.replace(
  '<div class="trust-text">\n              Joined by <strong>10,000+ passionate learners</strong> from 100+ countries today.\n            </div>',
  '<div class="trust-text" data-i18n="hero_trust_text">Joined by <strong>10,000+ passionate learners</strong> from 100+ countries today.</div>'
);

// 2. Mission Card
html = html.replace(
  '<span class="crystal-badge">✨ Our Global Mission</span>',
  '<span class="crystal-badge" data-i18n="mission_badge">✨ Our Global Mission</span>'
);
html = html.replace(
  '<span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Authentic Real-Time English Exchange</span>',
  '<span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;" data-i18n="mission_tag">Authentic Real-Time English Exchange</span>'
);
html = html.replace(
  '<a href="pages/about.html" class="btn btn-secondary btn-sm" style="border-color: var(--blue-400);">\n            About Us & Founder →\n          </a>',
  '<a href="pages/about.html" class="btn btn-secondary btn-sm" style="border-color: var(--blue-400);" data-i18n="mission_btn_about">About Us & Founder →</a>'
);
html = html.replace(
  '<p class="about-mission-statement-text">',
  '<p class="about-mission-statement-text" data-i18n="mission_text">'
);

// 3. Stats
html = html.replace(
  '<div class="stat-label">Countries</div>',
  '<div class="stat-label" data-i18n="stats_countries">Countries</div>'
);
html = html.replace(
  '<div class="stat-label">Learners</div>',
  '<div class="stat-label" data-i18n="stats_learners">Learners</div>'
);
html = html.replace(
  '<div class="stat-label">Conversations</div>',
  '<div class="stat-label" data-i18n="stats_conversations">Conversations</div>'
);
html = html.replace(
  '<div class="stat-label">Minutes Spoken</div>',
  '<div class="stat-label" data-i18n="stats_minutes">Minutes Spoken</div>'
);

// 4. How It Works
html = html.replace(
  '<span class="crystal-badge section-tag">Methodology</span>\n          <h2 class="section-title">How English Booster Works</h2>\n          <p class="section-desc">\n            A simple 4-step framework to transition from understanding English to speaking it fluently with genuine international confidence.\n          </p>',
  '<span class="crystal-badge section-tag" data-i18n="how_tag">Methodology</span>\n          <h2 class="section-title" data-i18n="how_title">How English Booster Works</h2>\n          <p class="section-desc" data-i18n="how_desc">A simple 4-step framework to transition from understanding English to speaking it fluently with genuine international confidence.</p>'
);

// 5. Watch Videos Section
html = html.replace(
  '<h2 class="section-title" style="margin-bottom: 6px;">\n              Watch Videos : <span class="text-gradient-cyan">Shorts des Membres Inscrits</span>\n            </h2>\n            <p class="section-desc" style="max-width: 650px;">\n              Visionnez les capsules d\'expression orale en anglais publiées par les membres inscrits. Entraînez votre prononciation, vos elevator pitches et publiez vos propres Shorts !\n            </p>',
  '<h2 class="section-title" style="margin-bottom: 6px;"><span data-i18n="shorts_section_title">Watch Videos : </span><span class="text-gradient-cyan" data-i18n="shorts_section_title_accent">Shorts des Membres Inscrits</span></h2>\n            <p class="section-desc" style="max-width: 650px;" data-i18n="shorts_section_desc">Visionnez les capsules d\'expression orale en anglais publiées par les membres inscrits. Entraînez votre prononciation, vos elevator pitches et publiez vos propres Shorts !</p>'
);
html = html.replace(
  '<button type="button" class="btn btn-primary btn-open-publish-short" style="padding: 12px 22px; font-weight: 800; box-shadow: 0 4px 18px rgba(74, 222, 128, 0.35);">\n              <span>+</span> Publier une Vidéo Short\n            </button>',
  '<button type="button" class="btn btn-primary btn-open-publish-short" style="padding: 12px 22px; font-weight: 800; box-shadow: 0 4px 18px rgba(74, 222, 128, 0.35);" data-i18n="shorts_btn_publish"><span>+</span> Publier une Vidéo Short</button>'
);
html = html.replace(
  '<a href="pages/watch.html" class="btn btn-secondary" style="border-color: var(--blue-400);">\n              Explorer Tous les Shorts →\n            </a>',
  '<a href="pages/watch.html" class="btn btn-secondary" style="border-color: var(--blue-400);" data-i18n="shorts_btn_explore">Explorer Tous les Shorts →</a>'
);

// 6. Featured Partners
html = html.replace(
  '<span class="crystal-badge section-tag">Active Global Community</span>\n          <h2 class="section-title">Meet Top Conversation Partners</h2>\n          <p class="section-desc">\n            Thousands of motivated learners from 100+ countries are online right now. Find your ideal speaking partner and start practicing in seconds.\n          </p>',
  '<span class="crystal-badge section-tag" data-i18n="partners_tag">Active Global Community</span>\n          <h2 class="section-title" data-i18n="partners_title">Meet Top Conversation Partners</h2>\n          <p class="section-desc" data-i18n="partners_desc">Thousands of motivated learners from 100+ countries are online right now. Find your ideal speaking partner and start practicing in seconds.</p>'
);

// 7. Founder
html = html.replace(
  '<span class="crystal-badge section-tag">Leadership & Vision</span>\n          <h2 class="section-title">Meet the Founder</h2>\n          <p class="section-desc">\n            Empowering millions across Africa and the world to break language barriers and access international opportunities.\n          </p>',
  '<span class="crystal-badge section-tag" data-i18n="founder_tag">Leadership & Vision</span>\n          <h2 class="section-title" data-i18n="founder_title">Meet the Founder</h2>\n          <p class="section-desc" data-i18n="founder_desc">Empowering millions across Africa and the world to break language barriers and access international opportunities.</p>'
);
html = html.replace(
  '<p class="founder-bio">\n              "We built English Booster because studying grammar rules in books isn\'t enough. Language comes alive when two humans from opposite corners of the globe converse, exchange perspectives, and build confidence together. Connect. Speak. Improve."\n            </p>',
  '<p class="founder-bio" data-i18n="founder_bio">"We built English Booster because studying grammar rules in books isn\'t enough. Language comes alive when two humans from opposite corners of the globe converse, exchange perspectives, and build confidence together. Connect. Speak. Improve."</p>'
);

// 8. Pricing
html = html.replace(
  '<span class="crystal-badge section-tag">Transparent Plans</span>\n          <h2 class="section-title">Affordable Global Learning</h2>\n          <p class="section-desc">Start free and upgrade anytime as your conversational practice intensifies.</p>',
  '<span class="crystal-badge section-tag" data-i18n="pricing_tag">Transparent Plans</span>\n          <h2 class="section-title" data-i18n="pricing_title">Affordable Global Learning</h2>\n          <p class="section-desc" data-i18n="pricing_desc">Start free and upgrade anytime as your conversational practice intensifies.</p>'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Applied data-i18n tags to index.html successfully.');
