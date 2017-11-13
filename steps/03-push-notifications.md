# Push notifications

Push notifications are great for keeping users engaged with your application. Here, you'll use [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/) to display push notifications when someone comments on your post or comments on a post that you've also commented on.

## Add the `gcm_sender_id` to your web app manifest

Add the following key-value pair to `assets/manifest.json`:

```
    "gcm_sender_id": "103953800507"
```

This hardcoded value indicates to browsers that Firebase Cloud Messaging is authorized to send messages to your application.

## Configure Firebase

Add the following code at the top of `src/firebase.js`:

```javascript
import * as firebase from 'firebase/app';
import 'firebase/messaging';
```

Then, add the following code below `import registerServiceWorker from './service-worker';`:

```javascript
const config = {
  apiKey: 'AIzaSyCm6wDitw69vDYVnLcNG91LrV3ClEm_rHc',
  authDomain: 'zeitspace-forum.firebaseapp.com',
  databaseURL: 'https://zeitspace-forum.firebaseio.com',
  projectId: 'zeitspace-forum',
  storageBucket: 'zeitspace-forum.appspot.com',
  messagingSenderId: '81782109643',
};
firebase.initializeApp(config);
```

This code sets up your application to connect to the Zeitbook API's Firebase project.

## Include your application's notification token in API requests

Firebase Cloud Messaging assigns your application a notification token. Zeitbook's backend can use this token to send push messages to your application. Here, you'll set up your application to send its notification token to the backend.

To keep this demo application simple, we've decided not to have a concept of user accounts. In a real-world application, instead of storing tokens as a part of each post and comment by a user, you would store them as attributes of users. See [the Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/js/first-message) documentation for more details.

Replace the last two lines of `src/firebase.js` with the following code:

```javascript
const messaging = firebase.messaging();

function getToken() {
  return messaging.getToken()
    .then(token => token || messaging.requestPermission().then(getToken))
    .catch(() => null);
}

function getNotificationToken() {
  return registerServiceWorker
    .then(registration => messaging.useServiceWorker(registration))
    .then(getToken);
}

export default getNotificationToken;
```

Before making POST requests to the backend, the functions in `src/api.js` wait for the Promise `getNotificationToken()` to resolve, then include the resulting token in their requests to the backend.

`getNotificationToken` follows a three-step process for obtaining the notification token. First, it waits for the application's service worker to be registered. Then, it specifies that the Firebase Cloud Messaging client-side library should use this service worker to receive push messages. Finally, it calls `getToken`, which retrieves the token from the FCM library.

`messaging.getToken` returns `null` if the user hasn't granted permission to receive notifications. If this occurs, `getToken` calls `messaging.requestPermission` to ask for permission, then calls itself. If `messaging.requestPermission` throws an error, this indicates that the user has denied permission to your application to display notifications. In this case, `getToken` simply returns `null`.

## Display notifications when your application receives a message from the server

Add the following code to the top of `assets/service-worker.js`:

```javascript
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '81782109643',
});

firebase.messaging().setBackgroundMessageHandler();
```

This code sets up your service worker to receive push messages from Firebase Cloud Messaging. The Cloud Messaging library will automatically display a push notification whenever a message is received.

## Test that notifications work

Open your application using Google Chrome. When prompted, allow push notifications for your app. Create a new post, then change tabs. (Notifications will only appear when your application is in the background, i.e. when Chrome isn't the focused window or your application isn't the focused tab.)

You now have two ways to test your code. First, you can ask another workshop participant to comment on your post. Or, you can open your application in an incognito window and comment on your own post. (This works because notification tokens are unique by browser session. When the backend sends a notification using your original tab's notification token, Chrome will display the notification because your original tab is in the background.)

Please note that, if you create a post in an incognito window, then comment on it from a different window, you won't receive a notification. This is because notifications are always disabled in incognito windows, so posts created won't have a notification token associated with them.

## Next step

[Use the Background Sync API to allow users to create posts and comments while offline.](./04-background-sync.md)
