/**
 * ENGLISH BOOSTER — AUTHENTICATION & REGISTRATION LOGIC (js/auth.js)
 * Form Validation, Password Strength Meter, Social Auth & Demo Logins
 */

document.addEventListener('DOMContentLoaded', () => {
  initRegisterForm();
  initLoginForm();
  initDemoLogins();
});

// ==========================================================================
// 1. REGISTRATION VALIDATION ENGINE
// ==========================================================================
function initRegisterForm() {
  const registerForm = document.getElementById('register-form');
  if (!registerForm) return;

  const fullNameInput = document.getElementById('reg-fullname');
  const emailInput = document.getElementById('reg-email');
  const passwordInput = document.getElementById('reg-password');
  const phoneInput = document.getElementById('reg-phone');
  const countryInput = document.getElementById('reg-country');
  const nativeLangInput = document.getElementById('reg-native-lang');
  const termsCheckbox = document.getElementById('reg-terms');
  const strengthBar = document.getElementById('password-strength-fill');
  const strengthText = document.getElementById('password-strength-text');
  const confirmPasswordInput = document.getElementById('reg-confirm-password');
  const togglePassBtn = document.getElementById('btn-toggle-register-pass');
  const matchMsg = document.getElementById('register-pass-match-msg');

function isFrenchMode() {
  return (window.EnglishBooster?.isFrench && window.EnglishBooster.isFrench()) || (localStorage.getItem('eb_lang') === 'fr');
}

// Toggle Password Visibility in Register
  if (togglePassBtn && passwordInput) {
    let isVisible = false;
    togglePassBtn.addEventListener('click', () => {
      isVisible = !isVisible;
      const type = isVisible ? 'text' : 'password';
      passwordInput.type = type;
      if (confirmPasswordInput) confirmPasswordInput.type = type;
      const isFr = isFrenchMode();
      togglePassBtn.textContent = isVisible ? (isFr ? '🙈 Masquer' : '🙈 Hide') : (isFr ? '👁️ Afficher' : '👁️ Show');
    });
  }

  // Real-time Confirm Password Match Check
  if (confirmPasswordInput && passwordInput) {
    confirmPasswordInput.addEventListener('input', () => {
      if (!confirmPasswordInput.value) {
        if (matchMsg) matchMsg.style.display = 'none';
        return;
      }
      if (matchMsg) {
        const isFr = isFrenchMode();
        matchMsg.style.display = 'inline-block';
        if (confirmPasswordInput.value === passwordInput.value) {
          matchMsg.style.color = '#22c55e';
          matchMsg.textContent = isFr ? '✓ Correspond' : '✓ Match';
          setValid(confirmPasswordInput);
        } else {
          matchMsg.style.color = '#ef4444';
          matchMsg.textContent = isFr ? '✕ Ne correspond pas' : '✕ No match';
        }
      }
    });
  }

  // Real-time email validation
  if (emailInput) {
    emailInput.addEventListener('input', () => {
      const isFr = isFrenchMode();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        setInvalid(emailInput, isFr ? 'Veuillez entrer une adresse email valide (ex : nom@exemple.com)' : 'Please enter a valid email address (e.g. name@example.com)');
      } else {
        setValid(emailInput);
      }
    });
  }

  // Real-time phone validation (international pattern)
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      const isFr = isFrenchMode();
      const phoneRegex = /^\+?[0-9\s\-\(\)]{7,20}$/;
      if (phoneInput.value.trim() && !phoneRegex.test(phoneInput.value.trim())) {
        setInvalid(phoneInput, isFr ? 'Veuillez entrer un numéro de téléphone valide (ex : +225 07 05 88 46 87)' : 'Please enter a valid phone number (e.g. +225 07 05 88 46 87)');
      } else if (phoneInput.value.trim()) {
        setValid(phoneInput);
      }
    });
  }

  // Real-time password strength analyzer
  if (passwordInput && strengthBar) {
    passwordInput.addEventListener('input', () => {
      const isFr = isFrenchMode();
      const val = passwordInput.value;
      const score = calculatePasswordStrength(val);

      if (val.length === 0) {
        strengthBar.style.width = '0%';
        strengthText.textContent = '';
        clearValidation(passwordInput);
        return;
      }

      if (score < 40) {
        strengthBar.style.width = '33%';
        strengthBar.style.backgroundColor = 'var(--coral-accent)';
        strengthText.textContent = isFr ? 'Faible : Ajoutez des chiffres, symboles et min. 8 caractères' : 'Weak: Add numbers, symbols and min 8 characters';
        strengthText.style.color = 'var(--coral-accent)';
        setInvalid(passwordInput, isFr ? 'Mot de passe trop faible' : 'Password is too weak');
      } else if (score < 80) {
        strengthBar.style.width = '66%';
        strengthBar.style.backgroundColor = 'var(--amber-accent)';
        strengthText.textContent = isFr ? 'Moyen : Bon, ajoutez un caractère spécial pour le renforcer' : 'Medium: Good, add a special character for strong';
        strengthText.style.color = 'var(--amber-accent)';
        setValid(passwordInput);
      } else {
        strengthBar.style.width = '100%';
        strengthBar.style.backgroundColor = 'var(--emerald-accent)';
        strengthText.textContent = isFr ? 'Mot de passe robuste ! 🛡️' : 'Strong password! 🛡️';
        strengthText.style.color = 'var(--emerald-accent)';
        setValid(passwordInput);
      }
    });
  }

  // Form Submission
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const isFr = isFrenchMode();
    let isValid = true;

    // Validate Name
    if (!fullNameInput.value.trim()) {
      setInvalid(fullNameInput, isFr ? 'Le nom complet est requis' : 'Full name is required');
      isValid = false;
    } else {
      setValid(fullNameInput);
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      setInvalid(emailInput, isFr ? 'Une adresse email valide est requise' : 'A valid email address is required');
      isValid = false;
    } else {
      setValid(emailInput);
    }

    // Validate Password
    if (passwordInput.value.length < 6) {
      setInvalid(passwordInput, isFr ? 'Le mot de passe doit contenir au moins 6 caractères' : 'Password must be at least 6 characters');
      isValid = false;
    } else {
      setValid(passwordInput);
    }

    // Validate Confirm Password
    if (confirmPasswordInput) {
      if (!confirmPasswordInput.value || confirmPasswordInput.value !== passwordInput.value) {
        setInvalid(confirmPasswordInput, isFr ? 'Les mots de passe ne correspondent pas' : 'Passwords do not match');
        isValid = false;
      } else {
        setValid(confirmPasswordInput);
      }
    }

    // Validate Terms
    if (termsCheckbox && !termsCheckbox.checked) {
      window.EnglishBooster.showToast(
        isFr ? 'Conditions Requises' : 'Terms Required',
        isFr ? 'Veuillez accepter les Conditions & la Politique de confidentialité pour continuer' : 'Please accept the Terms & Privacy Policy to continue',
        'warning'
      );
      isValid = false;
    }

    if (!isValid) {
      window.EnglishBooster.showToast(
        isFr ? 'Erreur de Validation' : 'Validation Error',
        isFr ? 'Veuillez vérifier les champs surlignés dans le formulaire' : 'Please check highlighted fields in the form',
        'error'
      );
      return;
    }

    // Get selected interests
    const selectedInterests = Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(cb => cb.value);
    const selectedLevel = document.querySelector('input[name="englishLevel"]:checked')?.value || 'B1';
    const selectedGoal = document.getElementById('reg-goal')?.value || 'Improve Speaking';
    const selectedAvatar = document.getElementById('register-avatar-picker-wrap-selected-val')?.value || 'assets/avatars/alex.jpg';

    const newUser = {
      fullName: fullNameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value,
      avatar: selectedAvatar,
      country: countryInput ? countryInput.value : 'Global 🌐',
      phone: phoneInput ? phoneInput.value.trim() : '',
      nativeLanguage: nativeLangInput ? nativeLangInput.value : 'French',
      englishLevel: selectedLevel,
      levelProgress: 15,
      streakDays: 1,
      speakingMinutes: 0,
      xp: 150,
      mainGoal: selectedGoal,
      interests: selectedInterests.length ? selectedInterests : ['Travel', 'Conversations', 'Culture'],
      badges: [{ id: 'welcome', name: 'Welcome Aboard', icon: '🚀', desc: 'Joined English Booster' }],
      isLoggedIn: true
    };

    window.EnglishBooster.updateUserState(newUser);
    if (window.EnglishBooster?.avatarManager) {
      window.EnglishBooster.avatarManager.setAvatar(selectedAvatar, false);
    }
    if (window.EnglishBoosterRegisterMember) {
      window.EnglishBoosterRegisterMember(newUser);
    }
    const isFrToast = isFrenchMode();
    window.EnglishBooster.showToast(
      isFrToast ? 'Compte Créé !' : 'Account Created!',
      isFrToast ? `Bienvenue sur English Booster, ${newUser.fullName} !` : `Welcome to English Booster, ${newUser.fullName}!`,
      'success'
    );
    window.EnglishBooster.launchConfetti(2500);

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1200);
  });
}

function calculatePasswordStrength(pass) {
  let score = 0;
  if (pass.length >= 8) score += 30;
  if (pass.length >= 12) score += 20;
  if (/[A-Z]/.test(pass)) score += 15;
  if (/[0-9]/.test(pass)) score += 15;
  if (/[^A-Za-z0-9]/.test(pass)) score += 20;
  return score;
}

function setInvalid(input, msg) {
  input.classList.add('is-invalid');
  input.classList.remove('is-valid');
  let feedback = input.parentElement.querySelector('.invalid-feedback');
  if (!feedback) {
    feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    input.parentElement.appendChild(feedback);
  }
  feedback.textContent = msg;
}

function setValid(input) {
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
  const feedback = input.parentElement.querySelector('.invalid-feedback');
  if (feedback) feedback.textContent = '';
}

function clearValidation(input) {
  input.classList.remove('is-invalid', 'is-valid');
  const feedback = input.parentElement.querySelector('.invalid-feedback');
  if (feedback) feedback.textContent = '';
}

// ==========================================================================
// 2. LOGIN FORM CONTROLLER
// ==========================================================================
function initLoginForm() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const isFr = isFrenchMode();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
      window.EnglishBooster.showToast(
        isFr ? 'Champs Manquants' : 'Missing Fields',
        isFr ? 'Veuillez entrer votre email et mot de passe' : 'Please enter your email and password',
        'warning'
      );
      return;
    }

    // Simulate login success
    const current = window.EnglishBooster.currentUser || {};
    window.EnglishBooster.updateUserState({
      email: email,
      isLoggedIn: true
    });

    window.EnglishBooster.showToast(
      isFr ? 'Ravi de vous revoir !' : 'Welcome back!',
      isFr ? 'Connexion à English Booster en cours...' : 'Logging into English Booster...',
      'success'
    );
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 800);
  });
}

// ==========================================================================
// 3. SOCIAL LOGINS & DEMO QUICK ACCESS
// ==========================================================================
function initDemoLogins() {
  // Social Login Simulation
  document.querySelectorAll('.btn-social-auth').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isFr = isFrenchMode();
      const provider = btn.getAttribute('data-provider') || 'Google';
      window.EnglishBooster.showToast(
        isFr ? `Connexion avec ${provider}...` : `Connecting with ${provider}...`,
        isFr ? 'Authentification sécurisée de votre compte' : 'Authenticating your account securely',
        'info'
      );
      setTimeout(() => {
        window.EnglishBooster.updateUserState({
          fullName: provider === 'Google' ? 'Alex Rivera (Google)' : 'Alex Rivera (Apple)',
          isLoggedIn: true
        });
        window.EnglishBooster.showToast(
          isFr ? 'Connecté !' : 'Logged in!',
          isFr ? `Vérification réussie avec ${provider}` : `Successfully verified with ${provider}`,
          'success'
        );
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 600);
      }, 900);
    });
  });

  // Demo Accounts Quick Switcher
  document.querySelectorAll('.btn-demo-login').forEach(btn => {
    btn.addEventListener('click', () => {
      const isFr = isFrenchMode();
      const demoType = btn.getAttribute('data-demo-user');
      let demoUser = {};

      if (demoType === 'sofia') {
        demoUser = {
          fullName: 'Sofia Martínez',
          email: 'sofia.martinez@example.es',
          country: 'Spain 🇪🇸',
          nativeLanguage: 'Spanish',
          englishLevel: 'B1',
          levelProgress: 68,
          streakDays: 7,
          speakingMinutes: 124,
          xp: 2450,
          mainGoal: isFr ? 'Pratique Orale & Voyages' : 'Improve Speaking & Travel',
          interests: ['Travel', 'Music', 'Movies', 'Food'],
          isLoggedIn: true
        };
      } else if (demoType === 'tychique') {
        demoUser = {
          fullName: 'Tychique Bongo',
          email: 'tychiquebongo@gmail.com',
          country: 'Ivory Coast 🇨🇮',
          nativeLanguage: 'French',
          englishLevel: 'C2',
          levelProgress: 98,
          streakDays: 45,
          speakingMinutes: 980,
          xp: 15400,
          mainGoal: isFr ? 'Leadership EdTech & Affaires Internationales' : 'EdTech Leadership & Global Business',
          interests: ['Technology', 'Public Speaking', 'Startups', 'Education'],
          isLoggedIn: true
        };
      } else {
        demoUser = {
          fullName: 'Kenji Sato',
          email: 'kenji.sato@example.jp',
          country: 'Japan 🇯🇵',
          nativeLanguage: 'Japanese',
          englishLevel: 'B2',
          levelProgress: 82,
          streakDays: 14,
          speakingMinutes: 310,
          xp: 4120,
          mainGoal: isFr ? 'Carrière & Génie Logiciel' : 'Career & Software Engineering',
          interests: ['Coding', 'Gaming', 'Anime', 'Tech'],
          isLoggedIn: true
        };
      }

      window.EnglishBooster.updateUserState(demoUser);
      window.EnglishBooster.showToast(
        isFr ? 'Compte Démo Chargé' : 'Demo User Loaded',
        isFr ? `Connecté en tant que ${demoUser.fullName} (${demoUser.englishLevel})` : `Now logged in as ${demoUser.fullName} (${demoUser.englishLevel})`,
        'success'
      );
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 700);
    });
  });
}
