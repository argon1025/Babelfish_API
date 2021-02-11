/**
 * async Mysql Module
 * 데이터 베이스와 연결하는 모듈 입니다
 * 
 * 
 * @ author leeseongrok(argon1025@gmail.com) - 2021.2.11
 * @ version 1.0
 * 
 * 
 * @ Class Structure
 * -constructor
 *      1./res/setting 에서 DB config를 로드합니다
 *      2.불러온 정보로 CONNECTION을 생성합니다
 * 
 * - async get_query (sql:String)
 *      -쿼리 데이터를 로드할때 사용됩니다
 *      1.결과가 없을경우 throw 'DB No results'
 *      2.결과가 있을경우 데이터를 반환합니다
 * 
 * - async insert_query (sql:String)
 *      -DB에 값을 추가, 수정, 삭제할때 사용합니다
 *      1.결과가 없을경우 throw로 데이터를 반환합니다
 *      2.결과가 있을경우 데이터를 반환합니다
 */
const mysql = require('sync-mysql');
const settings = require('./settings');

class Database {
    constructor() {
        this.CONNECTION = new mysql(settings.db_config);
    }

    async get_query(sql) {
        const result = await this.CONNECTION.query(sql);

        if (!result[0]) {
            //질의 결과가 없을경우
            throw 'DB No results';
        } else {
            //질의 결과가 있을경우
            return result;
        }
    }

    async insert_query(sql) {
        const result = await this.CONNECTION.query(sql);

        if (!result['affectedRows']) {
            //질의 결과가 없을경우
            throw result;
        } else {
            //질의 결과가 있을경우
            return result;
        }
    }
}

module.exports = new Database();