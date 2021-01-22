const express = require('express');
const router = express.Router();

const data_verifications = require('../../res/DataVerification'); //값 검증 모듈
const create = require('../../res/Respons_Json'); // res_json생성 모듈 
const db = require('../../res/sync_mysql'); // sql 모듈
const token = require('../../res/JWT');

// SELECT * FROM babelfish.member WHERE (`email` = 'asd',`password`='');
///////////////////////////////////// ==> token
// POST /token
router.post('/', (req, res, next) =>{
 // TODO -
 // id, pass check
 const data_verification = result => Promise.all([data_verifications.check_id({userid:req.body.userid}),data_verifications.check_password({password:req.body.password})])
 data_verification()
 .then(()=>{
    //DB 질의
    const sql = `SELECT * FROM babelfish.member WHERE (\`email\` = '${req.body.userid}' AND \`password\`='${req.body.password}')`
    return db.get_query(sql);
})
 .then((result)=>{
    // 질의 성공 토큰발급
    return token.sign(result[0]['email']);
})
.then((token)=>{
    // 토큰 전송
    return res.status(200).json(create.login_success(token,"Login Successful","3"));
})
//오류처리
 .catch((error) => {
     if(error === "Value verification failed"){
        return res.status(400).json(create.login_error(`token`,`Invalid ID or password`,`NULL`,1));
     }else if(error === "DB No results"){
        return res.status(401).json(create.login_error(`token`,`Invalid ID or password`,`NULL`,2));
     }else{
        return res.status(404);
     }
 });
});

module.exports = router;