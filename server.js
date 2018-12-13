'use strict';

//==================NPM Packages (Dependencies)==================================
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const superagent = require('superagent');
//==========================================================================================

/*
//================Middleware (Captures the req/res and modifies)=========================
app.use(express.urlencoded({ exteded: true}));
app.use(express.static('./public'));

app.use(methodOverride((request, response) => {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}))
//==========================================================================================
*/

//================Set the Server Side Templating Engine============================
app.set('view engine', 'ejs');
//==========================================================================================

//================Pull in Project Specific Environment Variables============================
require('dotenv').config();
//==========================================================================================

//================Set Connection to a specific Database============================
const client = new pg.Client ('postgres://localhost:5432/book_app');
client.connect();
client.on('error', err => console.error(err));
//==========================================================================================

//================Application Routes============================
app.get('/', getSavedBooks); //====CRUD-Read
app.get('/add', showForm);
app.post('/add', addBook);  //====CRUD-Create
app.get('/books/:book_id', getOneBook);  //====CRUD-Read
app.put('/update/:book_id', updateBook);  //====CRUD-Update
//==========================================================================================

/*
//================Node JS Server Module Routes============================
const addBooks = requires('./server/script/add_book.js')
const getBooks = requires('./server/script/get_books.js')
const getOneBook = requires('./server/script/get_one_book.js')
const getSavedBooks = requires('./server/script/get_saved_books.js')
const handleError = requires('./server/script/handle_error.js')
const showForm = requires('./server/script/show_form.js')
const UpdateBook = requires('./server/script/update_book.js')
//==========================================================================================
*/

//===================Applications=====Get Saved Books==============================
function getSavedBooks(request, response) {
  let SQL = 'SELECT * from books;';

  return client.query(SQL)
    .then( results => response.render('index', { results: results.row }))
    .catch(err => handleError(err, response));
}
//==========================================================================================


//===================Applications=====Show Form==============================
function showForm(request, response) {
  response.render('pages /*temperary place holder*/ ');
}
//==========================================================================================

//===================Applications=====Add Book==============================
function addBook(request, response) {
  let { title, author, description, ISBN, category, image} = request.body;
  let SQL = 'INSERT INTO books(title, author, description, ISBN, category, image) VALUES ($1, $2, $3, $4, $5);';
  let values = [title, author, description, ISBN, category, image];

  return client.query(SQL, values)
    .then(response.redirect('/'))
    .catch(err => handleError(err, response));
}
//==========================================================================================

//===================Applications=====Get One Book==============================
function getOneBook(request, response) {
  let SQL = 'SELECT * FROM books WHERE id=$1;';
  let values = [request.params.book_id];

  return client.query(SQL, values)
    .then(result => {
      return response.render('pages /*temperary place holder*/ ', { book: result.row[0] });
    });
}
//==========================================================================================

//===================Applications=====Update Book==============================
function updateBook(request, response) {
  let { title, author, description, ISBN, category, image } = request.body;

  let SQL = 'UPDATE tasks SET title=$1, author=$2, description=$3, ISBN=$4, category=$5, image=$6 WHERE id=$7;';

  let values = [title, author, description, ISBN, category, image];

  client.query(SQL, values)
    .then(response.redirect(`/books/${request.params.book_id}`))
    .catch(err => handleError(err, response));
}
//==========================================================================================

//===================Applications=====Handle Error==============================
function handleError(error, response) {
  response.render('pages/ /* */', { error: 'Oh Nose! Something went Wrong!' });
}
//==========================================================================================

//======================Catch-All Route==============================
app.get('*', (request, response) => response.status(404).send('Not Found'));
//==========================================================================================

//======================Spin Up and Listen==============================
app.listen(PORT, () => {
  console.log(`listening on the coolest port: ${PORT}`);
})
//==========================================================================================


// const main = requires('/script/main.js')

/*
app.get('/', (request, response) => {response.render('../views/pages/index');});

app.get('/search', (request, response) => {response.render('../views/pages/searches');});

app.get('/layout', (request, response) => {response.render('../views/pages/layout/')})

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



app.listen(PORT, () => {
  console.log(`listening on the coolest port: ${PORT}`);
})
*/