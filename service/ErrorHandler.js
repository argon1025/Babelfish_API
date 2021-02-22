const ResponseCreator = require('./ResponseCreator'); //Json 응답 파일 생성

class ErrorHandler {
    constructor() {
        this.ERROR_TABLE = {
            '/:userid': {
                'PUT': {
                    'Value verification failed': { 'msgCode': 'u1', 'msg': 'Invalid ID or password or name!', 'code': '400' },
                    'Token authentication failed': { 'msgCode': '4', 'msg': 'Token invalid or expired', 'code': '401' },
                    'no permission': { 'msgCode': 'u2', 'msg': 'Unable to modify other user information', 'code': '401' }
                },
                'DELETE': {
                    'Value verification failed': { 'msgCode': 'u4', 'msg': 'Invalid ID', 'code': '400' },
                    'Token authentication failed': { 'msgCode': '4', 'msg': 'Token invalid or expired', 'code': '401' },
                    'no permission': { 'msgCode': 'u5', 'msg': 'Unable to modify other user information', 'code': '401' },
                    'no affectedRows': { 'msgCode': 'u6', 'msg': 'Invalid ID', 'code': '400' }
                }
            },
            '/:userid/notes': {
                'GET': {
                    'Value verification failed': { 'msgCode': 'n1-1', 'msg': 'Invalid ID or password or name!', 'code': '400' },
                    'Token authentication failed': { 'msgCode': '4', 'msg': 'Token invalid or expired', 'code': '401' },
                    'no permission': { 'msgCode': 'n1-2', 'msg': 'Unable to modify other user information', 'code': '401' },
                    'DB No results': { 'msgCode': 'n1-3', 'msg': 'DB No results', 'code': '404' }
                },
                'POST': {
                    'Value verification failed': { 'msgCode': 'n2-1', 'msg': 'Invalid ID', 'code': '400' },
                    'Token authentication failed': { 'msgCode': '4', 'msg': 'Token invalid or expired', 'code': '401' },
                    'no permission': { 'msgCode': 'n2-2', 'msg': 'Unable to modify other user information', 'code': '401' },
                    'no affectedRows': { 'msgCode': 'n2-3', 'msg': 'DB No results', 'code': '400' },
                    'Over Max Notes': { 'msgCode': 'n2-4', 'msg': 'Over Max Notes', 'code': '401' }
                }
            },
            '/:userid/notes/:noteid': {
                'PUT': {
                    'Value verification failed': { 'msgCode': 'n3-1', 'msg': 'Invalid ID or password or name!', 'code': '400' },
                    'Token authentication failed': { 'msgCode': '4', 'msg': 'Token invalid or expired', 'code': '401' },
                    'no permission': { 'msgCode': 'n3-2', 'msg': 'Unable to modify other user information', 'code': '401' },
                    'no affectedRows': { 'msgCode': 'n3-3', 'msg': 'DB No results', 'code': '400' }
                },
                'DELETE': {
                    'Value verification failed': { 'msgCode': 'n4-1', 'msg': 'Invalid ID', 'code': '400' },
                    'Token authentication failed': { 'msgCode': '4', 'msg': 'Token invalid or expired', 'code': '401' },
                    'no permission': { 'msgCode': 'n4-2', 'msg': 'Unable to modify other user information', 'code': '401' },
                    'no affectedRows': { 'msgCode': 'n4-3', 'msg': 'DB No results', 'code': '400' }
                }
            },
            '/:userid/notes/:noteid/updated-date': {
                'PUT': {
                    'Value verification failed': { 'msgCode': 'n5-1', 'msg': 'Invalid ID or password or name!', 'code': '400' },
                    'Token authentication failed': { 'msgCode': '4', 'msg': 'Token invalid or expired', 'code': '401' },
                    'no permission': { 'msgCode': 'n5-2', 'msg': 'Unable to modify other user information', 'code': '401' },
                    'no affectedRows': { 'msgCode': 'n5-3', 'msg': 'DB No results', 'code': '400' }
                }
            },
            '/:userid/notes/:noteid/words': {
                'GET': {
                    'Value verification failed': { 'msgCode': 'w1-1', 'msg': 'Invalid ID or password or name!', 'code': '400' },
                    'Token authentication failed': { 'msgCode': '4', 'msg': 'Token invalid or expired', 'code': '401' },
                    'no permission': { 'msgCode': 'w1-2', 'msg': 'Unable to modify other user information', 'code': '401' },
                    'DB No results': { 'msgCode': 'w1-3', 'msg': 'DB No results', 'code': '400' }
                },
                'POST': {
                    'Value verification failed': { 'msgCode': 'w2-1', 'msg': 'Invalid ID', 'code': '400' },
                    'Token authentication failed': { 'msgCode': '4', 'msg': 'Token invalid or expired', 'code': '401' },
                    'no permission': { 'msgCode': 'w2-2', 'msg': 'Unable to modify other user information', 'code': '401' },
                    'no affectedRows': { 'msgCode': 'w2-3', 'msg': 'DB No results', 'code': '400' },
                    'DB No results': { 'msgCode': 'w2-4', 'msg': 'DB No results', 'code': '400' }
                }
            },
            '/:userid/notes/:noteid/words/:wordid': {
                'PUT': {
                    'Value verification failed': { 'msgCode': 'w3-1', 'msg': 'Invalid ID or password or name!', 'code': '400' },
                    'Token authentication failed': { 'msgCode': '4', 'msg': 'Token invalid or expired', 'code': '401' },
                    'no permission': { 'msgCode': 'w3-2', 'msg': 'Unable to modify other user information', 'code': '401' },
                    'no affectedRows': { 'msgCode': 'w3-3', 'msg': 'DB No results', 'code': '400' },
                    'DB No results': { 'msgCode': 'w3-4', 'msg': 'DB No results', 'code': '400' }
                },
                'DELETE': {
                    'Value verification failed': { 'msgCode': 'w4-1', 'msg': 'Invalid ID', 'code': '400' },
                    'Token authentication failed': { 'msgCode': '4', 'msg': 'Token invalid or expired', 'code': '401' },
                    'no permission': { 'msgCode': 'w4-2', 'msg': 'Unable to modify other user information', 'code': '401' },
                    'no affectedRows': { 'msgCode': 'w4-3', 'msg': 'DB No results', 'code': '400' },
                    'DB No results': { 'msgCode': 'w4-4', 'msg': 'DB No results', 'code': '400' }
                }
            },
            '/:userid/notes/:noteid/words/:wordid/wrong-count': {
                'PUT': {
                    'Value verification failed': { 'msgCode': 'w5-1', 'msg': 'Invalid ID or password or name!', 'code': '400' },
                    'Token authentication failed': { 'msgCode': '4', 'msg': 'Token invalid or expired', 'code': '401' },
                    'no permission': { 'msgCode': 'w5-2', 'msg': 'Unable to modify other user information', 'code': '401' },
                    'no affectedRows': { 'msgCode': 'w5-3', 'msg': 'DB No results', 'code': '400' },
                    'DB No results': { 'msgCode': 'w5-4', 'msg': 'DB No results', 'code': '400' }
                }
            },
        }
    }

    //에러 위치와 에러 내용으로 올바른 에러코드를 찾아서 리턴합니다
    async findErrorCode(routePath, method, error) {
        if (error.affectedRows === 0) {
            error = "no affectedRows"; //mysql affectedRows 에 대응하는 구문입니다
        }

        const errorDetail = this.ERROR_TABLE[`${routePath}`][`${method}`][`${error}`];

        if (errorDetail) {
            return errorDetail;
        } else {
            throw new Error('No error Data');
        }
    }

    async handling(err, req, res, next) {
        try {
            console.log(`[Error]${req.method}|${req.route.path} -> ${err}`);
            const result = await this.findErrorCode(req.route.path, req.method, err);
            res.status(result.code).json(ResponseCreator.errorMessage(req.route.path, result.msg, result.msgCode));
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = new ErrorHandler();