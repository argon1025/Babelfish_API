const mysql = require('../../res/mysql');

module.exports.main = (req, res, next) => {
    res.json(req.body);
}