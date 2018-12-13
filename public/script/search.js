'use strict';

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