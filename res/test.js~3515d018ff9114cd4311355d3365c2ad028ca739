//state : pending -> fulfilled or rejected
/*
function test() {
    const promise_task1 = new Promise((resolve,reject) => {
        if(false){
            console.log('1-1');
            resolve("처리1");
        }else{
            console.log('1-2');
            reject(new error('error 2-1'));
        }
    });
    const promise_task2 = new Promise((resolve,reject) => {
        if(true){
            console.log('2-1');
            resolve("처리2");
        }else{
            console.log('2-2');
            reject(new error('error 2-1'));
        }
    });

    promise_task1
    .then((val)=>{
        //정상적으로 실행되었을 경우
        console.log(val);
    })
    .catch((val)=>{
        console.log(val);
    })
    .finally(()=>{
        //실패하든 성공하던 무조건 호출됨
    })
}

function test1 (){
    const a = () =>
        new Promise((resolve, reject) => {
            console.log('!');
            resolve('1');
        });

    const b = aval =>
        new Promise((resolve,reject) => {
            console.log('2');
            resolve(`${aval} + 2`)
        });
    
    a()
    .then(b)
    .then(console.log)
}
test1();
*/
/* 
Promise.all([promise_task1,promise_task2]).then((val) => {
        console.log(val);
})
    */


const crypto = require('crypto');


class Crypto {
    // ---------------------------------------------------------------------------------------------------------------
    // createRandomBytes
    // TODO - crypto API randomBytes 를 이용해 random salt를 리턴합니다
    // int:customByte = 64(해시 길이)
    // RETURN -> Buffer:buffer
    // ---------------------------------------------------------------------------------------------------------------
    // * special note *
    // 해당 메서드는 salt값을 Buffer:buffer 형식으로 리턴합니다
    // ---------------------------------------------------------------------------------------------------------------
    // 2021.2.7 - Code Author.leeseongrok(argon1025@gmail.com)
    // ---------------------------------------------------------------------------------------------------------------
    async createRandomBytes(customByte = 64) { //
        return new Promise((resolve, rejects) => {
            crypto.randomBytes(customByte, (error, buffer) => {
                if (!error) {
                    resolve(buffer);
                } else {
                    rejects(error);
                }
            });
        });
    }

    // ---------------------------------------------------------------------------------------------------------------
    // pbkdf2
    // TODO - crypto API pbkdf2를 사용해 나온 결과를 리턴합니다
    // text:password(패스워드), int:iterationsCount(암호화 연산 반복 횟수), int:keyLength(해시길이), String:randomByteBuffer(솔트값), String:digSet(암호화 방식)
    // RETURN -> Buffer:key, String:randomByteBuffer
    // ---------------------------------------------------------------------------------------------------------------
    // * special note *
    // salt값을 해당 메서드에 보낼때는 무조건 toString('hex')로 디코드된 값을 해당 클래스에서 사용해야합니다
    //  만약 Buffer 데이터를 md5으로 변경을 원할경우 hash hashDecrypt 내부 salt 생성 코드블럭을 변경해야합니다
    // ---------------------------------------------------------------------------------------------------------------
    // 2021.2.7 - Code Author.leeseongrok(argon1025@gmail.com)
    // ---------------------------------------------------------------------------------------------------------------
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

    // ---------------------------------------------------------------------------------------------------------------
    // hashencryption
    // TODO - 비밀번호를 해쉬화해서 리턴합니다
    // text:password(패스워드), int:keyLength = 64(해시 길이), int:iterationsCount = 100000(암호화 연산 반복횟수), String:digSet = 'sha512'(암호화 방식), text:salt(디코드할경우 기존 솔트값)
    // RETURN -> {key:String, salt:String}
    // ---------------------------------------------------------------------------------------------------------------
    // * special note *
    // 
    // ---------------------------------------------------------------------------------------------------------------
    // 2021.2.7 - Code Author.leeseongrok(argon1025@gmail.com)
    // ---------------------------------------------------------------------------------------------------------------
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

}

let test = new Crypto();
test.hashencryption('hys971025', 32).then(
    (val) => {
        console.log(val.key);
        console.log(val.salt);
        return test.hashencryption('hys971025',32,undefined,undefined,val.salt); //64 byte
    }
)
    .then((val) => {
        console.log(val.key);
        console.log(val.salt);
    })
    .catch(
        (val) => {
            console.log(val);
        }
    );
