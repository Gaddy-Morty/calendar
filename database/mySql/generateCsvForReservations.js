const { createWriteStream } = require('fs');

// Write the data to the supplied writable stream one million times.
// Be attentive to back-pressure.
function createHundredMillionReservationsCSVFile(writer, encoding, callback) {

  let i = 100000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // Last time!
        // writer.write(data, encoding, callback);
        console.log('Done!');
        callback();
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        let data = `${i}, ${generatePricePerNight(20, 1000)}, ${generatePeopleAmount(1, 4)}, ${generatePeopleAmount(0, 6)}, ${generatePeopleAmount(0, 2)}, ${generateCheckInDate()}, ${generateCheckOutDate()}, ${generateHouseId()}\n`;
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

let writeStream = createWriteStream('./reservations.csv');
createHundredMillionReservationsCSVFile(writeStream, 'utf8', () => { writeStream.end() })


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
  return '2020-11-23';
}

function generateHouseId() {
  const MIN = 1;
  const MAX = 10000000;
  return MIN + Math.floor(Math.random() * (MAX - MIN));
}