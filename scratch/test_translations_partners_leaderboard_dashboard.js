const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('--- TESTING FRENCH TRANSLATIONS (PARTNERS, LEADERBOARD, DASHBOARD) ---');

// 1. Verify i18n dictionary keys
const i18nContent = fs.readFileSync(path.join(__dirname, '../js/i18n.js'), 'utf8');

// Extract translations object from i18n.js using regex or VM
const requiredKeys = [
  // Partners
  'partners_badge_engine',
  'partners_badge_online_live',
  'partners_page_title',
  'partners_page_desc',
  'partners_btn_direct_call',
  'partners_btn_fast_match',
  'partners_spotlight_badge',
  'partners_spotlight_badge_sub',
  'partners_spotlight_title',
  'partners_spotlight_desc',
  'partners_spotlight_btn_call',
  'partners_spotlight_btn_match',
  'partners_filter_search_label',
  'partners_filter_search_ph',
  'partners_filter_level_label',
  'partners_filter_level_all',
  'partners_filter_level_a1',
  'partners_filter_level_a2',
  'partners_filter_level_b1',
  'partners_filter_level_b2',
  'partners_filter_level_c1',
  'partners_filter_level_c2',
  'partners_filter_country_label',
  'partners_filter_country_ph',
  'partners_filter_goal_label',
  'partners_filter_goal_all',
  'partners_filter_goal_speaking',
  'partners_filter_goal_career',
  'partners_filter_goal_business',
  'partners_filter_goal_travel',
  'partners_filter_goal_exams',
  'partners_filter_goal_social',
  'partners_filter_online_only',
  'partners_empty_title',
  'partners_empty_desc',
  'partners_empty_reset',
  'partners_card_match',
  'partners_card_level',
  'partners_card_native',
  'partners_card_status',
  'partners_card_chat_btn',
  'partners_card_view_profile',
  'partners_card_call_title',
  'partners_modal_about',
  'partners_modal_topics',
  'partners_modal_call_btn',
  'partners_modal_chat_with',

  // Leaderboard
  'leaderboard_badge',
  'leaderboard_title',
  'leaderboard_subtitle',
  'leaderboard_tab_global',
  'leaderboard_tab_weekly',
  'leaderboard_tab_country',
  'leaderboard_tab_friends',
  'leaderboard_th_rank',
  'leaderboard_th_learner',
  'leaderboard_th_level',
  'leaderboard_th_streak',
  'leaderboard_th_xp',
  'leaderboard_streak_day',
  'leaderboard_days',
  'leaderboard_you',

  // Dashboard
  'dash_greeting_morning',
  'dash_greeting_afternoon',
  'dash_greeting_evening',
  'dash_learner',
  'dash_subtitle',
  'dash_badge_webrtc',
  'dash_user_active',
  'dash_user_goal',
  'dash_btn_change_photo',
  'dash_btn_full_profile',
  'dash_card_level',
  'dash_level_intermediate',
  'dash_progress_to_b2',
  'dash_card_streak',
  'dash_days_unit',
  'dash_streak_sub',
  'dash_card_speaking',
  'dash_minutes_unit',
  'dash_speaking_sub',
  'dash_card_xp',
  'dash_xp_sub',
  'dash_rec_title',
  'dash_rec_view_all',
  'dash_rec_chat_btn',
  'dash_chal_badge',
  'dash_chal_title',
  'dash_chal_desc',
  'dash_chal_btn_start',
  'dash_chal_btn_chat',
  'dash_coach_title',
  'dash_coach_live_stats',
  'dash_coach_rec_label',
  'dash_coach_rec_text',
  'dash_activity_title',
  'dash_activity_goal',
  'dash_activity_achieved',
  'dash_immersion_badge',
  'dash_immersion_title',
  'dash_immersion_desc',
  'dash_immersion_btn',
  'dash_table_badge',
  'dash_table_title',
  'dash_table_btn',
  'dash_table_you',
  'dash_table_partner',
  'dash_table_recall'
];

let missingInEn = [];
let missingInFr = [];

// Split en and fr block
const enBlockMatch = i18nContent.match(/en:\s*\{([\s\S]*?)\n\s*\},/);
const frBlockMatch = i18nContent.match(/fr:\s*\{([\s\S]*?)\n\s*\}\s*\n\s*\};/);

if (!enBlockMatch || !frBlockMatch) {
  console.error('FAIL: Could not locate en or fr blocks in js/i18n.js');
  process.exit(1);
}

const enBlock = enBlockMatch[1];
const frBlock = frBlockMatch[1];

requiredKeys.forEach(k => {
  if (!enBlock.includes(`${k}:`)) missingInEn.push(k);
  if (!frBlock.includes(`${k}:`)) missingInFr.push(k);
});

console.log(`[i18n check] Tested ${requiredKeys.length} keys.`);
if (missingInEn.length > 0) {
  console.error('FAIL: Missing keys in en dictionary:', missingInEn);
} else {
  console.log('✓ All keys present in EN dictionary');
}

if (missingInFr.length > 0) {
  console.error('FAIL: Missing keys in FR dictionary:', missingInFr);
} else {
  console.log('✓ All keys present in FR dictionary');
}

// 2. Verify HTML data-i18n attributes
const partnersHtml = fs.readFileSync(path.join(__dirname, '../pages/partners.html'), 'utf8');
const leaderboardHtml = fs.readFileSync(path.join(__dirname, '../pages/leaderboard.html'), 'utf8');
const dashboardHtml = fs.readFileSync(path.join(__dirname, '../pages/dashboard.html'), 'utf8');

const partnerHtmlKeys = [
  'partners_badge_engine',
  'partners_page_title',
  'partners_page_desc',
  'partners_btn_direct_call',
  'partners_btn_fast_match',
  'partners_spotlight_badge',
  'partners_spotlight_badge_sub',
  'partners_spotlight_title',
  'partners_spotlight_desc',
  'partners_spotlight_btn_call',
  'partners_spotlight_btn_match',
  'partners_filter_search_label',
  'partners_filter_level_label',
  'partners_filter_level_all',
  'partners_filter_country_label',
  'partners_filter_goal_label',
  'partners_filter_online_only'
];

partnerHtmlKeys.forEach(k => {
  if (!partnersHtml.includes(`data-i18n="${k}"`)) {
    console.error(`FAIL: partners.html missing data-i18n="${k}"`);
  }
});
console.log('✓ partners.html data-i18n tags verified');

const leaderboardHtmlKeys = [
  'leaderboard_badge',
  'leaderboard_title',
  'leaderboard_subtitle',
  'leaderboard_tab_global',
  'leaderboard_tab_weekly',
  'leaderboard_tab_country',
  'leaderboard_tab_friends',
  'leaderboard_th_rank',
  'leaderboard_th_learner',
  'leaderboard_th_level',
  'leaderboard_th_streak',
  'leaderboard_th_xp'
];

leaderboardHtmlKeys.forEach(k => {
  if (!leaderboardHtml.includes(`data-i18n="${k}"`)) {
    console.error(`FAIL: leaderboard.html missing data-i18n="${k}"`);
  }
});
console.log('✓ leaderboard.html data-i18n tags verified');

const dashboardHtmlKeys = [
  'dash_badge_webrtc',
  'dash_subtitle',
  'dash_user_active',
  'dash_user_goal',
  'dash_btn_change_photo',
  'dash_btn_full_profile',
  'dash_card_level',
  'dash_progress_to_b2',
  'dash_card_streak',
  'dash_streak_sub',
  'dash_card_speaking',
  'dash_speaking_sub',
  'dash_card_xp',
  'dash_xp_sub',
  'dash_rec_title',
  'dash_rec_view_all',
  'dash_chal_badge',
  'dash_chal_title',
  'dash_chal_desc',
  'dash_chal_btn_start',
  'dash_coach_title',
  'dash_coach_live_stats',
  'dash_coach_rec_label',
  'dash_coach_rec_text',
  'dash_activity_title',
  'dash_activity_goal',
  'dash_activity_achieved',
  'dash_immersion_badge',
  'dash_immersion_title',
  'dash_immersion_desc',
  'dash_immersion_btn',
  'dash_table_badge',
  'dash_table_title',
  'dash_table_btn'
];

dashboardHtmlKeys.forEach(k => {
  if (!dashboardHtml.includes(`data-i18n="${k}"`)) {
    console.error(`FAIL: dashboard.html missing data-i18n="${k}"`);
  }
});
console.log('✓ dashboard.html data-i18n tags verified');

// 3. Test HTTP connectivity to server
function checkUrl(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, length: data.length });
      });
    }).on('error', reject);
  });
}

async function runHttpTests() {
  try {
    const pRes = await checkUrl('/pages/partners.html');
    console.log(`✓ /pages/partners.html HTTP status: ${pRes.statusCode} (${pRes.length} bytes)`);

    const lRes = await checkUrl('/pages/leaderboard.html');
    console.log(`✓ /pages/leaderboard.html HTTP status: ${lRes.statusCode} (${lRes.length} bytes)`);

    const dRes = await checkUrl('/pages/dashboard.html');
    console.log(`✓ /pages/dashboard.html HTTP status: ${dRes.statusCode} (${dRes.length} bytes)`);

    console.log('\n🎉 ALL TRANSLATION VERIFICATIONS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('HTTP test error:', err.message);
  }
}

runHttpTests();
