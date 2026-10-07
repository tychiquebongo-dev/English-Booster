const fs = require('fs');

let html = fs.readFileSync('pages/about.html', 'utf8');

html = html.replace(
  '<span class="crystal-badge" style="margin-bottom: 12px;">Our Purpose & Mission</span>',
  '<span class="crystal-badge" style="margin-bottom: 12px;" data-i18n="about_purpose_badge">Our Purpose & Mission</span>'
);

html = html.replace(
  '<h1 style="font-size: 3rem; letter-spacing: -0.02em; line-height: 1.15;">\n        Why <span class="text-gradient-cyan">English Booster?</span>\n      </h1>',
  '<h1 style="font-size: 3rem; letter-spacing: -0.02em; line-height: 1.15;"><span data-i18n="about_why_title">Why </span><span class="text-gradient-cyan" data-i18n="about_why_accent">English Booster?</span></h1>'
);

html = html.replace(
  '<p style="color: var(--text-muted); font-size: 1.2rem; margin-top: 18px; line-height: 1.7;">\n        English Booster connects people from different cultures and countries through one universal language: <strong>English</strong>.\n      </p>',
  '<p style="color: var(--text-muted); font-size: 1.2rem; margin-top: 18px; line-height: 1.7;" data-i18n="about_intro_p">English Booster connects people from different cultures and countries through one universal language: <strong>English</strong>.</p>'
);

html = html.replace(
  '<span class="crystal-badge">✨ Core Mission</span>',
  '<span class="crystal-badge" data-i18n="mission_badge_core">✨ Core Mission</span>'
);

html = html.replace(
  '<span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Authentic Global Connection</span>',
  '<span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;" data-i18n="mission_tag_core">Authentic Global Connection</span>'
);

html = html.replace(
  '<p class="about-mission-statement-text">',
  '<p class="about-mission-statement-text" data-i18n="mission_text">'
);

html = html.replace(
  '<h3 style="font-size: 1.3rem; margin-bottom: 8px;">Human Connection First</h3>\n        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">\n          Fluency does not come from memorizing vocabulary lists in isolation. It emerges when you interact with real people who listen, respond, and share genuine life stories.\n        </p>',
  '<h3 style="font-size: 1.3rem; margin-bottom: 8px;" data-i18n="about_pillar_1_title">Human Connection First</h3>\n        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;" data-i18n="about_pillar_1_desc">Fluency does not come from memorizing vocabulary lists in isolation. It emerges when you interact with real people who listen, respond, and share genuine life stories.</p>'
);

html = html.replace(
  '<h3 style="font-size: 1.3rem; margin-bottom: 8px;">Intelligent Pedagogical AI</h3>\n        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">\n          Our AI acts as an encouraging mentor in the background — offering gentle grammatical corrections with explanations so you learn naturally without fear.\n        </p>',
  '<h3 style="font-size: 1.3rem; margin-bottom: 8px;" data-i18n="about_pillar_2_title">Intelligent Pedagogical AI</h3>\n        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;" data-i18n="about_pillar_2_desc">Our AI acts as an encouraging mentor in the background — offering gentle grammatical corrections with explanations so you learn naturally without fear.</p>'
);

html = html.replace(
  '<h3 style="font-size: 1.3rem; margin-bottom: 8px;">Global Inclusivity</h3>\n        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">\n          From Abidjan and Tokyo to Madrid and Lagos, we welcome learners of all cultural backgrounds and CEFR proficiency levels from A1 beginners to C2 proficients.\n        </p>',
  '<h3 style="font-size: 1.3rem; margin-bottom: 8px;" data-i18n="about_pillar_3_title">Global Inclusivity</h3>\n        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;" data-i18n="about_pillar_3_desc">From Abidjan and Tokyo to Madrid and Lagos, we welcome learners of all cultural backgrounds and CEFR proficiency levels from A1 beginners to C2 proficients.</p>'
);

fs.writeFileSync('pages/about.html', html, 'utf8');
console.log('Applied data-i18n tags to pages/about.html successfully.');
