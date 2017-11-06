import $ from 'jquery';
import _ from 'lodash';

import { getPostAndComments, createComment } from './api';
import username from './username';
import { buildPostElement, buildCommentElement } from './util';

import '../assets/stylesheets/index.scss';

const commentsContainer = $('#comments');
const noCommentsMessage = $('#no-comments');

const postId = window.location.pathname.match(/\/posts\/(.*)/)[1];

getPostAndComments(postId)
  .then(postAndComments => _.update(postAndComments, 'comments', comments => _.orderBy(comments, ['time'], ['asc'])))
  .then((postAndComments) => {
    if (!postAndComments) {
      return;
    }

    const { username: postUsername, comments } = postAndComments;

    document.title = `Zeitbook | ${postUsername}'s post`;

    $('#post').append(buildPostElement(postAndComments, { linkToComments: false }));

    if (comments.length > 0) {
      comments.forEach((comment) => {
        commentsContainer.append(buildCommentElement(comment));
      });
    } else {
      noCommentsMessage.show();
    }
  })
  .catch(() => {
    $('#comments-error').show();
  });

const commentBodyInput = $('#comment-body');
$('#comment-submit').click(() => {
  if ($('#create-comment')[0].checkValidity()) {
    createComment({
      postId,
      username,
      body: commentBodyInput.val(),
    })
      .then((comment) => {
        noCommentsMessage.hide();
        commentBodyInput.val('');
        commentsContainer.append(buildCommentElement(comment));
      })
      .catch(() => {
        $('#create-comment-error').show();
      });
  }
});
