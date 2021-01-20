// SELECT * FROM babelfish.word WHERE (`note_id` = '2');
module.exports.list = (req, res, next) => {
    res.send('word-list');
}
// INSERT INTO `babelfish`.`word` (`note_id`, `Word_Title`, `Mean1`, `Mean2`) VALUES ('3', 'a', '에이', '에이1');
module.exports.create = (req, res, next) => {
    res.send('word-create');
}
// UPDATE `babelfish`.`word` SET `Word_Title` = 'c', `Mean1` = '에이1', `Mean2` = '에이2' WHERE (`id` = '1');
module.exports.change_information = (req, res, next) => {
    res.send('word-change-info');
}
// DELETE FROM `babelfish`.`word` WHERE (`id` = '1');
module.exports.delete = (req, res, next) => {
    res.send('word-delete');
}
// UPDATE `babelfish`.`word` SET `Wrong_Count` = '3' WHERE (`id` = '1');
module.exports.wrong_count = (req, res, next) => {
    res.send('word-wrong_count');
}