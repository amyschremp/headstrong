const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

mongoose.connect(process.env.DB_URI)

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
})

userSchema.pre('save', function (next) {
    // Pass in the scope
    var user = this

    bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
        if (err) return next(err)

        user.password = hash

        next()
    })
})

module.exports = mongoose.model('User', userSchema)