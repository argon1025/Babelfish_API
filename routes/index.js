///////////////////////////////////// =====> 모듈 로드
const express = require('express');
const router = express.Router();

///////////////////////////////////// =====> 라우팅
const ping = require('./ping');
router.use('/ping', ping);

const users = require('./users');
router.use('/users',users);
/////////////////////////////////////


module.exports = router;