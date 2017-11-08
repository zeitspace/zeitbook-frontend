/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');
importScripts('https://cdn.jsdelivr.net/npm/idb-keyval@2.3.0/idb-keyval.min.js');

firebase.initializeApp({
  messagingSenderId: '81782109643',
});
/* eslint-enable no-undef */

const API_ROOT = 'https://zeitbook.herokuapp.com';
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

// Offline

function sendMessageToClient(client, msg) {
  return new Promise(((resolve, reject) => {
    const msgChan = new MessageChannel();

    msgChan.port1.onmessage = function (event) {
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };

    client.postMessage(msg, [msgChan.port2]);
  }));
}

function sendMessageToAllClients(msg) {
  clients.matchAll().then((clients) => { // eslint-disable-line no-undef
    clients.forEach(client => sendMessageToClient(client, msg));
  });
}

function getQueue(queueName) {
  // eslint-disable-next-line no-undef
  return idbKeyval.get(queueName).then(val => val || []);
}

function updateQueue(queueName, postsQueue) {
  // eslint-disable-next-line no-undef
  return idbKeyval.set(queueName, postsQueue);
}

function json(response) {
  if (response.ok) {
    return response.json();
  }
  throw response.status;
}

function sendPosts() {
  return getQueue('postsQueue').then((postsQueue) => {
    let postsList = postsQueue;
    return postsQueue.forEach((post) => {
      fetch(`${API_ROOT}/posts`, {
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: `user=${post.username}&title=${post.title}&content=${post.body}&token=${post.token}`,
      }).then(json)
        .then((response) => {
          sendMessageToAllClients({ type: 'post-update', id: post.id, post: response });
          registration.showNotification('Post synced', {}); // eslint-disable-line no-undef
          postsList = postsList.slice(1);
          return updateQueue('postsQueue', postsList);
        });
    });
  });
}

function sendComments() {
  return getQueue('commentsQueue').then((commentsQueue) => {
    let commentsList = commentsQueue;
    return commentsQueue.forEach((comment) => {
      fetch(`${API_ROOT}/posts/${comment.postId}/comment`, {
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: `user=${comment.username}&comment=${comment.body}&token=${comment.token}`,
      }).then(json)
        .then((response) => {
          sendMessageToAllClients({ type: 'comment-update', id: comment.id, comment: response });
          registration.showNotification('Comment synced', {}); // eslint-disable-line no-undef
          commentsList = commentsList.slice(1);
          return updateQueue('commentsQueue', commentsList);
        });
    });
  });
}

// eslint-disable-next-line no-restricted-globals
self.addEventListener('sync', (event) => {
  if (event.tag === 'send-post-queue') {
    event.waitUntil(sendPosts());
  } else if (event.tag === 'send-comment-queue') {
    event.waitUntil(sendComments());
  }
});
