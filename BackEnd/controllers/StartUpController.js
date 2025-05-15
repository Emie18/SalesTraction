const { StartUp } = require('../models');

exports.create = async (req, res) => {
    try {
        const startup = await StartUp.create(req.body);
        res.status(201).json(startup);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create student' });
    }
};

exports.getAll = async (req, res) => {
    try{
        const startup = await StartUp.findAll();
        res.status(200).json(startup);
    }catch(error){
        res.status(500).json({error : error.message});
    }
};

exports.delete = async (req, res) => {
    try{
        await StartUp.destroy({
            where: { id: req.query.id }
        });
        res.status(200).json({deleted : req.query.id});
    }catch(error){
        res.status(500).json({error : error.message});
    }
};