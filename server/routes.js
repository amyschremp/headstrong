const moment = require('moment')
const jwt = require('jwt-simple')
const Entries = require('./controllers/entries')
const Users = require('./controllers/users')
require('dotenv').config()

const ensureAuthenticated = (req, res, next) => {
    if (!req.headers.authorization)
        return res.status(401).send({ error: 'TokenMissing' })

    let token = req.headers.authorization.split(' ')[1]
    let payload = null

    try {
        payload = jwt.decode(token, process.env.TOKEN_SECRET)
    } catch(err) {
        return res.status(401).send({ error: 'TokenInvalid' })
    }

    if (payload.exp <= moment().unix())
        return res.status(401).send({ error: 'TokenExpired' })

    Users.findUser(req, res, next)
}

module.exports = (app) => {
    app.get('/api/entries', ensureAuthenticated, Entries.findAll)
    
    app.post('/api/entries/add', ensureAuthenticated, Entries.addEntry)
    
    app.post('/api/entries/edit', ensureAuthenticated, Entries.editEntry)
    
    app.post('/api/entries/delete', ensureAuthenticated, Entries.deleteEntry)
    
    app.post('/api/users/add', Users.addUser)
    
    app.post('/api/users/login', Users.login)
}