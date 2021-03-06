const { createWriteStream } = require('fs');

function writeTwelveMillionTimes(writer, encoding, callback) {
  let i = 100000001;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 100000000) {
        let data = 'listingone,listingtwo,similarity\n';
        writer.write(data, encoding);
      } else if (i === 0) {
        let data = `${1000000000},${Math.ceil(Math.random() * 10000000)},${Math.ceil(Math.random() * 100)}\n`;
        ok = writer.write(data, encoding, callback);
      } else {
        let data = `${Math.ceil(i / 12)},${Math.ceil(Math.random() * 10000000)},${Math.ceil(Math.random() * 100)}\n`;
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}
let writeStream = createWriteStream('./reservations.csv');
writeTwelveMillionTimes(writeStream, 'utf8', () => { writeStream.end() })