const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URI)

const sessionSchema = new mongoose.Schema({
    token: String,
    expiration: Date,
    email: String
})

module.exports = mongoose.model('Session', sessionSchema)