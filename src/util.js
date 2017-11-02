function buildPostOrCommentElement({ username, title, body }) {
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

const buildPostElement = buildPostOrCommentElement;
const buildCommentElement = buildPostOrCommentElement;

export {
  buildPostElement,
  buildCommentElement,
};
