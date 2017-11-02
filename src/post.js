import _ from 'lodash';

import { getPostAndComments, createComment, } from './api';
import username from './username';
import { buildPostElement, buildCommentElement } from './util';

import '../assets/stylesheets/index.scss';

const commentsContainer = document.getElementById('comments');
const noCommentsMessage = document.getElementById('no-comments');

const postId = _.toInteger(window.location.pathname.match(/\/posts\/(.*)/)[1]);

getPostAndComments(postId).then(postAndComments => {
  if (!postAndComments) {
    return;
  }

  document.getElementById('post').appendChild(buildPostElement(postAndComments));

  const { comments } = postAndComments;
  if (comments.length > 0) {
    noCommentsMessage.style.display = 'none';
    comments.forEach(comment => {
      commentsContainer.appendChild(buildCommentElement(comment));
    });
  }
});

const commentTitleInput = document.getElementById('comment-title');
const commentBodyInput = document.getElementById('comment-body');
document.getElementById('comment-submit').addEventListener('click', () => {
  createComment({
    postId,
    username,
    title: commentTitleInput.value,
    body: commentBodyInput.value,
  }).then(comment => {
    noCommentsMessage.style.display = 'none';
    commentsContainer.appendChild(buildCommentElement(comment));
  });
});
