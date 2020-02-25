const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const db = mysql.createConnection(mysqlConfig);
db.connect();

module.exports.readAllReservationsFromHouse = function (id, cb) {
  // let result = {};

  db.query(
    `SELECT * from Reservations WHERE house_id = ${id};`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        cb(error);
      } else {
        cb(results);
        console.log(`Queried all reservations for house id: ${id}`)
      }
    });

};
