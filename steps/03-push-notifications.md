# Configure Firebase

- Open the file `firebase.js` on the folder `src`
- Import the firebase module

```javascript
import * as firebase from 'firebase';
```

- Create a config variable with all the needed keys

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

- Initialize Firebase Messaging

```javascript
firebase.initializeApp(config);
const messaging = firebase.messaging();
```

- Get messaging token and save it on LocalStorage

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

- Open it using Chrome browser
- Allow push notifications for your app
- Create a new post
- Comment on it
- You should see a new comment notification

[Move on to the next step: Offline Sync](./04-offline-sync.md)
