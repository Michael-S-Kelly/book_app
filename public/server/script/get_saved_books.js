'use strict';

module.exports = {
  function getSavedBooks(request, response) {
    let SQL = 'SELECT * from books;';
  
    return client.query(SQL)
      .then( results => response.render('index', { results: results.row }))
      .catch(err => handleError(err, response));
  }
}