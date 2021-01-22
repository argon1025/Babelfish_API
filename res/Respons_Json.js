function login_error(location,msg,param,msg_code){
    return {
      "error": "true",
      "location": `${location}`,
      "msg": `${msg}`,
      "msg_code": `${msg_code}`,
      "param": `${param}`
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

module.exports = {login_error,login_success} 