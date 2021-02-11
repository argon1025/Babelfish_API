const errors = require('./Respons_Json.js');

error = errors.error('test','test1','test2');
console.log(error);
console.log(error.errors[0]['location']);