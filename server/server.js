const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(bodyParser.json())

app.use(cors())

response.set('Access-Control-Allow-Origin', 'https://headstrong.app')

app.use("/", express.static("www"))

mongoose.connect(process.env.DB_URI)

const entrySchema = new mongoose.Schema({
    timestamp: Date,
    mood: String,
    entry: String
})

const Entry = mongoose.model('Entry', entrySchema)

// app.get('/', (req, res) => res.send('Hello, world!'))

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

app.post('/api/entries/edit', (req, res) => {
    Entry.findByIdAndUpdate(req.body.id, {$set: {mood: req.body.mood, entry: req.body.entry}}, (error, data) => {
        if (error) return res.sendStatus(500).json(error)
        return res.json(req.body)
    })
})

app.post('/api/entries/delete', (req, res) => {
    Entry.findByIdAndRemove(req.body.id, {}, (error, data) => {
        if (error) return res.sendStatus(500).json(error)
        return res.json(data)
    })
})

app.listen(3000, () => console.log('Server running on port 3000.'))