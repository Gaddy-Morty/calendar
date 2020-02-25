const express = require('express')
const app = express()
const port = 2000
const path = require('path')
// const seedingScript = require('../database/seedingScript.js')

var cors = require('cors')

app.use(cors())

// const db = require('../database/index.js')
const db = require('../database/mySql/db.js')

app.use(express.static(path.join(__dirname, '../client/dist/')))

app.get('/legacy/house', (req, res) => {
  db.House.find({}, (err, data) => {
    if (err) {
      res.sendStatus(404)
    } else {
      const randomHouse = Math.floor(Math.random() * 100)
      res.status(200).send(data[randomHouse])
    }
  })
})

app.get('/legacy/house/:id', (req, res) => {
  let id = req.params.id.slice(1, req.params.id.length)
  console.log(id)
  console.log("this runs")
  db.House.findById(id, (err, data) => {
    if (err) {
      console.log(err)
      res.sendStatus(404)
    } else {
      console.log('an error did not occur')
      console.log(data._doc)
      res.status(200).send(data._doc)
    }
  })
})

app.get('/legacy/:id', (req, res) => {
  let id = req.params.id
  id = 1
  db.House.findById(id, (err, data) => {
    if (err) {
      res.sendStatus(404)
    } else {
      console.log(data._doc)
    }
  })
})

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// -------------------------  NEW API  ------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------

// CRUD
// Create, Read, Update, Delete

// Create
app.post('/v2/houses/:id/reservations/:check_in_date/:check_out_date/:adults/:children/:infants', (req, res) => {
  db.createANewReservationForHouse(req.params, (data) => { res.send(data) });
});

// Read
app.get('/v2/house/:id/reservations', (req, res) => {
  const id = req.params.id;
  db.readAllReservationsFromHouse(id, (data) => { res.send(data) });
});

// Update
app.put('/v2/houses/:id/reservations/:reservationId/:check_in_date/:check_out_date/:adults/:children/:infants', (req, res) => {
  db.updateReservation(req.params, (data) => { res.send(data); });
})

// Delete
app.delete('/v2/houses/:id/reservations/:reservationId', (req, res) => {
  db.deleteReservation(req.params, (data) => { res.send(data); });
})

app.listen(port, () => console.log(`House listing reservations server is listening on port ${port}!`));