const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URI)

const entrySchema = new mongoose.Schema({
    timestamp: Date,
    mood: String,
    entry: String
})

module.exports = mongoose.model('Entry', entrySchema)