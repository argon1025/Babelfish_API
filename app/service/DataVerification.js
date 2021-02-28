const Joi = require('joi') //값 유효성 검증모듈

/**
 * Text Verification Module
 * 정규식 패턴과 Joi schema를 통해 텍스트를 검증하는 모듈입니다
 * 
 * 
 * @ author leeseongrok(argon1025@gmail.com) - 2021.2.11
 * @ version 1.0
 * 
 * 
 * @ Class Structure
 * -constructor
 *      1.정규식 패턴을 정의합니다
 *      2.Joi 모듈의 schema를 정의합니다
 * 
 * - async check_id ({userid:String})
 * - async check_password ({password:String})
 * - async check_name ({name:String})
 * - async check_note_name ({notename:String})
 * - async check_number ({number:String})
 * - async check_words ({words:String})
 */
class Verification {
    constructor() {
        /** 
         * 정규식 패턴
        */
        this.ID_PATTERN = new RegExp(`^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$`); // 이메일 정규식 패턴
        this.USERNAME_PATTERN = new RegExp(`^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|\\s|0-9]+$`); //유저이름 정규식 패턴
        this.NOTENAME_PATTERN = new RegExp(`^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|\\s|0-9]+$`); //노트 이름 정규식 패턴
        this.WORD_PATTERN = new RegExp(`^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|\\s|0-9|ぁ-ゔ|ァ-ヴー|々　〆〤｜一-龥]+$`); //단어 정규식 패턴

        /*
        Joi 스키마 구성
            pattern(정규식),
            min(문자열 최소길이),
            max(문자열 최대길이), 
            required(값이 유효한지)
        */
        this.ID_SCHEMA = Joi.object({
            userid: Joi.string()
                .pattern(this.ID_PATTERN)
                .min(5)
                .max(49)
                .required()
        });
        this.PASSWORD_SCHEMA = Joi.object({
            password: Joi.string()
                .alphanum()
                .min(5)
                .max(31)
                .required()
        });
        this.USERNAME_SCHEMA = Joi.object({
            name: Joi.string()
                .pattern(this.USERNAME_PATTERN)
                .min(1)
                .max(10)
                .required()
        });
        this.NOTENAME_SCHEMA = Joi.object({
            notename: Joi.string()
                .pattern(this.NOTENAME_PATTERN)
                .min(1)
                .max(11)
                .required()
        });
        this.NUMBER_SCHEMA = Joi.object({
            number: Joi.number()
                .required()
        });
        this.WORD_SCHEMA = Joi.object({
            words: Joi.string()
                .pattern(this.WORD_PATTERN)
                .min(1)
                .max(30)
                .required()
        });
    }

    //userId 검사
    async check_id(value) {
        const Result = await this.ID_SCHEMA.validate(value);

        if (!Result.error) {
            return Result;
        } else {
            throw "Value verification failed";
        }
    }

    //userPassword 검사
    async check_password(value) {
        const Result = await this.PASSWORD_SCHEMA.validate(value);

        if (!Result.error) {
            return Result;
        } else {
            throw "Value verification failed";
        }
    }

    //userName 검사
    async check_name(value) {
        const Result = await this.USERNAME_SCHEMA.validate(value);

        if (!Result.error) {
            return Result;
        } else {
            throw "Value verification failed";
        }
    }

    //userNoteName 검사
    async check_note_name(value) {
        const Result = await this.NOTENAME_SCHEMA.validate(value);

        if (!Result.error) {
            return Result;
        } else {
            throw "Value verification failed";
        }
    }

    //number 검사
    async check_number(value) {
        const Result = await this.NUMBER_SCHEMA.validate(value);

        if (!Result.error) {
            return Result;
        } else {
            throw "Value verification failed";
        }
    }

    //userNoteWord 검사
    async check_words(value) {
        const Result = await this.WORD_SCHEMA.validate(value)

        if (!Result.error) {
            return Result;
        } else {
            console.log(Result.error);
            throw "Value verification failed";
        }
    }
}
module.exports = new Verification();