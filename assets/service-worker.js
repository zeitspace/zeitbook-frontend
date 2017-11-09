/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');
importScripts('https://cdn.jsdelivr.net/npm/idb-keyval@2.3.0/idb-keyval.min.js');
importScripts('./scripts/util.js');

firebase.initializeApp({
  messagingSenderId: '81782109643',
});

firebase.messaging().setBackgroundMessageHandler();

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
  '/scripts/util.js',
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

function sendPosts() {
  return getQueue('postsQueue').then((postsQueue) => {
    let postsList = postsQueue;
    return Promise.all(postsQueue.map(post => fetch(`${API_ROOT}/posts`, {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: `user=${post.username}&title=${post.title}&content=${post.body}&token=${post.token}`,
    }).then(json)
      .then(response => sendMessageToAllClients({ type: 'post-update', id: post.id, post: response }))
      .then(() => {
        postsList = postsList.filter(p => p.id !== post.id);
        return updateQueue('postsQueue', postsList);
      })));
  }).then(() => sendNotification('Pending posts synced'));
}

function sendComments() {
  return getQueue('commentsQueue').then((commentsQueue) => {
    let commentsList = commentsQueue;
    return Promise.all(commentsQueue.map(comment => fetch(`${API_ROOT}/posts/${comment.postId}/comment`, {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: `user=${comment.username}&comment=${comment.body}&token=${comment.token}`,
    }).then(json)
      .then(response => sendMessageToAllClients({ type: 'comment-update', id: comment.id, comment: response }))
      .then(() => {
        commentsList = commentsList.filter(c => c.id !== comment.id);
        return updateQueue('commentsQueue', commentsList);
      })));
  }).then(() => sendNotification('Pending comments synced'));
}

// eslint-disable-next-line no-restricted-globals
self.addEventListener('sync', (event) => {
  if (event.tag === 'send-post-queue') {
    event.waitUntil(sendPosts());
  } else if (event.tag === 'send-comment-queue') {
    event.waitUntil(sendComments());
  }
});
