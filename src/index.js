import $ from 'jquery';
import orderBy from 'lodash/orderBy';
import autosize from 'autosize';

import { getPosts, createPost } from './api';
import username from './username';
import { buildPostElement } from './util';

// make all textareas auto resize based on content
autosize(document.querySelectorAll('textarea'));

const postsContainer = $('#posts');
const noPostsMessage = $('#no-posts');
const spinner = $('#spinner');

getPosts()
  .then(posts => orderBy(posts, ['time'], ['desc']))
  .then((posts) => {
    spinner.remove();
    if (posts.length > 0) {
      noPostsMessage.remove();
      posts.forEach((post) => {
        postsContainer.append(buildPostElement(post, { linkToComments: true }));
      });
    } else {
      noPostsMessage.show();
    }
  })
  .catch(() => {
    spinner.remove();
    $('#posts-error').show();
  });

const postTitleInput = $('#post-title');
const postBodyInput = $('#post-body');
$('#post-submit').click(() => {
  if ($('#create-post')[0].checkValidity()) {
    createPost({
      username,
      title: postTitleInput.val(),
      body: postBodyInput.val(),
    })
      .then((post) => {
        noPostsMessage.hide();
        postTitleInput.val('');
        postBodyInput.val('');
        postsContainer.prepend(buildPostElement(post, { linkToComments: true }));
      })
      .catch(() => {
        $('#create-post-error').show();
      });
  }
});

navigator.serviceWorker.addEventListener('message', (event) => {
  if (event.data.type === 'post-update') {
    const postDiv = $(`#post-${event.data.id}`);
    const postData = (({
      content, user, token, id, numComments, title,
    }) => ({
      body: content, username: user, token, time: new Date(), id, numComments, title,
    }))(event.data.post);
    postDiv.replaceWith(buildPostElement(postData, { linkToComments: true }));
  }
});
