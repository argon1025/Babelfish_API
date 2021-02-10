const crypto = require('crypto'); // 의존성 모듈

/*
    sha512 salt module

    @ author leeseongrok(argon1025@gmail.com) - 2021.2.7
    @ version 1.0

    @ How to use
        암호화
        -> hashencryption(password, keyLength)
            .then((result)=>{result.key result.solt})
        솔트값을 전달하는 암호화
        -> hashencryption(password, keyLengt, hundefined,undefined,salt)
            .then((result)=>{result.key result.solt})
*/
class Crypto {
    /*
    createRandomBytes - crypto API randomBytes 를 이용해 random salt를 생성해서 리턴합니다
    ---------------------------------------------------------------------------------------------------------------
    int:customByte = 64(해시 길이)
    RETURN -> Buffer:buffer
    ---------------------------------------------------------------------------------------------------------------
    */
    async createRandomBytes(customByte = 64) {
        return new Promise((resolve, rejects) => {
            crypto.randomBytes(customByte, (error, buffer) => {
                if (!error) {
                    resolve(buffer); // 랜덤으로 생성한 salt값을 버퍼형태로 리턴합니다
                } else {
                    rejects(error);
                }
            });
        });
    }





    /*
    pbkdf2 - crypto API pbkdf2를 사용해 해시 암호화를 진행하고 그 결과 key(해시암호화된 데이터), salt(사용된 솔트데이터) 를 객체형태로 리턴합니다
    ---------------------------------------------------------------------------------------------------------------
    text:password(패스워드), int:iterationsCount(암호화 연산 반복 횟수), int:keyLength(해시길이), String:randomByteBuffer(솔트값), String:digSet(암호화 방식)
    RETURN -> Buffer:key, String:randomByteBuffer
    ---------------------------------------------------------------------------------------------------------------
    * special note *
    - salt값을 해당 메서드에 보낼때는 무조건 toString('hex')로 디코드된 값을 해당 클래스에서 사용해야합니다
            만약 Buffer 데이터를 md5으로 변경을 원할경우 hash hashDecrypt 내부 salt 생성 코드블럭을 변경해야합니다
    ---------------------------------------------------------------------------------------------------------------
    */
    async pbkdf2(password, iterationsCount, keyLength, randomByteBuffer, digSet) {
        return new Promise((resolve, rejects) => {
            crypto.pbkdf2(password, randomByteBuffer, iterationsCount, keyLength, digSet, (error, key) => {
                if (!error) {
                    resolve({ key: key, salt: randomByteBuffer });
                } else {
                    rejects(error);
                }
            });
        });
    }




    
    /*
    hashencryption - createRandomBytes에서 솔트값을 생성하거나 인자로 받아서
        pbkdf2 메서드에서 해쉬화 한 다음 toString('hex') 데이터 형식으로 key(해시암호화된 데이터), salt(사용된 솔트데이터) 를 객체형태로 리턴합니다
    ---------------------------------------------------------------------------------------------------------------
    text:password(패스워드), int:keyLength = 64(해시 길이), int:iterationsCount = 100000(암호화 연산 반복횟수), String:digSet = 'sha512'(암호화 방식), text:salt(디코드할경우 기존 솔트값)
    RETURN -> {key:String, salt:String}
    ---------------------------------------------------------------------------------------------------------------
    */
    async hashencryption(password, keyLength = 64, iterationsCount = 100000, digSet = 'sha512', salt) {
        if (!password) { //인자값이 입력 되었는지 체크
            throw Error(`Password is required.`);
        }
        try {
            if (!salt) { // Decrypt 하는 경우가 아닐때
                salt = await this.createRandomBytes(keyLength); // createRandomBytes에서 salt 값을 생성합니다
                salt = salt.toString('hex'); // 생성된 salt값을 toString('hex') 합니다
            }
            const result = await this.pbkdf2(password, iterationsCount, keyLength, salt, digSet); // pbkdf2메서드를 사용해 encryption 합니다
            return { key: result.key.toString('hex'), salt: result.salt.toString('hex') }; // 결과값을 toString('hex') 해서 반환합니다

        } catch (error) {
            throw error; // 에러를 반환합니다
        }
    }

  /*
    comparison - 유저가 입력한 평문 텍스트를전달받은 salt인자로 평문을 Hash화 해서 기존 암호화된 Hash를 비교한뒤 boolen을 리턴합니다
    ---------------------------------------------------------------------------------------------------------------
    text:userPassword(평문 텍스트),text:dbPassword(hash텍스트),text:salt(평문에 적용할 salt값), int:keyLength = 64(해시 길이), int:iterationsCount = 100000(암호화 연산 반복횟수), String:digSet = 'sha512'(암호화 방식)
    RETURN -> boolen
    ---------------------------------------------------------------------------------------------------------------
    */
    async comparison(userPassword, dbPassword, salt, keyLength = 64, iterationsCount = 100000, digSet = 'sha512'){
        if (!userPassword && !dbPassword && !salt) { //인자값이 입력 되었는지 체크
            throw Error(`userPassword dbPassword salt is required.`);
        }

        try{
            //console.log(`${userPassword} / ${dbPassword} / ${salt}`)
            const result = await this.hashencryption(userPassword,keyLength,iterationsCount,digSet,salt); //유저가 입력한 평문을 주어진 salt인자로 hash화 합니다
            //console.log(`${userPassword} / ${dbPassword} / ${result.key}`)
            if(result.key === dbPassword){ //hash암호화된 유저 평문과 기존 데이터를 비교해 값이 일치하는지 확인합니다
                return true;
            }else{
                return false;
            }
        }catch(error){
            throw error;
        }
    }
}

module.exports = new Crypto();