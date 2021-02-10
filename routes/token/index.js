const express = require('express');
const router = express.Router();

const data_verifications = require('../../res/DataVerification'); //값 검증 모듈
const create = require('../../res/Respons_Json'); // res_json생성 모듈 
const db = require('../../res/sync_mysql'); // sql 모듈
const token = require('../../res/JWT'); //토큰 인증모듈
const Crypto = require('../../res/Crypto'); //Hash 인증모듈

// SELECT * FROM babelfish.member WHERE (`email` = 'asd',`password`='');
router.post('/', (req, res, next) => {
    // TODO
    // 1. data_verifications -> id,password
    // 2. DB query
    // 3. respoens
    // 4. error catch
    console.log("요청받음");
    const data_verification = () => Promise.all([data_verifications.check_id({ userid: req.body.userid }), data_verifications.check_password({ password: req.body.password })])
    data_verification()
        .then(() => {
            //DB 질의
            const sql = `SELECT * FROM babelfish.member WHERE (\`email\` = '${req.body.userid}')`
            return db.get_query(sql);
        })
        .then(async(result) => {
            const passwordComparison = await Crypto.comparison(req.body.password,result[0]['password'],result[0]['salt'],32); // 유저가 입력한 패스워드와 DB에 저장된 패스워드를 Hash암호화후 검증 -> true false
            if(passwordComparison){
                return token.sign(result[0]['email']); // 아이디와 비밀번호가 일치할경우 토큰 생성
            }else{
                throw 'DB No results'; // 일치하지않을경우 에러 생성
            }
        })
        .then((token) => {
            // 토큰 전송
            return res.status(200).json(create.login_success(token, "Login Successful", "t3"));
        })
        //오류처리
        .catch((error) => {
            if (error === "Value verification failed") {
                return res.status(400).json(create.error(`token`, `Invalid ID or password`, "t1"));
            } else if (error === "DB No results") {
                return res.status(401).json(create.error(`token`, `Invalid ID or password`, "t2"));
            } else {
                return res.status(404);
            }
        });
});

router.post('/join', (req, res, next) => {
    // TODO
    // 1. data_verifications -> id,name,password
    // 2. DB query
    // 3. respoens
    // 4. error catch
    const data_verification = () => Promise.all([data_verifications.check_id({ userid: req.body.userid }), data_verifications.check_name({ name: req.body.name }), data_verifications.check_password({ password: req.body.password })])

    // 1. data_verifications -> id,name,password
    data_verification()
        .then(() => {
            // 2. DB query
            const sql = `INSERT INTO \`babelfish\`.\`member\` (\`email\`,\`name\`,\`password\`) VALUES('${req.body.userid}','${req.body.name}','${req.body.password}');`
            return db.insert_query(sql);
        })
        .then(() => {
            return res.status(200).json(create.success("user", "join Successful", "t7"));
        })
        .catch((error) => {
            if (error === "Value verification failed") {
                return res.status(400).json(create.error(`user`, `Invalid ID or password or name`, "t5"));
            } else if (error.code == 'ER_DUP_ENTRY') {
                return res.status(401).json(create.error(`user`, `This ID is already registered`, "t6"));
            } else {
                return res.status(404);
            }
        });
});
module.exports = router;