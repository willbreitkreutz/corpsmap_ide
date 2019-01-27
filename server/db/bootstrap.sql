CREATE TABLE projects (
  id INTEGER PRIMARY KEY,
  name TEXT,
  slug TEXT,
  last_published DATE
);

CREATE TABLE files (
  id INTEGER PRIMARY KEY,
  project_id NUMBER,
  filename TEXT,
  last_saved DATE
);