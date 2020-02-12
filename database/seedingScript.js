const db = require('./index.js')
const data = require('./testData.js')

let insertTestData = function () {
  db.House.insertMany(data, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log("data was inserted")
    }
  });
}

db.House.remove({}, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    insertTestData()
  }
});