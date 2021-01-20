// SELECT * FROM babelfish.note WHERE (`member_email` = 'id');
module.exports.list = (req, res, next) => {
    res.send('note-list');
}

// INSERT INTO `babelfish`.`note` (`member_email`, `name`, `Learning_Day`) VALUES ('test12@naver.com', '테스트단어장', '2020.01.01');
module.exports.create = (req, res, next) => {
    res.send('note-create');
}

// UPDATE `babelfish`.`note` SET `name` = '테스트단어장3' WHERE (`id` = '5');
module.exports.change_information = (req, res, next) => {
    res.send('note-change_information');
}

// DELETE FROM `babelfish`.`note` WHERE (`id` = '5');
module.exports.delete = (req, res, next) => {
    res.send('note-delete');
}

// UPDATE `babelfish`.`note` SET `Learning_Day` = '2020-01-02' WHERE (`id` = '4');
module.exports.updated_date = (req, res, next) => {
    res.send('note-updated-date');
}