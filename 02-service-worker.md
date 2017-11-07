A service worker is a script that your browser runs in the background, and provides functionalities such as push notifications, background sync, resource caching and request caching etc. It is a [JavaScript Worker](https://www.html5rocks.com/en/tutorials/workers/basics/), as such it does not have access to DOM elements. You can read more about service workers on the (Google Developers Website)[https://developers.google.com/web/fundamentals/primers/service-workers/].

## Create a service worker file to cache files

- Create a new file inside the assets/javascript folder called `service-worker.js`.
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

## Register your service worker

- Open the file `firebase.js` in the folder `src`.
- Insert the code below:

```javascript
const registerServiceWorker = navigator.serviceWorker.register('/service-worker.js')
  .then(registration => messaging.useServiceWorker(registration));
```

- It will register the service worker when the browser opens `index.html` and `post.html`.

## Cache API requests

- Open the `service-worker.js` file.
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

## Test

- Open it using Google Chrome.
- Open Chrome DevTools (`F12` on Windows or `cmd + option + j` on macOS).
- Go to the Application tab.
- Click on `Service Workers` on the left side bar. You should see your service worker loaded.
- Click on `Cache Storage` on the left side bar inside the `Cache` section to see the cached resources.
- Go back to `Service Workers`.
- Click on the offline checkbox to simulate and offline environment.
- Reload the page. Despite being offline, the page will still load using the cached resources and requests.


- Once again, you generate a report using [Lighthouse](https://developers.google.com/web/tools/lighthouse/). You should see an increase in your Progressive Web App score.


[Move on to the next step: Push Notifications](./03-push-notifications.md)
