import * as firebase from 'firebase/app';
import 'firebase/messaging';

const config = {
  apiKey: 'AIzaSyCm6wDitw69vDYVnLcNG91LrV3ClEm_rHc',
  authDomain: 'zeitspace-forum.firebaseapp.com',
  databaseURL: 'https://zeitspace-forum.firebaseio.com',
  projectId: 'zeitspace-forum',
  storageBucket: 'zeitspace-forum.appspot.com',
  messagingSenderId: '81782109643',
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

const registerServiceWorker = navigator.serviceWorker.register('/service-worker.js')
  .then(registration => messaging.useServiceWorker(registration));

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
