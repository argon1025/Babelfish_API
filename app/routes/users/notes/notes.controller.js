const data_verifications = require('../../../service/DataVerification'); //값 검증 모듈
const create = require('../../../service/Respons_Json'); // res_json생성 모듈 
const db = require('../../../service/sync_mysql'); // sql 모듈
const jwt = require('../../../service/JWT'); //토큰 인증모듈
const settings = require('../../../service/settings');// 셋팅

// SELECT * FROM babelfish.note WHERE (`member_email` = 'id');
module.exports.list = (req, res, next) => {
    // TODO
    // 1. data_verifications -> params.userid
    // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
    // 3. DB query
    // 4. respoens
    // 5. error catch
    data_verifications.check_id({ userid: req.params.userid })
        .then(() => {
            // 2. 토큰 검증 시작
            return jwt.verify(req.headers.token);
        })
        .then((decoded_data) => {
            // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
            if (decoded_data.userid != req.params.userid) {
                throw "no permission";
            }
        })
        .then(() => {
            // 3. DB query
            const sql = `SELECT * FROM \`babelfish\`.\`note\` WHERE (\`member_email\` = '${req.params.userid}')`;
            return db.get_query(sql);
        })
        .then((data) => {
            // 4. respoens
            return res.status(200).json(create.success_getdata("notes", "User Note Information Load Successfully", "n1-4", data));
        })
        .catch((error) => {
            // 5. error catch
            next(error);
            /*
            console.log("error :: GET/api/users/{useremail}/notes 유저 단어장 리스트");
            console.log(error);
            console.log("-------------------------------------------------");
            next(error);
            if (error === "Value verification failed") {
                return res.status(400).json(create.error(`notes`, `Invalid ID`, "n1-1"));
            } else if (error === "Token authentication failed") {
                return res.status(401).json(create.error(`notes`, `Token invalid or expired`, 4));
            } else if (error === "no permission") {
                return res.status(401).json(create.error(`notes`, `Unable to modify other user information`, "n1-2"));
            } else if (error === "DB No results") {
                return res.status(404).json(create.error(`notes`, `DB No results`, "n1-3"));
            } else {
                return res.status(404);
            }
            */
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
    console.log("!");
    const data_verification = () => Promise.all([data_verifications.check_id({ userid: req.params.userid }), data_verifications.check_note_name({ notename: req.body.notename })]);
    // 1. data_verifications -> params.userid, notename
    data_verification()
        .then(() => {
            // 2. 토큰 검증 시작
            return jwt.verify(req.headers.token);
        })
        .then((decoded_data) => {
            // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
            if (decoded_data.userid != req.params.userid) {
                throw "no permission";
            }
        })
        .then(()=>{
            const sql = `SELECT COUNT(*) FROM babelfish.note WHERE (\`member_email\`='${req.params.userid}');`
            return db.get_query(sql);
        })
        .then((userNoteCount)=>{
            const result = userNoteCount[0]["COUNT(*)"];
            console.log(result);
            if(result >= 100){ // 유저 노트가 100개 이상일경우
                throw "Over Max Notes";
            }
        })
        .then(() => {
            // 3. DB query
            const sql = `INSERT INTO babelfish.note (\`member_email\`, \`name\`, \`Learning_Day\`) VALUES ('${req.params.userid}', '${req.body.notename}', '${settings.today()}')`;
            return db.insert_query(sql);
        })
        .then(() => {
            // 4. respoens
            return res.status(200).json(create.success("notes", "Create user note successful", "n2-4"));
        })
        .catch((error) => {
            // 5. error catch
            next(error);
            /*
            console.log("error :: GET/api/users/{useremail}/notes 유저 단어장 리스트");
            console.log(error);
            console.log("-------------------------------------------------");
            if (error === "Value verification failed") {
                return res.status(400).json(create.error(`notes`, `Invalid ID`, "n2-1"));
            } else if (error === "Token authentication failed") {
                return res.status(401).json(create.error(`notes`, `Token invalid or expired`, "4"));
            } else if (error === "no permission") {
                return res.status(401).json(create.error(`notes`, `Unable to modify other user information`, "n2-2"));
            } else if (error.affectedRows === 0) {
                return res.status(400).json(create.error(`notes`, `Invalid ID`, "n2-3"));
            } else {
                return res.status(404);
            }
            */
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
    const data_verification = () => Promise.all([data_verifications.check_id({ userid: req.params.userid }), data_verifications.check_note_name({ notename: req.body.notename }), data_verifications.check_number({ number: req.params.noteid })]);
    data_verification()
        .then(() => {
            // 2. 토큰 검증 시작
            return jwt.verify(req.headers.token);
        })
        .then((decoded_data) => {
            // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
            if (decoded_data.userid != req.params.userid) {
                throw "no permission";
            }
        })
        .then(() => {
            // 3. DB query
            const sql = `UPDATE \`babelfish\`.\`note\` SET \`name\` = '${req.body.notename}' WHERE (\`id\` = '${req.params.noteid}' AND \`member_email\` = '${req.params.userid}' )`;
            return db.insert_query(sql);
        })
        .then(() => {
            // 4. respoens
            return res.status(200).json(create.success("notes", "Change note Information successful", "n3-4"));
        })
        .catch((error) => {
            // 5. error catch
            next(error);
            /*
            console.log("error :: PUT/api/users/{useremail}/notes/{noteid} 유저 단어장 수정");
            console.log(error);
            console.log("-------------------------------------------------");
            if (error === "Value verification failed") {
                return res.status(400).json(create.error(`notes`, `Invalid ID`, "n3-1"));
            } else if (error === "Token authentication failed") {
                return res.status(401).json(create.error(`notes`, `Token invalid or expired`, 4));
            } else if (error === "no permission") {
                return res.status(401).json(create.error(`notes`, `Unable to modify other user information`, "n3-2"));
            } else if (error.affectedRows === 0) {
                return res.status(400).json(create.error(`notes`, `Invalid ID`, "n3-3"));
            } else {
                return res.status(404);
            }
            */
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
    const data_verification = () => Promise.all([data_verifications.check_id({ userid: req.params.userid }), data_verifications.check_number({ number: req.params.noteid })]);
    // 1. data_verifications -> params.userid, notenumber
    data_verification()
        .then(() => {
            // 2. 토큰 검증 시작
            return jwt.verify(req.headers.token);
        })
        .then((decoded_data) => {
            // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
            if (decoded_data.userid != req.params.userid) {
                throw "no permission";
            }
        })
        .then(() => {
            // 3. DB query
            const sql = `DELETE FROM \`babelfish\`.\`note\` WHERE (\`id\` = '${req.params.noteid}' AND \`member_email\` = '${req.params.userid}')`;
            return db.insert_query(sql);
        })
        .then(() => {
            // 4. respoens
            return res.status(200).json(create.success("notes", "Delete note successful", "n4-4"));
        })
        .catch((error) => {
            // 5. error catch
            next(error);
            /*
            console.log("error :: DELETE/api/users/{useremail}/notes/{noteid} 유저 단어장 삭제");
            console.log(error);
            console.log("-------------------------------------------------");
            if(error === "Value verification failed"){
                return res.status(400).json(create.error(`notes`,`Invalid ID`,"n4-1"));
             }else if(error === "Token authentication failed"){
                return res.status(401).json(create.error(`notes`,`Token invalid or expired`,4));
             }else if(error === "no permission"){
                return res.status(401).json(create.error(`notes`,`Unable to modify other user information`,"n4-2"));
             }else if(error.affectedRows === 0){
                return res.status(400).json(create.error(`notes`,`Invalid ID`,"n4-3"));
             }else{
                return res.status(404);
             }
             */
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
    const data_verification = () => Promise.all([data_verifications.check_id({ userid: req.params.userid }), data_verifications.check_number({ number: req.params.noteid })]);
    data_verification()
        .then(() => {
            // 2. 토큰 검증 시작
            return jwt.verify(req.headers.token);
        })
        .then((decoded_data) => {
            // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
            if (decoded_data.userid != req.params.userid) {
                throw "no permission";
            }
        })
        .then(() => {
            // 3. DB query
            const sql = `UPDATE \`babelfish\`.\`note\` SET \`Learning_Day\` = '${settings.today()}', \`Learning_Count\`=\`Learning_Count\`+1 WHERE (\`id\` = '${req.params.noteid}' AND \`member_email\` = '${req.params.userid}')`;
            return db.insert_query(sql);
        })
        .then(() => {
            // 4. respoens
            return res.status(200).json(create.success("notes", "note updated successful", "n5-4"));
        })
        .catch((error) => {
            // 5. error catch
            next(error);
            /*
            console.log("error :: PUT/api/users/{useremail}/notes/{noteid}/updated-date 단어장 학습상태 갱신");
            console.log(error);
            console.log("-------------------------------------------------");
            if(error === "Value verification failed"){
                return res.status(400).json(create.error(`notes`,`Invalid ID`,"n5-1"));
             }else if(error === "Token authentication failed"){
                return res.status(401).json(create.error(`notes`,`Token invalid or expired`,4));
             }else if(error === "no permission"){
                return res.status(401).json(create.error(`notes`,`Unable to modify other user information`,"n5-2"));
             }else if(error.affectedRows === 0){
                return res.status(400).json(create.error(`notes`,`Invalid ID`,"n5-3"));
             }else{
                return res.status(404);
             }
             */
        });
}