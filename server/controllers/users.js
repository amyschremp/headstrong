const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.addUser = (req, res) => {
    let user = new User(req.body)
    user.save((err, user) => { return err ? res.status(500).json(err) : tryLogin(user, true).then(token => res.send(token)).catch(err => res.sendStatus(401).send(err)) }) // TODO: fix User.login not a function error
}

exports.login = (req, res) => {
    return tryLogin(req, false).then(token => res.send(token)).catch(err => res.status(401).send(err))
}

exports.logout = (req, res) => {
    req.body.user = null
    return res.sendStatus(201)
}

const tryLogin = async (context, isSignup) => {
    let user
    let isMatch
    let token
    // let newSession
    if (!isSignup) {
        try {
            user = await User.findOne({email: context.body.email}).exec()
        } catch(err) {
            throw err
        }
    
        try {
            isMatch = await bcrypt.compare(context.body.password, user.password)
        } catch(err) {
            throw err
        }
    } else {
        user = context
        isMatch = true
    }
    
    if (isMatch) {
        let expiration = new Date()
        expiration.setDate(expiration.getDate() + 7)
        try {
            token = await jwt.sign({
                email: user.email
            }, process.env.APP_KEY)
        } catch(err) {
            throw err
        }
    
        return token
    } else {
        throw new Error('Username or password is incorrect')
    }
}