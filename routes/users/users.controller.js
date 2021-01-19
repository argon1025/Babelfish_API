module.exports.user_create = (req, res, next) => {
    res.send('user_create');
}

module.exports.change_information = (req, res, next) => {
    res.send('change_user_information');
}

module.exports.delete = (req, res, next) => {
    res.send('user_delete');
}