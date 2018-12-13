DROP DATABASE todo_app_demo;
CREATE DATABASE todo_app_demo;
\c todo_app_demo;

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  contact VARCHAR(255),
  status BOOLEAN,
  category VARCHAR(255),
  due DATE NOT NULL DEFAULT NOW()
);

INSERT INTO tasks (title, contact, status, category, description) VALUES ('do some shit', 'brian', FALSE, 'things that we do', 'when i do certain things i do shit');