import _ from 'lodash';

import { getPostAndComments, createComment, } from './api';
import username from './username';
import { buildPostElement, buildCommentElement } from './util';

import '../assets/stylesheets/index.scss';

const commentsContainer = document.getElementById('comments');
const noCommentsMessage = document.getElementById('no-comments');

const postId = window.location.pathname.match(/\/posts\/(.*)/)[1];

getPostAndComments(postId).then(postAndComments => {
  if (!postAndComments) {
    return;
  }

  const { title, comments } = postAndComments;

  document.title = `Zeitbook | ${_.truncate(title)}`;

  document.getElementById('post').appendChild(buildPostElement(postAndComments));

  if (comments.length > 0) {
    noCommentsMessage.style.display = 'none';
    comments.forEach(comment => {
      commentsContainer.appendChild(buildCommentElement(comment));
    });
  }
});

const commentBodyInput = document.getElementById('comment-body');
document.getElementById('comment-submit').addEventListener('click', () => {
  if (document.getElementById('create-comment').checkValidity()) {
    createComment({
      postId,
      username,
      body: commentBodyInput.value,
    }).then(comment => {
      noCommentsMessage.style.display = 'none';
      commentBodyInput.value = '';
      commentsContainer.appendChild(buildCommentElement(comment));
    });
  }
});
