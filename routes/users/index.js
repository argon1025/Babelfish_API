const express = require('express');
const router = express.Router();
const controller = require('./users.controller');

// user -> notes 계층
const notes = require('./notes');
router.use('/:userid/notes',notes);

///////////////////////////////////// ==> users
// PUT /api/users 유저 정보 변경
router.put('/:userid', controller.change_information);

// DELETE /api/users 유저 정보 삭제
router.delete('/:userid', controller.delete);
/////////////////////////////////////

module.exports = router;