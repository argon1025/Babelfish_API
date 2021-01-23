const express = require('express');
const router = express.Router();
const user_controller = require('./users.controller');
const note_controller = require('./notes/notes.controller');

///////////////////////////////////// ==> users
// PUT /api/users 유저 정보 변경
router.put('/:userid', user_controller.change_information);

// DELETE /api/users 유저 정보 삭제
router.delete('/:userid', user_controller.delete);
/////////////////////////////////////

///////////////////////////////////// ==> notes
// GET/api/users/{useremail}/notes 유저 단어장 리스트
router.get('/:userid/notes',note_controller.list);

//POST/api/users/{useremail}/notes 유저 단어장 추가
router.post('/:userid/notes',note_controller.create);

//PUT/api/users/{useremail}/notes/{noteid} 유저 단어장 수정
router.put('/:userid/notes/:noteid',note_controller.change_information);

//DELETE/api/users/{useremail}/notes/{noteid} 유저 단어장 삭제
router.delete('/:userid/notes/:noteid',note_controller.delete);

//PUT/api/users/{useremail}/notes/{noteid}/updated-date 단어장 학습상태 갱신
router.put('/:userid/notes/:noteid/updated-date',note_controller.updated_date);
/////////////////////////////////////

module.exports = router;