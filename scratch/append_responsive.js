const fs = require('fs');

let css = fs.readFileSync('css/responsive.css', 'utf8');

const additionalStyles = `
/* Mobile Call Room & Floating Controls Optimization */
@media (max-width: 768px) {
  .call-stage-grid {
    height: auto !important;
    min-height: auto !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 16px !important;
  }
  .video-feed-box {
    min-height: 280px !important;
  }
  .call-controls-bar {
    position: sticky !important;
    bottom: calc(76px + env(safe-area-inset-bottom, 10px)) !important;
    z-index: 100 !important;
    padding: 10px 14px !important;
    gap: 8px !important;
    flex-wrap: wrap !important;
    border-radius: var(--radius-lg) !important;
  }
  .call-ctrl-btn {
    padding: 8px 12px !important;
    font-size: 0.8rem !important;
    gap: 6px !important;
  }
}
`;

fs.writeFileSync('css/responsive.css', css.trimEnd() + additionalStyles + '\n', 'utf8');
console.log('Appended call responsive styles to css/responsive.css.');
