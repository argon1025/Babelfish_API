const express = require('express');
const router = express.Router();
const controller = require('./ping.controller');

router.get('/', controller.main); //  ==> /ping

module.exports = router;