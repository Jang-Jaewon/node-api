// api
const models = require('../../models');


const index = async function(req, res) {
    req.query.limit = req.query.limit || 10; 
    const limit = parseInt(req.query.limit);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    const users = await models.User.findAll({limit: limit})
    res.json(users);
};


const show = async function(req, res) {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) return res.status(400).end();

    const user = await models.User.findOne({where: {id}})
    if (!user) return res.status(404).end();
    res.json(user);
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


const update = async function(req, res) {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) return res.status(400).end();

    const name = req.body.name;
    const age = req.body.age;
    if (!name) return res.status(400).end();

    const user = await models.User.findOne({where:{id}})
    if (!user) return res.status(404).end();
    
    try{
        user.name = name;
        user.age = age;
        await user.save()
        res.json(user);
    }catch(err){
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).end();
        }
        res.status(500).end();
    }
};


const destroy = async function(req, res) {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) return res.status(400).end();
        await models.User.destroy({
            where: {id}
        })
        res.status(204).end();
};


module.exports = {
    index, create, show, update, destroy
};