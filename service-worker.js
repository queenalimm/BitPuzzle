self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('bitpuzzle-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/script.js',
        '/icon-192.png',
        '/icon-512.png'
        // Add other files and assets
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
