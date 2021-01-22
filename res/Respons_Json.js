function error(location,msg,msg_code){
    return {
      "error": "true",
      "location": `${location}`,
      "msg": `${msg}`,
      "msg_code": `${msg_code}`,
      };
}
function login_success(token,msg,msg_code){
  return {
    "token": `${token}`,
    "error": "false",
    "msg": `${msg}`,
    "msg_code": `${msg_code}`
    };
}
function success(location,msg,msg_code){
  return {
    "error": "false",
    "location": `${location}`,
    "msg": `${msg}`,
    "msg_code": `${msg_code}`
    };
}
module.exports = {error,login_success,success} 