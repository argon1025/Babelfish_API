const data_verifications = require('../../../res/DataVerification'); //값 검증 모듈
const create = require('../../../res/Respons_Json'); // res_json생성 모듈 
const db = require('../../../res/sync_mysql'); // sql 모듈
const jwt = require('../../../res/JWT'); //토큰 인증모듈
const settings = require('../../../res/settings');// 셋팅

// SELECT * FROM babelfish.note WHERE (`member_email` = 'id');
module.exports.list = (req, res, next) => {
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
        if(decoded_data.userid != req.params.userid){
            throw "no permission";
        }
    })
    .then(()=>{
        // 3. DB query
        const sql = `SELECT * FROM \`babelfish\`.\`note\` WHERE (\`member_email\` = '${req.params.userid}')`;
        return db.get_query(sql);
    })
    .then((data)=>{
        // 4. respoens
        return res.status(200).json(create.success_getdata("notes","User Note Information Load Successfully",13,data));
    })
    .catch((error)=>{
        // 5. error catch
        console.log("error :: GET/api/users/{useremail}/notes 유저 단어장 리스트");
        console.log(error);
        console.log("-------------------------------------------------");
        if(error === "Value verification failed"){
            return res.status(400).json(create.error(`notes`,`Invalid ID`,12));
         }else if(error === "Token authentication failed"){
            return res.status(401).json(create.error(`notes`,`Token invalid or expired`,4));
         }else if(error === "no permission"){
            return res.status(401).json(create.error(`notes`,`Unable to modify other user information`,15));
         }else if(error === "DB No results"){
            return res.status(404).json(create.error(`notes`,`DB No results`,16));
         }else{
            return res.status(404);
         }
    });
}

// INSERT INTO `babelfish`.`note` (`member_email`, `name`, `Learning_Day`) VALUES ('test12@naver.com', '테스트단어장', '2020.01.01');
module.exports.create = (req, res, next) => {
    // TODO
    // 1. data_verifications -> params.userid, notename
    // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
    // 3. DB query
    // 4. respoens
    // 5. error catch

    const data_verification = () => Promise.all([data_verifications.check_id({userid:req.params.userid}),data_verifications.check_note_name({notename:req.body.notename})]);
    // 1. data_verifications -> params.userid, notename
    data_verification()
    .then(()=>{
        // 2. 토큰 검증 시작
        return jwt.verify(req.headers.token);
    })
    .then((decoded_data)=>{
        // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
        if(decoded_data.userid != req.params.userid){
            throw "no permission";
        }
    })
    .then(()=>{
        // 3. DB query
        const sql = `INSERT INTO \`babelfish\`.\`note\` (\`member_email\`, \`name\`, \`Learning_Day\`) VALUES ('${req.params.userid}', '${req.body.notename}', '${settings.today()}')`;
        return db.insert_query(sql);
    })
    .then(()=>{
        // 4. respoens
        return res.status(200).json(create.success("notes","Create user note successful",20));
    })
    .catch((error)=>{
        // 5. error catch
        console.log("error :: GET/api/users/{useremail}/notes 유저 단어장 리스트");
        console.log(error);
        console.log("-------------------------------------------------");
        if(error === "Value verification failed"){
            return res.status(400).json(create.error(`notes`,`Invalid ID`,17));
         }else if(error === "Token authentication failed"){
            return res.status(401).json(create.error(`notes`,`Token invalid or expired`,4));
         }else if(error === "no permission"){
            return res.status(401).json(create.error(`notes`,`Unable to modify other user information`,18));
         }else if(error.affectedRows === 0){
            return res.status(400).json(create.error(`notes`,`Invalid ID`,19));
         }else{
            return res.status(404);
         }
    });
}

// UPDATE `babelfish`.`note` SET `name` = '테스트단어장3' WHERE (`id` = '7' AND `member_email` = 'test122234@naver.com' );
module.exports.change_information = (req, res, next) => {
    // TODO
    // 1. data_verifications -> params.userid, notename
    // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
    // 3. DB query
    // 4. respoens
    // 5. error catch
    const data_verification = () => Promise.all([data_verifications.check_id({userid:req.params.userid}),data_verifications.check_note_name({notename:req.body.notename}),data_verifications.check_number({number:req.params.noteid})]);
    data_verification()
    .then(()=>{
        // 2. 토큰 검증 시작
        return jwt.verify(req.headers.token);
    })
    .then((decoded_data)=>{
        // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
        if(decoded_data.userid != req.params.userid){
            throw "no permission";
        }
    })
    .then(()=>{
        // 3. DB query
        const sql = `UPDATE \`babelfish\`.\`note\` SET \`name\` = '${req.body.notename}' WHERE (\`id\` = '${req.params.noteid}' AND \`member_email\` = '${req.params.userid}' )`;
        return db.insert_query(sql);
    })
    .then(()=>{
        // 4. respoens
        return res.status(200).json(create.success("notes","Change note Information successful",24));
    })
    .catch((error)=>{
        // 5. error catch
        console.log("error :: PUT/api/users/{useremail}/notes/{noteid} 유저 단어장 수정");
        console.log(error);
        console.log("-------------------------------------------------");
        if(error === "Value verification failed"){
            return res.status(400).json(create.error(`notes`,`Invalid ID`,21));
         }else if(error === "Token authentication failed"){
            return res.status(401).json(create.error(`notes`,`Token invalid or expired`,4));
         }else if(error === "no permission"){
            return res.status(401).json(create.error(`notes`,`Unable to modify other user information`,22));
         }else if(error.affectedRows === 0){
            return res.status(400).json(create.error(`notes`,`Invalid ID`,23));
         }else{
            return res.status(404);
         }
    });
}

// DELETE FROM `babelfish`.`note` WHERE (`id` = '5' AND `member_email` = 'test122234@naver.com');\
module.exports.delete = (req, res, next) => {
    // TODO
    // 1. data_verifications -> params.userid, notename
    // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
    // 3. DB query
    // 4. respoens
    // 5. error catch
    const data_verification = () => Promise.all([data_verifications.check_id({userid:req.params.userid}),data_verifications.check_number({number:req.params.noteid})]);
    // 1. data_verifications -> params.userid, notenumber
    data_verification()
    .then(()=>{
        // 2. 토큰 검증 시작
        return jwt.verify(req.headers.token);
    })
    .then((decoded_data)=>{
        // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
        if(decoded_data.userid != req.params.userid){
            throw "no permission";
        }
    })
    .then(()=>{
        // 3. DB query
        const sql = `DELETE FROM \`babelfish\`.\`note\` WHERE (\`id\` = '${req.params.noteid}' AND \`member_email\` = '${req.params.userid}')`;
        return db.insert_query(sql);
    })
    .then(()=>{
        // 4. respoens
        return res.status(200).json(create.success("notes","Delete note successful",28));
    })
    .catch((error)=>{
        // 5. error catch
        console.log("error :: DELETE/api/users/{useremail}/notes/{noteid} 유저 단어장 삭제");
        console.log(error);
        console.log("-------------------------------------------------");
        if(error === "Value verification failed"){
            return res.status(400).json(create.error(`notes`,`Invalid ID`,25));
         }else if(error === "Token authentication failed"){
            return res.status(401).json(create.error(`notes`,`Token invalid or expired`,4));
         }else if(error === "no permission"){
            return res.status(401).json(create.error(`notes`,`Unable to modify other user information`,26));
         }else if(error.affectedRows === 0){
            return res.status(400).json(create.error(`notes`,`Invalid ID`,27));
         }else{
            return res.status(404);
         }
    });
}

// UPDATE `babelfish`.`note` SET `Learning_Day` = '2020-01-02', `Learning_Count`=`Learning_Count`+1 WHERE (`id` = '6' AND `member_email` = 'test12234@naver.com');
module.exports.updated_date = (req, res, next) => {
    // TODO
    // 1. data_verifications -> params.userid, params.noteid
    // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
    // 3. DB query
    // 4. respoens
    // 5. error catch
    const data_verification = () => Promise.all([data_verifications.check_id({userid:req.params.userid}),data_verifications.check_number({number:req.params.noteid})]);
    data_verification()
    .then(()=>{
        // 2. 토큰 검증 시작
        return jwt.verify(req.headers.token);
    })
    .then((decoded_data)=>{
        // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
        if(decoded_data.userid != req.params.userid){
            throw "no permission";
        }
    })
    .then(()=>{
        // 3. DB query
        const sql = `UPDATE \`babelfish\`.\`note\` SET \`Learning_Day\` = '${settings.today()}', \`Learning_Count\`=\`Learning_Count\`+1 WHERE (\`id\` = '${req.params.noteid}' AND \`member_email\` = '${req.params.userid}')`;
        return db.insert_query(sql);
    })
    .then(()=>{
        // 4. respoens
        return res.status(200).json(create.success("notes","note updated successful",32));
    })
    .catch((error)=>{
        // 5. error catch
        console.log("error :: PUT/api/users/{useremail}/notes/{noteid}/updated-date 단어장 학습상태 갱신");
        console.log(error);
        console.log("-------------------------------------------------");
        if(error === "Value verification failed"){
            return res.status(400).json(create.error(`notes`,`Invalid ID`,29));
         }else if(error === "Token authentication failed"){
            return res.status(401).json(create.error(`notes`,`Token invalid or expired`,4));
         }else if(error === "no permission"){
            return res.status(401).json(create.error(`notes`,`Unable to modify other user information`,30));
         }else if(error.affectedRows === 0){
            return res.status(400).json(create.error(`notes`,`Invalid ID`,31));
         }else{
            return res.status(404);
         }
    });
}