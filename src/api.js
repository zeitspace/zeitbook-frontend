import env from './environment';
import getNotificationToken from './firebase';
// eslint-disable-next-line no-unused-vars
import { addToQueue, json } from './util';

const { API_ROOT } = env;
const notificationToken = getNotificationToken();

const buildComment = ({
  id, time, user, comment, synced = true,
}) => ({
  id,
  time: new Date(time),
  username: user,
  body: comment,
  synced,
});

const buildPost = ({ withComments }) => ({
  id, time, user, title, content, comments, numComments, synced = true,
}) => {
  const result = {
    id,
    time: new Date(time),
    username: user,
    title,
    body: content,
    numComments,
    synced,
  };
  if (withComments) {
    result.comments = comments.map(buildComment);
  }
  return result;
};

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
  return notificationToken
    .then(token => fetch(`${API_ROOT}/posts`, {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: `user=${username}&title=${title}&content=${body}&token=${token}`,
    }))
    .then(json)
    .then(buildPost({ withComments: false }));
}

function createComment({ username, body, postId }) {
  return notificationToken
    .then(token => fetch(`${API_ROOT}/posts/${postId}/comment`, {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: `user=${username}&comment=${body}&token=${token}`,
    }))
    .then(json)
    .then(buildComment);
}

export {
  getPosts,
  getPostAndComments,
  createPost,
  createComment,
};
