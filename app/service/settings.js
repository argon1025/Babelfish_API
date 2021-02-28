module.exports.today = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
};

module.exports.key = `ArGoN1025CnlDjqGkWk`; // 원하는 시크릿 ㅍ키

module.exports.db_config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectTimeout: 2000,
  connectionLimit: 30,
};

module.exports.port = process.env.NodeJS_PORT;
