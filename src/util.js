const buildPostOrCommentElement = type => ({ id, username, title, body }) => {
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

  if (type === 'post') {
    const linkToCommentsElement = document.createElement('a');
    linkToCommentsElement.href = `/posts/${id}`;

    const linkToCommentsTextNode = document.createTextNode('See comments');
    linkToCommentsElement.appendChild(linkToCommentsTextNode);

    articleElement.appendChild(linkToCommentsElement);
  }

  return articleElement;
};

const buildPostElement = buildPostOrCommentElement('post');
const buildCommentElement = buildPostOrCommentElement('comment');

export {
  buildPostElement,
  buildCommentElement,
};
