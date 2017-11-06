const registerServiceWorker = navigator.serviceWorker.register('/service-worker.js')
  .then(registration => messaging.useServiceWorker(registration));

export default () => Promise.resolve('TODO: implement push notifications');
