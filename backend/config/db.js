const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bansos_dummy' // ganti sesuai db
});

module.exports = db;
