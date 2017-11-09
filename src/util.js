import moment from 'moment';

function addPendingBlock(parentElement) {
  parentElement.classList.add('pending');
  const pendingElement = document.createElement('div');
  const pendingTextNode = document.createTextNode('pending');
  pendingElement.appendChild(pendingTextNode);
  pendingElement.classList.add('pending-text');
  parentElement.appendChild(pendingElement);
}

function buildPostElement({
  id, time, username, body, numComments, synced = true,
}, { linkToComments }) {
  let postElement;
  if (linkToComments) {
    postElement = document.createElement('a');
    postElement.href = `/posts/${id}`;
  } else {
    postElement = document.createElement('div');
  }

  postElement.classList.add('post');
  postElement.id = id;

  const timeElement = document.createElement('div');
  timeElement.title = moment(time).format('MMMM Do, YYYY [at] h:mm:ss A');

  const timeTextNode = document.createTextNode(moment(time).subtract(2, 'second').fromNow());
  timeElement.appendChild(timeTextNode);
  timeElement.classList.add('post-date');

  const usernameElement = document.createElement('div');
  const usernameTextNode = document.createTextNode(username);
  usernameElement.appendChild(usernameTextNode);
  usernameElement.classList.add('post-author');

  const bodyElement = document.createElement('div');
  const bodyTextNode = document.createTextNode(body);
  bodyElement.appendChild(bodyTextNode);
  bodyElement.classList.add('post-body');

  postElement.appendChild(usernameElement);
  postElement.appendChild(timeElement);
  postElement.appendChild(bodyElement);

  if (!synced) {
    addPendingBlock(postElement);
  }

  if (linkToComments) {
    const commentsElement = document.createElement('div');
    const commentsTextNode = document.createTextNode(`${numComments || 0} comment${numComments === 1 ? '' : 's'}`);
    commentsElement.appendChild(commentsTextNode);
    commentsElement.classList.add('post-comment-count');

    postElement.appendChild(commentsElement);
  }

  return postElement;
}

function buildCommentElement({
  time, username, body, id, synced = true,
}) {
  const commentElement = document.createElement('article');
  commentElement.classList.add('comment');
  commentElement.id = id;

  const commentContainer = document.createElement('div');
  commentContainer.classList.add('comment-container');
  const usernameElement = document.createElement('span');
  usernameElement.classList.add('comment-author');
  const usernameTextNode = document.createTextNode(username);
  usernameElement.appendChild(usernameTextNode);

  const bodyElement = document.createElement('span');
  bodyElement.classList.add('comment-body');
  const bodyTextNode = document.createTextNode(body);
  bodyElement.appendChild(bodyTextNode);

  commentContainer.appendChild(usernameElement);
  commentContainer.appendChild(bodyElement);

  const timeElement = document.createElement('div');
  timeElement.title = moment(time).format('MMMM Do, YYYY [at] h:mm:ss A');
  timeElement.classList.add('comment-date');
  const timeTextNode = document.createTextNode(moment(time).fromNow());
  timeElement.appendChild(timeTextNode);

  commentElement.appendChild(commentContainer);
  commentElement.appendChild(timeElement);

  if (!synced) {
    addPendingBlock(commentElement);
  }

  return commentElement;
}

export {
  buildPostElement,
  buildCommentElement,
};
