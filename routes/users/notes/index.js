const express = require('express');
const router = express.Router();
const controller = require('./notes.controller');

// notes -> words 계층
const words = require('./words');
router.use('/:noteid/words',words);

///////////////////////////////////// ==> notes
// GET/api/users/{useremail}/notes 유저 단어장 리스트
router.get('/',controller.list);

//POST/api/users/{useremail}/notes 유저 단어장 추가
router.post('/',controller.create);

//PUT/api/users/{useremail}/notes/{noteid} 유저 단어장 수정
router.put('/:noteid',controller.change_information);

//DELETE/api/users/{useremail}/notes/{noteid} 유저 단어장 삭제
router.delete('/:noteid',controller.delete);

//PUT/api/users/{useremail}/notes/{noteid}/updated-date 단어장 학습상태 갱신
router.put('/:noteid/updated-date',controller.updated_date);
/////////////////////////////////////

module.exports = router;