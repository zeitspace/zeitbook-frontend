import $ from 'jquery';
import _ from 'lodash';

import { getPosts, createPost } from './api';
import username from './username';
import { buildPostElement } from './util';

import '../assets/stylesheets/index.scss';

const postsContainer = $('#posts');
const noPostsMessage = $('#no-posts');

getPosts()
  .then(posts => _.orderBy(posts, ['time'], ['desc']))
  .then((posts) => {
    if (posts.length > 0) {
      posts.forEach((post) => {
        postsContainer.append(buildPostElement(post, { showCommentsLink: true }));
      });
    } else {
      noPostsMessage.show();
    }
  })
  .catch(() => {
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
        postsContainer.prepend(buildPostElement(post, { showCommentsLink: true }));
      })
      .catch(() => {
        $('#create-post-error').show();
      });
  }
});
