const data_verifications = require('../../res/DataVerification'); //값 검증 모듈
const create = require('../../res/Respons_Json'); // res_json생성 모듈 
const db = require('../../res/sync_mysql'); // sql 모듈
const token = require('../../res/JWT'); //토큰 인증모듈

// INSERT INTO `babelfish`.`member` VALUES('id','name','password');
module.exports.user_create = (req, res, next) => {
    // TODO
    // 1. data_verifications -> id,name,password
    // 2. DB query
    // 3. respoens
    // 4. error catch
    const data_verification = () => Promise.all([data_verifications.check_id({userid:req.body.userid}),data_verifications.check_name({name:req.body.name}),data_verifications.check_password({password:req.body.password})])

    // 1. data_verifications -> id,name,password
    data_verification()
    .then(()=>{
        // 2. DB query
        const sql = `INSERT INTO \`babelfish\`.\`member\` (\`email\`,\`name\`,\`password\`) VALUES('${req.body.userid}','${req.body.name}','${req.body.password}');`
        return db.insert_query(sql);
    })
    .then(()=>{
        return res.status(200).json(create.success("user","join Successful","7"));
    })
    .catch((error)=>{
        if(error === "Value verification failed"){
            return res.status(400).json(create.error(`user`,`Invalid ID or password or name`,5));
         }else if(error.code == 'ER_DUP_ENTRY'){
            return res.status(401).json(create.error(`user`,`This ID is already registered`,6));
         }else{
            return res.status(404);
         }
    });
}

// UPDATE `babelfish`.`member` SET `name` = 'name', `password` = 'pass' WHERE (`email` = 'id');
module.exports.change_information = (req, res, next) => {
    res.send(`change_user_information, ${req.params.userid} ${req.body.name}`);
}

// DELETE FROM `babelfish`.`member` WHERE (`email` = 'id'');
module.exports.delete = (req, res, next) => {
    res.send('user_delete');
}