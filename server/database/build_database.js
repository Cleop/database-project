const env =  require('env2');
const fs = require('fs');

const dbConn = require('./db_connection');

const sql = fs.readFileSync(`${__dirname}/build_database.sql`).toString();

dbConn.query(sql, (error, result) => {
  if(error) {
    console.log('Error receiving build_database.sql', error);
  } else {
    console.log('Result', result);
  }
});
