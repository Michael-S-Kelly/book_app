'use strict';

module.exports = {
  function addBook(request, response) {
    let { title, author, description, ISBN, category, image} = request.body;
    let SQL = 'INSERT INTO books(title, author, description, ISBN, category, image) VALUES ($1, $2, $3, $4, $5);';
    let values = [title, author, description, ISBN, category, image];
  
    return client.query(SQL, values)
      .then(response.redirect('/'))
      .catch(err => handleError(err, response));
  }
}