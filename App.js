///////////////////////////////////// =====> 모듈 로드
const express = require('express');
const app = express();
const settings = require('./res/settings');

///////////////////////////////////// =====> 라우팅
const indexRouter = require('./routes');
app.use('/api', indexRouter);


/////////////////////////////////////  =====> 앱 실행
app.listen(settings.port, () => {
    console.log(`listening at http://localhost:${settings.port}`)
  })