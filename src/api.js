import _ from 'lodash';

const storage = window.localStorage;

function get(key, defaultValue) {
  return JSON.parse(storage.getItem(key)) || defaultValue;
}

function set(key, value) {
  storage.setItem(key, JSON.stringify(value));
}

function getPosts() {
  return Promise.resolve(_.map(get('posts', []), post => _.pick(post, ['id', 'username', 'title', 'body'])));
}

function getPostAndComments(postId) {
  return Promise.resolve(_.find(get('posts', []), { id: postId }));
}

function createPost({ username, title, body }) {
  const id = get('nextPostId', 1);
  set('nextPostId', id + 1);

  const post = {
    username,
    title,
    body,
    id,
    comments: [],
  };
  set('posts', _.concat(get('posts', []), [post]));
  return Promise.resolve(post);
}

function createComment({ username, title, body, postId }) {
  const id = get('nextCommentId', 1);
  set('nextCommentId', id + 1);

  const comment = {
    username,
    title,
    body,
    postId,
    id,
  };

  const posts = get('posts');
  posts.forEach(post => {
    if (post.id === postId) {
      post.comments.push(comment);
    }
  });
  set('posts', posts);

  return Promise.resolve(comment);
}

export {
  getPosts,
  getPostAndComments,
  createPost,
  createComment,
};
