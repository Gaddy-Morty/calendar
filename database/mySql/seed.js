const mysql = require('mysql');
const faker = require('faker');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);
connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});


// RESERVATIONS
const AMOUNT_OF_RESERVATIONS = 10000000;

for (let i = 0; i < AMOUNT_OF_RESERVATIONS; i++) {
  connection.query({
    sql:
      `INSERT INTO Reservations (
      id, 
      final_price_per_night, 
      adults_amout, 
      childs_amout, 
      infants_amout, 
      check_in_date, 
      check_out_date, 
      house_id
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
    values: [
      i,
      generatePricePerNight(20, 1000),
      generatePeopleAmount(1, 4),
      generatePeopleAmount(0, 6),
      generatePeopleAmount(0, 2),
      generateCheckInDate(),
      generateCheckOutDate(),
      generateHouseId()
    ]
  }, (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      // console.log(`insert (${i}) successful`);
    }
  });
}

function generatePricePerNight(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function generatePeopleAmount(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function generateCheckInDate(date) {
  return '2020-11-20';
}

function generateCheckOutDate(date) {
  return '2020-11-20';
}

function generateHouseId() {
  const MIN = 1;
  const MAX = 100000000;
  return MIN + Math.floor(Math.random() * (MAX - MIN));
}

// HOUSES
const AMOUNT_OF_HOUSES = 10;

for (let i = 0; i > AMOUNT_OF_HOUSES; i++) {
  connection.query(
    {
      // id,
      // price_per_night,
      // avg_ratings,   (FLOAT)
      // reviews_amount,
      // max_adults,
      // max_childs,
      // max_infants,
      // cleaning_fee,
      // service_fee,
      // occupancy_taxes_fees,
      // min_allowed_nights,
      sql:
        `INSERT INTO Reservations (
        id, 
        price_per_night, 
        avg_ratings,
        reviews_amount,
        max_adults,
        max_childs,
        max_infants,
        cleaning_fee,
        service_fee,
        occupancy_taxes_fees,
        min_allowed_nights
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      values: [
        i,
        generatePricePerNight(20, 1000),
        generateRating(3.5, 5),
        generateReviewsAmount(5, 900),
        generateNumberBetween(1, 9), // max adults
        generateNumberBetween(0, 7), // max children
        generateNumberBetween(0, 7), // max infants
        generateNumberBetween(10, 251), // cleaning fee
        generateNumberBetween(0, 181), // service fee
        generateNumberBetween(0, 201), // occupancy_taxes_fees
        generateNumberBetween(1, 4), // min_allowed_nights
      ]
    },
    (err, data) => {
      if (err) {
        console.log(err);
        throw err;
      }
    }
  );
}

function generateRating(min, max) {
  return +(min + Math.random() * max).toFixed(2)
}

function generateReviewsAmount(min, max) {
  return generatePricePerNight(min, max);
}

// inclusive min - exlusive max
function generateNumberBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

connection.end()