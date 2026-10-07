const fs = require('fs');
const path = require('path');

const staticNavPill = `          <!-- Language Switcher Pill (Multi-Langue Anglais & Français) -->
          <div class="lang-switcher-pill" role="group" aria-label="Language Selector">
            <button type="button" class="lang-btn active" data-lang="en" title="English">
              <span>🇬🇧</span> EN
            </button>
            <button type="button" class="lang-btn" data-lang="fr" title="Français">
              <span>🇫🇷</span> FR
            </button>
          </div>\n`;

const staticDrawerWrap = `    <!-- Language Selector Mobile Drawer -->
    <div class="lang-drawer-wrap" style="padding: 12px 0; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--glass-border); margin-bottom: 14px;">
      <span style="font-size: 0.88rem; font-weight: 700; color: var(--text-muted); display: flex; align-items: center; gap: 6px;">
        <span>🌐</span> Langue / Language
      </span>
      <div class="lang-switcher-pill" role="group">
        <button type="button" class="lang-btn active" data-lang="en">
          <span>🇬🇧</span> EN
        </button>
        <button type="button" class="lang-btn" data-lang="fr">
          <span>🇫🇷</span> FR
        </button>
      </div>
    </div>\n`;

function patchFile(file) {
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Insert pill before theme-toggle-btn if not present
  if (!html.includes('class="lang-switcher-pill"') && html.includes('class="theme-toggle-btn"')) {
    html = html.replace(/([ \t]*<button[^>]*class="theme-toggle-btn"[^>]*>)/, staticNavPill + '$1');
    changed = true;
    console.log(`[NAV PILL ADDED] ${file}`);
  }

  // Insert drawer wrap if mobile drawer exists
  if (!html.includes('class="lang-drawer-wrap"') && html.includes('class="mobile-drawer"')) {
    html = html.replace(/(<div class="mobile-drawer"[^>]*>\s*)(<ul class="mobile-nav-links">)/, '$1' + staticDrawerWrap + '$2');
    changed = true;
    console.log(`[DRAWER WRAP ADDED] ${file}`);
  }

  if (changed) {
    fs.writeFileSync(file, html, 'utf8');
  }
}

// 1. Root index.html
patchFile('index.html');

// 2. All pages in /pages
const pages = fs.readdirSync('pages').filter(f => f.endsWith('.html'));
pages.forEach(p => patchFile(path.join('pages', p)));

console.log('Static language switcher markup added cleanly across all pages.');
