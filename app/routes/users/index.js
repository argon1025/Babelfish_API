const express = require('express');
const router = express.Router();
const user_controller = require('./users.controller');
const notes_controller = require('./notes/notes.controller');
const words_controller = require('./notes/words/words.controller');
///////////////////////////////////// ==> users
// PUT /api/users 유저 정보 변경
router.put('/:userid', user_controller.change_information);

// DELETE /api/users 유저 정보 삭제
router.delete('/:userid', user_controller.delete);
/////////////////////////////////////

///////////////////////////////////// ==> notes
// GET/api/users/{useremail}/notes 유저 단어장 리스트
router.get('/:userid/notes',notes_controller.list);

//POST/api/users/{useremail}/notes 유저 단어장 추가
router.post('/:userid/notes',notes_controller.create);

//PUT/api/users/{useremail}/notes/{noteid} 유저 단어장 수정
router.put('/:userid/notes/:noteid',notes_controller.change_information);

//DELETE/api/users/{useremail}/notes/{noteid} 유저 단어장 삭제
router.delete('/:userid/notes/:noteid',notes_controller.delete);

//PUT/api/users/{useremail}/notes/{noteid}/updated-date 단어장 학습상태 갱신
router.put('/:userid/notes/:noteid/updated-date',notes_controller.updated_date);
/////////////////////////////////////

///////////////////////////////////// ==> words
// GET/api/users/{useremail}/notes/{noteid}/words 단어장에 단어 리스트
router.get('/:userid/notes/:noteid/words',words_controller.list);

// POST/api/users/{useremail}/notes/{noteid}/words 단어장에 단어 추가
router.post('/:userid/notes/:noteid/words',words_controller.create);

// PUT/api/users/{useremail}/notes/{noteid}/words/{wordid} 단어 수정
router.put('/:userid/notes/:noteid/words/:wordid',words_controller.change_information);

// DELETE/api/users/{useremail}/notes/{noteid}/words/{wordid} 단어 삭제
router.delete('/:userid/notes/:noteid/words/:wordid',words_controller.delete);

// PUT/api/users/{useremail}/notes/{noteid}/words/{wordid}/wrong-count 단어 틀린 횟수 설정
router.put('/:userid/notes/:noteid/words/:wordid/wrong-count',words_controller.wrong_count);

///////////////////////////////////// 
module.exports = router;