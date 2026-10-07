const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

const addStyles = `

/* ==========================================================================
   ABOUT & PLATFORM MISSION STATEMENT CARD (HIGH CONTRAST & RESPONSIVE)
   ========================================================================== */
.about-mission-statement-card {
  padding: 32px 36px;
  margin-top: 28px;
  border: 1.5px solid rgba(74, 222, 128, 0.45);
  background: linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(96, 165, 250, 0.08));
  border-radius: var(--radius-xl);
  text-align: left;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.about-mission-statement-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--grad-cyan-blue);
}

.about-mission-statement-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.42);
}

.about-mission-statement-text {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.8;
  margin: 0;
  letter-spacing: -0.01em;
}

[data-theme="light"] .about-mission-statement-card {
  background: linear-gradient(135deg, rgba(22, 163, 74, 0.08), rgba(37, 99, 235, 0.05)), #ffffff !important;
  border-color: rgba(22, 163, 74, 0.35) !important;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08) !important;
}

[data-theme="light"] .about-mission-statement-card .about-mission-statement-text {
  color: #090d16 !important;
}

@media (max-width: 768px) {
  .about-mission-statement-card {
    padding: 22px 20px;
    margin-top: 20px;
    border-radius: var(--radius-lg);
  }
  .about-mission-statement-text {
    font-size: 1.05rem;
    line-height: 1.65;
  }
}
`;

fs.writeFileSync('css/style.css', css.trimEnd() + addStyles + '\n', 'utf8');
console.log('Appended mission statement CSS cleanly.');
