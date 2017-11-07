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

function getToken() {
  return messaging.getToken()
    .then(token => token || messaging.requestPermission().then(getToken))
    .catch(() => null);
}

function getNotificationToken() {
  return registerServiceWorker
    .then(getToken);
}

export default getNotificationToken;
