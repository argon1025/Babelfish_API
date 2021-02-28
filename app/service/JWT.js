/**
 * JWT Module
 * 토큰 발급과 인증을 관리하는 모듈입니다
 * 
 * 
 * @ author leeseongrok(argon1025@gmail.com) - 2021.2.11
 * @ version 1.0
 * 
 * 
 * @ Class Structure
 * - async getTokenInformation (userid:String)
 *    - 인자로받은 userid를 포함해 Payload를 생성해서 객체형태로 리턴합니다
 *
 * - async getTokenOption
 *    - Payload에 옵션을 추가합니다 
 *    2021/02/11- 토큰 만료, 생성일을 payload에 추가하는 옵션을 추가했습니다
 *
 * - async sign(userid:String)
 *    - 토큰을 생성해서 반환합니다
 * 
 * - async verify(token:String)
 *    - 토큰을 검증합니다 검증에 성공할경우 해석된 토큰정보를 반환합니다
 *
 */
var jwt = require('jsonwebtoken'); // module import
var settings = require('./settings');


class Jwt {

  async getTokenInformation(userid) {
    return {
      sub: `babelfish_token`,
      iss: `argon1025@gmail.com`,
      aud: `user`,
      userid: `${userid}`
    };
  }

  async getTokenOption() {
    return {
      expiresIn: '30m' // 유효시간
    }
  }

  async sign(userid) {
    const tokenInfomation = await this.getTokenInformation(userid); //1
    const key = settings.key;
    const tokenOption = await this.getTokenOption(); // 2 1,2 전체 한꺼번에 실행되도록 수정 필요함

    const token = await jwt.sign(tokenInfomation, key, tokenOption);

    return token;
  }

  async verify(token) {
    return new Promise((resolve, reject) => {

      jwt.verify(token, settings.key, (error, decoded_data) => {
        if (error) {
          reject('Token authentication failed');
        } else {
          resolve(decoded_data);
        }
      });

    });
  }
}


module.exports = new Jwt();