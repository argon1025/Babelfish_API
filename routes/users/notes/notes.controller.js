module.exports.list = (req, res, next) => {
    res.send('note-list');
}

module.exports.create = (req, res, next) => {
    res.send('note-create');
}

module.exports.change_information = (req, res, next) => {
    res.send('note-change_information');
}

module.exports.delete = (req, res, next) => {
    res.send('note-delete');
}

module.exports.updated_date = (req, res, next) => {
    res.send('note-updated-date');
}