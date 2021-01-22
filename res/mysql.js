/*

    Title: NodeJS Mysql 모듈

    Author: Leeseongrok argon1025@gmail.com

    Usage: /res/setting 에서 sql 연결을 위한 DB 정보를 로드합니다.


*/
/*
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
*/

const mysql = require('mysql');
const settings = require('./settings');

class database {
    constructor(){
        console.log('Database Module Load');

        // 풀 생성
        this.pool = mysql.createPool(settings.db_config);

        // 풀 연결 테스트, 테스트 이후 풀 릴리즈
        this.pool.getConnection((err, conn) => {
            if(!err){
                // 접속 성공
                console.log(`Database test connection successful`);
                conn.release();
            } else {
                // 접속 실패 서버 종료
                throw err;
            }
        })
    }
    // 사용자 정의 쿼리 실행
    async get_query(sql){
        this.pool.getConnection((err, conn) => {
            if(!err){
                conn.query(sql, (err, rows, fields) =>{
                    conn.release();
                    //console.log(sql);
                    const result = rows;
                    console.log(`처리하는 부분 쿼리 가져왔음 ${result[0]['email']}`);
                    return result;
                })
            }else{
                conn.release();
                throw err;
                //return err;
            }
        });
    }
}

module.exports = new database();