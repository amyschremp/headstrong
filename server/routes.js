const jwt = require('jsonwebtoken')
const Entries = require('./controllers/entries')
const Users = require('./controllers/users')
require('dotenv').config()

const ensureAuthenticated = (req, res, next) => {
    if (!req.headers.authorization)
        return res.status(401).send({ error: 'TokenMissing' })

    let token = req.headers.authorization.split(' ')[1]
    let isVerified
    try {
        isVerified = jwt.verify(token, process.env.APP_KEY)
    } catch(err) {
        return res.status(401).json(err)
    }
    if (isVerified.expiration <= new Date())
        return res.status(401).send({ error: 'TokenExpired' })
    req.body.user = isVerified.email ? isVerified.email : null
    next()
}

module.exports = (app) => {
    app.get('/api/entries', ensureAuthenticated, Entries.findAll)
    
    app.post('/api/entries/add', ensureAuthenticated, Entries.addEntry)
    
    app.post('/api/entries/edit', ensureAuthenticated, Entries.editEntry)
    
    app.post('/api/entries/delete', ensureAuthenticated, Entries.deleteEntry)
    
    app.post('/api/users/add', Users.addUser)
    
    app.post('/api/users/login', Users.login)

    app.post('/api/users/logout', Users.logout)
}