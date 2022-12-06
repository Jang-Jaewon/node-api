const express = require('express')
var morgan = require('morgan')

const app = express()
const port = 3000

function logger(req, res, next){ // logger 미들웨어 간단 구현
    console.log(`i am logger. your request url is "${req.url}"`);
    next(); // 미들웨어에서는 next 함수 반드시 호출해야함
}

app.use(logger); // 미들웨어를 추가할 때는 use를 사용
app.use(morgan('dev')) // 서드파티 로거 미들웨어 사용

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})