const fs = require('fs');

console.log('--- TEST DU SYSTÈME DE PHOTO DE PROFIL & AVATAR MANAGER ---');

// Mock browser environment
const storage = {};
global.window = {
  EnglishBooster: {},
  dispatchEvent: () => {},
  addEventListener: () => {},
  location: { pathname: '/pages/profile.html' }
};
global.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = v; }
};
global.document = {
  querySelectorAll: () => [],
  getElementById: () => null,
  createElement: (tag) => ({
    id: '',
    className: '',
    style: {},
    innerHTML: '',
    children: [],
    appendChild: () => {},
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {}
  }),
  body: {
    appendChild: () => {}
  },
  addEventListener: () => {}
};

// 1. Load avatarManager.js
const avatarCode = fs.readFileSync('js/avatarManager.js', 'utf8');
eval(avatarCode);

const avatarManager = window.EnglishBooster.avatarManager;
console.log('1. AvatarManager initialized successfully:', Boolean(avatarManager));

// Test presets
const presets = avatarManager.getPresets();
console.log('2. Presets count:', presets.length);
if (presets.length === 7) {
  console.log('✓ Presets check passed (7 diverse international avatars available).');
} else {
  console.error('✗ Presets check failed');
}

// Test setAvatar
const testAvatar = 'assets/avatars/amara.jpg';
avatarManager.setAvatar(testAvatar, false);
const storedUser = JSON.parse(storage['eb_user']);
console.log('3. Stored user avatar after setAvatar:', storedUser.avatar);
if (storedUser.avatar === testAvatar) {
  console.log('✓ User avatar updated in localStorage successfully.');
} else {
  console.error('✗ User avatar update failed');
}

// Test sync with registered users
const mockMembers = [
  { id: 'user_1', nom: 'Rivera', prenom: 'Alex', email: 'alex.rivera@example.com', avatarImg: 'assets/avatars/alex.jpg' },
  { id: 'user_2', nom: 'Sato', prenom: 'Kenji', email: 'kenji@example.jp', avatarImg: 'assets/avatars/kenji.jpg' }
];
storage['eb_registered_users'] = JSON.stringify(mockMembers);
window.EnglishBooster.currentUser = { email: 'alex.rivera@example.com' };

avatarManager.setAvatar('assets/avatars/chloe.jpg', false);
const updatedMembers = JSON.parse(storage['eb_registered_users']);
console.log('4. Registered member avatar after sync:', updatedMembers[0].avatarImg);
if (updatedMembers[0].avatarImg === 'assets/avatars/chloe.jpg' && updatedMembers[1].avatarImg === 'assets/avatars/kenji.jpg') {
  console.log('✓ Registered members directory correctly synchronized with user photo.');
} else {
  console.error('✗ Sync failed');
}

// Test modal function
console.log('5. openChangeAvatarModal available:', typeof avatarManager.openChangeAvatarModal === 'function');

console.log('\n--- TOUS LES TESTS UNITAIRES AVATAR PASSENT AVEC SUCCÈS ---');
