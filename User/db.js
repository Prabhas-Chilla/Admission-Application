const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.Prabha@7,
  database: process.env.admission, 
});

connection.connect((err) => {
  if (err) {
    console.error('DB Connection Failed:', err);
  } else {
    console.log('DB Connected!');
  }
});

module.exports = connection;

