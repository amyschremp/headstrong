const User = require('../models/user')
const bcrypt = require('bcrypt')


exports.addUser = (req, res) => {
    let user = new User(req.body)
    user.save((err, user) => { return err ? res.sendStatus(500).json(err) : User.login(user) })
}

exports.login = (req, res) => {
    return tryLogin(req).then(isMatch => res.sendStatus(200)).catch(err => res.sendStatus(401))
}

exports.findUser = (req, res, next) => {
    User.findById(req.body.email, (err, user) => {
        if (!user)
            return res.status(401).send({ error: 'UserNotFound' })
        else {
            req.user = req.body.email
            next()
        }
    })
}

const tryLogin = async (req) => {
    let user
    let isMatch
    try {
        user = await User.findOne({email: req.body.email}).exec()
    } catch(err) {
        return err
    }
    try {
        isMatch = await bcrypt.compare(req.body.password, user.password)
    } catch(err) {
        return err
    }
    if (isMatch) return true
}