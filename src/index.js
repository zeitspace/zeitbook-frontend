import _ from 'lodash';

import { getPosts, createPost } from './api';
import username from './username';
import { buildPostElement } from './util';

import '../assets/stylesheets/index.scss';

const postsContainer = document.getElementById('posts');
const noPostsMessage = document.getElementById('no-posts');

getPosts().then(posts => {
  if (posts.length > 0) {
    noPostsMessage.style.display = 'none';
    posts.forEach(post => {
      postsContainer.appendChild(buildPostElement(post));
    });
  }
});

const postTitleInput = document.getElementById('post-title');
const postBodyInput = document.getElementById('post-body');
document.getElementById('post-submit').addEventListener('click', () => {
  if (document.getElementById('create-post').checkValidity()) {
    createPost({
      username,
      title: postTitleInput.value,
      body: postBodyInput.value,
    }).then(post => {
      noPostsMessage.style.display = 'none';
      postTitleInput.value = '';
      postBodyInput.value = '';
      postsContainer.appendChild(buildPostElement(post));
    });
  }
});
