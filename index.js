const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000
const responseData = {
    users:[
        {id: 1, name: 'Park', age: 13},
        {id: 2, name: 'Kim', age: 21},
        {id: 3, name: 'Jang', age: 19},
        {id: 4, name: 'Lee', age: 15},
    ]
}

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/users', (req, res) => {
    req.query.limit = req.query.limit || 10; 
    const limit = parseInt(req.query.limit);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    res.json(responseData.users.slice(0, limit));
  })


app.get('/users/:id', (req, res)=> {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) return res.status(400).end();
    const user = responseData.users.filter((user)=> user.id == id)[0];
    if (!user) return res.status(404).end();
    res.json(user)
})

app.delete('/users/:id', (req, res)=> {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) return res.status(400).end();
    responseData.users = responseData.users.filter((user)=> user.id !== id);
    res.status(204).end();
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})


module.exports = app;