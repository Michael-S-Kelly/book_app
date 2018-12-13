'use strict';

module.exports = {
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
    this.image= data.volumeInfo.imageLinks.thumbnail || 'https://via.placeholder.com/128x200.png';
  }
}