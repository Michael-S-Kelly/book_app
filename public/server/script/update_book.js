'use strict';

module.exports = {
  function updateBook(request, response) {
    let { title, author, description, ISBN, category, image } = request.body;
  
    let SQL = 'UPDATE tasks SET title=$1, author=$2, description=$3, ISBN=$4, category=$5, image=$6 WHERE id=$7;';
  
    let values = [title, author, description, ISBN, category, image];
  
    client.query(SQL, values)
      .then(response.redirect(`/books/${request.params.book_id}`))
      .catch(err => handleError(err, response));
  }
}