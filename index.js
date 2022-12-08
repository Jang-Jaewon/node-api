const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const user = require('./api/user/index.js');

if (process.env.NODE_ENV !== 'test'){
    app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/users', user)

app.get('/', (req, res) => {
    res.send('Hello World!');
})
  
module.exports = app;