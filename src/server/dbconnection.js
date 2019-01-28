var mysql = require('mysql');  

var connection = mysql.createPool({  
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'testsql',
    port     : '3306',
    connectionLimit : 10,
});  
// var connection = mysql.createConnection ({  
//     host     : 'localhost',
//     user     : 'root',
//     password : 'root',
//     database : 'testsql',
//     port     : '3306' 
// });  

connection.on('connection', function (connection) {
  console.log('DB Connection established');

  connection.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
  });
  connection.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });

});

module.exports = connection;  