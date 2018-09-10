const User = require('../models/user')
const Session = require('../models/session')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.addUser = (req, res) => {
    let user = new User(req.body)
    user.save((err, user) => { return err ? res.sendStatus(500).json(err) : User.login(user) })
}

exports.login = (req, res) => {
    return tryLogin(req).then(token => res.json(token)).catch(err => res.sendStatus(401).send(err))
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
    let token
    let newSession
    try {
        user = await User.findOne({email: req.body.email}).exec()
    } catch(err) {
        throw err
    }

    try {
        isMatch = await bcrypt.compare(req.body.password, user.password)
    } catch(err) {
        throw err
    }

    if (isMatch) {
        try {
            token = await jwt.sign({email: req.body.email}, process.env.APP_KEY)
        } catch(err) {
            throw err
        }
    
        let expiration = new Date()
        expiration.setDate(expiration.getDate() + 7)
        let session = new Session({
            token: token,
            expiration: expiration,
            email: req.body.email
        })
    
        try {
            newSession = await session.save()
        } catch(err) {
            throw err
        }
    
        return newSession
    } else {
        throw new Error('Username or password is incorrect')
    }
}