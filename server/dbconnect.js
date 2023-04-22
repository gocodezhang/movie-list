const mysql = require('mysql2');

const connectionDb = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'moviesDB'
})

exports.connectionDb = connectionDb;