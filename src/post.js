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

    const { title, comments } = postAndComments;

    document.title = `Zeitbook | ${_.truncate(title)}`;

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
        noCommentsMessage.show();
        commentBodyInput.val('');
        commentsContainer.append(buildCommentElement(comment));
      })
      .catch(() => {
        $('#create-comment-error').show();
      });
  }
});
