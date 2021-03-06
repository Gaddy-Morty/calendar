const { createWriteStream } = require('fs');

// Write the data to the supplied writable stream one million times.
// Be attentive to back-pressure.
function createHundredMillionHousesCSVFile(writer, encoding, callback) {

  let i = 10000000;
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
        let data = `${i},${generatePricePerNight(20, 1000)},${generateRating(3.5, 5)},${generateReviewsAmount(5, 900)},${generateNumberBetween(1, 9)},${generateNumberBetween(0, 7)},${generateNumberBetween(0, 7)},${generateNumberBetween(10, 251)},${generateNumberBetween(0, 181)},${generateNumberBetween(0, 201)},${generateNumberBetween(1, 4)}\n`;
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


let writeStream = createWriteStream('./houses.csv');
createHundredMillionHousesCSVFile(writeStream, 'utf8', () => { writeStream.end() })
