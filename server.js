const express = require('express');

const app = express();

app.use(express.static('dist'));

app.get('/', (request, response) => {
  response.sendFile('assets/pages/index.html', { root: __dirname });
});

app.listen(3000, () => {
  console.log('To use Zeitbook, open http://localhost:3000 in your browser.')
});
