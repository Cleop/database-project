const db_conn = require('../db_connection');
let review_id;

const insertReviewContent = (data, cb) => {
  db_conn.query('INSERT INTO reviews (title, rating, content) \
  VALUES ($1, $2, $3) RETURNING review_id;',
  [data.title, data.rating, data.content],
  (error, result) => {
    if (error) return cb(error, "Error submitting new review data to sql");
    console.log(result);
    return cb(null, result.rows[0].review_id);
  });
};

const insertIdContent = (review_id, user_id, resource_id, cb) => {
  console.log(review_id, user_id, resource_id);
  db_conn.query('INSERT INTO user_reviews (review_id, user_id, resource_id) \
  VALUES ($1, $2, $3);',
  [review_id, user_id, resource_id],
  (error, result) => {
    if (error) return cb(error, "Error submitting new review data to sql");
    return cb(null, result.rows);
  });
};

module.exports = {
  insertReviewContent: insertReviewContent,
  insertIdContent: insertIdContent
}
