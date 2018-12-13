'use strict';

module.exports = {
  function getOneBook(request, response) {
    let SQL = 'SELECT * FROM books WHERE id=$1;';
    let values = [request.params.book_id];
  
    return client.query(SQL, values)
      .then(result => {
        return response.render('pages /*temperary place holder*/ ', { book: result.row[0] });
      });
  }
}