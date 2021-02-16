class ResponseCreator {
    errorMessage(location, msg, msg_code) {
        return {
            "error": "true",
            "location": `${location}`,
            "msg": `${msg}`,
            "msg_code": `${msg_code}`,
        };
    }
}
module.exports = new ResponseCreator();