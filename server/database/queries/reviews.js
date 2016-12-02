const db_conn = require('../db_connection');

const getAll = cb => {
  db_conn.query('SELECT user_reviews.user_id, reviews.review_id, user_reviews.resource_id, reviews.title, \
    reviews.rating, reviews.content, reviews.created_at \
    FROM user_reviews \
    INNER JOIN reviews \
    ON user_reviews.review_id=reviews.review_id;',
    (error, data) => {
      return (error ? cb(error) : cb(null, data.rows));
    }
  );
};

const getWithResourceId = cb => {
  db_conn.query('SELECT reviews.*, user_reviews.resource_id\
    FROM reviews\
    INNER JOIN user_reviews\
    ON reviews.review_id=user_reviews.review_id;',
    (error, data) => {
      return (error ? cb(error) : cb(null, data.rows));
    }
  );
};

const insert = (review, user_id, cb) => {
  db_conn.query('WITH new_review AS ( \
    INSERT INTO reviews (title, rating, content) \
    VALUES ($1, $2, $3) RETURNING review_id) \
    INSERT INTO user_reviews (review_id, user_id, resource_id) \
    VALUES ((SELECT review_id FROM new_review), $4, $5);',
    [review.title, review.rating, review.content, user_id, review.resource_id],
    error => { 
      return cb(error || null);
    }
  );
};

module.exports = {
  insert: insert,
  getWithResourceId: getWithResourceId,
  getAll: getAll
};
