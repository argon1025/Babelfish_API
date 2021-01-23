const data_verifications = require('../../../res/DataVerification'); //값 검증 모듈
const create = require('../../../res/Respons_Json'); // res_json생성 모듈 
const db = require('../../../res/sync_mysql'); // sql 모듈
const jwt = require('../../../res/JWT'); //토큰 인증모듈

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
        return res.status(200).json(create.success_getdata("Note","User Note Information Load Successfully",13,data));
    })
    .catch((error)=>{
        // 5. error catch
        console.log("error :: GET/api/users/{useremail}/notes 유저 단어장 리스트");
        console.log(error);
        console.log("-------------------------------------------------");
        if(error === "Value verification failed"){
            return res.status(400).json(create.error(`user`,`Invalid ID`,12));
         }else if(error === "Token authentication failed"){
            return res.status(401).json(create.error(`user`,`Token invalid or expired`,4));
         }else if(error === "no permission"){
            return res.status(401).json(create.error(`user`,`Unable to modify other user information`,15));
         }else if(error === "DB No results"){
            return res.status(404).json(create.error(`token`,`DB No results`,16));
         }else{
            return res.status(404);
         }
    });
}

// INSERT INTO `babelfish`.`note` (`member_email`, `name`, `Learning_Day`) VALUES ('test12@naver.com', '테스트단어장', '2020.01.01');
module.exports.create = (req, res, next) => {
    res.send('note-create');
    // TODO
    // 1. data_verifications -> params.userid, notename
    // 2. params.userid = token.userid 토큰과 요청한 아이디가 같은지
    // 3. DB query
    // 4. respoens
    // 5. error catch
}

// UPDATE `babelfish`.`note` SET `name` = '테스트단어장3' WHERE (`id` = '5');
module.exports.change_information = (req, res, next) => {
    res.send('note-change_information');
}

// DELETE FROM `babelfish`.`note` WHERE (`id` = '5');
module.exports.delete = (req, res, next) => {
    res.send('note-delete');
}

// UPDATE `babelfish`.`note` SET `Learning_Day` = '2020-01-02' WHERE (`id` = '4');
module.exports.updated_date = (req, res, next) => {
    res.send('note-updated-date');
}