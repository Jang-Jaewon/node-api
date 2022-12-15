// api
const models = require('../../models');


const index = function(req, res) {
    req.query.limit = req.query.limit || 10; 
    const limit = parseInt(req.query.limit);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    models.User
        .findAll({
            limit: limit
        })
        .then(users => {
            res.json(users);
        });
};

const show = function(req, res) {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) return res.status(400).end();

    models.User.findOne({
        where: {id}
    }).then(user=> {
        if (!user) return res.status(404).end();
        res.json(user)
    })
};

const create = function(req, res) {
    const name = req.body.name;
    const age = req.body.age;
    if (!name || !age) return res.status(400).end();

    models.User.create({name, age})
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).end();
            }
            res.status(500).end();
        })
};

const update = function(req, res) {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) return res.status(400).end();

    const name = req.body.name;
    const age = req.body.age;
    if (!name) return res.status(400).end();

    models.User.findOne({where:{id}})
        .then(user => {
            if (!user) return res.status(404).end();
            user.name = name;
            user.age = age;
            user.save()
                .then(_ => {
                    res.json(user);
                })
                .catch(err => {
                    if (err.name === 'SequelizeUniqueConstraintError') {
                        return res.status(409).end();
                    }
                    res.status(500).end();
                })
        })
};

const destroy = function(req, res) {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) return res.status(400).end();
    models.User.destroy({
        where: {id}
    }).then(()=> {
        res.status(204).end();
    })
};

module.exports = {
    index, create, show, update, destroy
};