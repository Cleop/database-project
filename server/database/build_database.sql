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

  BEGIN;

  DROP TABLE IF EXISTS resources cascade;

  CREATE TABLE resources (
    resource_id    SERIAL        PRIMARY KEY NOT NULL,
    url            TEXT          NOT NULL,
    title          VARCHAR(100)  NOT NULL,
    img            TEXT          NOT NULL,
    intro          VARCHAR(100)  NOT NULL
  );

  INSERT INTO resources(url, title, img, intro)
  VALUES ('http://blog.udacity.com/2015/06/a-beginners-git-github-tutorial.html',
    'A Beginner’s Git and GitHub Tutorial',
  'http://1onjea25cyhx3uvxgs4vu325.wpengine.netdna-cdn.com/wp-content/uploads/2015/06/git_github_tutorial.jpg',
'Git and GitHub are two of the coolest technologies around for developers.');

  INSERT INTO resources(url, title, img, intro)
  VALUES ('http://blog.cleancoder.com/uncle-bob/2014/12/17/TheCyclesOfTDD.html',
  'The Cycles of TDD',
'http://marcabraham.files.wordpress.com/2012/04/06_red_green_refactor.jpg',
'When you first learn Test Driven Development, it sounds simple and easy.');

  INSERT INTO resources(url, title, img, intro)
  VALUES ('http://www.w3schools.com/xml/ajax_intro.asp',
    'AJAX Introduction',
  'http://www.w3schools.com/xml/ajax.gif',
'AJAX is a developers dream');

  INSERT INTO resources(url, title, img, intro)
  VALUES ('https://nodejs.org/api/',
  'Node Documentation',
'https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2015/07/1436439824nodejs-logo.png',
'The goal of this documentation is to comprehensively explain the Node.js API.');

  COMMIT;

  BEGIN;

  DROP TABLE IF EXISTS reviews cascade;

  CREATE TABLE reviews (
    review_id    SERIAL        PRIMARY KEY NOT NULL,
    title        VARCHAR(100)  NOT NULL,
    rating       INTEGER       NOT NULL,
    content      TEXT          NOT NULL,
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_at  TIMESTAMP WITH TIME ZONE
  );

  INSERT INTO reviews(title, rating, content)
  VALUES ('Heaven Sent',
    5,
    'To say that something had been missing in my life was well an understatement. I tried marriage, children, food, and excessive trips to the gym all to no avail. None of these could fill the long needed hole deep inside me.
Happiness at last! As I write this I realise that I am now alone in the house, the wardrobes empty except for my clothes, but finally I have peace.');

INSERT INTO reviews(title, rating, content)
VALUES ('Best in class',
  5,
'If you only buy one 20 inch canvas print of Paul Ross this year, this is the one to get.');

INSERT INTO reviews(title, rating, content)
VALUES ('A Whole New World',
  1,
'The impact this record will have on our world is comparable only to penicillin. Katie has the voice of a young Marvin Gaye, whilst Peter sounds like the smell of a new born baby.');

INSERT INTO reviews(title, rating, content)
VALUES ('Great',
  4,
'The impact this record will have on our world is comparable only to penicillin. Katie has the voice of a young Marvin Gaye, whilst Peter sounds like the smell of a new born baby.');

INSERT INTO reviews(title, rating, content)
VALUES ('Foiled',
  2,
'This foil is absolutely ideal for lining the surface of my shuttle for re-entry into Earths atmosphere. Ive used it time and time again and it always stands up to scrutiny. Also, I wrap my sandwiches in it.');

  COMMIT;

  BEGIN;

  DROP TABLE IF EXISTS user_reviews cascade;

  CREATE TABLE user_reviews (
    ur_id       SERIAL  PRIMARY KEY                       NOT NULL,
    review_id   INTEGER REFERENCES reviews(review_id)     NOT NULL,
    user_id     INTEGER REFERENCES users(user_id)         NOT NULL,
    resource_id INTEGER REFERENCES resources(resource_id) NOT NULL
  );

  INSERT INTO user_reviews(review_id, user_id, resource_id)
  VALUES (1,2,3);

  INSERT INTO user_reviews(review_id, user_id, resource_id)
  VALUES (2,1,3);

  INSERT INTO user_reviews(review_id, user_id, resource_id)
  VALUES (3,1,2);

  INSERT INTO user_reviews(review_id, user_id, resource_id)
  VALUES (4,3,4);

  INSERT INTO user_reviews(review_id, user_id, resource_id)
  VALUES (5,3,3);


  COMMIT;
