//state : pending -> fulfilled or rejected

function test() {
    const promise_task1 = new Promise((resolve,reject) => {
        if(false){
            console.log('1-1');
            resolve("처리1");
        }else{
            console.log('1-2');
            reject(new error('error 2-1'));
        }
    });
    const promise_task2 = new Promise((resolve,reject) => {
        if(true){
            console.log('2-1');
            resolve("처리2");
        }else{
            console.log('2-2');
            reject(new error('error 2-1'));
        }
    });

    promise_task1
    .then((val)=>{
        //정상적으로 실행되었을 경우
        console.log(val);
    })
    .catch((val)=>{
        console.log(val);
    })
    .finally(()=>{
        //실패하든 성공하던 무조건 호출됨
    })
}

function test1 (){
    const a = () =>
        new Promise((resolve, reject) => {
            console.log('!');
            resolve('1');
        });

    const b = aval =>
        new Promise((resolve,reject) => {
            console.log('2');
            resolve(`${aval} + 2`)
        });
    
    a()
    .then(b)
    .then(console.log)
}
test1();

/* 
Promise.all([promise_task1,promise_task2]).then((val) => {
        console.log(val);
})
    */