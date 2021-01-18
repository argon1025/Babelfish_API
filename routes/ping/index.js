const express = require('express');
const router = express.Router();
const controller = require('./ping.controller');

/* GET home page. */
router.get('/', controller.main);

module.exports = router;