const Joi = require('joi') //값 유효성 검증

async function check_id(value){
    const schema = Joi.object({
        userid: Joi.string() //userid
        .min(5) //문자열 최소 길이 정의
        .max(50) //문자열 최대 길이 정의
        .email() // 이메일 형식을가진다
        .required(), // 값이 입력되어야한다
    });
    const Result = await schema.validate(value)

    if(!Result.error){
        //값 검증에 문제가 없을경우
        console.log('pass');
        return Result;
    }else{
        //문제가 있을경우
        /*
        error: [Error [ValidationError]: "userid" must be a valid email] {
        _original: { userid: 'Post77@' },
        details: [ [Object] ]
        */
       console.log(Result.error);
        throw "Value verification failed";
    }
}

async function check_password(value){
    const schema = Joi.object({
        password: Joi.string()
        .alphanum() // 알파벳과 숫자로 구성되어야 한다
        .min(5) //문자열 최소 길이 정의
        .max(30) //문자열 최대 길이 정의
        .required() // 값이 입력되어야한다
    });
    const Result = await schema.validate(value) //검증 시작

    if(!Result.error){
        //값 검증에 문제가 없을경우
        return Result;
    }else{
        //문제가 있을경우
        throw "Value verification failed";
    }
}

module.exports = {
    check_id, check_password
}