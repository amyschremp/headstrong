const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')
require('dotenv').config()

const app = express()

app.use(bodyParser.json())

app.use(cors())

app.use(logger('dev'))

app.use("/", express.static("www"))

require('./routes')(app)

app.listen(3000, () => console.log('Server running on port 3000.'))