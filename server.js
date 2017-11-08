const compression = require('compression');
const express = require('express');

const app = express();

app.use(compression());

app.use(express.static('dist'));
app.use(express.static('assets'));

app.get('/', (request, response) => {
  response.sendFile('assets/pages/index.html', { root: __dirname });
});

app.get('/posts/:id', (request, response) => {
  response.sendFile('assets/pages/post.html', { root: __dirname });
});

app.get('/manifest.json', (request, response) => {
  response.sendFile('/assets/manifest.json', { root: __dirname });
});

app.get('/service-worker.js', (request, response) => {
  response.sendFile('/assets/javascripts/service-worker.js', { root: __dirname });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('To use Zeitbook, open http://localhost:3000 in your browser.');
});
