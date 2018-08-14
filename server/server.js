const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

mongoose.connect(process.env.DB_URI)

const entrySchema = new mongoose.Schema({
    timestamp: Date,
    mood: String,
    entry: String
})

const Entry = mongoose.model('Entry', entrySchema)

app.get('/', (req, res) => res.send('Hello, world!'))

app.get('/api/entries', (req, res) => {
    Entry.find({}, (error, data) => {
        if (error) return res.sendStatus(500).json(error)
        return res.json(data)
    })
})

app.post('/api/entries/add', (req, res) => {
    let entry = new Entry(req.body)
    entry.save((err, entry) => { return err ? res.sendStatus(500).json(err) : res.json(entry)})
})

app.listen(3000, () => console.log('Server running on port 3000.'))