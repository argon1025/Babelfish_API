# 1. BabelFish_REST API

BabelFish 프로젝트
- Node.js
- REST API
- Mysql

# 2. 엔드포인트 구성
```
POST /token/join
POST /token
PUT /api/users/:{useremail}
DELETE /api/users/:{useremail}
GET/api/users/{useremail}/notes
POST/api/users/{useremail}/notes
PUT/api/users/{useremail}/notes/{noteid}
DELETE/api/users/{useremail}/notes/{noteid}
PUT/api/users/{useremail}/notes/{noteid}/updated-date
GET/api/users/{useremail}/notes/{noteid}/words
POST/api/users/{useremail}/notes/{noteid}/words
PUT/api/users/{useremail}/notes/{noteid}/words/{wordid}
DELETE/api/users/{useremail}/notes/{noteid}/words/{wordid}
PUT/api/users/{useremail}/notes/{noteid}/words/{wordid}/wrong-count
```
모든 입력데이터는 입력값 검증과정을 거칩니다 각 입력데이터별 제한기준은 [데이터 검증](#3-데이터-검증)파트에서 확인할 수 있습니다.
http-status-code로 상태를 반환하며 추가로 모든 결과데이터는 다국어화를 위한 msg_code를 포함합니다 [응답코드](#4-응답코드)파트에서 확인할 수 있습니다.
## 2-1 Token
토큰에 관련된 Endpoint 입니다
### POST /token/join
``` json
{
"userid": "test1@naver.com",
"name": "name",
"password" : "test"
}
```
유저를 등록합니다 Body 데이터에는 위와 같은 `Json` 정보가 필요합니다.
``` json
{
    "error": "false",
    "msg": "Join Successful",
    "msg_code": "3"
}
```
작업을 성공적으로 수행하면 메시지와 메시지 코드를 반환합니다

### POST /token
``` json
{
"userid": "test1@naver.com",
"password" : "test"
}
```
유저 인증을 진행합니다 Body 데이터에는 위와같은 `Json` 정보가 필요합니다.
``` json
{
    "token": "ThisIsToKeN",
    "error": "false",
    "msg": "Login Successful",
    "msg_code": "3"
}
```
작업을 성공적으로 수행하면 토큰, 메시지, 메시지 코드를 반환합니다

## 2-2 Users
이 엔드포인트는 기본적으로 헤더에 `token` 데이터가 필요합니다

### PUT /api/users/:{useremail}
``` json
{
"name" : "name",
"password" : "testpassword"
}
```
등록된 유저정보를 변경합니다 Body 데이터에는 위와같은 `Json` 정보가 필요합니다.

``` json
{
    "error": "false",
    "location": "user",
    "msg": "user Information change successful",
    "msg_code": "10"
}
```
작업을 성공적으로 수행하면 메시지와 메시지 코드를 반환합니다
### DELETE /api/users/:{useremail}
등록된 유저정보를 삭제합니다 Body 데이터는 포함하지 않습니다
``` json
{
    "error": "false",
    "location": "user",
    "msg": "user Information delete successful",
    "msg_code": "13"
}
```
작업을 성공적으로 수행하면 메시지와 메시지 코드를 반환합니다

## 2-3 Notes
이 엔드포인트는 기본적으로 헤더에 `token` 데이터가 필요합니다
### GET/api/users/{useremail}/notes
유저가 생성한 단어장 리스트를 요청합니다 Body 데이터는 포함하지 않습니다
``` json
{
    "error": "false",
    "location": "Note",
    "msg": "User Note Information Load Successfully",
    "msg_code": "13",
    "data": [
        {
            "id": 6,
            "member_email": "test12234@naver.com",
            "name": "단어장1",
            "Learning_Day": "1997-10-24T15:00:00.000Z",
            "Learning_Count": 0
        },
        {
            "id": 7,
            "member_email": "test12234@naver.com",
            "name": "단어장2",
            "Learning_Day": "1997-10-24T15:00:00.000Z",
            "Learning_Count": 0
        }
    ]
}
```
작업을 성공적으로 수행하면 메시지, 메시지 코드, 데이터를 반환합니다
데이터에는 다음과같은 정보를 포함합니다
 - `id` : 단어장 id
 - `member_email` : 회원 아이디
 - `name` : 단어장 이름
 - `Learning_Day` : 마지막 학습일
 - `Learning_Count` : 학습완료 횟수

### POST/api/users/{useremail}/notes
``` json
{
    "notename": "단어장1"
}
```
단어장을 생성합니다 Body 데이터에는 위와같은 `Json` 정보가 필요합니다.
``` json
{
    "error": "false",
    "location": "notes",
    "msg": "Create user note successful",
    "msg_code": "20"
}
```
작업을 성공적으로 수행하면 메시지와 메시지 코드를 반환합니다
### PUT/api/users/{useremail}/notes/{noteid}
``` json
{
    "notename": "단어장1"
}
```
단어장을 수정합니다 Body 데이터에는 위와같은 `Json` 정보가 필요합니다.
``` json
{
    "error": "false",
    "location": "notes",
    "msg": "Create user note successful",
    "msg_code": "20"
}
```
작업을 성공적으로 수행하면 메시지와 메시지 코드를 반환합니다

### DELETE/api/users/{useremail}/notes/{noteid}
단어장을 삭제합니다 Body 데이터는 포함하지 않습니다
``` json
{
    "error": "false",
    "location": "notes",
    "msg": "Delete note successful",
    "msg_code": "28"
}
```
작업을 성공적으로 수행하면 메시지와 메시지 코드를 반환합니다
### PUT/api/users/{useremail}/notes/{noteid}/updated-date
단어장 학습상태를 갱신합니다 Body 데이터는 포함하지 않습니다
``` json
{
    "error": "false",
    "location": "notes",
    "msg": "note updated successful",
    "msg_code": "24"
}
```
작업을 성공적으로 수행하면 메시지와 메시지 코드를 반환합니다
이 작업을 수행하면 다음 단어장 데이터가 수정됩니다
 - `Learning_Day` = `Today()`
 - `Learning_Count` = `Learning_Count+1`

## Words
이 엔드포인트는 기본적으로 헤더에 `token` 데이터가 필요합니다

### GET/api/users/{useremail}/notes/{noteid}/words
유저의 단어장 리스트를 요청합니다
Body 데이터는 포함하지 않습니다
``` json
{
    "error": "false",
    "location": "Words",
    "msg": "Load Successfully",
    "msg_code": "36",
    "data": [
        {
            "id": 6,
            "note_id": 3,
            "Word_Title": "谷",
            "Mean1": "계곡곡",
            "Mean2": "こく",
            "Wrong_Count": 0,
        }
    ]
}
```
작업을 성공적으로 수행하면 메시지, 메시지 코드, 데이터를 반환합니다
데이터에는 다음과같은 정보를 포함합니다
 - `id` : 단어 id
 - `note_id` : 속한 단어장id
 - `Word_Title` : 단어
 - `Mean1` : 단어 뜻 1
 - `Mean2` : 단어 뜻 2
 - `Wrong_Count` : 오답 횟수

### POST/api/users/{useremail}/notes/{noteid}/words
``` json
{
    "title": "",
    "mean1": "",
    "mean2": ""
}
```
단어를 추가합니다
Body 데이터에는 위와같은 `Json` 정보가 필요합니다.
``` json
{
    "error": "false",
    "location": "Words",
    "msg": "Word Created successful",
    "msg_code": "40"
}
```
작업을 성공적으로 수행하면 메시지, 메시지 코드, 데이터를 반환합니다

### PUT/api/users/{useremail}/notes/{noteid}/words/{wordid}
``` json
{
    "title": "",
    "mean1": "",
    "mean2": ""
}
```
등록된 단어를 수정합니다
Body 데이터에는 위와같은 `Json` 정보가 필요합니다.
``` json
{
    "error": "false",
    "location": "Words",
    "msg": "Word Information Change successful",
    "msg_code": "44"
}
```
### DELETE/api/users/{useremail}/notes/{noteid}/words/{wordid}
등록된 단어를 삭제합니다
Body 데이터는 포함하지 않습니다
``` json
{
    "error": "false",
    "location": "Words",
    "msg": "Word Delete successful",
    "msg_code": "48"
}
```
### PUT/api/users/{useremail}/notes/{noteid}/words/{wordid}/wrong-count
단어 오답 횟수를 수정합니다
Body 데이터는 포함하지 않습니다
``` json
{
    "error": "false",
    "location": "Words",
    "msg": "Word Delete successful",
    "msg_code": "52"
}
```
작업을 성공적으로 수행하면 메시지와 메시지 코드를 반환합니다
이 작업을 수행하면 다음 단어 데이터가 수정됩니다
 - `Wrong_Count` = `Wrong_Count+1`

# 3. 데이터 검증
서버에서 모든 입력값에대한 검증과정을 진행합니다 각 데이터별 검증 기준은 아래와 같습니다

- userid
 - `Length.min` => `1`
 - `Length.max` => `49`
 - `Type` => `Email`

</br>

- useremail
 - `Length.min` => `1`
 - `Length.max` => `49`
 - `Type` => `Email`

</br>

- password
 - `Length.min` => `5`
 - `Length.max` => `31`
 - `Type` => `alphabet`, `number`

</br>

- name
 - `Length.min` => `1`
 - `Length.max` => `10`
 - `Type` => `alphabet`, `number`, `한글`, `Spacebar`

</br>

- notename
 - `Length.min` => `1`
 - `Length.max` => `11`
 - `Type` => `alphabet`, `number`, `한글`, `Spacebar`

</br>

- noteid, wordid
 - `Type` => `number`

</br>

- title, mean1, mean2
 - `Length.min` => `1`
 - `Length.max` => `30`
 - `Type` => `alphabet`, `number`, `漢字`, `ひらがな`, `カタカナ`, `한글`, `Spacebar`

</br>

# 4. 응답코드
기본적으로 http-status-code로 상태를 반환 하지만
앱 제작시 다국어 지원을 보조하기위해 메시지 코드를 반환합니다

|msg_code|description|Location|
|:-----:|------|------|
|t1|데이터 검증에 실패했습니다|POST/token|
|t2|등록된 회원이 아닙니다|POST/token|
|t3|회원 인증에 성공했습니다|POST/token|
|4|토큰데이터가 올바르지 않습니다|everywhere|
|t5|데이터 검증에 실패했습니다|POST/token/join|
|t6|이미 가입된 계정입니다|POST/token/join|
|t7|회원등록 되었습니다|POST/token/join|
|u1|데이터 검증에 실패했습니다|PUT /api/users/:{useremail}|
|u2|다른 사용자의 정보를 수정할 수 없습니다|PUT /api/users/:{useremail}|
|u3|유저 정보를 변경했습니다|PUT /api/users/:{useremail}|
|u4|데이터 검증에 실패했습니다|DELETE /api/users/:{useremail}|
|u5|다른 사용자의 정보를 삭제할 수 없습니다|DELETE /api/users/:{useremail}|
|u6|존재하지 않거나 이미 삭제된 유저 입니다|DELETE /api/users/:{useremail}|
|u7|유저 정보를 삭제했습니다|DELETE /api/users/:{useremail}|
|n1-1|데이터 검증에 실패했습니다|GET/api/users/{useremail}/notes|
|n1-2|다른 사용자의 단어장 정보를 열람할 수 없습니다|GET/api/users/{useremail}/notes|
|n1-3|사용자에 등록된 단어장이 없어 응답할 데이터가 없습니다|GET/api/users/{useremail}/notes|
|n1-4|유저 단어장 리스트를 정상적으로 반환 했습니다|GET/api/users/{useremail}/notes|
|n2-1|데이터 검증에 실패했습니다|POST/api/users/{useremail}/notes|
|n2-2|다른 사용자의 단어장을 추가할 수 없습니다|POST/api/users/{useremail}/notes|
|n2-3|데이터베이스 에러로 단어장 등록에 실패했습니다|POST/api/users/{useremail}/notes|
|n2-4|단어장을 등록했습니다|POST/api/users/{useremail}/notes|
|n3-1|데이터 검증에 실패했습니다|PUT/api/users/{useremail}/notes/{noteid}|
|n3-2|다른 사용자의 단어장을 수정할 수 없습니다|PUT/api/users/{useremail}/notes/{noteid}|
|n3-3|변경할 사항이 없거나 데이터베이스 에러로 수정에 실패했습니다|PUT/api/users/{useremail}/notes/{noteid}|
|n3-4|단어장 정보를 수정했습니다|PUT/api/users/{useremail}/notes/{noteid}|
|n4-1|데이터 검증에 실패했습니다|DELETE/api/users/{useremail}/notes/{noteid}|
|n4-2|다른 사용자의 단어장을 수정할 수 없습니다|DELETE/api/users/{useremail}/notes/{noteid}|
|n4-3|변경할 사항이 없거나 데이터베이스 에러로 삭제에 실패했습니다|DELETE/api/users/{useremail}/notes/{noteid}|
|n4-4|단어장을 삭제했습니다|DELETE/api/users/{useremail}/notes/{noteid}|
|n5-1|데이터 검증에 실패했습니다|PUT/api/users/{useremail}/notes/{noteid}/updated-date|
|n5-2|다른 사용자의 단어장을 수정할 수 없습니다|PUT/api/users/{useremail}/notes/{noteid}/updated-date|
|n5-3|변경할 사항이 없거나 데이터베이스 에러로 수정에 실패했습니다|PUT/api/users/{useremail}/notes/{noteid}/updated-date|
|n5-4|단어장 학습일자를 갱신했습니다|PUT/api/users/{useremail}/notes/{noteid}/updated-date|
|w1-1|데이터 검증에 실패했습니다|GET/api/users/{useremail}/notes/{noteid}/words|
|w1-2|다른사용자의 단어리스트를 열람할 수 없습니다|GET/api/users/{useremail}/notes/{noteid}/words|
|w1-3|정상적으로 작업을 수행했지만 등록된 단어가 업습니다|GET/api/users/{useremail}/notes/{noteid}/words|
|w1-4|정상적으로 작업을 수행 했습니다|GET/api/users/{useremail}/notes/{noteid}/words|
|w2-1|데이터 검증에 실패했습니다|POST/api/users/{useremail}/notes/{noteid}/words|
|w2-2|파라메터와 토큰의 정보가 일치하지 않습니다|POST/api/users/{useremail}/notes/{noteid}/words|
|w2-3|변경할 사항이 없거나 데이터베이스 에러로 추가에 실패했습니다|POST/api/users/{useremail}/notes/{noteid}/words|
|w2-4|다른 사용자의 단어장또는 존재하지 않는 단어장입니다|POST/api/users/{useremail}/notes/{noteid}/words|
|w2-5|단어를 등록 했습니다|POST/api/users/{useremail}/notes/{noteid}/words|
|w3-1|데이터 검증에 실패했습니다|PUT/api/users/{useremail}/notes/{noteid}/words/{wordid}|
|w3-2|파라메터와 토큰의 정보가 일치하지 않습니다|PUT/api/users/{useremail}/notes/{noteid}/words/{wordid}|
|w3-3|변경할 사항이 없거나 데이터베이스 에러로 추가에 실패했습니다|PUT/api/users/{useremail}/notes/{noteid}/words/{wordid}|
|w3-4|다른 사용자의 단어장또는 존재하지 않는 단어장입니다|PUT/api/users/{useremail}/notes/{noteid}/words/{wordid}|
|w3-5|단어를 수정했습니다|PUT/api/users/{useremail}/notes/{noteid}/words/{wordid}|
|w4-1|데이터 검증에 실패했습니다|DELETE/api/users/{useremail}/notes/{noteid}/words/{wordid} |
|w4-2|파라메터와 토큰의 정보가 일치하지 않습니다|DELETE/api/users/{useremail}/notes/{noteid}/words/{wordid} |
|w4-3|변경할 사항이 없거나 데이터베이스 에러로 삭제에 실패했습니다|DELETE/api/users/{useremail}/notes/{noteid}/words/{wordid} |
|w4-4|다른 사용자의 단어장또는 존재하지 않는 단어장입니다|DELETE/api/users/{useremail}/notes/{noteid}/words/{wordid} |
|w4-5|단어를 삭제했습니다|DELETE/api/users/{useremail}/notes/{noteid}/words/{wordid} |
|w5-1|데이터 검증에 실패했습니다|PUT/api/users/{useremail}/notes/{noteid}/words/{wordid}/wrong-count|
|w5-2|파라메터와 토큰의 정보가 일치하지 않습니다|PUT/api/users/{useremail}/notes/{noteid}/words/{wordid}/wrong-count|
|w5-3|변경할 사항이 없거나 데이터베이스 에러로 수정에 실패했습니다|PUT/api/users/{useremail}/notes/{noteid}/words/{wordid}/wrong-count|
|w5-4|다른 사용자의 단어장또는 존재하지 않는 단어장입니다|PUT/api/users/{useremail}/notes/{noteid}/words/{wordid}/wrong-count|
|w5-5|정상적으로 작업을 수행 했습니다|PUT/api/users/{useremail}/notes/{noteid}/words/{wordid}/wrong-count|
