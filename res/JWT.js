//https://medium.com/sjk5766/jwt-json-web-token-%EC%86%8C%EA%B0%9C-49e211c65b45
var jwt = require('jsonwebtoken'); // module import
var settings = require('./settings');

async function sign(userid) {
  var token = jwt.sign({
    sub : `babelfish_token`,
    iss : `argon1025@gmail.com`,
    aud : `user`,
    userid : `${userid}`
  },
  settings.key, // 비밀키
  {
    expiresIn: '30m' // 유효시간
  })

  return token;
}


async function verify(token){
  var decoded_data = jwt.verify(token, settings.key, (err, decoded_data)=>{
    if(err){
      throw 'Token authentication failed';
    }else{
      return decoded_data;
    }
});
return decoded_data;
}

module.exports = {
  sign,verify
};