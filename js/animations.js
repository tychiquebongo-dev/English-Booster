/**
 * ENGLISH BOOSTER — ANIMATIONS & INTERACTION CONTROLLER (js/animations.js)
 * Scroll Reveal, Number Counters, Dynamic Glass Highlights
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initStatCounters();
  initCrystalMouseParallax();
});

// ==========================================================================
// 1. SCROLL REVEAL OBSERVER
// ==========================================================================
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-init');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// ==========================================================================
// 2. STATISTICAL NUMBER COUNTER ANIMATIONS
// ==========================================================================
function initStatCounters() {
  const counters = document.querySelectorAll('[data-counter-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCounter(el);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-counter-target'), 10);
  const suffix = el.getAttribute('data-counter-suffix') || '';
  const duration = 2000;
  const startTimestamp = performance.now();

  function step(currentTimestamp) {
    const progress = Math.min((currentTimestamp - startTimestamp) / duration, 1);
    // Ease out cubic
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(easeProgress * target);

    el.textContent = currentValue.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target.toLocaleString() + suffix;
    }
  }

  requestAnimationFrame(step);
}

// ==========================================================================
// 3. CRYSTAL PARALLAX & MOUSE GLOW
// ==========================================================================
function initCrystalMouseParallax() {
  const orbs = document.querySelectorAll('.crystal-orb');
  if (!orbs.length) return;

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 40;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 40;
  }, { passive: true });

  function renderParallax() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 0.4;
      orb.style.transform = `translate(${currentX * factor}px, ${currentY * factor}px)`;
    });

    requestAnimationFrame(renderParallax);
  }

  renderParallax();
}
