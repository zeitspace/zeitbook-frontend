## Configure Firebase

- Open the file `firebase.js` in the folder `src`.
- Insert the following code to import the Firebase module.

```javascript
import * as firebase from 'firebase';
```

- Now we need access to the Firebase database. Insert the following config with all the needed keys.

```javascript
const config = {
  apiKey: 'AIzaSyCm6wDitw69vDYVnLcNG91LrV3ClEm_rHc',
  authDomain: 'zeitspace-forum.firebaseapp.com',
  databaseURL: 'https://zeitspace-forum.firebaseio.com',
  projectId: 'zeitspace-forum',
  storageBucket: 'zeitspace-forum.appspot.com',
  messagingSenderId: '81782109643',
};
```

# Setup Notifications

- The following code initializes Firebase Messaging.

```javascript
firebase.initializeApp(config);
const messaging = firebase.messaging();
```

- Now we need to get the messaging token for our device and save it in our local storage

```javascript
function storeNotificationToken(token) {
  localStorage.setItem('notificationToken', token);
}

messaging.onTokenRefresh(() => {
  messaging.getToken()
    .then(storeNotificationToken)
    .catch(error => console.log(error));
});

function getNotificationToken() {
  return registerServiceWorker
    .then(() => new Promise((resolve) => {
      const storedToken = localStorage.getItem('notificationToken');
      if (storedToken) {
        resolve(storedToken);
      } else {
        messaging.requestPermission()
          .then(() => messaging.getToken())
          .then((token) => {
            storeNotificationToken(token);
            resolve(token);
          })
          .catch(error => console.log(error));
      }
    }));
}

export default getNotificationToken;
```

# Test

- Open it using Google Chrome
- When prompted, allow push notifications for your app
- Create a new post
- Change tabs, then open the app in an incognito window.
- Comment on the post you just created in the incognito window
- You should see a new comment notification

[Move on to the next step: Offline Sync](./04-offline-sync.md)
