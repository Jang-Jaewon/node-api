// api
const responseData = {
    users:[
        {id: 1, name: 'Park', age: 13},
        {id: 2, name: 'Kim', age: 21},
        {id: 3, name: 'Jang', age: 19},
        {id: 4, name: 'Lee', age: 15},
    ]
};


const index = function(req, res) {
    req.query.limit = req.query.limit || 10; 
    const limit = parseInt(req.query.limit);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    res.json(responseData.users.slice(0, limit));
};

const show = function(req, res) {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) return res.status(400).end();
    const user = responseData.users.filter((user)=> user.id == id)[0];
    if (!user) return res.status(404).end();
    res.json(user)
};

const create = function(req, res) {
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
};

const update = function(req, res) {
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
};

const destroy = function(req, res) {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) return res.status(400).end();
    responseData.users = responseData.users.filter((user)=> user.id !== id);
    res.status(204).end();
};

module.exports = {
    index, create, show, update, destroy
};