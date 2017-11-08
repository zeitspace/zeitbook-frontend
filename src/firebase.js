import registerServiceWorker from './service-worker';

export default () => registerServiceWorker
  .then(Promise.resolve('TODO: implement push notifications'));
