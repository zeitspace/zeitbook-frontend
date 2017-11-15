const env = {
  API_ROOT: 'https://zeitbook.herokuapp.com', // Or localhost:3001 if you're running the API server locally
  FIREBASE_CREDENTIALS: {
    apiKey: 'AIzaSyCm6wDitw69vDYVnLcNG91LrV3ClEm_rHc',
    authDomain: 'zeitspace-forum.firebaseapp.com',
    databaseURL: 'https://zeitspace-forum.firebaseio.com',
    projectId: 'zeitspace-forum',
    storageBucket: 'zeitspace-forum.appspot.com',
    messagingSenderId: '81782109643',
  }, // You can also replace this object with your own Firebase credentials
};

// We've set up Webpack with an instance of DefinePlugin that will cause `self.WEBPACK` to be
// rewritten to `true` when this file is processed by Webpack. This is so that this file is
// treated as a Node.js module by Webpack, but as a plain JavaScript file by the service
// worker (which also imports it).
if (self.WEBPACK) { // eslint-disable-line no-restricted-globals
  module.exports = env;
}
