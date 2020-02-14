const mysql = require('mysql');
const faker = require('faker');
const mysqlConfig = require('./config.js');

const db = mysql.createConnection(mysqlConfig);

//#.jpg will be appended to this link
const s3Link = 'https://absample.s3-us-west-1.amazonaws.com/img/i' 

var urlArray = [];

for(var i = 1; i < 31; i++) {
  var fullLink = s3Link + i + '.jpg';
  urlArray.push(fullLink);
}

for(let i = 0; i < 100; i++) {
  let fakeAddress = faker.address.streetAddress() + ' ' + faker.address.city()
  db.query({
    sql: 'INSERT INTO accommodations (name) VALUES (?);',
    values: [fakeAddress]
  }, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`insert ${i} successful`);
    }
  });
}

for(let i = 1; i < 101; i++) {
  var randNumOfImages = Math.random() * (20 - 3) + 3;
  for(let j = 0; j < randNumOfImages; j++) {
    db.query({
      sql: 'INSERT INTO images (accommodationId, image) VALUES (?, ?);',
      values: [i, urlArray[Math.floor(Math.random() * 30)]]
    }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`insert (${i},${j}) successful`);
      }
    });
  }
}