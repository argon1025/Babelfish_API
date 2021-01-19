/*

    Title: NodeJS Mysql 모듈

    Author: Leeseongrok argon1025@gmail.com

    Usage: /res/setting 에서 sql 연결을 위한 DB 정보를 로드합니다.


*/
const mysql = require('mysql');
const settings = require('./settings');

module.exports.db = {}

//커넥션 생성
module.exports.db.create_connect=() => {
    console.log(`create new connections`);
    return mysql.createConnection(settings.db_config);
}

//테스트 연결
module.exports.db.test_conn=() => {
    this.db.create_connect().connect((err)=>{
        if(err){
            console.error('mysql :' + err);
        }else{
            console.info('mysql is connected successfully.');
        }
    })
}
