///////////////////////////////////// =====> 모듈 로드
const express = require('express');
const router = express.Router();

///////////////////////////////////// =====> 라우팅
const ping = require('./ping');
router.use('/ping', ping);

module.exports = router;