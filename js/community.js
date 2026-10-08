/**
 * ENGLISH BOOSTER — COMMUNITY FORUM & SOCIAL FEED (js/community.js)
 * Posts, Comments, Likes, Idiom Shares, Tag Filters & Founder Highlights
 * 100% Fully Bilingual: English (en) & Français (fr) Reactive Integration
 */

const INITIAL_POSTS = [
  {
    id: 1,
    author: 'Tychique Bongo',
    flag: '🇨🇮',
    avatarText: 'TB',
    avatarImg: '../assets/images/tychique-bongo.jpg',
    isFounder: true,
    time: '2 hours ago',
    tag: '#IdiomOfTheDay',
    content: 'Today I learned: <div class="post-highlight">"Break a leg!"</div> What does it actually mean in natural conversation? How do you use it in your country?',
    contentFr: 'Aujourd\'hui j\'ai appris : <div class="post-highlight">"Break a leg!"</div> Que signifie cette expression dans une conversation naturelle ? Comment l\'utilisez-vous dans votre pays ?',
    likes: 24,
    likedByUser: false,
    comments: [
      {
        author: 'Sofia Martínez 🇪🇸',
        text: 'It means "Good luck!" especially used before theatrical or public performances!',
        textFr: 'Cela signifie "Bonne chance !", surtout utilisé avant des représentations théâtrales ou prises de parole en public !'
      },
      {
        author: 'Lucas Weber 🇩🇪',
        text: 'Exactly! In Germany we say "Hals- und Beinbruch" which has a similar superstitious origin.',
        textFr: 'Exactement ! En Allemagne nous disons "Hals- und Beinbruch", ce qui a une origine superstitieuse similaire.'
      },
      {
        author: 'Amara Okafor 🇳🇬',
        text: 'Yes, wishing someone directly "good luck" was thought to bring bad luck, so people say "break a leg" instead!',
        textFr: 'Oui, souhaiter directement "bonne chance" était considéré comme portant malheur, alors on dit "break a leg" à la place !'
      }
    ]
  },
  {
    id: 2,
    author: 'Elena Conti',
    flag: '🇮🇹',
    avatarText: 'EC',
    avatarImg: '../assets/avatars/chloe.jpg',
    isFounder: false,
    time: '4 hours ago',
    tag: '#Pronunciation',
    content: 'Can someone explain the difference between the pronunciation of <strong>"sheet"</strong> and <strong>"ship"</strong> vs another word that sounds similar? I always get self-conscious when speaking fast! 😅',
    contentFr: 'Quelqu\'un peut-il m\'expliquer la différence de prononciation entre <strong>"sheet"</strong> et <strong>"ship"</strong> ? J\'hésite toujours quand je parle vite par peur de faire un lapsus ! 😅',
    likes: 19,
    likedByUser: false,
    comments: [
      {
        author: 'Chen Wei 🇸🇬',
        text: 'Focus on the vowel length! "ee" in "sheet" is long /i:/ with smiling lips, while "i" in "ship" is short and relaxed /ɪ/.',
        textFr: 'Concentrez-vous sur la longueur de la voyelle ! Le "ee" dans "sheet" est long /i:/ avec les lèvres souriantes, alors que le "i" de "ship" est court et relâché /ɪ/.'
      }
    ]
  },
  {
    id: 3,
    author: 'Kenji Sato',
    flag: '🇯🇵',
    avatarText: 'KS',
    avatarImg: '../assets/avatars/kenji.jpg',
    isFounder: false,
    time: 'Yesterday',
    tag: '#Milestone',
    content: '🎉 Just hit my <strong>14 Day Speaking Streak</strong> on English Booster! Had an awesome 30-minute conversation with Chloe about graphic design in Paris. Speaking every day is changing everything for my confidence.',
    contentFr: '🎉 Je viens d\'atteindre ma <strong>série de 14 jours de pratique orale</strong> sur English Booster ! J\'ai eu une formidable conversation de 30 minutes avec Chloe sur le graphisme à Paris. Parler tous les jours transforme radicalement ma confiance.',
    likes: 42,
    likedByUser: true,
    comments: [
      {
        author: 'Alex Rivera 🇪🇸',
        text: 'Congrats Kenji! Keep going, the streak bonus really helps with motivation!',
        textFr: 'Félicitations Kenji ! Continue, le bonus de série quotidienne booste énormément la motivation !'
      }
    ]
  }
];

const TAG_LABELS_FR = {
  '#IdiomOfTheDay': '#IdiomeDuJour',
  '#Pronunciation': '#Prononciation',
  '#GrammarTip': '#AstuceGrammaire',
  '#Milestone': '#ÉtapeClé',
  '#Discussion': '#Discussion'
};

function isFrench() {
  const i18nLang = (window.EnglishBooster && window.EnglishBooster.i18n && typeof window.EnglishBooster.i18n.getLang === 'function')
    ? window.EnglishBooster.i18n.getLang()
    : (localStorage.getItem('eb_lang') || 'en');
  return i18nLang === 'fr';
}

function formatTime(timeStr, isFr) {
  if (!isFr) return timeStr;
  if (!timeStr) return 'À l\'instant';
  if (timeStr.includes('2 hours ago')) return 'Il y a 2 heures';
  if (timeStr.includes('4 hours ago')) return 'Il y a 4 heures';
  if (timeStr.includes('Yesterday')) return 'Hier';
  if (timeStr.includes('Just now')) return 'À l\'instant';
  if (timeStr.includes('hour')) return timeStr.replace(/hours? ago/, 'heures').replace(/(\d+)/, 'Il y a $1 ');
  if (timeStr.includes('min')) return timeStr.replace(/mins? ago/, 'minutes').replace(/(\d+)/, 'Il y a $1 ');
  return timeStr;
}

class EnglishBoosterCommunity {
  constructor() {
    this.posts = INITIAL_POSTS;
    this.activeFilter = 'all';
  }

  init() {
    this.renderPosts(this.activeFilter);
    this.bindFilterChips();
    this.bindNewPost();
    this.bindLanguageChange();
  }

  bindLanguageChange() {
    window.addEventListener('eb_language_changed', () => {
      this.renderPosts(this.activeFilter);
    });
  }

  bindFilterChips() {
    document.querySelectorAll('.community-filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.community-filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.getAttribute('data-filter') || 'all';
        this.activeFilter = filter;
        this.renderPosts(filter);
      });
    });
  }

  renderPosts(filterTag = 'all') {
    const container = document.getElementById('community-posts-container');
    if (!container) return;

    this.activeFilter = filterTag;
    const isFr = isFrench();
    const filtered = filterTag === 'all' ? this.posts : this.posts.filter(p => p.tag === filterTag);

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="glass-card" style="padding: 40px; text-align: center; margin-top: 10px;">
          <div style="font-size: 2.4rem; margin-bottom: 12px;">💬</div>
          <h3 style="font-size: 1.2rem; margin-bottom: 6px;">
            ${isFr ? 'Aucun message dans cette catégorie' : 'No posts in this topic tag'}
          </h3>
          <p style="color: var(--text-muted); font-size: 0.95rem;">
            ${isFr ? 'Soyez le premier à partager une astuce avec la communauté !' : 'Be the first to share an insight with the global community!'}
          </p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(post => {
      const displayTag = (isFr && TAG_LABELS_FR[post.tag]) ? TAG_LABELS_FR[post.tag] : post.tag;
      const displayContent = (isFr && post.contentFr) ? post.contentFr : post.content;
      const displayTime = formatTime(post.time, isFr);
      const commentsCountText = isFr 
        ? `${post.comments.length} Commentaire${post.comments.length > 1 ? 's' : ''}`
        : `${post.comments.length} Comment${post.comments.length > 1 ? 's' : ''}`;
      const founderBadgeHtml = post.isFounder 
        ? `<span class="crystal-badge" style="font-size: 0.68rem; padding: 2px 8px; margin-left: 6px;">${isFr ? 'Fondateur' : 'Founder'}</span>` 
        : '';

      return `
        <div class="glass-card post-card" data-post-id="${post.id}">
          <div class="post-header">
            <div class="post-author">
              <div class="partner-avatar" style="width: 46px; height: 46px;">
                ${post.avatarImg ? `<img src="${post.avatarImg}" alt="${post.author}" class="avatar-img" />` : post.avatarText}
                <span class="avatar-badge-flag">${post.flag}</span>
              </div>
              <div>
                <div class="post-author-name">
                  ${post.author}
                  ${founderBadgeHtml}
                </div>
                <div class="post-time">${displayTime}</div>
              </div>
            </div>
            <span class="interest-tag" style="background: rgba(74, 222, 128, 0.12); color: var(--cyan-primary); border-color: rgba(74, 222, 128, 0.3);">
              ${displayTag}
            </span>
          </div>

          <div class="post-content">
            ${displayContent}
          </div>

          <div class="post-footer">
            <button type="button" class="post-action-btn like-btn ${post.likedByUser ? 'active' : ''}" data-id="${post.id}" aria-label="J'aime">
              ❤️ <span class="like-count">${post.likes}</span>
            </button>
            <button type="button" class="post-action-btn toggle-comments-btn" data-id="${post.id}">
              💬 <span>${commentsCountText}</span>
            </button>
            <button type="button" class="post-action-btn share-btn" data-id="${post.id}">
              🔗 <span>${isFr ? 'Partager' : 'Share'}</span>
            </button>
          </div>

          <!-- Comments Drawer -->
          <div class="comments-section" id="comments-${post.id}" style="margin-top: 14px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; gap: 10px;">
            ${post.comments.map(c => `
              <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); padding: 10px 14px; border-radius: var(--radius-sm); font-size: 0.88rem;">
                <strong style="color: var(--cyan-primary); display: block; margin-bottom: 2px;">${c.author}</strong>
                <span style="color: var(--text-muted);">${(isFr && c.textFr) ? c.textFr : c.text}</span>
              </div>
            `).join('')}

            <div style="display: flex; gap: 10px; margin-top: 6px;">
              <input type="text" class="form-control comment-input" placeholder="${isFr ? 'Écrivez une réponse en anglais...' : 'Write a reply in English...'}" style="padding: 8px 14px; font-size: 0.88rem;" />
              <button type="button" class="btn btn-primary btn-sm add-comment-btn" data-id="${post.id}">
                ${isFr ? 'Répondre' : 'Reply'}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    this.bindInteractions();
  }

  bindInteractions() {
    // Like button
    document.querySelectorAll('.like-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const post = this.posts.find(p => p.id === id);
        if (!post) return;

        post.likedByUser = !post.likedByUser;
        post.likes += post.likedByUser ? 1 : -1;
        btn.classList.toggle('active', post.likedByUser);
        btn.querySelector('.like-count').textContent = post.likes;
        if (window.EnglishBooster && window.EnglishBooster.SoundFX) {
          window.EnglishBooster.SoundFX.playClick();
        }
      });
    });

    // Add comment
    document.querySelectorAll('.add-comment-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const parent = btn.parentElement;
        const input = parent.querySelector('.comment-input');
        const text = input ? input.value.trim() : '';

        if (!text) return;

        const post = this.posts.find(p => p.id === id);
        if (post) {
          const user = (window.EnglishBooster && window.EnglishBooster.currentUser) || {};
          const isFr = isFrench();
          post.comments.push({
            author: `${user.fullName || (isFr ? 'Vous' : 'You')} ${user.country ? user.country.split(' ').pop() : '🌍'}`,
            text: text,
            textFr: text
          });
          this.renderPosts(this.activeFilter);
          if (window.EnglishBooster && window.EnglishBooster.addXP) {
            window.EnglishBooster.addXP(10, isFr ? 'Participation à la discussion' : 'Contributed to community discussion');
          }
          if (window.EnglishBooster && window.EnglishBooster.SoundFX) {
            window.EnglishBooster.SoundFX.playSuccess?.();
          }
        }
      });
    });

    // Share button
    document.querySelectorAll('.share-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        navigator.clipboard?.writeText(window.location.href);
        const isFr = isFrench();
        if (window.EnglishBooster && window.EnglishBooster.showToast) {
          window.EnglishBooster.showToast(
            isFr ? 'Lien copié !' : 'Link Copied!',
            isFr ? 'Lien du message copié dans le presse-papiers.' : 'Post link copied to clipboard.',
            'info'
          );
        }
      });
    });
  }

  bindNewPost() {
    const form = document.getElementById('new-post-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const content = document.getElementById('new-post-content')?.value.trim();
      const tag = document.getElementById('new-post-tag')?.value || '#Discussion';
      const isFr = isFrench();

      if (!content) {
        if (window.EnglishBooster && window.EnglishBooster.showToast) {
          window.EnglishBooster.showToast(
            isFr ? 'Message vide' : 'Empty Post',
            isFr ? 'Veuillez écrire un message à partager avec la communauté' : 'Please write something to share with the community',
            'warning'
          );
        }
        return;
      }

      const user = (window.EnglishBooster && window.EnglishBooster.currentUser) || {};
      const newPost = {
        id: Date.now(),
        author: user.fullName || 'Alex Rivera',
        flag: user.country ? user.country.split(' ').pop() : '🇪🇸',
        avatarText: (user.fullName || 'AR').split(' ').map(n => n[0]).join(''),
        avatarImg: '../assets/avatars/alex.jpg',
        isFounder: false,
        time: isFr ? 'À l\'instant' : 'Just now',
        tag: tag,
        content: content,
        contentFr: content,
        likes: 1,
        likedByUser: true,
        comments: []
      };

      this.posts.unshift(newPost);
      this.renderPosts(this.activeFilter);
      document.getElementById('new-post-content').value = '';

      if (window.EnglishBooster && window.EnglishBooster.addXP) {
        window.EnglishBooster.addXP(25, isFr ? 'Publication d\'un message' : 'Shared a community post');
      }
      if (window.EnglishBooster && window.EnglishBooster.SoundFX) {
        window.EnglishBooster.SoundFX.playSuccess?.();
      }
      if (window.EnglishBooster && window.EnglishBooster.showToast) {
        window.EnglishBooster.showToast(
          isFr ? 'Message publié !' : 'Post Published!',
          isFr ? 'Votre message est maintenant visible par les apprenants du monde entier.' : 'Your post is now visible to learners worldwide.',
          'success'
        );
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('community-posts-container')) {
    window.communityApp = new EnglishBoosterCommunity();
    window.communityApp.init();
  }
});
