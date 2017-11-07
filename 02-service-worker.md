A service worker is a script, coded in Javscript, used to a lot of functionalities in the background like push notifications, background sync, cache pages, cache requests to an api, etc. It runs in a different scope than your web site, this way it's not possible to access DOM elemets, interact with the webpage, etc.

# Create a service worker file to cache files

- Create a new file inside the assets/javascript folder called `service-worker.js`
- Insert the code bellow:

```javascript
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

const CACHE_NAME = 'zeitbook-cache-v1';
const urlsToCache = [
  '/',
  '/index.js',
  '/post.js',
  '/icons/android-chrome-192x192.png',
  '/icons/android-chrome-256x256.png',
  '/images/back-arrow.png',
  '/images/up-arrow.png',
  '/images/zeitspace-logo.png',
];

self.addEventListener('install', (event) => {
  const addUrlsToCache = caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache));
  event.waitUntil(addUrlsToCache);
});
```

# Registering service worker


# Caching API requests

- Open the `service-worker.js` file
- Insert the code bellow:

```javascript
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
```

# Test

- Open it using Chrome browser
- Open the Chrome DevTools
- Go to the Application tab
- Click on `Service Workers` on the left side bar and see it loaded
- Click on `Cache Storage` on the left side bar inside the `Cache` section and see all the files cached
- Go back to `Service Workers`
- Click on the Offline checkbox, to test it running offline
- Reload the page, the page will be loaded using the cached files and requests


- You can also test your app using the [Lighthouse](https://developers.google.com/web/tools/lighthouse/), an external tool to audits performance, accessibility, progressive web apps, and more.


[Move on to the next step: Push Notifications](./03-push-notifications.md)
