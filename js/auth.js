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

  // Real-time email validation
  if (emailInput) {
    emailInput.addEventListener('input', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        setInvalid(emailInput, 'Please enter a valid email address (e.g. name@example.com)');
      } else {
        setValid(emailInput);
      }
    });
  }

  // Real-time phone validation (international pattern)
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      const phoneRegex = /^\+?[0-9\s\-\(\)]{7,20}$/;
      if (phoneInput.value.trim() && !phoneRegex.test(phoneInput.value.trim())) {
        setInvalid(phoneInput, 'Please enter a valid phone number (e.g. +225 07 05 88 46 87)');
      } else if (phoneInput.value.trim()) {
        setValid(phoneInput);
      }
    });
  }

  // Real-time password strength analyzer
  if (passwordInput && strengthBar) {
    passwordInput.addEventListener('input', () => {
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
        strengthText.textContent = 'Weak: Add numbers, symbols and min 8 characters';
        strengthText.style.color = 'var(--coral-accent)';
        setInvalid(passwordInput, 'Password is too weak');
      } else if (score < 80) {
        strengthBar.style.width = '66%';
        strengthBar.style.backgroundColor = 'var(--amber-accent)';
        strengthText.textContent = 'Medium: Good, add a special character for strong';
        strengthText.style.color = 'var(--amber-accent)';
        setValid(passwordInput);
      } else {
        strengthBar.style.width = '100%';
        strengthBar.style.backgroundColor = 'var(--emerald-accent)';
        strengthText.textContent = 'Strong password! 🛡️';
        strengthText.style.color = 'var(--emerald-accent)';
        setValid(passwordInput);
      }
    });
  }

  // Form Submission
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Name
    if (!fullNameInput.value.trim()) {
      setInvalid(fullNameInput, 'Full name is required');
      isValid = false;
    } else {
      setValid(fullNameInput);
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      setInvalid(emailInput, 'A valid email address is required');
      isValid = false;
    } else {
      setValid(emailInput);
    }

    // Validate Password
    if (passwordInput.value.length < 6) {
      setInvalid(passwordInput, 'Password must be at least 6 characters');
      isValid = false;
    }

    // Validate Terms
    if (termsCheckbox && !termsCheckbox.checked) {
      window.EnglishBooster.showToast('Terms Required', 'Please accept the Terms & Privacy Policy to continue', 'warning');
      isValid = false;
    }

    if (!isValid) {
      window.EnglishBooster.showToast('Validation Error', 'Please check highlighted fields in the form', 'error');
      return;
    }

    // Get selected interests
    const selectedInterests = Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(cb => cb.value);
    const selectedLevel = document.querySelector('input[name="englishLevel"]:checked')?.value || 'B1';
    const selectedGoal = document.getElementById('reg-goal')?.value || 'Improve Speaking';

    const newUser = {
      fullName: fullNameInput.value.trim(),
      email: emailInput.value.trim(),
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
    window.EnglishBooster.showToast('Account Created!', `Welcome to English Booster, ${newUser.fullName}!`, 'success');
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
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
      window.EnglishBooster.showToast('Missing Fields', 'Please enter your email and password', 'warning');
      return;
    }

    // Simulate login success
    const current = window.EnglishBooster.currentUser || {};
    window.EnglishBooster.updateUserState({
      email: email,
      isLoggedIn: true
    });

    window.EnglishBooster.showToast('Welcome back!', 'Logging into English Booster...', 'success');
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
      const provider = btn.getAttribute('data-provider') || 'Google';
      window.EnglishBooster.showToast(`Connecting with ${provider}...`, 'Authenticating your account securely', 'info');
      setTimeout(() => {
        window.EnglishBooster.updateUserState({
          fullName: provider === 'Google' ? 'Alex Rivera (Google)' : 'Alex Rivera (Apple)',
          isLoggedIn: true
        });
        window.EnglishBooster.showToast('Logged in!', `Successfully verified with ${provider}`, 'success');
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 600);
      }, 900);
    });
  });

  // Demo Accounts Quick Switcher
  document.querySelectorAll('.btn-demo-login').forEach(btn => {
    btn.addEventListener('click', () => {
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
          mainGoal: 'Improve Speaking & Travel',
          interests: ['Travel', 'Music', 'Movies', 'Food'],
          isLoggedIn: true
        };
      } else if (demoType === 'tychique') {
        demoUser = {
          fullName: 'Tychique Bongo',
          email: 'tychiquebongo@englishbooster.io',
          country: 'Ivory Coast 🇨🇮',
          nativeLanguage: 'French',
          englishLevel: 'C2',
          levelProgress: 98,
          streakDays: 45,
          speakingMinutes: 980,
          xp: 15400,
          mainGoal: 'EdTech Leadership & Global Business',
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
          mainGoal: 'Career & Software Engineering',
          interests: ['Coding', 'Gaming', 'Anime', 'Tech'],
          isLoggedIn: true
        };
      }

      window.EnglishBooster.updateUserState(demoUser);
      window.EnglishBooster.showToast('Demo User Loaded', `Now logged in as ${demoUser.fullName} (${demoUser.englishLevel})`, 'success');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 700);
    });
  });
}
