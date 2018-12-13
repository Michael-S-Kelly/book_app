'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.post('/tweet', (request, response) => {
  console.log('my request body:', request.body);
  // response.sendfile('./thanks.html', {root: './public'});
});

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});