const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { send } = require('process')
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

app.post('/users', (req, res)=> {
    let id;
    const name = req.body.name;
    const age = req.body.age;
    if (!name || !age) return res.status(400).end();
    
    const isConflict = responseData.users.filter(user=> user.name == name).length;
    if (isConflict) return res.status(409).end();
    
    const ids = responseData.users.map(user => user.id) //[1,2,3,4]
    if (ids.length === 0) {
        id = 1
    }else{
        id = Math.max(...ids) + 1;
    }
    const user = {id, name, age};
    responseData.users.push(user);
    res.status(201).json(user)
})  

app.get('/users/:id', (req, res)=> {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) return res.status(400).end();
    const user = responseData.users.filter((user)=> user.id == id)[0];
    if (!user) return res.status(404).end();
    res.json(user)
})

app.put('/users/:id', (req, res)=> {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) return res.status(400).end();

    const name = req.body.name;
    const age = req.body.age;
    if (!name) return res.status(400).end();
    
    const isConflict = responseData.users.filter(user=> user.name == name).length;
    if (isConflict) return res.status(409).end();
    
    const user = responseData.users.filter(user=> user.id === id)[0]
    if (!user) return res.status(404).end();

    user.name = name
    user.age = age
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