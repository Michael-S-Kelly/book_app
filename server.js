'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const superagent = require('superagent');


// const main = requires('/script/main.js')

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (request, response) => {
  response.render('../views/pages/index');
});


function getBooks (req, res) {
  let url = 'https://www.googleapis.com/books/v1/{collectionName}/resourceID?parameters';
    return superagent.get(url)
  .then(data => {
    let everyBook = data.body.items.map (data => {
      const newBook = new Books(data);
      return newBook;
    });
    return everyBook;

  }).then(everyBook => res.render ('./pages/index/show', {books: everyBook}))
    .catch(error => errorHandler(error));
};


function Books(data) {
  this.title = data.volumeInfo.title || 'Not Available';
  this.author = data.volumeInfo.author || 'Not Available';
  this.description = data.volumeInfo.description || 'Not Available';
  this.thumbnail= data.volumeInfo.imageLinks.thumbnail || 'https://via.placeholder.com/128x200.png';
}


function errorHandler (err, res) {
  console.error (err);
  if (res) res.status(500).send('Something is broken')
}


app.listen(PORT, () => {
  console.log(`listening on the coolest port: ${PORT}`);
})
