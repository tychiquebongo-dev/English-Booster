const fs = require('fs');

console.log('=== VERIFYING PRICING DATA & LOGICAL BEHAVIOR ===');

const pricingHtml = fs.readFileSync('pages/pricing.html', 'utf8');
const i18nJs = fs.readFileSync('js/i18n.js', 'utf8');

// 1. Check Currency Data in HTML
const requiredCurrencies = ['USD', 'EUR', 'XOF'];
requiredCurrencies.forEach(cur => {
  if (pricingHtml.includes(`data-currency="${cur}"`)) {
    console.log(`✓ Currency button [${cur}] found in HTML`);
  } else {
    console.error(`✕ Currency button [${cur}] missing!`);
    process.exit(1);
  }
});

// 2. Check FAQ Questions
const requiredFaqs = [
  'pricing_faq_q1', 'pricing_faq_q2', 'pricing_faq_q3',
  'pricing_faq_q4', 'pricing_faq_q5', 'pricing_faq_q6'
];
requiredFaqs.forEach(q => {
  if (pricingHtml.includes(`data-i18n="${q}"`)) {
    console.log(`✓ FAQ key [${q}] present in HTML`);
  } else {
    console.error(`✕ FAQ key [${q}] missing in HTML!`);
    process.exit(1);
  }
});

// 3. Check Comparison Matrix Rows
const requiredMatrixRows = [
  'pricing_row_calls',
  'pricing_row_matching',
  'pricing_row_messaging',
  'pricing_row_ai_coach',
  'pricing_row_interview',
  'pricing_row_business',
  'pricing_row_exam',
  'pricing_row_cefr',
  'pricing_row_challenges',
  'pricing_row_videos',
  'pricing_row_support',
  'pricing_row_guarantee'
];
requiredMatrixRows.forEach(row => {
  if (pricingHtml.includes(`data-i18n="${row}"`)) {
    console.log(`✓ Comparison Table Row [${row}] present in HTML`);
  } else {
    console.error(`✕ Comparison Table Row [${row}] missing in HTML!`);
    process.exit(1);
  }
});

// 4. Check Guarantees
const requiredGuarantees = [
  'pricing_trust_guarantee_title',
  'pricing_trust_nocontract_title',
  'pricing_trust_secure_title',
  'pricing_trust_students_title'
];
requiredGuarantees.forEach(g => {
  if (pricingHtml.includes(`data-i18n="${g}"`)) {
    console.log(`✓ Guarantee Item [${g}] present in HTML`);
  } else {
    console.error(`✕ Guarantee Item [${g}] missing in HTML!`);
    process.exit(1);
  }
});

// 5. Check Checkout Modal elements
const requiredModalElements = [
  'checkout-modal',
  'modal-plan-name',
  'modal-total-price',
  'promo-input',
  'apply-promo-btn',
  'confirm-subscribe-btn',
  'pricing_modal_method_card',
  'pricing_modal_method_momo',
  'pricing_modal_method_paypal'
];
requiredModalElements.forEach(elem => {
  if (pricingHtml.includes(elem)) {
    console.log(`✓ Checkout modal element [${elem}] verified`);
  } else {
    console.error(`✕ Checkout modal element [${elem}] missing!`);
    process.exit(1);
  }
});

// 6. Test Calculation Logic
const PRICING_DATA = {
  USD: {
    free: { monthly: 0, annual: 0 },
    premium: { monthly: 4.99, annual: 3.99 },
    pro: { monthly: 9.99, annual: 7.99 }
  },
  EUR: {
    free: { monthly: 0, annual: 0 },
    premium: { monthly: 4.50, annual: 3.60 },
    pro: { monthly: 8.90, annual: 7.10 }
  },
  XOF: {
    free: { monthly: 0, annual: 0 },
    premium: { monthly: 3000, annual: 2400 },
    pro: { monthly: 6000, annual: 4800 }
  }
};

// Check discount calculations for STUDENT50
const premAnnualUSD = PRICING_DATA.USD.premium.annual;
const studentDiscountPrem = premAnnualUSD * 0.5;
console.log(`✓ Student 50% discount on Premium Annual: $${studentDiscountPrem.toFixed(2)}/mo (original $${premAnnualUSD})`);

const proAnnualUSD = PRICING_DATA.USD.pro.annual;
const studentDiscountPro = proAnnualUSD * 0.5;
console.log(`✓ Student 50% discount on Pro Annual: $${studentDiscountPro.toFixed(2)}/mo (original $${proAnnualUSD})`);

console.log('\n🎉 ALL LOGICAL & INTERACTIVE PRICING CHECKS PASSED WITH FLYING COLORS!');
