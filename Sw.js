/* ============================================================
   sw.js — Service Worker
   Caches the app shell so it works offline and can be
   installed as a home-screen app. Data itself is stored
   separately via window.storage, not by this cache.
   ============================================================ */

const CACHE_NAME = 'shop-billing-cache-v1';
const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './backup.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Cache-first for the app shell, falling back to network.
// Anything not in the shell (e.g. Google Fonts, QR code CDN) goes to network normally.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).catch(() => {
        // If offline and requesting the page itself, fall back to cached index.html
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
