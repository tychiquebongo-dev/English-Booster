/**
 * ENGLISH BOOSTER | SERVICE WORKER (sw.js)
 * Caching & Offline Capabilities pour Mobile, Tablette et Ordinateur
 */

const CACHE_NAME = 'englishbooster-v1.2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/style.css',
  '/css/animations.css',
  '/css/responsive.css',
  '/js/main.js',
  '/js/animations.js',
  '/js/pwa.js',
  '/js/watchShorts.js',
  '/js/statuses.js',
  '/js/inscrits.js',
  '/js/matching.js',
  '/js/webrtcCall.js',
  '/assets/images/logo.svg',
  '/pages/inscrits.html',
  '/pages/partners.html',
  '/pages/watch.html',
  '/pages/community.html',
  '/pages/dashboard.html',
  '/pages/chat.html',
  '/pages/call.html',
  '/pages/challenges.html'
];

// Installation : Mise en cache des assets essentiels
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('Cache addAll non-fatal error:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activation : Nettoyage des anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch : Stratégie Network-First avec repli sur le cache
self.addEventListener('fetch', event => {
  // Ignorer les requêtes non GET ou websocket
  if (event.request.method !== 'GET' || event.request.url.startsWith('ws')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});
