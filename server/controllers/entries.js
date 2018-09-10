exports.findAll = (req, res) => {
    Entry.find({}, (error, data) => {
        if (error) return res.sendStatus(500).json(error)
        return res.json(data)
    })
}

exports.addEntry = (req, res) => {
    let entry = new Entry(req.body)
    entry.save((err, entry) => { return err ? res.sendStatus(500).json(err) : res.json(entry) })
}

exports.editEntry = (req, res) => {
    Entry.findByIdAndUpdate(req.body.id, { $set: { mood: req.body.mood, entry: req.body.entry } }, (error, data) => {
        if (error) return res.sendStatus(500).json(error)
        return res.json(req.body)
    })
}

exports.deleteEntry = (req, res) => {
    Entry.findByIdAndRemove(req.body.id, {}, (error, data) => {
        if (error) return res.sendStatus(500).json(error)
        return res.json(data)
    })
}