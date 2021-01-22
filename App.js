///////////////////////////////////// =====> 모듈 로드
const express = require('express'); //express 프레임워크 로드
const app = express();
var bodyParser = require('body-parser'); //파싱 모듈

const settings = require('./res/settings'); // 서버 세팅값 로드
const jwt = require('./res/JWT');
const create = require('./res/Respons_Json'); // res_json생성 모듈 
/////////////////////////////////////


///////////////////////////////////// =====> 모듈 로드
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
/////////////////////////////////////


///////////////////////////////////// =====> 토큰 발급 라우팅
const tokenRouter = require('./routes/token');
app.use('/token', tokenRouter);

app.use((req, res, next) =>{
  jwt.verify(req.body['token'])
  .then(()=>{
    return next();
  })
  .catch(() => {
    return res.status(401).json(create.error(`token`,`Token invalid or expired`,4));
  })
})
///////////////////////////////////// =====> 라우팅
const indexRouter = require('./routes');
app.use('/api', indexRouter);
/////////////////////////////////////


/////////////////////////////////////  =====> 앱 실행
app.listen(settings.port, () => {
    console.log(`listening at http://localhost:${settings.port}`)
  });
/////////////////////////////////////