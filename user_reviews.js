const dbConn = require('./server/database/db_connection');

module.exports = cb =>
  dbConn.query('SELECT (user_reviews.user_id, reviews.review_id, reviews.title, \
                reviews.rating, reviews.content, reviews.created_at) FROM user_reviews \
                INNER JOIN reviews \
                ON user_reviews.review_id=reviews.review_id;'
                ,(error, data) =>
    (error
      ? cb(error)
      : cb(null, data.rows))
    );
