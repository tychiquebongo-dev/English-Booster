const fs = require('fs');

const dynamicCss = `
/* ==========================================================================
   DYNAMIC INTERACTIVITY ENGINE & MICRO-ANIMATIONS (v2.5)
   ========================================================================== */

/* 1. Dynamic 3D Card Tilt & Holographic Glare */
.tilt-card {
  transition: transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease, border-color 0.25s ease;
  will-change: transform;
  transform-style: preserve-3d;
  position: relative;
}

.tilt-card:hover {
  border-color: rgba(96, 165, 250, 0.45) !important;
  box-shadow: 0 18px 40px -10px rgba(0, 0, 0, 0.65), 0 0 24px rgba(96, 165, 250, 0.22) !important;
}

.glare-overlay {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.12) 0%, transparent 65%);
  opacity: 0;
  transition: opacity 0.3s ease;
  mix-blend-mode: overlay;
  z-index: 3;
}

.tilt-card:hover .glare-overlay {
  opacity: 1;
}

/* 2. Magnetic and Ripple Button Effects */
.btn {
  position: relative;
  overflow: hidden;
}

.eb-ripple {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(96, 165, 250, 0.75) 0%, rgba(74, 222, 128, 0.4) 60%, transparent 80%);
  transform: scale(0);
  pointer-events: none;
  animation: ebRippleAnim 0.55s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
  z-index: 10;
}

@keyframes ebRippleAnim {
  0% {
    transform: scale(0);
    opacity: 0.85;
  }
  100% {
    transform: scale(2.8);
    opacity: 0;
  }
}

/* 3. Floating Gamification XP Particle Flyout */
.eb-xp-particle {
  position: fixed;
  font-family: var(--font-heading, sans-serif);
  font-weight: 900;
  font-size: 1.15rem;
  color: #4ade80;
  text-shadow: 0 0 12px rgba(74, 222, 128, 0.8);
  pointer-events: none;
  z-index: 10001;
  animation: ebXpFly 1.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  display: flex;
  align-items: center;
  gap: 4px;
}

@keyframes ebXpFly {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.6);
  }
  20% {
    opacity: 1;
    transform: translate(0, -20px) scale(1.2);
  }
  80% {
    opacity: 1;
    transform: translate(0, -60px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(0, -90px) scale(0.8);
  }
}

/* 4. Global Live Activity Ticker (Pulse of the World) */
.eb-live-ticker-wrap {
  position: fixed;
  left: 24px;
  bottom: 24px;
  z-index: 990;
  max-width: 400px;
  width: calc(100% - 48px);
  pointer-events: auto;
  font-family: var(--font-body, sans-serif);
}

.eb-live-ticker-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: rgba(10, 16, 30, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1.5px solid rgba(74, 222, 128, 0.35);
  border-radius: 999px;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.5), 0 0 20px rgba(74, 222, 128, 0.16);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, border-color 0.3s ease;
  cursor: pointer;
  animation: ebTickerSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.eb-live-ticker-card:hover {
  transform: translateY(-2px);
  border-color: rgba(96, 165, 250, 0.65);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.6), 0 0 26px rgba(96, 165, 250, 0.28);
}

@keyframes ebTickerSlideIn {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.eb-live-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 10px #4ade80;
  position: relative;
  flex-shrink: 0;
}

.eb-live-dot::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 1.5px solid #4ade80;
  animation: ebPulseRing 1.8s infinite;
}

@keyframes ebPulseRing {
  0% { transform: scale(0.8); opacity: 0.95; }
  100% { transform: scale(2.3); opacity: 0; }
}

.eb-ticker-avatar-wrap {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: visible;
  flex-shrink: 0;
}

.eb-ticker-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.eb-ticker-flag {
  position: absolute;
  bottom: -2px;
  right: -3px;
  font-size: 0.75rem;
  line-height: 1;
  background: rgba(0,0,0,0.6);
  border-radius: 50%;
  padding: 1px;
}

.eb-ticker-body {
  flex: 1;
  min-width: 0;
}

.eb-ticker-name {
  font-size: 0.82rem;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.eb-ticker-text {
  font-size: 0.74rem;
  color: var(--text-muted, #94a3b8);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.eb-ticker-action-btn {
  background: rgba(74, 222, 128, 0.16);
  border: 1px solid rgba(74, 222, 128, 0.4);
  color: #4ade80;
  font-size: 0.72rem;
  font-weight: 800;
  padding: 5px 10px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

.eb-ticker-action-btn:hover {
  background: #4ade80;
  color: #030712;
  transform: scale(1.06);
  box-shadow: 0 0 12px rgba(74, 222, 128, 0.5);
}

/* 5. Dynamic Radar Scanner Modal */
.eb-radar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(3, 7, 18, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ebFadeIn 0.3s ease;
}

@keyframes ebFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.eb-radar-box {
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(10, 16, 30, 0.98));
  border: 1px solid rgba(74, 222, 128, 0.45);
  box-shadow: 0 25px 65px rgba(0, 0, 0, 0.85), 0 0 45px rgba(74, 222, 128, 0.25);
  border-radius: 28px;
  padding: 28px;
  max-width: 520px;
  width: 100%;
  position: relative;
  text-align: center;
  color: #ffffff;
}

.eb-radar-screen {
  width: 250px;
  height: 250px;
  margin: 18px auto;
  border-radius: 50%;
  position: relative;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(3, 7, 18, 0.95) 75%);
  border: 2px solid rgba(74, 222, 128, 0.5);
  box-shadow: inset 0 0 35px rgba(74, 222, 128, 0.2), 0 0 25px rgba(74, 222, 128, 0.2);
  overflow: hidden;
}

.eb-radar-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px dashed rgba(74, 222, 128, 0.25);
  margin: auto;
}
.eb-radar-ring-1 { width: 34%; height: 34%; }
.eb-radar-ring-2 { width: 68%; height: 68%; }
.eb-radar-cross-h, .eb-radar-cross-v {
  position: absolute;
  background: rgba(74, 222, 128, 0.18);
}
.eb-radar-cross-h { left: 0; right: 0; top: 50%; height: 1px; }
.eb-radar-cross-v { top: 0; bottom: 0; left: 50%; width: 1px; }

.eb-radar-sweep {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 125px;
  height: 125px;
  transform-origin: 0 0;
  background: conic-gradient(from 0deg, transparent 0deg, transparent 310deg, rgba(74, 222, 128, 0.45) 360deg);
  animation: ebRadarSweepAnim 2.5s linear infinite;
  pointer-events: none;
}

@keyframes ebRadarSweepAnim {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.eb-radar-blip {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 14px #4ade80;
  transform: translate(-50%, -50%);
  animation: ebBlipPulse 1.6s infinite;
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
}

@keyframes ebBlipPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.95; }
  50% { transform: translate(-50%, -50%) scale(1.6); opacity: 0.45; }
}

.eb-radar-matched-card {
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(74, 222, 128, 0.4);
  border-radius: 18px;
  padding: 16px;
  margin-top: 14px;
  display: flex;
  align-items: center;
  gap: 14px;
  text-align: left;
  animation: ebSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes ebSlideUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 6. Dynamic Voice Gym & Real-Time Mic Spectrum Visualizer */
.eb-voice-gym-box {
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(20, 15, 38, 0.96));
  border: 1px solid rgba(96, 165, 250, 0.45);
  box-shadow: 0 25px 65px rgba(0, 0, 0, 0.85), 0 0 45px rgba(96, 165, 250, 0.28);
  border-radius: 28px;
  padding: 28px;
  max-width: 540px;
  width: 100%;
  text-align: center;
  color: #ffffff;
}

.eb-visualizer-canvas {
  width: 100%;
  height: 120px;
  border-radius: 16px;
  background: rgba(3, 7, 18, 0.75);
  border: 1px solid rgba(96, 165, 250, 0.25);
  margin: 14px 0;
  display: block;
}

.eb-voice-meter-wrap {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  overflow: hidden;
  margin: 10px 0 16px;
}

.eb-voice-meter-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #4ade80, #60a5fa, #c084fc);
  border-radius: 999px;
  transition: width 0.08s ease;
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.5);
}

.eb-voice-stat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 16px;
}

.eb-voice-stat-box {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 10px 8px;
}

.eb-voice-stat-val {
  font-size: 1.25rem;
  font-weight: 800;
  font-family: var(--font-heading, sans-serif);
  color: #38bdf8;
}

.eb-voice-stat-lbl {
  font-size: 0.72rem;
  color: var(--text-muted, #94a3b8);
  text-transform: uppercase;
}

/* 7. Floating Booster Quick Hub (Speed Dial) */
.eb-quick-hub {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 995;
  font-family: var(--font-body, sans-serif);
}

.eb-hub-btn-main {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981, #3b82f6);
  border: 2px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.45), 0 0 20px rgba(59, 130, 246, 0.35);
  color: #ffffff;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.eb-hub-btn-main:hover {
  transform: scale(1.1) rotate(15deg);
  box-shadow: 0 12px 32px rgba(16, 185, 129, 0.6), 0 0 28px rgba(59, 130, 246, 0.5);
}

.eb-hub-menu {
  position: absolute;
  bottom: 68px;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(20px) scale(0.9);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  min-width: 220px;
}

.eb-quick-hub.open .eb-hub-menu {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0) scale(1);
}

.eb-hub-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: rgba(10, 16, 30, 0.94);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(96, 165, 250, 0.35);
  border-radius: 999px;
  color: #ffffff;
  font-size: 0.86rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  transition: all 0.2s ease;
  text-decoration: none;
}

.eb-hub-item:hover {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(59, 130, 246, 0.25));
  border-color: rgba(74, 222, 128, 0.65);
  transform: translateX(-4px);
  color: #ffffff;
}

.eb-hub-item-icon {
  font-size: 1.15rem;
}

/* Light Mode Overrides */
[data-theme="light"] .eb-live-ticker-card {
  background: rgba(255, 255, 255, 0.94);
  border-color: rgba(16, 185, 129, 0.4);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12), 0 0 16px rgba(16, 185, 129, 0.15);
}
[data-theme="light"] .eb-ticker-name {
  color: #0f172a;
}
[data-theme="light"] .eb-radar-box,
[data-theme="light"] .eb-voice-gym-box {
  background: #ffffff;
  color: #0f172a;
  border-color: rgba(16, 185, 129, 0.35);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}
[data-theme="light"] .eb-radar-screen {
  background: radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, #f8fafc 85%);
  border-color: rgba(16, 185, 129, 0.5);
}
[data-theme="light"] .eb-hub-item {
  background: rgba(255, 255, 255, 0.96);
  color: #0f172a;
  border-color: rgba(59, 130, 246, 0.3);
}

@media (max-width: 768px) {
  .eb-live-ticker-wrap {
    bottom: 84px;
    left: 12px;
    right: 12px;
    max-width: calc(100% - 24px);
    width: auto;
  }
  .eb-quick-hub {
    bottom: 84px;
    right: 14px;
  }
  .eb-hub-btn-main {
    width: 48px;
    height: 48px;
    font-size: 1.25rem;
  }
}
`;

const current = fs.readFileSync('css/animations.css', 'utf8');
if (!current.includes('DYNAMIC INTERACTIVITY ENGINE')) {
  fs.writeFileSync('css/animations.css', current + '\n' + dynamicCss, 'utf8');
  console.log('Appended dynamic CSS to animations.css');
} else {
  console.log('Already appended');
}
