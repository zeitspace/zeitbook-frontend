import _ from 'lodash';

const posts = [];
let nextPostId = 1;
let nextCommentId = 1;

function getPosts() {
  return _.map(posts, post => _.pick(post, ['username', 'title', 'body']));
}

function getPostAndComments(postId) {
  return _.find(posts, { id: postId });
}

function createPost({ username, title, body }) {
  const post = {
    username,
    title,
    body,
    id: nextPostId,
    comments: [],
  };
  nextPostId += 1;
  posts.push(post);
  return post;
}

function createComment({ username, title, body, postId }) {
  const comment = {
    username,
    title,
    body,
    postId,
    id: nextCommentId,
  };
  nextCommentId += 1;

  const post = _.find(posts, { id: postId });
  post.comments.push(comment);

  return comment;
}

export {
  getPosts,
  getPostAndComments,
  createPost,
  createComment,
};
