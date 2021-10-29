var mysql = require('mysql');

const config = {
  host: 'airline-booking.cu0buaumd8bx.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'admin123',
  ssl: true,
  database: 'airline_booking',
  multipleStatements: true,
  port: '3306',
  //   remove below option if you need both date and timestamp when retriving date column from mysql
  dateStrings: true,
};
var dbconnection = mysql.createConnection(config); //added the line
dbconnection.connect(function (err) {
  if (err) {
    console.log('MySQL Connection failed' + err.stack);
  }
  console.log('MySQL Connected!');
});

module.exports = {
  dbconnection: mysql.createConnection(config),
};
