const mysql = require('../../res/mysql');

module.exports.main = (req, res, next) => {
    mysql.get_query('SELECT * FROM member', (a, b, c) =>{
        console.log(a);
        console.log(b);
    })
    res.send('Pong!');
}