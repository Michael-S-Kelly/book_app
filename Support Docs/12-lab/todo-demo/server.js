'use strict';

// npm packages (dependencies)
const express = require('express');
const app = express();
const pg = require('pg');
const PORT = process.env.PORT || 3000;

// middleware (captures the req/res and modifies)
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

// set the server side templating engine
app.set('view engine', 'ejs');

// pull in project specific environment variables
require('dotenv').config();

// setup connection to a specific DB
const client = new pg.Client('postgres://localhost:5432/todo_app_demo');
client.connect();
client.on('error', err => console.error(err));

// application routes
app.get('/', getTasks);
app.get('/add', showForm);
app.post('/add', addTask);
app.get('/tasks/:task_id', getOneTask);

function getTasks(request, response) {
  let SQL = 'SELECT * from tasks;';

  return client.query(SQL)
    .then( results => response.render('index', { results: results.rows }))
    .catch(err => console.error(err));
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
    .catch(err => console.error(err));
}

function getOneTask(request, response) {
  let SQL = 'SELECT * FROM tasks WHERE id=$1;';
  let values = [request.params.task_id];

  return client.query(SQL, values)
  .then(result => {
    return response.render('pages/detail-view', { task: result.rows[0] });
  });
}

// catch-all route
app.get('*', (req, res) => res.status(404).send('not found'));

// spin up our app and listen on port 3000 (or process.env.PORT)
app.listen(PORT, () => {
  console.log(`listening on PORT: ${PORT}`);
});
