const Joi = require('joi') //값 유효성 검증


async function check_id(value){
    const schema = Joi.object({
        userid: Joi.string() //userid
        .pattern(new RegExp(`^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$`)) // 알파벳, 숫자, @, .만 허용합니다
        .min(5) //문자열 최소 길이 정의
        .max(49) //문자열 최대 길이 정의
        .required(), // 값이 입력되어야한다
    });
    const Result = await schema.validate(value)

    if(!Result.error){
        //값 검증에 문제가 없을경우
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
        .max(31) //문자열 최대 길이 정의
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

async function check_name(value){
    const schema = Joi.object({
        name: Joi.string()
        .pattern(new RegExp(`^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|\\s|0-9]+$`)) // 한글,알파벳,숫자,띄어쓰기만 허용합니다
        .min(1) //문자열 최소 길이 정의
        .max(10) //문자열 최대 길이 정의
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
async function check_note_name(value){
    const schema = Joi.object({
        notename: Joi.string()
        .pattern(new RegExp(`^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|\\s|0-9]+$`)) // 한글,알파벳,숫자,띄어쓰기만 허용합니다
        .min(1) //문자열 최소 길이 정의
        .max(11) //문자열 최대 길이 정의
        .required() // 값이 입력되어야한다
    });
    const Result = await schema.validate(value) //검증 시작

    if(!Result.error){
        //값 검증에 문제가 없을경우
        return Result;
    }else{
        //문제가 있을경우
        console.log(Result.error);
        throw "Value verification failed";
    }
}

async function check_number(value){
    const schema = Joi.object({
        number: Joi.number() //숫자여야 한다
        .required() // 값이 입력되어야한다
    });
    const Result = await schema.validate(value) //검증 시작

    if(!Result.error){
        //값 검증에 문제가 없을경우
        return Result;
    }else{
        //문제가 있을경우
        console.log(Result.error);
        throw "Value verification failed";
    }
}
async function check_words(value){
    const schema = Joi.object({
        words: Joi.string()
        .pattern(new RegExp(`^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|\\s|0-9|ぁ-ゔ|ァ-ヴー|々　〆〤｜一-龥]+$`)) // 한글,알파벳,숫자,띄어쓰기만 허용합니다
        .min(1) //문자열 최소 길이 정의
        .max(30) //문자열 최대 길이 정의
        .required() // 값이 입력되어야한다
    });
    const Result = await schema.validate(value) //검증 시작

    if(!Result.error){
        //값 검증에 문제가 없을경우
        return Result;
    }else{
        //문제가 있을경우
        console.log(Result.error);
        throw "Value verification failed";
    }
}
module.exports = {
    check_id, check_password,check_name,check_note_name,check_number,check_words
}