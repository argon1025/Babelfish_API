module.exports.today = () => {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
}

module.exports.key = `ArGoN1025CnlDjqGkWk`; // 원하는 시크릿 ㅍ키
module.exports.db_config = {
    host: 'localhost',
    user: 'babelfish',
    password: '@Moonlight971025',
    database: 'babelfish',
    connectTimeout : 2000,
    connectionLimit : 30
  };

module.exports.port = 8484;