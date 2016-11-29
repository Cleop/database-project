const dbConn = require('server/database/db_connection');

// Endpoint = reviews/recent on our landing page

module.exports = cb =>
  dbConn.query('SELECT * FROM REVIEWS;', (error, data) =>
    (error
      ? cb(error)
      : cb(null, data.rows)));
