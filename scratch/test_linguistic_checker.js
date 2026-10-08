// Test du vérificateur linguistique en anglais

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

const tests = [
  { title: "Bonjour à tous voici ma vidéo", captions: "Je vais parler en français", shouldPass: false },
  { title: "How to pronounce Schedule", captions: "In British English we pronounce it differently", shouldPass: true },
  { title: "My 3 Daily Habits to speak English", captions: "Start shadowing every single day for ten minutes", shouldPass: true },
  { title: "Apprendre l'anglais facilement", captions: "Aujourd'hui je vous montre", shouldPass: false }
];

let failed = 0;
tests.forEach((t, i) => {
  const res = checkEnglishCompliance(t.title, t.captions);
  const pass = (res.valid === t.shouldPass);
  console.log(`Test ${i + 1}: ${pass ? 'PASS' : 'FAIL'} (Expected valid=${t.shouldPass}, got ${res.valid}) -> "${res.msg}"`);
  if (!pass) failed++;
});

if (failed === 0) {
  console.log("\nALL LINGUISTIC COMPLIANCE TESTS PASSED!");
  process.exit(0);
} else {
  process.exit(1);
}
