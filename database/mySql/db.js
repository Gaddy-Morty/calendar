const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const db = mysql.createConnection(mysqlConfig);
db.connect();

// CREATE A NEW RESERVATION FOR A HOUSE
module.exports.createANewReservationForHouse = function (reservationDetails, cb) {
  db.query(`INSERT INTO Reservations (adults_amout, childs_amout, infants_amout, check_in_date, check_out_date, house_id) values (${reservationDetails.adults}, ${reservationDetails.children}, ${reservationDetails.infants}, "${reservationDetails.check_in_date}", "${reservationDetails.check_in_date}", ${reservationDetails.id});`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        cb(error);
      } else {
        cb(results);
        console.log(`Inserted a new reservation for house id: ${reservationDetails.id}`)
      }
    }
  );
};

// GET ALL RESERVATIONS FOR A HOUSE
module.exports.readAllReservationsFromHouse = function (id, cb) {
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
