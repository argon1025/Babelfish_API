/*

    Title: NodeJS async Mysql 모듈

    Author: Leeseongrok argon1025@gmail.com

    Usage: /res/setting 에서 sql 연결을 위한 DB 정보를 로드합니다.


*/

const mysql = require('sync-mysql');
const settings = require('./settings');

class database {
    constructor(){
        this.connection = new mysql(settings.db_config);
    }
    // 사용자 정의 쿼리 실행
    // 특정 데이터를 가져올때
    async get_query(sql){
        const result = this.connection.query(sql);
        console.log(result);
        if(!result[0]){
            //질의 결과가 없을경우
            throw 'DB No results';
        }else{
            //질의 결과가 있을경우
            return result;
        }
    }
    // 특정 데이터의 존재유무, 또는 삽입
    async insert_query(sql){
        const result = this.connection.query(sql);
        console.log(`쿼리 질의 결과 ${result['affectedRows']}`);
        if(!result['affectedRows']){
            //질의 결과가 없을경우
            throw result;
        }else{
            //질의 결과가 있을경우
            return result;
        }
        
    }
}

module.exports = new database();