// INSERT INTO `babelfish`.`member` VALUES('id','name','password');
module.exports.user_create = (req, res, next) => {
    res.json(req.body);
}

// UPDATE `babelfish`.`member` SET `name` = 'name', `password` = 'pass' WHERE (`email` = 'id');
module.exports.change_information = (req, res, next) => {
    res.send(`change_user_information, ${req.params.userid} ${req.body.name}`);
}

// DELETE FROM `babelfish`.`member` WHERE (`email` = 'id'');
module.exports.delete = (req, res, next) => {
    res.send('user_delete');
}