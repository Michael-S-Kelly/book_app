'use strict';

// npm packages (dependencies)
const express = require('express');
const app = express();
const pg = require('pg');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;

// middleware (captures the req/res and modifies)
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.use(methodOverride((request, response) => {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}))

// set the server side templating engine
app.set('view engine', 'ejs');

// pull in project specific environment variables
require('dotenv').config();

// setup connection to a specific DB
const client = new pg.Client('postgres://localhost:5432/todo_app_demo');
client.connect();
client.on('error', err => console.error(err));

// application routes
app.get('/', getTasks); // CRUD - READ
app.get('/add', showForm);
app.post('/add', addTask); // CRUD - CREATE
app.get('/tasks/:task_id', getOneTask); // CRUD - READ

// part 2
app.put('/update/:task_id', updateTask);

function getTasks(request, response) {
  let SQL = 'SELECT * from tasks;';

  return client.query(SQL)
    .then( results => response.render('index', { results: results.rows }))
    .catch(err => handleError(err, response));
}

function showForm(request, response) {
  response.render('pages/add-view');
}

function addTask(request, response) {
  let { title, description, category, contact, status } = request.body;

  let SQL = 'INSERT INTO tasks(title, description, category, contact, status) VALUES ($1, $2, $3, $4, $5);';
  let values = [title, description, category, contact, status];

  return client.query(SQL, values)
    .then(response.redirect('/'))
    .catch(err => handleError(err, response));
}

function getOneTask(request, response) {
  let SQL = 'SELECT * FROM tasks WHERE id=$1;';
  let values = [request.params.task_id];

  return client.query(SQL, values)
  .then(result => {
    return response.render('pages/detail-view', { task: result.rows[0] });
  });
}

function updateTask(request, response) {
  let { title, description, category, contact, status } = request.body;

  let SQL = 'UPDATE tasks SET title=$1, description=$2, category=$3, contact=$4, status=$5 WHERE id=$6;';

  let values = [title, description, category, contact, status, request.params.task_id];

  client.query(SQL, values)
  .then(response.redirect(`/tasks/${request.params.task_id}`))
  .catch(err => handleError(err, response));
}

function handleError(error, response) {
  response.render('pages/error-view', { error: 'Oh no!  Something went wrong!' });
}

// catch-all route
app.get('*', (req, res) => res.status(404).send('not found'));

// spin up our app and listen on port 3000 (or process.env.PORT)
app.listen(PORT, () => {
  console.log(`listening on PORT: ${PORT}`);
});
