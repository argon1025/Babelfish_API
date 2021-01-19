module.exports.list = (req, res, next) => {
    res.send('word-list');
}

module.exports.create = (req, res, next) => {
    res.send('word-create');
}

module.exports.change_information = (req, res, next) => {
    res.send('word-change-info');
}

module.exports.delete = (req, res, next) => {
    res.send('word-delete');
}

module.exports.wrong_count = (req, res, next) => {
    res.send('word-wrong_count');
}