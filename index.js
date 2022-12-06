const fs = require("fs");

// 노드는 이벤트 기반의 비동기 I/O 프레임워크이다!
// readFileSync vs resdFile 비교

// 비동기
// const readFileData = fs.readFile('./data.txt', 'utf-8', function(err, readFileData){
//     console.log('readFile =>', readFileData)
// });
const readFileData = fs.readFile('./data.txt', 'utf-8', function(err, data){
    console.log('readFile =>', data)
});


// 동기
const readFileSyncdata = fs.readFileSync('./data.txt', 'utf-8');
console.log('readFileSync =>', readFileSyncdata)
