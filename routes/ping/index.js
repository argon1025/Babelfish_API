const express = require('express');
const router = express.Router();
const controller = require('./ping.controller');

router.post('/', controller.main); //  ==> /ping

module.exports = router;