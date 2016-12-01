const db_conn = require('../db_connection')
module.exports = (data, cb) => {
  db_conn.query('INSERT INTO reviews (title, rating, content) \
  VALUES ($1, $2, $3);',
  [data.title, data.rating, data.content],
  (error, result) => {
    if (error) return cb(error, "Error submitting new review data to sql");
    return cb(null, result.rows);
  });
};
