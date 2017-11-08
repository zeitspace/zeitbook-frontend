### Arriving late?

You can start from this step by cloning this repository and checking out the `step-2` branch, or by [downloading the code as a ZIP file](https://github.com/zeitspace/zeitbook-frontend/archive/step-2.zip).

# Service worker

A service worker is a script that your browser runs in the background. It provides features such as push notifications, background data synchronization, and resource and request caching. Since it is a [JavaScript Worker](https://www.html5rocks.com/en/tutorials/workers/basics/), it doesn't have access to the DOM. However, it can interact with the DOM indirectly by communicating with your application's main thread. In this step, you'll create a service worker that caches static resources upon which your application depends, as well as API requests made by your application.

## Create a service worker to cache your application's resources

Create a new file at `assets/javascripts/service-worker.js`, then insert the following code:

```javascript
const CACHE_NAME = 'zeitbook-cache-v1';
const urlsToCache = [
  '/',
  '/index.js',
  '/index.css',
  '/post.js',
  '/icons/192x192.png',
  '/icons/256x256.png',
  '/icons/512x512.png',
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

`CACHE_NAME` specifies a name and version for the service worker's cache. In a production setting, you should change the cache version every time you modify any of the resources cached by the service worker.

During development, you can set up Chrome DevTools to reload your application's service worker every time you refresh the page, so that you don't need to update the cache version every time you change a file. To do so, open Chrome DevTools (`F12` on Windows or `cmd + option + j` on macOS). In the Application tab of the DevTools, click on the Service Workers menu item and check the "Update on reload" checkbox.

`urlsToCache` is a list of static resources that the service worker should cache. When it receives an `install` event, the service worker downloads all the listed resources, then stores them in its cache.

## Register your service worker

Your application must register its service worker with the browser. To do so, replace the contents of `src/service-worker.js` with the following:

```javascript
export default navigator.serviceWorker.register('/service-worker.js');
```

## Set up your service worker to cache your application's HTML pages

This will allow you to load the HTML for the pages displaying all posts (`localhost:3000/`) and a single post (e.g. `localhost:3000/posts/abcde`) even when you're offline.

Add the following code to `assets/javascripts/service-worker.js`:

```javascript
function fetchAndCache(request, cache) {
  return fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    });
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method === 'GET') {
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

This code uses a `fetch` event listener to act as an intermediary between your application and the network. Whenever your application loads a resource, this event listener is called and the service worker has the opportunity to load a cached response instead of making a network request.

The event listener first checks if the requested resource exists in the cache. If the resource doesn't exist, it makes a network request for the resource. This strategy of "cache, falling back to network" is the most common strategy for most applications.

The event listener uses the `fetchAndCache` function to request resources over the network. This function first makes a network request for the resource, then saves it in the cache so that it can be loaded more quickly later.

Note that the listener only tries to load GET requests from the cache. This is because the Cache API only supports caching GET requests.

## Set up your service worker to cache API requests

The "cache, falling back to network" strategy outlined above doesn't work well for requests to the Zeitbook API. If your device is connected to the Internet, your application should always load the latest posts and comments from the API, instead of loading stale data from the cache. Your application should only load data from the cache when you are offline. We'll refer to this strategy as "network, falling back to cache".

Add the following code inside your service worker's `fetch` event listener, wrapping the code already inside it:

```javascript
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
    // const cacheFirst = caches.open(CACHE_NAME)
    // Other existing code...
  }
```

If the request is made to the Zeitbook API, the listener first tries to load fresh data using `fetchAndCache`. If this fails, it attempts to load potentially stale data from the cache.

## Check that your service worker installs correctly

Open your application using Google Chrome and open Chrome DevTools (`F12` on Windows or `cmd + option + j` on macOS). Under the Application tab, click on "Service Workers" to check that your service worker has been installed correctly. You can also click on "Cache Storage" to view the contents of your service worker's cache.

## Test your application's offline capabilities

Disconnect your computer from the Internet and try reloading your application. Despite being offline, the page will still load using cached resources and API responses.

## Run Lighthouse

Try running the Lighthouse Progressive Web App audits again. You can run Lighthouse in Chrome DevTools under the Audits tab.

Your application should now pass all Progressive Web App audits except for "Redirects HTTP traffic to HTTPS". Congratulations!

## Next step

[Add push notifications to your application.](./03-push-notifications.md)
