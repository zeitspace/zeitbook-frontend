import moment from 'moment';

function buildPostElement({ id, time, username, title, body }, { showCommentsLink }) {
  const articleElement = document.createElement('article');

  const titleElement = document.createElement('h2');
  const titleTextNode = document.createTextNode(title);
  titleElement.appendChild(titleTextNode);

  const usernameElement = document.createElement('h3');
  const usernameTextNode = document.createTextNode(`By ${username}`);
  usernameElement.appendChild(usernameTextNode);

  const timeElement = document.createElement('p');
  const timeTextNode = document.createTextNode(moment(time).fromNow());
  timeElement.appendChild(timeTextNode);

  const bodyElement = document.createElement('p');
  const bodyTextNode = document.createTextNode(body);
  bodyElement.appendChild(bodyTextNode);

  articleElement.appendChild(titleElement);
  articleElement.appendChild(usernameElement);
  articleElement.appendChild(timeElement);
  articleElement.appendChild(bodyElement);

  if (showCommentsLink) {
    const linkToCommentsElement = document.createElement('a');
    linkToCommentsElement.href = `/posts/${id}`;

    const linkToCommentsTextNode = document.createTextNode('See comments');
    linkToCommentsElement.appendChild(linkToCommentsTextNode);

    articleElement.appendChild(linkToCommentsElement);
  }

  return articleElement;
}

function buildCommentElement({ time, username, body }) {
  const articleElement = document.createElement('article');

  const usernameElement = document.createElement('h3');
  const usernameTextNode = document.createTextNode(username);
  usernameElement.appendChild(usernameTextNode);

  const timeElement = document.createElement('p');
  const timeTextNode = document.createTextNode(moment(time).fromNow());
  timeElement.appendChild(timeTextNode);

  const bodyElement = document.createElement('p');
  const bodyTextNode = document.createTextNode(body);
  bodyElement.appendChild(bodyTextNode);

  articleElement.appendChild(usernameElement);
  articleElement.appendChild(timeElement);
  articleElement.appendChild(bodyElement);

  return articleElement;
}

export {
  buildPostElement,
  buildCommentElement,
};
