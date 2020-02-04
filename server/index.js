const express = require('express')
const app = express()
const port = 2000
const path = require('path')

var cors = require('cors')

app.use(cors())

const db = require('../database/index.js')

app.use(express.static(path.join(__dirname, '../client/dist/')))



app.get('/house', (req, res) => {
    db.House.find({}, (err, data) => { 
        if (err) {
            res.sendStatus(404)
        } else {
            const randomHouse = Math.floor(Math.random() * 100)
            res.status(200).send(data[randomHouse])
        }
    })
})

app.get('/house/:id', (req, res) => {
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



app.get('/:id', (req, res) => {
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))