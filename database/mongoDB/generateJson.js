const { createWriteStream } = require('fs');

// Write the data to the supplied writable stream one million times.
// Be attentive to back-pressure.
function createTenMillionHousesJsonFile(writer, encoding, callback) {

  let i = 10000001;
  // let i = 7;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 10000000) {
        let data = '[';
        writer.write(data, encoding);
      } else if (i === 0) {
        // Last time!
        // writer.write(data, encoding, callback);
        let data = `{
          "id": ${i},
          "price_per_night": ${generatePricePerNight(20, 1200)},
          "avg_ratings": ${generateRating(3.5, 5)},
          "reviews_amount": ${generateReviewsAmount(5, 1000)},
          "reservations": ${JSON.stringify(generateArrayOfReservations(generateNumberBetween(1, 20)))},
          "max_adults": ${generatePeopleAmount(1, 9)},
          "max_childs": ${generatePeopleAmount(0, 6)},
          "max_infants": ${generatePeopleAmount(0, 6)},
          "cleaning_fee": ${generateNumberBetween(2, 200)},
          "service_fee": ${generateNumberBetween(2, 200)},
          "occupancy_taxes_fees": ${generateNumberBetween(2, 200)},
          "min_allowed_nights": ${generateNumberBetween(1, 4)}
        }]`;
        writer.write(data, encoding);
        console.log('Done!');
        callback();
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        let data = `{
          "id": ${i},
          "price_per_night": ${generatePricePerNight(20, 1200)},
          "avg_ratings": ${generateRating(3.5, 5)},
          "reviews_amount": ${generateReviewsAmount(5, 1000)},
          "reservations": ${JSON.stringify(generateArrayOfReservations(generateNumberBetween(1, 20)))},
          "max_adults": ${generatePeopleAmount(1, 9)},
          "max_childs": ${generatePeopleAmount(0, 6)},
          "max_infants": ${generatePeopleAmount(0, 6)},
          "cleaning_fee": ${generateNumberBetween(2, 200)},
          "service_fee": ${generateNumberBetween(2, 200)},
          "occupancy_taxes_fees": ${generateNumberBetween(2, 200)},
          "min_allowed_nights": ${generateNumberBetween(1, 4)}
        },\n`;
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}

function generatePricePerNight(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function generatePeopleAmount(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function generateRating(min, max) {
  return +(min + Math.random() * max).toFixed(2)
}

function generateReviewsAmount(min, max) {
  return generatePricePerNight(min, max);
}

function generateArrayOfReservations(reservationsAmount) {
  let res = [];
  for (let i = 1; i <= reservationsAmount; i++) {
    let tempReservation = {
      id: i,
      total_price: generatePricePerNight(20, 1200),
      adults_amout: generateNumberBetween(1, 7),
      childs_amout: generateNumberBetween(1, 7),
      infants_amout: generateNumberBetween(1, 7),
      check_in_date: `2020-09-${(i).pad(1)}`,
      check_out_date: `2020-09-${(i + 1).pad(1)}`
    }
    res.push(tempReservation);
  }

  return res;
};

Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}

// inclusive min - exlusive max
function generateNumberBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function generateHouseId() {
  const MIN = 1;
  const MAX = 10000000;
  return MIN + Math.floor(Math.random() * (MAX - MIN));
}


let writeStream = createWriteStream('./houseListings.json');
createTenMillionHousesJsonFile(writeStream, 'utf8', () => { writeStream.end() })