import $ from 'jquery';
import _ from 'lodash';
import autosize from 'autosize';

import { getPosts, createPost } from './api';
import username from './username';
import { buildPostElement } from './util';

import '../assets/stylesheets/index.scss';

// make all textareas auto resize based on content
autosize(document.querySelectorAll('textarea'));

const postsContainer = $('#posts');
const noPostsMessage = $('#no-posts');
const spinner = $('#spinner');

getPosts()
  .then(posts => _.orderBy(posts, ['time'], ['desc']))
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
