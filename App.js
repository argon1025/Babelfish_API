///////////////////////////////////// =====> 모듈 로드
const express = require('express');
const app = express();

///////////////////////////////////// =====> 환경설정
const port = 80;

///////////////////////////////////// =====> 라우팅
const indexRouter = require('./routes');
app.use('/', indexRouter);


/////////////////////////////////////  =====> 앱 실행
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })