const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000
const users = [
    {id: 1, name: 'Park', age: 13},
    {id: 2, name: 'Kim', age: 21},
    {id: 3, name: 'Jang', age: 19},
    {id: 4, name: 'Lee', age: 15},
]

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/users', (req, res) => {
    res.json(users)
  })

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})
