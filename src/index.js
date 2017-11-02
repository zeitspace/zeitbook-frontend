import _ from 'lodash';

import {
  getPosts,
  createPost,
} from './api';

// TODO: replace this randomly-generated username with one of your choosing
const username = _(_.times(6, () => _.random(25)))
  .map(n => String.fromCharCode(97 + n))
  .join('');

function buildPostElement({ username, title, body }) {
  const articleElement = document.createElement('article');

  const titleElement = document.createElement('h2');
  const titleTextNode = document.createTextNode(title);
  titleElement.appendChild(titleTextNode);

  const usernameElement = document.createElement('h3');
  const usernameTextNode = document.createTextNode(`By ${username}`);
  usernameElement.appendChild(usernameTextNode);

  const bodyElement = document.createElement('p');
  const bodyTextNode = document.createTextNode(body);
  bodyElement.appendChild(bodyTextNode);

  articleElement.appendChild(titleElement);
  articleElement.appendChild(usernameElement);
  articleElement.appendChild(bodyElement);

  return articleElement;
}

const postsContainer = document.getElementById('posts');
getPosts().then(posts => {
  if (posts.length > 0) {
    document.getElementById('no-posts').style.display = 'none';
    posts.forEach(post => {
      postsContainer.appendChild(buildPostElement(post));
    });
  }
});
