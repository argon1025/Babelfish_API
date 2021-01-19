const express = require('express');
const router = express.Router();
const controller = require('./words.controller');

///////////////////////////////////// ==> words
// GET/api/users/{useremail}/notes/{noteid}/words 단어장에 단어 리스트
router.get('/',controller.list);

// POST/api/users/{useremail}/notes/{noteid}/words 단어장에 단어 추가
router.post('/',controller.create);

// PUT/api/users/{useremail}/notes/{noteid}/words/{wordid} 단어 수정
router.put('/:wordid',controller.change_information);

// DELETE/api/users/{useremail}/notes/{noteid}/words/{wordid} 단어 삭제
router.delete('/:wordid',controller.delete);

// PUT/api/users/{useremail}/notes/{noteid}/words/{wordid}/wrong-count 단어 틀린 횟수 설정
router.put('/:wordid/wrong-count',controller.wrong_count);

///////////////////////////////////// 

module.exports = router;