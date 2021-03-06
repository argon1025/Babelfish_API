const data_verifications = require('../../service/DataVerification'); //값 검증 모듈
const create = require('../../service/Respons_Json'); // res_json생성 모듈 
const db = require('../../service/sync_mysql'); // sql 모듈
const jwt = require('../../service/JWT'); //토큰 인증모듈
const Crypto = require('../../service/Crypto');// 해싱 모듈

// UPDATE `babelfish`.`member` SET `name` = 'name', `password` = 'pass' WHERE (`email` = 'id');
module.exports.change_information = (req, res, next) => {
    // TODO
    // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
    // 3. DB query
    // 4. respoens
    // 5. error catch
    const data_verification = () => Promise.all([data_verifications.check_id({userid:req.params.userid}),data_verifications.check_name({name:req.body.name}),data_verifications.check_password({password:req.body.password})]);
    // 1. data_verifications -> params.userid, name, password
    data_verification()
    .then(()=>{
        // 2. 토큰 검증
        return jwt.verify(req.headers.token);
    })
    .then((decoded_data)=>{
        // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
        console.log(decoded_data.userid);
        if(decoded_data.userid != req.params.userid){
            throw "no permission";
        }
    })
    .then(()=>{
        return Crypto.hashencryption(req.body.password,32);
    })
    .then((cryptoResult)=>{
        // 3. DB query 
        const sql = `UPDATE babelfish.member SET \`name\` = '${req.body.name}', \`password\` = '${cryptoResult.key}',\`salt\` = '${cryptoResult.salt}' WHERE (\`email\` = '${req.params.userid}')`;
        return db.insert_query(sql);
    })
    .then(()=>{
        // 4. respoens
        return res.status(200).json(create.success("user","user Information change successful","u3"));
    })
    .catch((error)=>{
        // 5. error catch
        next(error);
        /*
        if(error === "Value verification failed"){
            return res.status(400).json(create.error(`user`,`Invalid ID or password or name`,"u1"));
         }else if(error === "Token authentication failed"){
            return res.status(401).json(create.error(`user`,`Token invalid or expired`,"4"));
         }else if(error === "no permission"){
            return res.status(401).json(create.error(`user`,`Unable to modify other user information`,"u2"));
         }else{
            return res.status(404);
         }
         */
    })
}

// DELETE FROM `babelfish`.`member` WHERE (`email` = 'id'');
module.exports.delete = (req, res, next) => {
    // TODO
    // 1. data_verifications -> params.userid
    // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
    // 3. DB query
    // 4. respoens
    // 5. error catch
    data_verifications.check_id({userid:req.params.userid})
    .then(()=>{
        // 2. 토큰 검증 시작
        return jwt.verify(req.headers.token);
    })
    .then((decoded_data)=>{
        // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
        console.log(decoded_data.userid);
        if(decoded_data.userid != req.params.userid){
            throw "no permission";
        }
    })
    .then(()=>{
        // 3. DB query
        const sql = `DELETE FROM \`babelfish\`.\`member\` WHERE (\`email\` = '${req.params.userid}')`;
        return db.insert_query(sql);
    })
    .then(()=>{
        // 4. respoens
        return res.status(200).json(create.success("user","user Information delete successful","u7"));
    })
    .catch((error)=>{
        // 5. error catch
        next(error);
        /*
        console.log("error :: DELETE /api/users/:{useremail} 유저 삭제");
        console.log(error);
        console.log("-------------------------------------------------");
        if(error === "Value verification failed"){
            return res.status(400).json(create.error(`user`,`Invalid ID`,"u4"));
         }else if(error === "Token authentication failed"){
            return res.status(401).json(create.error(`user`,`Token invalid or expired`,"4"));
         }else if(error === "no permission"){
            return res.status(401).json(create.error(`user`,`Unable to modify other user information`,"u5"));
         }else if(error.affectedRows === 0){
            return res.status(400).json(create.error(`user`,`Invalid ID`,"u6"));
         }else{
            return res.status(404);
         }
         */
    })
}