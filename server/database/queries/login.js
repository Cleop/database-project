const db_conn = require('../db_connection');

module.exports = (values, cb) => {
  db_conn.query('SELECT user_id, firstname, lastname, email \
                 FROM users\
                 WHERE email=$1 AND password=$2;',
                 values,
                 (error, result) => {
                   if (error) return cb(error);
                   return cb(null, result.rows);
                 });
}
