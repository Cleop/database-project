  BEGIN;

  DROP TABLE IF EXISTS users cascade;

  CREATE TABLE users (
    user_id    SERIAL        PRIMARY KEY NOT NULL,
    firstname  VARCHAR(100)  NOT NULL,
    lastname   VARCHAR(100)  NOT NULL,
    email      citext UNIQUE NOT NULL,
    password   VARCHAR(100)   NOT NULL
  );

  INSERT INTO users(firstname, lastname, email, password)
  VALUES ('Tom', 'Barrett', 'tom@fac.com', 'tom123');

  INSERT INTO users(firstname, lastname, email, password)
  VALUES ('Ewelina', 'Skibinska', 'ewelina@fac.com', 'ewelina123');

  INSERT INTO users(firstname, lastname, email, password)
  VALUES ('Peter', 'Rhodes', 'peter@fac.com', 'peter123');

  INSERT INTO users(firstname, lastname, email, password)
  VALUES ('Cleo', 'Pearson', 'cleo@fac.com', 'cleo123');

  COMMIT;
