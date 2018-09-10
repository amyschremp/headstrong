const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

mongoose.connect(process.env.DB_URI)

const userSchema = new mongoose.Schema({
    firstName: String,
    email: { type: String, unique: true },
    password: String
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

userSchema.methods.generateJwt = () => {
    let expiry = new Date()
    expiry.setDate(expiry.getDate() + 7)

    return jwt.sign({
        _id: this._id,
        email: this.email,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.APP_KEY)
}

module.exports = mongoose.model('User', userSchema)