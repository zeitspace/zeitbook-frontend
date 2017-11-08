import $ from 'jquery';
import orderBy from 'lodash/orderBy';
import update from 'lodash/update';
import autosize from 'autosize';

import { getPostAndComments, createComment } from './api';
import username from './username';
import { buildPostElement, buildCommentElement } from './util';

// make all textareas auto resize based on content
autosize(document.querySelectorAll('textarea'));

const commentsContainer = $('#comments');
const noCommentsMessage = $('#no-comments');

const postId = window.location.pathname.match(/\/posts\/(.*)/)[1];

getPostAndComments(postId)
  .then(postAndComments => update(postAndComments, 'comments', comments => orderBy(comments, ['time'], ['asc'])))
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

navigator.serviceWorker.addEventListener('message', (event) => {
  if (event.data.type === 'comment-update') {
    const commentData = (({
      comment, user, token, id,
    }) => ({
      body: comment, username: user, token, time: new Date(), id,
    }))(event.data.comment);
    const commentDiv = $(`#comment-${event.data.id}`);
    commentDiv.replaceWith(buildCommentElement(commentData));
  }
});

