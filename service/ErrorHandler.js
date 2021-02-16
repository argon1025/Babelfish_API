class ErrorHandler {
    constructor(){

    }
    // 에러의 위치 파악
    // 
    async test(err, req, res, next){
        console.log(err);
    }
}

module.exports = new ErrorHandler();