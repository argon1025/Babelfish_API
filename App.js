///////////////////////////////////// =====> 모듈 로드
const express = require('express'); //express 프레임워크 로드
const app = express();
var bodyParser = require('body-parser'); //파싱 모듈
var cors = require('cors'); // 크로스 도메인 허용

const settings = require('./service/settings'); // 서버 세팅값 로드
const jwt = require('./service/JWT');
const create = require('./service/Respons_Json'); // res_json생성 모듈
const ErrorHandler = require('./service/ErrorHandler'); // 에러 처리 모듈
/////////////////////////////////////


///////////////////////////////////// =====> 모듈 로드
// CORS 설정
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
/////////////////////////////////////


///////////////////////////////////// =====> 토큰 발급 라우팅
const tokenRouter = require('./routes/token');
app.use('/token', tokenRouter);

app.use((req, res, next) =>{
  jwt.verify(req.headers.token)
  .then(()=>{
    console.log("토큰 인증 성공")
    console.log(req.headers.token);
    return next();
  })
  .catch(() => {
    console.log("토큰 인증 만료")
    console.log(req.headers.token);
    return res.status(401).json(create.error(`token`,`Token invalid or expired`,4));
  })
});
///////////////////////////////////// =====> 라우팅
const indexRouter = require('./routes');
app.use('/api', indexRouter);
/////////////////////////////////////

///////////////////////////////////// =====> 오류 처리
app.use(ErrorHandler.test);
/////////////////////////////////////

/////////////////////////////////////  =====> 앱 실행
app.listen(settings.port, () => {
    console.log(`listening at http://localhost:${settings.port}`)
  });
/////////////////////////////////////