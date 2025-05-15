const { Student } = require('../models');

exports.create = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create student' });
    }
};

exports.getAll = async (req, res) => {
    try{
        const student = await Student.findAll({attributes: ["name"]});
        res.status(200).json(student);
    }catch(error){
        res.status(500).json({error : error.message});
    }
};

exports.delete = async (req, res) => {
    try{
        await Student.destroy({
            where: {
                id: req.query.id,
            },
        });
        res.status(200).json({deleted : req.query.id});
    }catch(error){
        res.status(500).json({error : error.message});
    }
};