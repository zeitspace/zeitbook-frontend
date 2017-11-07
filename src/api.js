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
  id, time, user, comment,
}) => ({
  id,
  time: new Date(time),
  username: user,
  body: comment,
});

const buildPost = ({ withComments }) => ({
  id, time, user, title, content, comments, numComments,
}) => {
  const result = {
    id,
    time: new Date(time),
    username: user,
    title,
    body: content,
    numComments,
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
