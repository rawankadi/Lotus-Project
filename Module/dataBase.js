const mysql = require('mysql');

// יצירת חיבור ל-MySQL
const connection = mysql.createConnection({
  host: 'localhost',  // הכתובת של השרת
  user: 'root', // שם המשתמש של בסיס הנתונים
  password: '', // הסיסמה של בסיס הנתונים
  database: 'myproject' // שם בסיס הנתונים
});


connection.connect(error => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }
  console.log('Connected to the MySQL database');
});


module.exports = connection;