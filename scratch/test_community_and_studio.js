/**
 * Automated test script for:
 * 1. Community French translations & filter chips
 * 2. Creative Video Studio (Text Aa, Effect, Filters, Stickers, Subtitle, Voiceover, Save to Gallery, Close symbol)
 */

const fs = require('fs');
const path = require('path');

function test() {
  console.log('--- RUNNING VALIDATION TESTS ---');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log('✅ PASS:', message);
      passed++;
    } else {
      console.error('❌ FAIL:', message);
      failed++;
    }
  }

  // 1. Check pages/community.html
  const communityHtml = fs.readFileSync(path.join(__dirname, '../pages/community.html'), 'utf8');
  assert(communityHtml.includes('data-i18n="community_feed_badge"'), 'community.html has data-i18n="community_feed_badge"');
  assert(communityHtml.includes('data-i18n="community_title"'), 'community.html has data-i18n="community_title"');
  assert(communityHtml.includes('data-i18n="community_desc"'), 'community.html has data-i18n="community_desc"');
  assert(communityHtml.includes('community-filter-chip'), 'community.html has category filter chips');
  assert(communityHtml.includes('data-i18n-placeholder="community_input_placeholder"'), 'community.html has i18n placeholder for post textarea');
  assert(communityHtml.includes('data-i18n="community_btn_publish"'), 'community.html has i18n on publish button');

  // 2. Check js/i18n.js
  const i18nJs = fs.readFileSync(path.join(__dirname, '../js/i18n.js'), 'utf8');
  assert(i18nJs.includes('community_feed_badge'), 'i18n.js has community_feed_badge');
  assert(i18nJs.includes("Communauté English Booster"), 'i18n.js has French community_title');
  assert(i18nJs.includes("Publier le message (+25 XP)"), 'i18n.js has French community_btn_publish');
  assert(i18nJs.includes('studio_tool_text'), 'i18n.js has studio_tool_text');
  assert(i18nJs.includes("Enregistrer (aller vers la galerie)"), 'i18n.js has French studio_tool_save_gallery');

  // 3. Check js/community.js
  const communityJs = fs.readFileSync(path.join(__dirname, '../js/community.js'), 'utf8');
  assert(communityJs.includes('contentFr:'), 'community.js has contentFr in INITIAL_POSTS');
  assert(communityJs.includes('textFr:'), 'community.js has textFr in INITIAL_POSTS');
  assert(communityJs.includes('TAG_LABELS_FR'), 'community.js has TAG_LABELS_FR');
  assert(communityJs.includes('formatTime'), 'community.js has formatTime');
  assert(communityJs.includes('eb_language_changed'), 'community.js listens to eb_language_changed');
  assert(communityJs.includes('isFrench()'), 'community.js checks active language dynamically');

  // 4. Check js/watchShorts.js
  const watchShortsJs = fs.readFileSync(path.join(__dirname, '../js/watchShorts.js'), 'utf8');
  // Check Close symbol
  assert(watchShortsJs.includes('btn-close-shorts-modal') && watchShortsJs.includes('close-icon-symbol') && watchShortsJs.includes('✕'), 'watchShorts.js has prominent close symbol ✕');
  // Check 7 Creative Tools
  assert(watchShortsJs.includes('data-tool="text"') && watchShortsJs.includes('Texte Aa'), 'watchShorts.js has Texte Aa tool');
  assert(watchShortsJs.includes('data-tool="effects"') && watchShortsJs.includes('Effet'), 'watchShorts.js has Effet tool');
  assert(watchShortsJs.includes('data-tool="filters"') && watchShortsJs.includes('Filtres'), 'watchShorts.js has Filtres tool');
  assert(watchShortsJs.includes('data-tool="stickers"') && watchShortsJs.includes('Autocollants'), 'watchShorts.js has Autocollants tool');
  assert(watchShortsJs.includes('data-tool="subtitles"') && watchShortsJs.includes('Sous-titre'), 'watchShorts.js has Sous-titre tool');
  assert(watchShortsJs.includes('data-tool="voiceover"') && watchShortsJs.includes('Voix off'), 'watchShorts.js has Voix off tool');
  assert(watchShortsJs.includes('tool-save-gallery') && watchShortsJs.includes('Enregistrer (Galerie)'), 'watchShorts.js has Enregistrer (Galerie) tool');
  assert(watchShortsJs.includes('btn-save-to-gallery-action'), 'watchShorts.js has btn-save-to-gallery-action');
  assert(watchShortsJs.includes('shorts-grid-container'), 'watchShorts.js scrolls/redirects to shorts-grid-container');
  assert(watchShortsJs.includes('creativeEdits'), 'watchShorts.js saves creativeEdits metadata');

  // 5. Check css/style.css
  const styleCss = fs.readFileSync(path.join(__dirname, '../css/style.css'), 'utf8');
  assert(styleCss.includes('.community-filter-bar'), 'style.css has .community-filter-bar');
  assert(styleCss.includes('.community-filter-chip'), 'style.css has .community-filter-chip');
  assert(styleCss.includes('.btn-close-shorts-modal .close-icon-symbol'), 'style.css has close symbol styling');
  assert(styleCss.includes('.short-stage-overlay-container'), 'style.css has .short-stage-overlay-container');
  assert(styleCss.includes('.video-editing-suite'), 'style.css has .video-editing-suite');
  assert(styleCss.includes('.creative-tools-nav'), 'style.css has .creative-tools-nav');
  assert(styleCss.includes('.fx-sparkles'), 'style.css has .fx-sparkles animation');
  assert(styleCss.includes('.fx-glitch'), 'style.css has .fx-glitch animation');
  assert(styleCss.includes('.waveform-anim-bars'), 'style.css has .waveform-anim-bars');

  console.log(`\nRESULTS: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

test();
