import _ from 'lodash';

const API_ROOT = 'http://localhost:3001';

function json(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw response.status;
  }
}

const buildPost = ({ withComments }) => ({ id, time, user, title, content, comments }) => {
  const result = {
    id,
    time: new Date(time),
    username: user,
    title,
    body: content,
  };
  if (withComments) {
    result.comments = _.map(comments, buildComment);
  }
  return result;
};

const buildComment = ({ id, time, user, comment }) => ({
  id,
  time: new Date(time),
  username: user,
  body: comment,
});

function getPosts() {
  return fetch(`${API_ROOT}/posts`)
    .then(json)
    .then(posts => _.map(posts, buildPost({ withComments: false })));
}

function getPostAndComments(postId) {
  return fetch(`${API_ROOT}/posts/${postId}`)
    .then(json)
    .then(buildPost({ withComments: true }));
}

function createPost({ username, title, body }) {
  return fetch(`${API_ROOT}/posts`, {
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: `user=${username}&title=${title}&content=${body}`,
  })
    .then(json)
    .then(buildPost({ withComments: false }));
}

function createComment({ username, body, postId }) {
  return fetch(`${API_ROOT}/posts/${postId}/comments`, {
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: `user=${username}&content=${body}`,
  })
    .then(json)
    .then(buildComment);
}

export {
  getPosts,
  getPostAndComments,
  createPost,
  createComment,
};
