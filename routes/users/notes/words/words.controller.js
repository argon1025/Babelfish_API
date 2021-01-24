const data_verifications = require('../../../../res/DataVerification'); //값 검증 모듈
const create = require('../../../../res/Respons_Json'); // res_json생성 모듈 
const db = require('../../../../res/sync_mysql'); // sql 모듈
const jwt = require('../../../../res/JWT'); //토큰 인증모듈
const settings = require('../../../../res/settings');// 셋팅

/*
전체 리스트 조회
babelfish.word.note_id
babelfish.note.member_email
본인데이터만 조회할 수 있도록 조인연산 진행
\
SELECT babelfish.word.id,babelfish.word.note_id,babelfish.word.Word_Title,babelfish.word.Mean1,babelfish.word.Mean2,babelfish.word.Wrong_Count
FROM babelfish.word, babelfish.note
WHERE(babelfish.word.note_id=babelfish.note.id AND babelfish.note.member_email='test12234@naver.com' AND babelfish.word.note_id = '6');
*/
module.exports.list = (req, res, next) => {
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
        const sql = `
        SELECT babelfish.word.id,babelfish.word.note_id,babelfish.word.Word_Title,babelfish.word.Mean1,babelfish.word.Mean2,babelfish.word.Wrong_Count
        FROM babelfish.word, babelfish.note
        WHERE(babelfish.word.note_id=babelfish.note.id AND babelfish.note.member_email='${req.params.userid}' AND babelfish.word.note_id = '${req.params.noteid}')`;
        return db.get_query(sql);
    })
    .then((data)=>{
        // 4. respoens
        return res.status(200).json(create.success_getdata("words","Words Information Load Successfully","w1-4",data));
    })
    .catch((error)=>{
        // 5. error catch
        console.log("error :: GET/api/users/{useremail}/notes/{noteid}/words 단어장 단어 리스트");
        console.log(error);
        console.log("-------------------------------------------------");
        if(error === "Value verification failed"){
            return res.status(400).json(create.error(`Words`,`Invalid ID`,"w1-1"));
         }else if(error === "Token authentication failed"){
            return res.status(401).json(create.error(`Words`,`Token invalid or expired`,4));
         }else if(error === "no permission"){
            return res.status(401).json(create.error(`Words`,`Unable to modify other user information`,"w1-2"));
         }else if(error === "DB No results"){
            return res.status(404).json(create.error(`Words`,`DB No results`,"w1-3"));
         }else{
            return res.status(404);
         }
    });
}

// INSERT INTO `babelfish`.`word` (`note_id`, `Word_Title`, `Mean1`, `Mean2`) VALUES ('3', 'a', '에이', '에이1');
module.exports.create = (req, res, next) => {
    // TODO
    // 1. data_verifications -> params.userid, notename, req.body.title, req.body.mean1, req.body.mean2
    // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
    // 3-1. DB query 유저 아이디와 노트 아이디가 일치하는지
    // 3-2. DB query 삽입 진행
    // 4. respoens
    // 5. error catch

    const data_verification = () => Promise.all([data_verifications.check_id({userid:req.params.userid}),data_verifications.check_number({number:req.params.noteid}),data_verifications.check_words({words:req.body.title}),data_verifications.check_words({words:req.body.mean1}),data_verifications.check_words({words:req.body.mean2})]);
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
        // 3-1. DB query 유저 아이디와 노트 아이디가 일치하는지
        const sql = `
        SELECT babelfish.note.id
        FROM babelfish.note
        WHERE(babelfish.note.member_email='${req.params.userid}' AND babelfish.note.id = '${req.params.noteid}')
        `;
        return db.get_query(sql);
    })
    .then(()=>{
        // 3-2. DB query 삽입 진행
        const sql = `INSERT INTO \`babelfish\`.\`word\` (\`note_id\`, \`Word_Title\`, \`Mean1\`, \`Mean2\`) VALUES ('${req.params.noteid}', '${req.body.title}', '${req.body.mean1}', '${req.body.mean2}')`;
        return db.insert_query(sql);
    })
    .then(()=>{
        // 4. respoens
        return res.status(200).json(create.success("Words","Add to Word successful","w2-5"));
    })
    .catch((error)=>{
        // 5. error catch
        console.log("error :: POST/api/users/{useremail}/notes/{noteid}/words 단어장에 단어 추가");
        console.log(error);
        console.log("-------------------------------------------------");
        if(error === "Value verification failed"){
            return res.status(400).json(create.error(`notes`,`Invalid ID`,"w2-1"));
         }else if(error === "Token authentication failed"){
            return res.status(401).json(create.error(`notes`,`Token invalid or expired`,4));
         }else if(error === "no permission"){
            return res.status(401).json(create.error(`notes`,`Unable to modify other user information`,"w2-2"));
         }else if(error.affectedRows === 0){ //쿼리 질의 실패시
            return res.status(400).json(create.error(`notes`,`Invalid ID`,"w2-3"));
         }else if(error === "DB No results"){ // 회원이 노트를 소유중이 아닐때
            return res.status(400).json(create.error(`notes`,`Invalid ID`,"w2-4"));
         }else{
            return res.status(404);
         }
    });
}
// UPDATE `babelfish`.`word` SET `Word_Title` = 'c', `Mean1` = '에이1', `Mean2` = '에이2' WHERE (`id` = '1');
module.exports.change_information = (req, res, next) => {
   // TODO
    // 1. data_verifications -> params.userid, notename, req.body.title, req.body.mean1, req.body.mean2
    // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
    // 3-1. DB query 유저 아이디와 노트 아이디가 일치하는지
    // 3-2. DB query 삽입 진행
    // 4. respoens
    // 5. error catch

    const data_verification = () => Promise.all([data_verifications.check_id({userid:req.params.userid}),data_verifications.check_number({number:req.params.noteid}),data_verifications.check_number({number:req.params.wordid}),data_verifications.check_words({words:req.body.title}),data_verifications.check_words({words:req.body.mean1}),data_verifications.check_words({words:req.body.mean2})]);
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
        // 3-1. DB query 유저 아이디, 노트아이디, 단어번호가 일치하는지
        const sql = `
        SELECT babelfish.word.id
        FROM babelfish.word, babelfish.note
        WHERE(babelfish.word.note_id=babelfish.note.id AND babelfish.note.member_email='${req.params.userid}' AND babelfish.note.id = '${req.params.noteid}' AND babelfish.word.id='${req.params.wordid}')
        `;
        return db.get_query(sql);
    })
    .then(()=>{
        // 3-2. DB query 삽입 진행
        const sql = `UPDATE \`babelfish\`.\`word\` SET \`Word_Title\` = '${req.body.title}', \`Mean1\` = '${req.body.mean1}', \`Mean2\` = '${req.body.mean2}' WHERE (\`id\` = '${req.params.wordid}' AND \`note_id\` = '${req.params.noteid}')`;
        return db.insert_query(sql);
    })
    .then(()=>{
        // 4. respoens
        return res.status(200).json(create.success("Words","Change to Word successful","w3-5"));
    })
    .catch((error)=>{
        // 5. error catch
        console.log("error :: PUT/api/users/{useremail}/notes/{noteid}/words/{wordid} 단어 수정");
        console.log(error);
        console.log("-------------------------------------------------");
        if(error === "Value verification failed"){
            return res.status(400).json(create.error(`notes`,`Invalid ID`,"w3-1"));
         }else if(error === "Token authentication failed"){
            return res.status(401).json(create.error(`notes`,`Token invalid or expired`,4));
         }else if(error === "no permission"){
            return res.status(401).json(create.error(`notes`,`Unable to modify other user information`,"w3-2"));
         }else if(error.affectedRows === 0){
            return res.status(400).json(create.error(`notes`,`Invalid ID`,"w3-3"));
         }else if(error === "DB No results"){ // 회원이 노트를 소유중이 아닐때
            return res.status(400).json(create.error(`notes`,`Invalid ID`,"w3-4"));
         }else{
            return res.status(404);
         }
    });
}
// DELETE FROM `babelfish`.`word` WHERE (`id` = '1' AND `note_id` = 'asd');
module.exports.delete = (req, res, next) => {
   // TODO
    // 1. data_verifications -> params.userid, noteid
    // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
    // 3-1. DB query 유저 아이디와 노트 아이디가 일치하는지
    // 3-2. DB query 삽입 진행
    // 4. respoens
    // 5. error catch

    const data_verification = () => Promise.all([data_verifications.check_id({userid:req.params.userid}),data_verifications.check_number({number:req.params.noteid}),data_verifications.check_number({number:req.params.wordid})]);
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
        // 3-1. DB query 유저 아이디, 노트아이디, 단어번호가 일치하는지
        const sql = `
        SELECT babelfish.word.id
        FROM babelfish.word, babelfish.note
        WHERE(babelfish.word.note_id=babelfish.note.id AND babelfish.note.member_email='${req.params.userid}' AND babelfish.note.id = '${req.params.noteid}' AND babelfish.word.id='${req.params.wordid}')
        `;
        return db.get_query(sql);
    })
    .then(()=>{
        // 3-2. DB query 삽입 진행
        const sql = `DELETE FROM \`babelfish\`.\`word\` WHERE (\`id\` = '${req.params.wordid}' AND \`note_id\` = '${req.params.noteid}')`;
        return db.insert_query(sql);
    })
    .then(()=>{
        // 4. respoens
        return res.status(200).json(create.success("Words","Delete to Word successful","w4-5"));
    })
    .catch((error)=>{
        // 5. error catch
        console.log("error :: DELETE/api/users/{useremail}/notes/{noteid}/words/{wordid} 단어 삭제");
        console.log(error);
        console.log("-------------------------------------------------");
        if(error === "Value verification failed"){
            return res.status(400).json(create.error(`notes`,`Invalid ID`,"w4-1"));
         }else if(error === "Token authentication failed"){
            return res.status(401).json(create.error(`notes`,`Token invalid or expired`,4));
         }else if(error === "no permission"){
            return res.status(401).json(create.error(`notes`,`Unable to modify other user information`,"w4-2"));
         }else if(error.affectedRows === 0){
            return res.status(400).json(create.error(`notes`,`Invalid ID`,"w4-3"));
         }else if(error === "DB No results"){ // 회원이 노트를 소유중이 아닐때
            return res.status(400).json(create.error(`notes`,`Invalid ID`,"w4-4"));
         }else{
            return res.status(404);
         }
    });
}
// UPDATE `babelfish`.`word` SET `Wrong_Count` = `Wrong_Count`+1 WHERE (`id` = '1' AND `note_id` = 'asd');
module.exports.wrong_count = (req, res, next) => {
   // TODO
    // 1. data_verifications -> params.userid, noteid
    // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
    // 3-1. DB query 유저 아이디와 노트 아이디가 일치하는지
    // 3-2. DB query 삽입 진행
    // 4. respoens
    // 5. error catch
    const data_verification = () => Promise.all([data_verifications.check_id({userid:req.params.userid}),data_verifications.check_number({number:req.params.noteid}),data_verifications.check_number({number:req.params.wordid})]);
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
        // 3-1. DB query 유저 아이디, 노트아이디, 단어번호가 일치하는지
        const sql = `
        SELECT babelfish.word.id
        FROM babelfish.word, babelfish.note
        WHERE(babelfish.word.note_id=babelfish.note.id AND babelfish.note.member_email='${req.params.userid}' AND babelfish.note.id = '${req.params.noteid}' AND babelfish.word.id='${req.params.wordid}')
        `;
        console.log(sql);
        return db.get_query(sql);
    })
    .then(()=>{
        // 3-2. DB query 삽입 진행
        const sql = `UPDATE \`babelfish\`.\`word\` SET \`Wrong_Count\` = \`Wrong_Count\`+1 WHERE (\`id\` = '${req.params.wordid}' AND \`note_id\` = '${req.params.noteid}')`;
        console.log(sql);
        return db.insert_query(sql);
    })
    .then(()=>{
        // 4. respoens
        return res.status(200).json(create.success("Words","Add Word wrong_count","w5-5"));
    })
    .catch((error)=>{
        // 5. error catch
        console.log("error :: PUT/api/users/{useremail}/notes/{noteid}/words/{wordid}/wrong-count 단어 틀린 횟수 설정");
        console.log(error);
        console.log("-------------------------------------------------");
        if(error === "Value verification failed"){
            return res.status(400).json(create.error(`notes`,`Invalid ID`,"w5-1"));
         }else if(error === "Token authentication failed"){
            return res.status(401).json(create.error(`notes`,`Token invalid or expired`,4));
         }else if(error === "no permission"){
            return res.status(401).json(create.error(`notes`,`Unable to modify other user information`,"w5-2"));
         }else if(error.affectedRows === 0){
            return res.status(400).json(create.error(`notes`,`Invalid ID`,"w5-3"));
         }else if(error === "DB No results"){ // 회원이 노트를 소유중이 아닐때
            return res.status(400).json(create.error(`notes`,`Invalid ID`,"w5-4"));
         }else{
            return res.status(404);
         }
    });
}