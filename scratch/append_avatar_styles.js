const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

const avatarStyles = `

/* ==========================================================================
   PROFILE PHOTO & AVATAR PICKER ENGINE (UPLOAD, PRESETS & MODAL)
   ========================================================================== */
.avatar-edit-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.avatar-edit-container:hover .user-profile-avatar {
  border-color: var(--green-400);
  box-shadow: 0 0 30px rgba(74, 222, 128, 0.5);
  transform: scale(1.03);
}

.btn-change-avatar-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--grad-cyan-blue);
  color: #030712;
  border: 2px solid var(--bg-base);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  z-index: 5;
}

.btn-change-avatar-badge:hover {
  transform: scale(1.18);
  box-shadow: 0 0 20px rgba(74, 222, 128, 0.7);
}

.avatar-picker-card {
  position: relative;
  overflow: hidden;
}

.avatar-presets-strip::-webkit-scrollbar {
  height: 5px;
}
.avatar-presets-strip::-webkit-scrollbar-thumb {
  background: rgba(74, 222, 128, 0.35);
  border-radius: 10px;
}

.avatar-preset-btn:hover,
.modal-preset-choice-btn:hover {
  transform: scale(1.15) !important;
  border-color: var(--cyan-primary) !important;
  box-shadow: 0 0 15px rgba(74, 222, 128, 0.45);
}

.avatar-preset-btn.active,
.modal-preset-choice-btn.active {
  border-color: var(--green-400) !important;
  box-shadow: 0 0 20px rgba(74, 222, 128, 0.6) !important;
  transform: scale(1.12);
}

[data-theme="light"] .avatar-picker-card {
  background: #ffffff !important;
  border-color: rgba(22, 163, 74, 0.4) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06) !important;
}

[data-theme="light"] .avatar-picker-card .form-label {
  color: #090d16 !important;
}

[data-theme="light"] .avatar-modal-card {
  background: #ffffff !important;
  border-color: #16a34a !important;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.2) !important;
}

[data-theme="light"] .avatar-modal-card h2 {
  color: #090d16 !important;
}
`;

fs.writeFileSync('css/style.css', css.trimEnd() + avatarStyles + '\n', 'utf8');
console.log('Appended avatar styles to css/style.css');
