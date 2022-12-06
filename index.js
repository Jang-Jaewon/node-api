const express = require('express')
var morgan = require('morgan')

const app = express()
const port = 3000


function commonMiddleware(req, res, next){
    console.log('commonMiddleware');
    next(new Error('error ouccered'));
};

function errorMiddleware(err, req, res, next){
    console.log(`errorMiddleware ${err.message}`);
    next();
};

app.use(commonMiddleware);
app.use(errorMiddleware);
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})