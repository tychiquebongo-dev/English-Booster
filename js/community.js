/**
 * ENGLISH BOOSTER — COMMUNITY FORUM & SOCIAL FEED (js/community.js)
 * Posts, Comments, Likes, Idiom Shares, Tag Filters & Founder Highlights
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
    likes: 24,
    likedByUser: false,
    comments: [
      { author: 'Sofia Martínez 🇪🇸', text: 'It means "Good luck!" especially used before theatrical or public performances!' },
      { author: 'Lucas Weber 🇩🇪', text: 'Exactly! In Germany we say "Hals- und Beinbruch" which has a similar superstitious origin.' },
      { author: 'Amara Okafor 🇳🇬', text: 'Yes, wishing someone directly "good luck" was thought to bring bad luck, so people say "break a leg" instead!' }
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
    likes: 19,
    likedByUser: false,
    comments: [
      { author: 'Chen Wei 🇸🇬', text: 'Focus on the vowel length! "ee" in "sheet" is long /i:/ with smiling lips, while "i" in "ship" is short and relaxed /ɪ/.' }
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
    likes: 42,
    likedByUser: true,
    comments: [
      { author: 'Alex Rivera 🇪🇸', text: 'Congrats Kenji! Keep going, the streak bonus really helps with motivation!' }
    ]
  }
];

class EnglishBoosterCommunity {
  constructor() {
    this.posts = INITIAL_POSTS;
  }

  init() {
    this.renderPosts();
    this.bindNewPost();
  }

  renderPosts(filterTag = 'all') {
    const container = document.getElementById('community-posts-container');
    if (!container) return;

    const filtered = filterTag === 'all' ? this.posts : this.posts.filter(p => p.tag === filterTag);

    container.innerHTML = filtered.map(post => `
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
                ${post.isFounder ? '<span class="crystal-badge" style="font-size: 0.68rem; padding: 2px 8px;">Founder</span>' : ''}
              </div>
              <div class="post-time">${post.time}</div>
            </div>
          </div>
          <span class="interest-tag" style="background: rgba(74, 222, 128, 0.12); color: var(--cyan-primary); border-color: rgba(74, 222, 128, 0.3);">
            ${post.tag}
          </span>
        </div>

        <div class="post-content">
          ${post.content}
        </div>

        <div class="post-footer">
          <button class="post-action-btn like-btn ${post.likedByUser ? 'active' : ''}" data-id="${post.id}">
            ❤️ <span class="like-count">${post.likes}</span>
          </button>
          <button class="post-action-btn toggle-comments-btn" data-id="${post.id}">
            💬 <span>${post.comments.length} Comments</span>
          </button>
          <button class="post-action-btn share-btn" data-id="${post.id}">
            🔗 <span>Share</span>
          </button>
        </div>

        <!-- Comments Drawer -->
        <div class="comments-section" id="comments-${post.id}" style="margin-top: 14px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; gap: 10px;">
          ${post.comments.map(c => `
            <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); padding: 10px 14px; border-radius: var(--radius-sm); font-size: 0.88rem;">
              <strong style="color: var(--cyan-primary); display: block; margin-bottom: 2px;">${c.author}</strong>
              <span style="color: var(--text-muted);">${c.text}</span>
            </div>
          `).join('')}

          <div style="display: flex; gap: 10px; margin-top: 6px;">
            <input type="text" class="form-control comment-input" placeholder="Write a reply in English..." style="padding: 8px 14px; font-size: 0.88rem;" />
            <button class="btn btn-primary btn-sm add-comment-btn" data-id="${post.id}">Reply</button>
          </div>
        </div>
      </div>
    `).join('');

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
        window.EnglishBooster.SoundFX.playClick();
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
          const user = window.EnglishBooster.currentUser || {};
          post.comments.push({
            author: `${user.fullName || 'You'} ${user.country ? user.country.split(' ').pop() : '🌍'}`,
            text: text
          });
          this.renderPosts();
          window.EnglishBooster.addXP(10, 'Contributed to community discussion');
        }
      });
    });

    // Share button
    document.querySelectorAll('.share-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        navigator.clipboard?.writeText(window.location.href);
        window.EnglishBooster.showToast('Link Copied!', 'Post link copied to clipboard.', 'info');
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

      if (!content) {
        window.EnglishBooster.showToast('Empty Post', 'Please write something to share with the community', 'warning');
        return;
      }

      const user = window.EnglishBooster.currentUser || {};
      const newPost = {
        id: Date.now(),
        author: user.fullName || 'Alex Rivera',
        flag: user.country ? user.country.split(' ').pop() : '🇪🇸',
        avatarText: (user.fullName || 'AR').split(' ').map(n => n[0]).join(''),
        avatarImg: '../assets/avatars/alex.jpg',
        isFounder: false,
        time: 'Just now',
        tag: tag,
        content: content,
        likes: 1,
        likedByUser: true,
        comments: []
      };

      this.posts.unshift(newPost);
      this.renderPosts();
      document.getElementById('new-post-content').value = '';
      window.EnglishBooster.addXP(25, 'Shared a community post');
      window.EnglishBooster.showToast('Post Published!', 'Your post is now visible to learners worldwide.', 'success');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('community-posts-container')) {
    window.communityApp = new EnglishBoosterCommunity();
    window.communityApp.init();
  }
});
