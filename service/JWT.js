//https://medium.com/sjk5766/jwt-json-web-token-%EC%86%8C%EA%B0%9C-49e211c65b45
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
    const tokenInfomation = await this.getTokenInformation(userid);
    const key = settings.key;
    const tokenOption = await this.getTokenOption();

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