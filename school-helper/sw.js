const CACHE_NAME = 'school-helper-v1';
const ASSETS_TO_CACHE = [
  '/index.html',
  '/profile-math-physics.html',
  '/profile-bio-chem.html',
  '/profile-humanities.html',
  '/style.css',
  '/dictionary.js',
  '/manifest.json',
  '/sw.js',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
