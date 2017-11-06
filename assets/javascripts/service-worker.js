/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '81782109643',
});
/* eslint-enable no-undef */

const CACHE_NAME = 'zeitbook-cache-v1';
const urlsToCache = [
  '/',
  '/index.js',
  '/post.js',
  '/icons/192x192.png',
  '/icons/256x256.png',
  '/icons/512x512.png',
  '/images/back-arrow.png',
  '/images/up-arrow.png',
  '/images/zeitspace-logo.png',
];

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
  const addUrlsToCache = caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache));
  event.waitUntil(addUrlsToCache);
});

function fetchAndCache(request, cache) {
  return fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    });
}

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method === 'GET' && request.url.includes('zeitbook.herokuapp.com')) {
    const networkFirst = caches.open(CACHE_NAME)
      .then(cache => fetchAndCache(request, cache)
        .catch(error => cache.match(request)
          .then((response) => {
            if (response) {
              return response;
            }
            throw error;
          })));
    event.respondWith(networkFirst);
  } else if (request.method === 'GET') {
    const cacheFirst = caches.open(CACHE_NAME)
      .then(cache => cache.match(request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetchAndCache(request, cache);
        }));
    event.respondWith(cacheFirst);
  }
});
