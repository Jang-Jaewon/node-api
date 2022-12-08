const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const user = require('./api/user/index.js');


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/users', user)

app.get('/', (req, res) => {
    res.send('Hello World!');
})
  
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})

module.exports = app;