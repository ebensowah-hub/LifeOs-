const C = 'lifeos-v2';

const A = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(C).then(cache => cache.addAll(A))
  );

  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== C)
          .map(key => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {

        const copy = response.clone();

        caches.open(C).then(cache => {
          cache.put(event.request, copy);
        });

        return response;

      })
      .catch(() =>
        caches.match(event.request)
      )
  );
});