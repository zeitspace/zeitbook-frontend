import * as idbKeyval from 'idb-keyval';
import getNotificationToken from './firebase';

const API_ROOT = 'https://zeitbook.herokuapp.com';
const notificationToken = getNotificationToken();

function json(response) {
  if (response.ok) {
    return response.json();
  }
  throw response.status;
}

const buildComment = ({
  id, time, user, comment, sync=true,
}) => ({
  id,
  time: new Date(time),
  username: user,
  body: comment,
  sync,
});

const buildPost = ({ withComments }) => ({
  id, time, user, title, content, comments, numComments, sync=true,
}) => {
  const result = {
    id,
    time: new Date(time),
    username: user,
    title,
    body: content,
    numComments,
    sync,
  };
  if (withComments) {
    result.comments = comments.map(buildComment);
  }
  return result;
};

function getFromQueue(queueName) {
  return idbKeyval.get(queueName).then(val => val || []);
}

function addToQueue(queueName, obj) {
  const elem = obj;
  return getFromQueue(queueName).then((elemQueue) => {
    elem.id = elemQueue.length > 0 ? (Math.max(...elemQueue.map(item => item.id)) + 1) : 1;
    elemQueue.push(elem);
    return idbKeyval.set(queueName, elemQueue);
  }).then(() => elem.id);
}

function getPosts() {
  return fetch(`${API_ROOT}/posts`)
    .then(json)
    .then(posts => posts.map(buildPost({ withComments: false })));
}

function getPostAndComments(postId) {
  return fetch(`${API_ROOT}/posts/${postId}`)
    .then(json)
    .then(buildPost({ withComments: true }));
}

function createPost({ username, title, body }) {
  const post = { username, title, body };
  return notificationToken.then((token) => {
    post.token = token;
    return addToQueue('postsQueue', post);
  }).then((id) => {
    post.id = id;
    return navigator.serviceWorker.ready;
  }).then(reg => reg.sync.register('send-post-queue')).then(() => {
    const result = {
      id: `post-${post.id}`, time: new Date(), user: username, title, content: body, sync: false,
    };
    return buildPost({ withComments: false })(result);
  });
}

function createComment({ username, body, postId }) {
  const comment = { username, body, postId };
  return notificationToken.then((token) => {
    comment.token = token;
    return addToQueue('commentsQueue', comment);
  }).then((id) => {
    comment.id = id;
    return navigator.serviceWorker.ready.then(reg => reg.sync.register('send-comment-queue'));
  }).then(() => {
    const result = {
      id: `comment-${comment.id}`, time: new Date(), user: username, comment: body, sync: false,
    };
    return buildComment(result);
  });
}

export {
  getPosts,
  getPostAndComments,
  createPost,
  createComment,
};
