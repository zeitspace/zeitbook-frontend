### Arriving late?

You can start from this step by cloning this repository and checking out the `step-4` branch, or by [downloading the code as a ZIP file](https://github.com/zeitspace/zeitbook-frontend/archive/step-4.zip).

# Push notifications

Background Sync API is important to allow users to create posts and comments while offline. We will move the fetch functions to the service worker and let it take care of it. Background Sync API will try to communicate with the server until it works, if it gets an error it will set up a new sync event and try again.

## Modify the `createPost` function to register a new sync event

Add the following code to `createPost` function on `src\api.js`:

```javascript
  const post = { username, title, body };
  return notificationToken.then((token) => {
    post.token = token;
    return addToQueue('postsQueue', post);
  }).then((id) => {
    post.id = id;
    return navigator.serviceWorker.getRegistration();
  }).then(reg => reg.sync.register('send-post-queue')).then(() => {
    const result = {
      id: `post-${post.id}`, time: new Date(), user: username, title, content: body, synced: false,
    };
    return buildPost({ withComments: false })(result);
  });
```

On the begging, it creates a `post` variable merging username, body and title in a single object.
It requests the user notification token to send it to the server.
Save the post information on a list using IndexedDB
Register a new sync event called `send-post-queue`
And finally, create a new post element to be showed on the frontend

## Modify the `createPost` function to register a new sync event

Add the following code to `createComment` function on `src\api.js`:

```javascript
const comment = { username, body, postId };
return notificationToken.then((token) => {
  comment.token = token;
  return addToQueue('commentsQueue', comment);
}).then((id) => {
  comment.id = id;
  return navigator.serviceWorker.getRegistration();
}).then(reg => reg.sync.register('send-comment-queue'))
  .then(() => {
    const result = {
      id: `comment-${comment.id}`, time: new Date(), user: username, comment: body, synced: false,
    };
    return buildComment(result);
  });
```

The code above is very similar to the `createPost` except that it save the comment on a different list.

## Modify the Service Worker to receive the sync event

Add the following code to `assets/service-worker.js` on the bottom of the file:

```javascript
self.addEventListener('sync', (event) => {
  if (event.tag === 'send-post-queue') {
    event.waitUntil(sendPosts());
  } else if (event.tag === 'send-comment-queue') {
    event.waitUntil(sendComments());
  }
});
```

## Modify the Service Worker to send posts and comments

Add the following code to `assets/service-worker.js`:

```javascript
function sendPosts() {
  return getQueue('postsQueue').then((postsQueue) => {
    let postsList = postsQueue;
    return Promise.all(postsQueue.map(post => fetch(`${API_ROOT}/posts`, {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: `user=${post.username}&title=${post.title}&content=${post.body}&token=${post.token}`,
    }).then(json)
      .then(response => sendMessageToAllClients({ type: 'post-update', id: post.id, post: response }))
      .then(() => {
        postsList = postsList.filter(p => p.id !== post.id);
        return updateQueue('postsQueue', postsList);
      })));
  }).then(() => sendNotification('Pending posts synced'));
}

function sendComments() {
  return getQueue('commentsQueue').then((commentsQueue) => {
    let commentsList = commentsQueue;
    return Promise.all(commentsQueue.map(comment => fetch(`${API_ROOT}/posts/${comment.postId}/comment`, {
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: `user=${comment.username}&comment=${comment.body}&token=${comment.token}`,
    }).then(json)
      .then(response => sendMessageToAllClients({ type: 'comment-update', id: comment.id, comment: response }))
      .then(() => {
        commentsList = commentsList.filter(c => c.id !== comment.id);
        return updateQueue('commentsQueue', commentsList);
      })));
  }).then(() => sendNotification('Pending comments synced'));
}
```

After receive a `send-post-queue` or a `send-comment-queue` the SW will call sendPost or sendComment.
First, it will get all the posts/comments on the waiting list and go throw it.
For each post/comment, it will call a post request on the server.
After that, it will notify the client that the new post was synced.
Then it will remove the post/comment from the queue list.
And finally, it will send a notification to the user.

## Modify the `index` file to update the frontend

Add the following code to `src/index.js` on the bottom of the file:

```javascript
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
```

The code above will create a new post element and replace the unsynced post on the frontend after receiving a message from the server with the type `post-update`.

## Modify the `post` file to update the frontend

Add the following code to `src/index.js` on the bottom of the file:

```javascript
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
```

The code above will create a new comment element and replace the unsynced comment on the frontend after receiving a message from the server with the type `comment-update`.

## Test that notifications work

Now you can test your code creating new posts and comments. You will see that your post/comment will show a pending status until it is synced to the server. You could test it creating new post/comment when your computer WiFi is off; when the WiFi goes on all the posts/comments will be sent to the server.
If you aren't on your app tab when the server sync, you will see a notification.