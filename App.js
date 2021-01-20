///////////////////////////////////// =====> 모듈 로드
const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const settings = require('./res/settings');
/////////////////////////////////////


///////////////////////////////////// =====> 바디파서
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
/////////////////////////////////////


///////////////////////////////////// =====> 라우팅
const indexRouter = require('./routes');
app.use('/api', indexRouter);
/////////////////////////////////////


///////////////////////////////////// =====> 에러 핸들링

app.use(logHandler);
app.use(errorHandler);

// logger middleware
function logHandler(err, req, res, next) {
  console.error('[' + new Date() + ']\n' + err.stack);
  next(err);
}

// error handler middleware
function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message || 'Error!!');
}
/////////////////////////////////////


/////////////////////////////////////  =====> 앱 실행
app.listen(settings.port, () => {
    console.log(`listening at http://localhost:${settings.port}`)
  })
/////////////////////////////////////