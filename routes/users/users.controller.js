const mysql = require('../../res/mysql');

// INSERT INTO `babelfish`.`member` VALUES('id','name','password');
module.exports.user_create = (req, res, next) => {
    res.send('user_create');
}

// UPDATE `babelfish`.`member` SET `name` = 'name', `password` = 'pass' WHERE (`email` = 'id');
module.exports.change_information = (req, res, next) => {
    res.send('change_user_information');
}

// DELETE FROM `babelfish`.`member` WHERE (`email` = 'id'');
module.exports.delete = (req, res, next) => {
    res.send('user_delete');
}