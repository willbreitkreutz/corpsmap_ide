CREATE TABLE projects (
  id INTEGER PRIMARY KEY,
  name TEXT,
  slug TEXT,
  last_published DATE
);

INSERT INTO projects (id, name, slug) values(0, 'testing', 'testing');

CREATE TABLE files (
  id INTEGER PRIMARY KEY,
  project_id NUMBER,
  filename TEXT,
  last_saved DATE
);