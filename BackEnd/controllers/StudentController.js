const { Model } = require('../models/Model.js');
const { Student, Account } = Model

exports.create = async (req, res) => {
    try {
        const account = await Account.create({
            type: "student",
            name: req.body.name,
            email: req.body.email,
            password: req.body.pass,
            description : "",
            name_region : req.body.region ?? "Bretagne"
        });
        const student = await Student.create({
            id_account: account.id,
            surname: req.body.surname,
            disponibility: req.body.disponibility
        })
        res.status(201).json(student);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create student' });
    }
};

exports.getAll = async (req, res) => {
    try{
        const student = await Student.findAll({
            include: [{
                as: "id_account_account",
                model: Account
            }]
        });
        res.status(200).json(student);
    }catch(error){
        res.status(500).json({error : error.message});
    }
};