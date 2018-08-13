const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

let data = {
    user: {
        name: "Amy Schremp",
        email: "amyschremp@live.com"
    },
    entries: [
        {
            id: 1,
            timestamp: new Date(),
            mood: "happy",
            entry: "I had a great day!"
        },
        {
            id: 2,
            timestamp: new Date(),
            mood: "happy",
            entry: "I had a great day!"
        }
    ]
}

app.get('/', (req, res) => res.send('Hello, world!'))

app.get('/api/entries', (req, res) => res.json(data.entries))

app.post('/api/entries/add', (req, res) => {
    data.entries.push(req.body)

    return res.sendStatus(200)
})

app.listen(3000, () => console.log('Server running on port 3000.'))