const dbConn = require('./server/database/db_connection');

module.exports = cb => {
  dbConn.query('SELECT reviews.*, user_reviews.resource_id\
              FROM reviews\
              INNER JOIN user_reviews\
              ON reviews.review_id=user_reviews.review_id;',
              (error, data) => {
                (error
                  ? cb(error)
                  : cb(null, data.rows))
                }
              );
            }
