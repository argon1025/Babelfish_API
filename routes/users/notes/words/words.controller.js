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
        return res.status(200).json(create.success_getdata("words","Words Information Load Successfully",36,data));
    })
    .catch((error)=>{
        // 5. error catch
        console.log("error :: GET/api/users/{useremail}/notes/{noteid}/words 단어장 단어 리스트");
        console.log(error);
        console.log("-------------------------------------------------");
        if(error === "Value verification failed"){
            return res.status(400).json(create.error(`Words`,`Invalid ID`,33));
         }else if(error === "Token authentication failed"){
            return res.status(401).json(create.error(`Words`,`Token invalid or expired`,4));
         }else if(error === "no permission"){
            return res.status(401).json(create.error(`Words`,`Unable to modify other user information`,34));
         }else if(error === "DB No results"){
            return res.status(404).json(create.error(`Words`,`DB No results`,35));
         }else{
            return res.status(404);
         }
    });
}

// INSERT INTO `babelfish`.`word` (`note_id`, `Word_Title`, `Mean1`, `Mean2`) VALUES ('3', 'a', '에이', '에이1');
module.exports.create = (req, res, next) => {
    res.send('word-create');
    // TODO
    // 1. data_verifications -> params.userid, notename, req.body.title, req.body.mean1, req.body.mean2
    // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
    // 3-1. DB query 유저 아이디와 노트 아이디가 일치하는지
    // 3-2. DB query 삽입 진행
    // 4. respoens
    // 5. error catch

    const data_verification = () => Promise.all([data_verifications.check_id({userid:req.params.userid}),data_verifications.check_number({number:req.params.noteid}),data_verifications.check_words({number:req.body.title}),data_verifications.check_words({words:req.body.mean1}),data_verifications.check_words({words:req.body.mean2})]);
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
        SELECT babelfish.word.id
        FROM babelfish.word, babelfish.note
        WHERE(babelfish.word.note_id=babelfish.note.id AND babelfish.note.member_email='${req.params.userid}' AND babelfish.word.note_id = '${req.params.noteid}');
        `;
        return db.insert_query(sql);
    })
    .then(()=>{
        // 3-2. DB query 삽입 진행
        const sql = `INSERT INTO \`babelfish\`.\`word\` (\`note_id\`, \`Word_Title\`, \`Mean1\`, \`Mean2\`) VALUES ('${req.params.noteid}', '${req.body.title}', '${req.body.mean1}', '${req.body.mean2}')`;
        return db.insert_query(sql);
    })
    .then(()=>{
        // 4. respoens
        return res.status(200).json(create.success("Words","Add to Word successful",40));
    })
    .catch((error)=>{
        // 5. error catch
        console.log("error :: POST/api/users/{useremail}/notes/{noteid}/words 단어장에 단어 추가");
        console.log(error);
        console.log("-------------------------------------------------");
        if(error === "Value verification failed"){
            return res.status(400).json(create.error(`notes`,`Invalid ID`,37));
         }else if(error === "Token authentication failed"){
            return res.status(401).json(create.error(`notes`,`Token invalid or expired`,4));
         }else if(error === "no permission"){
            return res.status(401).json(create.error(`notes`,`Unable to modify other user information`,38));
         }else if(error.affectedRows === 0){
            return res.status(400).json(create.error(`notes`,`Invalid ID`,39));
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

    const data_verification = () => Promise.all([data_verifications.check_id({userid:req.params.userid}),data_verifications.check_number({number:req.params.noteid}),data_verifications.check_words({number:req.body.title}),data_verifications.check_words({words:req.body.mean1}),data_verifications.check_words({words:req.body.mean2})]);
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
        // 3-1. DB query 유저 아이디와 노트 아이디가 일치하는것이 있는지
        const sql = `
        SELECT babelfish.word.id
        FROM babelfish.word, babelfish.note
        WHERE(babelfish.word.note_id=babelfish.note.id AND babelfish.note.member_email='${req.params.userid}' AND babelfish.word.note_id = '${req.params.noteid}');
        `;
        return db.insert_query(sql);
    })
    .then(()=>{
        // 3-2. DB query 삽입 진행
        const sql = `UPDATE \`babelfish\`.\`word\` SET \`Word_Title\` = '${req.body.title}', \`Mean1\` = '${req.body.mean1}', \`Mean2\` = '${req.body.mean2}' WHERE (\`id\` = '${req.params.noteid}')`;
        return db.insert_query(sql);
    })
    .then(()=>{
        // 4. respoens
        return res.status(200).json(create.success("Words","Add to Word successful",44));
    })
    .catch((error)=>{
        // 5. error catch
        console.log("error :: PUT/api/users/{useremail}/notes/{noteid}/words/{wordid} 단어 수정");
        console.log(error);
        console.log("-------------------------------------------------");
        if(error === "Value verification failed"){
            return res.status(400).json(create.error(`notes`,`Invalid ID`,41));
         }else if(error === "Token authentication failed"){
            return res.status(401).json(create.error(`notes`,`Token invalid or expired`,4));
         }else if(error === "no permission"){
            return res.status(401).json(create.error(`notes`,`Unable to modify other user information`,42));
         }else if(error.affectedRows === 0){
            return res.status(400).json(create.error(`notes`,`Invalid ID`,43));
         }else{
            return res.status(404);
         }
    });
}
// DELETE FROM `babelfish`.`word` WHERE (`id` = '1');
module.exports.delete = (req, res, next) => {
    res.send('word-delete');
}
// UPDATE `babelfish`.`word` SET `Wrong_Count` = '3' WHERE (`id` = '1');
module.exports.wrong_count = (req, res, next) => {
    res.send('word-wrong_count');
}