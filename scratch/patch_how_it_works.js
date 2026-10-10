const fs = require('fs');

let content = fs.readFileSync('js/howItWorks.js', 'utf8');

// Add French match reasons to partnersList
content = content.replace(
  `        matchScore: 98,\n        matchReason: 'Same target goal (Spoken Fluency) · Similar intermediate level · High availability'`,
  `        matchScore: 98,\n        matchReason: 'Same target goal (Spoken Fluency) · Similar intermediate level · High availability',\n        matchReasonFr: 'Même objectif ciblé (Aisance orale) · Niveau intermédiaire similaire · Haute disponibilité'`
);

content = content.replace(
  `        matchScore: 95,\n        matchReason: 'Compatible B2 level · Shared interest in technology · Fast conversation response'`,
  `        matchScore: 95,\n        matchReason: 'Compatible B2 level · Shared interest in technology · Fast conversation response',\n        matchReasonFr: 'Niveau B2 compatible · Passion partagée pour la tech · Réponses rapides'`
);

content = content.replace(
  `        matchScore: 92,\n        matchReason: 'Compatible conversation tempo · Creative topics discussion · Online right now'`,
  `        matchScore: 92,\n        matchReason: 'Compatible conversation tempo · Creative topics discussion · Online right now',\n        matchReasonFr: 'Rythme de discussion compatible · Échanges créatifs stimulants · En ligne immédiatement'`
);

// Update createModalStructure to add data-i18n and bilingual checks
content = content.replace(
  `<span class="crystal-badge" style="font-size: 0.76rem; margin-bottom: 8px;">Interactive 3-Step Walkthrough</span>`,
  `<span class="crystal-badge" data-i18n="wiz_badge" style="font-size: 0.76rem; margin-bottom: 8px;">Interactive 3-Step Walkthrough</span>`
);

content = content.replace(
  `<h2 style="font-size: 1.7rem; margin-bottom: 4px;" class="text-gradient-cyan">Mastering Spoken English in 3 Steps</h2>`,
  `<h2 style="font-size: 1.7rem; margin-bottom: 4px;" class="text-gradient-cyan" data-i18n="wiz_title">Mastering Spoken English in 3 Steps</h2>`
);

content = content.replace(
  `<p style="color: var(--text-muted); font-size: 0.9rem;">From zero speaking practice to confident international conversations.</p>`,
  `<p style="color: var(--text-muted); font-size: 0.9rem;" data-i18n="wiz_subtitle">From zero speaking practice to confident international conversations.</p>`
);

content = content.replace(
  `<span>01</span> Create Profile`,
  `<span>01</span> <span data-i18n="wiz_tab_1">Create Profile</span>`
);
content = content.replace(
  `<span>02</span> Find Partner`,
  `<span>02</span> <span data-i18n="wiz_tab_2">Find Partner</span>`
);
content = content.replace(
  `<span>03</span> Start Speaking`,
  `<span>03</span> <span data-i18n="wiz_tab_3">Start Speaking</span>`
);

content = content.replace(
  `<label class="form-label" style="margin-bottom: 6px;">Full Name or Nickname</label>`,
  `<label class="form-label" data-i18n="wiz_label_name" style="margin-bottom: 6px;">Full Name or Nickname</label>`
);

content = content.replace(
  `<label class="form-label" style="margin-bottom: 6px;">Your Native Language</label>`,
  `<label class="form-label" data-i18n="wiz_label_native_lang" style="margin-bottom: 6px;">Your Native Language</label>`
);

content = content.replace(
  `<label class="form-label" style="margin-bottom: 6px;">Select Your Current English Level (CEFR)</label>`,
  `<label class="form-label" data-i18n="wiz_label_level" style="margin-bottom: 6px;">Select Your Current English Level (CEFR)</label>`
);

content = content.replace(
  `<label class="form-label" style="margin-bottom: 6px;">Your Primary Speaking Goal</label>`,
  `<label class="form-label" data-i18n="wiz_label_goal" style="margin-bottom: 6px;">Your Primary Speaking Goal</label>`
);

content = content.replace(
  `<label class="form-label" style="margin-bottom: 8px;">Choose Avatar</label>`,
  `<label class="form-label" data-i18n="wiz_label_avatar" style="margin-bottom: 8px;">Choose Avatar</label>`
);

content = content.replace(
  `<span class="crystal-badge" style="font-size: 0.72rem; margin-bottom: 14px;">Live Profile Preview</span>`,
  `<span class="crystal-badge" data-i18n="wiz_preview_badge" style="font-size: 0.72rem; margin-bottom: 14px;">Live Profile Preview</span>`
);

content = content.replace(
  `<button id="wiz-step1-next-btn" class="btn btn-primary">\n              Save Profile & Find Partner ➔\n            </button>`,
  `<button id="wiz-step1-next-btn" class="btn btn-primary" data-i18n="wiz_btn_save_find">\n              Save Profile & Find Partner ➔\n            </button>`
);

content = content.replace(
  `<span>AI Engine matched 3 compatible partners available now</span>`,
  `<span data-i18n="wiz_matched_count">AI Engine matched 3 compatible partners available now</span>`
);

content = content.replace(
  `<button id="wiz-step2-back-btn" class="btn btn-secondary btn-sm">\n              ⬅ Back to Profile\n            </button>`,
  `<button id="wiz-step2-back-btn" class="btn btn-secondary btn-sm" data-i18n="wiz_btn_back_profile">\n              ⬅ Back to Profile\n            </button>`
);

content = content.replace(
  `<a href="pages/partners.html" class="btn btn-secondary btn-sm">\n                Browse All 50+ Partners 🌐\n              </a>`,
  `<a href="pages/partners.html" class="btn btn-secondary btn-sm" data-i18n="wiz_btn_browse_all">\n                Browse All 50+ Partners 🌐\n              </a>`
);

content = content.replace(
  `<p style="font-size: 0.78rem; color: var(--text-subtle); line-height: 1.4; margin-top: auto;">\${p.matchReason}</p>`,
  `<p style="font-size: 0.78rem; color: var(--text-subtle); line-height: 1.4; margin-top: auto;">\${(window.EnglishBooster?.isFrench && window.EnglishBooster.isFrench()) ? (p.matchReasonFr || p.matchReason) : p.matchReason}</p>`
);

content = content.replace(
  `<span class="status-indicator"><span class="status-dot online"></span> In Call Session</span>`,
  `<span class="status-indicator"><span class="status-dot online"></span> <span data-i18n="wiz_in_call_status">In Call Session</span></span>`
);

// Call translateDOM() after modal append
content = content.replace(
  `document.body.appendChild(modal);\n\n    // Bind modal internal events\n    this.bindModalEvents();`,
  `document.body.appendChild(modal);\n    if (window.EnglishBooster?.i18n) window.EnglishBooster.i18n.translateDOM();\n\n    // Bind modal internal events\n    this.bindModalEvents();`
);

fs.writeFileSync('js/howItWorks.js', content, 'utf8');
console.log('Successfully patched howItWorks.js with multilingual attributes and reactivity!');
