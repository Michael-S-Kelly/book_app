'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let list = ['cats', 'corn', 'coffee', 'cool'];
let quantities = [
  { name: 'apples', quantity: 3 },
  { name: 'pears', quantity: 35 },
  { name: 'kiwi', quantity: 4 },
  { name: 'beer', quantity: 3000 },
  { name: 'snakes', quantity: 0 }
]

app.set('view engine', 'ejs');

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/list', (request, response) => {
  response.render('list', { things: list });
});

app.get('/quantities', (request, response) => {
  response.render('quantities', { quantities: quantities })
})

app.listen(PORT, () => {
  console.log(`listening on the coolest port: ${PORT}`);
});